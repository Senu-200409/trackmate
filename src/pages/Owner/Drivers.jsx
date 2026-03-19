import React, { useState, useEffect } from 'react';
import { 
  Users, 
  User,
  Phone,
  MapPin,
  Search,
  Filter,
  Plus,
  MoreVertical,
  CheckCircle,
  Eye,
  Edit,
  Edit2,
  Bus,
  TrendingUp,
  X,
  Save,
  FileText,
  Shield,
  Loader2,
  AlertTriangle
} from 'lucide-react';
import OwnerHeader from '../../components/Owner/OwnerHeader';
import OwnerFooter from '../../components/Owner/OwnerFooter';
import DriverServices from '../../services/DriverServices';
import UserServices from '../../services/UserServices';
import RegisterDriverModal from '../../components/Owner/RegisterDriverModal';

function Drivers({ onMenuClick, setActiveTab, onLogout }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('active');
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);

  // Map API status codes to meaningful labels for registration status
  const mapRegistrationStatus = (statusCode) => {
    const statusMap = {
      'A': 'Active',
      'P': 'Pending',
      'I': 'Inactive',
      'R': 'Rejected'
    };
    return statusMap[statusCode] || 'Unknown';
  };

  // Normalize driver status coming from DriverDetails (e.g. 'A') to UI-friendly labels
  const normalizeDriverStatus = (s) => {
    if (!s) return 'Off Duty';
    const v = String(s).trim();
    const up = v.toUpperCase();
    if (up === 'A' || up === 'ACTIVE') return 'On Duty';
    if (up === 'ON ROUTE' || up === 'ONROUTE' || up === 'ON_ROUTE') return 'On Route';
    if (up === 'I' || up === 'INACTIVE' || up === 'OFF' || up === 'OFF DUTY' || up === 'OFF_DUTY') return 'Off Duty';
    return v;
  };

  // Map API driver response to UI format (support DriverDetails fields like LicenseNo, LicenseType)
  const mapDriverData = (apiDriver) => ({
    id: apiDriver.DriverID || apiDriver.id || apiDriver.ID || '',
    userId: apiDriver.UserID || apiDriver.UserId || apiDriver.userId || '',
    name: apiDriver.DriverName || apiDriver.name || apiDriver.UserName || 'Unknown',
    phone: apiDriver.Phone || apiDriver.phone || '',
    licenseNumber: apiDriver.LicenseNo || apiDriver.LicenseNumber || apiDriver.licenseNumber || '',
    license: apiDriver.LicenseType || apiDriver.license || 'CDL-B',
    status: normalizeDriverStatus(apiDriver.Status || apiDriver.status || ''),
    registrationStatus: mapRegistrationStatus(apiDriver.Status),
    registrationStatusCode: apiDriver.Status,
    createdDate: apiDriver.CreateDate || apiDriver.Create_Date || apiDriver.CreatedDate || apiDriver.createdDate || '',
    updatedDate: apiDriver.UpdatedDate || apiDriver.updatedDate || '',
    assignedBus: apiDriver.AssignedBus || apiDriver.assignedBus || apiDriver.BusID || 'N/A',
    route: apiDriver.Route || apiDriver.route || 'N/A',
    trips: apiDriver.Trips || apiDriver.trips || 0,
    attendance: apiDriver.Attendance || apiDriver.attendance || 0,
    ...apiDriver // Keep all original fields
  });

  // Fetch drivers from API
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        setLoading(true);

        // Fetch drivers + all users in parallel (DriverDetails + UserDetails)
        const [driverResp, usersResp] = await Promise.all([
          DriverServices.getAllDrivers(),
          UserServices.getAllUsers()
        ]);

        const driverList = driverResp && driverResp.data
          ? (Array.isArray(driverResp.data) ? driverResp.data : driverResp.data.ResultSet || [])
          : [];

        const usersList = usersResp && usersResp.data
          ? (Array.isArray(usersResp.data) ? usersResp.data : usersResp.data.ResultSet || [])
          : [];

        // keep users available for any UI needs
        setUsers(usersList);

        // map drivers and try to link matching user (by UserID, Phone or UserName)
        const mappedDrivers = driverList.map((d) => {
          const mapped = mapDriverData(d);

          const match = usersList.find(u => {
            if (!u) return false;
            // match by UserID (primary), then phone, then username
            if (u.UserID && d.UserID && String(u.UserID) === String(d.UserID)) return true;
            if (u.UserID && d.DriverID && String(u.UserID) === String(d.DriverID)) return true;
            if (u.Phone && (String(u.Phone) === String(d.Phone) || String(u.Phone) === String(mapped.phone))) return true;
            if (u.UserName && mapped.name && String(u.UserName) === String(mapped.name)) return true;
            return false;
          });

          if (match) {
            mapped.linkedUser = match;
            mapped.profileImage = match.ProfileImage || mapped.ProfileImage || mapped.profileImage;
            // prefer linked user values for display
            if (match.Phone) mapped.phone = match.Phone;
            if (match.UserName) mapped.name = match.UserName;
            // expose UserID from users API
            mapped.userId = match.UserID || mapped.userId || '';
          }

          return mapped;
        });

        setDrivers(mappedDrivers);
      } catch (err) {
        console.error('Error fetching drivers:', err);
        setError('Failed to load drivers');
        setDrivers([]);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchDrivers();
  }, []);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRegisterDriverModal, setShowRegisterDriverModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingDriver, setEditingDriver] = useState(null);
  const [formData, setFormData] = useState({
    userID: '',
    licenseNo: '',
    licenseType: 'CDL-B',
    status: 'Active'
  });
  const [saveLoading, setSaveLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaveLoading(true);
    try {
      const driverData = {
        UserID: formData.userID,
        LicenseNo: formData.licenseNo,
        LicenseType: formData.licenseType,
        Status: formData.status
      };
      const result = await DriverServices.createDriver(driverData);
      if (result.success) {
        alert('Driver saved successfully!');
        setShowAddModal(false);
        setFormData({
          userID: '',
          licenseNo: '',
          licenseType: 'CDL-B',
          status: 'Active'
        });
        // Refresh drivers list
        const driverResp = await DriverServices.getAllDrivers();
        const driverList = driverResp && driverResp.data
          ? (Array.isArray(driverResp.data) ? driverResp.data : driverResp.data.ResultSet || [])
          : [];
        const mappedDrivers = driverList.map(mapDriverData);
        setDrivers(mappedDrivers);
      } else {
        alert('Failed to save driver');
      }
    } catch (error) {
      console.error('Error saving driver:', error);
      alert('Error saving driver: ' + error.message);
    } finally {
      setSaveLoading(false);
    }
  };

  // Available buses and routes for dropdowns
  // Available buses for dropdown (lookup from database)
  const availableBuses = [
    { id: 'BUS-001', name: 'BUS-001 (ABC 1234)' },
    { id: 'BUS-002', name: 'BUS-002 (DEF 5678)' },
    { id: 'BUS-003', name: 'BUS-003 (GHI 9012)' },
    { id: 'BUS-004', name: 'BUS-004 (JKL 3456)' },
    { id: 'BUS-005', name: 'BUS-005 (MNO 7890)' },
  ];

  const handleEditClick = (driver) => {
    setEditingDriver(driver);
    setFormData({
      name: driver.name || '',
      phone: driver.phone || '',
      licenseNumber: driver.licenseNumber || '',
      licenseType: driver.license || 'CDL-B',
      status: (driver.status || 'active').toLowerCase().replace(' ', '-')
    });
    setShowEditModal(true);
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    console.log('Updated Driver Data:', formData);
    alert('Driver updated successfully!');
    setShowEditModal(false);
    setEditingDriver(null);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'On Duty': return 'bg-green-100 text-green-700 border-green-200';
      case 'On Route': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Off Duty': return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'On Leave': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const filteredDrivers = drivers.filter(driver => {
    const matchesSearch = driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         driver.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         driver.route.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || driver.registrationStatus.toLowerCase() === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: drivers.length,
    active: drivers.filter(d => d.registrationStatus === 'Active').length,
    pending: drivers.filter(d => d.registrationStatus === 'Pending').length,
    inactive: drivers.filter(d => d.registrationStatus === 'Inactive').length,
    rejected: drivers.filter(d => d.registrationStatus === 'Rejected').length,
    avgAttendance: drivers.length > 0 ? Math.round(drivers.reduce((acc, d) => acc + d.attendance, 0) / drivers.length) : 0
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#FFF3B0] via-[#FFE082] to-[#FFF3B0]">
      <OwnerHeader notifications={[]} ownerName="David" companyName="TrackMate Fleet" onMenuClick={onMenuClick} setActiveTab={setActiveTab} onLogout={onLogout} />
      
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Drivers Management</h1>
              <p className="text-gray-600 mt-1">Manage your drivers and track their performance</p>
            </div>
            <button 
              onClick={() => setShowRegisterDriverModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#1E3A5F] text-white rounded-xl hover:bg-[#3B6FB6] transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add New Driver
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <div 
              onClick={() => setFilterStatus('all')}
              className={`rounded-xl p-4 border-2 shadow-sm cursor-pointer transition-all duration-200 ${
                filterStatus === 'all'
                  ? 'bg-blue-50 border-blue-500 shadow-md'
                  : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-100">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                  <div className="text-sm text-gray-600">Total Drivers</div>
                </div>
              </div>
            </div>
            <div 
              onClick={() => setFilterStatus('active')}
              className={`rounded-xl p-4 border-2 shadow-sm cursor-pointer transition-all duration-200 ${
                filterStatus === 'active'
                  ? 'bg-green-50 border-green-500 shadow-md'
                  : 'bg-white border-gray-200 hover:border-green-300 hover:shadow-md'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-green-100">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stats.active}</div>
                  <div className="text-sm text-gray-600">Active</div>
                </div>
              </div>
            </div>
            <div 
              onClick={() => setFilterStatus('pending')}
              className={`rounded-xl p-4 border-2 shadow-sm cursor-pointer transition-all duration-200 ${
                filterStatus === 'pending'
                  ? 'bg-yellow-50 border-yellow-500 shadow-md'
                  : 'bg-white border-gray-200 hover:border-yellow-300 hover:shadow-md'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-yellow-100">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stats.pending}</div>
                  <div className="text-sm text-gray-600">Pending</div>
                </div>
              </div>
            </div>
            <div 
              onClick={() => setFilterStatus('inactive')}
              className={`rounded-xl p-4 border-2 shadow-sm cursor-pointer transition-all duration-200 ${
                filterStatus === 'inactive'
                  ? 'bg-gray-100 border-gray-600 shadow-md'
                  : 'bg-white border-gray-200 hover:border-gray-400 hover:shadow-md'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gray-200">
                  <Users className="w-5 h-5 text-gray-700" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stats.inactive}</div>
                  <div className="text-sm text-gray-600">Inactive</div>
                </div>
              </div>
            </div>
            <div 
              onClick={() => setFilterStatus('rejected')}
              className={`rounded-xl p-4 border-2 shadow-sm cursor-pointer transition-all duration-200 ${
                filterStatus === 'rejected'
                  ? 'bg-red-50 border-red-500 shadow-md'
                  : 'bg-white border-gray-200 hover:border-red-300 hover:shadow-md'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-red-100">
                  <X className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stats.rejected}</div>
                  <div className="text-sm text-gray-600">Rejected</div>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, ID, or route..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent cursor-pointer"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="inactive">Inactive</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>

          {/* Drivers Grid */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredDrivers.map((driver) => (
              <div key={driver.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                {/* Header */}
                <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-[#1E3A5F] to-[#3B6FB6]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white bg-[#F5C518] flex items-center justify-center">
                        {driver.profileImage ? (
                          <img src={driver.profileImage} alt={driver.name} className="w-full h-full object-cover" />
                        ) : (
                          <User className="w-6 h-6 text-[#1E3A5F]" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-white">{driver.name}</h3>
                        <p className="text-xs text-[#FFE066]">{driver.id}</p>
                      </div>
                    </div>
                    <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(driver.status)}`}>
                      {driver.status}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-4 space-y-4">
                  {/* Contact Info */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700">{driver.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Shield className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700">{driver.licenseNumber}</span>
                    </div>
                  </div>

                  {/* Assignment Info */}
                  <div className="p-3 rounded-lg bg-gray-50 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 flex items-center gap-1">
                        <Bus className="w-3 h-3" /> Bus
                      </span>
                      <span className="font-semibold text-gray-900">{driver.assignedBus}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> Route
                      </span>
                      <span className="font-semibold text-gray-900">{driver.route}</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="p-2 rounded-lg bg-green-50">
                      <div className="text-lg font-bold text-green-600">{driver.trips}</div>
                      <div className="text-xs text-gray-500">Trips</div>
                    </div>
                    <div className="p-2 rounded-lg bg-blue-50">
                      <div className="text-lg font-bold text-blue-600">{driver.attendance}%</div>
                      <div className="text-xs text-gray-500">Attendance</div>
                    </div>
                  </div>

                  {/* License Type */}
                  <div className="flex items-center justify-center text-sm pt-3 border-t border-gray-100">
                    <span className="text-xs font-medium px-3 py-1 bg-[#1E3A5F] text-white rounded-full">{driver.license}</span>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-2">
                  <button className="p-2 rounded-lg hover:bg-gray-200 transition-colors" title="View Profile">
                    <Eye className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => handleEditClick(driver)}
                    className="px-3 py-1.5 rounded-lg bg-[#1E3A5F] text-white hover:bg-[#3B6FB6] transition-colors text-xs font-medium flex items-center gap-1"
                    title="Update"
                  >
                    <Edit className="w-3 h-3" />
                    Update
                  </button>
                  <button className="p-2 rounded-lg hover:bg-gray-200 transition-colors" title="More Options">
                    <MoreVertical className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>

      <OwnerFooter />

      {/* Register Driver Modal - Using new 2-step registration form */}
      <RegisterDriverModal 
        isOpen={showRegisterDriverModal}
        onClose={() => setShowRegisterDriverModal(false)}
        onSuccess={() => {
          // Refresh drivers list after successful registration
          const fetchDrivers = async () => {
            try {
              const [driverResp, usersResp] = await Promise.all([
                DriverServices.getAllDrivers(),
                UserServices.getAllUsers()
              ]);

              const driverList = driverResp && driverResp.data
                ? (Array.isArray(driverResp.data) ? driverResp.data : driverResp.data.ResultSet || [])
                : [];

              const mappedDrivers = driverList.map(mapDriverData);
              setDrivers(mappedDrivers);
            } catch (err) {
              console.error('Error fetching drivers:', err);
            }
          };
          fetchDrivers();
        }}
      />

      {/* Add New Driver Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-[#1E3A5F] to-[#3B6FB6]">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Add New Driver</h2>
                  <p className="text-white/70 text-sm">Fill in the driver's information</p>
                </div>
              </div>
              <button 
                onClick={() => setShowAddModal(false)}
                className="p-2 rounded-lg hover:bg-white/20 transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
              <div className="space-y-6">
                
                {/* Driver Information Section */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Driver Details
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        User ID <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="userID"
                        value={formData.userID}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., USR-12345"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* License Information Section */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    License Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        License Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="licenseNo"
                        value={formData.licenseNo}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., CDL-A-12345"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        License Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="licenseType"
                        value={formData.licenseType}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all bg-white"
                      >
                        <option value="CDL-A">CDL-A (Class A)</option>
                        <option value="CDL-B">CDL-B (Class B)</option>
                        <option value="CDL-C">CDL-C (Class C)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Status Section */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Status</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all bg-white"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="On Leave">On Leave</option>
                      <option value="Suspended">Suspended</option>
                    </select>
                  </div>
                </div>

              </div>
            </form>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                disabled={saveLoading}
                className="px-5 py-2.5 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors font-medium disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={saveLoading}
                className="px-5 py-2.5 bg-[#1E3A5F] text-white rounded-xl hover:bg-[#3B6FB6] transition-colors font-medium flex items-center gap-2 disabled:opacity-50"
              >
                {saveLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Driver
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Driver Modal */}
      {showEditModal && editingDriver && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-[#1E3A5F] to-[#3B6FB6]">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Edit2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Update Driver</h2>
                  <p className="text-white/70 text-sm">Update driver's information</p>
                </div>
              </div>
              <button 
                onClick={() => { setShowEditModal(false); setEditingDriver(null); }}
                className="p-2 rounded-lg hover:bg-white/20 transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleUpdateSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
              <div className="space-y-6">
                {/* Driver Information Section */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Driver Information
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                      <input type="text" name="name" value={formData.name} onChange={handleInputChange} required placeholder="e.g., John Smith" className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number <span className="text-red-500">*</span></label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required placeholder="e.g., +1 234-567-8900" className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all" />
                    </div>
                  </div>
                </div>

                {/* License Information Section */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    License Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">License Number <span className="text-red-500">*</span></label>
                      <input type="text" name="licenseNumber" value={formData.licenseNumber} onChange={handleInputChange} required placeholder="e.g., CDL-A-12345" className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">License Type <span className="text-red-500">*</span></label>
                      <select name="licenseType" value={formData.licenseType} onChange={handleInputChange} required className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all bg-white">
                        <option value="CDL-A">CDL-A (Class A)</option>
                        <option value="CDL-B">CDL-B (Class B)</option>
                        <option value="CDL-C">CDL-C (Class C)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Status Section */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Status</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Driver Status</label>
                    <select name="status" value={formData.status} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all bg-white">
                      <option value="active">Active</option>
                      <option value="on-leave">On Leave</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>

              </div>
            </form>
            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-end gap-3">
              <button type="button" onClick={() => { setShowEditModal(false); setEditingDriver(null); }} className="px-5 py-2.5 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors font-medium">Cancel</button>
              <button type="submit" onClick={handleUpdateSubmit} className="px-5 py-2.5 bg-[#1E3A5F] text-white rounded-xl hover:bg-[#3B6FB6] transition-colors font-medium flex items-center gap-2">
                <Save className="w-4 h-4" />
                Update Driver
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Drivers;