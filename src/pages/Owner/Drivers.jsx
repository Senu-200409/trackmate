import React, { useState } from 'react';
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
  Shield
} from 'lucide-react';
import OwnerHeader from '../../components/Owner/OwnerHeader';
import OwnerFooter from '../../components/Owner/OwnerFooter';

function Drivers({ onMenuClick, setActiveTab }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingDriver, setEditingDriver] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    licenseNumber: '',
    licenseType: 'CDL-B',
    status: 'active'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New Driver Data:', formData);
    // Here you would typically send data to backend
    alert('Driver added successfully!');
    setShowAddModal(false);
    setFormData({
      name: '',
      phone: '',
      licenseNumber: '',
      licenseType: 'CDL-B',
      status: 'active'
    });
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

  const drivers = [
    { 
      id: "DRV-001",
      name: "Michael Smith", 
      phone: "+1 234-567-8901",
      licenseNumber: "CDL-A-12345",
      license: "CDL-A",
      status: "On Duty",
      trips: 156,
      attendance: 98,
      assignedBus: "BUS-001",
      route: "Route A"
    },
    { 
      id: "DRV-002",
      name: "Sarah Johnson", 
      phone: "+1 234-567-8902",
      licenseNumber: "CDL-B-23456",
      license: "CDL-B",
      status: "On Duty",
      trips: 142,
      attendance: 96,
      assignedBus: "BUS-002",
      route: "Route B"
    },
    { 
      id: "DRV-003",
      name: "Robert Brown", 
      phone: "+1 234-567-8903",
      licenseNumber: "CDL-A-34567",
      license: "CDL-A",
      status: "On Route",
      trips: 138,
      attendance: 94,
      assignedBus: "BUS-003",
      route: "Route C"
    },
    { 
      id: "DRV-004",
      name: "Lisa Davis", 
      phone: "+1 234-567-8904",
      licenseNumber: "CDL-B-45678",
      license: "CDL-B",
      status: "Off Duty",
      trips: 125,
      attendance: 92,
      assignedBus: "BUS-005",
      route: "Route E"
    },
    { 
      id: "DRV-005",
      name: "James Wilson", 
      phone: "+1 234-567-8905",
      licenseNumber: "CDL-A-56789",
      license: "CDL-A",
      status: "On Leave",
      trips: 118,
      attendance: 90,
      assignedBus: "Unassigned",
      route: "N/A"
    },
  ];

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
    onDuty: drivers.filter(d => d.status === 'On Duty' || d.status === 'On Route').length,
    avgAttendance: Math.round(drivers.reduce((acc, d) => acc + d.attendance, 0) / drivers.length)
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#FFF3B0] via-[#FFE082] to-[#FFF3B0]">
      <OwnerHeader notifications={[]} ownerName="David" companyName="TrackMate Fleet" onMenuClick={onMenuClick} setActiveTab={setActiveTab} />
      
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Drivers Management</h1>
              <p className="text-gray-600 mt-1">Manage your drivers and track their performance</p>
            </div>
            <button 
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#1E3A5F] text-white rounded-xl hover:bg-[#3B6FB6] transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add New Driver
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
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
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
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
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-100">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stats.avgAttendance}%</div>
                  <div className="text-sm text-gray-600">Avg Attendance</div>
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
                  className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent"
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
            {filteredDrivers.map((driver) => (
              <div key={driver.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                {/* Header */}
                <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-[#1E3A5F] to-[#3B6FB6]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-[#F5C518] flex items-center justify-center">
                        <User className="w-6 h-6 text-[#1E3A5F]" />
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
                    Driver Information
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., John Smith"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., +1 234-567-8900"
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
                        name="licenseNumber"
                        value={formData.licenseNumber}
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
                      Driver Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all bg-white"
                    >
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
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-5 py-2.5 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                className="px-5 py-2.5 bg-[#1E3A5F] text-white rounded-xl hover:bg-[#3B6FB6] transition-colors font-medium flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Driver
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