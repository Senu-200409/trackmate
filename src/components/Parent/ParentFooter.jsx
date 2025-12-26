import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, GraduationCap, Shield, Clock, Award } from 'lucide-react';

function ParentFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-[#1E3A5F] to-[#0D1B2A] text-gray-300 mt-auto">
      {/* Stats Bar */}
      <div className="bg-[#3B6FB6]/30 border-b border-[#3B6FB6]/50">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-3 bg-[#1E3A5F]/50 rounded-lg border border-[#3B6FB6]/30">
              <Shield className="w-6 h-6 text-[#F5C518] mx-auto mb-1" />
              <p className="text-white font-bold text-lg">100%</p>
              <p className="text-xs text-gray-400">Safe Rides</p>
            </div>
            <div className="p-3 bg-[#1E3A5F]/50 rounded-lg border border-[#3B6FB6]/30">
              <Clock className="w-6 h-6 text-[#FFE066] mx-auto mb-1" />
              <p className="text-white font-bold text-lg">24/7</p>
              <p className="text-xs text-gray-400">Live Tracking</p>
            </div>
            <div className="p-3 bg-[#1E3A5F]/50 rounded-lg border border-[#3B6FB6]/30">
              <GraduationCap className="w-6 h-6 text-[#F5C518] mx-auto mb-1" />
              <p className="text-white font-bold text-lg">500+</p>
              <p className="text-xs text-gray-400">Schools</p>
            </div>
            <div className="p-3 bg-[#1E3A5F]/50 rounded-lg border border-[#3B6FB6]/30">
              <Award className="w-6 h-6 text-[#FFE066] mx-auto mb-1" />
              <p className="text-white font-bold text-lg">4.9★</p>
              <p className="text-xs text-gray-400">Parent Rating</p>
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
                <GraduationCap className="w-6 h-6 text-[#1E3A5F]" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">TrackMate</h3>
                <p className="text-xs text-[#FFE066]">Parent Portal</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Providing real-time tracking and peace of mind for parents across multiple schools.
            </p>
            <div className="flex gap-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-full bg-[#3B6FB6] hover:bg-[#F5C518] hover:text-[#1E3A5F] flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-[#3B6FB6] hover:bg-[#F5C518] hover:text-[#1E3A5F] flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-[#3B6FB6] hover:bg-[#F5C518] hover:text-[#1E3A5F] flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-[#3B6FB6] hover:bg-[#F5C518] hover:text-[#1E3A5F] flex items-center justify-center transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#F5C518] font-bold text-sm mb-4 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-[#FFE066] transition-colors">My Dashboard</a></li>
              <li><a href="#" className="hover:text-[#FFE066] transition-colors">My Child</a></li>
              <li><a href="#" className="hover:text-[#FFE066] transition-colors">Trip History</a></li>
              <li><a href="#" className="hover:text-[#FFE066] transition-colors">Notifications</a></li>
              <li><a href="#" className="hover:text-[#FFE066] transition-colors">Support</a></li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-[#F5C518] font-bold text-sm mb-4 uppercase tracking-wider">Features</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-[#FFE066] transition-colors">Real-Time Tracking</a></li>
              <li><a href="#" className="hover:text-[#FFE066] transition-colors">RFID Detection</a></li>
              <li><a href="#" className="hover:text-[#FFE066] transition-colors">Live Alerts</a></li>
              <li><a href="#" className="hover:text-[#FFE066] transition-colors">Trip Reports</a></li>
              <li><a href="#" className="hover:text-[#FFE066] transition-colors">Safety Score</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-[#F5C518] font-bold text-sm mb-4 uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-3">
                <Phone className="w-4 h-4 text-[#F5C518] flex-shrink-0 mt-0.5" />
                <a href="tel:+1234567890" className="hover:text-[#FFE066] transition-colors">+1 (234) 567-890</a>
              </li>
              <li className="flex gap-3">
                <Mail className="w-4 h-4 text-[#FFE066] flex-shrink-0 mt-0.5" />
                <a href="mailto:support@trackmate.com" className="hover:text-[#FFE066] transition-colors">support@trackmate.com</a>
              </li>
              <li className="flex gap-3">
                <MapPin className="w-4 h-4 text-[#F5C518] flex-shrink-0 mt-0.5" />
                <span>123 Education Ave, School City</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#3B6FB6]/30 pt-8"></div>

        {/* Bottom Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="text-gray-400">
            <p>&copy; {currentYear} TrackMate. All rights reserved.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 sm:justify-end">
            <a href="#" className="hover:text-[#FFE066] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#FFE066] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#FFE066] transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>

      {/* Bottom accent bar */}
      <div className="h-1 bg-gradient-to-r from-[#F5C518] via-[#FFE066] to-[#F5C518]"></div>
    </footer>
  );
}

export default ParentFooter;
