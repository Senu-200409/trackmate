import React, { useState } from 'react';
import {
  Bell,
  AlertTriangle,
  CheckCircle,
  MapPin,
  Clock,
  Trash2,
  Filter,
  X
} from 'lucide-react';
import ParentHeader from '../../components/Parent/ParentHeader';
import ParentFooter from '../../components/Parent/ParentFooter';

function Alerts({ onMenuClick, setActiveTab }) {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const allAlerts = [
    { id: 1, type: 'warning', title: 'Bus Delay', message: 'BUS-001 delayed by 5 minutes due to traffic', time: '2 mins ago', read: false },
    { id: 2, type: 'success', title: 'Student Boarded', message: 'Alex has boarded Bus BUS-001', time: '10 mins ago', read: false },
    { id: 3, type: 'info', title: 'Route Alert', message: 'New stop added at Oak Avenue for pickup', time: '1 hour ago', read: true },
    { id: 4, type: 'warning', title: 'Traffic Detected', message: 'Heavy traffic on Main Street, slight delay expected', time: '2 hours ago', read: true },
    { id: 5, type: 'success', title: 'Arrived at School', message: 'Alex has safely arrived at Central High School', time: 'Yesterday, 8:10 AM', read: true },
    { id: 6, type: 'info', title: 'Schedule Change', message: 'Tomorrow bus timing changed to 7:30 AM pickup', time: 'Yesterday, 3:45 PM', read: true },
    { id: 7, type: 'warning', title: 'Temperature Alert', message: 'Bus temperature slightly high, driver is monitoring', time: '2 days ago', read: true },
    { id: 8, type: 'success', title: 'Perfect Attendance', message: 'Alex has maintained perfect attendance for December', time: '3 days ago', read: true },
  ];

  const filteredAlerts = selectedFilter === 'all' ? allAlerts : 
                        selectedFilter === 'unread' ? allAlerts.filter(a => !a.read) :
                        allAlerts.filter(a => a.type === selectedFilter);

  const unreadCount = allAlerts.filter(a => !a.read).length;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#FFF9E6] via-[#FFFDF5] to-[#FFF9E6]">
      <ParentHeader notifications={[]} onMenuClick={onMenuClick} setActiveTab={setActiveTab} />
      
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6 max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-[#1E3A5F] via-[#3B6FB6] to-[#1E3A5F] text-white rounded-2xl p-6 border-b-4 border-[#F5C518]">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Alerts & Notifications</h1>
                <p className="text-[#FFE066]">Stay updated with all events and notifications</p>
              </div>
              {unreadCount > 0 && (
                <div className="bg-red-500 rounded-full w-12 h-12 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{unreadCount}</span>
                </div>
              )}
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 items-center">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedFilter === 'all'
                  ? 'bg-[#3B6FB6] text-white'
                  : 'bg-white border border-gray-300 text-gray-700 hover:border-[#3B6FB6]'
              }`}
            >
              All Alerts ({allAlerts.length})
            </button>
            <button
              onClick={() => setSelectedFilter('unread')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedFilter === 'unread'
                  ? 'bg-[#3B6FB6] text-white'
                  : 'bg-white border border-gray-300 text-gray-700 hover:border-[#3B6FB6]'
              }`}
            >
              Unread ({unreadCount})
            </button>
            <button
              onClick={() => setSelectedFilter('success')}
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                selectedFilter === 'success'
                  ? 'bg-green-600 text-white'
                  : 'bg-white border border-gray-300 text-gray-700 hover:border-green-500'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              Success
            </button>
            <button
              onClick={() => setSelectedFilter('warning')}
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                selectedFilter === 'warning'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-white border border-gray-300 text-gray-700 hover:border-yellow-500'
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              Warnings
            </button>
            <button
              onClick={() => setSelectedFilter('info')}
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                selectedFilter === 'info'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-gray-300 text-gray-700 hover:border-blue-500'
              }`}
            >
              <Bell className="w-4 h-4" />
              Info
            </button>
          </div>

          {/* Alerts List */}
          {filteredAlerts.length > 0 ? (
            <div className="space-y-3">
              {filteredAlerts.map(alert => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-xl border-l-4 transition-all ${
                    alert.type === 'warning'
                      ? 'bg-yellow-50 border-yellow-300'
                      : alert.type === 'success'
                      ? 'bg-green-50 border-green-300'
                      : 'bg-blue-50 border-blue-300'
                  } ${!alert.read ? 'border-2 border-l-4' : ''}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      {/* Icon */}
                      <div className={`p-3 rounded-lg flex-shrink-0 ${
                        alert.type === 'warning'
                          ? 'bg-yellow-100'
                          : alert.type === 'success'
                          ? 'bg-green-100'
                          : 'bg-blue-100'
                      }`}>
                        {alert.type === 'warning' && (
                          <AlertTriangle className={`w-5 h-5 ${alert.type === 'warning' ? 'text-yellow-600' : ''}`} />
                        )}
                        {alert.type === 'success' && (
                          <CheckCircle className={`w-5 h-5 text-green-600`} />
                        )}
                        {alert.type === 'info' && (
                          <Bell className={`w-5 h-5 text-blue-600`} />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-gray-900">{alert.title}</h4>
                          {!alert.read && (
                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                          )}
                        </div>
                        <p className="text-sm text-gray-700 mt-1">{alert.message}</p>
                        <p className="text-xs text-gray-500 mt-2">{alert.time}</p>
                      </div>
                    </div>

                    {/* Delete Button */}
                    <button className="p-2 rounded-lg hover:bg-gray-200 transition-colors flex-shrink-0">
                      <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No alerts found</p>
              <p className="text-gray-500 mt-2">All caught up! You'll see updates here.</p>
            </div>
          )}

          {/* Alert Statistics */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
              <div className="text-3xl font-bold text-green-600">{allAlerts.filter(a => a.type === 'success').length}</div>
              <div className="text-sm text-gray-600 mt-1">Success</div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
              <div className="text-3xl font-bold text-yellow-600">{allAlerts.filter(a => a.type === 'warning').length}</div>
              <div className="text-sm text-gray-600 mt-1">Warnings</div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
              <div className="text-3xl font-bold text-blue-600">{allAlerts.filter(a => a.type === 'info').length}</div>
              <div className="text-sm text-gray-600 mt-1">Info</div>
            </div>
          </div>

        </div>
      </main>

      <ParentFooter />
    </div>
  );
}

export default Alerts;