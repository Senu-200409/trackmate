import React from 'react';
import { X, User, Mail, Phone, CreditCard, Building2, Bus, School, Settings, LogOut } from 'lucide-react';

function ProfileSlideOver({ isOpen, onClose, user = {}, onSettings, onLogout }) {
  if (!isOpen) return null;

  const details = [
    user.name ? { label: 'Name', value: user.name, icon: User } : null,
    user.role ? { label: 'Role', value: user.role, icon: User } : null,
    user.email ? { label: 'Email', value: user.email, icon: Mail } : null,
    user.phone ? { label: 'Phone', value: user.phone, icon: Phone } : null,
    user.id ? { label: 'ID', value: user.id, icon: CreditCard } : null,
    user.bus ? { label: 'Bus', value: user.bus, icon: Bus } : null,
    user.company ? { label: 'Company', value: user.company, icon: Building2 } : null,
    user.school ? { label: 'School', value: user.school, icon: School } : null,
  ].filter(Boolean);

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Panel */}
      <div className="absolute right-0 top-0 h-full w-full sm:w-[28rem] bg-white shadow-2xl border-l border-gray-200 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">Profile</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100">
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex-1 overflow-y-auto">
          {/* Avatar */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#1E3A5F] via-[#3B6FB6] to-[#1E3A5F] flex items-center justify-center shadow-md">
              <User className="w-12 h-12 text-[#F5C518]" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{user.name || 'User'}</div>
              <div className="text-sm text-gray-600">{user.role || 'Profile'}</div>
            </div>
          </div>

          {/* Details list */}
          <div className="space-y-3">
            {details.length > 0 ? (
              details.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 rounded-lg border border-gray-200">
                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                    <item.icon className="w-4 h-4 text-[#1E3A5F]" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">{item.label}</div>
                    <div className="text-sm font-medium text-gray-900">{item.value}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-sm text-gray-600">No additional details available.</div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-200 flex items-center justify-between">
          <button
            onClick={() => onSettings && onSettings()}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1E3A5F] text-white hover:bg-[#2D5A9E]"
          >
            <Settings className="w-4 h-4" />
            Settings
          </button>
          <button
            onClick={() => onLogout && onLogout()}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileSlideOver;
