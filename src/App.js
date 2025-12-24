import React, { useState } from 'react';
import LoginPage from './pages/Login/LoginPage';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import ParentDashboard from './pages/Parent/ParentDashboard';
import MyChild from './pages/Parent/MyChild';
import History from './pages/Parent/History';
import Alerts from './pages/Parent/Alerts';
import Settings from './pages/Parent/Settings';
import DriverDashboard from './pages/Driver/DriverDashboard';
import Navigation from './pages/Driver/Navigation';
import Reports from './pages/Driver/Reports';
import Support from './pages/Driver/Support';
import OwnerDashboard from './pages/Owner/OwnerDashboard';
import Fleet from './pages/Owner/Fleet';
import Drivers from './pages/Owner/Drivers';
import Routes from './pages/Owner/Routes';
import Analytics from './pages/Owner/Analytics';
import { Menu, X } from 'lucide-react';
function App() {
  const [currentView, setCurrentView] = useState('login');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userRole, setUserRole] = useState('parent');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Bus Departure Delayed",
      message: "Bus BUS-001 delayed by 5 minutes due to traffic",
      time: "2 mins ago",
      type: "warning"
    },
    {
      id: 2,
      title: "Student Boarded",
      message: "Alex has successfully boarded Bus BUS-001",
      time: "10 mins ago",
      type: "success"
    },
    {
      id: 3,
      title: "Route Alert",
      message: "Route modified - new stop added at Oak Avenue",
      time: "1 hour ago",
      type: "info"
    }
  ]);

  const handleLogin = (role) => {
    setUserRole(role);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setCurrentView('login');
    setPhoneNumber('');
    setOtp('');
    setShowOtp(false);
    setUserRole('parent');
    setActiveTab('dashboard');
  };

  if (currentView === 'login') {
    return (
      <LoginPage
        onLogin={handleLogin}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        otp={otp}
        setOtp={setOtp}
        showOtp={showOtp}
        setShowOtp={setShowOtp}
      />
    );
  }

  const getCurrentPage = () => {
    if (userRole === 'parent') {
      switch (activeTab) {
        case 'dashboard': return <ParentDashboard />;
        case 'my-child': return <MyChild />;
        case 'history': return <History />;
        case 'alerts': return <Alerts />;
        case 'settings': return <Settings />;
        default: return <ParentDashboard />;
      }
    } else if (userRole === 'driver') {
      switch (activeTab) {
        case 'dashboard': return <DriverDashboard />;
        case 'navigation': return <Navigation />;
        case 'students': return <Reports />;
        case 'reports': return <Reports />;
        case 'support': return <Support />;
        default: return <DriverDashboard />;
      }
    } else if (userRole === 'owner') {
      switch (activeTab) {
        case 'dashboard': return <OwnerDashboard />;
        case 'fleet': return <Fleet />;
        case 'drivers': return <Drivers />;
        case 'routes': return <Routes />;
        case 'analytics': return <Analytics />;
        case 'settings': return <Settings />;
        default: return <OwnerDashboard />;
      }
    }
    return <ParentDashboard />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <div className="flex">
        <Sidebar 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onLogout={handleLogout}
          isOpen={sidebarOpen}
          userRole={userRole}
        />
        
        <div className="flex-1 overflow-x-hidden">
          <Navbar notifications={notifications} userRole={userRole} />
          
          <main className="p-4 md:p-6">
            {getCurrentPage()}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;