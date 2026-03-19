import React, { useEffect, useMemo, useState } from 'react';
import {
  Radio,
  Search,
  Filter,
  Plus,
  User,
  RefreshCw,
  Save,
  X,
  Loader2,
  ShieldAlert,
  CheckCircle,
} from 'lucide-react';
import OwnerHeader from '../../components/Owner/OwnerHeader';
import OwnerFooter from '../../components/Owner/OwnerFooter';
import RfidServices from '../../services/RfidServices';
import StudentServices from '../../services/StudentServices';
import DeviceServices from '../../services/DeviceServices';

const STATUS_OPTIONS = [
  { value: 'A', label: 'Active' },
  { value: 'I', label: 'Inactive' },
  { value: 'L', label: 'Lost' },
  { value: 'B', label: 'Blocked' },
];

const LOG_TYPE_OPTIONS = ['IN', 'OUT'];

const toArray = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }
  if (payload && Array.isArray(payload.ResultSet)) {
    return payload.ResultSet;
  }
  return [];
};

const firstDefined = (...values) => values.find((value) => value !== undefined && value !== null && value !== '');

const normalizeStudent = (item) => {
  const id = String(firstDefined(item.StudentID, item.studentId, item.id, '')).trim();
  const name = firstDefined(item.StudentName, item.name, item.UserName, item.FullName, `Student ${id}`);

  return {
    id,
    name,
  };
};

const normalizeDevice = (item) => {
  const id = String(firstDefined(item.DeviceID, item.deviceId, item.id, '')).trim();
  const name = firstDefined(item.DeviceName, item.deviceName, item.SerialNo, item.SerialNumber, `Device ${id}`);

  return {
    id,
    name,
  };
};

const normalizeRfidLog = (item) => ({
  logId: String(firstDefined(item.LogID, item.logId, item.id, '')),
  rfidCode: String(firstDefined(item.RFIDCode, item.rfidCode, '')).trim(),
  studentId: String(firstDefined(item.StudentID, item.studentId, '')).trim(),
  deviceId: String(firstDefined(item.DeviceID, item.deviceId, '')).trim(),
  logDate: firstDefined(item.LogDate, item.logDate, ''),
  logTime: firstDefined(item.LogTime, item.logTime, ''),
  logType: String(firstDefined(item.LogType, item.logType, '')).toUpperCase(),
  status: String(firstDefined(item.Status, item.status, 'A')).toUpperCase(),
  createdBy: firstDefined(item.CreatedBy, item.createdBy, ''),
  updatedBy: firstDefined(item.UpdatedBy, item.updatedBy, ''),
  raw: item,
});

const statusLabel = (status) => {
  const code = String(status || '').toUpperCase();
  const map = {
    A: 'Active',
    I: 'Inactive',
    L: 'Lost',
    B: 'Blocked',
  };
  return map[code] || code || 'Unknown';
};

const statusPillClass = (status) => {
  const code = String(status || '').toUpperCase();
  if (code === 'A') return 'bg-green-100 text-green-800 border-green-200';
  if (code === 'I') return 'bg-gray-100 text-gray-700 border-gray-200';
  if (code === 'L') return 'bg-yellow-100 text-yellow-800 border-yellow-200';
  if (code === 'B') return 'bg-red-100 text-red-800 border-red-200';
  return 'bg-slate-100 text-slate-700 border-slate-200';
};

