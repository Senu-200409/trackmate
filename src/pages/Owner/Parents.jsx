import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Phone,
  Mail,
  MapPin,
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
  UserPlus,
  Loader2,
  AlertTriangle
} from 'lucide-react';
import OwnerHeader from '../../components/Owner/OwnerHeader';
import OwnerFooter from '../../components/Owner/OwnerFooter';
import ParentServices from '../../services/ParentServices';
import UserServices from '../../services/UserServices';
import RegisterParentModal from '../../components/Owner/RegisterParentModal';

function Parents({ onMenuClick, setActiveTab }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [parentsList, setParentsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Map API parent response to component format
  const mapParentData = (apiParent) => {
    // Map status codes to meaningful labels
    const statusMap = {
      'A': 'Active',
      'P': 'Pending',
      'I': 'Inactive',
      'R': 'Rejected'
    };
    const statusLabel = statusMap[apiParent.Status] || apiParent.Status || 'Unknown';
    
    return {
      id: apiParent.ParentID || '',
      parentID: apiParent.ParentID || '',
      userID: apiParent.UserID || '',
      name: `Parent #${apiParent.ParentID}` || 'Unknown Parent',
      role: apiParent.Role || 'Guardian',
      phone: apiParent.ContactNo2 || '',
      phone2: apiParent.ContactNo || '',
      address: apiParent.Address || '',
      status: statusLabel,
      statusCode: apiParent.Status,
      createdDate: apiParent.CreateDate || '',
      updatedDate: apiParent.UpdatedDate || '',
      createdBy: apiParent.CreatedBy || '',
      updatedBy: apiParent.UpdatedBy || '',
      ...apiParent
    };
  };

  // Fetch parents from API
  useEffect(() => {
    const fetchParents = async () => {
      try {
        setLoading(true);
        const response = await ParentServices.getAllParents();
        if (response.success && response.data) {
          const parentsList = Array.isArray(response.data) 
            ? response.data 
            : response.data.ResultSet || [];
          const mappedParents = parentsList.map(mapParentData);
          setParentsList(mappedParents);
        } else {
          setParentsList([]);
        }
      } catch (err) {
        console.error('Error fetching parents:', err);
        setError('Failed to load parents');
        setParentsList([]);
      } finally {
        setLoading(false);
      }
    };
    fetchParents();
  }, []);
  const [filterStatus, setFilterStatus] = useState('active');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRegisterParentModal, setShowRegisterParentModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingParent, setEditingParent] = useState(null);
  const [editLoading, setEditLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    secondaryPhone: '',
    status: 'active'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New Parent Data:', formData);
    alert('Parent registered successfully!');
    setShowAddModal(false);
    setFormData({
      name: '',
      phone: '',
      address: '',
      secondaryPhone: '',
      status: 'active'
    });
  };

  const handleEditClick = async (parent) => {
    // fetch latest parent record before opening modal
    setEditLoading(true);
    try {
      const id = parent.parentID || parent.id;
      const resp = await ParentServices.getParent(id);
      if (resp.success && resp.data) {
        // some endpoints return arrays under ResultSet
        const raw = Array.isArray(resp.data)
          ? resp.data[0]
          : resp.data.ResultSet && resp.data.ResultSet.length
            ? resp.data.ResultSet[0]
            : resp.data;
        const fresh = mapParentData(raw);
        setEditingParent(fresh);

        // prepare form values; later we may override with user info
        // Address and secondary mobile come directly from parent details
        let initValues = {
          name: fresh.name || '',
          phone: fresh.phone || '',           // primary phone (may be overridden by user API)
          address: fresh.address || '',
          secondaryPhone: fresh.phone || '',   // use ContactNo2 for secondary mobile
          status: (fresh.status || 'active').toLowerCase()
        };

        // if parent has linked user id, fetch user details
        if (fresh.userID) {
          try {
            // eslint-disable-next-line no-undef
            const userResp = await UserServices.getUserById(fresh.userID);
            if (userResp.success && userResp.data) {
              const uraw = Array.isArray(userResp.data)
                ? userResp.data[0]
                : userResp.data.ResultSet && userResp.data.ResultSet.length
                  ? userResp.data.ResultSet[0]
                  : userResp.data;
              // override form fields
              initValues.name = uraw.UserName || initValues.name;
              initValues.phone = uraw.Phone || initValues.phone;
              // user.Status is a code like 'A' or 'I'; map to active/inactive
              if (uraw.Status) {
                initValues.status = uraw.Status.toUpperCase() === 'A' ? 'active' : 'inactive';
              }
            }
          } catch (uerr) {
            console.warn('Failed to fetch user for parent:', uerr);
          }
        }

        setFormData(initValues);
        setShowEditModal(true);
      }
    } catch (err) {
      console.error('Failed to fetch parent for edit:', err);
      alert('Unable to load parent details. Please try again.');
    } finally {
      setEditLoading(false);
    }
  };

  const [saveLoading, setSaveLoading] = useState(false);

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setSaveLoading(true);
    try {
      // if this parent has a linked user record, update it
      if (editingParent && editingParent.userID) {
        const payload = {
          UserID: editingParent.userID,
          Phone: formData.phone,
          UserName: formData.name,
        };
        const resp = await UserServices.updateUser(payload);
        if (resp.success) {
          alert('User information updated successfully');
        } else {
          alert('Failed to update user information');
        }

        // update status code if changed
        const statusCode = formData.status === 'active' ? 'A'
                         : formData.status === 'inactive' ? 'I'
                         : null;
        if (statusCode) {
          try {
            await UserServices.updateUserStatus(editingParent.userID, statusCode);
          } catch (sErr) {
            console.warn('Failed to update user status:', sErr);
          }
        }
      }

      // now update parent-specific details
      if (editingParent && editingParent.parentID) {
        const parentPayload = {
          UserID: editingParent.userID,
          Address: formData.address,
          ContactNo2: formData.secondaryPhone,
          Role: editingParent.role || '',
        };
        try {
          const pResp = await ParentServices.updateParent(editingParent.parentID, parentPayload);
          if (!pResp.success) {
            console.warn('Parent update response not success', pResp);
          }
        } catch (perr) {
          console.error('Error updating parent record:', perr);
        }
      }
    } catch (err) {
      console.error('Error updating user:', err);
      alert('An error occurred while updating user information');
    } finally {
      setSaveLoading(false);
      setShowEditModal(false);
      setEditingParent(null);
    }
  };

  const filteredParents = parentsList.filter(parent => {
    const matchesSearch = (parent.name && parent.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (parent.phone && parent.phone.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (parent.parentID && parent.parentID.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (parent.role && parent.role.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterStatus === 'all' || parent.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: parentsList.length,
    active: parentsList.filter(p => p.status === 'Active').length,
    pending: parentsList.filter(p => p.status === 'Pending').length,
    inactive: parentsList.filter(p => p.status === 'Inactive').length,
    rejected: parentsList.filter(p => p.status === 'Rejected').length
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#FFF6E0] via-[#FFE8C0] to-[#FFF6E0]">
      <OwnerHeader notifications={[]} ownerName="David" companyName="TrackMate Fleet" onMenuClick={onMenuClick} setActiveTab={setActiveTab} />
      
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Parents Management</h1>
              <p className="text-gray-600 mt-1">Register and manage parent/guardian information</p>
            </div>
            <button 
              onClick={() => setShowRegisterParentModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#1E3A5F] text-white rounded-xl hover:bg-[#3B6FB6] transition-colors"
            >
              <Plus className="w-5 h-5" />
              Register Parent
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div 
              onClick={() => setFilterStatus('all')}
              className={`rounded-xl p-4 border-2 shadow-sm cursor-pointer transition-all duration-200 ${
                filterStatus === 'all'
                  ? 'bg-blue-50 border-blue-500 shadow-md'
                  : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-100">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                  <div className="text-sm text-gray-600">Total Parents</div>
                </div>
              </div>
            </div>
            <div 
              onClick={() => setFilterStatus('active')}
              className={`rounded-xl p-4 border-2 shadow-sm cursor-pointer transition-all duration-200 ${
                filterStatus === 'active'
                  ? 'bg-green-50 border-green-500 shadow-md'
                  : 'bg-white border-gray-200 hover:border-green-300 hover:shadow-md'
              }`}
            >
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
            <div 
              onClick={() => setFilterStatus('pending')}
              className={`rounded-xl p-4 border-2 shadow-sm cursor-pointer transition-all duration-200 ${
                filterStatus === 'pending'
                  ? 'bg-yellow-50 border-yellow-500 shadow-md'
                  : 'bg-white border-gray-200 hover:border-yellow-300 hover:shadow-md'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-yellow-100">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stats.pending}</div>
                  <div className="text-sm text-gray-600">Pending</div>
                </div>
              </div>
            </div>
            <div 
              onClick={() => setFilterStatus('inactive')}
              className={`rounded-xl p-4 border-2 shadow-sm cursor-pointer transition-all duration-200 ${
                filterStatus === 'inactive'
                  ? 'bg-gray-100 border-gray-600 shadow-md'
                  : 'bg-white border-gray-200 hover:border-gray-400 hover:shadow-md'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gray-200">
                  <Users className="w-5 h-5 text-gray-700" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stats.inactive}</div>
                  <div className="text-sm text-gray-600">Inactive</div>
                </div>
              </div>
            </div>
            <div 
              onClick={() => setFilterStatus('rejected')}
              className={`rounded-xl p-4 border-2 shadow-sm cursor-pointer transition-all duration-200 ${
                filterStatus === 'rejected'
                  ? 'bg-red-50 border-red-500 shadow-md'
                  : 'bg-white border-gray-200 hover:border-red-300 hover:shadow-md'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-red-100">
                  <X className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stats.rejected}</div>
                  <div className="text-sm text-gray-600">Rejected</div>
                </div>
              </div>
            </div>
          </div>

          {/* Search & Filter */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name, phone, or parent ID..."
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
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all bg-white cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="inactive">Inactive</option>
                <option value="rejected">Rejected</option>
              </select>
              <button className="px-4 py-2.5 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2 font-medium text-gray-700">
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Parents Grid */}
          {loading ? (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">
              <Loader2 className="w-8 h-8 animate-spin text-[#3B6FB6] mx-auto mb-4" />
              <p className="text-gray-600">Loading parents data...</p>
            </div>
          ) : error ? (
            <div className="bg-white rounded-xl border border-red-200 shadow-sm p-6 text-center">
              <AlertTriangle className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <p className="text-red-600 font-medium">{error}</p>
            </div>
          ) : filteredParents.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 font-medium">No parents found</p>
              <p className="text-gray-500 text-sm">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredParents.map(parent => (
              <div key={parent.id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
                
                {/* Header Section */}
                <div className="px-4 py-4 bg-gradient-to-r from-[#1E3A5F] to-[#3B6FB6] text-white">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-bold">Parent #{parent.parentID}</h3>
                      <p className="text-sm text-[#FFE066]">{parent.role}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      parent.status === 'Active' 
                        ? 'bg-green-100/20 text-green-300' 
                        : parent.status === 'Pending'
                        ? 'bg-yellow-100/20 text-yellow-300'
                        : parent.status === 'Rejected'
                        ? 'bg-red-100/20 text-red-300'
                        : 'bg-gray-100/20 text-gray-300'
                    }`}>
                      {parent.status}
                    </span>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="px-4 py-3 space-y-2 border-b border-gray-100">
                  {parent.phone && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4 text-[#F5C518]" />
                      {parent.phone}
                    </div>
                  )}
                  {parent.phone2 && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4 text-[#F5C518]" />
                      {parent.phone2}
                    </div>
                  )}
                </div>

                {/* Address Information */}
                {parent.address && (
                  <div className="px-4 py-3 space-y-2 border-b border-gray-100">
                    <div className="flex items-start gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-[#3B6FB6] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{parent.address}</span>
                    </div>
                  </div>
                )}

                {/* User ID & Dates */}
                <div className="px-4 py-3 space-y-2 border-b border-gray-100">
                  <div className="text-xs text-gray-500">
                    <span className="font-semibold">User ID:</span> {parent.userID}
                  </div>
                  {parent.createdDate && (
                    <div className="text-xs text-gray-500">
                      <span className="font-semibold">Created:</span> {parent.createdDate}
                    </div>
                  )}
                  {parent.updatedDate && (
                    <div className="text-xs text-gray-500">
                      <span className="font-semibold">Updated:</span> {parent.updatedDate}
                    </div>
                  )}
                </div>

                {/* Footer Actions */}
                <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-2">
                  <button
                    onClick={() => handleEditClick(parent)}
                    disabled={editLoading}
                    className="px-3 py-1.5 rounded-lg bg-[#1E3A5F] text-white hover:bg-[#3B6FB6] transition-colors text-xs font-medium flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Update"
                  >
                    {editLoading ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <Edit className="w-3 h-3" />
                    )}
                    Update
                  </button>
                  <button className="p-2 rounded-lg hover:bg-gray-200 transition-colors" title="More Options">
                    <MoreVertical className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            ))}
            </div>
          )}

        </div>
      </main>

      <OwnerFooter />

      {/* Register Parent Modal - Using new 2-step registration form */}
      <RegisterParentModal 
        isOpen={showRegisterParentModal}
        onClose={() => setShowRegisterParentModal(false)}
        onSuccess={() => {
          // Refresh parents list after successful registration
          const fetchParents = async () => {
            try {
              const response = await ParentServices.getAllParents();
              if (response.success && response.data) {
                const parentsList = Array.isArray(response.data) 
                  ? response.data 
                  : response.data.ResultSet || [];
                const mappedParents = parentsList.map(mapParentData);
                setParentsList(mappedParents);
              }
            } catch (err) {
              console.error('Error fetching parents:', err);
            }
          };
          fetchParents();
        }}
      />

      {/* Register Parent Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-[#1E3A5F] to-[#3B6FB6]">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <UserPlus className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Register Parent/Guardian</h2>
                  <p className="text-white/70 text-sm">Fill in the parent's information</p>
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
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., John Smith"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Information Section */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., +1 212-555-0100"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Address Information Section */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Address Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        placeholder="Full address"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Secondary Mobile Section */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Secondary Mobile Number
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Secondary Mobile Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="secondaryPhone"
                        value={formData.secondaryPhone}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., +44 7123 456789"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Additional Information</h3>
                  <div className="grid grid-cols-1 gap-4">
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
                Register Parent
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Parent Modal */}
      {showEditModal && editingParent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-[#1E3A5F] to-[#3B6FB6]">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Edit className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Update Parent/Guardian</h2>
                  <p className="text-white/70 text-sm">Update parent information</p>
                </div>
              </div>
              <button onClick={() => { setShowEditModal(false); setEditingParent(null); }} className="p-2 rounded-lg hover:bg-white/20 transition-colors">
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
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                      <input type="text" name="name" value={formData.name} onChange={handleInputChange} required placeholder="e.g., John Smith" className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all" />
                    </div>
                  </div>
                </div>

                {/* Contact Information Section */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number <span className="text-red-500">*</span></label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required placeholder="e.g., +1 212-555-0100" className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent transition-all" />
                    </div>
                  </div>
                </div>

                {/* Address Information Section */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Address Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address <span className="text-red-500">*</span></label>
                      <input type="text" name="address" value={formData.address} onChange={handleInputChange} required placeholder="Full address" className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus-border-transparent transition-all" />
                    </div>
                  </div>
                </div>

                {/* Secondary Mobile Section */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Secondary Mobile Number
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Mobile Number <span className="text-red-500">*</span></label>
                      <input type="tel" name="secondaryPhone" value={formData.secondaryPhone} onChange={handleInputChange} required placeholder="e.g., +44 7123 456789" className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus-border-transparent transition-all" />
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Additional Information</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select name="status" value={formData.status} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B6FB6] focus-border-transparent transition-all bg-white">
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                </div>

              </div>
            </form>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-end gap-3">
              <button type="button" onClick={() => { setShowEditModal(false); setEditingParent(null); }} className="px-5 py-2.5 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors font-medium">Cancel</button>
              <button
                type="submit"
                onClick={handleUpdateSubmit}
                disabled={saveLoading}
                className="px-5 py-2.5 bg-[#1E3A5F] text-white rounded-xl hover:bg-[#3B6FB6] transition-colors font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saveLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                Update Parent
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Parents;
