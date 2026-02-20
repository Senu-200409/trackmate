import React, { useState } from 'react';
import { Phone, GraduationCap, Shield, Clock, Users, AlertCircle, Loader, ArrowLeft, Upload, X, FileText, Building, MapPin } from 'lucide-react';
import UserServices from '../../services/UserServices';
import DriverServices from '../../services/DriverServices';
import ParentServices from '../../services/ParentServices';
import OwnerServices from '../../services/OwnerServices';
import ImageCropper from '../../components/ImageCropper';

function RegisterPage({ onNavigateToLogin }) {
  const [isLoading, setIsLoading] = useState(false);
  const [registerForm, setRegisterForm] = useState({
    tud_user_name: '',
    tud_phone: '',
    tud_user_type: 'P',  // P = Parent, D = Driver, O = Owner
    tud_profile_image: null,
    // Driver-specific fields
    licenseNo: '',
    licenseType: 'CDL-B',
    // Parent-specific fields
    address: '',
    contactNo2: '',
    parentRole: 'Mother',
    // Owner-specific fields
    companyName: ''
  });
  const [registerErrors, setRegisterErrors] = useState({});
  const [registerSuccess, setRegisterSuccess] = useState('');
  const [error, setError] = useState('');
  const [showImageCropper, setShowImageCropper] = useState(false);
  const [croppedImagePreview, setCroppedImagePreview] = useState(null);

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

  const handleImageSelect = () => {
    setShowImageCropper(true);
  };

  const handleImageCropSave = (croppedImageDataUrl) => {
    setCroppedImagePreview(croppedImageDataUrl);
    // Convert data URL to blob for form submission
    fetch(croppedImageDataUrl)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], 'profile-image.png', { type: 'image/png' });
        setRegisterForm(prev => ({ ...prev, tud_profile_image: file }));
      });
  };

  const handleRemoveImage = () => {
    setCroppedImagePreview(null);
    setRegisterForm(prev => ({ ...prev, tud_profile_image: null }));
  };

  const validateRegisterForm = () => {
    const errors = {};

    // Common fields validation
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

    // Role-specific validation
    if (registerForm.tud_user_type === 'D') {
      // Driver validation
      if (!registerForm.licenseNo.trim()) {
        errors.licenseNo = 'License number is required';
      }
      if (!registerForm.licenseType) {
        errors.licenseType = 'License type is required';
      }
    } else if (registerForm.tud_user_type === 'P') {
      // Parent validation
      if (!registerForm.address.trim()) {
        errors.address = 'Address is required';
      }
      if (!registerForm.contactNo2) {
        errors.contactNo2 = 'Secondary contact number is required';
      } else if (!/^\d{10}$/.test(registerForm.contactNo2)) {
        errors.contactNo2 = 'Secondary contact must be exactly 10 digits';
      }
      if (!registerForm.parentRole) {
        errors.parentRole = 'Relationship is required';
      }
    } else if (registerForm.tud_user_type === 'O') {
      // Owner validation
      if (!registerForm.companyName.trim()) {
        errors.companyName = 'Company name is required';
      }
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
      // Step 1: Create user record in Users table
      const response = await UserServices.register(registerForm);
      
      if (response.success) {
        // Extract the generated UserID (returned by the service)
        const userId = response.data?.UserID;
        console.log('Step 1 complete — UserID:', userId);

        if (!userId) {
          setError('Registration succeeded but UserID was not returned. Please contact support.');
          return;
        }

        // Step 2: Insert role-specific data into the corresponding table using the UserID
        let roleCreationSuccess = true;
        let roleCreationError = '';

        if (registerForm.tud_user_type === 'D') {
          // Insert into DriverDetails table
          console.log('Step 2: Creating DriverDetails for UserID', userId);
          const driverResponse = await DriverServices.createDriver({
            UserID: userId,
            LicenseNo: registerForm.licenseNo,
            LicenseType: registerForm.licenseType,
            Status: 'Active'
          });
          if (!driverResponse.success) {
            roleCreationSuccess = false;
            roleCreationError = driverResponse.message || 'Failed to create driver record';
          }
        } else if (registerForm.tud_user_type === 'P') {
          // Insert into ParentDetails table
          console.log('Step 2: Creating ParentDetails for UserID', userId);
          const parentResponse = await ParentServices.createParent({
            UserID: userId,
            Address: registerForm.address,
            ContactNo2: registerForm.contactNo2,
            Role: registerForm.parentRole
          });
          if (!parentResponse.success) {
            roleCreationSuccess = false;
            roleCreationError = parentResponse.message || 'Failed to create parent record';
          }
        } else if (registerForm.tud_user_type === 'O') {
          // Insert into OwnerDetails table
          console.log('Step 2: Creating OwnerDetails for UserID', userId);
          const ownerResponse = await OwnerServices.createOwner({
            UserID: userId,
            CompanyName: registerForm.companyName,
            Status: 'A'
          });
          if (!ownerResponse.success) {
            roleCreationSuccess = false;
            roleCreationError = ownerResponse.message || 'Failed to create owner record';
          }
        }

        if (!roleCreationSuccess) {
          setError(`Account created but ${roleCreationError}. Please contact support.`);
          return;
        }

        setRegisterSuccess('Account created successfully! Redirecting to login...');
        setRegisterForm({
          tud_user_name: '',
          tud_phone: '',
          tud_user_type: 'P',
          tud_profile_image: null,
          licenseNo: '',
          licenseType: 'CDL-B',
          address: '',
          contactNo2: '',
          parentRole: 'Mother',
          companyName: ''
        });
        setRegisterErrors({});
        setCroppedImagePreview(null);

        // Auto-redirect to login after 2 seconds
        setTimeout(() => {
          onNavigateToLogin();
        }, 2000);
      } else {
        setError('Failed to create account. Please try again.');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.response?.data?.Message || 'Failed to create account. Please try again.');
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

                {/* Driver-Specific Fields */}
                {registerForm.tud_user_type === 'D' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-[#1E3A5F] mb-2 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[#3B6FB6]" />
                        Driver License Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="licenseNo"
                        value={registerForm.licenseNo}
                        onChange={handleRegisterChange}
                        placeholder="e.g., CDL-A-12345"
                        className={`w-full px-4 py-3 border-2 rounded-xl outline-none transition-all ${
                          registerErrors.licenseNo
                            ? 'border-red-400 focus:ring-2 focus:ring-red-300'
                            : 'border-gray-200 focus:ring-2 focus:ring-[#F5C518] focus:border-[#F5C518]'
                        }`}
                      />
                      {registerErrors.licenseNo && (
                        <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {registerErrors.licenseNo}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#1E3A5F] mb-2 flex items-center gap-2">
                        <Shield className="w-4 h-4 text-[#3B6FB6]" />
                        License Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="licenseType"
                        value={registerForm.licenseType}
                        onChange={handleRegisterChange}
                        className={`w-full px-4 py-3 border-2 rounded-xl outline-none transition-all ${
                          registerErrors.licenseType
                            ? 'border-red-400 focus:ring-2 focus:ring-red-300'
                            : 'border-gray-200 focus:ring-2 focus:ring-[#F5C518] focus:border-[#F5C518]'
                        }`}
                      >
                        <option value="CDL-A">CDL-A (Class A)</option>
                        <option value="CDL-B">CDL-B (Class B)</option>
                        <option value="CDL-C">CDL-C (Class C)</option>
                      </select>
                      {registerErrors.licenseType && (
                        <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {registerErrors.licenseType}
                        </p>
                      )}
                    </div>
                  </>
                )}

                {/* Parent-Specific Fields */}
                {registerForm.tud_user_type === 'P' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-[#1E3A5F] mb-2 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#3B6FB6]" />
                        Address <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="address"
                        value={registerForm.address}
                        onChange={handleRegisterChange}
                        placeholder="Enter your full address"
                        rows="2"
                        className={`w-full px-4 py-3 border-2 rounded-xl outline-none transition-all resize-none ${
                          registerErrors.address
                            ? 'border-red-400 focus:ring-2 focus:ring-red-300'
                            : 'border-gray-200 focus:ring-2 focus:ring-[#F5C518] focus:border-[#F5C518]'
                        }`}
                      />
                      {registerErrors.address && (
                        <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {registerErrors.address}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#1E3A5F] mb-2 flex items-center gap-2">
                        <Phone className="w-4 h-4 text-[#3B6FB6]" />
                        Secondary Contact Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="contactNo2"
                        value={registerForm.contactNo2}
                        onChange={handleRegisterChange}
                        placeholder="10-digit phone number"
                        maxLength={10}
                        className={`w-full px-4 py-3 border-2 rounded-xl outline-none transition-all ${
                          registerErrors.contactNo2
                            ? 'border-red-400 focus:ring-2 focus:ring-red-300'
                            : 'border-gray-200 focus:ring-2 focus:ring-[#F5C518] focus:border-[#F5C518]'
                        }`}
                      />
                      {registerErrors.contactNo2 && (
                        <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {registerErrors.contactNo2}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#1E3A5F] mb-2 flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#3B6FB6]" />
                        Relationship <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="parentRole"
                        value={registerForm.parentRole}
                        onChange={handleRegisterChange}
                        className={`w-full px-4 py-3 border-2 rounded-xl outline-none transition-all ${
                          registerErrors.parentRole
                            ? 'border-red-400 focus:ring-2 focus:ring-red-300'
                            : 'border-gray-200 focus:ring-2 focus:ring-[#F5C518] focus:border-[#F5C518]'
                        }`}
                      >
                        <option value="Mother">Mother</option>
                        <option value="Father">Father</option>
                        <option value="Guardian">Guardian</option>
                      </select>
                      {registerErrors.parentRole && (
                        <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {registerErrors.parentRole}
                        </p>
                      )}
                    </div>
                  </>
                )}

                {/* Owner-Specific Fields */}
                {registerForm.tud_user_type === 'O' && (
                  <div>
                    <label className="block text-sm font-medium text-[#1E3A5F] mb-2 flex items-center gap-2">
                      <Building className="w-4 h-4 text-[#3B6FB6]" />
                      Company Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={registerForm.companyName}
                      onChange={handleRegisterChange}
                      placeholder="Enter your company name"
                      className={`w-full px-4 py-3 border-2 rounded-xl outline-none transition-all ${
                        registerErrors.companyName
                          ? 'border-red-400 focus:ring-2 focus:ring-red-300'
                          : 'border-gray-200 focus:ring-2 focus:ring-[#F5C518] focus:border-[#F5C518]'
                      }`}
                    />
                    {registerErrors.companyName && (
                      <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {registerErrors.companyName}
                      </p>
                    )}
                  </div>
                )}

                {/* Profile Image (Optional) */}
                <div>
                  <label className="block text-sm font-medium text-[#1E3A5F] mb-2">
                    Profile Image (Optional)
                  </label>

                  {/* Image Preview and Upload Area */}
                  <div className="space-y-3">
                    {croppedImagePreview ? (
                      <div className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-xl bg-gray-50">
                        <div className="relative">
                          <img
                            src={croppedImagePreview}
                            alt="Profile preview"
                            className="w-16 h-16 rounded-full object-cover border-2 border-[#F5C518]"
                          />
                          <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                            title="Remove image"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-[#1E3A5F]">Profile image selected</p>
                          <p className="text-xs text-gray-500">Click to change or remove</p>
                        </div>
                        <button
                          type="button"
                          onClick={handleImageSelect}
                          className="px-3 py-1 text-sm bg-[#1E3A5F] text-white rounded-lg hover:bg-[#3B6FB6] transition-colors"
                        >
                          Change
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={handleImageSelect}
                        className="w-full flex flex-col items-center gap-3 p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-[#F5C518] hover:bg-yellow-50 transition-colors"
                      >
                        <Upload className="w-8 h-8 text-gray-400" />
                        <div className="text-center">
                          <p className="text-sm font-medium text-[#1E3A5F]">Upload Profile Picture</p>
                          <p className="text-xs text-gray-500">Click to select and crop your image</p>
                        </div>
                      </button>
                    )}
                  </div>

                  <p className="text-xs text-gray-500 mt-1">Upload your profile picture (JPG, PNG, max 5MB) - Will be cropped to circular shape</p>
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

      {/* Image Cropper Modal */}
      <ImageCropper
        isOpen={showImageCropper}
        onClose={() => setShowImageCropper(false)}
        onSave={handleImageCropSave}
        title="Crop Profile Picture"
      />
    </div>
  );
}

export default RegisterPage;
