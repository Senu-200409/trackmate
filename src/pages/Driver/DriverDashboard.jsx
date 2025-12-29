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
  ChevronRight
} from 'lucide-react';
import DriverHeader from '../../components/Driver/DriverHeader';
import DriverFooter from '../../components/Driver/DriverFooter';

function DriverDashboard({ onMenuClick, setActiveTab, onLogout }) {
  const [notifications] = useState([]);
  const [routeInfo] = useState({
    currentRoute: "Route A - Morning Shift",
    studentsAboard: 24,
    totalStudents: 28,
    timeToDestination: 18,
    nextStop: "Oak Avenue",
    eta: "8:15 AM",
    distanceTraveled: "12.5 km",
    fuelLevel: 85,
    speed: "35 km/h",
    temperature: "18°C",
    busStatus: "Normal",
    currentLocation: "Maple Street"
  });

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
          <div className="bg-gradient-to-r from-[#1E3A5F] via-[#3B6FB6] to-[#1E3A5F] text-white rounded-2xl p-6 border-b-4 border-[#F5C518]">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Good Morning, Michael! 🚌</h1>
                <p className="text-[#FFE066]">{routeInfo.currentRoute} • On Duty</p>
              </div>
              <div className="hidden md:block text-right">
                <div className="text-2xl font-bold">{routeInfo.nextStop}</div>
                <div className="text-sm text-[#FFE066]">Next Stop - {routeInfo.eta}</div>
              </div>
            </div>
          </div>

          

          {/* Quick Status Cards Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Live Route Card */}
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-blue-100">
                  <Navigation className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">On Route</div>
                  <div className="text-xl font-bold text-gray-900">{routeInfo.timeToDestination} min</div>
                  <div className="text-xs text-gray-500">to destination</div>
                </div>
              </div>
            </div>

            {/* Students Aboard Card */}
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-green-100">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Students</div>
                  <div className="text-xl font-bold text-gray-900">{routeInfo.studentsAboard}/{routeInfo.totalStudents}</div>
                  <div className="text-xs text-gray-500">Onboard</div>
                </div>
              </div>
            </div>

            {/* Fuel Level Card */}
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-orange-100">
                  <Battery className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Fuel</div>
                  <div className="text-xl font-bold text-gray-900">{routeInfo.fuelLevel}%</div>
                  <div className="text-xs text-gray-500">Fuel Level</div>
                </div>
              </div>
            </div>

            {/* Vehicle Status Card */}
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-green-100">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Status</div>
                  <div className="text-xl font-bold text-green-600">Normal</div>
                  <div className="text-xs text-gray-500">All systems OK</div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column - Live Tracking & Alerts */}
            <div className="lg:col-span-2 space-y-6">
              {/* RFID Phase Toggle - near map, sticky */}
              <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm rounded-xl border border-yellow-200 shadow-sm p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-700">Driver Status:</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPhaseStyle(currentStep.key).chip}`}>
                    {currentStep.key.replace(/-/g, ' ')}
                  </span>
                </div>
                <button
                  onClick={handleTogglePhase}
                  className={`px-5 py-3 rounded-2xl font-semibold shadow-sm hover:shadow-md transition-shadow text-base ${getPhaseStyle(currentStep.key).button}`}
                >
                  {currentStep.label}
                </button>
              </div>
              
              {/* Live Map Area */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="relative h-64">
                  <div ref={mapRef} className="absolute inset-0" />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm border border-gray-200 z-10">
                    <p className="text-sm text-gray-700 font-semibold">{routeInfo.currentLocation}</p>
                    <p className="text-xs text-gray-500">Current Location</p>
                  </div>
                </div>
                <div className="p-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Current Speed</p>
                      <p className="text-2xl font-bold text-gray-900">{routeInfo.speed}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Temperature</p>
                      <p className="text-2xl font-bold text-gray-900">{routeInfo.temperature}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Alerts Section */}
              {alerts.length > 0 && (
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                    Active Alerts
                  </h3>
                  <div className="space-y-3">
                    {alerts.map(alert => (
                      <div key={alert.id} className={`p-4 rounded-xl border-l-4 ${
                        alert.type === 'warning' 
                          ? 'bg-orange-50 border-orange-300' 
                          : 'bg-blue-50 border-blue-300'
                      }`}>
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-900">{alert.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                          </div>
                          <div className="text-xs text-gray-500 whitespace-nowrap ml-2">{alert.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Quick Actions & Summary */}
            <div className="space-y-6">
              
              {/* Quick Actions */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <button 
                    onClick={() => setActiveTab && setActiveTab('navigation')}
                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
                  >
                    <div className="flex items-center gap-3">
                      <Navigation className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-gray-900">View Route Details</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                  <button 
                    onClick={() => setActiveTab && setActiveTab('reports')}
                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
                  >
                    <div className="flex items-center gap-3">
                      <Zap className="w-5 h-5 text-purple-600" />
                      <span className="font-medium text-gray-900">Performance Report</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                  <button 
                    onClick={() => setActiveTab && setActiveTab('support')}
                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
                  >
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-orange-600" />
                      <span className="font-medium text-gray-900">Get Support</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Route Summary Card */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Route Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span className="text-gray-600">Route Name</span>
                    <span className="font-semibold text-gray-900">Route A</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span className="text-gray-600">Shift</span>
                    <span className="font-semibold text-gray-900">Morning</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span className="text-gray-600">Total Distance</span>
                    <span className="font-semibold text-gray-900">{routeInfo.distanceTraveled}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Next Stop</span>
                    <span className="font-semibold text-gray-900">{routeInfo.nextStop}</span>
                  </div>
                </div>
              </div>

              {/* Vehicle Health Card */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Vehicle Health</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">Fuel Level</span>
                      <span className="text-sm font-semibold text-gray-900">{routeInfo.fuelLevel}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500" style={{ width: `${routeInfo.fuelLevel}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">Engine Temperature</span>
                      <span className="text-sm font-semibold text-gray-900">Normal</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      <DriverFooter />
    </div>
  );
}

export default DriverDashboard;