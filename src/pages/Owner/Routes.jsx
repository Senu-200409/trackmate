import React, { useState } from 'react';
import { 
  Route as RouteIcon,
  MapPin,
  Clock,
  Users,
  Bus,
  Search,
  Filter,
  Plus,
  MoreVertical,
  CheckCircle,
  AlertTriangle,
  Play,
  Pause,
  Eye,
  Edit,
  Navigation,
  ArrowRight
} from 'lucide-react';
import OwnerHeader from '../../components/Owner/OwnerHeader';
import OwnerFooter from '../../components/Owner/OwnerFooter';

function Routes({ onMenuClick }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const routes = [
    { 
      id: "RT-001",
      name: "Route A - Morning",
      type: "Morning Pickup",
      status: "Active",
      bus: "BUS-001",
      driver: "Michael Smith",
      startPoint: "Central Station",
      endPoint: "Greenwood High School",
      stops: 12,
      students: 42,
      distance: "15.5 km",
      duration: "45 mins",
      startTime: "7:00 AM",
      endTime: "7:45 AM",
      onTimeRate: 96
    },
    { 
      id: "RT-002",
      name: "Route B - Morning",
      type: "Morning Pickup",
      status: "Active",
      bus: "BUS-002",
      driver: "Sarah Johnson",
      startPoint: "Oak Valley",
      endPoint: "Lincoln Academy",
      stops: 10,
      students: 38,
      distance: "12.8 km",
      duration: "38 mins",
      startTime: "7:15 AM",
      endTime: "7:53 AM",
      onTimeRate: 94
    },
    { 
      id: "RT-003",
      name: "Route C - Morning",
      type: "Morning Pickup",
      status: "Delayed",
      bus: "BUS-003",
      driver: "Robert Brown",
      startPoint: "Maple District",
      endPoint: "St. Mary's School",
      stops: 8,
      students: 31,
      distance: "10.2 km",
      duration: "35 mins",
      startTime: "7:30 AM",
      endTime: "8:05 AM",
      onTimeRate: 85
    },
    { 
      id: "RT-004",
      name: "Route A - Afternoon",
      type: "Afternoon Drop",
      status: "Scheduled",
      bus: "BUS-001",
      driver: "Michael Smith",
      startPoint: "Greenwood High School",
      endPoint: "Central Station",
      stops: 12,
      students: 42,
      distance: "15.5 km",
      duration: "50 mins",
      startTime: "3:00 PM",
      endTime: "3:50 PM",
      onTimeRate: 92
    },
    { 
      id: "RT-005",
      name: "Route D - Morning",
      type: "Morning Pickup",
      status: "Inactive",
      bus: "BUS-004",
      driver: "Unassigned",
      startPoint: "Pine Heights",
      endPoint: "Central High",
      stops: 6,
      students: 0,
      distance: "8.5 km",
      duration: "30 mins",
      startTime: "7:45 AM",
      endTime: "8:15 AM",
      onTimeRate: 0
    },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Active': return 'bg-green-100 text-green-700 border-green-200';
      case 'Delayed': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Scheduled': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Inactive': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Active': return <Play className="w-3 h-3" />;
      case 'Delayed': return <AlertTriangle className="w-3 h-3" />;
      case 'Scheduled': return <Clock className="w-3 h-3" />;
      case 'Inactive': return <Pause className="w-3 h-3" />;
      default: return null;
    }
  };

  const filteredRoutes = routes.filter(route => {
    const matchesSearch = route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         route.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         route.driver.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || route.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: routes.length,
    active: routes.filter(r => r.status === 'Active').length,
    totalStudents: routes.reduce((acc, r) => acc + r.students, 0),
    avgOnTime: Math.round(routes.filter(r => r.onTimeRate > 0).reduce((acc, r) => acc + r.onTimeRate, 0) / routes.filter(r => r.onTimeRate > 0).length)
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#FFF9E6] via-[#FFFDF5] to-[#FFF9E6]">
      <OwnerHeader notifications={[]} ownerName="David" companyName="TrackMate Fleet" onMenuClick={onMenuClick} />
      
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Routes Management</h1>
              <p className="text-gray-600 mt-1">Plan and optimize your bus routes</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-[#1E3A5F] text-white rounded-xl hover:bg-[#3B6FB6] transition-colors">
              <Plus className="w-5 h-5" />
              Create New Route
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-100">
                  <RouteIcon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                  <div className="text-sm text-gray-600">Total Routes</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-green-100">
                  <Play className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stats.active}</div>
                  <div className="text-sm text-gray-600">Active Now</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-100">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stats.totalStudents}</div>
                  <div className="text-sm text-gray-600">Students Served</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-orange-100">
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stats.avgOnTime}%</div>
                  <div className="text-sm text-gray-600">On-Time Rate</div>
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
                  placeholder="Search by route name, ID, or driver..."
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
                  <option value="active">Active</option>
                  <option value="delayed">Delayed</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          {/* Routes List */}
          <div className="space-y-4">
            {filteredRoutes.map((route) => (
              <div key={route.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-5">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    
                    {/* Route Info */}
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#1E3A5F] to-[#3B6FB6] flex items-center justify-center flex-shrink-0">
                        <Navigation className="w-7 h-7 text-[#F5C518]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-bold text-gray-900 text-lg">{route.name}</h3>
                          <span className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(route.status)}`}>
                            {getStatusIcon(route.status)}
                            {route.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mb-2">{route.id} • {route.type}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4 text-green-500" />
                          <span>{route.startPoint}</span>
                          <ArrowRight className="w-4 h-4 text-gray-400" />
                          <MapPin className="w-4 h-4 text-red-500" />
                          <span>{route.endPoint}</span>
                        </div>
                      </div>
                    </div>

                    {/* Route Stats */}
                    <div className="flex flex-wrap items-center gap-4 lg:gap-6">
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">{route.stops}</div>
                        <div className="text-xs text-gray-500">Stops</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">{route.students}</div>
                        <div className="text-xs text-gray-500">Students</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">{route.distance}</div>
                        <div className="text-xs text-gray-500">Distance</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">{route.duration}</div>
                        <div className="text-xs text-gray-500">Duration</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-lg font-bold ${route.onTimeRate >= 90 ? 'text-green-600' : route.onTimeRate >= 80 ? 'text-yellow-600' : 'text-red-600'}`}>
                          {route.onTimeRate}%
                        </div>
                        <div className="text-xs text-gray-500">On-Time</div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors" title="View Route">
                        <Eye className="w-5 h-5 text-gray-600" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors" title="Edit">
                        <Edit className="w-5 h-5 text-gray-600" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors" title="More">
                        <MoreVertical className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                  </div>

                  {/* Assignment Info */}
                  <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <Bus className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Bus:</span>
                      <span className="font-medium text-gray-900">{route.bus}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Driver:</span>
                      <span className="font-medium text-gray-900">{route.driver}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Schedule:</span>
                      <span className="font-medium text-gray-900">{route.startTime} - {route.endTime}</span>
                    </div>
                  </div>
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

export default Routes;