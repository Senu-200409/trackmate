import React from 'react';
import { Phone, AlertCircle, Shield, Bus, Navigation, Users, CheckCircle, Clock, Award } from 'lucide-react';

function DriverFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-[#1E3A5F] to-[#0D1B2A] text-gray-300 mt-auto">
      {/* Quick Actions Bar */}
      <div className="bg-[#3B6FB6]/30 border-b border-[#3B6FB6]/50">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button className="flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-colors font-medium shadow-md">
              <Navigation className="w-5 h-5" />
              <span className="hidden sm:inline">Start Route</span>
              <span className="sm:hidden">Start</span>
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-3 bg-[#3B6FB6] hover:bg-[#2D5A9E] text-white rounded-lg transition-colors font-medium shadow-md">
              <Users className="w-5 h-5" />
              <span className="hidden sm:inline">Student List</span>
              <span className="sm:hidden">Students</span>
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-3 bg-[#F5C518] hover:bg-[#E0B000] text-[#1E3A5F] rounded-lg transition-colors font-medium shadow-md">
              <AlertCircle className="w-5 h-5" />
              <span className="hidden sm:inline">Report Issue</span>
              <span className="sm:hidden">Report</span>
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors font-medium shadow-md">
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
              <div className="bg-[#F5C518] rounded-lg p-2">
                <Bus className="w-6 h-6 text-[#1E3A5F]" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">TrackMate</h3>
                <p className="text-xs text-[#FFE066]">Driver Portal</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your trusted companion for safe student transportation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#F5C518] font-bold text-sm mb-4 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-[#FFE066] transition-colors">Dashboard</a></li>
              <li><a href="#" className="hover:text-[#FFE066] transition-colors">My Routes</a></li>
              <li><a href="#" className="hover:text-[#FFE066] transition-colors">Student List</a></li>
              <li><a href="#" className="hover:text-[#FFE066] transition-colors">Trip History</a></li>
            </ul>
          </div>

          {/* Safety Guidelines */}
          <div>
            <h4 className="text-[#F5C518] font-bold text-sm mb-4 uppercase tracking-wider">Safety</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-[#FFE066] transition-colors">Safety Guidelines</a></li>
              <li><a href="#" className="hover:text-[#FFE066] transition-colors">Emergency Procedures</a></li>
              <li><a href="#" className="hover:text-[#FFE066] transition-colors">Report an Incident</a></li>
              <li><a href="#" className="hover:text-[#FFE066] transition-colors">Vehicle Checklist</a></li>
            </ul>
          </div>

          {/* Emergency Contact */}
          <div>
            <h4 className="text-[#F5C518] font-bold text-sm mb-4 uppercase tracking-wider">Emergency</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-red-900/30 border border-red-800/50 rounded-lg">
                <Phone className="w-5 h-5 text-red-400" />
                <div>
                  <p className="text-xs text-gray-400">Emergency Hotline</p>
                  <a href="tel:911" className="text-red-400 font-bold">911</a>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-[#3B6FB6]/20 border border-[#3B6FB6]/50 rounded-lg">
                <Shield className="w-5 h-5 text-[#FFE066]" />
                <div>
                  <p className="text-xs text-gray-400">Fleet Support</p>
                  <a href="tel:+1234567890" className="text-[#FFE066] font-bold">+1 (234) 567-890</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#3B6FB6]/30 pt-6"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>&copy; {currentYear} TrackMate. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-[#FFE066] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#FFE066] transition-colors">Terms</a>
            <a href="#" className="hover:text-[#FFE066] transition-colors">Help</a>
          </div>
        </div>
      </div>

      {/* Driver Stats Bar */}
      <div className="bg-[#3B6FB6]/20 border-t border-[#3B6FB6]/30">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-3 bg-[#1E3A5F]/50 rounded-lg border border-[#3B6FB6]/30">
              <CheckCircle className="w-5 h-5 text-green-400 mx-auto mb-1" />
              <p className="text-white font-bold text-lg">98%</p>
              <p className="text-xs text-gray-400">On-Time Rate</p>
            </div>
            <div className="p-3 bg-[#1E3A5F]/50 rounded-lg border border-[#3B6FB6]/30">
              <Clock className="w-5 h-5 text-[#FFE066] mx-auto mb-1" />
              <p className="text-white font-bold text-lg">1,250</p>
              <p className="text-xs text-gray-400">Trips Done</p>
            </div>
            <div className="p-3 bg-[#1E3A5F]/50 rounded-lg border border-[#3B6FB6]/30">
              <Award className="w-5 h-5 text-[#F5C518] mx-auto mb-1" />
              <p className="text-white font-bold text-lg">4.9★</p>
              <p className="text-xs text-gray-400">Safety Rating</p>
            </div>
            <div className="p-3 bg-[#1E3A5F]/50 rounded-lg border border-[#3B6FB6]/30">
              <Shield className="w-5 h-5 text-green-400 mx-auto mb-1" />
              <p className="text-white font-bold text-lg">0</p>
              <p className="text-xs text-gray-400">Incidents</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom accent bar */}
      <div className="h-1 bg-gradient-to-r from-[#F5C518] via-[#FFE066] to-[#F5C518]"></div>
    </footer>
  );
}

export default DriverFooter;
