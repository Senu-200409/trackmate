import React, { useState } from 'react';
import {
  Bus,
  Users,
  DollarSign,
  BarChart3,
  User,
  Star,
  TrendingUp as TrendingUpIcon,
  Activity,
  Shield,
  Wallet,
  Package,
  Thermometer,
  MapPin,
  Clock,
  Gauge
} from 'lucide-react';

function OwnerDashboard() {
  const [businessStats] = useState({
    totalRevenue: "$45,820",
    monthlyGrowth: "+12.5%",
    activeBuses: 24,
    totalDrivers: 32,
    totalStudents: 1248,
    activeRoutes: 8,
    fleetUtilization: "78%",
    avgRating: "4.8/5",
    maintenanceCost: "$2,150",
    fuelCost: "$3,850",
    onTimeRate: "92%",
    safetyScore: "9.2/10"
  });

  const financialData = [
    { month: "Jan", revenue: 38000, expenses: 28000 },
    { month: "Feb", revenue: 42000, expenses: 29000 },
    { month: "Mar", revenue: 45000, expenses: 31000 },
    { month: "Apr", revenue: 48000, expenses: 32000 },
    { month: "May", revenue: 52000, expenses: 35000 },
    { month: "Jun", revenue: 45820, expenses: 32800 },
  ];

  const busPerformance = [
    { id: "BUS-001", route: "Route A", utilization: "92%", status: "Excellent", color: "bg-green-500", driver: "Michael Smith", lastService: "Nov 28, 2023", mileage: "45,280 km" },
    { id: "BUS-002", route: "Route B", utilization: "85%", status: "Good", color: "bg-blue-500", driver: "Sarah Johnson", lastService: "Nov 25, 2023", mileage: "38,750 km" },
    { id: "BUS-003", route: "Route C", utilization: "78%", status: "Average", color: "bg-yellow-500", driver: "Robert Brown", lastService: "Nov 20, 2023", mileage: "52,300 km" },
    { id: "BUS-004", route: "Route D", utilization: "65%", status: "Poor", color: "bg-orange-500", driver: "Lisa Davis", lastService: "Nov 18, 2023", mileage: "61,200 km" },
    { id: "BUS-005", route: "Route E", utilization: "95%", status: "Excellent", color: "bg-green-500", driver: "James Wilson", lastService: "Nov 30, 2023", mileage: "41,500 km" },
  ];

  const driverPerformance = [
    { name: "Michael Smith", rating: "4.9", trips: 156, status: "Top Performer", attendance: "98%", experience: "8 years" },
    { name: "Sarah Johnson", rating: "4.8", trips: 142, status: "Excellent", attendance: "96%", experience: "6 years" },
    { name: "Robert Brown", rating: "4.7", trips: 138, status: "Good", attendance: "94%", experience: "5 years" },
    { name: "Lisa Davis", rating: "4.6", trips: 125, status: "Good", attendance: "92%", experience: "4 years" },
    { name: "James Wilson", rating: "4.5", trips: 118, status: "Average", attendance: "90%", experience: "3 years" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white rounded-2xl p-4 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Business Overview, David! 📊</h1>
            <p className="text-white/90 text-sm md:text-base">Trackmate Fleet Management • Monthly Performance</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-xl md:text-2xl font-bold">{businessStats.totalRevenue}</div>
              <div className="text-xs md:text-sm text-white/80">Monthly Revenue</div>
            </div>
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/20 flex items-center justify-center">
              <DollarSign className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        {/* Active Buses */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 md:p-6 hover:shadow-md transition-shadow col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <div className="p-2 md:p-3 rounded-xl bg-gradient-to-br from-green-400 to-emerald-400">
              <Bus className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </div>
            <span className="text-green-600 font-bold text-xs md:text-sm">Active</span>
          </div>
          <div className="text-xl md:text-2xl font-bold text-gray-900 mb-1">{businessStats.activeBuses}</div>
          <div className="text-xs md:text-sm text-gray-600">Active Buses</div>
          <div className="mt-1 md:mt-2 text-xs text-gray-500">{businessStats.activeRoutes} routes</div>
        </div>

        {/* Total Drivers */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 md:p-6 hover:shadow-md transition-shadow col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <div className="p-2 md:p-3 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-400">
              <Users className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </div>
            <span className="text-blue-600 font-bold text-xs md:text-sm">On Duty</span>
          </div>
          <div className="text-xl md:text-2xl font-bold text-gray-900 mb-1">{businessStats.totalDrivers}</div>
          <div className="text-xs md:text-sm text-gray-600">Total Drivers</div>
          <div className="mt-1 md:mt-2 text-xs text-gray-500">{businessStats.avgRating} rating</div>
        </div>

        {/* Total Students */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 md:p-6 hover:shadow-md transition-shadow col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <div className="p-2 md:p-3 rounded-xl bg-gradient-to-br from-purple-400 to-pink-400">
              <User className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </div>
            <span className="text-purple-600 font-bold text-xs md:text-sm">Daily</span>
          </div>
          <div className="text-xl md:text-2xl font-bold text-gray-900 mb-1">{businessStats.totalStudents}</div>
          <div className="text-xs md:text-sm text-gray-600">Total Students</div>
          <div className="mt-1 md:mt-2 text-xs text-gray-500">12 schools</div>
        </div>

        {/* Fleet Utilization */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 md:p-6 hover:shadow-md transition-shadow col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <div className="p-2 md:p-3 rounded-xl bg-gradient-to-br from-orange-400 to-red-400">
              <BarChart3 className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </div>
            <span className="text-green-600 font-bold text-xs md:text-sm">↑ 2.3%</span>
          </div>
          <div className="text-xl md:text-2xl font-bold text-gray-900 mb-1">{businessStats.fleetUtilization}</div>
          <div className="text-xs md:text-sm text-gray-600">Fleet Utilization</div>
          <div className="mt-1 md:mt-2 text-xs text-gray-500">Optimal: 80%+</div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Financial Overview */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-0">Financial Overview</h2>
              <div className="flex items-center gap-2">
                <button className="px-2 py-1 md:px-3 md:py-1 bg-blue-100 text-blue-700 text-xs md:text-sm font-medium rounded-lg">Monthly</button>
                <button className="px-2 py-1 md:px-3 md:py-1 bg-gray-100 text-gray-700 text-xs md:text-sm font-medium rounded-lg">Quarterly</button>
                <button className="px-2 py-1 md:px-3 md:py-1 bg-gray-100 text-gray-700 text-xs md:text-sm font-medium rounded-lg">Yearly</button>
              </div>
            </div>

            <div className="space-y-6">
              {/* Revenue Chart */}
              <div className="h-48 md:h-64">
                <div className="h-full flex items-end justify-between px-1">
                  {financialData.map((data, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div className="flex items-end gap-1 w-full justify-center">
                        <div 
                          className="w-3/5 bg-gradient-to-t from-green-400 to-green-300 rounded-t"
                          style={{ height: `${(data.revenue / 60000) * 100}%` }}
                          title={`Revenue: $${data.revenue.toLocaleString()}`}
                        ></div>
                        <div 
                          className="w-3/5 bg-gradient-to-t from-red-400 to-red-300 rounded-t"
                          style={{ height: `${(data.expenses / 60000) * 100}%` }}
                          title={`Expenses: $${data.expenses.toLocaleString()}`}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500 mt-2">{data.month}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-3 md:gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-400 rounded"></div>
                    <span className="text-xs md:text-sm text-gray-600">Revenue</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-400 rounded"></div>
                    <span className="text-xs md:text-sm text-gray-600">Expenses</span>
                  </div>
                </div>
              </div>

              {/* Cost Breakdown */}
              <div>
                <h4 className="font-bold text-gray-900 mb-3 md:mb-4">Cost Breakdown</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <div className="p-3 md:p-4 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50">
                    <div className="flex items-center gap-2 md:gap-3 mb-2">
                      <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <Package className="w-3 h-3 md:w-4 md:h-4 text-blue-600" />
                      </div>
                      <span className="font-bold text-gray-900 text-sm md:text-base">Maintenance</span>
                    </div>
                    <div className="text-blue-700 font-semibold text-xl md:text-2xl">{businessStats.maintenanceCost}</div>
                    <div className="text-xs md:text-sm text-gray-600">Monthly cost</div>
                  </div>

                  <div className="p-3 md:p-4 rounded-xl bg-gradient-to-r from-orange-50 to-red-50">
                    <div className="flex items-center gap-2 md:gap-3 mb-2">
                      <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-orange-100 flex items-center justify-center">
                        <Thermometer className="w-3 h-3 md:w-4 md:h-4 text-orange-600" />
                      </div>
                      <span className="font-bold text-gray-900 text-sm md:text-base">Fuel</span>
                    </div>
                    <div className="text-orange-700 font-semibold text-xl md:text-2xl">{businessStats.fuelCost}</div>
                    <div className="text-xs md:text-sm text-gray-600">Monthly cost</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:w-1/3">
          <div className="space-y-4 md:space-y-6">
            {/* Bus Performance Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 md:mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-0">Bus Performance</h2>
                <div className="flex items-center gap-2">
                  <Bus className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
                  <span className="text-xs md:text-sm font-medium text-green-600">{businessStats.activeBuses} Active</span>
                </div>
              </div>

              {/* Bus Performance Cards */}
              <div className="space-y-3">
                {busPerformance.map((bus) => (
                  <div key={bus.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center flex-shrink-0">
                        <Bus className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-gray-900 text-sm md:text-base truncate">{bus.id}</div>
                        <div className="text-xs md:text-sm text-gray-600 truncate">{bus.route}</div>
                        <div className="text-xs text-gray-400 truncate">
                          <MapPin className="inline w-2 h-2 md:w-3 md:h-3 mr-1" />
                          {bus.driver.split(' ')[0]}
                        </div>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 ml-2">
                      <div className="font-bold text-gray-900 text-base md:text-lg">{bus.utilization}</div>
                      <div className={`inline-flex items-center px-2 py-0.5 md:px-2.5 md:py-0.5 rounded-full text-xs font-medium ${
                        bus.status === 'Excellent' ? 'bg-green-100 text-green-800' :
                        bus.status === 'Good' ? 'bg-blue-100 text-blue-800' :
                        bus.status === 'Average' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        <div className={`w-2 h-2 rounded-full mr-1 ${bus.color}`}></div>
                        {bus.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary Stats */}
              <div className="mt-4 md:mt-6 pt-3 md:pt-4 border-t border-gray-200 grid grid-cols-2 gap-3 md:gap-4">
                <div>
                  <div className="text-xs md:text-sm text-gray-600">Avg Utilization</div>
                  <div className="text-base md:text-lg font-bold text-gray-900">83%</div>
                </div>
                <div>
                  <div className="text-xs md:text-sm text-gray-600">On Time Rate</div>
                  <div className="text-base md:text-lg font-bold text-green-600">{businessStats.onTimeRate}</div>
                </div>
              </div>
            </div>

            {/* Quick Insights */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
              <h3 className="font-bold text-gray-900 mb-4 md:mb-6 text-lg md:text-xl">Quick Insights</h3>
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <TrendingUpIcon className="w-3 h-3 md:w-4 md:h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700 text-sm md:text-base">Revenue Growth</span>
                  </div>
                  <span className="text-green-600 font-bold text-sm md:text-base">+12.5%</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Gauge className="w-3 h-3 md:w-4 md:h-4 text-blue-600" />
                    </div>
                    <span className="text-gray-700 text-sm md:text-base">Fleet Utilization</span>
                  </div>
                  <span className="text-blue-600 font-bold text-sm md:text-base">{businessStats.fleetUtilization}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-purple-100 flex items-center justify-center">
                      <Shield className="w-3 h-3 md:w-4 md:h-4 text-purple-600" />
                    </div>
                    <span className="text-gray-700 text-sm md:text-base">Safety Score</span>
                  </div>
                  <span className="text-purple-600 font-bold text-sm md:text-base">{businessStats.safetyScore}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-orange-100 flex items-center justify-center">
                      <Wallet className="w-3 h-3 md:w-4 md:h-4 text-orange-600" />
                    </div>
                    <span className="text-gray-700 text-sm md:text-base">Profit Margin</span>
                  </div>
                  <span className="text-orange-600 font-bold text-sm md:text-base">28.4%</span>
                </div>
              </div>
            </div>

            {/* Driver Performance */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
              <h3 className="font-bold text-gray-900 mb-4 md:mb-6 text-lg md:text-xl">Top Drivers</h3>
              <div className="space-y-2 md:space-y-3">
                {driverPerformance.slice(0, 3).map((driver, index) => (
                  <div key={index} className="flex items-center justify-between p-2 md:p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-2 md:gap-3 min-w-0">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-gray-900 text-sm md:text-base truncate">{driver.name}</div>
                        <div className="text-xs md:text-sm text-gray-600 truncate">{driver.trips} trips</div>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 ml-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-500 fill-current" />
                        <span className="font-bold text-gray-900 text-sm md:text-base">{driver.rating}</span>
                      </div>
                      <div className={`text-xs font-medium ${
                        driver.status === 'Top Performer' ? 'text-purple-600' :
                        driver.status === 'Excellent' ? 'text-green-600' :
                        driver.status === 'Good' ? 'text-blue-600' :
                        'text-yellow-600'
                      }`}>
                        {driver.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-3 md:pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="text-xs md:text-sm text-gray-600">Total Drivers</div>
                  <div className="font-bold text-gray-900 text-sm md:text-base">{businessStats.totalDrivers}</div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="text-xs md:text-sm text-gray-600">Avg Attendance</div>
                  <div className="font-bold text-green-600 text-sm md:text-base">94%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OwnerDashboard;