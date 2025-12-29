import React, { useState } from 'react';
import {
  User,
  Clock,
  Bus,
  MapPin,
  AlertTriangle,
  CheckCircle,
  Phone,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import ParentHeader from '../../components/Parent/ParentHeader';
import ParentFooter from '../../components/Parent/ParentFooter';

function ParentDashboard({ onMenuClick, setActiveTab }) {
  const [notifications] = useState([]);
  const [childStatus] = useState({
    name: "Alex Johnson",
    grade: "6th Grade",
    school: "Central High School",
    bus: "BUS-001",
    status: "On the way",
    location: "Approaching Oak Avenue",
    arrival: "8:10 AM",
    progress: 65,
    busDriver: "Michael Johnson",
    driverPhone: "+1-555-0123"
  });

  const alerts = [
    { id: 1, type: 'warning', title: 'Bus Delayed', message: 'BUS-001 delayed by 5 minutes due to traffic', time: '2 mins ago' },
    { id: 2, type: 'success', title: 'Student Boarded', message: 'Alex has boarded Bus BUS-001', time: '10 mins ago' }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#FFF9E6] via-[#FFFDF5] to-[#FFF9E6]">
      <ParentHeader notifications={notifications} onMenuClick={onMenuClick} setActiveTab={setActiveTab} />
      
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6 max-w-7xl mx-auto">
          
          {/* Welcome Header */}
          <div className="bg-gradient-to-r from-[#1E3A5F] via-[#3B6FB6] to-[#1E3A5F] text-white rounded-2xl p-6 border-b-4 border-[#F5C518]">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Welcome, Parent! 👋</h1>
                <p className="text-[#FFE066]">Track {childStatus.name}'s journey in real-time</p>
              </div>
              <div className="hidden md:block text-right">
                <div className="text-2xl font-bold">{childStatus.arrival}</div>
                <div className="text-sm text-[#FFE066]">Expected Arrival</div>
              </div>
            </div>
          </div>

          {/* Quick Status Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Status Card */}
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-green-100">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Status</div>
                  <div className="text-lg font-bold text-gray-900">{childStatus.status}</div>
                  <div className="text-xs text-gray-500">Live</div>
                </div>
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-blue-100">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Location</div>
                  <div className="text-lg font-bold text-gray-900 truncate">{childStatus.location}</div>
                  <div className="text-xs text-gray-500">Current</div>
                </div>
              </div>
            </div>

            {/* Bus Card */}
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-purple-100">
                  <Bus className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Bus</div>
                  <div className="text-lg font-bold text-gray-900">{childStatus.bus}</div>
                  <div className="text-xs text-gray-500">Assigned</div>
                </div>
              </div>
            </div>

            {/* Progress Card */}
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-orange-100">
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Progress</div>
                  <div className="text-lg font-bold text-gray-900">{childStatus.progress}%</div>
                  <div className="text-xs text-gray-500">To School</div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column - Live Map & Child Info */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Child Info Card */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">{childStatus.name}</h3>
                    <div className="flex flex-wrap gap-3 mt-2">
                      <span className="text-sm text-gray-600">Grade: {childStatus.grade}</span>
                      <span className="text-sm text-gray-600">School: {childStatus.school}</span>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Progress to School</h4>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                      style={{ width: `${childStatus.progress}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-600 mt-2">{childStatus.progress}% of journey completed</div>
                </div>
              </div>

              {/* Live Location Map */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="h-64 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center relative">
                  <div className="text-center z-10">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-lg mx-auto mb-3 animate-pulse">
                      <Bus className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-gray-700 font-semibold">{childStatus.location}</p>
                    <p className="text-sm text-gray-600">Bus {childStatus.bus}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Alerts & Quick Actions */}
            <div className="space-y-6">
              
              {/* Active Alerts */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                  Active Alerts
                </h3>
                <div className="space-y-3">
                  {alerts.map(alert => (
                    <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${
                      alert.type === 'warning'
                        ? 'bg-orange-50 border-orange-300'
                        : 'bg-green-50 border-green-300'
                    }`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{alert.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                        </div>
                        <div className="text-xs text-gray-500 whitespace-nowrap ml-2">{alert.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Driver Info */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Driver Info</h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Driver Name</div>
                    <div className="font-semibold text-gray-900">{childStatus.busDriver}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Contact</div>
                    <div className="font-semibold text-gray-900">{childStatus.driverPhone}</div>
                  </div>
                  <button className="w-full flex items-center justify-center gap-2 mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                    <Phone className="w-4 h-4" />
                    Call Driver
                  </button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Access</h3>
                <div className="space-y-2">
                  <button 
                    onClick={() => setActiveTab && setActiveTab('my-child')}
                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
                  >
                    <span className="font-medium text-gray-900">Child Details</span>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                  <button 
                    onClick={() => setActiveTab && setActiveTab('history')}
                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
                  >
                    <span className="font-medium text-gray-900">Journey History</span>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                  <button 
                    onClick={() => setActiveTab && setActiveTab('alerts')}
                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
                  >
                    <span className="font-medium text-gray-900">All Alerts</span>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Emergency */}
              <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl border-2 border-red-200 p-6">
                <h3 className="font-bold text-gray-900 mb-2">Emergency</h3>
                <p className="text-sm text-gray-600 mb-4">Immediate assistance needed?</p>
                <button className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-semibold">
                  Emergency Support
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>

      <ParentFooter />
    </div>
  );
}

export default ParentDashboard;