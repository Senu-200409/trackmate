import React, { useState, useEffect } from 'react';
import { Phone, GraduationCap, Shield, Clock, Users, AlertCircle, CheckCircle, Loader } from 'lucide-react';

function LoginPage({ onLogin, phoneNumber, setPhoneNumber, otp, setOtp, showOtp, setShowOtp }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [otpError, setOtpError] = useState('');
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isOtpValid, setIsOtpValid] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [otpSent, setOtpSent] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  // Register form states
  const [isRegister, setIsRegister] = useState(false);
  const [registerForm, setRegisterForm] = useState({
    tud_user_name: '',
    tud_phone: '',
    tud_user_type: 'P',  // P = Parent, D = Driver, O = Owner
    tud_profile_image: null
  });
  const [registerErrors, setRegisterErrors] = useState({});
  const [registerSuccess, setRegisterSuccess] = useState('');

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
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
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
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
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
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      let role = 'parent';
      if (phoneNumber === '1111111111') {
        role = 'parent';
      } else if (phoneNumber === '2222222222') {
        role = 'driver';
      } else if (phoneNumber === '3333333333') {
        role = 'owner';
      }

      setSuccessMessage('Login successful! Redirecting...');
      
      // Simulate redirect delay
      setTimeout(() => {
        onLogin(role);
      }, 500);
    } catch (err) {
      setError('Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Register form handlers
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (registerErrors[name]) {
      setRegisterErrors(prev => ({ ...prev, [name]: '' }));
    }
    setRegisterSuccess('');
  };

  const validateRegisterForm = () => {
    const errors = {};

    if (!registerForm.tud_user_name.trim()) {
      errors.tud_user_name = 'User name is required';
    } else if (registerForm.tud_user_name.trim().length < 3) {
      errors.tud_user_name = 'User name must be at least 3 characters';
    }

    if (!registerForm.tud_phone) {
      errors.tud_phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(registerForm.tud_phone)) {
      errors.tud_phone = 'Phone number must be exactly 10 digits';
    }

    if (!registerForm.tud_user_type) {
      errors.tud_user_type = 'User type is required';
    }

    return errors;
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setRegisterSuccess('');
    setError('');

    const errors = validateRegisterForm();
    if (Object.keys(errors).length > 0) {
      setRegisterErrors(errors);
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setRegisterSuccess('Account created successfully! Please log in with your credentials.');
      setRegisterForm({
        tud_user_name: '',
        tud_phone: '',
        tud_user_type: 'P',
        tud_profile_image: null
      });
      setRegisterErrors({});

      // Auto-switch to login after 2 seconds
      setTimeout(() => {
        setIsRegister(false);
        setRegisterSuccess('');
      }, 2000);
    } catch (err) {
      setError('Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
            <p className="text-[#5C5C5C] text-sm">{isRegister ? 'Create your account' : 'Login to access your portal'}</p>
          </div>

          {/* Show demo credentials only on login */}
          {!isRegister && (
            <div className="mt-4 p-4 bg-[#FFF9E6] rounded-lg border border-[#F5C518]/30 mb-6">
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
          )}

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

            {/* Register Success Message */}
            {registerSuccess && (
              <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-green-700">{registerSuccess}</p>
              </div>
            )}

            {/* LOGIN FORM */}
            {!isRegister ? (
              <div>
                <h2 className="text-xl font-semibold text-[#1E3A5F] mb-2">Enter Phone Number</h2>
                <p className="text-[#5C5C5C] mb-6">We'll send you an OTP to verify</p>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-[#1E3A5F] mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#3B6FB6]" />
                      <input
                        id="phone"
                        type="tel"
                        value={phoneNumber}
                        onChange={handlePhoneChange}
                        disabled={showOtp}
                        placeholder="Enter your phone number"
                        aria-label="Phone number"
                        aria-invalid={phoneError ? 'true' : 'false'}
                        className={`w-full px-12 py-3 border-2 rounded-xl outline-none transition-all ${
                          phoneError
                            ? 'border-red-400 focus:ring-2 focus:ring-red-300'
                            : isPhoneValid
                            ? 'border-green-400 focus:ring-2 focus:ring-green-300'
                            : 'border-gray-200 focus:ring-2 focus:ring-[#F5C518] focus:border-[#F5C518]'
                        } ${showOtp ? 'bg-gray-100 text-gray-500' : ''}`}
                      />
                      {isPhoneValid && !showOtp && (
                        <CheckCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-600" />
                      )}
                    </div>
                    {phoneError && (
                      <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
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
            ) : (
              /* REGISTER FORM */
              <div>
                <h2 className="text-xl font-semibold text-[#1E3A5F] mb-2">Create Your Account</h2>
                <p className="text-[#5C5C5C] mb-6">Join TrackMate for safe school transportation</p>
                
                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  {/* User Name */}
                  <div>
                    <label htmlFor="userName" className="block text-sm font-medium text-[#1E3A5F] mb-2">
                      User Name
                    </label>
                    <input
                      id="userName"
                      type="text"
                      name="tud_user_name"
                      value={registerForm.tud_user_name}
                      onChange={handleRegisterChange}
                      placeholder="Your full name"
                      className={`w-full px-4 py-3 border-2 rounded-xl outline-none transition-all ${
                        registerErrors.tud_user_name
                          ? 'border-red-400 focus:ring-2 focus:ring-red-300'
                          : 'border-gray-200 focus:ring-2 focus:ring-[#F5C518] focus:border-[#F5C518]'
                      }`}
                    />
                    {registerErrors.tud_user_name && (
                      <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {registerErrors.tud_user_name}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="regPhone" className="block text-sm font-medium text-[#1E3A5F] mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#3B6FB6]" />
                      <input
                        id="regPhone"
                        type="tel"
                        name="tud_phone"
                        value={registerForm.tud_phone}
                        onChange={handleRegisterChange}
                        placeholder="10-digit phone number"
                        maxLength={10}
                        className={`w-full px-12 py-3 border-2 rounded-xl outline-none transition-all ${
                          registerErrors.tud_phone
                            ? 'border-red-400 focus:ring-2 focus:ring-red-300'
                            : 'border-gray-200 focus:ring-2 focus:ring-[#F5C518] focus:border-[#F5C518]'
                        }`}
                      />
                    </div>
                    {registerErrors.tud_phone && (
                      <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {registerErrors.tud_phone}
                      </p>
                    )}
                  </div>

                  {/* User Type */}
                  <div>
                    <label htmlFor="userType" className="block text-sm font-medium text-[#1E3A5F] mb-2">
                      Account Type
                    </label>
                    <select
                      id="userType"
                      name="tud_user_type"
                      value={registerForm.tud_user_type}
                      onChange={handleRegisterChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl outline-none transition-all focus:ring-2 focus:ring-[#F5C518] focus:border-[#F5C518]"
                    >
                      <option value="P">Parent/Guardian</option>
                      <option value="D">Bus Driver</option>
                      <option value="O">Fleet Owner</option>
                    </select>
                    {registerErrors.tud_user_type && (
                      <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {registerErrors.tud_user_type}
                      </p>
                    )}
                  </div>

                  {/* Profile Image (Optional) */}
                  <div>
                    <label htmlFor="profileImage" className="block text-sm font-medium text-[#1E3A5F] mb-2">
                      Profile Image (Optional)
                    </label>
                    <input
                      id="profileImage"
                      type="file"
                      name="tud_profile_image"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        setRegisterForm(prev => ({ ...prev, tud_profile_image: file }));
                      }}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl outline-none transition-all focus:ring-2 focus:ring-[#F5C518] focus:border-[#F5C518]"
                    />
                    <p className="text-xs text-gray-500 mt-1">Upload your profile picture (JPG, PNG, max 5MB)</p>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold border-b-4 transition-all ${
                      isLoading
                        ? 'bg-gray-300 text-gray-500 border-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-[#1E3A5F] to-[#3B6FB6] text-white border-[#F5C518] hover:shadow-lg hover:scale-[1.02] active:scale-95'
                    }`}
                  >
                    {isLoading && <Loader className="w-5 h-5 animate-spin" />}
                    Create Account
                  </button>
                </form>
              </div>
            )}

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
                {isRegister ? (
                  <p className="text-[#5C5C5C] text-sm">
                    Already have an account?
                    <button
                      onClick={() => {
                        setIsRegister(false);
                        setRegisterForm({ tud_user_name: '', tud_phone: '', tud_user_type: 'P', tud_profile_image: null });
                        setRegisterErrors({});
                        setError('');
                      }}
                      className="text-[#3B6FB6] font-medium ml-1 hover:text-[#1E3A5F]"
                    >
                      Login here
                    </button>
                  </p>
                ) : (
                  <p className="text-[#5C5C5C] text-sm">
                    Don't have an account?
                    <button
                      onClick={() => {
                        setIsRegister(true);
                        setShowOtp(false);
                        setPhoneNumber('');
                        setOtp('');
                        setError('');
                      }}
                      className="text-[#3B6FB6] font-medium ml-1 hover:text-[#1E3A5F]"
                    >
                      Register here
                    </button>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;