import React, { useState } from 'react';
import { Phone, GraduationCap, Shield, Clock, Users, AlertCircle, Loader, ArrowLeft } from 'lucide-react';
import UserServices from '../../services/UserServices';

function RegisterPage({ onNavigateToLogin }) {
  const [isLoading, setIsLoading] = useState(false);
  const [registerForm, setRegisterForm] = useState({
    tud_user_name: '',
    tud_phone: '',
    tud_user_type: 'P',  // P = Parent, D = Driver, O = Owner
    tud_profile_image: null
  });
  const [registerErrors, setRegisterErrors] = useState({});
  const [registerSuccess, setRegisterSuccess] = useState('');
  const [error, setError] = useState('');

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (registerErrors[name]) {
      setRegisterErrors(prev => ({ ...prev, [name]: '' }));
    }
    setRegisterSuccess('');
    setError('');
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
      
      setRegisterSuccess('Account created successfully! Redirecting to login...');
      setRegisterForm({
        tud_user_name: '',
        tud_phone: '',
        tud_user_type: 'P',
        tud_profile_image: null
      });
      setRegisterErrors({});

      // Auto-redirect to login after 2 seconds
      setTimeout(() => {
        onNavigateToLogin();
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
          {/* Back to Login Button */}
          <button
            onClick={onNavigateToLogin}
            className="flex items-center gap-2 text-[#3B6FB6] hover:text-[#1E3A5F] mb-6 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </button>

          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-[#F5C518] shadow-lg">
                <GraduationCap className="w-8 h-8 text-[#1E3A5F]" />
              </div>
              <h1 className="text-3xl font-bold text-[#1E3A5F]">TrackMate</h1>
            </div>
            <p className="text-[#3B6FB6] font-medium mb-1">School Bus Management System</p>
            <p className="text-[#5C5C5C] text-sm">Create your account</p>
          </div>

          <div className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Register Success Message */}
            {registerSuccess && (
              <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-green-700">{registerSuccess}</p>
              </div>
            )}

            {/* REGISTER FORM */}
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
                By registering, you agree to our 
                <a href="#" className="text-[#3B6FB6] font-medium ml-1 hover:text-[#1E3A5F]">Terms</a> and 
                <a href="#" className="text-[#3B6FB6] font-medium ml-1 hover:text-[#1E3A5F]">Privacy Policy</a>
              </p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-[#5C5C5C] text-sm">
                  Already have an account?
                  <button
                    onClick={onNavigateToLogin}
                    className="text-[#3B6FB6] font-medium ml-1 hover:text-[#1E3A5F]"
                  >
                    Login here
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

export default RegisterPage;