function Rfid({ onMenuClick, setActiveTab, onLogout }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [updatingByLogId, setUpdatingByLogId] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [rfidLogs, setRfidLogs] = useState([]);
  const [students, setStudents] = useState([]);
  const [devices, setDevices] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [logTypeFilter, setLogTypeFilter] = useState('all');

  const [showAddModal, setShowAddModal] = useState(false);
  const [statusDraftByLogId, setStatusDraftByLogId] = useState({});

  const [formData, setFormData] = useState({
    RFIDCode: '',
    StudentID: '',
    DeviceID: '',
    Userid: localStorage.getItem('userId') || '1',
    LogType: 'IN',
  });

  const studentMap = useMemo(() => {
    const map = new Map();
    students.forEach((student) => map.set(student.id, student.name));
    return map;
  }, [students]);

  const deviceMap = useMemo(() => {
    const map = new Map();
    devices.forEach((device) => map.set(device.id, device.name));
    return map;
  }, [devices]);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      setError('');

      const [rfidRes, studentsRes, devicesRes] = await Promise.all([
        RfidServices.getAllRfid(),
        StudentServices.getAllStudents(),
        DeviceServices.getAllDevices(),
      ]);

      const rfidRows = toArray(rfidRes?.raw || rfidRes?.data || []).map(normalizeRfidLog);
      const studentRows = toArray(studentsRes?.data || []).map(normalizeStudent).filter((s) => s.id);
      const deviceRows = toArray(devicesRes?.data || []).map(normalizeDevice).filter((d) => d.id);

      setRfidLogs(rfidRows);
      setStudents(studentRows);
      setDevices(deviceRows);

      const initialStatus = {};
      rfidRows.forEach((row) => {
        if (row.logId) {
          initialStatus[row.logId] = row.status;
        }
      });
      setStatusDraftByLogId(initialStatus);
    } catch (err) {
      console.error('Error loading RFID page data:', err);
      setError('Failed to load RFID data. Please try again.');
      setRfidLogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const stats = useMemo(() => ({
    total: rfidLogs.length,
    active: rfidLogs.filter((item) => item.status === 'A').length,
    assignedStudents: new Set(rfidLogs.filter((item) => item.studentId && item.status === 'A').map((item) => item.studentId)).size,
  }), [rfidLogs]);

  const filteredLogs = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return rfidLogs.filter((item) => {
      const studentName = (studentMap.get(item.studentId) || '').toLowerCase();
      const deviceName = (deviceMap.get(item.deviceId) || '').toLowerCase();

      const matchesSearch = !search
        || item.rfidCode.toLowerCase().includes(search)
        || item.studentId.toLowerCase().includes(search)
        || item.deviceId.toLowerCase().includes(search)
        || studentName.includes(search)
        || deviceName.includes(search);

      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      const matchesLogType = logTypeFilter === 'all' || item.logType === logTypeFilter;

      return matchesSearch && matchesStatus && matchesLogType;
    });
  }, [rfidLogs, searchTerm, statusFilter, logTypeFilter, studentMap, deviceMap]);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateCreateForm = () => {
    if (!formData.RFIDCode.trim()) return 'RFID code is required.';
    if (!formData.StudentID) return 'Student is required.';
    if (!formData.DeviceID) return 'Device is required.';
    if (!formData.Userid) return 'Userid is required.';
    if (!formData.LogType) return 'Log type is required.';

    const duplicateCode = rfidLogs.some(
      (item) => item.rfidCode.toLowerCase() === formData.RFIDCode.trim().toLowerCase()
    );
    if (duplicateCode) {
      return 'RFID code already exists. Please use a unique card code.';
    }

    const hasActiveCard = rfidLogs.some(
      (item) => item.studentId === String(formData.StudentID) && item.status === 'A'
    );
    if (hasActiveCard) {
      return 'This student already has an active RFID card. Deactivate it before assigning a new one.';
    }

    return '';
  };

  const handleCreateRfid = async (event) => {
    event.preventDefault();

    setError('');
    setSuccess('');

    const validationError = validateCreateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setSaving(true);
      await RfidServices.addRfid({
        RFIDCode: formData.RFIDCode.trim(),
        StudentID: formData.StudentID,
        DeviceID: formData.DeviceID,
        Userid: formData.Userid,
        LogType: formData.LogType,
      });

      setSuccess('RFID card added and assigned successfully.');
      setShowAddModal(false);
      setFormData((prev) => ({
        ...prev,
        RFIDCode: '',
        StudentID: '',
        DeviceID: '',
        LogType: 'IN',
      }));

      await fetchAllData();
    } catch (err) {
      console.error('Failed to add RFID card:', err);
      setError('Failed to add RFID card. Please verify data and try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleStatusDraftChange = (logId, value) => {
    setStatusDraftByLogId((prev) => ({
      ...prev,
      [logId]: value,
    }));
  };

  const handleStatusUpdate = async (logId) => {
    const nextStatus = statusDraftByLogId[logId];
    if (!nextStatus) {
      setError('Please select a status before updating.');
      return;
    }

    try {
      setUpdatingByLogId((prev) => ({ ...prev, [logId]: true }));
      setError('');
      setSuccess('');

      await RfidServices.updateRfidStatus({
        LogID: logId,
        Status: nextStatus,
      });

      setRfidLogs((prev) => prev.map((item) => (
        item.logId === String(logId)
          ? { ...item, status: nextStatus }
          : item
      )));

      setSuccess('RFID status updated successfully.');
    } catch (err) {
      console.error('Failed to update RFID status:', err);
      setError('Failed to update RFID status. Please try again.');
    } finally {
      setUpdatingByLogId((prev) => ({ ...prev, [logId]: false }));
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#F6FBFF] via-[#EAF4FF] to-[#F6FBFF]">
      <OwnerHeader notifications={[]} ownerName="David" companyName="TrackMate Fleet" onMenuClick={onMenuClick} setActiveTab={setActiveTab} onLogout={onLogout} />

      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">RFID Management</h1>
              <p className="text-gray-600 mt-1">Add RFID cards and assign them to students</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={fetchAllData}
                className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                type="button"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1E3A5F] text-white rounded-xl hover:bg-[#3B6FB6] transition-colors"
                type="button"
              >
                <Plus className="w-5 h-5" />
                Add RFID Card
              </button>
            </div>
          </div>

          {(error || success) && (
            <div className="space-y-2">
              {error && (
                <div className="flex items-start gap-2 p-3 rounded-lg border border-red-200 bg-red-50 text-red-700">
                  <ShieldAlert className="w-5 h-5 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}
              {success && (
                <div className="flex items-start gap-2 p-3 rounded-lg border border-green-200 bg-green-50 text-green-700">
                  <CheckCircle className="w-5 h-5 mt-0.5" />
                  <span>{success}</span>
                </div>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-100">
                  <Radio className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                  <div className="text-sm text-gray-600">Total RFID Logs</div>
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
                  <div className="text-sm text-gray-600">Active Cards</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-100">
                  <User className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stats.assignedStudents}</div>
                  <div className="text-sm text-gray-600">Students Assigned</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent"
                  placeholder="Search RFID, student, or device"
                />
              </div>

              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent bg-white"
                >
                  <option value="all">All Status</option>
                  {STATUS_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={logTypeFilter}
                  onChange={(event) => setLogTypeFilter(event.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent bg-white"
                >
                  <option value="all">All Log Types</option>
                  {LOG_TYPE_OPTIONS.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">RFID</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Student</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Device</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Log Type</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date / Time</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Update</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {loading && (
                    <tr>
                      <td colSpan={7} className="px-4 py-12 text-center text-gray-500">
                        <div className="inline-flex items-center gap-2">
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Loading RFID data...
                        </div>
                      </td>
                    </tr>
                  )}

                  {!loading && filteredLogs.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-4 py-12 text-center text-gray-500">
                        No RFID records found.
                      </td>
                    </tr>
                  )}

                  {!loading && filteredLogs.map((row) => (
                    <tr key={row.logId || `${row.rfidCode}-${row.studentId}-${row.deviceId}`}>
                      <td className="px-4 py-3">
                        <p className="font-semibold text-gray-900">{row.rfidCode || '-'}</p>
                        <p className="text-xs text-gray-500">LogID: {row.logId || '-'}</p>
                      </td>

                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-900">{studentMap.get(row.studentId) || `Student ${row.studentId || '-'}`}</p>
                        <p className="text-xs text-gray-500">ID: {row.studentId || '-'}</p>
                      </td>

                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-900">{deviceMap.get(row.deviceId) || `Device ${row.deviceId || '-'}`}</p>
                        <p className="text-xs text-gray-500">ID: {row.deviceId || '-'}</p>
                      </td>

                      <td className="px-4 py-3">
                        <span className="px-2.5 py-1 rounded-full text-xs bg-blue-100 text-blue-700 border border-blue-200">
                          {row.logType || '-'}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        <p className="text-sm text-gray-900">{row.logDate || '-'}</p>
                        <p className="text-xs text-gray-500">{row.logTime || '-'}</p>
                      </td>

                      <td className="px-4 py-3">
                        <span className={`px-2.5 py-1 rounded-full text-xs border ${statusPillClass(row.status)}`}>
                          {statusLabel(row.status)}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <select
                            value={statusDraftByLogId[row.logId] || row.status}
                            onChange={(event) => handleStatusDraftChange(row.logId, event.target.value)}
                            className="px-2 py-1.5 border border-gray-300 rounded-lg text-sm"
                          >
                            {STATUS_OPTIONS.map((option) => (
                              <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                          </select>
                          <button
                            onClick={() => handleStatusUpdate(row.logId)}
                            disabled={Boolean(updatingByLogId[row.logId]) || !row.logId}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#1E3A5F] text-white hover:bg-[#3B6FB6] disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                            type="button"
                          >
                            {updatingByLogId[row.logId] ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            Save
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <OwnerFooter />

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-[#1E3A5F] to-[#3B6FB6]">
              <div>
                <h2 className="text-xl font-bold text-white">Add RFID Card</h2>
                <p className="text-white/80 text-sm">Create and assign a card to a student</p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 rounded-lg hover:bg-white/20 transition-colors"
                type="button"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            <form onSubmit={handleCreateRfid} className="p-6 space-y-5 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">RFID Code *</label>
                  <input
                    type="text"
                    name="RFIDCode"
                    value={formData.RFIDCode}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent"
                    placeholder="RFID123456"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Log Type *</label>
                  <select
                    name="LogType"
                    value={formData.LogType}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent bg-white"
                    required
                  >
                    {LOG_TYPE_OPTIONS.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Student *</label>
                  <select
                    name="StudentID"
                    value={formData.StudentID}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent bg-white"
                    required
                  >
                    <option value="">Select student</option>
                    {students.map((student) => (
                      <option key={student.id} value={student.id}>{student.name} (ID: {student.id})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Device *</label>
                  <select
                    name="DeviceID"
                    value={formData.DeviceID}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent bg-white"
                    required
                  >
                    <option value="">Select device</option>
                    {devices.map((device) => (
                      <option key={device.id} value={device.id}>{device.name} (ID: {device.id})</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Userid *</label>
                  <input
                    type="text"
                    name="Userid"
                    value={formData.Userid}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1E3A5F] text-white hover:bg-[#3B6FB6] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save RFID
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Rfid;
