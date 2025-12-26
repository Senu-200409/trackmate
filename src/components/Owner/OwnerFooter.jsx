import React from 'react';
import { Mail, Phone, MapPin, Bus, Users, Route, BarChart3, Shield, Clock, Fuel, Building2 } from 'lucide-react';

function OwnerFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-[#1E3A5F] to-[#0D1B2A] text-gray-300 mt-auto">
      {/* Fleet Overview Bar */}
      <div className="bg-[#3B6FB6]/30 border-b border-[#3B6FB6]/50">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 text-center">
            <div className="p-3 bg-[#1E3A5F]/50 rounded-lg border border-[#3B6FB6]/30">
              <Bus className="w-6 h-6 text-[#F5C518] mx-auto mb-1" />
              <p className="text-white font-bold text-lg">24</p>
              <p className="text-xs text-gray-400">Total Buses</p>
            </div>
            <div className="p-3 bg-[#1E3A5F]/50 rounded-lg border border-[#3B6FB6]/30">
              <Users className="w-6 h-6 text-[#FFE066] mx-auto mb-1" />
              <p className="text-white font-bold text-lg">18</p>
              <p className="text-xs text-gray-400">Active Drivers</p>
            </div>
            <div className="p-3 bg-[#1E3A5F]/50 rounded-lg border border-[#3B6FB6]/30">
              <Route className="w-6 h-6 text-[#F5C518] mx-auto mb-1" />
              <p className="text-white font-bold text-lg">32</p>
              <p className="text-xs text-gray-400">Routes</p>
            </div>
            <div className="p-3 bg-[#1E3A5F]/50 rounded-lg border border-[#3B6FB6]/30">
              <Clock className="w-6 h-6 text-[#FFE066] mx-auto mb-1" />
              <p className="text-white font-bold text-lg">98.5%</p>
              <p className="text-xs text-gray-400">On-Time Rate</p>
            </div>
            <div className="hidden lg:block p-3 bg-[#1E3A5F]/50 rounded-lg border border-[#3B6FB6]/30">
              <Shield className="w-6 h-6 text-green-400 mx-auto mb-1" />
              <p className="text-white font-bold text-lg">4.9</p>
              <p className="text-xs text-gray-400">Safety Score</p>
            </div>
            <div className="hidden lg:block p-3 bg-[#1E3A5F]/50 rounded-lg border border-[#3B6FB6]/30">
              <Fuel className="w-6 h-6 text-[#F5C518] mx-auto mb-1" />
              <p className="text-white font-bold text-lg">12%↓</p>
              <p className="text-xs text-gray-400">Fuel Savings</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-[#F5C518] rounded-lg p-2">
                <Building2 className="w-6 h-6 text-[#1E3A5F]" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">TrackMate</h3>
                <p className="text-xs text-[#FFE066]">Fleet Management</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Comprehensive fleet management solution for modern transportation businesses.
            </p>
            <div className="flex gap-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-full bg-[#3B6FB6] hover:bg-[#F5C518] hover:text-[#1E3A5F] flex items-center justify-center transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-[#3B6FB6] hover:bg-[#F5C518] hover:text-[#1E3A5F] flex items-center justify-center transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </div>
          </div>

          {/* Management Links */}
          <div>
            <h4 className="text-[#F5C518] font-bold text-sm mb-4 uppercase tracking-wider">Fleet Management</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-[#FFE066] transition-colors">Dashboard</a></li>
              <li><a href="#" className="hover:text-[#FFE066] transition-colors">Vehicle Management</a></li>
              <li><a href="#" className="hover:text-[#FFE066] transition-colors">Driver Management</a></li>
              <li><a href="#" className="hover:text-[#FFE066] transition-colors">Route Planning</a></li>
              <li><a href="#" className="hover:text-[#FFE066] transition-colors">Device Management</a></li>
            </ul>
          </div>

          {/* Analytics & Reports */}
          <div>
            <h4 className="text-[#F5C518] font-bold text-sm mb-4 uppercase tracking-wider">Analytics & Reports</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-[#FFE066] transition-colors">Performance Reports</a></li>
              <li><a href="#" className="hover:text-[#FFE066] transition-colors">Fuel Analytics</a></li>
              <li><a href="#" className="hover:text-[#FFE066] transition-colors">Safety Reports</a></li>
              <li><a href="#" className="hover:text-[#FFE066] transition-colors">Student Statistics</a></li>
              <li><a href="#" className="hover:text-[#FFE066] transition-colors">Export Data</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-[#F5C518] font-bold text-sm mb-4 uppercase tracking-wider">Business Support</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-3">
                <Phone className="w-4 h-4 text-[#F5C518] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Business Line</p>
                  <a href="tel:+1234567890" className="hover:text-[#FFE066] transition-colors">+1 (234) 567-890</a>
                </div>
              </li>
              <li className="flex gap-3">
                <Mail className="w-4 h-4 text-[#FFE066] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Email Support</p>
                  <a href="mailto:business@trackmate.com" className="hover:text-[#FFE066] transition-colors">business@trackmate.com</a>
                </div>
              </li>
              <li className="flex gap-3">
                <MapPin className="w-4 h-4 text-[#F5C518] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Headquarters</p>
                  <span>123 Business Park, Suite 100</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#3B6FB6]/30 pt-8"></div>

        {/* Bottom Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="text-gray-400">
            <p>&copy; {currentYear} TrackMate Fleet Management. All rights reserved.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 sm:justify-end">
            <a href="#" className="hover:text-[#FFE066] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#FFE066] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#FFE066] transition-colors">SLA Agreement</a>
            <a href="#" className="hover:text-[#FFE066] transition-colors">API Docs</a>
          </div>
        </div>
      </div>

      {/* Business License Bar */}
      <div className="bg-[#3B6FB6]/20 border-t border-[#3B6FB6]/30">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-500">
            <p>Licensed Fleet Management Software • ISO 27001 Certified • GDPR Compliant</p>
            <p>Version 2.1.0 • Last Updated: December 2025</p>
          </div>
        </div>
      </div>

      {/* Bottom accent bar */}
      <div className="h-1 bg-gradient-to-r from-[#F5C518] via-[#FFE066] to-[#F5C518]"></div>
    </footer>
  );
}

export default OwnerFooter;
