import React, { useState } from 'react';
import { 
  School, 
  MapPin, 
  Phone,
  Mail,
  Users,
  Search,
  Filter,
  Plus,
  MoreVertical,
  CheckCircle,
  Calendar,
  BookOpen,
  X,
  Save,
  FileText,
  Globe,
  User,
  Building,
  Edit,
  Edit2
} from 'lucide-react';
import OwnerHeader from '../../components/Owner/OwnerHeader';
import OwnerFooter from '../../components/Owner/OwnerFooter';

function Schools({ onMenuClick, setActiveTab }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingSchool, setEditingSchool] = useState(null);
  const [formData, setFormData] = useState({
    schoolCode: '',
    schoolName: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    principalName: '',
    contactPerson: '',
    phoneNumber: '',
    email: '',
    website: '',
    schoolType: 'primary',
    establishedYear: new Date().getFullYear(),
    totalStudents: '',
    busFleetSize: '',
    status: 'active',
    notes: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New School Data:', formData);
    // Here you would typically send data to backend
    alert('School added successfully!');
    setShowAddModal(false);
    setFormData({
      schoolCode: '',
      schoolName: '',
      address: '',
      city: '',
      state: '',
      postalCode: '',
      principalName: '',
      contactPerson: '',
      phoneNumber: '',
      email: '',
      website: '',
      schoolType: 'primary',
      establishedYear: new Date().getFullYear(),
      totalStudents: '',
      busFleetSize: '',
      status: 'active',
      notes: ''
    });
  };

  const handleEditClick = (school) => {
    setEditingSchool(school);
    setFormData({
      schoolCode: school.code || '',
      schoolName: school.name || '',
      address: school.address || '',
      city: school.city || '',
      state: school.state || '',
      postalCode: school.postalCode || '',
      principalName: school.principal || '',
      contactPerson: school.contact || '',
      phoneNumber: school.phone || '',
      email: school.email || '',
      website: school.website || '',
      schoolType: (school.type || 'primary').toLowerCase(),
      establishedYear: school.established || new Date().getFullYear(),
      totalStudents: school.students || '',
      busFleetSize: school.buses || '',
      status: (school.status || 'active').toLowerCase(),
      notes: school.notes || ''
    });
    setShowEditModal(true);
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    console.log('Updated School Data:', formData);
    alert('School updated successfully!');
    setShowEditModal(false);
    setEditingSchool(null);
  };

  const schoolsList = [
    {
      id: 'SCH-001',
      name: 'Riverside Academy',
      code: 'RA-001',
      principal: 'Dr. James Williams',
      city: 'New York',
      students: 450,
      buses: 5,
      type: 'Primary',
      established: 2010,
      contact: 'John Smith',
      phone: '+1 212-555-0100',
      email: 'info@riverside.edu',
      status: 'Active'
    },
    {
      id: 'SCH-002',
      name: 'Greenfield International',
      code: 'GI-002',
      principal: 'Prof. Sarah Johnson',
      city: 'Boston',
      students: 680,
      buses: 8,
      type: 'Secondary',
      established: 2005,
      contact: 'Emily Davis',
      phone: '+1 617-555-0101',
      email: 'admin@greenfield.edu',
      status: 'Active'
    },
    {
      id: 'SCH-003',
      name: 'Sunridge Public School',
      code: 'SP-003',
      principal: 'Mr. Robert Brown',
      city: 'Philadelphia',
      students: 320,
      buses: 4,
      type: 'Primary',
      established: 2012,
      contact: 'Lisa Anderson',
      phone: '+1 215-555-0102',
      email: 'contact@sunridge.edu',
      status: 'Active'
    },
    {
      id: 'SCH-004',
      name: 'Lakeside High School',
      code: 'LH-004',
      principal: 'Dr. Michael Chen',
      city: 'Chicago',
      students: 750,
      buses: 10,
      type: 'Secondary',
      established: 2000,
      contact: 'Tom Wilson',
      phone: '+1 312-555-0103',
      email: 'info@lakeside.edu',
      status: 'Active'
    },
    {
      id: 'SCH-005',
      name: 'Mountain View School',
      code: 'MV-005',
      principal: 'Ms. Patricia Garcia',
      city: 'Denver',
      students: 290,
      buses: 3,
      type: 'Primary',
      established: 2015,
      contact: 'Kevin Martinez',
      phone: '+1 303-555-0104',
      email: 'admin@mountainview.edu',
      status: 'Active'
    }
  ];

  const filteredSchools = schoolsList.filter(school => {
    const matchesSearch = school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         school.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         school.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || school.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: schoolsList.length,
    active: schoolsList.filter(s => s.status === 'Active').length,
    totalStudents: schoolsList.reduce((acc, s) => acc + s.students, 0),
    totalBuses: schoolsList.reduce((acc, s) => acc + s.buses, 0)
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#FFF7CC] via-[#FFE7A0] to-[#FFF7CC]">
      <OwnerHeader notifications={[]} ownerName="David" companyName="TrackMate Fleet" onMenuClick={onMenuClick} setActiveTab={setActiveTab} />
      
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Schools Management</h1>
              <p className="text-gray-600 mt-1">Monitor and manage partner schools</p>
            </div>
            <button 
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#1E3A5F] text-white rounded-xl hover:bg-[#3B6FB6] transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add New School
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-100">
                  <School className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                  <div className="text-sm text-gray-600">Total Schools</div>
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
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stats.totalStudents.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Total Students</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-orange-100">
                  <BookOpen className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stats.totalBuses}</div>
                  <div className="text-sm text-gray-600">Assigned Buses</div>
                </div>
              </div>
            </div>
          </div>

          {/* Search & Filter */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by school name, code, or city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all"
              />
              <Search className="absolute left-3.5 top-3 w-5 h-5 text-gray-400" />
            </div>
            <div className="flex gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all bg-white"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <button className="px-4 py-2.5 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2 font-medium text-gray-700">
                <Filter className="w-5 h-5" />
                More
              </button>
            </div>
          </div>

          {/* Schools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSchools.map(school => (
              <div key={school.id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
                
                {/* Header Section */}
                <div className="px-4 py-4 bg-gradient-to-r from-[#1E3A5F] to-[#3B6FB6] text-white">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-bold">{school.name}</h3>
                      <p className="text-sm text-[#FFE066]">{school.code}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      school.status === 'Active' 
                        ? 'bg-green-100/20 text-green-300' 
                        : 'bg-gray-100/20 text-gray-300'
                    }`}>
                      {school.status}
                    </span>
                  </div>
                </div>

                {/* Principal & Contact Info */}
                <div className="px-4 py-3 space-y-2 border-b border-gray-100">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-[#3B6FB6]" />
                    <span className="text-gray-700">
                      <span className="font-semibold text-gray-900">{school.principal}</span>
                      <span className="text-gray-500"> (Principal)</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-[#3B6FB6]" />
                    <span className="text-gray-700">
                      <span className="font-semibold text-gray-900">{school.contact}</span>
                      <span className="text-gray-500"> (Contact)</span>
                    </span>
                  </div>
                </div>

                {/* Contact Details */}
                <div className="px-4 py-3 space-y-2 border-b border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4 text-[#F5C518]" />
                    {school.phone}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4 text-[#F5C518]" />
                    {school.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-[#F5C518]" />
                    {school.city}, {school.state}
                  </div>
                </div>

                {/* Statistics */}
                <div className="px-4 py-3 space-y-2 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-purple-600" />
                      <span className="text-sm text-gray-600">Students:</span>
                    </div>
                    <span className="font-semibold text-gray-900">{school.students}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-orange-600" />
                      <span className="text-sm text-gray-600">Assigned Buses:</span>
                    </div>
                    <span className="font-semibold text-gray-900">{school.buses}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-gray-600">Established:</span>
                    </div>
                    <span className="font-semibold text-gray-900">{school.established}</span>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-2">
                  <button
                    onClick={() => handleEditClick(school)}
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

      {/* Add New School Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-[#1E3A5F] to-[#3B6FB6]">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <School className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Add New School</h2>
                  <p className="text-white/70 text-sm">Fill in the school's information</p>
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
                    Basic Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        School Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="schoolName"
                        value={formData.schoolName}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., Riverside Academy"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        School Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="schoolCode"
                        value={formData.schoolCode}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., RA-001"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        School Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="schoolType"
                        value={formData.schoolType}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all bg-white"
                      >
                        <option value="primary">Primary School</option>
                        <option value="secondary">Secondary School</option>
                        <option value="combined">Combined School</option>
                        <option value="international">International School</option>
                        <option value="private">Private School</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Year Established <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="establishedYear"
                        value={formData.establishedYear}
                        onChange={handleInputChange}
                        required
                        min="1900"
                        max="2030"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Principal & Contact Information */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Principal & Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Principal Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="principalName"
                        value={formData.principalName}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., Dr. James Williams"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Contact Person <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="contactPerson"
                        value={formData.contactPerson}
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
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., +1 212-555-0100"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., info@school.edu"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Website
                      </label>
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        placeholder="e.g., https://www.school.edu"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Address Information */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Address Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Street Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        placeholder="Full street address"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., New York"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., NY"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        placeholder="e.g., 10001"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* School Details Section */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Building className="w-4 h-4" />
                    School Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Total Students <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="totalStudents"
                        value={formData.totalStudents}
                        onChange={handleInputChange}
                        required
                        min="0"
                        placeholder="e.g., 450"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Bus Fleet Size <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="busFleetSize"
                        value={formData.busFleetSize}
                        onChange={handleInputChange}
                        required
                        min="0"
                        placeholder="e.g., 5"
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
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Notes Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Notes
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Any additional information about the school..."
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all resize-none"
                  />
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
                Save School
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update School Modal */}
      {showEditModal && editingSchool && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-[#1E3A5F] to-[#3B6FB6]">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Edit2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Update School</h2>
                  <p className="text-white/70 text-sm">Update school information</p>
                </div>
              </div>
              <button onClick={() => { setShowEditModal(false); setEditingSchool(null); }} className="p-2 rounded-lg hover:bg-white/20 transition-colors">
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
                    Basic Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">School Name <span className="text-red-500">*</span></label>
                      <input type="text" name="schoolName" value={formData.schoolName} onChange={handleInputChange} required placeholder="e.g., Riverside Academy" className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">School Code <span className="text-red-500">*</span></label>
                      <input type="text" name="schoolCode" value={formData.schoolCode} disabled className="w-full px-4 py-2.5 border border-gray-300 rounded-xl bg-gray-100 text-gray-500 cursor-not-allowed" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">School Type <span className="text-red-500">*</span></label>
                      <select name="schoolType" value={formData.schoolType} onChange={handleInputChange} required className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all bg-white">
                        <option value="primary">Primary School</option>
                        <option value="secondary">Secondary School</option>
                        <option value="combined">Combined School</option>
                        <option value="international">International School</option>
                        <option value="private">Private School</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Year Established <span className="text-red-500">*</span></label>
                      <input type="number" name="establishedYear" value={formData.establishedYear} onChange={handleInputChange} required min="1900" max="2030" className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all" />
                    </div>
                  </div>
                </div>

                {/* Principal & Contact Information */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Principal & Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Principal Name <span className="text-red-500">*</span></label>
                      <input type="text" name="principalName" value={formData.principalName} onChange={handleInputChange} required placeholder="e.g., Dr. James Williams" className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person <span className="text-red-500">*</span></label>
                      <input type="text" name="contactPerson" value={formData.contactPerson} onChange={handleInputChange} required placeholder="e.g., John Smith" className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number <span className="text-red-500">*</span></label>
                      <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} required placeholder="e.g., +1 212-555-0100" className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address <span className="text-red-500">*</span></label>
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="e.g., info@school.edu" className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                      <input type="url" name="website" value={formData.website} onChange={handleInputChange} placeholder="e.g., https://www.school.edu" className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all" />
                    </div>
                  </div>
                </div>

                {/* Address Information */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Address Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Street Address <span className="text-red-500">*</span></label>
                      <input type="text" name="address" value={formData.address} onChange={handleInputChange} required placeholder="Full street address" className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City <span className="text-red-500">*</span></label>
                      <input type="text" name="city" value={formData.city} onChange={handleInputChange} required placeholder="e.g., New York" className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">State <span className="text-red-500">*</span></label>
                      <input type="text" name="state" value={formData.state} onChange={handleInputChange} required placeholder="e.g., NY" className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                      <input type="text" name="postalCode" value={formData.postalCode} onChange={handleInputChange} placeholder="e.g., 10001" className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus-border-transparent transition-all" />
                    </div>
                  </div>
                </div>

                {/* School Details Section */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Building className="w-4 h-4" />
                    School Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Total Students <span className="text-red-500">*</span></label>
                      <input type="number" name="totalStudents" value={formData.totalStudents} onChange={handleInputChange} required min="0" placeholder="e.g., 450" className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus-border-transparent transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Bus Fleet Size <span className="text-red-500">*</span></label>
                      <input type="number" name="busFleetSize" value={formData.busFleetSize} onChange={handleInputChange} required min="0" placeholder="e.g., 5" className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus-border-transparent transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select name="status" value={formData.status} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus-border-transparent transition-all bg-white">
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Notes Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                  <textarea name="notes" value={formData.notes} onChange={handleInputChange} rows="3" placeholder="Any additional information about the school..." className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus-border-transparent transition-all resize-none" />
                </div>
              </div>
            </form>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-end gap-3">
              <button type="button" onClick={() => { setShowEditModal(false); setEditingSchool(null); }} className="px-5 py-2.5 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors font-medium">Cancel</button>
              <button type="submit" onClick={handleUpdateSubmit} className="px-5 py-2.5 bg-[#1E3A5F] text-white rounded-xl hover:bg-[#3B6FB6] transition-colors font-medium flex items-center gap-2">
                <Save className="w-4 h-4" />
                Update School
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Schools;
