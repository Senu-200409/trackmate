import React, { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {
  User,
  Clock,
  Bus,
  MapPin,
  AlertTriangle,
  CheckCircle,
  Phone,
  ChevronRight,
  AlertCircle,
  Calendar
} from 'lucide-react';
import ParentHeader from '../../components/Parent/ParentHeader';
import ParentFooter from '../../components/Parent/ParentFooter';
import NotificationServices from '../../services/NotificationServices';
import StudentServices from '../../services/StudentServices';
import BusServices from '../../services/BusServices';
import DriverServices from '../../services/DriverServices';
import UserServices from '../../services/UserServices';

function ParentDashboard({ onMenuClick, setActiveTab, onLogout }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [driverCards, setDriverCards] = useState([]);
  const [driversLoading, setDriversLoading] = useState(true);

  // Fetch notifications from API
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const response = await NotificationServices.getAllNotifications();
        if (response.success && Array.isArray(response.data)) {
          setNotifications(response.data);
        } else {
          setNotifications([]);
        }
      } catch (err) {
        console.error('Error fetching notifications:', err);
        setError('Failed to load notifications');
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  // Resolve driver cards: parent → students → buses → drivers → users
  useEffect(() => {
    const fetchDriverCards = async () => {
      setDriversLoading(true);
      try {
        const parentId = localStorage.getItem('parentId') || localStorage.getItem('registerParentID') || '';

        const [studentsRes, busesRes, driversRes, usersRes] = await Promise.all([
          StudentServices.getAllStudents(),
          BusServices.getAllBuses(),
          DriverServices.getAllDrivers(),
          UserServices.getAllUsers(),
        ]);

        const toArr = (payload) => {
          if (Array.isArray(payload)) return payload;
          if (payload && Array.isArray(payload.ResultSet)) return payload.ResultSet;
          return [];
        };

        const students = toArr(studentsRes?.data);
        const buses    = toArr(busesRes?.data);
        const drivers  = toArr(driversRes?.data);
        const users    = toArr(usersRes?.data);

        // Filter students that belong to this parent
        const myStudents = parentId
          ? students.filter(s => String(s.ParentID || '') === String(parentId))
          : students;

        // Build a card per student that has a bus
        const cards = myStudents
          .filter(s => s.NumberPlate || s.numberPlate)
          .map(s => {
            const plate = (s.NumberPlate || s.numberPlate || '').toString().trim();
            const bus   = buses.find(b => (b.NumberPlate || b.numberPlate || '').toString().trim() === plate);
            const driverRec = bus
              ? drivers.find(d => String(d.DriverID || d.driverId || '') === String(bus.DriverID || bus.driverId || ''))
              : null;
            const userRec = driverRec
              ? users.find(u => String(u.UserID || u.userId || '') === String(driverRec.UserID || driverRec.userId || ''))
              : null;

            return {
              studentName: s.FullName || s.name || 'Student',
              numberPlate: plate,
              driverName:  userRec?.UserName || userRec?.FullName || userRec?.fullName || driverRec?.DriverName || driverRec?.UserName || driverRec?.FullName || '—',
              driverPhone: userRec?.Phone || userRec?.phone || driverRec?.Phone || '—',
              driverId:    driverRec?.DriverID || null,
            };
          });

        setDriverCards(cards);
      } catch (err) {
        console.error('[ParentDashboard] Error resolving driver cards:', err);
        setDriverCards([]);
      } finally {
        setDriversLoading(false);
      }
    };
    fetchDriverCards();
  }, []);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  const [childStatus] = useState({
    name: "Alex Johnson",
    grade: "6th Grade",
    school: "Central High School",
    bus: "BUS-001",
    status: "On the way",
    location: "Approaching Oak Avenue",
    arrival: "8:10 AM",
    progress: 65,
    busDriver: "Michael Johnson",
    driverPhone: "+1-555-0123",
    busNumberPlate: "ABC-1234",
    driverImage: "https://via.placeholder.com/64x64?text=Driver"
  });

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

  const alerts = [
    { id: 1, type: 'warning', title: 'Bus Delayed', message: 'BUS-001 delayed by 5 minutes due to traffic', time: '2 mins ago' },
    { id: 2, type: 'success', title: 'Student Boarded', message: 'Alex has boarded Bus BUS-001', time: '10 mins ago' }
  ];

  // Map refs & init for the map card (keep size the same)
  const parentMapRef = useRef(null);
  const parentMapInstanceRef = useRef(null);
  const parentMarkerRef = useRef(null);

  useEffect(() => {
    if (parentMapRef.current && !parentMapInstanceRef.current) {
      const map = L.map(parentMapRef.current, {
        zoomControl: true,
        attributionControl: false
      }).setView([20.5937, 78.9629], 5); // Default world/India view

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
      }).addTo(map);

      // Simple placeholder marker to indicate bus position until backend wiring
      const latlng = [20.5937, 78.9629];
      parentMarkerRef.current = L.circleMarker(latlng, {
        radius: 8,
        color: '#1E3A5F',
        fillColor: '#3B6FB6',
        fillOpacity: 0.9,
        weight: 2
      }).addTo(map);

      parentMapInstanceRef.current = map;
    }

    return () => {
      if (parentMapInstanceRef.current) {
        parentMapInstanceRef.current.remove();
        parentMapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#FFF9E6] via-[#FFFDF5] to-[#FFF9E6]">
      <ParentHeader notifications={notifications} onMenuClick={onMenuClick} setActiveTab={setActiveTab} onLogout={onLogout} />
      
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6 max-w-7xl mx-auto">
          
          {/* Welcome Header */}
          <div className="bg-gradient-to-r from-[#1E3A5F] via-[#3B6FB6] to-[#1E3A5F] text-white rounded-2xl p-4 sm:p-6 border-b-4 border-[#F5C518]">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-xl sm:text-3xl font-bold mb-2">Welcome, Parent! 👋</h1>
                <p className="text-xs sm:text-base text-[#FFE066]">Track {childStatus.name}'s journey in real-time</p>
              </div>
              <div className="flex flex-col gap-2">
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
            </div>
          </div>

          {/* Quick Status Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {/* Status Card */}
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-green-100">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm text-gray-600">Status</div>
                  <div className="text-lg sm:text-xl font-bold text-gray-900">{childStatus.status}</div>
                  <div className="text-xs text-gray-500">Live</div>
                </div>
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-blue-100">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm text-gray-600">Location</div>
                  <div className="text-lg sm:text-xl font-bold text-gray-900 truncate">{childStatus.location}</div>
                  <div className="text-xs text-gray-500">Current</div>
                </div>
              </div>
            </div>

            {/* Bus Card */}
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-purple-100">
                  <Bus className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm text-gray-600">Bus</div>
                  <div className="text-lg sm:text-xl font-bold text-gray-900">{childStatus.bus}</div>
                  <div className="text-xs text-gray-500">Assigned</div>
                </div>
              </div>
            </div>

            {/* Progress Card */}
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-orange-100">
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm text-gray-600">Progress</div>
                  <div className="text-lg sm:text-xl font-bold text-gray-900">{childStatus.progress}%</div>
                  <div className="text-xs text-gray-500">To School</div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column - Live Map & Child Info */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Child Info Card */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">{childStatus.name}</h3>
                    <div className="flex flex-wrap gap-3 mt-2">
                      <span className="text-sm text-gray-600">Grade: {childStatus.grade}</span>
                      <span className="text-sm text-gray-600">School: {childStatus.school}</span>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Progress to School</h4>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                      style={{ width: `${childStatus.progress}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-600 mt-2">{childStatus.progress}% of journey completed</div>
                </div>
              </div>

              {/* Live Location Map */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="relative h-64">
                  <div ref={parentMapRef} className="absolute inset-0" />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm border border-gray-200 z-10">
                    <p className="text-sm text-gray-700 font-semibold">{childStatus.location}</p>
                    <p className="text-xs text-gray-500">Bus {childStatus.bus}</p>
                  </div>
                </div>
              </div>

              {/* Active Alerts (moved here to balance layout) */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                  Active Alerts
                </h3>
                <div className="space-y-3">
                  {alerts.map(alert => (
                    <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${
                      alert.type === 'warning'
                        ? 'bg-orange-50 border-orange-300'
                        : 'bg-green-50 border-green-300'
                    }`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{alert.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                        </div>
                        <div className="text-xs text-gray-500 whitespace-nowrap ml-2">{alert.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Alerts & Quick Actions */}
            <div className="space-y-6">

              {/* Driver Info - dynamic per student */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Bus className="w-5 h-5 text-blue-600" />
                  Bus Drivers
                </h3>

                {driversLoading ? (
                  <div className="flex items-center justify-center py-6 text-gray-400 text-sm gap-2">
                    <span className="animate-spin inline-block w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full"></span>
                    Loading drivers…
                  </div>
                ) : driverCards.length === 0 ? (
                  <div className="text-center py-6">
                    <Bus className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">No bus assigned to your children yet.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {driverCards.map((card, idx) => (
                      <div key={idx} className="rounded-xl border border-gray-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-4 space-y-3">

                        {/* Student row */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                              <User className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                              <div className="text-xs text-blue-500 font-medium leading-none mb-0.5">Student</div>
                              <div className="text-sm font-semibold text-gray-800 truncate">{card.studentName}</div>
                            </div>
                          </div>
                          <span className="text-xs font-bold bg-[#1E3A5F] text-white px-2 py-0.5 rounded-full tracking-wide flex-shrink-0">{card.numberPlate}</span>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-blue-100" />

                        {/* Driver row */}
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#3B6FB6] to-[#1E3A5F] flex items-center justify-center flex-shrink-0">
                            <User className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs text-gray-400 font-medium leading-none mb-0.5">Driver</div>
                            <div className="font-semibold text-gray-900 text-sm truncate">{card.driverName}</div>
                            <div className="flex items-center gap-1 mt-0.5">
                              <Phone className="w-3 h-3 text-gray-400" />
                              <span className="text-xs text-gray-500">{card.driverPhone}</span>
                            </div>
                          </div>
                          {card.driverPhone && card.driverPhone !== '—' && (
                            <a
                              href={`tel:${card.driverPhone}`}
                              className="flex items-center justify-center w-9 h-9 rounded-full bg-green-500 hover:bg-green-600 transition-colors flex-shrink-0"
                              title="Call driver"
                            >
                              <Phone className="w-4 h-4 text-white" />
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Access</h3>
                <div className="space-y-2">
                  <button 
                    onClick={() => setActiveTab && setActiveTab('my-child')}
                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
                  >
                    <span className="font-medium text-gray-900">Child Details</span>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                  <button 
                    onClick={() => setActiveTab && setActiveTab('history')}
                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
                  >
                    <span className="font-medium text-gray-900">Journey History</span>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                  <button 
                    onClick={() => setActiveTab && setActiveTab('alerts')}
                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
                  >
                    <span className="font-medium text-gray-900">All Alerts</span>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Emergency */}
              <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl border-2 border-red-200 p-6">
                <h3 className="font-bold text-gray-900 mb-2">Emergency</h3>
                <p className="text-sm text-gray-600 mb-4">Immediate assistance needed?</p>
                <button className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-semibold">
                  Emergency Support
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>

      <ParentFooter />
    </div>
  );
}

export default ParentDashboard;