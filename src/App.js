import React, { useState, useEffect } from 'react';
import LoginPage from './pages/Login/LoginPage';
import Sidebar from './components/Sidebar';
import { ProfileImageProvider } from './context/ProfileImageContext';
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
import Devices from './pages/Owner/Devices';

function App() {
  // Initialize all states with defaults
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState('login');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userRole, setUserRole] = useState('parent');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);

  // On component mount, check localStorage and restore session
  useEffect(() => {
    console.log('App mounted - checking localStorage...');
    try {
      const savedLogin = localStorage.getItem('trackmate_login');
      const savedRole = localStorage.getItem('trackmate_role');
      const savedTab = localStorage.getItem('trackmate_tab');
      
      console.log('localStorage data:', { savedLogin, savedRole, savedTab });
      
      if (savedLogin === 'true' && savedRole) {
        console.log('Session found! Restoring...');
        setUserRole(savedRole);
        setActiveTab(savedTab || 'dashboard');
        setCurrentView('dashboard');
      } else {
        console.log('No valid session found');
        setCurrentView('login');
      }
    } catch (error) {
      console.error('Error reading localStorage:', error);
      setCurrentView('login');
    }
    setIsLoading(false);
  }, []);

  // Save session whenever role or tab changes
  useEffect(() => {
    if (!isLoading && currentView === 'dashboard') {
      console.log('Saving session:', { role: userRole, tab: activeTab });
      try {
        localStorage.setItem('trackmate_login', 'true');
        localStorage.setItem('trackmate_role', userRole);
        localStorage.setItem('trackmate_tab', activeTab);
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
    }
  }, [userRole, activeTab, isLoading]);

  const handleLogin = (role) => {
    console.log('Login with role:', role);
    try {
      localStorage.setItem('trackmate_login', 'true');
      localStorage.setItem('trackmate_role', role);
      localStorage.setItem('trackmate_tab', 'dashboard');
    } catch (error) {
      console.error('Error saving login:', error);
    }
    setUserRole(role);
    setActiveTab('dashboard');
    setCurrentView('dashboard');
    setOtp('');
    setShowOtp(false);
  };

  const handleLogout = () => {
    console.log('Logout');
    try {
      localStorage.removeItem('trackmate_login');
      localStorage.removeItem('trackmate_role');
      localStorage.removeItem('trackmate_tab');
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
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

  // Show loading state while checking localStorage
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1E3A5F] via-[#3B6FB6] to-[#1E3A5F]">
        <div className="text-white text-center">
          <div className="text-4xl font-bold mb-4">🚌 TrackMate</div>
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    );
  }

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
      const parentProps = { ...commonProps, setActiveTab, onLogout: handleLogout };
      switch (activeTab) {
        case 'dashboard': return <ParentDashboard {...parentProps} />;
        case 'my-child': return <MyChild {...parentProps} />;
        case 'history': return <History {...parentProps} />;
        case 'alerts': return <Alerts {...parentProps} />;
        case 'settings': return <Settings {...parentProps} />;
        default: return <ParentDashboard {...parentProps} />;
      }
    } else if (userRole === 'driver') {
      const driverProps = { ...commonProps, setActiveTab, onLogout: handleLogout };
      switch (activeTab) {
        case 'dashboard': return <DriverDashboard {...driverProps} />;
        case 'navigation': return <Navigation {...driverProps} />;
        case 'students': return <DriverStudents {...driverProps} />;
        case 'reports': return <Reports {...driverProps} />;
        case 'support': return <Support {...driverProps} />;
        default: return <DriverDashboard {...driverProps} />;
      }
    } else if (userRole === 'owner') {
      const ownerProps = { ...commonProps, setActiveTab, onLogout: handleLogout };
      switch (activeTab) {
        case 'dashboard': return <OwnerDashboard {...ownerProps} />;
        case 'fleet': return <Fleet {...ownerProps} />;
        case 'drivers': return <Drivers {...ownerProps} />;
        case 'devices': return <Devices {...ownerProps} />;
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
    <ProfileImageProvider>
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
    </ProfileImageProvider>
  );
}

export default App;