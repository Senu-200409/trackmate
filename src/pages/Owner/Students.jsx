import React, { useState } from 'react';
import { 
  Users, 
  User,
  School,
  Phone,
  Mail,
  Calendar,
  MapPin,
  Search,
  Filter,
  Plus,
  MoreVertical,
  CheckCircle,
  AlertTriangle,
  X,
  Save,
  FileText,
  Home,
  Heart,
  Edit,
  Edit2
} from 'lucide-react';
import OwnerHeader from '../../components/Owner/OwnerHeader';
import OwnerFooter from '../../components/Owner/OwnerFooter';

function Students({ onMenuClick, setActiveTab }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSchool, setFilterSchool] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({
    studentId: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    rollNumber: '',
    school: '',
    class: '',
    parentName: '',
    parentPhone: '',
    parentEmail: '',
    emergencyContact: '',
    emergencyPhone: '',
    homeAddress: '',
    bloodGroup: '',
    medicalConditions: '',
    busRoute: '',
    status: 'active',
    notes: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New Student Data:', formData);
    alert('Student registered successfully!');
    setShowAddModal(false);
    setFormData({
      studentId: '',
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: '',
      rollNumber: '',
      school: '',
      class: '',
      parentName: '',
      parentPhone: '',
      parentEmail: '',
      emergencyContact: '',
      emergencyPhone: '',
      homeAddress: '',
      bloodGroup: '',
      medicalConditions: '',
      busRoute: '',
      status: 'active',
      notes: ''
    });
  };

  const handleEditClick = (student) => {
    const [firstName = '', ...rest] = student.name ? student.name.split(' ') : [''];
    const lastName = rest.join(' ');
    setEditingStudent(student);
    setFormData({
      studentId: student.id || '',
      firstName,
      lastName,
      dateOfBirth: student.dob || '',
      gender: student.gender || '',
      rollNumber: student.rollNumber || '',
      school: student.school || '',
      class: student.class || '',
      parentName: student.parentName || '',
      parentPhone: student.phone || '',
      parentEmail: student.email || '',
      emergencyContact: student.emergency || '',
      emergencyPhone: student.emergencyPhone || '',
      homeAddress: student.homeAddress || '',
      bloodGroup: student.bloodGroup || '',
      medicalConditions: student.medicalConditions || '',
      busRoute: student.route || '',
      status: (student.status || 'active').toLowerCase(),
      notes: student.notes || ''
    });
    setShowEditModal(true);
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    console.log('Updated Student Data:', formData);
    alert('Student updated successfully!');
    setShowEditModal(false);
    setEditingStudent(null);
  };

  const schools = [
    { id: 'SCH-001', name: 'Riverside Academy' },
    { id: 'SCH-002', name: 'Greenfield International' },
    { id: 'SCH-003', name: 'Sunridge Public School' },
    { id: 'SCH-004', name: 'Lakeside High School' },
    { id: 'SCH-005', name: 'Mountain View School' },
  ];

  const routes = [
    { id: 'RT-001', name: 'Route A - Morning' },
    { id: 'RT-002', name: 'Route B - Morning' },
    { id: 'RT-003', name: 'Route C - Morning' },
    { id: 'RT-004', name: 'Route A - Afternoon' },
    { id: 'RT-005', name: 'Route D - Morning' },
  ];

  const studentsList = [
    {
      id: 'STU-001',
      name: 'Emma Johnson',
      rollNumber: '10A-001',
      school: 'Riverside Academy',
      class: '10A',
      parentName: 'Robert Johnson',
      phone: '+1 212-555-0100',
      email: 'emma.j@email.com',
      route: 'Route A - Morning',
      dob: '2010-03-15',
      gender: 'Female',
      status: 'Active',
      bloodGroup: 'O+',
      emergency: 'Mary Johnson'
    },
    {
      id: 'STU-002',
      name: 'Liam Chen',
      rollNumber: '9B-002',
      school: 'Riverside Academy',
      class: '9B',
      parentName: 'Michael Chen',
      phone: '+1 212-555-0101',
      email: 'liam.c@email.com',
      route: 'Route B - Morning',
      dob: '2011-07-22',
      gender: 'Male',
      status: 'Active',
      bloodGroup: 'A+',
      emergency: 'Susan Chen'
    },
    {
      id: 'STU-003',
      name: 'Olivia Martinez',
      rollNumber: '11A-003',
      school: 'Greenfield International',
      class: '11A',
      parentName: 'Carlos Martinez',
      phone: '+1 617-555-0102',
      email: 'olivia.m@email.com',
      route: 'Route C - Morning',
      dob: '2009-11-05',
      gender: 'Female',
      status: 'Active',
      bloodGroup: 'B+',
      emergency: 'Rosa Martinez'
    },
    {
      id: 'STU-004',
      name: 'Noah Williams',
      rollNumber: '8C-004',
      school: 'Sunridge Public School',
      class: '8C',
      parentName: 'James Williams',
      phone: '+1 215-555-0103',
      email: 'noah.w@email.com',
      route: 'Route A - Afternoon',
      dob: '2012-05-18',
      gender: 'Male',
      status: 'Active',
      bloodGroup: 'AB+',
      emergency: 'Linda Williams'
    },
    {
      id: 'STU-005',
      name: 'Ava Garcia',
      rollNumber: '10A-005',
      school: 'Lakeside High School',
      class: '10A',
      parentName: 'Diego Garcia',
      phone: '+1 312-555-0104',
      email: 'ava.g@email.com',
      route: 'Route D - Morning',
      dob: '2010-09-30',
      gender: 'Female',
      status: 'Active',
      bloodGroup: 'O-',
      emergency: 'Sofia Garcia'
    }
  ];

  const filteredStudents = studentsList.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.parentName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterSchool === 'all' || student.school === filterSchool;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: studentsList.length,
    active: studentsList.filter(s => s.status === 'Active').length,
    bySchool: schools.length
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#FFF6D6] via-[#FFE8B0] to-[#FFF6D6]">
      <OwnerHeader notifications={[]} ownerName="David" companyName="TrackMate Fleet" onMenuClick={onMenuClick} setActiveTab={setActiveTab} />
      
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Students Management</h1>
              <p className="text-gray-600 mt-1">Register and manage student information</p>
            </div>
            <button 
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#1E3A5F] text-white rounded-xl hover:bg-[#3B6FB6] transition-colors"
            >
              <Plus className="w-5 h-5" />
              Register Student
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
                  <div className="text-sm text-gray-600">Partner Schools</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-orange-100">
                  <Heart className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">100%</div>
                  <div className="text-sm text-gray-600">Health Records</div>
                </div>
              </div>
            </div>
          </div>

          {/* Search & Filter */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name, roll number, or parent..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all"
              />
              <Search className="absolute left-3.5 top-3 w-5 h-5 text-gray-400" />
            </div>
            <div className="flex gap-2">
              <select
                value={filterSchool}
                onChange={(e) => setFilterSchool(e.target.value)}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all bg-white"
              >
                <option value="all">All Schools</option>
                {schools.map(school => (
                  <option key={school.id} value={school.name}>{school.name}</option>
                ))}
              </select>
              <button className="px-4 py-2.5 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2 font-medium text-gray-700">
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Students Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStudents.map(student => (
              <div key={student.id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
                
                {/* Header Section */}
                <div className="px-4 py-4 bg-gradient-to-r from-[#1E3A5F] to-[#3B6FB6] text-white">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-bold">{student.name}</h3>
                      <p className="text-sm text-[#FFE066]">{student.rollNumber}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      student.status === 'Active' 
                        ? 'bg-green-100/20 text-green-300' 
                        : 'bg-gray-100/20 text-gray-300'
                    }`}>
                      {student.status}
                    </span>
                  </div>
                </div>

                {/* School & Class */}
                <div className="px-4 py-3 space-y-2 border-b border-gray-100">
                  <div className="flex items-center gap-2 text-sm">
                    <School className="w-4 h-4 text-[#3B6FB6]" />
                    <span className="text-gray-700">
                      <span className="font-semibold text-gray-900">{student.school}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-[#3B6FB6]" />
                    <span className="text-gray-700">
                      <span className="font-semibold text-gray-900">Class {student.class}</span>
                    </span>
                  </div>
                </div>

                {/* Parent Contact */}
                <div className="px-4 py-3 space-y-2 border-b border-gray-100">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-[#F5C518]" />
                    <span className="text-gray-600">
                      <span className="font-semibold text-gray-900">{student.parentName}</span>
                      <span className="text-gray-500"> (Parent)</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4 text-[#F5C518]" />
                    {student.phone}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4 text-[#F5C518]" />
                    {student.email}
                  </div>
                </div>

                {/* Personal Info */}
                <div className="px-4 py-3 space-y-2 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Gender:</span>
                    <span className="font-semibold text-gray-900">{student.gender}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Blood Group:</span>
                    <span className="font-semibold text-gray-900">{student.bloodGroup}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Route:</span>
                    <span className="font-semibold text-gray-900 text-xs">{student.route}</span>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-2">
                  <button
                    onClick={() => handleEditClick(student)}
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

      {/* Register Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-[#1E3A5F] to-[#3B6FB6]">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Register New Student</h2>
                  <p className="text-white/70 text-sm">Fill in the student's information</p>
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
                
                {/* Personal Information Section */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Student ID <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="studentId"
                        value={formData.studentId}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., STU-006"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., John"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., Doe"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date of Birth <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Gender <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all bg-white"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Blood Group
                      </label>
                      <select
                        name="bloodGroup"
                        value={formData.bloodGroup}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all bg-white"
                      >
                        <option value="">Select Blood Group</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* School Information Section */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <School className="w-4 h-4" />
                    School Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        School <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="school"
                        value={formData.school}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all bg-white"
                      >
                        <option value="">Select School</option>
                        {schools.map(school => (
                          <option key={school.id} value={school.name}>{school.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Class <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="class"
                        value={formData.class}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., 10A"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Roll Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="rollNumber"
                        value={formData.rollNumber}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., 10A-001"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Assigned Route
                      </label>
                      <select
                        name="busRoute"
                        value={formData.busRoute}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all bg-white"
                      >
                        <option value="">Select Route</option>
                        {routes.map(route => (
                          <option key={route.id} value={route.name}>{route.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Parent/Guardian Information Section */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Parent/Guardian Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Parent Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="parentName"
                        value={formData.parentName}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., John Doe"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Parent Phone <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="parentPhone"
                        value={formData.parentPhone}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., +1 212-555-0100"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Parent Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="parentEmail"
                        value={formData.parentEmail}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., john@example.com"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Emergency Contact Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., Jane Doe"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Emergency Phone <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="emergencyPhone"
                        value={formData.emergencyPhone}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., +1 212-555-0101"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Address & Health Information */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Home className="w-4 h-4" />
                    Address & Health Information
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Home Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="homeAddress"
                        value={formData.homeAddress}
                        onChange={handleInputChange}
                        required
                        placeholder="Full home address"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Medical Conditions
                      </label>
                      <textarea
                        name="medicalConditions"
                        value={formData.medicalConditions}
                        onChange={handleInputChange}
                        rows="2"
                        placeholder="Any allergies or medical conditions (optional)"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all resize-none"
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
                        <option value="inactive">Inactive</option>
                        <option value="graduated">Graduated</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Additional Notes
                      </label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        rows="2"
                        placeholder="Any additional information..."
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all resize-none"
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
                Register Student
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Student Modal */}
      {showEditModal && editingStudent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-[#1E3A5F] to-[#3B6FB6]">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Edit2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Update Student</h2>
                  <p className="text-white/70 text-sm">Update student's information</p>
                </div>
              </div>
              <button onClick={() => { setShowEditModal(false); setEditingStudent(null); }} className="p-2 rounded-lg hover:bg-white/20 transition-colors">
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleUpdateSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
              <div className="space-y-6">

                {/* Personal Information Section */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Student ID <span className="text-red-500">*</span></label>
                      <input type="text" name="studentId" value={formData.studentId} disabled className="w-full px-4 py-2.5 border border-gray-300 rounded-xl bg-gray-100 text-gray-500 cursor-not-allowed" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Roll Number <span className="text-red-500">*</span></label>
                      <input type="text" name="rollNumber" value={formData.rollNumber} disabled className="w-full px-4 py-2.5 border border-gray-300 rounded-xl bg-gray-100 text-gray-500 cursor-not-allowed" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name <span className="text-red-500">*</span></label>
                      <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required placeholder="e.g., John" className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name <span className="text-red-500">*</span></label>
                      <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required placeholder="e.g., Doe" className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth <span className="text-red-500">*</span></label>
                      <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} required className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Gender <span className="text-red-500">*</span></label>
                      <select name="gender" value={formData.gender} onChange={handleInputChange} required className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all bg-white">
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
                      <select name="bloodGroup" value={formData.bloodGroup} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus-border-transparent transition-all bg-white">
                        <option value="">Select Blood Group</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* School Information Section */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <School className="w-4 h-4" />
                    School Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">School <span className="text-red-500">*</span></label>
                      <select name="school" value={formData.school} onChange={handleInputChange} required className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all bg-white">
                        <option value="">Select School</option>
                        {schools.map(school => (
                          <option key={school.id} value={school.name}>{school.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Class <span className="text-red-500">*</span></label>
                      <input type="text" name="class" value={formData.class} onChange={handleInputChange} required placeholder="e.g., 10A" className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Assigned Route</label>
                      <select name="busRoute" value={formData.busRoute} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus-border-transparent transition-all bg-white">
                        <option value="">Select Route</option>
                        {routes.map(route => (
                          <option key={route.id} value={route.name}>{route.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Parent/Guardian Information Section */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Parent/Guardian Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Parent Name <span className="text-red-500">*</span></label>
                      <input type="text" name="parentName" value={formData.parentName} onChange={handleInputChange} required placeholder="e.g., John Doe" className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus-border-transparent transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Parent Phone <span className="text-red-500">*</span></label>
                      <input type="tel" name="parentPhone" value={formData.parentPhone} onChange={handleInputChange} required placeholder="e.g., +1 212-555-0100" className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus-border-transparent transition-all" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Parent Email <span className="text-red-500">*</span></label>
                      <input type="email" name="parentEmail" value={formData.parentEmail} onChange={handleInputChange} required placeholder="e.g., john@example.com" className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus-border-transparent transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact Name <span className="text-red-500">*</span></label>
                      <input type="text" name="emergencyContact" value={formData.emergencyContact} onChange={handleInputChange} required placeholder="e.g., Jane Doe" className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus-border-transparent transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Phone <span className="text-red-500">*</span></label>
                      <input type="tel" name="emergencyPhone" value={formData.emergencyPhone} onChange={handleInputChange} required placeholder="e.g., +1 212-555-0101" className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus-border-transparent transition-all" />
                    </div>
                  </div>
                </div>

                {/* Address & Health Information */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Home className="w-4 h-4" />
                    Address & Health Information
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Home Address <span className="text-red-500">*</span></label>
                      <input type="text" name="homeAddress" value={formData.homeAddress} onChange={handleInputChange} required placeholder="Full home address" className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus-border-transparent transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Medical Conditions</label>
                      <textarea name="medicalConditions" value={formData.medicalConditions} onChange={handleInputChange} rows="2" placeholder="Any allergies or medical conditions (optional)" className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus-border-transparent transition-all resize-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select name="status" value={formData.status} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus-border-transparent transition-all bg-white">
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="graduated">Graduated</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                      <textarea name="notes" value={formData.notes} onChange={handleInputChange} rows="2" placeholder="Any additional information..." className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus-border-transparent transition-all resize-none" />
                    </div>
                  </div>
                </div>

              </div>
            </form>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-end gap-3">
              <button type="button" onClick={() => { setShowEditModal(false); setEditingStudent(null); }} className="px-5 py-2.5 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors font-medium">Cancel</button>
              <button type="submit" onClick={handleUpdateSubmit} className="px-5 py-2.5 bg-[#1E3A5F] text-white rounded-xl hover:bg-[#3B6FB6] transition-colors font-medium flex items-center gap-2">
                <Save className="w-4 h-4" />
                Update Student
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Students;
