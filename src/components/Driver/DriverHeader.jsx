import React, { useState } from 'react';
import { Bell, Menu, X, User, LogOut, Settings, Navigation, Bus, AlignJustify } from 'lucide-react';

function DriverHeader({ notifications = [], driverName = "Driver", onMenuClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-[#1E3A5F] via-[#2D5A9E] to-[#1E3A5F] text-white shadow-xl">
      {/* Top accent bar */}
      <div className="h-1 bg-gradient-to-r from-[#F5C518] via-[#FFE066] to-[#F5C518]"></div>
      
      {/* Desktop & Tablet Header */}
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Sidebar Toggle + Logo & Brand */}
          <div className="flex items-center gap-3">
            {/* Sidebar Toggle Button */}
            <button
              onClick={onMenuClick}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors border border-white/20 group"
              title="Open Menu"
            >
              <AlignJustify className="w-5 h-5 group-hover:text-[#FFE066] transition-colors" />
            </button>
            
            <div className="bg-[#F5C518] rounded-lg p-2 shadow-md">
              <Bus className="w-6 h-6 text-[#1E3A5F]" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight">TrackMate</h1>
              <p className="text-xs sm:text-sm text-[#FFE066]">Driver Control Panel</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-white/90 hover:text-[#FFE066] transition-colors font-medium flex items-center gap-2 border-b-2 border-transparent hover:border-[#F5C518] pb-1">
              <Navigation className="w-4 h-4" />
              Navigation
            </a>
            <a href="#" className="text-white/90 hover:text-[#FFE066] transition-colors font-medium border-b-2 border-transparent hover:border-[#F5C518] pb-1">Students</a>
            <a href="#" className="text-white/90 hover:text-[#FFE066] transition-colors font-medium border-b-2 border-transparent hover:border-[#F5C518] pb-1">Reports</a>
            <a href="#" className="text-white/90 hover:text-[#FFE066] transition-colors font-medium border-b-2 border-transparent hover:border-[#F5C518] pb-1">Support</a>
          </nav>

          {/* Right Section - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            {/* Active Route Indicator */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-600/20 border border-green-500/40 rounded-lg">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-300 font-medium">Route Active</span>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button className="relative p-2 rounded-lg hover:bg-white/10 transition-colors border border-white/20">
                <Bell className="w-5 h-5" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#F5C518] text-[#1E3A5F] text-xs rounded-full flex items-center justify-center font-bold shadow-lg">
                    {notifications.length > 9 ? '9+' : notifications.length}
                  </span>
                )}
              </button>
            </div>

            {/* Profile Menu */}
            <div className="relative">
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors border border-white/20"
              >
                <div className="w-8 h-8 bg-[#F5C518] rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-[#1E3A5F]" />
                </div>
                <span className="text-sm font-medium">{driverName}</span>
              </button>

              {/* Profile Dropdown */}
              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-[#1E3A5F] rounded-lg shadow-xl z-50 border border-gray-200">
                  <button className="w-full text-left px-4 py-3 hover:bg-[#FFF9E6] flex items-center gap-2 border-b border-gray-200 font-medium">
                    <User className="w-4 h-4 text-[#3B6FB6]" />
                    <span>My Profile</span>
                  </button>
                  <button className="w-full text-left px-4 py-3 hover:bg-[#FFF9E6] flex items-center gap-2 border-b border-gray-200 font-medium">
                    <Settings className="w-4 h-4 text-[#3B6FB6]" />
                    <span>Settings</span>
                  </button>
                  <button className="w-full text-left px-4 py-3 hover:bg-red-50 flex items-center gap-2 text-red-600 font-medium">
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
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors border border-white/20"
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
        <div className="md:hidden bg-[#1E3A5F] px-4 py-4 space-y-2 border-t border-[#3B6FB6]">
          {/* Active Route Indicator - Mobile */}
          <div className="flex items-center gap-2 px-4 py-2 bg-green-600/20 border border-green-500/40 rounded-lg mb-4">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-300 font-medium">Route Active</span>
          </div>

          <a href="#" className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-[#3B6FB6] transition-colors font-medium">
            <Navigation className="w-5 h-5 text-[#FFE066]" />
            Navigation
          </a>
          <a href="#" className="block px-4 py-3 rounded-lg hover:bg-[#3B6FB6] transition-colors font-medium">Students</a>
          <a href="#" className="block px-4 py-3 rounded-lg hover:bg-[#3B6FB6] transition-colors font-medium">Reports</a>
          <a href="#" className="block px-4 py-3 rounded-lg hover:bg-[#3B6FB6] transition-colors font-medium">Support</a>
          
          <div className="border-t border-[#3B6FB6] pt-4 mt-4">
            <button className="w-full flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-[#3B6FB6] transition-colors font-medium">
              <User className="w-5 h-5 text-[#FFE066]" />
              <span>My Profile</span>
            </button>
            <button className="w-full flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-[#3B6FB6] transition-colors font-medium">
              <Settings className="w-5 h-5 text-[#FFE066]" />
              <span>Settings</span>
            </button>
            <button className="w-full flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-red-900/30 transition-colors font-medium text-red-300">
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
