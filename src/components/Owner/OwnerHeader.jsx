import React, { useState } from 'react';
import { Bell, Menu, X, User, LogOut, Settings, Building2, BarChart3, Bus, Users, AlignJustify, School } from 'lucide-react';
import ProfileSlideOver from '../ProfileSlideOver';

function OwnerHeader({ notifications = [], ownerName = "Fleet Owner", companyName = "TrackMate Fleet", onMenuClick, setActiveTab, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-[#1E3A5F] via-[#3B6FB6] to-[#1E3A5F] text-white shadow-xl">
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
              <Building2 className="w-6 h-6 text-[#1E3A5F]" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight">TrackMate</h1>
              <p className="text-xs sm:text-sm text-[#FFE066]">Fleet Management Portal</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <button onClick={() => setActiveTab('analytics')} className="text-white/90 hover:text-[#FFE066] transition-colors font-medium flex items-center gap-2 border-b-2 border-transparent hover:border-[#F5C518] pb-1">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </button>
            <button onClick={() => setActiveTab('fleet')} className="text-white/90 hover:text-[#FFE066] transition-colors font-medium flex items-center gap-2 border-b-2 border-transparent hover:border-[#F5C518] pb-1">
              <Bus className="w-4 h-4" />
              Fleet
            </button>
            <button onClick={() => setActiveTab('drivers')} className="text-white/90 hover:text-[#FFE066] transition-colors font-medium flex items-center gap-2 border-b-2 border-transparent hover:border-[#F5C518] pb-1">
              <Users className="w-4 h-4" />
              Drivers
            </button>
            <button onClick={() => setActiveTab('schools')} className="text-white/90 hover:text-[#FFE066] transition-colors font-medium flex items-center gap-2 border-b-2 border-transparent hover:border-[#F5C518] pb-1">
              <School className="w-4 h-4" />
              Schools
            </button>
          </nav>

          {/* More Options Menu */}
          <div className="hidden lg:flex items-center gap-2">
            <div className="relative group">
              <button className="text-white/90 hover:text-[#FFE066] transition-colors font-medium px-3 py-2 rounded-lg hover:bg-white/10 border-b-2 border-transparent hover:border-[#F5C518]">
                More ▼
              </button>
              <div className="absolute right-0 mt-0 w-48 bg-[#1E3A5F] text-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-[#3B6FB6]">
                <button onClick={() => setActiveTab('students')} className="w-full text-left px-4 py-3 hover:bg-[#3B6FB6] transition-colors flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Students
                </button>
                <button onClick={() => setActiveTab('parents')} className="w-full text-left px-4 py-3 hover:bg-[#3B6FB6] transition-colors flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Parents
                </button>
                <button onClick={() => setActiveTab('routes')} className="w-full text-left px-4 py-3 hover:bg-[#3B6FB6] transition-colors">Routes</button>
                <button onClick={() => setActiveTab('dashboard')} className="w-full text-left px-4 py-3 hover:bg-[#3B6FB6] transition-colors border-t border-[#3B6FB6]">Dashboard</button>
              </div>
            </div>
          </div>

          {/* Right Section - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            {/* Company Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#F5C518]/20 border border-[#F5C518]/40 rounded-lg">
              <Building2 className="w-4 h-4 text-[#FFE066]" />
              <span className="text-sm text-[#FFE066] font-medium">{companyName}</span>
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

            {/* Profile Slide-Over trigger */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(true)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors border border-white/20"
              >
                <div className="w-8 h-8 bg-[#F5C518] rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-[#1E3A5F]" />
                </div>
                <div className="text-left">
                  <span className="text-sm font-medium block">{ownerName}</span>
                  <span className="text-xs text-[#FFE066]">Administrator</span>
                </div>
              </button>
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
          {/* Company Badge - Mobile */}
          <div className="flex items-center gap-2 px-4 py-2 bg-[#F5C518]/20 border border-[#F5C518]/40 rounded-lg mb-4">
            <Building2 className="w-4 h-4 text-[#FFE066]" />
            <span className="text-sm text-[#FFE066] font-medium">{companyName}</span>
          </div>

          <button onClick={() => { setActiveTab('analytics'); setMobileMenuOpen(false); }} className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-[#3B6FB6] transition-colors font-medium w-full text-left">
            <BarChart3 className="w-5 h-5 text-[#FFE066]" />
            Analytics
          </button>
          <button onClick={() => { setActiveTab('fleet'); setMobileMenuOpen(false); }} className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-[#3B6FB6] transition-colors font-medium w-full text-left">
            <Bus className="w-5 h-5 text-[#FFE066]" />
            Fleet
          </button>
          <button onClick={() => { setActiveTab('drivers'); setMobileMenuOpen(false); }} className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-[#3B6FB6] transition-colors font-medium w-full text-left">
            <Users className="w-5 h-5 text-[#FFE066]" />
            Drivers
          </button>
          <button onClick={() => { setActiveTab('schools'); setMobileMenuOpen(false); }} className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-[#3B6FB6] transition-colors font-medium w-full text-left">
            <School className="w-5 h-5 text-[#FFE066]" />
            Schools
          </button>
          <button onClick={() => { setActiveTab('students'); setMobileMenuOpen(false); }} className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-[#3B6FB6] transition-colors font-medium w-full text-left">
            <Users className="w-5 h-5 text-[#FFE066]" />
            Students
          </button>
          <button onClick={() => { setActiveTab('parents'); setMobileMenuOpen(false); }} className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-[#3B6FB6] transition-colors font-medium w-full text-left">
            <User className="w-5 h-5 text-[#FFE066]" />
            Parents
          </button>
          <button onClick={() => { setActiveTab('routes'); setMobileMenuOpen(false); }} className="block px-4 py-3 rounded-lg hover:bg-[#3B6FB6] transition-colors font-medium w-full text-left">Routes</button>
          <button onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false); }} className="block px-4 py-3 rounded-lg hover:bg-[#3B6FB6] transition-colors font-medium w-full text-left">Dashboard</button>
          
          <div className="border-t border-[#3B6FB6] pt-4 mt-4">
            <button className="w-full flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-[#3B6FB6] transition-colors font-medium">
              <User className="w-5 h-5 text-[#FFE066]" />
              <span>My Profile</span>
            </button>
            <button className="w-full flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-[#3B6FB6] transition-colors font-medium">
              <Building2 className="w-5 h-5 text-[#FFE066]" />
              <span>Company Settings</span>
            </button>
            <button className="w-full flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-[#3B6FB6] transition-colors font-medium">
              <Settings className="w-5 h-5 text-[#FFE066]" />
              <span>System Settings</span>
            </button>
            <button onClick={() => { onLogout && onLogout(); setMobileMenuOpen(false); }} className="w-full flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-red-900/30 transition-colors font-medium text-red-300">
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}

      {/* Profile Slide-Over */}
      <ProfileSlideOver
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
        user={{ name: ownerName, role: 'Owner', company: companyName }}
        onSettings={() => { setActiveTab('settings'); setProfileOpen(false); }}
        onLogout={() => { onLogout && onLogout(); setProfileOpen(false); }}
      />
    </header>
  );
}

export default OwnerHeader;
