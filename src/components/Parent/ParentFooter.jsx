import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

function ParentFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300 mt-12">
      {/* Main Footer Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-blue-500 rounded-lg p-2">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm11 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">TrackMate</h3>
                <p className="text-xs text-gray-400">Safe Transportation</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Providing real-time tracking and peace of mind for parents across multiple schools.
            </p>
            <div className="flex gap-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-full bg-blue-600 hover:bg-blue-500 flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-blue-400 hover:bg-blue-300 flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4 text-white" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-pink-600 hover:bg-pink-500 flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-blue-700 hover:bg-blue-600 flex items-center justify-center transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">QUICK LINKS</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">My Dashboard</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">My Child</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Trip History</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Notifications</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Support</a></li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">FEATURES</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-orange-400 transition-colors">Real-Time Tracking</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">RFID Detection</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Live Alerts</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Trip Reports</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Safety Score</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">CONTACT US</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-3">
                <Phone className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <a href="tel:+1234567890" className="hover:text-blue-400 transition-colors">+1 (234) 567-890</a>
              </li>
              <li className="flex gap-3">
                <Mail className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                <a href="mailto:support@trackmate.com" className="hover:text-orange-400 transition-colors">support@trackmate.com</a>
              </li>
              <li className="flex gap-3">
                <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <span>123 Education Ave, School City, SC 12345</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8"></div>

        {/* Bottom Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="text-gray-400">
            <p>&copy; {currentYear} TrackMate. All rights reserved.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 sm:justify-end">
            <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>

      {/* Trust Badges Section */}
      <div className="bg-gray-800/50 border-t border-gray-700">
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-xs sm:text-sm text-gray-400">
            <div className="space-y-1">
              <p className="text-orange-400 font-bold text-lg">100K+</p>
              <p>Happy Parents</p>
            </div>
            <div className="space-y-1">
              <p className="text-blue-400 font-bold text-lg">500+</p>
              <p>Active Schools</p>
            </div>
            <div className="space-y-1">
              <p className="text-green-400 font-bold text-lg">99.9%</p>
              <p>Uptime</p>
            </div>
            <div className="space-y-1">
              <p className="text-purple-400 font-bold text-lg">24/7</p>
              <p>Support</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default ParentFooter;
