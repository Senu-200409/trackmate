import React from 'react';
import { Bell, Search } from 'lucide-react';

function Navbar({ notifications, userRole }) {
  const getGreeting = () => {
    const greetings = {
      'parent': 'Parent Dashboard',
      'driver': 'Driver Control Panel',
      'owner': 'Business Overview'
    };
    return greetings[userRole] || 'Dashboard';
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{getGreeting()}</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:block relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-12 pr-4 py-3 bg-gray-100 border-0 rounded-xl w-64 focus:ring-2 focus:ring-blue-500/50 focus:bg-white outline-none"
            />
          </div>
          
          <button className="relative p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center shadow-lg">
                {notifications.length}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;