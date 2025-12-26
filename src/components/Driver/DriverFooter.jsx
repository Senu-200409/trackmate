import React from 'react';
import { Phone, AlertCircle, Shield, Bus, Navigation, Users } from 'lucide-react';

function DriverFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-gray-300 mt-12">
      {/* Quick Actions Bar */}
      <div className="bg-slate-800 border-b border-slate-700">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button className="flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-colors font-medium">
              <Navigation className="w-5 h-5" />
              <span className="hidden sm:inline">Start Route</span>
              <span className="sm:hidden">Start</span>
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors font-medium">
              <Users className="w-5 h-5" />
              <span className="hidden sm:inline">Student List</span>
              <span className="sm:hidden">Students</span>
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-3 bg-orange-600 hover:bg-orange-500 text-white rounded-lg transition-colors font-medium">
              <AlertCircle className="w-5 h-5" />
              <span className="hidden sm:inline">Report Issue</span>
              <span className="sm:hidden">Report</span>
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors font-medium">
              <Phone className="w-5 h-5" />
              <span className="hidden sm:inline">Emergency</span>
              <span className="sm:hidden">SOS</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 rounded-lg p-2">
                <Bus className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">TrackMate</h3>
                <p className="text-xs text-gray-400">Driver Portal</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your trusted companion for safe student transportation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">QUICK LINKS</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Dashboard</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">My Routes</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Student List</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Trip History</a></li>
            </ul>
          </div>

          {/* Safety Guidelines */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">SAFETY</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-orange-400 transition-colors">Safety Guidelines</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Emergency Procedures</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Report an Incident</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Vehicle Checklist</a></li>
            </ul>
          </div>

          {/* Emergency Contact */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">EMERGENCY</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-red-900/30 border border-red-800/50 rounded-lg">
                <Phone className="w-5 h-5 text-red-400" />
                <div>
                  <p className="text-xs text-gray-400">Emergency Hotline</p>
                  <a href="tel:911" className="text-red-400 font-bold">911</a>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-900/30 border border-blue-800/50 rounded-lg">
                <Shield className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-xs text-gray-400">Fleet Support</p>
                  <a href="tel:+1234567890" className="text-blue-400 font-bold">+1 (234) 567-890</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 pt-6"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>&copy; {currentYear} TrackMate. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-blue-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Help</a>
          </div>
        </div>
      </div>

      {/* Driver Stats Bar */}
      <div className="bg-slate-800/50 border-t border-slate-700">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-xs sm:text-sm text-gray-400">
            <div className="space-y-1">
              <p className="text-green-400 font-bold text-lg">98%</p>
              <p>On-Time Rate</p>
            </div>
            <div className="space-y-1">
              <p className="text-blue-400 font-bold text-lg">1,250</p>
              <p>Trips Completed</p>
            </div>
            <div className="space-y-1">
              <p className="text-orange-400 font-bold text-lg">4.9★</p>
              <p>Safety Rating</p>
            </div>
            <div className="space-y-1">
              <p className="text-purple-400 font-bold text-lg">0</p>
              <p>Incidents</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default DriverFooter;
