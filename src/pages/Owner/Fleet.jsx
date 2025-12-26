import React, { useState } from 'react';
import { 
  Bus, 
  MapPin, 
  Calendar, 
  Fuel, 
  Wrench, 
  User, 
  Search,
  Filter,
  Plus,
  MoreVertical,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Eye,
  Edit,
  Gauge
} from 'lucide-react';
import OwnerHeader from '../../components/Owner/OwnerHeader';
import OwnerFooter from '../../components/Owner/OwnerFooter';

function Fleet({ onMenuClick }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const busFleet = [
    { 
      id: "BUS-001", 
      plate: "ABC 1234",
      route: "Route A - Morning", 
      utilization: 92, 
      status: "Active",
      driver: "Michael Smith",
      capacity: 45,
      currentStudents: 42,
      fuelLevel: 75,
      lastService: "Nov 28, 2023",
      nextService: "Dec 28, 2023",
      mileage: "45,280 km",
      condition: "Excellent"
    },
    { 
      id: "BUS-002", 
      plate: "DEF 5678",
      route: "Route B - Morning", 
      utilization: 85, 
      status: "Active",
      driver: "Sarah Johnson",
      capacity: 45,
      currentStudents: 38,
      fuelLevel: 60,
      lastService: "Nov 25, 2023",
      nextService: "Dec 25, 2023",
      mileage: "38,750 km",
      condition: "Good"
    },
    { 
      id: "BUS-003", 
      plate: "GHI 9012",
      route: "Route C - Morning", 
      utilization: 78, 
      status: "Delayed",
      driver: "Robert Brown",
      capacity: 40,
      currentStudents: 31,
      fuelLevel: 45,
      lastService: "Nov 20, 2023",
      nextService: "Dec 20, 2023",
      mileage: "52,300 km",
      condition: "Fair"
    },
    { 
      id: "BUS-004", 
      plate: "JKL 3456",
      route: "Route D - Morning", 
      utilization: 65, 
      status: "Maintenance",
      driver: "Unassigned",
      capacity: 45,
      currentStudents: 0,
      fuelLevel: 30,
      lastService: "Dec 1, 2023",
      nextService: "Jan 1, 2024",
      mileage: "61,200 km",
      condition: "Needs Repair"
    },
    { 
      id: "BUS-005", 
      plate: "MNO 7890",
      route: "Route E - Morning", 
      utilization: 95, 
      status: "Active",
      driver: "James Wilson",
      capacity: 50,
      currentStudents: 48,
      fuelLevel: 90,
      lastService: "Nov 30, 2023",
      nextService: "Dec 30, 2023",
      mileage: "41,500 km",
      condition: "Excellent"
    },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Active': return 'bg-green-100 text-green-700 border-green-200';
      case 'Delayed': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Maintenance': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Active': return <CheckCircle className="w-4 h-4" />;
      case 'Delayed': return <AlertTriangle className="w-4 h-4" />;
      case 'Maintenance': return <XCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  const getConditionColor = (condition) => {
    switch(condition) {
      case 'Excellent': return 'text-green-600';
      case 'Good': return 'text-blue-600';
      case 'Fair': return 'text-yellow-600';
      default: return 'text-red-600';
    }
  };

  const filteredBuses = busFleet.filter(bus => {
    const matchesSearch = bus.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bus.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bus.route.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || bus.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: busFleet.length,
    active: busFleet.filter(b => b.status === 'Active').length,
    maintenance: busFleet.filter(b => b.status === 'Maintenance').length,
    avgUtilization: Math.round(busFleet.reduce((acc, b) => acc + b.utilization, 0) / busFleet.length)
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#FFF9E6] via-[#FFFDF5] to-[#FFF9E6]">
      <OwnerHeader notifications={[]} ownerName="David" companyName="TrackMate Fleet" onMenuClick={onMenuClick} />
      
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Fleet Management</h1>
              <p className="text-gray-600 mt-1">Monitor and manage your bus fleet</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-[#1E3A5F] text-white rounded-xl hover:bg-[#3B6FB6] transition-colors">
              <Plus className="w-5 h-5" />
              Add New Bus
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-100">
                  <Bus className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                  <div className="text-sm text-gray-600">Total Buses</div>
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
                <div className="p-2.5 rounded-xl bg-red-100">
                  <Wrench className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stats.maintenance}</div>
                  <div className="text-sm text-gray-600">Maintenance</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-100">
                  <Gauge className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stats.avgUtilization}%</div>
                  <div className="text-sm text-gray-600">Avg Utilization</div>
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
                  placeholder="Search by bus ID, driver, or route..."
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
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>
            </div>
          </div>

          {/* Bus Cards Grid */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredBuses.map((bus) => (
              <div key={bus.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                {/* Header */}
                <div className="p-4 border-b border-gray-100 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[#1E3A5F] flex items-center justify-center">
                        <Bus className="w-6 h-6 text-[#F5C518]" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{bus.id}</h3>
                        <p className="text-xs text-gray-500">{bus.plate}</p>
                      </div>
                    </div>
                    <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(bus.status)}`}>
                      {getStatusIcon(bus.status)}
                      {bus.status}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-4 space-y-4">
                  {/* Route & Driver */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700">{bus.route}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700">{bus.driver}</span>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-gray-50">
                      <div className="text-xs text-gray-500 mb-1">Utilization</div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${bus.utilization >= 80 ? 'bg-green-500' : bus.utilization >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                            style={{ width: `${bus.utilization}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-bold">{bus.utilization}%</span>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-gray-50">
                      <div className="text-xs text-gray-500 mb-1">Fuel Level</div>
                      <div className="flex items-center gap-2">
                        <Fuel className={`w-4 h-4 ${bus.fuelLevel >= 50 ? 'text-green-500' : bus.fuelLevel >= 25 ? 'text-yellow-500' : 'text-red-500'}`} />
                        <span className="text-sm font-bold">{bus.fuelLevel}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Capacity */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Students</span>
                    <span className="font-semibold">{bus.currentStudents}/{bus.capacity}</span>
                  </div>

                  {/* Condition & Service */}
                  <div className="flex items-center justify-between text-sm pt-3 border-t border-gray-100">
                    <div>
                      <span className="text-gray-500">Condition: </span>
                      <span className={`font-semibold ${getConditionColor(bus.condition)}`}>{bus.condition}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <Calendar className="w-3 h-3" />
                      <span className="text-xs">{bus.nextService}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-2">
                  <button className="p-2 rounded-lg hover:bg-gray-200 transition-colors" title="View Details">
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

export default Fleet;