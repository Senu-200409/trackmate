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
import DriverStudents from './pages/Driver/Students';
import OwnerDashboard from './pages/Owner/OwnerDashboard';
import Fleet from './pages/Owner/Fleet';
import Drivers from './pages/Owner/Drivers';
import Routes from './pages/Owner/Routes';
import Analytics from './pages/Owner/Analytics';
import Schools from './pages/Owner/Schools';
import Students from './pages/Owner/Students';
import Parents from './pages/Owner/Parents';

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
      const parentProps = { ...commonProps, setActiveTab };
      switch (activeTab) {
        case 'dashboard': return <ParentDashboard {...parentProps} />;
        case 'my-child': return <MyChild {...parentProps} />;
        case 'history': return <History {...parentProps} />;
        case 'alerts': return <Alerts {...parentProps} />;
        case 'settings': return <Settings {...parentProps} />;
        default: return <ParentDashboard {...parentProps} />;
      }
    } else if (userRole === 'driver') {
      const driverProps = { ...commonProps, setActiveTab };
      switch (activeTab) {
        case 'dashboard': return <DriverDashboard {...driverProps} />;
        case 'navigation': return <Navigation {...driverProps} />;
        case 'students': return <DriverStudents {...driverProps} />;
        case 'reports': return <Reports {...driverProps} />;
        case 'support': return <Support {...driverProps} />;
        default: return <DriverDashboard {...driverProps} />;
      }
    } else if (userRole === 'owner') {
      const ownerProps = { ...commonProps, setActiveTab };
      switch (activeTab) {
        case 'dashboard': return <OwnerDashboard {...ownerProps} />;
        case 'fleet': return <Fleet {...ownerProps} />;
        case 'drivers': return <Drivers {...ownerProps} />;
        case 'routes': return <Routes {...ownerProps} />;
        case 'analytics': return <Analytics {...ownerProps} />;
        case 'schools': return <Schools {...ownerProps} />;
        case 'students': return <Students {...ownerProps} />;
        case 'parents': return <Parents {...ownerProps} />;
        case 'settings': return <Settings {...ownerProps} />;
        default: return <OwnerDashboard {...ownerProps} />;
      }
    }
    // Fallback to parent dashboard with proper props
    return <ParentDashboard onMenuClick={toggleSidebar} setActiveTab={setActiveTab} />;
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