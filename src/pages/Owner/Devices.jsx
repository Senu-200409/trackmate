import React, { useMemo, useState } from 'react';
import {
  Activity,
  Bus,
  Calendar,
  Cpu,
  Edit,
  Filter,
  Plus,
  Radio,
  Save,
  Search,
  X
} from 'lucide-react';
import OwnerFooter from '../../components/Owner/OwnerFooter';
import OwnerHeader from '../../components/Owner/OwnerHeader';

const availableBuses = [
  { id: 'BUS-101', name: 'Bus 101' },
  { id: 'BUS-203', name: 'Bus 203' },
  { id: 'BUS-305', name: 'Bus 305' }
];

const initialDevices = [
  {
    deviceId: 'DEV-001',
    deviceName: 'North Gate RFID',
    deviceType: 'RFID',
    status: 'active',
    busId: 'BUS-101',
    installationDate: '2023-08-01',
    lastMaintenance: '2023-12-10'
  },
  {
    deviceId: 'DEV-002',
    deviceName: 'Route 5 GPS',
    deviceType: 'GPS',
    status: 'maintenance',
    busId: '',
    installationDate: '2023-06-15',
    lastMaintenance: '2024-01-05'
  },
  {
    deviceId: 'DEV-003',
    deviceName: 'West Lot Camera',
    deviceType: 'Camera',
    status: 'offline',
    busId: 'BUS-203',
    installationDate: '2023-10-20',
    lastMaintenance: '2024-02-18'
  }
];

function Devices({ onMenuClick, setActiveTab }) {
  const [devices, setDevices] = useState(initialDevices);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingDeviceId, setEditingDeviceId] = useState(null);
  const [formData, setFormData] = useState({
    deviceId: '',
    deviceName: '',
    deviceType: 'RFID',
    status: 'active',
    busId: '',
    installationDate: '',
    lastMaintenance: ''
  });

  const resetForm = () => {
    setFormData({
      deviceId: '',
      deviceName: '',
      deviceType: 'RFID',
      status: 'active',
      busId: '',
      installationDate: '',
      lastMaintenance: ''
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setDevices((prev) => [...prev, formData]);
    setShowAddModal(false);
    resetForm();
  };

  const handleEditClick = (device) => {
    setEditingDeviceId(device.deviceId);
    setFormData({ ...device });
    setShowEditModal(true);
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    setDevices((prev) => prev.map((device) => (device.deviceId === editingDeviceId ? formData : device)));
    setShowEditModal(false);
    resetForm();
  };

  const filteredDevices = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return devices.filter((device) => {
      const matchesSearch =
        device.deviceId.toLowerCase().includes(term) ||
        device.deviceName.toLowerCase().includes(term) ||
        device.busId.toLowerCase().includes(term);

      const matchesStatus = filterStatus === 'all' ? true : device.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [devices, filterStatus, searchTerm]);

  const renderStatusBadge = (status) => {
    const styles = {
      active: 'bg-green-100 text-green-800',
      offline: 'bg-red-100 text-red-800',
      maintenance: 'bg-yellow-100 text-yellow-800'
    };
    const labels = {
      active: 'Active',
      offline: 'Offline',
      maintenance: 'Maintenance'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status] || 'bg-gray-100 text-gray-800'}`}>
        {labels[status] || 'Unknown'}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <OwnerHeader onMenuClick={onMenuClick} setActiveTab={setActiveTab} />

      <main className="flex-1 container mx-auto px-4 py-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#1E3A5F] text-white rounded-xl shadow">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Devices</h1>
              <p className="text-gray-500">Manage device assignments and maintenance</p>
            </div>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#1E3A5F] text-white rounded-lg hover:bg-[#3B6FB6] transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Device
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:items-center">
          <div className="relative w-full md:w-1/2">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by ID, name, or bus"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3A5F] focus:border-transparent"
            />
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Filter className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <select
                value={filterStatus}
                onChange={(event) => setFilterStatus(event.target.value)}
                className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3A5F] focus:border-transparent"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="offline">Offline</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDevices.map((device) => (
            <div key={device.deviceId} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500">{device.deviceId}</p>
                  <h3 className="text-lg font-semibold text-gray-900">{device.deviceName}</h3>
                </div>
                {renderStatusBadge(device.status)}
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Radio className="w-4 h-4 text-[#1E3A5F]" />
                  <span>{device.deviceType}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bus className="w-4 h-4 text-[#1E3A5F]" />
                  <span>{device.busId || 'Unassigned'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#1E3A5F]" />
                  <span>Installed: {device.installationDate || '—'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#1E3A5F]" />
                  <span>Last maintenance: {device.lastMaintenance || '—'}</span>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => handleEditClick(device)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
              </div>
            </div>
          ))}
          {filteredDevices.length === 0 && (
            <div className="col-span-full text-center py-12 bg-white rounded-xl border border-dashed border-gray-200">
              <p className="text-gray-500">No devices match your filters.</p>
            </div>
          )}
        </div>
      </main>

      <OwnerFooter />

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-[#1E3A5F] to-[#3B6FB6]">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Plus className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Add Device</h2>
                  <p className="text-white/70 text-sm">Create a new device record</p>
                </div>
              </div>
              <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="p-6 space-y-6">
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
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Device Name *</label>
                      <input
                        type="text"
                        name="deviceName"
                        value={formData.deviceName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3A5F] focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Device Type *</label>
                      <select
                        name="deviceType"
                        value={formData.deviceType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3A5F] focus:border-transparent"
                        required
                      >
                        <option value="RFID">RFID</option>
                        <option value="GPS">GPS</option>
                        <option value="Camera">Camera</option>
                      </select>
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

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Bus className="w-5 h-5 text-[#1E3A5F]" />
                    Assignment & Maintenance
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Assigned Bus</label>
                      <select
                        name="busId"
                        value={formData.busId}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3A5F] focus:border-transparent"
                      >
                        <option value="">Unassigned</option>
                        {availableBuses.map((bus) => (
                          <option key={bus.id} value={bus.id}>
                            {bus.name}
                          </option>
                        ))}
                      </select>
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
              </div>

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

      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
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
              <button onClick={() => setShowEditModal(false)} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="p-6 space-y-6">
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">Device Name *</label>
                      <input
                        type="text"
                        name="deviceName"
                        value={formData.deviceName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3A5F] focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Device Type *</label>
                      <select
                        name="deviceType"
                        value={formData.deviceType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3A5F] focus:border-transparent"
                        required
                      >
                        <option value="RFID">RFID</option>
                        <option value="GPS">GPS</option>
                        <option value="Camera">Camera</option>
                      </select>
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

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Bus className="w-5 h-5 text-[#1E3A5F]" />
                    Assignment & Maintenance
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Assigned Bus</label>
                      <select
                        name="busId"
                        value={formData.busId}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3A5F] focus:border-transparent"
                      >
                        <option value="">Unassigned</option>
                        {availableBuses.map((bus) => (
                          <option key={bus.id} value={bus.id}>
                            {bus.name}
                          </option>
                        ))}
                      </select>
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
              </div>

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
