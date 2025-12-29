import React, { useMemo, useState } from 'react';
import { User, School, MapPin, Phone, Plus, Search, BadgeCheck, Edit2 } from 'lucide-react';
import ParentHeader from '../../components/Parent/ParentHeader';
import ParentFooter from '../../components/Parent/ParentFooter';

function MyChild({ onMenuClick, setActiveTab }) {
  // Simulated current parent identifier (would come from auth/session)
  const currentParentId = 'PARENT-001';

  // Local dataset with parent linkage
  const [students, setStudents] = useState([
    { id: 'STU-001', name: 'Emma Wilson', grade: '5', rollNumber: 'R-105', stop: 'Maple St', school: 'Central School', parentPhone: '+1 (555) 010-1111', status: 'active', parentId: 'PARENT-001' },
    { id: 'STU-002', name: 'Noah Johnson', grade: '6', rollNumber: 'R-106', stop: 'Pine Ave', school: 'Central School', parentPhone: '+1 (555) 010-2222', status: 'active', parentId: 'PARENT-001' },
    { id: 'STU-009', name: 'Mia Patel', grade: '4', rollNumber: 'R-210', stop: 'Cedar Rd', school: 'Westview School', parentPhone: '+1 (555) 010-9999', status: 'inactive', parentId: 'PARENT-002' }
  ]);

  const [query, setQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [addForm, setAddForm] = useState({
    id: '',
    name: '',
    grade: '',
    rollNumber: '',
    stop: '',
    school: '',
    parentPhone: ''
  });
  const [editForm, setEditForm] = useState({
    id: '',
    name: '',
    grade: '',
    rollNumber: '',
    stop: '',
    school: '',
    parentPhone: ''
  });

  const myStudents = useMemo(() => {
    const base = students.filter(s => s.parentId === currentParentId);
    if (!query.trim()) return base;
    const q = query.toLowerCase();
    return base.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.rollNumber.toLowerCase().includes(q) ||
      s.school.toLowerCase().includes(q) ||
      s.stop.toLowerCase().includes(q)
    );
  }, [students, currentParentId, query]);

  const handleAddInput = (e) => {
    const { name, value } = e.target;
    setAddForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!addForm.id || !addForm.name || !addForm.rollNumber) {
      alert('Please fill Student ID, Name, and Roll Number');
      return;
    }
    const newStudent = {
      id: addForm.id.trim(),
      name: addForm.name.trim(),
      grade: addForm.grade.trim(),
      rollNumber: addForm.rollNumber.trim(),
      stop: addForm.stop.trim(),
      school: addForm.school.trim(),
      parentPhone: addForm.parentPhone.trim(),
      status: 'active',
      parentId: currentParentId
    };
    setStudents(prev => [newStudent, ...prev]);
    setShowAddModal(false);
    setAddForm({ id: '', name: '', grade: '', rollNumber: '', stop: '', school: '', parentPhone: '' });
  };

  const handleEditClick = (student) => {
    setEditingStudent(student);
    setEditForm({
      id: student.id || '',
      name: student.name || '',
      grade: student.grade || '',
      rollNumber: student.rollNumber || '',
      stop: student.stop || '',
      school: student.school || '',
      parentPhone: student.parentPhone || ''
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
      <ParentHeader notifications={[]} onMenuClick={onMenuClick} setActiveTab={setActiveTab} />
      
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header + Actions */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-gray-900">My Children</h2>
              <p className="text-sm text-gray-600">Linked to your account</p>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="flex-1 sm:flex-initial flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2">
                <Search className="w-4 h-4 text-gray-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by name, roll, school, stop"
                  className="w-full outline-none text-sm"
                />
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1E3A5F] text-white hover:bg-[#3B6FB6] transition-colors text-sm font-semibold"
              >
                <Plus className="w-4 h-4" /> Add Student
              </button>
            </div>
          </div>

          {/* List */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-bold text-gray-900">Students ({myStudents.length})</h3>
              <span className="text-sm text-gray-600">Parent ID: {currentParentId}</span>
            </div>
            <div className="divide-y divide-gray-100">
              {myStudents.map(s => (
                <div key={s.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-yellow-100 text-yellow-700 flex items-center justify-center">
                        <User className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{s.name}</div>
                        <div className="text-xs text-gray-600 flex items-center gap-2">
                          <School className="w-3 h-3" />
                          <span>{s.school}</span>
                          <span className="mx-2">•</span>
                          <span>Roll: {s.rollNumber}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700 font-semibold inline-flex items-center gap-1">
                        <BadgeCheck className="w-3 h-3" /> Active
                      </span>
                      <button
                        onClick={() => handleEditClick(s)}
                        className="px-3 py-1.5 rounded-lg bg-[#1E3A5F] text-white hover:bg-[#3B6FB6] text-xs font-medium inline-flex items-center gap-1"
                      >
                        <Edit2 className="w-3 h-3" /> Update
                      </button>
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-gray-700">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span>Stop: {s.stop}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span>{s.parentPhone}</span>
                    </div>
                    <div className="text-gray-500">Student ID: {s.id}</div>
                  </div>
                </div>
              ))}

              {myStudents.length === 0 && (
                <div className="p-8 text-center text-gray-600">No students linked to your account yet.</div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-xl bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="p-5 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">Add New Student</h3>
              <p className="text-xs text-gray-500 mt-1">Student will be linked to your account automatically</p>
            </div>
            <form onSubmit={handleAddSubmit} className="p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Student ID</label>
                  <input
                    name="id"
                    value={addForm.id}
                    onChange={handleAddInput}
                    placeholder="STU-XXX"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Roll Number</label>
                  <input
                    name="rollNumber"
                    value={addForm.rollNumber}
                    onChange={handleAddInput}
                    placeholder="R-XXX"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
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
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Grade</label>
                  <input
                    name="grade"
                    value={addForm.grade}
                    onChange={handleAddInput}
                    placeholder="5, 6, 7 ..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">School</label>
                  <input
                    name="school"
                    value={addForm.school}
                    onChange={handleAddInput}
                    placeholder="School name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Stop</label>
                  <input
                    name="stop"
                    value={addForm.stop}
                    onChange={handleAddInput}
                    placeholder="Nearest stop"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Parent Phone</label>
                <input
                  name="parentPhone"
                  value={addForm.parentPhone}
                  onChange={handleAddInput}
                  placeholder="Contact number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-5 py-2.5 rounded-lg bg-[#1E3A5F] text-white font-semibold hover:bg-[#3B6FB6]">Add Student</button>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Student ID</label>
                  <input
                    name="id"
                    value={editForm.id}
                    disabled
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Roll Number</label>
                  <input
                    name="rollNumber"
                    value={editForm.rollNumber}
                    disabled
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                  />
                </div>
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
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Grade</label>
                  <input
                    name="grade"
                    value={editForm.grade}
                    onChange={handleEditInput}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">School</label>
                  <input
                    name="school"
                    value={editForm.school}
                    onChange={handleEditInput}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Stop</label>
                  <input
                    name="stop"
                    value={editForm.stop}
                    onChange={handleEditInput}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Parent Phone</label>
                <input
                  name="parentPhone"
                  value={editForm.parentPhone}
                  onChange={handleEditInput}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent outline-none"
                />
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