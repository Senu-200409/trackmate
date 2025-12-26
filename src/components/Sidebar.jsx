import React from 'react';
import {
  Home,
  Bus,
  Users,
  User,
  Calendar,
  Bell,
  Settings,
  Navigation,
  FileText,
  HelpCircle,
  Route,
  BarChart3,
  LogOut,
  X
} from 'lucide-react';

function Sidebar({ activeTab, setActiveTab, onLogout, isOpen, userRole, onClose }) {
  const getMenuItems = () => {
    const commonItems = [
      { icon: <Home className="w-5 h-5" />, label: 'Dashboard', view: 'dashboard' },
    ];

    if (userRole === 'parent') {
      return [
        ...commonItems,
        { icon: <User className="w-5 h-5" />, label: 'My Child', view: 'my-child' },
        { icon: <Calendar className="w-5 h-5" />, label: 'History', view: 'history' },
        { icon: <Bell className="w-5 h-5" />, label: 'Alerts', view: 'alerts' },
        { icon: <Settings className="w-5 h-5" />, label: 'Settings', view: 'settings' },
      ];
    } else if (userRole === 'driver') {
      return [
        ...commonItems,
        { icon: <Navigation className="w-5 h-5" />, label: 'Navigation', view: 'navigation' },
        { icon: <Users className="w-5 h-5" />, label: 'Students', view: 'students' },
        { icon: <FileText className="w-5 h-5" />, label: 'Reports', view: 'reports' },
        { icon: <HelpCircle className="w-5 h-5" />, label: 'Support', view: 'support' },
      ];
    } else if (userRole === 'owner') {
      return [
        ...commonItems,
        { icon: <Bus className="w-5 h-5" />, label: 'Fleet', view: 'fleet' },
        { icon: <Users className="w-5 h-5" />, label: 'Drivers', view: 'drivers' },
        { icon: <Route className="w-5 h-5" />, label: 'Routes', view: 'routes' },
        { icon: <BarChart3 className="w-5 h-5" />, label: 'Analytics', view: 'analytics' },
        { icon: <Settings className="w-5 h-5" />, label: 'Settings', view: 'settings' },
      ];
    }

    return commonItems;
  };

  const getRoleTitle = () => {
    const titles = {
      'parent': 'Parent Portal',
      'driver': 'Driver Control Panel',
      'owner': 'Owner Portal'
    };
    return titles[userRole] || 'Dashboard';
  };

  const getUserName = () => {
    const names = {
      'parent': 'Alex Johnson',
      'driver': 'Michael Smith',
      'owner': 'David Wilson'
    };
    return names[userRole] || 'User';
  };

  return (
    <>
      {/* Dark overlay - only visible when sidebar is open */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sidebar - slides in from left */}
      <aside className={`
        fixed inset-y-0 left-0 z-50
        w-72 bg-gradient-to-b from-[#1E3A5F] via-[#1E3A5F] to-[#162d4a] flex flex-col
        transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        transition-transform duration-300 ease-in-out
        shadow-2xl
      `}>
        {/* Golden accent bar at top */}
        <div className="h-1 bg-gradient-to-r from-[#F5C518] via-[#FFE066] to-[#F5C518]" />
        
        {/* Header with close button */}
        <div className="p-6 border-b border-[#3B6FB6]/30">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#F5C518] to-[#FFE066] shadow-lg shadow-[#F5C518]/20">
                <Bus className="w-6 h-6 text-[#1E3A5F]" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">TrackMate</h1>
                <p className="text-[#FFE066] text-sm font-medium">{getRoleTitle()}</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-[#3B6FB6]/30 transition-colors"
            >
              <X className="w-5 h-5 text-gray-300" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-4 overflow-y-auto">
          <h2 className="text-xs font-semibold text-[#FFE066]/70 uppercase tracking-wider mb-4 px-4">
            Main Navigation
          </h2>
          <nav className="space-y-1.5">
            {getMenuItems().map((item) => (
              <button
                key={item.label}
                onClick={() => setActiveTab(item.view)}
                className={`flex items-center gap-4 w-full px-4 py-3.5 rounded-xl text-left transition-all duration-200 ${
                  activeTab === item.view 
                    ? 'bg-gradient-to-r from-[#F5C518] to-[#FFE066] text-[#1E3A5F] shadow-lg shadow-[#F5C518]/20 font-semibold' 
                    : 'text-gray-200 hover:bg-[#3B6FB6]/30 hover:text-white'
                }`}
              >
                <span className={activeTab === item.view ? 'text-[#1E3A5F]' : 'text-[#F5C518]'}>
                  {item.icon}
                </span>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* User profile section */}
        <div className="p-4 border-t border-[#3B6FB6]/30 bg-[#162d4a]/50">
          <div className="flex items-center gap-3 mb-4 px-3 py-2.5 rounded-xl bg-[#3B6FB6]/20">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F5C518] to-[#FFE066] flex items-center justify-center shadow-lg">
              <User className="w-5 h-5 text-[#1E3A5F]" />
            </div>
            <div>
              <p className="font-semibold text-sm text-white">{getUserName()}</p>
              <p className="text-[#FFE066] text-xs capitalize">{userRole}</p>
            </div>
          </div>
          
          <button
            onClick={onLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors group"
          >
            <LogOut className="w-5 h-5 group-hover:text-red-300 transition-colors" />
            <span className="font-medium group-hover:text-red-300 transition-colors">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;