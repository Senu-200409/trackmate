import React, { useState } from 'react';
import {
  User,
  Clock,
  Bus,
  TrendingUp,
  MapPin,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Bell,
  Award
} from 'lucide-react';

function ParentDashboard() {
  const [childStatus, setChildStatus] = useState({
    name: "Alex Johnson",
    grade: "6th Grade",
    school: "Central High School",
    bus: "BUS-001",
    status: "On the way",
    location: "Approaching Oak Avenue",
    arrival: "8:10 AM",
    progress: 65,
    speed: "25 km/h",
    temperature: "22°C"
  });

  const stats = [
    { label: "On Time Days", value: "24", change: "+3", color: "from-green-400 to-emerald-400", icon: <CheckCircle className="w-5 h-5" /> },
    { label: "Distance Traveled", value: "156 km", change: "+12%", color: "from-blue-400 to-cyan-400", icon: <MapPin className="w-5 h-5" /> },
    { label: "Avg Speed", value: "28 km/h", change: "-2%", color: "from-purple-400 to-pink-400", icon: <TrendingUp className="w-5 h-5" /> },
    { label: "Safety Score", value: "9.8/10", change: "+0.2", color: "from-orange-400 to-red-400", icon: <Award className="w-5 h-5" /> },
  ];

  const recentJourneys = [
    { date: "Today", time: "8:10 AM", status: "On Time", duration: "25 min", color: "bg-green-100 text-green-800" },
    { date: "Yesterday", time: "8:15 AM", status: "Delayed", duration: "32 min", color: "bg-yellow-100 text-yellow-800" },
    { date: "Nov 30", time: "8:05 AM", status: "Early", duration: "22 min", color: "bg-blue-100 text-blue-800" },
    { date: "Nov 29", time: "8:12 AM", status: "On Time", duration: "28 min", color: "bg-green-100 text-green-800" },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-2xl p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Good Morning, Alex! 👋</h1>
            <p className="text-white/90">Track your child's journey in real-time</p>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-2xl font-bold">{childStatus.arrival}</div>
                <div className="text-sm text-white/80">Expected Arrival</div>
              </div>
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                <Bus className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                {stat.icon}
              </div>
              <span className="text-green-600 font-bold text-sm">↑ {stat.change}</span>
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
              <h2 className="text-2xl font-bold text-gray-900">Your Child's Journey</h2>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">Live</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">GPS Active</span>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-6 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 border-4 border-white flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900">{childStatus.name}</h3>
                  <div className="flex flex-wrap gap-4 mt-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span className="text-gray-600 font-medium">Grade: {childStatus.grade}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                      <span className="text-gray-600 font-medium">School: {childStatus.school}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <Clock className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="font-bold text-gray-900">Current Status</span>
                  </div>
                  <div className="text-green-700 font-semibold">● {childStatus.status}</div>
                  <div className="text-sm text-gray-600 mt-1">{childStatus.location}</div>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Bus className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="font-bold text-gray-900">Bus Details</span>
                  </div>
                  <div className="text-blue-700 font-semibold">Bus {childStatus.bus}</div>
                  <div className="text-sm text-gray-600 mt-1">Expected: {childStatus.arrival}</div>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-purple-600" />
                    </div>
                    <span className="font-bold text-gray-900">Progress</span>
                  </div>
                  <div className="mb-2">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                        style={{ width: `${childStatus.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">{childStatus.progress}% completed</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-4">Live Route Map</h4>
                <div className="h-64 rounded-2xl overflow-hidden relative bg-gradient-to-br from-blue-100 to-purple-100">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                      <p className="text-gray-700 font-medium">Real-time bus location tracking</p>
                      <p className="text-sm text-gray-500">Bus {childStatus.bus} • {childStatus.location}</p>
                    </div>
                  </div>
                  
                  <div className="absolute top-1/2 left-1/4 right-1/4 h-1 bg-gradient-to-r from-blue-400 to-purple-400"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-lg animate-pulse">
                        <Bus className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
              <Bell className="w-6 h-6 text-gray-600" />
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-yellow-50 to-orange-50">
                <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-400">
                  <AlertTriangle className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">Bus Delay</h4>
                  <p className="text-sm text-gray-600 mt-1">Bus BUS-001 delayed by 5 minutes due to traffic</p>
                  <span className="text-xs text-gray-500">2 mins ago</span>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50">
                <div className="p-3 rounded-xl bg-gradient-to-br from-green-400 to-emerald-400">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">Student Boarded</h4>
                  <p className="text-sm text-gray-600 mt-1">Alex has boarded Bus BUS-001</p>
                  <span className="text-xs text-gray-500">10 mins ago</span>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-400">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">Route Alert</h4>
                  <p className="text-sm text-gray-600 mt-1">New stop added at Oak Avenue</p>
                  <span className="text-xs text-gray-500">1 hour ago</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Recent Journeys</h3>
            <div className="space-y-3">
              {recentJourneys.map((journey, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{journey.date}</div>
                      <div className="text-sm text-gray-600">{journey.time}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-bold ${journey.status === 'On Time' ? 'text-green-600' : journey.status === 'Early' ? 'text-blue-600' : 'text-yellow-600'}`}>
                      {journey.status}
                    </div>
                    <div className="text-sm text-gray-600">{journey.duration}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-red-200 p-6 bg-gradient-to-r from-red-50 to-pink-50">
            <h3 className="font-bold text-gray-900 mb-4">Emergency Support</h3>
            <p className="text-gray-600 mb-4">Need immediate assistance?</p>
            <button className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all">
              Contact School Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ParentDashboard;