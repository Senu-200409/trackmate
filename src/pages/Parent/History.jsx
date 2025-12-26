import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  MapPin,
  Award,
  BarChart3,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import ParentHeader from '../../components/Parent/ParentHeader';
import ParentFooter from '../../components/Parent/ParentFooter';

function History({ onMenuClick, setActiveTab }) {
  const [selectedMonth, setSelectedMonth] = useState('December');
  const [expandedJourney, setExpandedJourney] = useState(null);

  const stats = [
    { label: "On Time Days", value: "24", change: "+3", icon: <CheckCircle className="w-5 h-5 text-green-600" />, bg: "bg-green-100" },
    { label: "Total Distance", value: "156 km", change: "+12%", icon: <MapPin className="w-5 h-5 text-blue-600" />, bg: "bg-blue-100" },
    { label: "Avg Speed", value: "28 km/h", change: "-2%", icon: <TrendingUp className="w-5 h-5 text-purple-600" />, bg: "bg-purple-100" },
    { label: "Safety Score", value: "9.8/10", change: "+0.2", icon: <Award className="w-5 h-5 text-orange-600" />, bg: "bg-orange-100" },
  ];

  const journeyHistory = [
    { date: "Dec 26, 2025", day: "Today", time: "8:10 AM", duration: "25 min", status: "On Time", bus: "BUS-001", driver: "Michael", departure: "7:45 AM", arrival: "8:10 AM", distance: "12.5 km", avgSpeed: "30 km/h" },
    { date: "Dec 25, 2025", day: "Yesterday", time: "8:15 AM", duration: "32 min", status: "Delayed", bus: "BUS-001", driver: "Michael", departure: "7:45 AM", arrival: "8:17 AM", distance: "12.5 km", avgSpeed: "23 km/h" },
    { date: "Dec 24, 2025", day: "2 Days Ago", time: "8:05 AM", duration: "22 min", status: "Early", bus: "BUS-002", driver: "Sarah", departure: "7:45 AM", arrival: "8:07 AM", distance: "12.5 km", avgSpeed: "34 km/h" },
    { date: "Dec 23, 2025", day: "3 Days Ago", time: "8:12 AM", duration: "28 min", status: "On Time", bus: "BUS-001", driver: "Michael", departure: "7:45 AM", arrival: "8:13 AM", distance: "12.5 km", avgSpeed: "27 km/h" },
    { date: "Dec 20, 2025", day: "Friday", time: "8:08 AM", duration: "26 min", status: "On Time", bus: "BUS-001", driver: "Michael", departure: "7:45 AM", arrival: "8:11 AM", distance: "12.5 km", avgSpeed: "29 km/h" },
  ];

  const monthlyStats = [
    { date: "Dec 1-7", onTime: 5, delayed: 1, early: 1, totalDays: 7 },
    { date: "Dec 8-14", onTime: 6, delayed: 0, early: 1, totalDays: 7 },
    { date: "Dec 15-21", onTime: 6, delayed: 1, early: 0, totalDays: 7 },
    { date: "Dec 22-26", onTime: 5, delayed: 1, early: 0, totalDays: 5 },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#FFF9E6] via-[#FFFDF5] to-[#FFF9E6]">
      <ParentHeader notifications={[]} onMenuClick={onMenuClick} />
      
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6 max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-[#1E3A5F] via-[#3B6FB6] to-[#1E3A5F] text-white rounded-2xl p-6 border-b-4 border-[#F5C518]">
            <h1 className="text-3xl font-bold mb-2">Journey History</h1>
            <p className="text-[#FFE066]">Track Alex's journey records and performance trends</p>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.bg}`}>
                    {stat.icon}
                  </div>
                  <span className="text-green-600 font-bold text-sm">↑ {stat.change}</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Journey History - Main Column */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  Recent Journeys
                </h2>
                
                <div className="space-y-3">
                  {journeyHistory.map((journey, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => setExpandedJourney(expandedJourney === idx ? null : idx)}
                        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <div className="flex flex-col items-center">
                            <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              journey.status === 'On Time' ? 'bg-green-100 text-green-700' :
                              journey.status === 'Early' ? 'bg-blue-100 text-blue-700' :
                              'bg-yellow-100 text-yellow-700'
                            }`}>
                              {journey.status}
                            </div>
                            <span className="text-xs text-gray-500 mt-1">{journey.day}</span>
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-gray-900">{journey.date}</div>
                            <div className="text-sm text-gray-600">{journey.duration} • Bus {journey.bus}</div>
                          </div>
                        </div>
                        <div className="text-right mr-2">
                          <div className="font-bold text-gray-900">{journey.time}</div>
                          <div className="text-xs text-gray-500">Arrival</div>
                        </div>
                        {expandedJourney === idx ? (
                          <ChevronUp className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </button>
                      
                      {expandedJourney === idx && (
                        <div className="px-4 pb-4 pt-0 border-t border-gray-200 bg-gray-50">
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                            <div>
                              <span className="text-xs text-gray-600">Departure</span>
                              <p className="font-semibold text-gray-900">{journey.departure}</p>
                            </div>
                            <div>
                              <span className="text-xs text-gray-600">Arrival</span>
                              <p className="font-semibold text-gray-900">{journey.arrival}</p>
                            </div>
                            <div>
                              <span className="text-xs text-gray-600">Duration</span>
                              <p className="font-semibold text-gray-900">{journey.duration}</p>
                            </div>
                            <div>
                              <span className="text-xs text-gray-600">Distance</span>
                              <p className="font-semibold text-gray-900">{journey.distance}</p>
                            </div>
                            <div>
                              <span className="text-xs text-gray-600">Avg Speed</span>
                              <p className="font-semibold text-gray-900">{journey.avgSpeed}</p>
                            </div>
                            <div>
                              <span className="text-xs text-gray-600">Driver</span>
                              <p className="font-semibold text-gray-900">{journey.driver}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar - Monthly Stats */}
            <div className="space-y-6">
              
              {/* Monthly Overview */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  Monthly Trends
                </h3>
                
                <div className="space-y-3">
                  {monthlyStats.map((stat, idx) => (
                    <div key={idx} className="p-3 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                      <div className="text-sm font-semibold text-gray-900">{stat.date}</div>
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-600">On Time</span>
                          <span className="font-bold text-green-600">{stat.onTime} days</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500" style={{ width: `${(stat.onTime / stat.totalDays) * 100}%` }}></div>
                        </div>
                      </div>
                      {stat.delayed > 0 && (
                        <div className="mt-2 flex items-center gap-2 text-xs">
                          <AlertTriangle className="w-3 h-3 text-yellow-600" />
                          <span className="text-gray-600">{stat.delayed} delayed</span>
                        </div>
                      )}
                      {stat.early > 0 && (
                        <div className="flex items-center gap-2 text-xs">
                          <CheckCircle className="w-3 h-3 text-blue-600" />
                          <span className="text-gray-600">{stat.early} early</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary Card */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-6">
                <h3 className="font-bold text-gray-900 mb-3">Summary</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-700">
                    ✓ <strong>24/28 days</strong> on time arrival
                  </p>
                  <p className="text-gray-700">
                    ✓ <strong>156 km</strong> total distance
                  </p>
                  <p className="text-gray-700">
                    ✓ <strong>9.8/10</strong> average safety score
                  </p>
                  <p className="text-gray-700">
                    ✓ <strong>28 km/h</strong> average speed
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      <ParentFooter />
    </div>
  );
}

export default History;