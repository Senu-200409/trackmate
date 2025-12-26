import React, { useState } from 'react';
import {
  User,
  Users,
  Clock,
  Bus,
  Navigation,
  MapPin,
  FileText,
  HelpCircle,
  Zap,
  Battery,
  ShieldCheck,
  Thermometer
} from 'lucide-react';
import DriverHeader from '../../components/Driver/DriverHeader';
import DriverFooter from '../../components/Driver/DriverFooter';

function DriverDashboard() {
  const [notifications] = useState([]);
  const [routeInfo, setRouteInfo] = useState({
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
    busStatus: "Normal"
  });

  const students = [
    { id: 1, name: "Emma Wilson", grade: "5th", status: "boarded", stop: "Maple St" },
    { id: 2, name: "Noah Johnson", grade: "6th", status: "boarded", stop: "Pine Ave" },
    { id: 3, name: "Olivia Smith", grade: "4th", status: "pending", stop: "Oak Ave" },
    { id: 4, name: "Liam Brown", grade: "7th", status: "boarded", stop: "Elm St" },
    { id: 5, name: "Ava Davis", grade: "5th", status: "absent", stop: "Cedar Rd" },
  ];

  const routeStats = [
    { label: "On Time Rate", value: "96%", color: "green", icon: <Clock className="w-5 h-5" /> },
    { label: "Avg Speed", value: "32 km/h", color: "blue", icon: <Zap className="w-5 h-5" /> },
    { label: "Fuel Efficiency", value: "8.2 km/L", color: "purple", icon: <Battery className="w-5 h-5" /> },
    { label: "Safety Score", value: "9.5/10", color: "orange", icon: <ShieldCheck className="w-5 h-5" /> },
  ];

  const upcomingStops = [
    { name: "Oak Avenue", eta: "8:15 AM", distance: "2.5 km" },
    { name: "Maple Street", eta: "8:22 AM", distance: "3.8 km" },
    { name: "Central School", eta: "8:30 AM", distance: "5.2 km" },
    { name: "Pine Road", eta: "8:40 AM", distance: "7.1 km" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#FFF9E6] via-[#FFFDF5] to-[#FFF9E6]">
      <DriverHeader notifications={notifications} driverName="Michael" />
      
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6 max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-[#1E3A5F] via-[#3B6FB6] to-[#1E3A5F] text-white rounded-2xl p-8 border-b-4 border-[#F5C518]">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Good Morning, Michael! 🚌</h1>
                <p className="text-[#FFE066]">Route A • Morning Shift • On Duty</p>
              </div>
              <div className="hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-2xl font-bold">{routeInfo.nextStop}</div>
                    <div className="text-sm text-[#FFE066]">Next Stop</div>
                  </div>
              <div className="w-16 h-16 rounded-full bg-[#F5C518] flex items-center justify-center">
                <Navigation className="w-8 h-8 text-[#1E3A5F]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {routeStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${
                stat.color === 'green' ? 'bg-green-100 text-green-600' :
                stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                stat.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                'bg-orange-100 text-orange-600'
              }`}>
                {stat.icon}
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Current Route</h2>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">Active</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">GPS Connected</span>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                  <div className="text-2xl font-bold text-gray-900">{routeInfo.studentsAboard}/{routeInfo.totalStudents}</div>
                  <div className="text-sm text-gray-600">Students Aboard</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600">{routeInfo.timeToDestination} min</div>
                  <div className="text-sm text-gray-600">Time to Destination</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                  <div className="text-2xl font-bold text-purple-600">{routeInfo.distanceTraveled}</div>
                  <div className="text-sm text-gray-600">Distance Traveled</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl">
                  <div className="text-2xl font-bold text-orange-600">{routeInfo.fuelLevel}%</div>
                  <div className="text-sm text-gray-600">Fuel Level</div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-4">Live Navigation</h4>
                <div className="h-64 rounded-2xl overflow-hidden relative bg-gradient-to-br from-green-100 to-blue-100">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Navigation className="w-12 h-12 text-green-600 mx-auto mb-3" />
                      <p className="text-gray-700 font-medium">Real-time navigation active</p>
                      <p className="text-sm text-gray-500">Next: {routeInfo.nextStop} • ETA: {routeInfo.eta}</p>
                    </div>
                  </div>
                  
                  <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400"></div>
                  <div className="absolute top-1/2 left-1/3 transform -translate-y-1/2">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center shadow-lg animate-pulse">
                      <Bus className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-xs font-semibold bg-white px-2 py-1 rounded-lg shadow">
                      Your Location
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-4">Upcoming Stops</h4>
                <div className="space-y-3">
                  {upcomingStops.map((stop, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 hover:bg-gray-200 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{stop.name}</div>
                          <div className="text-sm text-gray-600">{stop.distance} away</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-900">{stop.eta}</div>
                        <div className="text-sm text-gray-600">ETA</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Students Onboard</h2>
              <Users className="w-6 h-6 text-gray-600" />
            </div>

            <div className="space-y-3">
              {students.map((student) => (
                <div key={student.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{student.name}</div>
                      <div className="text-sm text-gray-600">{student.grade} • {student.stop}</div>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    student.status === 'boarded' ? 'bg-green-100 text-green-800' :
                    student.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total Boarded:</span>
                <span className="font-bold text-gray-900">{students.filter(s => s.status === 'boarded').length}/{students.length}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-6">Vehicle Status</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Fuel Level</span>
                  <span className="font-medium text-gray-900">{routeInfo.fuelLevel}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                    style={{ width: `${routeInfo.fuelLevel}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Engine Temperature</span>
                  <span className="font-medium text-gray-900">{routeInfo.temperature}</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                    style={{ width: '65%' }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Current Speed</span>
                  <span className="font-medium text-gray-900">{routeInfo.speed}</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                    style={{ width: '70%' }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="font-medium text-green-600">All systems normal</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-6">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 hover:shadow-md transition-shadow">
                <Navigation className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-900">Navigation</span>
              </button>
              <button className="p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 hover:shadow-md transition-shadow">
                <Users className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-900">Students</span>
              </button>
              <button className="p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 hover:shadow-md transition-shadow">
                <FileText className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-900">Reports</span>
              </button>
              <button className="p-4 rounded-xl bg-gradient-to-r from-orange-50 to-red-50 hover:shadow-md transition-shadow">
                <HelpCircle className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-900">Support</span>
              </button>
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