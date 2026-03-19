import React, { useEffect, useMemo, useState } from 'react';
import { User, School, Plus, Search, BadgeCheck, Edit2, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import ParentHeader from '../../components/Parent/ParentHeader';
import ParentFooter from '../../components/Parent/ParentFooter';
import StudentServices from '../../services/StudentServices';
import SchoolServices from '../../services/SchoolServices';
import ParentServices from '../../services/ParentServices';
import BusServices from '../../services/BusServices';

function MyChild({ onMenuClick, setActiveTab, onLogout }) {
  const currentUserId = localStorage.getItem('userId') || '';
  
  // State for live data
  const [students, setStudents] = useState([]);
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [saving, setSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [resolvedParentId, setResolvedParentId] = useState(localStorage.getItem('parentId') || localStorage.getItem('registerParentID') || '');
  const [availableNumberPlates, setAvailableNumberPlates] = useState([]);
  
  // Helper function to normalize API student response
  const normalizeStudent = (item) => ({
    id: String(item.StudentID || item.id || '').trim(),
    name: item.FullName || item.name || '',
    age: String(item.Age || item.age || '').trim(),
    gender: item.Gender || item.gender || 'M',
    school: item.SchoolName || item.school || '',
    schoolId: String(item.SchoolID || item.schoolId || '').trim(),
    image: item.Image || item.image || '',
    parentPhone: item.ParentPhone || item.parentPhone || '',
    status: (item.Status === 'A' || item.Status === 'Active') ? 'active' : 'inactive',
    parentId: String(item.ParentID || item.parentId || '').trim(),
  });

  // Helper to compute next numeric student ID
  const computeNextStudentId = (studentList) => {
    const numericIds = studentList
      .map(s => {
        const num = parseInt(s.id, 10);
        return isNaN(num) ? null : num;
      })
      .filter(n => n !== null);
    
    if (numericIds.length === 0) return 1;
    const maxId = Math.max(...numericIds);
    return maxId + 1;
  };

  const normalizeResultSet = (payload) => {
    if (Array.isArray(payload)) return payload;
    if (payload && Array.isArray(payload.ResultSet)) return payload.ResultSet;
    return [];
  };

  const resolveParentId = (parentsPayload) => {
    const storedParentId = localStorage.getItem('parentId') || localStorage.getItem('registerParentID') || '';
    if (storedParentId && /^\d+$/.test(String(storedParentId))) {
      return String(storedParentId);
    }

    const parents = normalizeResultSet(parentsPayload);
    const matchByUser = parents.find((p) => String(p.UserID || p.userId || '') === String(currentUserId));
    if (matchByUser && (matchByUser.ParentID || matchByUser.parentId)) {
      return String(matchByUser.ParentID || matchByUser.parentId);
    }

    return '';
  };

  const extractNumberPlates = (busesPayload) => {
    const rows = normalizeResultSet(busesPayload);
    return rows
      .map((b) => (b.NumberPlate || b.Plate || b.LicensePlate || b.plate || '').toString().trim())
      .filter(Boolean);
  };

  // Fetch students, schools, buses, and resolve parent ID from API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError('');
        const [studentsRes, schoolsRes, parentsRes, busesRes] = await Promise.all([
          StudentServices.getAllStudents(),
          SchoolServices.getAllSchools(),
          ParentServices.getAllParents(),
          BusServices.getAllBuses(),
        ]);

        // Fetch students
        if (studentsRes.success) {
          let studentRows = [];
          if (Array.isArray(studentsRes.data)) {
            studentRows = studentsRes.data;
          } else if (studentsRes.raw && Array.isArray(studentsRes.raw.ResultSet)) {
            studentRows = studentsRes.raw.ResultSet;
          } else if (studentsRes.raw && Array.isArray(studentsRes.raw)) {
            studentRows = studentsRes.raw;
          }
          const normalized = studentRows.map(normalizeStudent);
          setStudents(normalized);
        } else {
          setError('Failed to load students');
        }

        // Fetch schools
        if (schoolsRes.success) {
          let schoolRows = [];
          if (Array.isArray(schoolsRes.data)) {
            schoolRows = schoolsRes.data;
          } else if (schoolsRes.raw && Array.isArray(schoolsRes.raw)) {
            schoolRows = schoolsRes.raw;
          }
          setSchools(schoolRows);
        }

        if (busesRes.success) {
          const numberPlates = extractNumberPlates(busesRes.data);
          setAvailableNumberPlates(numberPlates);
          console.log('[MyChild] Loaded bus number plates', {
            count: numberPlates.length,
            sample: numberPlates.slice(0, 5),
          });
        } else {
          setAvailableNumberPlates([]);
        }

        const parentId = resolveParentId(parentsRes.data);
        setResolvedParentId(parentId);
        if (parentId) {
          localStorage.setItem('parentId', parentId);
        }

        console.log('[MyChild] Parent resolution', {
          currentUserId,
          resolvedParentId: parentId,
          hasParentsPayload: !!parentsRes?.data,
        });
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUserId]);

  const [query, setQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [nextStudentId, setNextStudentId] = useState(1);
  
  const [addForm, setAddForm] = useState({
    id: '',
    name: '',
    age: '',
    gender: 'M',
    schoolId: '',
    image: null
  });
  const [editForm, setEditForm] = useState({
    id: '',
    name: '',
    age: '',
    gender: 'M',
    schoolId: ''
  });

  // Update next ID when modal opens
  useEffect(() => {
    if (showAddModal) {
      const nextId = computeNextStudentId(students);
      setNextStudentId(nextId);
      setAddForm(prev => ({ 
        ...prev, 
        id: String(nextId),
        gender: 'M'
      }));
      setImagePreview(null);
    }
  }, [showAddModal, students]);

  const myStudents = useMemo(() => {
    const base = resolvedParentId
      ? students.filter((s) => String(s.parentId) === String(resolvedParentId))
      : students;
    if (!query.trim()) return base;
    const q = query.toLowerCase();
    return base.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.school.toLowerCase().includes(q)
    );
  }, [students, resolvedParentId, query]);

  const handleAddInput = (e) => {
    const { name, value } = e.target;
    // Prevent manual editing of Student ID field
    if (name === 'id') return;
    setAddForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAddForm(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!addForm.name.trim()) {
      setError('Please fill in Name and other required fields');
      return;
    }

    if (!addForm.age.trim()) {
      setError('Please fill in Age');
      return;
    }

    if (!addForm.schoolId) {
      setError('Please select a School');
      return;
    }

    if (!resolvedParentId || !/^\d+$/.test(String(resolvedParentId))) {
      setError('Unable to resolve Parent ID for this account. Please login again.');
      console.error('[MyChild] Invalid parent ID for student creation', {
        resolvedParentId,
        currentUserId,
        storedParentId: localStorage.getItem('parentId'),
      });
      return;
    }

    if (availableNumberPlates.length === 0) {
      setError('No buses are available. Please add a bus first before registering a student.');
      console.error('[MyChild] Cannot create student: no valid bus NumberPlate available');
      return;
    }

    try {
      setSaving(true);
      
      // Force computed next ID to prevent tampering
      const finalStudentId = String(nextStudentId);

      // Backend currently requires these fields even when not shown in UI.
      const fallbackRfidId = `RFID-AUTO-${finalStudentId}`;
      const fallbackNumberPlate = availableNumberPlates[0];
      
      // Prepare payload for StudentServices.createStudent
      const studentPayload = {
        FullName: addForm.name.trim(),
        Age: addForm.age.trim(),
        Gender: addForm.gender,
        RfidID: fallbackRfidId,
        ParentID: String(resolvedParentId),
        SchoolID: addForm.schoolId,
        NumberPlate: fallbackNumberPlate,
        Userid: localStorage.getItem('userId') || '1',
        file: addForm.image,
      };

      console.log('[MyChild] Creating student payload', {
        ...studentPayload,
        file: studentPayload.file ? {
          name: studentPayload.file.name,
          size: studentPayload.file.size,
          type: studentPayload.file.type,
        } : null,
        debug: {
          usesFallbackRfid: true,
          usesFallbackNumberPlate: true,
          selectedNumberPlate: fallbackNumberPlate,
          availableNumberPlatesCount: availableNumberPlates.length,
        },
      });

      const response = await StudentServices.createStudent(studentPayload);
      console.log('[MyChild] Create student response', response);
      
      if (response.success) {
        setSuccess(`Student ${addForm.name} added successfully! Student ID: ${finalStudentId}`);
        setShowAddModal(false);
        setAddForm({ 
          id: '', 
          name: '', 
          age: '', 
          gender: 'M', 
          schoolId: '', 
          image: null 
        });
        setImagePreview(null);
        
        // Re-fetch students to update list and recompute next ID
        try {
          const fetchRes = await StudentServices.getAllStudents();
          if (fetchRes.success) {
            let studentRows = [];
            if (Array.isArray(fetchRes.data)) {
              studentRows = fetchRes.data;
            } else if (fetchRes.raw && Array.isArray(fetchRes.raw.ResultSet)) {
              studentRows = fetchRes.raw.ResultSet;
            } else if (fetchRes.raw && Array.isArray(fetchRes.raw)) {
              studentRows = fetchRes.raw;
            }
            
            const normalized = studentRows.map(normalizeStudent);
            setStudents(normalized);
            console.log('[MyChild] Refetched students after create', { count: normalized.length });
          }
        } catch (refetchErr) {
          console.error('Error refetching students:', refetchErr);
        }
        
        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(response.message || 'Failed to add student');
      }
    } catch (err) {
      console.error('Error creating student:', err);
      setError('Failed to add student. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleEditClick = (student) => {
    setEditingStudent(student);
    setEditForm({
      id: student.id || '',
      name: student.name || '',
      age: student.age || '',
      gender: student.gender || 'M',
      schoolId: student.schoolId || ''
    });
    setShowEditModal(true);
  };

  const handleEditInput = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editingStudent) return;
    setStudents(prev => prev.map(s => s.id === editingStudent.id ? {
      ...s,
      name: editForm.name.trim(),
      grade: editForm.grade.trim(),
      stop: editForm.stop.trim(),
      school: editForm.school.trim(),
      parentPhone: editForm.parentPhone.trim()
    } : s));
    setShowEditModal(false);
    setEditingStudent(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#FFF9E6] via-[#FFFDF5] to-[#FFF9E6]">
      <ParentHeader notifications={[]} onMenuClick={onMenuClick} setActiveTab={setActiveTab} onLogout={onLogout} />
      
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Error Alert */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-900">Error</h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          )}

          {/* Success Alert */}
          {success && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-green-900">Success</h3>
                <p className="text-sm text-green-700 mt-1">{success}</p>
              </div>
            </div>
          )}

          {/* Header + Actions */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">My Children</h2>
              <p className="text-xs sm:text-sm text-gray-600">Linked to your account</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
              <div className="flex-1 sm:flex-initial flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2">
                <Search className="w-4 h-4 text-gray-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search students..."
                  className="w-full outline-none text-xs sm:text-sm"
                />
              </div>
              <button
                onClick={() => {
                  setError('');
                  setSuccess('');
                  setShowAddModal(true);
                }}
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-lg bg-[#1E3A5F] text-white hover:bg-[#3B6FB6] transition-colors text-xs sm:text-sm font-semibold"
              >
                <Plus className="w-4 h-4" /> Add Student
              </button>
            </div>
          </div>

          {/* List with Loading State */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <h3 className="font-bold text-gray-900">Students ({myStudents.length})</h3>
              <span className="text-xs sm:text-sm text-gray-600">Parent ID: {resolvedParentId || 'Not resolved'}</span>
            </div>
            <div className="divide-y divide-gray-100">
              {loading ? (
                <div className="p-8 text-center flex items-center justify-center gap-2 text-gray-600">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Loading students...
                </div>
              ) : myStudents.length === 0 ? (
                <div className="p-8 text-center text-gray-600">No students linked to your account yet.</div>
              ) : (
                myStudents.map(s => (
                  <div key={s.id} className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-yellow-100 text-yellow-700 flex items-center justify-center flex-shrink-0">
                        {s.image ? (
                          <img src={s.image} alt={s.name} className="w-10 h-10 rounded-full object-cover" />
                        ) : (
                          <User className="w-6 h-6" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 text-sm sm:text-base">{s.name}</div>
                        <div className="text-xs text-gray-600 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                          <span className="flex items-center gap-1">
                            <School className="w-3 h-3" />
                            {s.school}
                          </span>
                          <span className="hidden sm:inline">•</span>
                          <span>Age: {s.age}</span>
                          <span className="hidden sm:inline">•</span>
                          <span>{s.gender === 'M' ? 'Boy' : 'Girl'}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                        <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700 font-semibold inline-flex items-center justify-center sm:justify-start gap-1">
                          <BadgeCheck className="w-3 h-3" /> Active
                        </span>
                        <button
                          onClick={() => handleEditClick(s)}
                          className="px-3 py-1.5 rounded-lg bg-[#1E3A5F] text-white hover:bg-[#3B6FB6] text-xs font-medium inline-flex items-center justify-center gap-1"
                        >
                          <Edit2 className="w-3 h-3" /> Update
                        </button>
                      </div>
                    </div>
                    <div className="mt-3 text-xs sm:text-sm text-gray-500">ID: {s.id}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg border border-gray-200 max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-5 border-b border-gray-200 z-10">
              <h3 className="text-lg font-bold text-gray-900">Add New Student</h3>
              <p className="text-xs text-gray-500 mt-1">Student ID is auto-generated and cannot be changed</p>
            </div>
            <form onSubmit={handleAddSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Student ID</label>
                <input
                  name="id"
                  value={addForm.id}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 font-semibold"
                />
                <p className="text-xs text-gray-500 mt-1">Auto-generated next ID</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                  <input
                    name="name"
                    value={addForm.name}
                    onChange={handleAddInput}
                    placeholder="Student name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Age *</label>
                  <input
                    name="age"
                    type="number"
                    value={addForm.age}
                    onChange={handleAddInput}
                    placeholder="e.g., 15"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">School *</label>
                  <select
                    name="schoolId"
                    value={addForm.schoolId}
                    onChange={handleAddInput}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent outline-none"
                    required
                  >
                    <option value="">Select a School</option>
                    {schools.map(school => (
                      <option key={school.SchoolID || school.id} value={school.SchoolID || school.id}>
                        {school.SchoolName || school.name || 'Unknown School'}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Gender *</label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setAddForm(prev => ({ ...prev, gender: 'M' }))}
                      className={`flex-1 py-2 px-3 rounded-lg font-semibold text-sm transition-all ${
                        addForm.gender === 'M'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      👦 Boy
                    </button>
                    <button
                      type="button"
                      onClick={() => setAddForm(prev => ({ ...prev, gender: 'F' }))}
                      className={`flex-1 py-2 px-3 rounded-lg font-semibold text-sm transition-all ${
                        addForm.gender === 'F'
                          ? 'bg-pink-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      👧 Girl
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Student Image</label>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-xs"
                    />
                    <p className="text-xs text-gray-500 mt-1">Accepted: JPG, PNG, GIF</p>
                  </div>
                  {imagePreview && (
                    <div className="w-20 h-20 rounded-lg overflow-hidden border border-gray-300">
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4">
                <button type="button" onClick={() => {
                  setShowAddModal(false);
                  setError('');
                  setSuccess('');
                }} className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50">Cancel</button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 rounded-lg bg-[#1E3A5F] text-white font-semibold hover:bg-[#3B6FB6] disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
                >
                  {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                  {saving ? 'Adding...' : 'Add Student'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Student Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-xl bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="p-5 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">Update Student</h3>
              <p className="text-xs text-gray-500 mt-1">IDs are locked for integrity. Update other details below.</p>
            </div>
            <form onSubmit={handleEditSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Student ID</label>
                <input
                  name="id"
                  value={editForm.id}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input
                    name="name"
                    value={editForm.name}
                    onChange={handleEditInput}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Age</label>
                  <input
                    name="age"
                    type="number"
                    value={editForm.age}
                    onChange={handleEditInput}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setEditForm(prev => ({ ...prev, gender: 'M' }))}
                    className={`flex-1 py-2 px-3 rounded-lg font-semibold text-sm transition-all ${
                      editForm.gender === 'M'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    👦 Boy
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditForm(prev => ({ ...prev, gender: 'F' }))}
                    className={`flex-1 py-2 px-3 rounded-lg font-semibold text-sm transition-all ${
                      editForm.gender === 'F'
                        ? 'bg-pink-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    👧 Girl
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button type="button" onClick={() => { setShowEditModal(false); setEditingStudent(null); }} className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-5 py-2.5 rounded-lg bg-[#1E3A5F] text-white font-semibold hover:bg-[#3B6FB6]">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ParentFooter />
    </div>
  );
}

export default MyChild;