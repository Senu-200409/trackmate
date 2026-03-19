import React, { useEffect, useMemo, useState } from 'react';
import {
  Users,
  School,
  Search,
  Filter,
  Plus,
  CheckCircle,
  X,
  Save,
  Edit,
  Loader2,
  AlertTriangle,
} from 'lucide-react';
import OwnerHeader from '../../components/Owner/OwnerHeader';
import OwnerFooter from '../../components/Owner/OwnerFooter';
import StudentServices from '../../services/StudentServices';
import ParentServices from '../../services/ParentServices';
import SchoolServices from '../../services/SchoolServices';

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

const normalizeStudent = (item) => ({
  id: String(firstDefined(item.StudentID, item.id, '')).trim(),
  fullName: firstDefined(item.FullName, item.name, ''),
  age: String(firstDefined(item.Age, '')).trim(),
  gender: String(firstDefined(item.Gender, '')).toUpperCase(),
  rfidId: firstDefined(item.RfidID, item.RFIDCode, ''),
  parentId: String(firstDefined(item.ParentID, '')).trim(),
  schoolId: String(firstDefined(item.SchoolID, '')).trim(),
  numberPlate: firstDefined(item.NumberPlate, ''),
  status: String(firstDefined(item.Status, 'A')).toUpperCase(),
  image: firstDefined(item.Image, ''),
  raw: item,
});

const normalizeSchool = (item) => ({
  id: String(firstDefined(item.SchoolID, item.id, '')).trim(),
  name: firstDefined(item.SchoolName, item.name, 'Unknown School'),
});

const normalizeParent = (item) => ({
  id: String(firstDefined(item.ParentID, item.id, '')).trim(),
  name: firstDefined(item.ParentName, item.UserName, item.name, `Parent #${firstDefined(item.ParentID, item.id, '')}`),
});

const statusLabel = (status) => {
  const code = String(status || '').toUpperCase();
  if (code === 'A') return 'Active';
  if (code === 'I') return 'Inactive';
  if (code === 'D') return 'Disabled';
  return code || 'Unknown';
};

