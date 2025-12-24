import React from 'react';
import { Bus, Phone } from 'lucide-react';

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500">
              <Bus className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Trackmate</h1>
          </div>
          <p className="text-gray-600 mb-2">School Bus Management System</p>
          <p className="text-gray-500 text-sm">Login to access your portal</p>
          
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-xs font-medium text-blue-700 mb-1">Demo Credentials:</p>
            <p className="text-xs text-blue-600">Parent: 1111111111</p>
            <p className="text-xs text-blue-600">Driver: 2222222222</p>
            <p className="text-xs text-blue-600">Owner: 3333333333</p>
            <p className="text-xs text-blue-600">OTP: Any 6 digits</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Enter Phone Number</h2>
            <p className="text-gray-600 mb-6">We'll send you an OTP to verify</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter your phone number"
                    className="w-full px-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              {showOtp && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter OTP
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter 6-digit OTP"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    maxLength={6}
                  />
                </div>
              )}

              <button
                onClick={showOtp ? handleVerifyOtp : handleSendOtp}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-[1.02] active:scale-95"
              >
                {showOtp ? 'Verify & Login' : 'Send OTP'}
              </button>
            </div>
          </div>

          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-gray-500 text-sm">
              By logging in, you agree to our 
              <a href="#" className="text-blue-600 font-medium ml-1">Terms</a> and 
              <a href="#" className="text-blue-600 font-medium ml-1">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;