import React, { useState, useEffect } from 'react';
import { Bell, Menu, X, User, LogOut, Settings, Building2, BarChart3, Bus, Users, AlignJustify, School, Radio } from 'lucide-react';
import ProfileSlideOver from '../ProfileSlideOver';
import UserServices from '../../services/UserServices';

function OwnerHeader({ notifications = [], ownerName = "Fleet Owner", companyName = "TrackMate Fleet", onMenuClick, setActiveTab, onLogout, profileImage = null, onProfileImageUpdate = null }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [ownerImage, setOwnerImage] = useState(profileImage);
  const [name, setName] = useState(ownerName);

  useEffect(() => {
    const savedName = localStorage.getItem('userName');
    const savedImage = localStorage.getItem('profileImage');
    const savedId = localStorage.getItem('userId');
    if (savedName) setName(savedName);
    if (savedImage) setOwnerImage(savedImage);

    if (savedId) {
      UserServices.getUserById(savedId)
        .then(res => {
          const d = res.data && res.data.ResultSet ? res.data.ResultSet[0] : null;
          if (d) {
            if (d.UserName) setName(d.UserName);
            if (d.ProfileImage) {
              setOwnerImage(d.ProfileImage);
              localStorage.setItem('profileImage', d.ProfileImage);
            }
            if (d.UserID) localStorage.setItem('userId', d.UserID);
            if (d.UserName) localStorage.setItem('userName', d.UserName);
          }
        })
        .catch(() => {});
    }
  }, []);

  return (
    <header className="bg-gradient-to-r from-[#1E3A5F] via-[#3B6FB6] to-[#1E3A5F] text-white shadow-xl">
      {/* Top accent bar */}
      <div className="h-1 bg-gradient-to-r from-[#F5C518] via-[#FFE066] to-[#F5C518]"></div>
      
      {/* Desktop & Tablet Header */}
      <div className="px-6 sm:px-8 lg:px-10 py-5">
        <div className="flex items-center justify-between">
          {/* Sidebar Toggle + Logo & Brand */}
          <div className="flex items-center gap-4">
            {/* Sidebar Toggle Button */}
            <button
              onClick={onMenuClick}
              className="p-2.5 rounded-lg hover:bg-white/10 transition-colors border border-white/20 group"
              title="Open Menu"
            >
              <AlignJustify className="w-5 h-5 group-hover:text-[#FFE066] transition-colors" />
            </button>
            
            <div className="bg-[#F5C518] rounded-lg p-2.5 shadow-md">
              <Building2 className="w-6 h-6 text-[#1E3A5F]" />
            </div>
            <div className="space-y-0.5">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight leading-none">TrackMate</h1>
              <p className="text-sm sm:text-base text-[#FFE066] font-medium">Fleet Management Portal</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            <button onClick={() => setActiveTab('dashboard')} className="text-white/85 hover:text-[#FFE066] transition-colors font-semibold flex items-center gap-2 border-b-2 border-transparent hover:border-[#F5C518] pb-1.5 text-sm">
              <BarChart3 className="w-5 h-5" />
              <span>Dashboard</span>
            </button>
            <button onClick={() => setActiveTab('fleet')} className="text-white/85 hover:text-[#FFE066] transition-colors font-semibold flex items-center gap-2 border-b-2 border-transparent hover:border-[#F5C518] pb-1.5 text-sm">
              <Bus className="w-5 h-5" />
              <span>Buses</span>
            </button>
            <button onClick={() => setActiveTab('drivers')} className="text-white/85 hover:text-[#FFE066] transition-colors font-semibold flex items-center gap-2 border-b-2 border-transparent hover:border-[#F5C518] pb-1.5 text-sm">
              <Users className="w-5 h-5" />
              <span>Drivers</span>
            </button>
            <button onClick={() => setActiveTab('rfid')} className="text-white/85 hover:text-[#FFE066] transition-colors font-semibold flex items-center gap-2 border-b-2 border-transparent hover:border-[#F5C518] pb-1.5 text-sm">
              <AlignJustify className="w-5 h-5" />
              <span>RFID</span>
            </button>
          </nav>

          {/* Right Section - Desktop */}
          <div className="hidden md:flex items-center gap-5 lg:gap-6">
            {/* Company Badge */}
            <div className="flex items-center gap-2.5 px-4 py-2 bg-[#F5C518]/20 border border-[#F5C518]/40 rounded-lg">
              <Building2 className="w-5 h-5 text-[#FFE066]" />
              <span className="text-sm font-semibold text-[#FFE066]">{companyName}</span>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button className="relative p-2.5 rounded-lg hover:bg-white/10 transition-colors border border-white/20">
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
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors border border-white/20 group"
              >
                {ownerImage ? (
                  <img 
                    src={ownerImage} 
                    alt={name}
                    className="w-9 h-9 rounded-full object-cover group-hover:ring-2 ring-[#F5C518] transition-all"
                  />
                ) : (
                  <div className="w-9 h-9 bg-[#F5C518] rounded-full flex items-center justify-center group-hover:ring-2 ring-[#F5C518] transition-all">
                    <User className="w-5 h-5 text-[#1E3A5F]" />
                  </div>
                )}
                <div className="text-left">
                  <span className="text-sm font-semibold block leading-tight">{name}</span>
                  <span className="text-xs text-[#FFE066] font-medium">Administrator</span>
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

          <button onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false); }} className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-[#3B6FB6] transition-colors font-medium w-full text-left">
            <BarChart3 className="w-5 h-5 text-[#FFE066]" />
            Dashboard
          </button>
          <button onClick={() => { setActiveTab('fleet'); setMobileMenuOpen(false); }} className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-[#3B6FB6] transition-colors font-medium w-full text-left">
            <Bus className="w-5 h-5 text-[#FFE066]" />
            Buses
          </button>
          <button onClick={() => { setActiveTab('drivers'); setMobileMenuOpen(false); }} className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-[#3B6FB6] transition-colors font-medium w-full text-left">
            <Users className="w-5 h-5 text-[#FFE066]" />
            Drivers
          </button>
          <button onClick={() => { setActiveTab('rfid'); setMobileMenuOpen(false); }} className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-[#3B6FB6] transition-colors font-medium w-full text-left">
            <AlignJustify className="w-5 h-5 text-[#FFE066]" />
            RFID
          </button>

          <div className="border-t border-[#3B6FB6] pt-4 mt-4">
            <span className="text-xs text-[#FFE066] font-semibold px-4 block mb-2">MORE OPTIONS</span>
            <button onClick={() => { setActiveTab('analytics'); setMobileMenuOpen(false); }} className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-[#3B6FB6] transition-colors font-medium w-full text-left">
              <BarChart3 className="w-5 h-5 text-[#FFE066]" />
              Analytics
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
            <button onClick={() => { setActiveTab('devices'); setMobileMenuOpen(false); }} className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-[#3B6FB6] transition-colors font-medium w-full text-left">
              <Radio className="w-5 h-5 text-[#FFE066]" />
              Devices
            </button>
          </div>

          <div className="border-t border-[#3B6FB6] mt-4 pt-4">
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
        user={{ name: name, role: 'Owner', company: companyName, profileImage: ownerImage }}
        onSettings={() => { setActiveTab('settings'); setProfileOpen(false); }}
        onLogout={() => { onLogout && onLogout(); setProfileOpen(false); }}
        onImageUpdate={(image) => {
          setOwnerImage(image);
          localStorage.setItem('profileImage', image);
          if (onProfileImageUpdate) onProfileImageUpdate(image);
        }}
      />
    </header>
  );
}

export default OwnerHeader;
