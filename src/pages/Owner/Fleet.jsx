import React, { useState, useEffect } from 'react';
import { 
  Bus, 
  User, 
  Search,
  Filter,
  Plus,
  MoreVertical,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Eye,
  Edit,
  X,
  Save,
  FileText,
  Wrench,
  Calendar,
  Loader2
} from 'lucide-react';
import OwnerHeader from '../../components/Owner/OwnerHeader';
import OwnerFooter from '../../components/Owner/OwnerFooter';
import BusServices from '../../services/BusServices';
import DriverServices from '../../services/DriverServices';

function Fleet({ onMenuClick, setActiveTab }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [busFleet, setBusFleet] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Normalize bus status from API
  const normalizeBusStatus = (s) => {
    if (!s) return 'Unknown';
    const v = String(s).trim().toUpperCase();
    if (v === 'A' || v === 'ACTIVE') return 'Active';
    if (v === 'M' || v === 'MAINTENANCE') return 'Maintenance';
    if (v === 'D' || v === 'DELAYED') return 'Delayed';
    return s;
  };

  // Map API bus response fields to UI model
  const mapBusData = (b) => ({
    plate: b.NumberPlate || b.Plate || b.LicensePlate || b.plate || b.Number || '',
    vehicle: b.VehicleName || b.Model || b.vehicle || b.Vehicle || '',
    capacity: b.SeatingCapacity || b.Capacity || b.capacity || b.Seats || 0,
    driver: b.DriverName || b.Driver || b.driver || b.AssignedDriver || 'Unassigned',
    insuranceExpiry: b.InsuranceExpiry || b.InsuranceExpiryDate || b.insuranceExpiry || '',
    licenseExpiry: b.LicenseExpiry || b.RegistrationExpiry || b.licenseExpiry || '',
    status: normalizeBusStatus(b.Status || b.status || ''),
    // keep original fields for debugging
    _raw: b
  });

  // Fetch buses from API
  useEffect(() => {
    const fetchBuses = async () => {
      try {
        setLoading(true);
        const response = await BusServices.getAllBuses();

        const list = response && response.data
          ? (Array.isArray(response.data) ? response.data : response.data.ResultSet || [])
          : [];

        const mapped = list.map(mapBusData);
        setBusFleet(mapped);
      } catch (err) {
        console.error('Error fetching buses:', err);
        setError('Failed to load buses');
        setBusFleet([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBuses();
  }, []);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingBus, setEditingBus] = useState(null);
  const [formData, setFormData] = useState({
    licensePlate: '',
    vehicle: '',
    capacity: '',
    assignedDriver: '',
    insuranceExpiry: '',
    licenseExpiry: '',
    status: 'active'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState('');

  const handleSubmit = async (e) => {
    e && e.preventDefault();
    setAddError('');

    // validate required fields
    const required = [
      { val: formData.licensePlate, name: 'License Plate' },
      { val: formData.assignedDriver, name: 'Assigned Driver' },
      { val: formData.vehicle, name: 'Vehicle' },
      { val: formData.capacity, name: 'Seating Capacity' },
      { val: formData.licenseExpiry, name: 'License Expiry' },
      { val: formData.insuranceExpiry, name: 'Insurance Expiry' },
    ];
    const missing = required.filter(r => !r.val && r.val !== 0).map(r => r.name);
    if (missing.length) {
      setAddError(`${missing.join(', ')} are required.`);
      return;
    }

    try {
      setAddLoading(true);

      // coerce numeric values to proper types before sending to API
      const payload = {
        NumberPlate: formData.licensePlate,
        DriverID: formData.assignedDriver ? Number(formData.assignedDriver) : null,
        Vehicle: formData.vehicle,
        SheetCount: formData.capacity ? parseInt(String(formData.capacity), 10) : 0,
        LicenseExpiry: formData.licenseExpiry,
        InsuranceExpiry: formData.insuranceExpiry,
        Latitude: formData.latitude ? parseFloat(String(formData.latitude)) : null,
        Longitude: formData.longitude ? parseFloat(String(formData.longitude)) : null,
      };

      const resp = await BusServices.createBus(payload);
      if (resp && resp.success) {
        // refresh list from server to stay consistent
        const all = await BusServices.getAllBuses();
        const list = all && all.data ? (Array.isArray(all.data) ? all.data : all.data.ResultSet || []) : [];
        setBusFleet(list.map(mapBusData));

        // reset and close
        setShowAddModal(false);
        setFormData({
          licensePlate: '',
          vehicle: '',
          capacity: '',
          assignedDriver: '',
          insuranceExpiry: '',
          licenseExpiry: '',
          status: 'active'
        });
        alert(resp.message || 'Bus added successfully');
      } else {
        setAddError('Failed to add bus. Please try again.');
      }
    } catch (err) {
      console.error('Error adding bus:', err);
      setAddError(err?.message || 'Failed to add bus');
    } finally {
      setAddLoading(false);
    }
  };

  const handleEditClick = (bus) => {
    setEditingBus(bus);
    setFormData({
      licensePlate: bus.plate || '',
      vehicle: bus.vehicle || '',
      capacity: bus.capacity || '',
      assignedDriver: bus.driver || '',
      insuranceExpiry: bus.insuranceExpiry || '',
      licenseExpiry: bus.licenseExpiry || '',
      status: (bus.status || 'active').toLowerCase()
    });
    setShowEditModal(true);
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    console.log('Updated Bus Data:', formData);
    alert('Bus updated successfully!');
    setShowEditModal(false);
    setEditingBus(null);
  };

  // Available drivers for dropdowns (fetched from API)
  const [availableDrivers, setAvailableDrivers] = useState([]);

  useEffect(() => {
    const fetchDriversForSelect = async () => {
      try {
        const res = await DriverServices.getAllDrivers();
        const list = res && res.data ? (Array.isArray(res.data) ? res.data : res.data.ResultSet || []) : [];
        const opts = list.map(d => ({
          id: d.DriverID || d.DriverId || d.id || d.UserID || '',
          name: d.DriverName || d.UserName || d.name || `Driver ${d.DriverID || d.DriverId || d.id || ''}`
        }));
        setAvailableDrivers(opts);
      } catch (err) {
        console.error('Error loading drivers for select:', err);
        setAvailableDrivers([]);
      }
    };
    fetchDriversForSelect();
  }, []);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Active': return 'bg-green-100 text-green-700 border-green-200';
      case 'Delayed': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Maintenance': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Active': return <CheckCircle className="w-4 h-4" />;
      case 'Delayed': return <AlertTriangle className="w-4 h-4" />;
      case 'Maintenance': return <XCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  const filteredBuses = busFleet.filter(bus => {
    const matchesSearch = bus.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bus.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bus.vehicle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || bus.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: busFleet.length,
    active: busFleet.filter(b => b.status === 'Active').length,
    maintenance: busFleet.filter(b => b.status === 'Maintenance').length
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#FFF8DC] via-[#FFF4C2] to-[#FFF8DC]">
      <OwnerHeader notifications={[]} ownerName="David" companyName="TrackMate Fleet" onMenuClick={onMenuClick} setActiveTab={setActiveTab} />
      
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Bus Management</h1>
              <p className="text-gray-600 mt-1">Monitor and manage your school buses</p>
            </div>
            <button 
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#1E3A5F] text-white rounded-xl hover:bg-[#3B6FB6] transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add New Bus
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-100">
                  <Bus className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                  <div className="text-sm text-gray-600">Total Buses</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
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
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-red-100">
                  <Wrench className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stats.maintenance}</div>
                  <div className="text-sm text-gray-600">Maintenance</div>
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
                  placeholder="Search by license plate, driver, or vehicle..."
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
                  <option value="active">Active</option>
                  <option value="delayed">Delayed</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>
            </div>
          </div>

          {/* Bus Cards Grid */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredBuses.map((bus) => (
              <div key={bus.plate} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                {/* Header */}
                <div className="p-4 border-b border-gray-100 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[#1E3A5F] flex items-center justify-center">
                        <Bus className="w-6 h-6 text-[#F5C518]" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{bus.plate}</h3>
                        <p className="text-xs text-gray-500">{bus.vehicle}</p>
                      </div>
                    </div>
                    <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(bus.status)}`}>
                      {getStatusIcon(bus.status)}
                      {bus.status}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-4 space-y-4">
                  {/* Driver */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700">Driver: {bus.driver}</span>
                    </div>
                  </div>

                  {/* Capacity */}
                  <div className="p-3 rounded-lg bg-gray-50">
                    <div className="text-xs text-gray-500 mb-1">Seating Capacity</div>
                    <div className="text-lg font-bold text-gray-900">{bus.capacity} seats</div>
                  </div>

                  {/* Insurance & License Expiry */}
                  <div className="space-y-2 pt-3 border-t border-gray-100">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Insurance Expiry:</span>
                      <span className="font-medium text-gray-900">{bus.insuranceExpiry || 'N/A'}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">License Expiry:</span>
                      <span className="font-medium text-gray-900">{bus.licenseExpiry || 'N/A'}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-2">
                  <button className="p-2 rounded-lg hover:bg-gray-200 transition-colors" title="View Details">
                    <Eye className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    className="px-3 py-2 bg-[#1E3A5F] text-white rounded-lg hover:bg-[#3B6FB6] transition-colors flex items-center gap-2 text-sm font-semibold"
                    title="Update"
                    onClick={() => handleEditClick(bus)}
                  >
                    <Edit className="w-4 h-4" />
                    <span>Update</span>
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

      {/* Add New Bus Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-[#1E3A5F] to-[#3B6FB6]">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Bus className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Add New Bus</h2>
                  <p className="text-white/70 text-sm">Fill in the details for the new bus</p>
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
                
                {/* Basic Information Section */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Bus Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        License Plate <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="licensePlate"
                        value={formData.licensePlate}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., ABC 1234"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Vehicle Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="vehicle"
                        value={formData.vehicle}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., Blue Bird Vision"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Seating Capacity <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="capacity"
                        value={formData.capacity}
                        onChange={handleInputChange}
                        required
                        min="1"
                        max="100"
                        placeholder="e.g., 45"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                      </label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all bg-white"
                      >
                        <option value="active">Active</option>
                        <option value="maintenance">Under Maintenance</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Driver Assignment Section */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Driver Assignment
                  </h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Assigned Driver
                    </label>
                    <select
                      name="assignedDriver"
                      value={formData.assignedDriver}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all bg-white"
                    >
                      <option value="">Select a driver</option>
                      {availableDrivers.map(driver => (
                        <option key={driver.id} value={driver.id}>{driver.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Expiry Dates Section */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Expiry Dates
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Insurance Expiry Date
                      </label>
                      <input
                        type="date"
                        name="insuranceExpiry"
                        value={formData.insuranceExpiry}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        License Expiry Date
                      </label>
                      <input
                        type="date"
                        name="licenseExpiry"
                        value={formData.licenseExpiry}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                </div>

              </div>
            </form>

            {addError && (
              <div className="px-6 pt-2 text-sm text-red-600">{addError}</div>
            )}
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
                disabled={addLoading}
                className={`px-5 py-2.5 bg-[#1E3A5F] text-white rounded-xl hover:bg-[#3B6FB6] transition-colors font-medium flex items-center gap-2 ${addLoading ? 'opacity-60 cursor-wait' : ''}`}
              >
                <Save className="w-4 h-4" />
                {addLoading ? 'Saving...' : 'Save Bus'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Bus Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-[#1E3A5F] to-[#3B6FB6]">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Edit className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Update Bus</h2>
                  <p className="text-white/70 text-sm">Review and update bus details</p>
                </div>
              </div>
              <button
                onClick={() => { setShowEditModal(false); setEditingBus(null); }}
                className="p-2 rounded-lg hover:bg-white/20 transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleUpdateSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
              <div className="space-y-6">

                {/* Basic Information Section */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Bus Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        License Plate
                      </label>
                      <input
                        type="text"
                        name="licensePlate"
                        value={formData.licensePlate}
                        disabled
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl bg-gray-100 text-gray-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Vehicle Name
                      </label>
                      <input
                        type="text"
                        name="vehicle"
                        value={formData.vehicle}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Seating Capacity
                      </label>
                      <input
                        type="number"
                        name="capacity"
                        value={formData.capacity}
                        onChange={handleInputChange}
                        min="1"
                        max="100"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                      </label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all bg-white"
                      >
                        <option value="active">Active</option>
                        <option value="maintenance">Under Maintenance</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Driver Assignment Section */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Driver Assignment
                  </h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Assigned Driver
                    </label>
                    <select
                      name="assignedDriver"
                      value={formData.assignedDriver}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all bg-white"
                    >
                      <option value="">Select a driver</option>
                      {availableDrivers.map(driver => (
                        <option key={driver.id} value={driver.id}>{driver.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Expiry Dates Section */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Expiry Dates
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Insurance Expiry Date
                      </label>
                      <input
                        type="date"
                        name="insuranceExpiry"
                        value={formData.insuranceExpiry}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        License Expiry Date
                      </label>
                      <input
                        type="date"
                        name="licenseExpiry"
                        value={formData.licenseExpiry}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                </div>

              </div>
            </form>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => { setShowEditModal(false); setEditingBus(null); }}
                className="px-5 py-2.5 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleUpdateSubmit}
                className="px-5 py-2.5 bg-[#1E3A5F] text-white rounded-xl hover:bg-[#3B6FB6] transition-colors font-medium flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Update Bus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Fleet;