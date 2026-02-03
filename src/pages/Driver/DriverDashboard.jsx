import React, { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {
  AlertCircle,
  Clock,
  Bus,
  Navigation,
  MapPin,
  Zap,
  Battery,
  Thermometer,
  CheckCircle,
  AlertTriangle,
  Users,
  ChevronRight,
  Calendar,
  Phone,
  Check,
  X,
  QrCode
} from 'lucide-react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import DriverHeader from '../../components/Driver/DriverHeader';
import DriverFooter from '../../components/Driver/DriverFooter';
import NotificationServices from '../../services/NotificationServices';
import StudentServices from '../../services/StudentServices';

function DriverDashboard({ onMenuClick, setActiveTab, onLogout }) {
  const [notifications, setNotifications] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from APIs
  useEffect(() => {
    const fetchDriverData = async () => {
      try {
        setLoading(true);
        const [notificationResponse, studentResponse] = await Promise.all([
          NotificationServices.getAllNotifications(),
          StudentServices.getAllStudents()
        ]);

        if (notificationResponse.success && Array.isArray(notificationResponse.data)) {
          setNotifications(notificationResponse.data);
        } else {
          setNotifications([]);
        }
        if (studentResponse.success && Array.isArray(studentResponse.data)) {
          setStudents(studentResponse.data);
        } else {
          setStudents([]);
        }
      } catch (err) {
        console.error('Error fetching driver data:', err);
        setError('Failed to load driver data');
        setNotifications([]);
        setStudents([]);
      } finally {
        setLoading(false);
      }
    };
    fetchDriverData();
  }, []);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [currentStudentIndex, setCurrentStudentIndex] = useState(0);
  const [studentAttendance, setStudentAttendance] = useState({});
  const [scanning, setScanning] = useState(false);
  const scannerRef = useRef(null);

  // Manual student entry modal state
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [manualRfid, setManualRfid] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');

  // Special messaging modal state
  const [showMessaging, setShowMessaging] = useState(false);
  const [messageType, setMessageType] = useState(''); // 'individual' or 'broadcast'
  const [selectedStudentForMessage, setSelectedStudentForMessage] = useState('');
  const [messageContent, setMessageContent] = useState('');

  useEffect(() => {
    if (scanning) {
      scannerRef.current = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 });
      scannerRef.current.render(handleScan, handleScanError);
    } else {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(console.error);
        scannerRef.current = null;
      }
    }
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(console.error);
      }
    };
  }, [scanning]);

  const [routeInfo, setRouteInfo] = useState({
    currentRoute: "Route A - Morning Shift",
    studentsAboard: 24,
    totalStudents: 28,
    nextStop: "Oak Avenue",
    eta: "8:15 AM",
    busStatus: "Normal",
    currentLocation: "Maple Street"
  });

  // Student roster for route (remove hardcoded data)

  // Initialize attendance
  useEffect(() => {
    const attendance = {};
    students.forEach(student => {
      attendance[student.id] = { status: 'pending' };
    });
    setStudentAttendance(attendance);
  }, [students]);

  // Update date/time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
  };

  // Get next pending student
  const nextStudent = students.find(s => studentAttendance[s.id]?.status === 'pending');

  // Handle student attendance
  const handleStudentAction = (studentId, action) => {
    setStudentAttendance(prev => ({
      ...prev,
      [studentId]: { status: action }
    }));
    
    // Move to next student if this one was marked
    if (action === 'picked-up' || action === 'absent') {
      setTimeout(() => {
        const nextIdx = students.findIndex(s => studentAttendance[s.id]?.status === 'pending' && s.id !== studentId);
        if (nextIdx !== -1) {
          setCurrentStudentIndex(nextIdx);
        }
      }, 500);
    }
  };

  // Call student
  const handleCallStudent = (studentName, studentPhone) => {
    console.log(`Calling ${studentName} at ${studentPhone}`);
    alert(`Initiating call to ${studentName} (${studentPhone})`);
    // In production, this would integrate with phone/calling API
  };

  // Handle QR scan
  const handleScan = (decodedText) => {
    try {
      const route = JSON.parse(decodedText);
      setRouteInfo({
        currentRoute: route.name,
        studentsAboard: 0, // reset
        totalStudents: route.students,
        nextStop: "Starting Point", // default
        eta: route.time,
        busStatus: "Normal",
        currentLocation: "Starting Location"
      });
      setScanning(false);
      alert(`Route loaded: ${route.name}`);
    } catch (err) {
      console.error('Invalid QR code data', err);
    }
  };

  const handleScanError = (errorMessage) => {
    console.error(errorMessage);
  };

  // For testing without camera
  const handleManualInput = () => {
    const input = prompt("Enter route JSON for testing:");
    if (input) {
      handleScan(input);
    }
  };

  // Handle emergency alert
  const handleEmergencyAlert = async () => {
    const emergencyMessage = prompt('Enter emergency message to send to owner:');
    if (emergencyMessage && emergencyMessage.trim()) {
      try {
        const notificationData = {
          type: 'emergency',
          title: 'Emergency Alert from Driver',
          message: emergencyMessage.trim(),
          recipientType: 'owner',
          senderId: 'driver-1', // In a real app, this would come from auth context
          timestamp: new Date().toISOString(),
          priority: 'high'
        };
        
        const response = await NotificationServices.sendNotification(notificationData);
        if (response.success) {
          alert('Emergency alert sent to owner successfully!');
        } else {
          alert('Failed to send emergency alert. Please try again.');
        }
      } catch (error) {
        console.error('Error sending emergency alert:', error);
        alert('Error sending emergency alert. Please check your connection.');
      }
    }
  };

  // Handle manual student entry
  const handleManualEntry = () => {
    setShowManualEntry(true);
  };

  // Handle student selection from dropdown
  const handleStudentSelect = (studentId) => {
    const student = students.find(s => s.id === parseInt(studentId));
    if (student) {
      setSelectedStudent(studentId);
      setManualRfid(student.rfid);
    }
  };

  // Handle manual RFID input
  const handleRfidChange = (rfid) => {
    setManualRfid(rfid);
    // Clear selected student if RFID is manually changed
    const student = students.find(s => s.rfid === rfid);
    if (student) {
      setSelectedStudent(student.id.toString());
    } else {
      setSelectedStudent('');
    }
  };

  // Submit manual entry
  const handleManualSubmit = () => {
    if (!manualRfid.trim()) {
      alert('Please enter an RFID number');
      return;
    }

    const student = students.find(s => s.rfid === manualRfid.trim());
    if (student) {
      handleStudentAction(student.id, 'picked-up');
      setShowManualEntry(false);
      setManualRfid('');
      setSelectedStudent('');
      alert(`Student ${student.name} marked as picked up successfully!`);
    } else {
      alert('RFID number not found. Please check the number and try again.');
    }
  };

  // Close manual entry modal
  const handleCloseManualEntry = () => {
    setShowManualEntry(false);
    setManualRfid('');
    setSelectedStudent('');
  };

  // Special messaging handlers
  const handleSpecialMessage = () => {
    setShowMessaging(true);
    setMessageType('');
    setSelectedStudentForMessage('');
    setMessageContent('');
  };

  const handleMessageTypeSelect = (type) => {
    setMessageType(type);
  };

  const handleSendMessage = async () => {
    if (!messageContent.trim()) {
      alert('Please enter a message');
      return;
    }

    try {
      if (messageType === 'individual') {
        if (!selectedStudentForMessage) {
          alert('Please select a student');
          return;
        }
        const student = students.find(s => s.id === parseInt(selectedStudentForMessage));
        if (student) {
          const notificationData = {
            type: 'special-message',
            title: 'Special Message from Driver',
            message: messageContent.trim(),
            recipientType: 'individual',
            recipientId: student.id,
            senderId: 'driver-1',
            timestamp: new Date().toISOString(),
            priority: 'normal'
          };
          
          const response = await NotificationServices.sendNotification(notificationData);
          if (response.success) {
            alert(`Message sent to ${student.name} successfully!`);
          } else {
            alert('Failed to send message. Please try again.');
          }
        }
      } else if (messageType === 'broadcast') {
        const notificationData = {
          type: 'special-message',
          title: 'Special Message from Driver',
          message: messageContent.trim(),
          recipientType: 'broadcast',
          senderId: 'driver-1',
          timestamp: new Date().toISOString(),
          priority: 'normal'
        };
        
        const response = await NotificationServices.sendNotification(notificationData);
        if (response.success) {
          alert('Broadcast message sent to all students successfully!');
        } else {
          alert('Failed to send broadcast message. Please try again.');
        }
      }
      
      // Close modal and reset state
      setShowMessaging(false);
      setMessageType('');
      setSelectedStudentForMessage('');
      setMessageContent('');
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Error sending message. Please check your connection.');
    }
  };

  const handleCloseMessaging = () => {
    setShowMessaging(false);
    setMessageType('');
    setSelectedStudentForMessage('');
    setMessageContent('');
  };

  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const positionMarkerRef = useRef(null);
  const accuracyCircleRef = useRef(null);
  const watchIdRef = useRef(null);

  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      const map = L.map(mapRef.current, {
        zoomControl: true,
        attributionControl: false
      }).setView([20.5937, 78.9629], 5); // Default to India view

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    if ('geolocation' in navigator) {
      watchIdRef.current = navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude, longitude, accuracy } = pos.coords;
          const map = mapInstanceRef.current;
          if (!map) return;

          const latlng = [latitude, longitude];

          // Initialize or update a simple circle marker (no external icon paths)
          if (!positionMarkerRef.current) {
            positionMarkerRef.current = L.circleMarker(latlng, {
              radius: 8,
              color: '#1E3A5F',
              fillColor: '#3B6FB6',
              fillOpacity: 0.9,
              weight: 2
            }).addTo(map);
          } else {
            positionMarkerRef.current.setLatLng(latlng);
          }

          // Accuracy circle
          if (!accuracyCircleRef.current) {
            accuracyCircleRef.current = L.circle(latlng, {
              radius: accuracy,
              color: '#3B6FB6',
              fillColor: '#3B6FB6',
              fillOpacity: 0.15,
              weight: 1
            }).addTo(map);
          } else {
            accuracyCircleRef.current.setLatLng(latlng);
            accuracyCircleRef.current.setRadius(accuracy);
          }

          // Smoothly pan to current location
          map.setView(latlng, Math.max(map.getZoom(), 15), { animate: true });
        },
        (err) => {
          // If permission denied or error, keep default view
          console.warn('Geolocation error:', err.message);
        },
        { enableHighAccuracy: true, maximumAge: 5000, timeout: 20000 }
      );
    }

    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const alerts = [
    { id: 1, type: 'warning', title: 'Traffic Alert', message: 'Heavy traffic on Main Street ahead', time: '2 mins ago' },
    { id: 2, type: 'info', title: 'Pending Student', message: 'Emma Wilson at Oak Avenue stop not yet boarded', time: '1 min ago' }
  ];

  // RFID phase toggle
  const phaseSteps = [
    { key: 'morning-pickup', label: 'Start Morning Pickup', alert: 'Morning student pickup by driver' },
    { key: 'arrived-school', label: 'Mark Arrived at School', alert: 'Students dropped at school' },
    { key: 'evening-pickup', label: 'Start Evening Pickup', alert: 'After school students picked to the bus' },
    { key: 'home-drop', label: 'Mark Dropped at Home', alert: 'Students dropped at home' }
  ];
  const [phaseIndex, setPhaseIndex] = useState(() => {
    const saved = localStorage.getItem('driverPhaseIndex');
    return saved ? Math.min(phaseSteps.length - 1, Math.max(0, parseInt(saved, 10))) : 0;
  });
  const currentStep = phaseSteps[phaseIndex];

  // Phase-specific color styles (4 distinct themes)
  const phaseStyles = {
    'morning-pickup': {
      button: 'bg-gradient-to-r from-green-600 to-emerald-500 text-white',
      chip: 'bg-green-100 text-green-800 border-green-300'
    },
    'arrived-school': {
      button: 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white',
      chip: 'bg-blue-100 text-blue-800 border-blue-300'
    },
    'evening-pickup': {
      button: 'bg-gradient-to-r from-amber-500 to-yellow-500 text-[#1E3A5F]',
      chip: 'bg-amber-100 text-amber-800 border-amber-300'
    },
    'home-drop': {
      button: 'bg-gradient-to-r from-orange-600 to-red-500 text-white',
      chip: 'bg-orange-100 text-orange-800 border-orange-300'
    }
  };
  const getPhaseStyle = (key) => phaseStyles[key] || {
    button: 'bg-gradient-to-r from-[#F5C518] to-[#FFE066] text-[#1E3A5F]',
    chip: 'bg-yellow-100 text-yellow-800 border-yellow-300'
  };

  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().catch(() => {});
    }
  }, []);

  const emitRfidAlert = (step) => {
    const payload = {
      type: step.key,
      message: step.alert,
      timestamp: new Date().toISOString()
    };
    console.log('RFID Alert:', payload);
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('RFID Alert', { body: step.alert });
    }
  };

  const handleTogglePhase = () => {
    emitRfidAlert(currentStep);
    const next = (phaseIndex + 1) % phaseSteps.length;
    setPhaseIndex(next);
    localStorage.setItem('driverPhaseIndex', String(next));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#FFF9E6] via-[#FFFDF5] to-[#FFF9E6]">
      <DriverHeader notifications={notifications} driverName="Michael" onMenuClick={onMenuClick} setActiveTab={setActiveTab} onLogout={onLogout} />
      
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6 max-w-7xl mx-auto">
          
          {/* Welcome Header with Key Route Info */}
          <div className="bg-gradient-to-r from-[#1E3A5F] via-[#3B6FB6] to-[#1E3A5F] text-white rounded-xl sm:rounded-2xl p-3 sm:p-6 border-b-4 border-[#F5C518]">
            <div className="flex flex-col gap-2 sm:gap-3">
              {/* Top row: Greeting and Route Info */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-3">
                <div>
                  <h1 className="text-lg sm:text-3xl font-bold">Good Morning, Michael! 🚌</h1>
                  <p className="text-xs sm:text-base text-[#FFE066]">{routeInfo.currentRoute} • On Duty</p>
                </div>
                {/* Mobile: Date/Time in top right, Desktop: Separate row */}
                <div className="flex sm:hidden items-center gap-3">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg px-2 py-1 border border-white/20">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#FFE066]" />
                      <span className="text-xs font-medium text-white">{formatDate(currentDateTime)}</span>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg px-2 py-1 border border-white/20">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#FFE066]" />
                      <span className="text-xs font-mono font-medium text-white">{formatTime(currentDateTime)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom row: Date/Time and Action Buttons */}
              <div className="hidden sm:flex sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#FFE066]" />
                      <span className="text-xs sm:text-sm font-medium text-white">{formatDate(currentDateTime)}</span>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#FFE066]" />
                      <span className="text-xs sm:text-sm font-mono font-medium text-white">{formatTime(currentDateTime)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setScanning(true)}
                    className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20 hover:bg-white/20 transition-colors"
                    title="Scan Route QR Code"
                  >
                    <QrCode className="w-4 h-4 text-[#FFE066]" />
                  </button>
                  <button 
                    onClick={handleManualEntry}
                    className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20 hover:bg-white/20 transition-colors"
                    title="Manual Student Entry"
                  >
                    <Users className="w-4 h-4 text-[#FFE066]" />
                  </button>
                  <button 
                    onClick={handleSpecialMessage}
                    className="bg-gradient-to-r from-[#F5C518] to-[#FFE066] rounded-lg px-3 py-2 border border-[#F5C518]/20 hover:from-[#FFE066] hover:to-[#F5C518] transition-colors shadow-sm"
                    title="Special Message"
                  >
                    <span className="text-xs font-medium text-[#1E3A5F]">Special Message</span>
                  </button>
                </div>
              </div>

              {/* Mobile: Action buttons in separate row */}
              <div className="flex sm:hidden justify-center gap-2">
                <button 
                  onClick={() => setScanning(true)}
                  className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20 hover:bg-white/20 transition-colors flex-1 max-w-[120px]"
                  title="Scan Route QR Code"
                >
                  <QrCode className="w-4 h-4 text-[#FFE066] mx-auto" />
                </button>
                <button 
                  onClick={handleManualEntry}
                  className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20 hover:bg-white/20 transition-colors flex-1 max-w-[120px]"
                  title="Manual Student Entry"
                >
                  <Users className="w-4 h-4 text-[#FFE066] mx-auto" />
                </button>
                <button 
                  onClick={handleSpecialMessage}
                  className="bg-gradient-to-r from-[#F5C518] to-[#FFE066] rounded-lg px-3 py-2 border border-[#F5C518]/20 hover:from-[#FFE066] hover:to-[#F5C518] transition-colors shadow-sm flex-1 max-w-[120px]"
                  title="Special Message"
                >
                  <span className="text-xs font-medium text-[#1E3A5F] text-center">Special Message</span>
                </button>
              </div>
            </div>
          </div>

          

          {/* Quick Status Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-3">

            {/* Students Aboard Card */}
            <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-green-100">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-600">Students</div>
                  <div className="text-base sm:text-lg font-bold text-gray-900">{routeInfo.studentsAboard}/{routeInfo.totalStudents}</div>
                </div>
              </div>
            </div>

            {/* Vehicle Status Card */}
            <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-green-100">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-600">Status</div>
                  <div className="text-base sm:text-lg font-bold text-green-600">Normal</div>
                </div>
              </div>
            </div>

            {/* Pending Students Counter */}
            <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-blue-100">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-600">Pending</div>
                  <div className="text-base sm:text-lg font-bold text-blue-600">{students.filter(s => studentAttendance[s.id]?.status === 'pending').length}/{students.length}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Next Pickup Card - Compact */}
          {nextStudent && (
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 sm:p-6 border-2 border-blue-200 shadow-sm overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                {/* Student Info */}
                <div className="flex items-center gap-4 flex-1">
                  <img src={nextStudent.image} alt={nextStudent.name} className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-blue-300 shadow-md flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">{nextStudent.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-600">Grade {nextStudent.grade}</p>
                    <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-700 mt-1">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                      <span>{nextStudent.stop}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => handleStudentAction(nextStudent.id, 'picked-up')}
                    className="flex items-center justify-center gap-2 px-4 py-2 sm:py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-bold transition-colors text-sm sm:text-base whitespace-nowrap"
                  >
                    <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                    Picked
                  </button>
                  <button
                    onClick={() => handleStudentAction(nextStudent.id, 'absent')}
                    className="flex items-center justify-center gap-2 px-4 py-2 sm:py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-bold transition-colors text-sm sm:text-base whitespace-nowrap"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                    Absent
                  </button>
                  <button
                    onClick={() => handleCallStudent(nextStudent.name, nextStudent.phone)}
                    className="flex items-center justify-center gap-2 px-4 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-colors text-sm sm:text-base whitespace-nowrap"
                  >
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                    Call
                  </button>
                </div>
              </div>
            </div>
          )}

          {!nextStudent && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 sm:p-6 border-2 border-green-200 text-center">
              <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-green-600 mx-auto mb-2" />
              <h3 className="text-base sm:text-lg font-bold text-green-900">All Students Marked</h3>
              <p className="text-xs sm:text-sm text-green-700 mt-1">Great job! All students accounted for.</p>
            </div>
          )}

          {/* RFID Phase Toggle - Sticky */}
          <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md rounded-xl border border-yellow-200 shadow-md p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm text-gray-700 font-medium">Driver Status:</span>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPhaseStyle(currentStep.key).chip}`}>
                {currentStep.key.replace(/-/g, ' ')}
              </span>
            </div>
            <button
              onClick={handleTogglePhase}
              className={`px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl font-bold shadow-md hover:shadow-lg transition-shadow text-sm sm:text-base ${getPhaseStyle(currentStep.key).button}`}
            >
              {currentStep.label}
            </button>
          </div>

          {/* Live Map Area - Full Width */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="relative h-64 sm:h-80 lg:h-96">
              <div ref={mapRef} className="absolute inset-0" />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm border border-gray-200 z-10">
                <p className="text-xs sm:text-sm text-gray-700 font-semibold">{routeInfo.currentLocation}</p>
                <p className="text-xs text-gray-500">Current Location</p>
              </div>
            </div>
          </div>

          {/* Student Roster - Under Map */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-200 shadow-sm overflow-hidden">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Student Roster</h2>
            <div className="space-y-2">
              {students.map((student) => {
                const attendance = studentAttendance[student.id];
                const isPickedUp = attendance?.status === 'picked-up';
                const isAbsent = attendance?.status === 'absent';
                
                return (
                  <div
                    key={student.id}
                    className={`flex items-center justify-between p-3 sm:p-4 rounded-lg border transition-all ${
                      isPickedUp
                        ? 'bg-green-50 border-green-300'
                        : isAbsent
                        ? 'bg-red-50 border-red-300'
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <img src={student.image} alt={student.name} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 text-xs sm:text-sm truncate">{student.name}</p>
                        <p className="text-xs text-gray-600">Grade {student.grade} • {student.stop}</p>
                      </div>
                    </div>
                    <div className="flex-shrink-0 ml-2">
                      <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                        isPickedUp
                          ? 'bg-green-200 text-green-800'
                          : isAbsent
                          ? 'bg-red-200 text-red-800'
                          : 'bg-yellow-200 text-yellow-800'
                      }`}>
                        {isPickedUp ? '✓' : isAbsent ? '✗' : '⋯'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Actions & Summary Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button 
                  onClick={handleEmergencyAlert}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-red-50 transition-colors border border-red-200 bg-red-50"
                >
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <span className="font-medium text-red-900 text-sm sm:text-base">Emergency Alert</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-red-400" />
                </button>
                <button 
                  onClick={() => setActiveTab && setActiveTab('navigation')}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
                >
                  <div className="flex items-center gap-3">
                    <Navigation className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-gray-900 text-sm sm:text-base">View Route Details</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
                <button 
                  onClick={() => setActiveTab && setActiveTab('reports')}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
                >
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-purple-600" />
                    <span className="font-medium text-gray-900 text-sm sm:text-base">Performance Report</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
                <button 
                  onClick={() => setActiveTab && setActiveTab('support')}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
                >
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-orange-600" />
                    <span className="font-medium text-gray-900 text-sm sm:text-base">Get Support</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Route Summary Card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Route Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-sm text-gray-600">Route Name</span>
                  <span className="font-semibold text-gray-900 text-sm sm:text-base">Route A</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-sm text-gray-600">Shift</span>
                  <span className="font-semibold text-gray-900 text-sm sm:text-base">Morning</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Next Stop</span>
                  <span className="font-semibold text-gray-900 text-sm sm:text-base">{routeInfo.nextStop}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* QR Scanner Modal */}
      {scanning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm mx-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Scan Route QR Code</h3>
            <div id="reader" style={{ width: '100%' }}></div>
            <div className="flex justify-between gap-2 mt-4">
              <button 
                onClick={handleManualInput}
                className="px-4 py-2 bg-blue-200 text-blue-800 rounded-lg hover:bg-blue-300"
              >
                Manual Input (Test)
              </button>
              <button 
                onClick={() => setScanning(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manual Student Entry Modal */}
      {showManualEntry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-4 sm:p-6 max-w-md mx-auto w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Manual Student Entry</h3>
            <p className="text-sm text-gray-600 mb-4 sm:mb-6">Enter RFID number or select student from the list</p>
            
            <div className="space-y-4 sm:space-y-6">
              {/* Student Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Student (Optional)
                </label>
                <select
                  value={selectedStudent}
                  onChange={(e) => handleStudentSelect(e.target.value)}
                  className="w-full px-3 py-3 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                >
                  <option value="">Choose a student...</option>
                  {students.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.name} - Grade {student.grade} ({student.stop})
                    </option>
                  ))}
                </select>
              </div>

              {/* RFID Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  RFID Number *
                </label>
                <input
                  type="text"
                  value={manualRfid}
                  onChange={(e) => handleRfidChange(e.target.value)}
                  placeholder="Enter RFID number"
                  className="w-full px-3 py-3 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-end gap-3 sm:gap-2 mt-6 sm:mt-8">
              <button 
                onClick={handleCloseManualEntry}
                className="w-full sm:w-auto px-4 py-3 sm:py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 text-sm sm:text-base font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={handleManualSubmit}
                className="w-full sm:w-auto px-4 py-3 sm:py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm sm:text-base font-medium"
              >
                Mark as Picked Up
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Special Messaging Modal */}
      {showMessaging && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-4 sm:p-6 max-w-lg mx-auto w-full max-h-[90vh] overflow-y-auto">
            {!messageType ? (
              // Message Type Selection
              <>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Special Message</h3>
                <p className="text-sm text-gray-600 mb-4 sm:mb-6">Choose how you want to send your message</p>
                
                <div className="space-y-3 sm:space-y-4">
                  <button
                    onClick={() => handleMessageTypeSelect('individual')}
                    className="w-full p-4 border-2 border-blue-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Users className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Individual Message</h4>
                        <p className="text-sm text-gray-600">Send message to a specific student</p>
                      </div>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => handleMessageTypeSelect('broadcast')}
                    className="w-full p-4 border-2 border-green-200 rounded-lg hover:border-green-400 hover:bg-green-50 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <AlertTriangle className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Broadcast Message</h4>
                        <p className="text-sm text-gray-600">Send message to all students on this route</p>
                      </div>
                    </div>
                  </button>
                </div>
                
                <div className="flex justify-end mt-6">
                  <button 
                    onClick={handleCloseMessaging}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 text-sm font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : messageType === 'individual' ? (
              // Individual Message Interface
              <>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Send Individual Message</h3>
                <p className="text-sm text-gray-600 mb-4 sm:mb-6">Select a student and compose your message</p>
                
                <div className="space-y-4 sm:space-y-6">
                  {/* Student Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Student *
                    </label>
                    <select
                      value={selectedStudentForMessage}
                      onChange={(e) => setSelectedStudentForMessage(e.target.value)}
                      className="w-full px-3 py-3 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                      required
                    >
                      <option value="">Choose a student...</option>
                      {students.map((student) => (
                        <option key={student.id} value={student.id}>
                          {student.name} - Grade {student.grade} ({student.stop})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message Content */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      value={messageContent}
                      onChange={(e) => setMessageContent(e.target.value)}
                      placeholder="Enter your message..."
                      rows={4}
                      className="w-full px-3 py-3 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base resize-none"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-end gap-3 sm:gap-2 mt-6 sm:mt-8">
                  <button 
                    onClick={() => setMessageType('')}
                    className="w-full sm:w-auto px-4 py-3 sm:py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 text-sm sm:text-base font-medium"
                  >
                    Back
                  </button>
                  <button 
                    onClick={handleCloseMessaging}
                    className="w-full sm:w-auto px-4 py-3 sm:py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 text-sm sm:text-base font-medium"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSendMessage}
                    className="w-full sm:w-auto px-4 py-3 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm sm:text-base font-medium"
                  >
                    Send Message
                  </button>
                </div>
              </>
            ) : (
              // Broadcast Message Interface
              <>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Send Broadcast Message</h3>
                <p className="text-sm text-gray-600 mb-4 sm:mb-6">This message will be sent to all students on this route</p>
                
                <div className="space-y-4 sm:space-y-6">
                  {/* Message Content */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      value={messageContent}
                      onChange={(e) => setMessageContent(e.target.value)}
                      placeholder="Enter your broadcast message..."
                      rows={4}
                      className="w-full px-3 py-3 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm sm:text-base resize-none"
                      required
                    />
                  </div>
                  
                  {/* Recipients Info */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-green-800">
                      <Users className="w-4 h-4" />
                      <span className="text-sm font-medium">Recipients: All {students.length} students on this route</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-end gap-3 sm:gap-2 mt-6 sm:mt-8">
                  <button 
                    onClick={() => setMessageType('')}
                    className="w-full sm:w-auto px-4 py-3 sm:py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 text-sm sm:text-base font-medium"
                  >
                    Back
                  </button>
                  <button 
                    onClick={handleCloseMessaging}
                    className="w-full sm:w-auto px-4 py-3 sm:py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 text-sm sm:text-base font-medium"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSendMessage}
                    className="w-full sm:w-auto px-4 py-3 sm:py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm sm:text-base font-medium"
                  >
                    Send Broadcast
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <DriverFooter />
    </div>
  );
}

export default DriverDashboard;