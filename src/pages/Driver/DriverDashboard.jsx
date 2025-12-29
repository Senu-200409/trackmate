import React, { useState } from 'react';
import {
  AlertCircle,
  Clock,
  Bus,
  Navigation,
  MapPin,
  Zap,
  Battery,
  Thermometer,
  CheckCircle,
  AlertTriangle,
  Users,
  ChevronRight
} from 'lucide-react';
import DriverHeader from '../../components/Driver/DriverHeader';
import DriverFooter from '../../components/Driver/DriverFooter';

function DriverDashboard({ onMenuClick, setActiveTab }) {
  const [notifications] = useState([]);
  const [routeInfo] = useState({
    currentRoute: "Route A - Morning Shift",
    studentsAboard: 24,
    totalStudents: 28,
    timeToDestination: 18,
    nextStop: "Oak Avenue",
    eta: "8:15 AM",
    distanceTraveled: "12.5 km",
    fuelLevel: 85,
    speed: "35 km/h",
    temperature: "18°C",
    busStatus: "Normal",
    currentLocation: "Maple Street"
  });

  const alerts = [
    { id: 1, type: 'warning', title: 'Traffic Alert', message: 'Heavy traffic on Main Street ahead', time: '2 mins ago' },
    { id: 2, type: 'info', title: 'Pending Student', message: 'Emma Wilson at Oak Avenue stop not yet boarded', time: '1 min ago' }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#FFF9E6] via-[#FFFDF5] to-[#FFF9E6]">
      <DriverHeader notifications={notifications} driverName="Michael" onMenuClick={onMenuClick} setActiveTab={setActiveTab} />
      
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6 max-w-7xl mx-auto">
          
          {/* Welcome Header with Key Route Info */}
          <div className="bg-gradient-to-r from-[#1E3A5F] via-[#3B6FB6] to-[#1E3A5F] text-white rounded-2xl p-6 border-b-4 border-[#F5C518]">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Good Morning, Michael! 🚌</h1>
                <p className="text-[#FFE066]">{routeInfo.currentRoute} • On Duty</p>
              </div>
              <div className="hidden md:block text-right">
                <div className="text-2xl font-bold">{routeInfo.nextStop}</div>
                <div className="text-sm text-[#FFE066]">Next Stop - {routeInfo.eta}</div>
              </div>
            </div>
          </div>

          {/* Quick Status Cards Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Live Route Card */}
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-blue-100">
                  <Navigation className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">On Route</div>
                  <div className="text-xl font-bold text-gray-900">{routeInfo.timeToDestination} min</div>
                  <div className="text-xs text-gray-500">to destination</div>
                </div>
              </div>
            </div>

            {/* Students Aboard Card */}
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-green-100">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Students</div>
                  <div className="text-xl font-bold text-gray-900">{routeInfo.studentsAboard}/{routeInfo.totalStudents}</div>
                  <div className="text-xs text-gray-500">Onboard</div>
                </div>
              </div>
            </div>

            {/* Fuel Level Card */}
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-orange-100">
                  <Battery className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Fuel</div>
                  <div className="text-xl font-bold text-gray-900">{routeInfo.fuelLevel}%</div>
                  <div className="text-xs text-gray-500">Fuel Level</div>
                </div>
              </div>
            </div>

            {/* Vehicle Status Card */}
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-green-100">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Status</div>
                  <div className="text-xl font-bold text-green-600">Normal</div>
                  <div className="text-xs text-gray-500">All systems OK</div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column - Live Tracking & Alerts */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Live Map Area */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="h-64 bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center relative">
                  <div className="text-center z-10">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center shadow-lg animate-pulse mx-auto mb-3">
                      <Bus className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-gray-700 font-semibold">{routeInfo.currentLocation}</p>
                    <p className="text-sm text-gray-600">Current Location</p>
                  </div>
                </div>
                <div className="p-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Current Speed</p>
                      <p className="text-2xl font-bold text-gray-900">{routeInfo.speed}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Temperature</p>
                      <p className="text-2xl font-bold text-gray-900">{routeInfo.temperature}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Alerts Section */}
              {alerts.length > 0 && (
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                    Active Alerts
                  </h3>
                  <div className="space-y-3">
                    {alerts.map(alert => (
                      <div key={alert.id} className={`p-4 rounded-xl border-l-4 ${
                        alert.type === 'warning' 
                          ? 'bg-orange-50 border-orange-300' 
                          : 'bg-blue-50 border-blue-300'
                      }`}>
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-900">{alert.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                          </div>
                          <div className="text-xs text-gray-500 whitespace-nowrap ml-2">{alert.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Quick Actions & Summary */}
            <div className="space-y-6">
              
              {/* Quick Actions */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <button 
                    onClick={() => setActiveTab && setActiveTab('navigation')}
                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
                  >
                    <div className="flex items-center gap-3">
                      <Navigation className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-gray-900">View Route Details</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                  <button 
                    onClick={() => setActiveTab && setActiveTab('reports')}
                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
                  >
                    <div className="flex items-center gap-3">
                      <Zap className="w-5 h-5 text-purple-600" />
                      <span className="font-medium text-gray-900">Performance Report</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                  <button 
                    onClick={() => setActiveTab && setActiveTab('support')}
                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
                  >
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-orange-600" />
                      <span className="font-medium text-gray-900">Get Support</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Route Summary Card */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Route Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span className="text-gray-600">Route Name</span>
                    <span className="font-semibold text-gray-900">Route A</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span className="text-gray-600">Shift</span>
                    <span className="font-semibold text-gray-900">Morning</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span className="text-gray-600">Total Distance</span>
                    <span className="font-semibold text-gray-900">{routeInfo.distanceTraveled}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Next Stop</span>
                    <span className="font-semibold text-gray-900">{routeInfo.nextStop}</span>
                  </div>
                </div>
              </div>

              {/* Vehicle Health Card */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Vehicle Health</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">Fuel Level</span>
                      <span className="text-sm font-semibold text-gray-900">{routeInfo.fuelLevel}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500" style={{ width: `${routeInfo.fuelLevel}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">Engine Temperature</span>
                      <span className="text-sm font-semibold text-gray-900">Normal</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      <DriverFooter />
    </div>
  );
}

export default DriverDashboard;