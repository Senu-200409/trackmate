import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Cpu,
  Edit,
  Filter,
  Plus,
  Radio,
  Save,
  Search,
  X,
  Loader2,
} from 'lucide-react';
import OwnerFooter from '../../components/Owner/OwnerFooter';
import OwnerHeader from '../../components/Owner/OwnerHeader';
import DeviceServices from '../../services/DeviceServices';

const normalizeDevice = (item) => ({
  deviceId: String(item.DeviceID || item.deviceId || item.id || ''),
  deviceName: item.DeviceName || item.deviceName || '',
  numberPlate: item.NumberPlate || item.numberPlate || '',
  status: String(item.Status || item.status || 'A').toUpperCase(),
});

function Devices({ onMenuClick, setActiveTab }) {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingDeviceId, setEditingDeviceId] = useState('');

  const [saving, setSaving] = useState(false);
  const [updating, setUpdating] = useState(false);

  const [formData, setFormData] = useState({
    deviceName: '',
    numberPlate: '',
  });

  const resetForm = () => {
    setFormData({
      deviceName: '',
      numberPlate: '',
    });
  };

  const fetchDevices = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const response = await DeviceServices.getAllDevices();
      const rows = Array.isArray(response.data) ? response.data : [];
      setDevices(rows.map(normalizeDevice));
    } catch (err) {
      console.error('Error fetching devices:', err);
      setError('Failed to load devices');
      setDevices([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDevices();
  }, [fetchDevices]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.deviceName.trim() || !formData.numberPlate.trim()) {
      setError('Device Name and Number Plate are required.');
      return;
    }

    try {
      setSaving(true);
      setError('');
      await DeviceServices.createDevice({
        DeviceName: formData.deviceName.trim(),
        NumberPlate: formData.numberPlate.trim(),
      });
      setShowAddModal(false);
      resetForm();
      await fetchDevices();
    } catch (err) {
      console.error('Error adding device:', err);
      setError('Failed to add device');
    } finally {
      setSaving(false);
    }
  };

  const handleEditClick = (device) => {
    setEditingDeviceId(device.deviceId);
    setFormData({
      deviceName: device.deviceName || '',
      numberPlate: device.numberPlate || '',
    });
    setShowEditModal(true);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    if (!editingDeviceId) {
      setError('Invalid device selected for update.');
      return;
    }

    if (!formData.deviceName.trim() || !formData.numberPlate.trim()) {
      setError('Device Name and Number Plate are required.');
      return;
    }

    try {
      setUpdating(true);
      setError('');
      await DeviceServices.updateDevice(editingDeviceId, {
        DeviceID: editingDeviceId,
        DeviceName: formData.deviceName.trim(),
        NumberPlate: formData.numberPlate.trim(),
      });
      setShowEditModal(false);
      setEditingDeviceId('');
      resetForm();
      await fetchDevices();
    } catch (err) {
      console.error('Error updating device:', err);
      setError('Failed to update device');
    } finally {
      setUpdating(false);
    }
  };

  const filteredDevices = useMemo(() => {
    const term = searchTerm.toLowerCase();

    return devices.filter((device) => {
      const matchesSearch =
        device.deviceId.toLowerCase().includes(term)
        || device.deviceName.toLowerCase().includes(term)
        || device.numberPlate.toLowerCase().includes(term);

      const matchesStatus = filterStatus === 'all' || device.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [devices, filterStatus, searchTerm]);

  const renderStatusBadge = (status) => {
    const styles = {
      A: 'bg-green-100 text-green-800',
      I: 'bg-gray-100 text-gray-800',
    };

    const labels = {
      A: 'Active',
      I: 'Inactive',
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status] || 'bg-gray-100 text-gray-800'}`}>
        {labels[status] || status || 'Unknown'}
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
              <p className="text-gray-500">Manage device records from live API</p>
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
              placeholder="Search by ID, name, or number plate"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3A5F] focus:border-transparent"
            />
          </div>
          <div className="relative">
            <Filter className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <select
              value={filterStatus}
              onChange={(event) => setFilterStatus(event.target.value)}
              className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3A5F] focus:border-transparent"
            >
              <option value="all">All Statuses</option>
              <option value="A">Active</option>
              <option value="I">Inactive</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700 text-sm">{error}</div>
        )}

        {loading && (
          <div className="bg-white rounded-xl border border-gray-100 p-8 text-center text-gray-600 inline-flex items-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            Loading devices...
          </div>
        )}

        {!loading && (
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
                    <span>Number Plate: {device.numberPlate || '-'}</span>
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
        )}
      </main>

      <OwnerFooter />

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-hidden">
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
                  <div className="grid grid-cols-1 gap-4">
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">Number Plate *</label>
                      <input
                        type="text"
                        name="numberPlate"
                        value={formData.numberPlate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3A5F] focus:border-transparent"
                        required
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
                  disabled={saving}
                  className="px-6 py-2.5 bg-[#1E3A5F] text-white rounded-lg hover:bg-[#3B6FB6] transition-colors font-medium flex items-center gap-2 disabled:opacity-50"
                >
                  {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                  Add Device
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-hidden">
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
              <button onClick={() => { setShowEditModal(false); setEditingDeviceId(''); }} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
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
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Device ID *</label>
                      <input
                        type="text"
                        value={editingDeviceId}
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">Number Plate *</label>
                      <input
                        type="text"
                        name="numberPlate"
                        value={formData.numberPlate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3A5F] focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 px-6 py-4 bg-gray-50 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => { setShowEditModal(false); setEditingDeviceId(''); }}
                  className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className="px-6 py-2.5 bg-[#1E3A5F] text-white rounded-lg hover:bg-[#3B6FB6] transition-colors font-medium flex items-center gap-2 disabled:opacity-50"
                >
                  {updating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
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
