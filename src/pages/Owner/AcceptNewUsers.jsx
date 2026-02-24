import React, { useState, useEffect } from 'react';
import { ArrowLeft, User, Users, Truck, CheckCircle, Clock, Phone, Calendar } from 'lucide-react';
import UserServices from '../../services/UserServices';
import OwnerHeader from '../../components/Owner/OwnerHeader';
import OwnerFooter from '../../components/Owner/OwnerFooter';

function AcceptNewUsers({ onMenuClick, setActiveTab, onLogout, onBack }) {
  const [selectedUserType, setSelectedUserType] = useState(null);
  const [pendingUsers, setPendingUsers] = useState([]);
  const [pendingCounts, setPendingCounts] = useState({ O: 0, P: 0, D: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch pending counts for cards on first load
  useEffect(() => {
    fetchPendingCounts();
  }, []);

  // Fetch pending users based on type
  useEffect(() => {
    if (selectedUserType) {
      fetchPendingUsers(selectedUserType);
    }
  }, [selectedUserType]);

  const normalizeUsers = (responseData) => {
    if (Array.isArray(responseData)) {
      return responseData;
    }
    if (responseData?.ResultSet && Array.isArray(responseData.ResultSet)) {
      return responseData.ResultSet;
    }
    return [];
  };

  const fetchPendingCounts = async () => {
    try {
      const response = await UserServices.getAllUsers();
      const users = normalizeUsers(response?.data);

      const counts = {
        O: users.filter((user) => user.UserType === 'O' && user.Status === 'P').length,
        P: users.filter((user) => user.UserType === 'P' && user.Status === 'P').length,
        D: users.filter((user) => user.UserType === 'D' && user.Status === 'P').length,
      };

      setPendingCounts(counts);
    } catch (err) {
      console.error('Error fetching pending counts:', err);
      setPendingCounts({ O: 0, P: 0, D: 0 });
    }
  };

  const fetchPendingUsers = async (userType) => {
    setLoading(true);
    setError('');
    try {
      const response = await UserServices.getAllUsers();
      const users = normalizeUsers(response?.data);

      if (response.success) {
        // Filter users by type and status === 'P' (pending)
        const filtered = users.filter(
          user => user.UserType === userType && user.Status === 'P'
        );
        setPendingUsers(filtered);
        setPendingCounts({
          O: users.filter((user) => user.UserType === 'O' && user.Status === 'P').length,
          P: users.filter((user) => user.UserType === 'P' && user.Status === 'P').length,
          D: users.filter((user) => user.UserType === 'D' && user.Status === 'P').length,
        });
      } else {
        setError('Failed to fetch users');
        setPendingUsers([]);
      }
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to load pending users');
      setPendingUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptUser = async (userId, userName) => {
    try {
      setLoading(true);
      const response = await UserServices.updateUserStatus(userId, 'A');
      
      if (response.success) {
        // Remove accepted user from list
        setPendingUsers((prevUsers) => prevUsers.filter((user) => user.UserID !== userId));
        setPendingCounts((prevCounts) => ({
          ...prevCounts,
          [selectedUserType]: Math.max(0, (prevCounts[selectedUserType] || 0) - 1),
        }));
        alert(`${userName} has been accepted successfully!`);
      } else {
        setError(`Failed to accept ${userName}`);
      }
    } catch (err) {
      console.error('Error accepting user:', err);
      setError(err.message || 'Failed to accept user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRejectUser = async (userId, userName) => {
    try {
      setLoading(true);
      const response = await UserServices.updateUserStatus(userId, 'R');
      
      if (response.success) {
        // Remove rejected user from list
        setPendingUsers((prevUsers) => prevUsers.filter((user) => user.UserID !== userId));
        setPendingCounts((prevCounts) => ({
          ...prevCounts,
          [selectedUserType]: Math.max(0, (prevCounts[selectedUserType] || 0) - 1),
        }));
        alert(`${userName} has been rejected successfully!`);
      } else {
        setError(`Failed to reject ${userName}`);
      }
    } catch (err) {
      console.error('Error rejecting user:', err);
      setError(err.message || 'Failed to reject user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const userTypeInfo = {
    O: { label: 'New Owners', icon: Users, color: 'from-orange-400 to-orange-600', description: 'Manage pending owner registrations' },
    P: { label: 'New Parents', icon: User, color: 'from-pink-400 to-pink-600', description: 'Manage pending parent registrations' },
    D: { label: 'New Drivers', icon: Truck, color: 'from-blue-400 to-blue-600', description: 'Manage pending driver registrations' },
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#FFF9E6] via-[#FFFDF5] to-[#FFF9E6]">
      <OwnerHeader notifications={[]} ownerName="David" companyName="TrackMate Fleet" onMenuClick={onMenuClick} setActiveTab={setActiveTab} onLogout={onLogout} />
      
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-6xl mx-auto space-y-6">
          
          {/* Back Button & Header */}
          <div className="flex items-center gap-3 mb-4">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium text-sm transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>
          </div>

          {/* Page Title */}
          <div className="bg-gradient-to-r from-[#1E3A5F] via-[#3B6FB6] to-[#1E3A5F] text-white rounded-2xl p-6 border-b-4 border-[#F5C518]">
            <h1 className="text-3xl font-bold mb-2">Quick Accept New Users</h1>
            <p className="text-[#FFE066]">Review and accept pending user registrations</p>
          </div>

          {/* User Type Selection */}
          {!selectedUserType ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(userTypeInfo).map(([type, info]) => {
                const Icon = info.icon;
                return (
                  <button
                    key={type}
                    onClick={() => setSelectedUserType(type)}
                    className={`relative p-6 rounded-xl border-2 border-transparent transition-all hover:shadow-xl active:scale-95 bg-gradient-to-br ${info.color} text-white cursor-pointer`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <Icon className="w-8 h-8" />
                      <h3 className="text-xl font-bold">{info.label}</h3>
                    </div>
                    <p className="text-sm font-medium opacity-90">{info.description}</p>
                    <div className="mt-4 pt-4 border-t border-white/20">
                      <span className="text-3xl font-bold">{pendingCounts[type] || 0}</span>
                      <p className="text-xs opacity-75 mt-1">Pending</p>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="space-y-4">
              {/* Back to Selection Button */}
              <button
                onClick={() => {
                  setSelectedUserType(null);
                  setPendingUsers([]);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium text-sm transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Selection
              </button>

              {/* User Type Header */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900">{userTypeInfo[selectedUserType]?.label}</h2>
                <p className="text-gray-600 mt-1">{userTypeInfo[selectedUserType]?.description}</p>
                <div className="mt-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#3B6FB6]" />
                  <span className="text-sm font-medium text-gray-700">
                    {loading ? 'Loading...' : `${pendingUsers.length} pending users`}
                  </span>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                  <div className="text-red-600 font-bold text-lg">!</div>
                  <div>
                    <p className="text-red-800 font-medium">Error loading users</p>
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                </div>
              )}

              {/* Users List */}
              {loading ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                  <div className="inline-block">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3B6FB6]"></div>
                  </div>
                  <p className="text-gray-600 mt-4">Loading pending users...</p>
                </div>
              ) : pendingUsers.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900">No Pending Users</h3>
                  <p className="text-gray-600 mt-2">All {userTypeInfo[selectedUserType]?.label.toLowerCase()} have been accepted</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {pendingUsers.map((user) => (
                    <div key={user.UserID} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        
                        {/* User Info */}
                        <div className="flex items-start gap-4 flex-1">
                          {/* Profile Image */}
                          <div className="flex-shrink-0">
                            {user.ProfileImage ? (
                              <img 
                                src={user.ProfileImage} 
                                alt={user.UserName}
                                className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                              />
                            ) : (
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#3B6FB6] to-[#F5C518] flex items-center justify-center">
                                <User className="w-6 h-6 text-white" />
                              </div>
                            )}
                          </div>

                          {/* User Details */}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900">{user.UserName}</h3>
                            <div className="flex flex-col gap-1 mt-2 text-sm">
                              <div className="flex items-center gap-2 text-gray-600">
                                <Phone className="w-4 h-4 flex-shrink-0" />
                                <span>{user.Phone}</span>
                              </div>
                              <div className="flex items-center gap-2 text-gray-600">
                                <Calendar className="w-4 h-4 flex-shrink-0" />
                                <span>{user.CreatedDate}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 flex-shrink-0">
                          <button
                            onClick={() => handleRejectUser(user.UserID, user.UserName)}
                            className="px-4 py-2 rounded-lg bg-red-50 border border-red-200 text-red-700 font-medium text-sm hover:bg-red-100 transition-all active:scale-95"
                          >
                            Reject
                          </button>
                          <button
                            onClick={() => handleAcceptUser(user.UserID, user.UserName)}
                            className="px-4 py-2 rounded-lg bg-green-50 border border-green-200 text-green-700 font-medium text-sm hover:bg-green-100 transition-all active:scale-95"
                          >
                            Accept
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <OwnerFooter />
    </div>
  );
}

export default AcceptNewUsers;
