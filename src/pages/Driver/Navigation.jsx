import React, { useState } from 'react';
import {
  Navigation,
  MapPin,
  Clock,
  Users,
  ChevronRight,
  AlertCircle,
  CheckCircle,
  Zap,
  Navigation2
} from 'lucide-react';
import DriverHeader from '../../components/Driver/DriverHeader';
import DriverFooter from '../../components/Driver/DriverFooter';

function NavigationPage({ onMenuClick, setActiveTab }) {
  const [selectedStop, setSelectedStop] = useState(null);

  const currentRoute = {
    name: "Route A - Morning Shift",
    totalDistance: "24.8 km",
    estimatedTime: "1h 15m",
    currentSpeed: "35 km/h",
    currentLocation: "Maple Street"
  };

  const upcomingStops = [
    {
      id: 1,
      name: "Oak Avenue",
      eta: "8:15 AM",
      distance: "2.5 km",
      studentsToBoard: 4,
      studentsToDropOff: 0,
      address: "45 Oak Avenue, near Central Park",
      status: "pending"
    },
    {
      id: 2,
      name: "Maple Street",
      eta: "8:22 AM",
      distance: "3.8 km",
      studentsToBoard: 3,
      studentsToDropOff: 1,
      address: "156 Maple Street, next to Market",
      status: "upcoming"
    },
    {
      id: 3,
      name: "Central School",
      eta: "8:30 AM",
      distance: "5.2 km",
      studentsToBoard: 2,
      studentsToDropOff: 8,
      address: "789 School Road, Downtown",
      status: "upcoming"
    },
    {
      id: 4,
      name: "Pine Road",
      eta: "8:40 AM",
      distance: "7.1 km",
      studentsToBoard: 1,
      studentsToDropOff: 2,
      address: "321 Pine Road, East District",
      status: "upcoming"
    },
    {
      id: 5,
      name: "Cedar Lane",
      eta: "8:50 AM",
      distance: "8.9 km",
      studentsToBoard: 0,
      studentsToDropOff: 6,
      address: "654 Cedar Lane, Residential Area",
      status: "upcoming"
    }
  ];

  const studentsOnboard = [
    { id: 1, name: "Emma Wilson", grade: "5th", stop: "Maple St", status: "boarded" },
    { id: 2, name: "Noah Johnson", grade: "6th", stop: "Pine Ave", status: "boarded" },
    { id: 3, name: "Liam Brown", grade: "7th", stop: "Elm St", status: "boarded" },
    { id: 4, name: "Sophia Martinez", grade: "4th", stop: "Oak Ave", status: "boarded" },
    { id: 5, name: "Ava Davis", grade: "5th", stop: "Cedar Rd", status: "boarded" },
    { id: 6, name: "James Wilson", grade: "6th", stop: "Maple St", status: "boarded" },
    { id: 7, name: "Isabella Brown", grade: "5th", stop: "Oak Ave", status: "boarded" },
    { id: 8, name: "Lucas Anderson", grade: "7th", stop: "Pine Ave", status: "boarded" }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#FFF9E6] via-[#FFFDF5] to-[#FFF9E6]">
      <DriverHeader notifications={[]} driverName="Michael" onMenuClick={onMenuClick} />
      
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6 max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-[#1E3A5F] via-[#3B6FB6] to-[#1E3A5F] text-white rounded-2xl p-6 border-b-4 border-[#F5C518]">
            <h1 className="text-3xl font-bold mb-2">Route Navigation</h1>
            <p className="text-[#FFE066]">{currentRoute.name}</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
              <div>
                <div className="text-sm opacity-75">Total Distance</div>
                <div className="text-xl font-bold">{currentRoute.totalDistance}</div>
              </div>
              <div>
                <div className="text-sm opacity-75">Est. Time</div>
                <div className="text-xl font-bold">{currentRoute.estimatedTime}</div>
              </div>
              <div>
                <div className="text-sm opacity-75">Current Speed</div>
                <div className="text-xl font-bold">{currentRoute.currentSpeed}</div>
              </div>
              <div>
                <div className="text-sm opacity-75">Location</div>
                <div className="text-xl font-bold">{currentRoute.currentLocation}</div>
              </div>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column - Upcoming Stops */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200 bg-gray-50">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Navigation2 className="w-5 h-5 text-blue-600" />
                    Upcoming Stops ({upcomingStops.length})
                  </h2>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {upcomingStops.map((stop, index) => (
                    <div
                      key={stop.id}
                      className="p-5 hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => setSelectedStop(selectedStop === stop.id ? null : stop.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm">
                              {index + 1}
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">{stop.name}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              stop.status === 'pending' 
                                ? 'bg-orange-100 text-orange-700'
                                : 'bg-blue-100 text-blue-700'
                            }`}>
                              {stop.status === 'pending' ? 'Next Stop' : 'Upcoming'}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Clock className="w-4 h-4 text-gray-400" />
                              <span>{stop.eta}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              <span>{stop.distance}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Zap className="w-4 h-4 text-green-500" />
                              <span>Board: {stop.studentsToBoard}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Zap className="w-4 h-4 text-red-500" />
                              <span>Drop: {stop.studentsToDropOff}</span>
                            </div>
                          </div>
                          
                          {selectedStop === stop.id && (
                            <div className="mt-3 pt-3 border-t border-gray-200">
                              <p className="text-sm text-gray-700 mb-2"><strong>Address:</strong> {stop.address}</p>
                              <div className="flex gap-2">
                                <button className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-lg hover:bg-green-200 transition-colors">
                                  Confirm Arrival
                                </button>
                                <button className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-lg hover:bg-orange-200 transition-colors">
                                  Report Issue
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                        <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${selectedStop === stop.id ? 'rotate-90' : ''}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Students & Summary */}
            <div className="space-y-6">
              
              {/* Live Map Placeholder */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="h-40 bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center relative">
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center shadow-lg mx-auto mb-2">
                      <Navigation className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-sm text-gray-700 font-semibold">{currentRoute.currentLocation}</p>
                    <p className="text-xs text-gray-600">Current Location</p>
                  </div>
                </div>
              </div>

              {/* Students Onboard */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-green-600" />
                  Students Onboard
                </h3>
                <div className="space-y-2">
                  {studentsOnboard.map(student => (
                    <div key={student.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{student.name}</p>
                        <p className="text-xs text-gray-600">{student.grade} Grade</p>
                      </div>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Boarded</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Route Summary */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Route Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Stops</span>
                    <span className="font-bold text-gray-900">{upcomingStops.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Students Onboard</span>
                    <span className="font-bold text-gray-900">{studentsOnboard.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Est. Completion</span>
                    <span className="font-bold text-gray-900">9:15 AM</span>
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

export default NavigationPage;