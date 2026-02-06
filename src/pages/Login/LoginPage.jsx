import React, { useState, useEffect } from 'react';
import { Phone, GraduationCap, Shield, Clock, Users, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import UserServices from '../../services/UserServices';

function LoginPage({ onLogin, phoneNumber, setPhoneNumber, otp, setOtp, showOtp, setShowOtp, onNavigateToRegister }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [otpError, setOtpError] = useState('');
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isOtpValid, setIsOtpValid] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [otpSent, setOtpSent] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Phone validation on input change
  useEffect(() => {
    if (phoneNumber.length === 0) {
      setPhoneError('');
      setIsPhoneValid(false);
      return;
    }

    // Check if phone number is numeric only
    if (!/^\d+$/.test(phoneNumber)) {
      setPhoneError('Phone number must contain only digits');
      setIsPhoneValid(false);
      return;
    }

    // Check if phone number has at least 10 digits
    if (phoneNumber.length < 10) {
      setPhoneError(`Phone number must be at least 10 digits (${phoneNumber.length}/10)`);
      setIsPhoneValid(false);
      return;
    }

    if (phoneNumber.length > 10) {
      setPhoneError('Phone number must not exceed 10 digits');
      setIsPhoneValid(false);
      return;
    }

    // Phone is valid
    setPhoneError('');
    setIsPhoneValid(true);
  }, [phoneNumber]);

  // OTP validation on input change
  useEffect(() => {
    if (otp.length === 0) {
      setOtpError('');
      setIsOtpValid(false);
      return;
    }

    // Check if OTP is numeric only
    if (!/^\d+$/.test(otp)) {
      setOtpError('OTP must contain only digits');
      setIsOtpValid(false);
      return;
    }

    // Check if OTP is exactly 6 digits
    if (otp.length < 6) {
      setOtpError(`OTP must be 6 digits (${otp.length}/6)`);
      setIsOtpValid(false);
      return;
    }

    if (otp.length > 6) {
      setOtpError('OTP must be exactly 6 digits');
      setIsOtpValid(false);
      return;
    }

    // OTP is valid
    setOtpError('');
    setIsOtpValid(true);
  }, [otp]);

  // Resend OTP timer countdown
  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    // Allow only numeric input, max 10 digits
    if (/^\d*$/.test(value) && value.length <= 10) {
      setPhoneNumber(value);
      setError('');
    }
  };

  const handleOtpChange = (e) => {
    const value = e.target.value;
    // Allow only numeric input, max 6 digits
    if (/^\d*$/.test(value) && value.length <= 6) {
      setOtp(value);
      setError('');
    }
  };

  const handleSendOtp = async () => {
    setError('');
    setSuccessMessage('');

    if (!isPhoneValid) {
      setPhoneError('Please enter a valid 10-digit phone number');
      return;
    }

    setIsLoading(true);
    try {
      const response = await UserServices.sendOTP(phoneNumber);
      setOtpSent(true);
      setShowOtp(true);
      setResendTimer(30);
      setSuccessMessage('OTP sent successfully to +91 ' + phoneNumber);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setError('');
    setOtp('');
    setOtpError('');
    setIsOtpValid(false);

    setIsLoading(true);
    try {
      const response = await UserServices.sendOTP(phoneNumber);
      
      setResendTimer(30);
      setSuccessMessage('OTP resent successfully');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Failed to resend OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setError('');
    setSuccessMessage('');

    if (!isOtpValid) {
      setOtpError('Please enter a valid 6-digit OTP');
      return;
    }

    setIsLoading(true);
    try {
      // Verify OTP from localStorage
      await UserServices.verifyOTP(phoneNumber, otp);
      
      // Fetch user details to get UserType
      const userResponse = await UserServices.getUserByPhone(phoneNumber);
      const user = userResponse.data;
      
      // Map UserType to role
      let role = 'parent'; // default
      if (user.UserType === 'O') {
        role = 'owner';
      } else if (user.UserType === 'P') {
        role = 'parent';
      } else if (user.UserType === 'D') {
        role = 'driver';
      }
      
      // Store user info in localStorage
      localStorage.setItem('authToken', `token-${Date.now()}`);
      localStorage.setItem('userPhone', phoneNumber);
      localStorage.setItem('userRole', role);
      localStorage.setItem('userType', user.UserType);

      setSuccessMessage('Login successful! Redirecting...');
      
      // Redirect after 500ms
      setTimeout(() => {
        onLogin(role);
      }, 500);
    } catch (err) {
      setError('Invalid OTP. Please check and try again.');
      setOtpError('OTP verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1E3A5F] via-[#3B6FB6] to-[#1E3A5F] p-3 sm:p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-20 sm:w-32 h-20 sm:h-32 bg-[#F5C518] rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-24 sm:w-40 h-24 sm:h-40 bg-[#FFE066] rounded-full blur-3xl"></div>
      </div>

      <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-md">
        {/* Top accent bar */}
        <div className="h-2 bg-gradient-to-r from-[#F5C518] via-[#FFE066] to-[#F5C518]"></div>
        
        <div className="p-6 sm:p-8">
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-2 sm:p-3 rounded-xl bg-[#F5C518] shadow-lg">
                <GraduationCap className="w-6 sm:w-8 h-6 sm:h-8 text-[#1E3A5F]" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1E3A5F]">TrackMate</h1>
            </div>
            <p className="text-[#3B6FB6] font-medium mb-1 text-xs sm:text-sm">School Bus Management System</p>
            <p className="text-[#5C5C5C] text-xs sm:text-sm">Login to access your portal</p>
          </div>

          {/* Show demo credentials */}
          <div className="mt-4 p-3 sm:p-4 bg-[#FFF9E6] rounded-lg border border-[#F5C518]/30 mb-6">
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
          

          <div className="space-y-6">

          <div className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Success Message */}
            {successMessage && (
              <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-green-700">{successMessage}</p>
              </div>
            )}

            {/* LOGIN FORM */}
            <div>
                <h2 className="text-lg sm:text-xl font-semibold text-[#1E3A5F] mb-2">Enter Phone Number</h2>
                <p className="text-xs sm:text-sm text-[#5C5C5C] mb-6">We'll send you an OTP to verify</p>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="phone" className="block text-xs sm:text-sm font-medium text-[#1E3A5F] mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-[#3B6FB6]" />
                      <input
                        id="phone"
                        type="tel"
                        value={phoneNumber}
                        onChange={handlePhoneChange}
                        disabled={showOtp}
                        placeholder="Enter your phone number"
                        aria-label="Phone number"
                        aria-invalid={phoneError ? 'true' : 'false'}
                        className={`w-full px-10 sm:px-12 py-2 sm:py-3 border-2 rounded-xl outline-none transition-all text-sm sm:text-base ${
                          phoneError
                            ? 'border-red-400 focus:ring-2 focus:ring-red-300'
                            : isPhoneValid
                            ? 'border-green-400 focus:ring-2 focus:ring-green-300'
                            : 'border-gray-200 focus:ring-2 focus:ring-[#F5C518] focus:border-[#F5C518]'
                        } ${showOtp ? 'bg-gray-100 text-gray-500' : ''}`}
                      />
                      {isPhoneValid && !showOtp && (
                        <CheckCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-green-600" />
                      )}
                    </div>
                    {phoneError && (
                      <p className="text-xs sm:text-sm text-red-600 mt-2 flex items-center gap-1">
                        <AlertCircle className="w-3 sm:w-4 h-3 sm:h-4" />
                        {phoneError}
                      </p>
                    )}
                  </div>

                  {showOtp && (
                    <div>
                      <label htmlFor="otp" className="block text-sm font-medium text-[#1E3A5F] mb-2">
                        Enter OTP
                      </label>
                      <input
                        id="otp"
                        type="text"
                        value={otp}
                        onChange={handleOtpChange}
                        placeholder="Enter 6-digit OTP"
                        aria-label="One-time password"
                        aria-invalid={otpError ? 'true' : 'false'}
                        className={`w-full px-4 py-3 border-2 rounded-xl outline-none transition-all ${
                          otpError
                            ? 'border-red-400 focus:ring-2 focus:ring-red-300'
                            : isOtpValid
                            ? 'border-green-400 focus:ring-2 focus:ring-green-300'
                            : 'border-gray-200 focus:ring-2 focus:ring-[#F5C518] focus:border-[#F5C518]'
                        }`}
                        maxLength={6}
                      />
                      {isOtpValid && (
                        <CheckCircle className="absolute right-12 top-64 transform -translate-y-1/2 w-5 h-5 text-green-600" />
                      )}
                      {otpError && (
                        <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {otpError}
                        </p>
                      )}
                    </div>
                  )}

                  <button
                    onClick={showOtp ? handleVerifyOtp : handleSendOtp}
                    disabled={isLoading || (!showOtp && !isPhoneValid) || (showOtp && !isOtpValid)}
                    className={`w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold border-b-4 transition-all ${
                      isLoading || (!showOtp && !isPhoneValid) || (showOtp && !isOtpValid)
                        ? 'bg-gray-300 text-gray-500 border-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-[#1E3A5F] to-[#3B6FB6] text-white border-[#F5C518] hover:shadow-lg hover:scale-[1.02] active:scale-95'
                    }`}
                    aria-label={showOtp ? 'Verify and login' : 'Send OTP'}
                  >
                    {isLoading && <Loader className="w-5 h-5 animate-spin" />}
                    {showOtp ? 'Verify & Login' : 'Send OTP'}
                  </button>

                  {showOtp && (
                    <div className="text-center">
                      <p className="text-sm text-[#5C5C5C] mb-3">Didn't receive OTP?</p>
                      <button
                        onClick={handleResendOtp}
                        disabled={resendTimer > 0 || isLoading}
                        className={`text-sm font-medium transition-colors ${
                          resendTimer > 0 || isLoading
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-[#3B6FB6] hover:text-[#1E3A5F]'
                        }`}
                        aria-label="Resend OTP"
                      >
                        {resendTimer > 0
                          ? `Resend OTP in ${resendTimer}s`
                          : 'Resend OTP'}
                      </button>
                    </div>
                  )}
                </div>
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
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-[#5C5C5C] text-sm">
                  Don't have an account?
                  <button
                    onClick={onNavigateToRegister}
                    className="text-[#3B6FB6] font-medium ml-1 hover:text-[#1E3A5F]"
                  >
                    Register here
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;