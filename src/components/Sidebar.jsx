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
  LogOut
} from 'lucide-react';

function Sidebar({ activeTab, setActiveTab, onLogout, isOpen, userRole }) {
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

  const getRoleColor = () => {
    const colors = {
      'parent': 'from-blue-500 to-purple-500',
      'driver': 'from-green-500 to-emerald-500',
      'owner': 'from-orange-500 to-red-500'
    };
    return colors[userRole] || 'from-blue-500 to-purple-500';
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
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => {/* Close sidebar */}}
        />
      )}

      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col
        transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 transition-transform duration-300
        shadow-2xl
      `}>
        <div className="p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className={`p-2 rounded-lg bg-gradient-to-r ${getRoleColor()}`}>
              <Bus className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Trackmate</h1>
              <p className="text-gray-300 text-sm">{getRoleTitle()}</p>
            </div>
          </div>

          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-4">
            Main Navigation
          </h2>
          <nav className="space-y-2">
            {getMenuItems().map((item) => (
              <button
                key={item.label}
                onClick={() => setActiveTab(item.view)}
                className={`flex items-center gap-4 w-full px-4 py-3 rounded-xl text-left ${
                  activeTab === item.view 
                    ? `bg-gradient-to-r ${getRoleColor()} text-white shadow-lg` 
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-8 border-t border-gray-700">
          <div className="flex items-center gap-3 mb-4 px-4 py-2">
            <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${getRoleColor()} flex items-center justify-center`}>
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-sm text-white">{getUserName()}</p>
              <p className="text-gray-400 text-xs capitalize">{userRole}</p>
            </div>
          </div>
          
          <button
            onClick={onLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-gray-700 rounded-xl transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;