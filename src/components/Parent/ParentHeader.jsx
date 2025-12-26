import React, { useState } from 'react';
import { Bell, Menu, X, User, LogOut, Settings } from 'lucide-react';

function ParentHeader({ notifications = [] }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-blue-600 via-blue-500 to-orange-500 text-white shadow-lg">
      {/* Desktop & Tablet Header */}
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="bg-white rounded-lg p-2 shadow-md">
              <svg className="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm11 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">TrackMate</h1>
              <p className="text-xs sm:text-sm text-blue-100">Safe Transportation, Happy Parents</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-white/90 hover:text-white transition-colors font-medium">Home</a>
            <a href="#" className="text-white/90 hover:text-white transition-colors font-medium">My Child</a>
            <a href="#" className="text-white/90 hover:text-white transition-colors font-medium">History</a>
            <a href="#" className="text-white/90 hover:text-white transition-colors font-medium">Support</a>
          </nav>

          {/* Right Section - Desktop */}
          <div className="hidden md:flex items-center gap-4">
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
                <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium">Profile</span>
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
        <div className="md:hidden bg-blue-700 px-4 py-4 space-y-2 border-t border-blue-400">
          <a href="#" className="block px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium">Home</a>
          <a href="#" className="block px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium">My Child</a>
          <a href="#" className="block px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium">History</a>
          <a href="#" className="block px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium">Support</a>
          
          <div className="border-t border-blue-400 pt-4 mt-4">
            <button className="w-full flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium">
              <User className="w-5 h-5" />
              <span>My Profile</span>
            </button>
            <button className="w-full flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
            <button className="w-full flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium text-red-300">
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default ParentHeader;
