import React from 'react';
import { Phone, GraduationCap, Shield, Clock, Users } from 'lucide-react';

function LoginPage({ onLogin, phoneNumber, setPhoneNumber, otp, setOtp, showOtp, setShowOtp }) {
  const handleSendOtp = () => {
    if (phoneNumber.length >= 10) {
      setShowOtp(true);
    }
  };

  const handleVerifyOtp = () => {
    let role = 'parent';
    if (phoneNumber === '1111111111') {
      role = 'parent';
    } else if (phoneNumber === '2222222222') {
      role = 'driver';
    } else if (phoneNumber === '3333333333') {
      role = 'owner';
    }
    onLogin(role);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1E3A5F] via-[#3B6FB6] to-[#1E3A5F] p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#F5C518] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#FFE066] rounded-full blur-3xl"></div>
      </div>

      <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-md">
        {/* Top accent bar */}
        <div className="h-2 bg-gradient-to-r from-[#F5C518] via-[#FFE066] to-[#F5C518]"></div>
        
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-[#F5C518] shadow-lg">
                <GraduationCap className="w-8 h-8 text-[#1E3A5F]" />
              </div>
              <h1 className="text-3xl font-bold text-[#1E3A5F]">TrackMate</h1>
            </div>
            <p className="text-[#3B6FB6] font-medium mb-1">School Bus Management System</p>
            <p className="text-[#5C5C5C] text-sm">Login to access your portal</p>
            
            <div className="mt-4 p-4 bg-[#FFF9E6] rounded-lg border border-[#F5C518]/30">
              <p className="text-xs font-bold text-[#1E3A5F] mb-2">Demo Credentials:</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="text-left">
                  <span className="text-[#5C5C5C]">Parent:</span>
                  <span className="text-[#3B6FB6] font-medium ml-1">1111111111</span>
                </div>
                <div className="text-left">
                  <span className="text-[#5C5C5C]">Driver:</span>
                  <span className="text-[#3B6FB6] font-medium ml-1">2222222222</span>
                </div>
                <div className="text-left">
                  <span className="text-[#5C5C5C]">Owner:</span>
                  <span className="text-[#3B6FB6] font-medium ml-1">3333333333</span>
                </div>
                <div className="text-left">
                  <span className="text-[#5C5C5C]">OTP:</span>
                  <span className="text-[#3B6FB6] font-medium ml-1">Any 6 digits</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-[#1E3A5F] mb-2">Enter Phone Number</h2>
              <p className="text-[#5C5C5C] mb-6">We'll send you an OTP to verify</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#1E3A5F] mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#3B6FB6]" />
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Enter your phone number"
                      className="w-full px-12 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F5C518] focus:border-[#F5C518] outline-none transition-all"
                    />
                  </div>
                </div>

                {showOtp && (
                  <div>
                    <label className="block text-sm font-medium text-[#1E3A5F] mb-2">
                      Enter OTP
                    </label>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter 6-digit OTP"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F5C518] focus:border-[#F5C518] outline-none transition-all"
                      maxLength={6}
                    />
                  </div>
                )}

                <button
                  onClick={showOtp ? handleVerifyOtp : handleSendOtp}
                  className="w-full bg-gradient-to-r from-[#1E3A5F] to-[#3B6FB6] text-white px-6 py-3.5 rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-[1.02] active:scale-95 border-b-4 border-[#F5C518]"
                >
                  {showOtp ? 'Verify & Login' : 'Send OTP'}
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 py-4 border-t border-gray-100">
              <div className="text-center">
                <Shield className="w-5 h-5 text-[#3B6FB6] mx-auto mb-1" />
                <p className="text-xs text-[#5C5C5C]">Secure</p>
              </div>
              <div className="text-center">
                <Clock className="w-5 h-5 text-[#F5C518] mx-auto mb-1" />
                <p className="text-xs text-[#5C5C5C]">24/7 Live</p>
              </div>
              <div className="text-center">
                <Users className="w-5 h-5 text-[#3B6FB6] mx-auto mb-1" />
                <p className="text-xs text-[#5C5C5C]">500+ Schools</p>
              </div>
            </div>

            <div className="text-center pt-2 border-t border-gray-100">
              <p className="text-[#5C5C5C] text-sm">
                By logging in, you agree to our 
                <a href="#" className="text-[#3B6FB6] font-medium ml-1 hover:text-[#1E3A5F]">Terms</a> and 
                <a href="#" className="text-[#3B6FB6] font-medium ml-1 hover:text-[#1E3A5F]">Privacy Policy</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;