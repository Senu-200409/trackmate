import React, { useState, useEffect } from 'react';
import {
  Bus,
  Users,
  User,
  AlertTriangle,
  ChevronRight,
  Activity,
  MapPin,
  Fuel,
  Wrench,
  Bell,
  CheckCircle,
  XCircle,
  ArrowRight
} from 'lucide-react';
import OwnerHeader from '../../components/Owner/OwnerHeader';
import OwnerFooter from '../../components/Owner/OwnerFooter';

function OwnerDashboard({ onMenuClick, setActiveTab, onLogout }) {
  const [notifications] = useState([]);
  const [currentAlertIndex, setCurrentAlertIndex] = useState(0);
  
  const [businessStats] = useState({
    activeBuses: 24,
    totalBuses: 28,
    totalDrivers: 32,
    driversOnDuty: 28,
    totalStudents: 1248,
    activeRoutes: 8
  });

  // Live alerts for marquee
  const liveAlerts = [
    { type: "warning", message: "BUS-003 running 5 mins behind schedule on Route C", time: "2 mins ago" },
    { type: "success", message: "Driver Michael Smith completed morning shift successfully", time: "15 mins ago" },
    { type: "info", message: "Fuel refill completed for BUS-007 - 45L added", time: "32 mins ago" },
    { type: "warning", message: "BUS-012 maintenance due in 3 days", time: "1 hour ago" },
    { type: "success", message: "All afternoon routes started on time", time: "2 hours ago" },
  ];

  // Live bus status
  const liveBusStatus = [
    { id: "BUS-001", route: "Route A", status: "On Route", driver: "Michael S.", students: 24, eta: "8:15 AM" },
    { id: "BUS-002", route: "Route B", status: "On Route", driver: "Sarah J.", students: 22, eta: "8:20 AM" },
    { id: "BUS-003", route: "Route C", status: "Delayed", driver: "Robert B.", students: 18, eta: "8:25 AM" },
    { id: "BUS-004", route: "Route D", status: "On Route", driver: "Lisa D.", students: 26, eta: "8:18 AM" },
  ];

  // Auto-scroll alerts
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAlertIndex((prev) => (prev + 1) % liveAlerts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [liveAlerts.length]);

  const getAlertIcon = (type) => {
    switch(type) {
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <Bell className="w-4 h-4 text-blue-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'On Route': return 'bg-green-100 text-green-700 border-green-200';
      case 'Delayed': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Stopped': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#FFF9E6] via-[#FFFDF5] to-[#FFF9E6]">
      <OwnerHeader notifications={notifications} ownerName="David" companyName="TrackMate Fleet" onMenuClick={onMenuClick} setActiveTab={setActiveTab} onLogout={onLogout} />
      
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-5 max-w-7xl mx-auto">
          
          {/* Welcome Header */}
          <div className="bg-gradient-to-r from-[#1E3A5F] via-[#3B6FB6] to-[#1E3A5F] text-white rounded-2xl p-5 md:p-6 border-b-4 border-[#F5C518]">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-1">Welcome back, David! 👋</h1>
              <p className="text-[#FFE066] text-sm md:text-base">Here's what's happening with your fleet today</p>
            </div>
          </div>

          {/* Live Alerts Marquee */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="flex items-center">
              <div className="bg-[#1E3A5F] px-4 py-3 flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#F5C518] animate-pulse" />
                <span className="text-white font-semibold text-sm whitespace-nowrap">LIVE</span>
              </div>
              <div className="flex-1 px-4 py-3 overflow-hidden">
                <div className="flex items-center gap-3 animate-fade-in" key={currentAlertIndex}>
                  {getAlertIcon(liveAlerts[currentAlertIndex].type)}
                  <span className="text-gray-700 text-sm">{liveAlerts[currentAlertIndex].message}</span>
                  <span className="text-gray-400 text-xs ml-auto whitespace-nowrap">{liveAlerts[currentAlertIndex].time}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Active Buses */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all hover:border-green-300 group cursor-pointer">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg shadow-green-200">
                  <Bus className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded-full">
                  {businessStats.activeBuses}/{businessStats.totalBuses}
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{businessStats.activeBuses}</div>
              <div className="text-sm text-gray-600">Active Buses</div>
              <div className="mt-2 flex items-center text-xs text-green-600 font-medium group-hover:underline">
                View Fleet <ChevronRight className="w-3 h-3" />
              </div>
            </div>

            {/* Drivers On Duty */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all hover:border-blue-300 group cursor-pointer">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-500 shadow-lg shadow-blue-200">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                  {businessStats.driversOnDuty}/{businessStats.totalDrivers}
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{businessStats.driversOnDuty}</div>
              <div className="text-sm text-gray-600">Drivers On Duty</div>
              <div className="mt-2 flex items-center text-xs text-blue-600 font-medium group-hover:underline">
                View Drivers <ChevronRight className="w-3 h-3" />
              </div>
            </div>

            {/* Students Traveling */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all hover:border-purple-300 group cursor-pointer">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 shadow-lg shadow-purple-200">
                  <User className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-medium px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
                  {businessStats.activeRoutes} routes
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{businessStats.totalStudents}</div>
              <div className="text-sm text-gray-600">Total Students</div>
              <div className="mt-2 flex items-center text-xs text-purple-600 font-medium group-hover:underline">
                View Routes <ChevronRight className="w-3 h-3" />
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-5">
            
            {/* Live Bus Tracking - Takes 2 columns */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-bold text-gray-900">Live Bus Status</h2>
                  <span className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    Live
                  </span>
                </div>
                <button className="text-sm text-[#3B6FB6] font-medium hover:underline flex items-center gap-1">
                  View All <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                {liveBusStatus.map((bus) => (
                  <div key={bus.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#1E3A5F] flex items-center justify-center">
                        <Bus className="w-5 h-5 text-[#F5C518]" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{bus.id}</div>
                        <div className="text-xs text-gray-500 flex items-center gap-2">
                          <MapPin className="w-3 h-3" /> {bus.route}
                        </div>
                      </div>
                    </div>
                    <div className="text-center hidden sm:block">
                      <div className="text-sm font-medium text-gray-700">{bus.driver}</div>
                      <div className="text-xs text-gray-500">{bus.students} students</div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(bus.status)}`}>
                        {bus.status}
                      </span>
                      <div className="text-xs text-gray-500 mt-1">ETA: {bus.eta}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats Panel */}
            <div className="space-y-4">
              {/* Quick Actions */}
              <div className="bg-gradient-to-br from-[#1E3A5F] to-[#3B6FB6] rounded-xl p-5 text-white">
                <h3 className="font-bold mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="w-full flex items-center justify-between p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                    <div className="flex items-center gap-3">
                      <Fuel className="w-4 h-4 text-[#F5C518]" />
                      <span className="text-sm">Fuel Report</span>
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button className="w-full flex items-center justify-between p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                    <div className="flex items-center gap-3">
                      <Wrench className="w-4 h-4 text-[#F5C518]" />
                      <span className="text-sm">Maintenance</span>
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button className="w-full flex items-center justify-between p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                    <div className="flex items-center gap-3">
                      <Activity className="w-4 h-4 text-[#F5C518]" />
                      <span className="text-sm">Full Analytics</span>
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      <OwnerFooter />
    </div>
  );
}

export default OwnerDashboard;