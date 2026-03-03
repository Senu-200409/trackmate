import React, { useState, useEffect } from 'react';
import { 
  School, 
  MapPin, 
  Phone,
  Users,
  Search,
  Filter,
  Plus,
  MoreVertical,
  CheckCircle,
  X,
  Save,
  FileText,
  Building,
  Edit,
  Edit2,
  Loader2
} from 'lucide-react';
import OwnerHeader from '../../components/Owner/OwnerHeader';
import OwnerFooter from '../../components/Owner/OwnerFooter';
import SchoolServices from '../../services/SchoolServices';

function Schools({ onMenuClick, setActiveTab }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [schoolsList, setSchoolsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // helper to normalize API fields into UI-friendly object
  const mapSchoolData = (apiSchool) => ({
    id: apiSchool.SchoolID || apiSchool.id || '',
    name: apiSchool.SchoolName || apiSchool.name || '',
    city: apiSchool.City || '',
    town: apiSchool.Town || '',
    address: apiSchool.Address || '',
    type: apiSchool.SchoolType || '',
    status: apiSchool.Status === 'A' ? 'Active' : apiSchool.Status === 'I' ? 'Inactive' : apiSchool.Status || 'Unknown',
    createDate: apiSchool.CreateDate || '',
    createdBy: apiSchool.CreatedBy || '',
    updatedDate: apiSchool.UpdatedDate || '',
    updatedBy: apiSchool.UpdatedBy || '',
    // preserve any other fields
    ...apiSchool,
  });

  // Fetch schools from API
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        setLoading(true);
        const response = await SchoolServices.getAllSchools();
        let list = [];
        if (response.success && response.data) {
          // unwrap ResultSet if necessary
          if (Array.isArray(response.data)) {
            list = response.data;
          } else if (Array.isArray(response.data.ResultSet)) {
            list = response.data.ResultSet;
          }
        }
        // normalize entries
        const normalized = list.map(mapSchoolData);
        setSchoolsList(normalized);
      } catch (err) {
        console.error('Error fetching schools:', err);
        setError('Failed to load schools');
        setSchoolsList([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSchools();
  }, []);
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingSchool, setEditingSchool] = useState(null);
  const [formData, setFormData] = useState({
    schoolName: '',
    address: '',
    city: '',
    town: '',
    schoolType: 'Boys'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    (async () => {
      try {
        const payload = {
          Userid: 1,
          SchoolName: formData.schoolName,
          Address: formData.address,
          City: formData.city,
          Town: formData.town,
          SchoolType: formData.schoolType
        };
        const res = await SchoolServices.addSchool(payload);
        if (res.success) {
          alert('School added successfully!');
          setShowAddModal(false);
          const listRes = await SchoolServices.getAllSchools();
          if (listRes.success) {
            const normalized = (Array.isArray(listRes.data) ? listRes.data : listRes.data.ResultSet || []).map(mapSchoolData);
            setSchoolsList(normalized);
          }
        }
      } catch (err) {
        console.error('Add school error:', err);
        alert('Failed to add school');
      } finally {
        setFormData({
          schoolName: '',
          address: '',
          city: '',
          town: '',
          schoolType: 'Boys'
        });
      }
    })();
  };

  const handleEditClick = (school) => {
    setEditingSchool(school);
    setFormData({
      schoolName: school.name || '',
      address: school.address || '',
      city: school.city || '',
      town: school.town || '',
      schoolType: school.type || 'Boys'
    });
    setShowEditModal(true);
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    (async () => {
      try {
        const payload = {
          Userid: 1,
          SchoolName: formData.schoolName,
          Address: formData.address,
          City: formData.city,
          Town: formData.town,
          SchoolType: formData.schoolType
        };
        const res = await SchoolServices.updateSchool(editingSchool.id || editingSchool.schoolId, payload);
        if (res.success) {
          alert('School updated successfully!');
          setShowEditModal(false);
          setEditingSchool(null);
          const listRes = await SchoolServices.getAllSchools();
          if (listRes.success) {
            const normalized = (Array.isArray(listRes.data) ? listRes.data : listRes.data.ResultSet || []).map(mapSchoolData);
            setSchoolsList(normalized);
          }
        }
      } catch (err) {
        console.error('Update school error:', err);
        alert('Failed to update school');
      }
    })();
  };

  const filteredSchools = schoolsList.filter(school => {
    const matchesSearch =
      school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.town.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || school.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: schoolsList.length,
    active: schoolsList.filter(s => s.status === 'Active').length
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <div className="text-sm text-gray-600">Active Schools</div>
                </div>
              </div>
            </div>
          </div>

          {/* Search & Filter */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by school name or city..."
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
                      <div className="text-xs mt-1">{school.type}</div>
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

                {/* Location Details */}
                <div className="px-4 py-3 space-y-2 border-b border-gray-100 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#F5C518]" />
                    {school.address || school.city}
                  </div>
                  {school.town && (
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-[#F5C518]" />
                      {school.town}
                    </div>
                  )}
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
                  <div className="grid grid-cols-1 gap-4">
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
                  </div>
                </div>

                {/* School Type */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Building className="w-4 h-4" />
                    School Type
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
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
                        <option value="Boys">Boys</option>
                        <option value="Girls">Girls</option>
                        <option value="Mixed">Mixed</option>
                      </select>
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
                        placeholder="e.g., Colombo"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Town <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="town"
                        value={formData.town}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., Colombo 07"
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
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">School Name <span className="text-red-500">*</span></label>
                      <input type="text" name="schoolName" value={formData.schoolName} onChange={handleInputChange} required placeholder="e.g., Riverside Academy" className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all" />
                    </div>
                  </div>
                </div>

                {/* School Type */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Building className="w-4 h-4" />
                    School Type
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">School Type <span className="text-red-500">*</span></label>
                      <select name="schoolType" value={formData.schoolType} onChange={handleInputChange} required className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all bg-white">
                        <option value="Boys">Boys</option>
                        <option value="Girls">Girls</option>
                        <option value="Mixed">Mixed</option>
                      </select>
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
                      <input type="text" name="city" value={formData.city} onChange={handleInputChange} required placeholder="e.g., Colombo" className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Town <span className="text-red-500">*</span></label>
                      <input type="text" name="town" value={formData.town} onChange={handleInputChange} required placeholder="e.g., Colombo 07" className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all" />
                    </div>
                  </div>
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
