import React, { useState } from 'react';
import { Bell, Menu, X, User, LogOut, Settings, Navigation, Bus } from 'lucide-react';

function DriverHeader({ notifications = [], driverName = "Driver" }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-slate-800 via-slate-700 to-blue-600 text-white shadow-lg">
      {/* Desktop & Tablet Header */}
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="bg-white rounded-lg p-2 shadow-md">
              <Bus className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">TrackMate</h1>
              <p className="text-xs sm:text-sm text-blue-200">Driver Control Panel</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-white/90 hover:text-white transition-colors font-medium flex items-center gap-2">
              <Navigation className="w-4 h-4" />
              Navigation
            </a>
            <a href="#" className="text-white/90 hover:text-white transition-colors font-medium">Students</a>
            <a href="#" className="text-white/90 hover:text-white transition-colors font-medium">Reports</a>
            <a href="#" className="text-white/90 hover:text-white transition-colors font-medium">Support</a>
          </nav>

          {/* Right Section - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            {/* Active Route Indicator */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/20 border border-green-400/30 rounded-lg">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-300 font-medium">Route Active</span>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button className="relative p-2 rounded-lg hover:bg-white/20 transition-colors">
                <Bell className="w-6 h-6" />
                {notifications.length > 0 && (
                  <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg">
                    {notifications.length > 9 ? '9+' : notifications.length}
                  </span>
                )}
              </button>
            </div>

            {/* Profile Menu */}
            <div className="relative">
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/20 transition-colors"
              >
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium">{driverName}</span>
              </button>

              {/* Profile Dropdown */}
              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-900 rounded-lg shadow-xl z-50">
                  <button className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-2 border-b border-gray-200">
                    <User className="w-4 h-4" />
                    <span>My Profile</span>
                  </button>
                  <button className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-2 border-b border-gray-200">
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </button>
                  <button className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-2 text-red-600">
                    <LogOut className="w-4 h-4" />
                    <span>End Shift</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/20 transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-800 px-4 py-4 space-y-2 border-t border-slate-600">
          {/* Active Route Indicator - Mobile */}
          <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-400/30 rounded-lg mb-4">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-300 font-medium">Route Active</span>
          </div>

          <a href="#" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors font-medium">
            <Navigation className="w-5 h-5" />
            Navigation
          </a>
          <a href="#" className="block px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors font-medium">Students</a>
          <a href="#" className="block px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors font-medium">Reports</a>
          <a href="#" className="block px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors font-medium">Support</a>
          
          <div className="border-t border-slate-600 pt-4 mt-4">
            <button className="w-full flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors font-medium">
              <User className="w-5 h-5" />
              <span>My Profile</span>
            </button>
            <button className="w-full flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors font-medium">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
            <button className="w-full flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors font-medium text-red-400">
              <LogOut className="w-5 h-5" />
              <span>End Shift</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default DriverHeader;
