import React, { useState } from 'react';
import { 
  Users, 
  User,
  Star,
  Phone,
  Mail,
  Calendar,
  MapPin,
  Search,
  Filter,
  Plus,
  MoreVertical,
  CheckCircle,
  Clock,
  Award,
  TrendingUp,
  Eye,
  Edit,
  Bus
} from 'lucide-react';
import OwnerHeader from '../../components/Owner/OwnerHeader';
import OwnerFooter from '../../components/Owner/OwnerFooter';

function Drivers({ onMenuClick }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const drivers = [
    { 
      id: "DRV-001",
      name: "Michael Smith", 
      phone: "+1 234-567-8901",
      email: "michael.s@trackmate.com",
      rating: 4.9, 
      trips: 156, 
      status: "On Duty",
      attendance: 98,
      experience: "8 years",
      assignedBus: "BUS-001",
      route: "Route A",
      joinDate: "Jan 15, 2016",
      license: "CDL-A",
      performance: "Top Performer"
    },
    { 
      id: "DRV-002",
      name: "Sarah Johnson", 
      phone: "+1 234-567-8902",
      email: "sarah.j@trackmate.com",
      rating: 4.8, 
      trips: 142, 
      status: "On Duty",
      attendance: 96,
      experience: "6 years",
      assignedBus: "BUS-002",
      route: "Route B",
      joinDate: "Mar 22, 2018",
      license: "CDL-B",
      performance: "Excellent"
    },
    { 
      id: "DRV-003",
      name: "Robert Brown", 
      phone: "+1 234-567-8903",
      email: "robert.b@trackmate.com",
      rating: 4.7, 
      trips: 138, 
      status: "On Route",
      attendance: 94,
      experience: "5 years",
      assignedBus: "BUS-003",
      route: "Route C",
      joinDate: "Jul 10, 2019",
      license: "CDL-A",
      performance: "Good"
    },
    { 
      id: "DRV-004",
      name: "Lisa Davis", 
      phone: "+1 234-567-8904",
      email: "lisa.d@trackmate.com",
      rating: 4.6, 
      trips: 125, 
      status: "Off Duty",
      attendance: 92,
      experience: "4 years",
      assignedBus: "BUS-005",
      route: "Route E",
      joinDate: "Nov 5, 2020",
      license: "CDL-B",
      performance: "Good"
    },
    { 
      id: "DRV-005",
      name: "James Wilson", 
      phone: "+1 234-567-8905",
      email: "james.w@trackmate.com",
      rating: 4.5, 
      trips: 118, 
      status: "On Leave",
      attendance: 90,
      experience: "3 years",
      assignedBus: "Unassigned",
      route: "N/A",
      joinDate: "Feb 28, 2021",
      license: "CDL-A",
      performance: "Average"
    },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'On Duty': return 'bg-green-100 text-green-700 border-green-200';
      case 'On Route': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Off Duty': return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'On Leave': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPerformanceColor = (performance) => {
    switch(performance) {
      case 'Top Performer': return 'bg-purple-100 text-purple-700';
      case 'Excellent': return 'bg-green-100 text-green-700';
      case 'Good': return 'bg-blue-100 text-blue-700';
      default: return 'bg-yellow-100 text-yellow-700';
    }
  };

  const filteredDrivers = drivers.filter(driver => {
    const matchesSearch = driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         driver.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         driver.route.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || driver.status.toLowerCase().replace(' ', '-') === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: drivers.length,
    onDuty: drivers.filter(d => d.status === 'On Duty' || d.status === 'On Route').length,
    avgRating: (drivers.reduce((acc, d) => acc + d.rating, 0) / drivers.length).toFixed(1),
    avgAttendance: Math.round(drivers.reduce((acc, d) => acc + d.attendance, 0) / drivers.length)
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#FFF9E6] via-[#FFFDF5] to-[#FFF9E6]">
      <OwnerHeader notifications={[]} ownerName="David" companyName="TrackMate Fleet" onMenuClick={onMenuClick} />
      
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Drivers Management</h1>
              <p className="text-gray-600 mt-1">Manage your drivers and track their performance</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-[#1E3A5F] text-white rounded-xl hover:bg-[#3B6FB6] transition-colors">
              <Plus className="w-5 h-5" />
              Add New Driver
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
                  <div className="text-sm text-gray-600">Total Drivers</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-green-100">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stats.onDuty}</div>
                  <div className="text-sm text-gray-600">On Duty</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-yellow-100">
                  <Star className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stats.avgRating}</div>
                  <div className="text-sm text-gray-600">Avg Rating</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-100">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stats.avgAttendance}%</div>
                  <div className="text-sm text-gray-600">Avg Attendance</div>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, ID, or route..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B6FB6] focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="on-duty">On Duty</option>
                  <option value="on-route">On Route</option>
                  <option value="off-duty">Off Duty</option>
                  <option value="on-leave">On Leave</option>
                </select>
              </div>
            </div>
          </div>

          {/* Drivers Grid */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredDrivers.map((driver) => (
              <div key={driver.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                {/* Header */}
                <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-[#1E3A5F] to-[#3B6FB6]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-[#F5C518] flex items-center justify-center">
                        <User className="w-6 h-6 text-[#1E3A5F]" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white">{driver.name}</h3>
                        <p className="text-xs text-[#FFE066]">{driver.id}</p>
                      </div>
                    </div>
                    <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(driver.status)}`}>
                      {driver.status}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-4 space-y-4">
                  {/* Performance Badge */}
                  <div className="flex items-center justify-between">
                    <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${getPerformanceColor(driver.performance)}`}>
                      <Award className="w-3 h-3" />
                      {driver.performance}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-bold text-gray-900">{driver.rating}</span>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700">{driver.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700 text-xs">{driver.email}</span>
                    </div>
                  </div>

                  {/* Assignment Info */}
                  <div className="p-3 rounded-lg bg-gray-50 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 flex items-center gap-1">
                        <Bus className="w-3 h-3" /> Bus
                      </span>
                      <span className="font-semibold text-gray-900">{driver.assignedBus}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> Route
                      </span>
                      <span className="font-semibold text-gray-900">{driver.route}</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2 rounded-lg bg-green-50">
                      <div className="text-lg font-bold text-green-600">{driver.trips}</div>
                      <div className="text-xs text-gray-500">Trips</div>
                    </div>
                    <div className="p-2 rounded-lg bg-blue-50">
                      <div className="text-lg font-bold text-blue-600">{driver.attendance}%</div>
                      <div className="text-xs text-gray-500">Attendance</div>
                    </div>
                    <div className="p-2 rounded-lg bg-purple-50">
                      <div className="text-lg font-bold text-purple-600">{driver.experience.split(' ')[0]}</div>
                      <div className="text-xs text-gray-500">Years</div>
                    </div>
                  </div>

                  {/* Join Date */}
                  <div className="flex items-center justify-between text-sm pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-1 text-gray-500">
                      <Calendar className="w-3 h-3" />
                      <span className="text-xs">Joined: {driver.joinDate}</span>
                    </div>
                    <span className="text-xs font-medium text-gray-600">{driver.license}</span>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-2">
                  <button className="p-2 rounded-lg hover:bg-gray-200 transition-colors" title="View Profile">
                    <Eye className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-gray-200 transition-colors" title="Edit">
                    <Edit className="w-4 h-4 text-gray-600" />
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
    </div>
  );
}

export default Drivers;