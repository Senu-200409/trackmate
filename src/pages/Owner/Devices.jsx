import React, { useState } from 'react';
import { 
  Cpu,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Bus,
  Calendar,
  Activity,
  Wifi,
  WifiOff,
  MoreVertical,
  X,
  Save,
  Radio,
  MapPin,
  Settings
} from 'lucide-react';
import OwnerHeader from '../../components/Owner/OwnerHeader';
import OwnerFooter from '../../components/Owner/OwnerFooter';

function Devices({ onMenuClick, setActiveTab }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingDevice, setEditingDevice] = useState(null);
  const [formData, setFormData] = useState({
    deviceId: '',
    serialNumber: '',
    manufacturer: 'TrackMate',
    model: 'RFID-X200',
    firmwareVersion: '',
    assignedBus: '',
    installationDate: '',
    lastMaintenance: '',
    status: 'active',
    signalStrength: 'excellent',
    batteryLevel: '100',
    location: '',
    notes: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New Device Data:', formData);
    alert('Device added successfully!');
    setShowAddModal(false);
    resetForm();
  };

  const handleEditClick = (device) => {
    setEditingDevice(device);
    setFormData({
      deviceId: device.deviceId,
      serialNumber: device.serialNumber,
      manufacturer: device.manufacturer,
      model: device.model,
      firmwareVersion: device.firmwareVersion,
      assignedBus: device.assignedBus,
      installationDate: device.installationDate,
      lastMaintenance: device.lastMaintenance,
      status: device.status,
      signalStrength: device.signalStrength,
      batteryLevel: device.batteryLevel,
      location: device.location,
      notes: device.notes || ''
    });
    setShowEditModal(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log('Updated Device Data:', formData);
    alert('Device updated successfully!');
    setShowEditModal(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      deviceId: '',
      serialNumber: '',
      manufacturer: 'TrackMate',
      model: 'RFID-X200',
      firmwareVersion: '',
      assignedBus: '',
      installationDate: '',
      lastMaintenance: '',
      status: 'active',
      signalStrength: 'excellent',
      batteryLevel: '100',
      location: '',
      notes: ''
    });
  };

  // Sample device data
  const devices = [
    {
      id: 1,
      deviceId: 'RFID-001',
      serialNumber: 'TM-RFID-2024-001',
      manufacturer: 'TrackMate',
      model: 'RFID-X200',
      firmwareVersion: 'v2.4.1',
      assignedBus: 'BUS-001',
      busNumber: 'ABC 1234',
      installationDate: '2024-01-15',
      lastMaintenance: '2024-12-01',
      status: 'active',
      signalStrength: 'excellent',
      batteryLevel: '95',
      location: 'Main Depot',
      readsToday: 156,
      totalReads: 45230
    },
    {
      id: 2,
      deviceId: 'RFID-002',
      serialNumber: 'TM-RFID-2024-002',
      manufacturer: 'TrackMate',
      model: 'RFID-X200',
      firmwareVersion: 'v2.4.1',
      assignedBus: 'BUS-002',
      busNumber: 'DEF 5678',
      installationDate: '2024-01-20',
      lastMaintenance: '2024-11-28',
      status: 'active',
      signalStrength: 'good',
      batteryLevel: '88',
      location: 'Main Depot',
      readsToday: 142,
      totalReads: 38920
    },
    {
      id: 3,
      deviceId: 'RFID-003',
      serialNumber: 'TM-RFID-2024-003',
      manufacturer: 'TrackMate',
      model: 'RFID-X200',
      firmwareVersion: 'v2.3.5',
      assignedBus: 'BUS-003',
      busNumber: 'GHI 9012',
      installationDate: '2024-02-10',
      lastMaintenance: '2024-12-15',
      status: 'maintenance',
      signalStrength: 'fair',
      batteryLevel: '45',
      location: 'Workshop',
      readsToday: 0,
      totalReads: 32105
    },
    {
      id: 4,
      deviceId: 'RFID-004',
      serialNumber: 'TM-RFID-2024-004',
      manufacturer: 'TrackMate',
      model: 'RFID-X250',
      firmwareVersion: 'v2.4.1',
      assignedBus: 'BUS-004',
      busNumber: 'JKL 3456',
      installationDate: '2024-03-05',
      lastMaintenance: '2024-12-10',
      status: 'active',
      signalStrength: 'excellent',
      batteryLevel: '92',
      location: 'Main Depot',
      readsToday: 178,
      totalReads: 28450
    },
    {
      id: 5,
      deviceId: 'RFID-005',
      serialNumber: 'TM-RFID-2024-005',
      manufacturer: 'TrackMate',
      model: 'RFID-X200',
      firmwareVersion: 'v2.4.0',
      assignedBus: 'BUS-005',
      busNumber: 'MNO 7890',
      installationDate: '2024-03-20',
      lastMaintenance: '2024-11-25',
      status: 'offline',
      signalStrength: 'none',
      batteryLevel: '12',
      location: 'Main Depot',
      readsToday: 0,
      totalReads: 25678
    },
    {
      id: 6,
      deviceId: 'RFID-006',
      serialNumber: 'TM-RFID-2024-006',
      manufacturer: 'TrackMate',
      model: 'RFID-X250',
      firmwareVersion: 'v2.4.1',
      assignedBus: 'Unassigned',
      busNumber: 'N/A',
      installationDate: '2024-12-01',
      lastMaintenance: '2024-12-01',
      status: 'active',
      signalStrength: 'excellent',
      batteryLevel: '100',
      location: 'Warehouse',
      readsToday: 0,
      totalReads: 245
    },
  ];

  const availableBuses = [
    { id: 'BUS-001', name: 'BUS-001 (ABC 1234)' },
    { id: 'BUS-002', name: 'BUS-002 (DEF 5678)' },
    { id: 'BUS-003', name: 'BUS-003 (GHI 9012)' },
    { id: 'BUS-004', name: 'BUS-004 (JKL 3456)' },
    { id: 'BUS-005', name: 'BUS-005 (MNO 7890)' },
    { id: 'BUS-006', name: 'BUS-006 (PQR 1234)' },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-700 border-green-200';
      case 'offline': return 'bg-red-100 text-red-700 border-red-200';
      case 'maintenance': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'offline': return <XCircle className="w-4 h-4" />;
      case 'maintenance': return <AlertTriangle className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getSignalIcon = (strength) => {
    if (strength === 'none' || strength === 'offline') {
      return <WifiOff className="w-4 h-4 text-red-500" />;
    }
    return <Wifi className="w-4 h-4 text-green-500" />;
  };

  const getSignalColor = (strength) => {
    switch(strength) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'fair': return 'text-yellow-600';
      case 'poor': return 'text-orange-600';
      case 'none': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getBatteryColor = (level) => {
    const numLevel = parseInt(level);
    if (numLevel > 80) return 'text-green-600 bg-green-100';
    if (numLevel > 50) return 'text-blue-600 bg-blue-100';
    if (numLevel > 20) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const filteredDevices = devices.filter(device => {
    const matchesSearch = device.deviceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.assignedBus.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || device.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: devices.length,
    active: devices.filter(d => d.status === 'active').length,
    offline: devices.filter(d => d.status === 'offline').length,
    maintenance: devices.filter(d => d.status === 'maintenance').length,
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#FFF3B0] via-[#FFE082] to-[#FFF3B0]">
      <OwnerHeader notifications={[]} ownerName="David" companyName="TrackMate Fleet" onMenuClick={onMenuClick} setActiveTab={setActiveTab} />
      
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">RFID Devices</h1>
              <p className="text-gray-600 mt-1">Manage your RFID readers and tracking devices</p>
            </div>
            <button 
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#1E3A5F] text-white rounded-xl hover:bg-[#3B6FB6] transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add New Device
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-100">
                  <Cpu className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                  <div className="text-sm text-gray-600">Total Devices</div>
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
                  <XCircle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stats.offline}</div>
                  <div className="text-sm text-gray-600">Offline</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-yellow-100">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
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
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by Device ID, Serial Number, or Bus..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3A5F] focus:border-transparent"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-600" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3A5F] focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="offline">Offline</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>
            </div>
          </div>

          {/* Devices Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDevices.map((device) => (
              <div key={device.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                {/* Card Header */}
                <div className="p-4 bg-gradient-to-r from-[#1E3A5F] to-[#3B6FB6] text-white">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/20 rounded-lg">
                        <Cpu className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="font-bold text-lg">{device.deviceId}</div>
                        <div className="text-xs text-white/80">{device.serialNumber}</div>
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 ${getStatusColor(device.status)}`}>
                      {getStatusIcon(device.status)}
                      <span className="capitalize">{device.status}</span>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 space-y-3">
                  {/* Device Info */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Model:</span>
                      <span className="font-semibold text-gray-900">{device.model}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Firmware:</span>
                      <span className="font-semibold text-gray-900">{device.firmwareVersion}</span>
                    </div>
                  </div>

                  {/* Bus Assignment */}
                  <div className="p-3 rounded-lg bg-blue-50 border border-blue-100">
                    <div className="flex items-center gap-2 mb-1">
                      <Bus className="w-4 h-4 text-blue-600" />
                      <span className="text-xs font-semibold text-blue-900">Assigned Bus</span>
                    </div>
                    <div className="font-bold text-blue-900">
                      {device.assignedBus === 'Unassigned' ? (
                        <span className="text-gray-500 font-normal">Not Assigned</span>
                      ) : (
                        `${device.assignedBus} (${device.busNumber})`
                      )}
                    </div>
                  </div>

                  {/* Signal & Battery */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                      <div className="flex items-center gap-2 mb-1">
                        {getSignalIcon(device.signalStrength)}
                        <span className="text-xs text-gray-600">Signal</span>
                      </div>
                      <div className={`text-sm font-semibold capitalize ${getSignalColor(device.signalStrength)}`}>
                        {device.signalStrength}
                      </div>
                    </div>
                    <div className={`p-3 rounded-lg border ${getBatteryColor(device.batteryLevel)}`}>
                      <div className="text-xs mb-1">Battery</div>
                      <div className="text-sm font-bold">{device.batteryLevel}%</div>
                    </div>
                  </div>

                  {/* Activity Stats */}
                  <div className="p-3 rounded-lg bg-purple-50 border border-purple-100">
                    <div className="grid grid-cols-2 gap-3 text-center">
                      <div>
                        <div className="text-xl font-bold text-purple-900">{device.readsToday}</div>
                        <div className="text-xs text-purple-600">Reads Today</div>
                      </div>
                      <div>
                        <div className="text-xl font-bold text-purple-900">{device.totalReads.toLocaleString()}</div>
                        <div className="text-xs text-purple-600">Total Reads</div>
                      </div>
                    </div>
                  </div>

                  {/* Location & Date */}
                  <div className="pt-3 border-t border-gray-100 space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{device.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Installed: {device.installationDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Settings className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Maintained: {device.lastMaintenance}</span>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleEditClick(device)}
                    className="flex-1 px-3 py-2 rounded-lg bg-[#1E3A5F] text-white hover:bg-[#3B6FB6] transition-colors text-sm font-medium flex items-center justify-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Edit Device
                  </button>
                  <button className="p-2 rounded-lg hover:bg-gray-200 transition-colors">
                    <MoreVertical className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredDevices.length === 0 && (
            <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
              <Cpu className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No devices found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          )}

        </div>
      </main>

      <OwnerFooter />

      {/* Add Device Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-[#1E3A5F] to-[#3B6FB6]">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Cpu className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Add New RFID Device</h2>
                  <p className="text-white/70 text-sm">Register a new device in the system</p>
                </div>
              </div>
              <button 
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="p-6 space-y-6">
                
                {/* Device Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Radio className="w-5 h-5 text-[#1E3A5F]" />
                    Device Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Device ID *</label>
                      <input
                        type="text"
                        name="deviceId"
                        value={formData.deviceId}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3A5F] focus:border-transparent"
                        placeholder="RFID-007"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Serial Number *</label>
                      <input
                        type="text"
                        name="serialNumber"
                        value={formData.serialNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3A5F] focus:border-transparent"
                        placeholder="TM-RFID-2024-007"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Manufacturer</label>
                      <select
                        name="manufacturer"
                        value={formData.manufacturer}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3A5F] focus:border-transparent"
                      >
                        <option value="TrackMate">TrackMate</option>
                        <option value="RFID Solutions">RFID Solutions</option>
                        <option value="TechTrack">TechTrack</option>
                        <option value="SmartScan">SmartScan</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
                      <select
                        name="model"
                        value={formData.model}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3A5F] focus:border-transparent"
                      >
                        <option value="RFID-X200">RFID-X200</option>
                        <option value="RFID-X250">RFID-X250</option>
                        <option value="RFID-Pro">RFID-Pro</option>
                        <option value="RFID-Lite">RFID-Lite</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Firmware Version</label>
                      <input
                        type="text"
                        name="firmwareVersion"
                        value={formData.firmwareVersion}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3A5F] focus:border-transparent"
                        placeholder="v2.4.1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3A5F] focus:border-transparent"
                      >
                        <option value="active">Active</option>
                        <option value="offline">Offline</option>
                        <option value="maintenance">Maintenance</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Assignment & Location */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Bus className="w-5 h-5 text-[#1E3A5F]" />
                    Assignment & Location
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Assigned Bus</label>
                      <select
                        name="assignedBus"
                        value={formData.assignedBus}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3A5F] focus:border-transparent"
                      >
                        <option value="">Unassigned</option>
                        {availableBuses.map(bus => (
                          <option key={bus.id} value={bus.id}>{bus.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3A5F] focus:border-transparent"
                        placeholder="Main Depot"
                      />
                    </div>
                  </div>
                </div>

                {/* Technical Details */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-[#1E3A5F]" />
                    Technical Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Signal Strength</label>
                      <select
                        name="signalStrength"
                        value={formData.signalStrength}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3A5F] focus:border-transparent"
                      >
                        <option value="excellent">Excellent</option>
                        <option value="good">Good</option>
                        <option value="fair">Fair</option>
                        <option value="poor">Poor</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Battery Level (%)</label>
                      <input
                        type="number"
                        name="batteryLevel"
                        value={formData.batteryLevel}
                        onChange={handleInputChange}
                        min="0"
                        max="100"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3A5F] focus:border-transparent"
                        placeholder="100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Installation Date</label>
                      <input
                        type="date"
                        name="installationDate"
                        value={formData.installationDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3A5F] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Maintenance</label>
                      <input
                        type="date"
                        name="lastMaintenance"
                        value={formData.lastMaintenance}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3A5F] focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3A5F] focus:border-transparent"
                    placeholder="Additional notes or comments..."
                  />
                </div>

              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 px-6 py-4 bg-gray-50 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#1E3A5F] text-white rounded-lg hover:bg-[#3B6FB6] transition-colors font-medium flex items-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Add Device
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Device Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-[#1E3A5F] to-[#3B6FB6]">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Edit className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Edit Device</h2>
                  <p className="text-white/70 text-sm">Update device information</p>
                </div>
              </div>
              <button 
                onClick={() => setShowEditModal(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Modal Body - Same form structure as Add Modal */}
            <form onSubmit={handleUpdate} className="overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="p-6 space-y-6">
                
                {/* Device Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Radio className="w-5 h-5 text-[#1E3A5F]" />
                    Device Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Device ID *</label>
                      <input
                        type="text"
                        name="deviceId"
                        value={formData.deviceId}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3A5F] focus:border-transparent bg-gray-50"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Serial Number *</label>
                      <input
                        type="text"
                        name="serialNumber"
                        value={formData.serialNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3A5F] focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Manufacturer</label>
                      <select
                        name="manufacturer"
                        value={formData.manufacturer}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3A5F] focus:border-transparent"
                      >
                        <option value="TrackMate">TrackMate</option>
                        <option value="RFID Solutions">RFID Solutions</option>
                        <option value="TechTrack">TechTrack</option>
                        <option value="SmartScan">SmartScan</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
                      <select
                        name="model"
                        value={formData.model}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3A5F] focus:border-transparent"
                      >
                        <option value="RFID-X200">RFID-X200</option>
                        <option value="RFID-X250">RFID-X250</option>
                        <option value="RFID-Pro">RFID-Pro</option>
                        <option value="RFID-Lite">RFID-Lite</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Firmware Version</label>
                      <input
                        type="text"
                        name="firmwareVersion"
                        value={formData.firmwareVersion}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3A5F] focus:border-transparent"
                        placeholder="v2.4.1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3A5F] focus:border-transparent"
                      >
                        <option value="active">Active</option>
                        <option value="offline">Offline</option>
                        <option value="maintenance">Maintenance</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Assignment & Location */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Bus className="w-5 h-5 text-[#1E3A5F]" />
                    Assignment & Location
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Assigned Bus</label>
                      <select
                        name="assignedBus"
                        value={formData.assignedBus}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3A5F] focus:border-transparent"
                      >
                        <option value="">Unassigned</option>
                        {availableBuses.map(bus => (
                          <option key={bus.id} value={bus.id}>{bus.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3A5F] focus:border-transparent"
                        placeholder="Main Depot"
                      />
                    </div>
                  </div>
                </div>

                {/* Technical Details */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-[#1E3A5F]" />
                    Technical Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Signal Strength</label>
                      <select
                        name="signalStrength"
                        value={formData.signalStrength}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3A5F] focus:border-transparent"
                      >
                        <option value="excellent">Excellent</option>
                        <option value="good">Good</option>
                        <option value="fair">Fair</option>
                        <option value="poor">Poor</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Battery Level (%)</label>
                      <input
                        type="number"
                        name="batteryLevel"
                        value={formData.batteryLevel}
                        onChange={handleInputChange}
                        min="0"
                        max="100"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3A5F] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Installation Date</label>
                      <input
                        type="date"
                        name="installationDate"
                        value={formData.installationDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3A5F] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Maintenance</label>
                      <input
                        type="date"
                        name="lastMaintenance"
                        value={formData.lastMaintenance}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3A5F] focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3A5F] focus:border-transparent"
                    placeholder="Additional notes or comments..."
                  />
                </div>

              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 px-6 py-4 bg-gray-50 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#1E3A5F] text-white rounded-lg hover:bg-[#3B6FB6] transition-colors font-medium flex items-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Update Device
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default Devices;
