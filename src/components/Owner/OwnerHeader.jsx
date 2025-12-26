import React, { useState } from 'react';
import { Bell, Menu, X, User, LogOut, Settings, Building2, BarChart3, Bus, Users } from 'lucide-react';

function OwnerHeader({ notifications = [], ownerName = "Fleet Owner", companyName = "TrackMate Fleet" }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-700 text-white shadow-lg">
      {/* Desktop & Tablet Header */}
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="bg-white rounded-lg p-2 shadow-md">
              <Building2 className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">TrackMate</h1>
              <p className="text-xs sm:text-sm text-indigo-200">Fleet Management Portal</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-white/90 hover:text-white transition-colors font-medium flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </a>
            <a href="#" className="text-white/90 hover:text-white transition-colors font-medium flex items-center gap-2">
              <Bus className="w-4 h-4" />
              Fleet
            </a>
            <a href="#" className="text-white/90 hover:text-white transition-colors font-medium flex items-center gap-2">
              <Users className="w-4 h-4" />
              Drivers
            </a>
            <a href="#" className="text-white/90 hover:text-white transition-colors font-medium">Routes</a>
            <a href="#" className="text-white/90 hover:text-white transition-colors font-medium">Reports</a>
          </nav>

          {/* Right Section - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            {/* Company Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-lg">
              <Building2 className="w-4 h-4 text-indigo-300" />
              <span className="text-sm text-indigo-200 font-medium">{companyName}</span>
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
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="text-sm font-medium block">{ownerName}</span>
                  <span className="text-xs text-indigo-300">Administrator</span>
                </div>
              </button>

              {/* Profile Dropdown */}
              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white text-gray-900 rounded-lg shadow-xl z-50">
                  <div className="px-4 py-3 border-b border-gray-200">
                    <p className="font-semibold">{ownerName}</p>
                    <p className="text-sm text-gray-500">{companyName}</p>
                  </div>
                  <button className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>My Profile</span>
                  </button>
                  <button className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    <span>Company Settings</span>
                  </button>
                  <button className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-2 border-b border-gray-200">
                    <Settings className="w-4 h-4" />
                    <span>System Settings</span>
                  </button>
                  <button className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-2 text-red-600">
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
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
        <div className="md:hidden bg-indigo-900 px-4 py-4 space-y-2 border-t border-indigo-700">
          {/* Company Badge - Mobile */}
          <div className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-lg mb-4">
            <Building2 className="w-4 h-4 text-indigo-300" />
            <span className="text-sm text-indigo-200 font-medium">{companyName}</span>
          </div>

          <a href="#" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-indigo-800 transition-colors font-medium">
            <BarChart3 className="w-5 h-5" />
            Analytics
          </a>
          <a href="#" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-indigo-800 transition-colors font-medium">
            <Bus className="w-5 h-5" />
            Fleet
          </a>
          <a href="#" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-indigo-800 transition-colors font-medium">
            <Users className="w-5 h-5" />
            Drivers
          </a>
          <a href="#" className="block px-4 py-2 rounded-lg hover:bg-indigo-800 transition-colors font-medium">Routes</a>
          <a href="#" className="block px-4 py-2 rounded-lg hover:bg-indigo-800 transition-colors font-medium">Reports</a>
          
          <div className="border-t border-indigo-700 pt-4 mt-4">
            <button className="w-full flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-indigo-800 transition-colors font-medium">
              <User className="w-5 h-5" />
              <span>My Profile</span>
            </button>
            <button className="w-full flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-indigo-800 transition-colors font-medium">
              <Building2 className="w-5 h-5" />
              <span>Company Settings</span>
            </button>
            <button className="w-full flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-indigo-800 transition-colors font-medium">
              <Settings className="w-5 h-5" />
              <span>System Settings</span>
            </button>
            <button className="w-full flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-indigo-800 transition-colors font-medium text-red-400">
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default OwnerHeader;