function Students({ onMenuClick, setActiveTab, onLogout }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [updating, setUpdating] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [studentsList, setStudentsList] = useState([]);
  const [schools, setSchools] = useState([]);
  const [parents, setParents] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterSchool, setFilterSchool] = useState('all');

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  const [createForm, setCreateForm] = useState({
    FullName: '',
    Age: '',
    Gender: 'M',
    RfidID: '',
    ParentID: '',
    SchoolID: '',
    NumberPlate: '',
    Userid: localStorage.getItem('userId') || '1',
    file: null,
  });

  const [updateAge, setUpdateAge] = useState('');

  const schoolMap = useMemo(() => {
    const map = new Map();
    schools.forEach((school) => map.set(school.id, school.name));
    return map;
  }, [schools]);

  const parentMap = useMemo(() => {
    const map = new Map();
    parents.forEach((parent) => map.set(parent.id, parent.name));
    return map;
  }, [parents]);

  const resetCreateForm = () => {
    setCreateForm((prev) => ({
      ...prev,
      FullName: '',
      Age: '',
      Gender: 'M',
      RfidID: '',
      ParentID: '',
      SchoolID: '',
      NumberPlate: '',
      file: null,
    }));
  };

  const fetchAllData = async () => {
    try {
      setLoading(true);
      setError('');

      const [studentsRes, schoolsRes, parentsRes] = await Promise.all([
        StudentServices.getAllStudents(),
        SchoolServices.getAllSchools(),
        ParentServices.getAllParents(),
      ]);

      const studentRows = toArray(studentsRes.raw || studentsRes.data || []).map(normalizeStudent);
      const schoolRows = toArray(schoolsRes.data || []).map(normalizeSchool).filter((item) => item.id);
      const parentRows = toArray(parentsRes.data || []).map(normalizeParent).filter((item) => item.id);

      setStudentsList(studentRows);
      setSchools(schoolRows);
      setParents(parentRows);
    } catch (err) {
      console.error('Error loading students page data:', err);
      setError('Failed to load students data. Please refresh and try again.');
      setStudentsList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const filteredStudents = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return studentsList.filter((student) => {
      const schoolName = (schoolMap.get(student.schoolId) || '').toLowerCase();
      const parentName = (parentMap.get(student.parentId) || '').toLowerCase();

      const matchesSearch = !search
        || student.fullName.toLowerCase().includes(search)
        || student.rfidId.toLowerCase().includes(search)
        || student.numberPlate.toLowerCase().includes(search)
        || schoolName.includes(search)
        || parentName.includes(search);

      const matchesSchool = filterSchool === 'all' || student.schoolId === filterSchool;

      return matchesSearch && matchesSchool;
    });
  }, [studentsList, searchTerm, filterSchool, schoolMap, parentMap]);

  const stats = useMemo(() => ({
    total: studentsList.length,
    active: studentsList.filter((student) => student.status === 'A').length,
    bySchool: new Set(studentsList.map((student) => student.schoolId).filter(Boolean)).size,
  }), [studentsList]);

  const handleCreateInputChange = (event) => {
    const { name, value } = event.target;
    setCreateForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateFileChange = (event) => {
    const file = event.target.files && event.target.files[0] ? event.target.files[0] : null;
    setCreateForm((prev) => ({ ...prev, file }));
  };

  const validateCreate = () => {
    if (!createForm.FullName.trim()) return 'Full name is required.';
    if (!createForm.Age.trim()) return 'Age is required.';
    if (!createForm.Gender) return 'Gender is required.';
    if (!createForm.RfidID.trim()) return 'RFID ID is required.';
    if (!createForm.ParentID) return 'Parent is required.';
    if (!createForm.SchoolID) return 'School is required.';
    if (!createForm.NumberPlate.trim()) return 'Number plate is required.';
    if (!createForm.Userid) return 'Userid is required.';
    return '';
  };

  const handleCreateStudent = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    const validationError = validateCreate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setSaving(true);
      const response = await StudentServices.createStudent(createForm);
      const newStudentId = response.data?.StudentID;

      setSuccess(newStudentId ? `Student added successfully. StudentID: ${newStudentId}` : 'Student added successfully.');
      setShowAddModal(false);
      resetCreateForm();
      await fetchAllData();
    } catch (err) {
      console.error('Create student failed:', err);
      setError('Failed to add student. Please check payload values and try again.');
    } finally {
      setSaving(false);
    }
  };

  const openEditModal = (student) => {
    setEditingStudent(student);
    setUpdateAge(student.age || '');
    setShowEditModal(true);
  };

  const handleUpdateStudent = async (event) => {
    event.preventDefault();
    if (!editingStudent) return;

    setError('');
    setSuccess('');

    if (!updateAge.trim()) {
      setError('Age is required for update.');
      return;
    }

    try {
      setUpdating(true);
      await StudentServices.updateStudent(editingStudent.id, { Age: updateAge.trim() });
      setSuccess('Student updated successfully.');
      setShowEditModal(false);
      setEditingStudent(null);
      setUpdateAge('');
      await fetchAllData();
    } catch (err) {
      console.error('Update student failed:', err);
      setError('Failed to update student age.');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#FFF6D6] via-[#FFE8B0] to-[#FFF6D6]">
      <OwnerHeader notifications={[]} ownerName="David" companyName="TrackMate Fleet" onMenuClick={onMenuClick} setActiveTab={setActiveTab} onLogout={onLogout} />

      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Students Management</h1>
              <p className="text-gray-600 mt-1">Create and manage students from live endpoints</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#1E3A5F] text-white rounded-xl hover:bg-[#3B6FB6] transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Student
            </button>
          </div>

          {(error || success) && (
            <div className="space-y-2">
              {error && (
                <div className="flex items-start gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-700">
                  <AlertTriangle className="w-5 h-5 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}
              {success && (
                <div className="flex items-start gap-2 px-4 py-3 bg-green-50 border border-green-200 rounded-xl text-green-700">
                  <CheckCircle className="w-5 h-5 mt-0.5" />
                  <span>{success}</span>
                </div>
              )}
            </div>
          )}

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-100">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                  <div className="text-sm text-gray-600">Total Students</div>
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
                <div className="p-2.5 rounded-xl bg-purple-100">
                  <School className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stats.bySchool}</div>
                  <div className="text-sm text-gray-600">Schools</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3.5 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, RFID, parent, school..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent"
              />
            </div>

            <div className="flex gap-2">
              <select
                value={filterSchool}
                onChange={(event) => setFilterSchool(event.target.value)}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent bg-white"
              >
                <option value="all">All Schools</option>
                {schools.map((school) => (
                  <option key={school.id} value={school.id}>{school.name}</option>
                ))}
              </select>
              <button className="px-4 py-2.5 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors text-gray-700">
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Student</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Age/Gender</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">RFID</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">School</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Parent</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Number Plate</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {loading && (
                    <tr>
                      <td colSpan={8} className="px-4 py-12 text-center text-gray-500">
                        <div className="inline-flex items-center gap-2">
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Loading students...
                        </div>
                      </td>
                    </tr>
                  )}

                  {!loading && filteredStudents.length === 0 && (
                    <tr>
                      <td colSpan={8} className="px-4 py-12 text-center text-gray-500">No students found.</td>
                    </tr>
                  )}

                  {!loading && filteredStudents.map((student) => (
                    <tr key={student.id}>
                      <td className="px-4 py-3">
                        <div className="font-semibold text-gray-900">{student.fullName || '-'}</div>
                        <div className="text-xs text-gray-500">ID: {student.id || '-'}</div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{student.age || '-'} / {student.gender || '-'}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{student.rfidId || '-'}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{schoolMap.get(student.schoolId) || '-'}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{parentMap.get(student.parentId) || '-'}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{student.numberPlate || '-'}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${student.status === 'A' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                          {statusLabel(student.status)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => openEditModal(student)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#1E3A5F] text-white hover:bg-[#3B6FB6] text-xs"
                        >
                          <Edit className="w-3 h-3" />
                          Update Age
                        </button>
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
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-[#1E3A5F] to-[#3B6FB6]">
              <div>
                <h2 className="text-xl font-bold text-white">Add Student</h2>
                <p className="text-white/70 text-sm">Endpoint: AddStudentDetails</p>
              </div>
              <button onClick={() => setShowAddModal(false)} className="p-2 rounded-lg hover:bg-white/20">
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            <form onSubmit={handleCreateStudent} className="p-6 overflow-y-auto max-h-[calc(90vh-180px)] space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input name="FullName" value={createForm.FullName} onChange={handleCreateInputChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Age *</label>
                  <input name="Age" value={createForm.Age} onChange={handleCreateInputChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
                  <select name="Gender" value={createForm.Gender} onChange={handleCreateInputChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl bg-white" required>
                    <option value="M">M</option>
                    <option value="F">F</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">RFID ID *</label>
                  <input name="RfidID" value={createForm.RfidID} onChange={handleCreateInputChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Parent *</label>
                  <select name="ParentID" value={createForm.ParentID} onChange={handleCreateInputChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl bg-white" required>
                    <option value="">Select Parent</option>
                    {parents.map((parent) => (
                      <option key={parent.id} value={parent.id}>{parent.name} (ID: {parent.id})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">School *</label>
                  <select name="SchoolID" value={createForm.SchoolID} onChange={handleCreateInputChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl bg-white" required>
                    <option value="">Select School</option>
                    {schools.map((school) => (
                      <option key={school.id} value={school.id}>{school.name} (ID: {school.id})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number Plate *</label>
                  <input name="NumberPlate" value={createForm.NumberPlate} onChange={handleCreateInputChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Userid *</label>
                  <input name="Userid" value={createForm.Userid} onChange={handleCreateInputChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl" required />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Photo File</label>
                  <input type="file" onChange={handleCreateFileChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl" />
                </div>
              </div>
            </form>

            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-end gap-3">
              <button type="button" onClick={() => setShowAddModal(false)} className="px-5 py-2.5 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100">Cancel</button>
              <button type="button" onClick={handleCreateStudent} disabled={saving} className="px-5 py-2.5 bg-[#1E3A5F] text-white rounded-xl hover:bg-[#3B6FB6] flex items-center gap-2 disabled:opacity-50">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save Student
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && editingStudent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-[#1E3A5F] to-[#3B6FB6]">
              <div>
                <h2 className="text-xl font-bold text-white">Update Student Age</h2>
                <p className="text-white/70 text-sm">Endpoint: PutStudentDetails</p>
              </div>
              <button onClick={() => { setShowEditModal(false); setEditingStudent(null); }} className="p-2 rounded-lg hover:bg-white/20">
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            <form onSubmit={handleUpdateStudent} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Student</label>
                <input value={`${editingStudent.fullName} (ID: ${editingStudent.id})`} readOnly className="w-full px-4 py-2.5 border border-gray-300 rounded-xl bg-gray-50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age *</label>
                <input value={updateAge} onChange={(event) => setUpdateAge(event.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl" required />
              </div>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button type="button" onClick={() => { setShowEditModal(false); setEditingStudent(null); }} className="px-5 py-2.5 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100">Cancel</button>
                <button type="submit" disabled={updating} className="px-5 py-2.5 bg-[#1E3A5F] text-white rounded-xl hover:bg-[#3B6FB6] flex items-center gap-2 disabled:opacity-50">
                  {updating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Students;
