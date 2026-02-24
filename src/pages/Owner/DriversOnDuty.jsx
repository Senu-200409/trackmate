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
  AlertTriangle,
  ArrowLeft
} from 'lucide-react';
import OwnerHeader from '../../components/Owner/OwnerHeader';
import OwnerFooter from '../../components/Owner/OwnerFooter';
import DriverServices from '../../services/DriverServices';
import UserServices from '../../services/UserServices';

function DriversOnDuty({ onMenuClick, setActiveTab, onBack }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('on-duty');
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);

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
    const matchesFilter = filterStatus === 'all' || driver.status.toLowerCase().replace(' ', '-') === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: drivers.length,
    onDuty: drivers.filter(d => d.status === 'On Duty').length,
    onRoute: drivers.filter(d => d.status === 'On Route').length,
    offDuty: drivers.filter(d => d.status === 'Off Duty').length,
    onLeave: drivers.filter(d => d.status === 'On Leave').length,
    avgAttendance: drivers.length > 0 ? Math.round(drivers.reduce((acc, d) => acc + d.attendance, 0) / drivers.length) : 0
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#E0F4FF] via-[#F0F9FF] to-[#E8F4FF]">
      <OwnerHeader notifications={[]} ownerName="David" companyName="TrackMate Fleet" onMenuClick={onMenuClick} setActiveTab={setActiveTab} />
      
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
                title="Go Back"
              >
                <ArrowLeft className="w-6 h-6 text-gray-700" />
              </button>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Drivers By Duty Status</h1>
                <p className="text-gray-600 mt-1">Track and manage drivers based on their current duty status</p>
              </div>
            </div>
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
                  <div className="text-sm text-gray-600">All Drivers</div>
                </div>
              </div>
            </div>
            <div 
              onClick={() => setFilterStatus('on-duty')}
              className={`rounded-xl p-4 border-2 shadow-sm cursor-pointer transition-all duration-200 ${
                filterStatus === 'on-duty'
                  ? 'bg-green-50 border-green-500 shadow-md'
                  : 'bg-white border-gray-200 hover:border-green-300 hover:shadow-md'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-green-100">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stats.onDuty}</div>
                  <div className="text-sm text-gray-600">On Duty</div>
                </div>
              </div>
            </div>
            <div 
              onClick={() => setFilterStatus('on-route')}
              className={`rounded-xl p-4 border-2 shadow-sm cursor-pointer transition-all duration-200 ${
                filterStatus === 'on-route'
                  ? 'bg-blue-50 border-blue-500 shadow-md'
                  : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-100">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stats.onRoute}</div>
                  <div className="text-sm text-gray-600">On Route</div>
                </div>
              </div>
            </div>
            <div 
              onClick={() => setFilterStatus('off-duty')}
              className={`rounded-xl p-4 border-2 shadow-sm cursor-pointer transition-all duration-200 ${
                filterStatus === 'off-duty'
                  ? 'bg-gray-100 border-gray-600 shadow-md'
                  : 'bg-white border-gray-200 hover:border-gray-400 hover:shadow-md'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gray-200">
                  <Users className="w-5 h-5 text-gray-700" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stats.offDuty}</div>
                  <div className="text-sm text-gray-600">Off Duty</div>
                </div>
              </div>
            </div>
            <div 
              onClick={() => setFilterStatus('on-leave')}
              className={`rounded-xl p-4 border-2 shadow-sm cursor-pointer transition-all duration-200 ${
                filterStatus === 'on-leave'
                  ? 'bg-yellow-50 border-yellow-500 shadow-md'
                  : 'bg-white border-gray-200 hover:border-yellow-300 hover:shadow-md'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-yellow-100">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stats.onLeave}</div>
                  <div className="text-sm text-gray-600">On Leave</div>
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
                  <option value="on-duty">On Duty</option>
                  <option value="on-route">On Route</option>
                  <option value="off-duty">Off Duty</option>
                  <option value="on-leave">On Leave</option>
                </select>
              </div>
            </div>
          </div>

          {/* Drivers Grid */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {loading ? (
              <div className="col-span-full bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">
                <Loader2 className="w-8 h-8 animate-spin text-[#3B6FB6] mx-auto mb-4" />
                <p className="text-gray-600">Loading drivers data...</p>
              </div>
            ) : error ? (
              <div className="col-span-full bg-white rounded-xl border border-red-200 shadow-sm p-6 text-center">
                <AlertTriangle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <p className="text-red-600 font-medium">{error}</p>
              </div>
            ) : filteredDrivers.length === 0 ? (
              <div className="col-span-full bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">
                <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">No drivers found</p>
                <p className="text-gray-500 text-sm">Try adjusting your search or filters</p>
              </div>
            ) : (
              filteredDrivers.map((driver) => (
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
                        <span className="text-gray-700">{driver.licenseNumber || 'N/A'}</span>
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
                    <button className="px-3 py-1.5 rounded-lg bg-[#1E3A5F] text-white hover:bg-[#3B6FB6] transition-colors text-xs font-medium flex items-center gap-1" title="View Details">
                      <Eye className="w-3 h-3" />
                      View
                    </button>
                    <button className="p-2 rounded-lg hover:bg-gray-200 transition-colors" title="More Options">
                      <MoreVertical className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </main>

      <OwnerFooter />
    </div>
  );
}

export default DriversOnDuty;
