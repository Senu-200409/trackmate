import React, { useState } from 'react';
import {
  FileText,
  TrendingUp,
  Clock,
  Target,
  AlertCircle,
  Zap,
  Battery,
  Users,
  CheckCircle,
  Calendar,
  BarChart3,
  Activity
} from 'lucide-react';
import DriverHeader from '../../components/Driver/DriverHeader';
import DriverFooter from '../../components/Driver/DriverFooter';

function Reports({ onMenuClick, setActiveTab }) {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const performanceMetrics = {
    week: {
      onTimeRate: { value: 96, target: 95, change: '+2%' },
      avgSpeed: { value: 32, target: 35, change: '-3%' },
      fuelEfficiency: { value: 8.2, target: 8.0, change: '+2.5%' },
      safetyScore: { value: 9.5, target: 9.0, change: '+0.5%' }
    },
    month: {
      onTimeRate: { value: 94, target: 95, change: '-1%' },
      avgSpeed: { value: 33, target: 35, change: '-6%' },
      fuelEfficiency: { value: 8.0, target: 8.0, change: '0%' },
      safetyScore: { value: 9.2, target: 9.0, change: '+2%' }
    }
  };

  const dailyStats = [
    { date: 'Mon 11', onTime: 95, speed: 34, fuel: 8.3, safety: 9.6 },
    { date: 'Tue 12', onTime: 97, speed: 31, fuel: 8.1, safety: 9.4 },
    { date: 'Wed 13', onTime: 96, speed: 32, fuel: 8.2, safety: 9.5 },
    { date: 'Thu 14', onTime: 94, speed: 33, fuel: 7.9, safety: 9.3 },
    { date: 'Fri 15', onTime: 98, speed: 30, fuel: 8.4, safety: 9.7 }
  ];

  const incidents = [
    {
      id: 1,
      date: 'Jan 15, 2025',
      type: 'Speeding',
      location: 'Main Street',
      severity: 'warning',
      description: 'Exceeded speed limit by 5 km/h'
    },
    {
      id: 2,
      date: 'Jan 14, 2025',
      type: 'Harsh Braking',
      location: 'Central Ave',
      severity: 'info',
      description: 'Hard brake applied - emergency stop'
    },
    {
      id: 3,
      date: 'Jan 12, 2025',
      type: 'Route Deviation',
      location: 'North Road',
      severity: 'info',
      description: 'Took alternative route due to traffic'
    }
  ];

  const metrics = performanceMetrics[selectedPeriod];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#FFF9E6] via-[#FFFDF5] to-[#FFF9E6]">
      <DriverHeader notifications={[]} driverName="Michael" onMenuClick={onMenuClick} setActiveTab={setActiveTab} />
      
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6 max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-[#1E3A5F] via-[#3B6FB6] to-[#1E3A5F] text-white rounded-2xl p-6 border-b-4 border-[#F5C518]">
            <h1 className="text-3xl font-bold mb-2">Performance Reports</h1>
            <p className="text-[#FFE066]">Track your driving metrics and safety score</p>
          </div>

          {/* Period Selector */}
          <div className="flex gap-4">
            <button
              onClick={() => setSelectedPeriod('week')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                selectedPeriod === 'week'
                  ? 'bg-[#3B6FB6] text-white'
                  : 'bg-white border border-gray-200 text-gray-900 hover:border-[#3B6FB6]'
              }`}
            >
              <Calendar className="w-4 h-4 inline mr-2" />
              This Week
            </button>
            <button
              onClick={() => setSelectedPeriod('month')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                selectedPeriod === 'month'
                  ? 'bg-[#3B6FB6] text-white'
                  : 'bg-white border border-gray-200 text-gray-900 hover:border-[#3B6FB6]'
              }`}
            >
              <Calendar className="w-4 h-4 inline mr-2" />
              This Month
            </button>
          </div>

          {/* Performance Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* On Time Rate */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-700">On Time Rate</h3>
                <div className="p-3 rounded-xl bg-green-100">
                  <Clock className="w-5 h-5 text-green-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{metrics.onTimeRate.value}%</div>
              <div className="text-sm text-gray-600 mb-2">Target: {metrics.onTimeRate.target}%</div>
              <div className={`text-sm font-semibold ${parseFloat(metrics.onTimeRate.change) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                <TrendingUp className="w-4 h-4 inline mr-1" />
                {metrics.onTimeRate.change}
              </div>
            </div>

            {/* Average Speed */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-700">Avg Speed</h3>
                <div className="p-3 rounded-xl bg-blue-100">
                  <Zap className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{metrics.avgSpeed.value} <span className="text-xl">km/h</span></div>
              <div className="text-sm text-gray-600 mb-2">Target: {metrics.avgSpeed.target} km/h</div>
              <div className={`text-sm font-semibold ${parseFloat(metrics.avgSpeed.change) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                <TrendingUp className="w-4 h-4 inline mr-1" />
                {metrics.avgSpeed.change}
              </div>
            </div>

            {/* Fuel Efficiency */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-700">Fuel Efficiency</h3>
                <div className="p-3 rounded-xl bg-orange-100">
                  <Battery className="w-5 h-5 text-orange-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{metrics.fuelEfficiency.value} <span className="text-xl">km/L</span></div>
              <div className="text-sm text-gray-600 mb-2">Target: {metrics.fuelEfficiency.target} km/L</div>
              <div className={`text-sm font-semibold ${parseFloat(metrics.fuelEfficiency.change) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                <TrendingUp className="w-4 h-4 inline mr-1" />
                {metrics.fuelEfficiency.change}
              </div>
            </div>

            {/* Safety Score */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-700">Safety Score</h3>
                <div className="p-3 rounded-xl bg-purple-100">
                  <Target className="w-5 h-5 text-purple-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{metrics.safetyScore.value} <span className="text-xl">/10</span></div>
              <div className="text-sm text-gray-600 mb-2">Target: {metrics.safetyScore.target}/10</div>
              <div className={`text-sm font-semibold ${parseFloat(metrics.safetyScore.change) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                <TrendingUp className="w-4 h-4 inline mr-1" />
                {metrics.safetyScore.change}
              </div>
            </div>
          </div>

          {/* Daily Performance Chart */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              Daily Performance ({selectedPeriod === 'week' ? 'This Week' : 'This Month'})
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-700">On Time %</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-700">Avg Speed</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-700">Fuel km/L</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-700">Safety</th>
                  </tr>
                </thead>
                <tbody>
                  {dailyStats.map((stat, idx) => (
                    <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900 font-medium">{stat.date}</td>
                      <td className="py-3 px-4 text-center">
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                          {stat.onTime}%
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center text-gray-700">{stat.speed} km/h</td>
                      <td className="py-3 px-4 text-center text-gray-700">{stat.fuel} km/L</td>
                      <td className="py-3 px-4 text-center">
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                          {stat.safety}/10
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Incidents & Alerts */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              Incidents & Alerts
            </h2>
            <div className="space-y-3">
              {incidents.map(incident => (
                <div key={incident.id} className={`p-4 rounded-lg border-l-4 ${
                  incident.severity === 'warning'
                    ? 'bg-orange-50 border-orange-300'
                    : 'bg-blue-50 border-blue-300'
                }`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                        {incident.severity === 'warning' ? (
                          <AlertCircle className="w-4 h-4 text-orange-600" />
                        ) : (
                          <CheckCircle className="w-4 h-4 text-blue-600" />
                        )}
                        {incident.type}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">{incident.description}</p>
                      <p className="text-xs text-gray-500 mt-2">📍 {incident.location}</p>
                    </div>
                    <div className="text-xs text-gray-500 whitespace-nowrap ml-4">{incident.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      <DriverFooter />
    </div>
  );
}

export default Reports;