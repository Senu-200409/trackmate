import React, { useState } from 'react';
import LoginPage from './pages/Login/LoginPage';
import Sidebar from './components/Sidebar';
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

function App() {
  const [currentView, setCurrentView] = useState('login');
  const [sidebarOpen, setSidebarOpen] = useState(false); // Hidden by default
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userRole, setUserRole] = useState('parent');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);

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
    setSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
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
    const commonProps = { onMenuClick: toggleSidebar };
    
    if (userRole === 'parent') {
      switch (activeTab) {
        case 'dashboard': return <ParentDashboard {...commonProps} />;
        case 'my-child': return <MyChild {...commonProps} />;
        case 'history': return <History {...commonProps} />;
        case 'alerts': return <Alerts {...commonProps} />;
        case 'settings': return <Settings {...commonProps} />;
        default: return <ParentDashboard {...commonProps} />;
      }
    } else if (userRole === 'driver') {
      switch (activeTab) {
        case 'dashboard': return <DriverDashboard {...commonProps} />;
        case 'navigation': return <Navigation {...commonProps} />;
        case 'students': return <Reports {...commonProps} />;
        case 'reports': return <Reports {...commonProps} />;
        case 'support': return <Support {...commonProps} />;
        default: return <DriverDashboard {...commonProps} />;
      }
    } else if (userRole === 'owner') {
      switch (activeTab) {
        case 'dashboard': return <OwnerDashboard {...commonProps} />;
        case 'fleet': return <Fleet {...commonProps} />;
        case 'drivers': return <Drivers {...commonProps} />;
        case 'routes': return <Routes {...commonProps} />;
        case 'analytics': return <Analytics {...commonProps} />;
        case 'settings': return <Settings {...commonProps} />;
        default: return <OwnerDashboard {...commonProps} />;
      }
    }
    return <ParentDashboard {...commonProps} />;
  };

  return (
    <div className="relative">
      {/* Sidebar - hidden by default, slides in when toggled */}
      <Sidebar 
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSidebarOpen(false); // Close sidebar after selecting
        }}
        onLogout={handleLogout}
        isOpen={sidebarOpen}
        userRole={userRole}
        onClose={() => setSidebarOpen(false)}
      />
      
      {/* Main Content */}
      {getCurrentPage()}
    </div>
  );
}

export default App;