import React, { useState } from 'react';
import { 
  X, 
  AlertCircle, 
  Phone, 
  MapPin, 
  Users, 
  Loader, 
  ChevronRight,
  FileText,
  Upload
} from 'lucide-react';

function RegisterParentModal({ isOpen, onClose, onSuccess }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState('');
  const [showImageCropper, setShowImageCropper] = useState(false);
  const [croppedImagePreview, setCroppedImagePreview] = useState(null);

  const [registerForm, setRegisterForm] = useState({
    tud_user_name: '',
    tud_phone: '',
    tud_user_type: 'P',
    tud_profile_image: null,
    address: '',
    contactNo2: '',
    parentRole: 'Mother'
  });

  const [registerErrors, setRegisterErrors] = useState({});

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm(prev => ({ ...prev, [name]: value }));
    if (registerErrors[name]) {
      setRegisterErrors(prev => ({ ...prev, [name]: '' }));
    }
    setRegisterSuccess('');
    setError('');
  };

  const handleImageCropSave = (croppedImageDataUrl) => {
    setCroppedImagePreview(croppedImageDataUrl);
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

  const validateStep1 = () => {
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
    return errors;
  };

  const validateStep2 = () => {
    const errors = {};
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
    return errors;
  };

  const handleStep1Next = async (e) => {
    e.preventDefault();
    setError('');

    const errors = validateStep1();
    if (Object.keys(errors).length > 0) {
      setRegisterErrors(errors);
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('Phone', registerForm.tud_phone);
      formData.append('UserType', 'P');
      formData.append('UserName', registerForm.tud_user_name);
      formData.append('ProfileImage', registerForm.tud_profile_image || '');

      const response = await fetch('https://trackmate.dockyardsoftware.com/UserDetails/RegisterUser', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log('Parent Step 1 FULL API response:', JSON.stringify(data));

      if (response.ok && data.StatusCode === 200) {
        console.log('Parent Step 1 complete — UserID:', data.UserID);
        localStorage.setItem('registerParentUserID', data.UserID);

        // Fetch ParentID from auto-created record
        try {
          const parentRes = await fetch('https://trackmate.dockyardsoftware.com/ParentDetails/GetAllParentDetails');
          const parentData = await parentRes.json();
          console.log('Fetched all parents to find ParentID for UserID:', data.UserID);
          const parentRecord = parentData?.ResultSet?.find(p => String(p.UserID) === String(data.UserID));
          if (parentRecord?.ParentID) {
            localStorage.setItem('registerParentID', parentRecord.ParentID);
            console.log('Found ParentID:', parentRecord.ParentID);
          } else {
            console.warn('Could not find auto-created parent record for UserID:', data.UserID);
          }
        } catch (fetchErr) {
          console.error('Error fetching parent records:', fetchErr);
        }

        setRegisterErrors({});
        setCurrentStep(2);
      } else {
        setError(data.Message || 'Failed to register parent. Please try again.');
      }
    } catch (err) {
      console.error('Parent Step 1 error:', err);
      setError('Failed to connect to server. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStep2Submit = async (e) => {
    e.preventDefault();
    setError('');
    setRegisterSuccess('');

    const errors = validateStep2();
    if (Object.keys(errors).length > 0) {
      setRegisterErrors(errors);
      return;
    }

    setIsLoading(true);
    try {
      const storedUserID = localStorage.getItem('registerParentUserID');
      const parentID = localStorage.getItem('registerParentID');

      console.log('Parent Step 2 — ParentID from localStorage:', parentID, 'UserID:', storedUserID);

      const formData = new FormData();
      formData.append('ParentID', parentID);
      formData.append('UserID', storedUserID);
      formData.append('Address', registerForm.address);
      formData.append('ContactNo2', registerForm.contactNo2);
      formData.append('Role', registerForm.parentRole);

      console.log('Parent Step 2 — Sending to PutParentDetails:', {
        ParentID: parentID,
        UserID: storedUserID,
        Address: registerForm.address,
        ContactNo2: registerForm.contactNo2,
        Role: registerForm.parentRole
      });

      const response = await fetch('https://trackmate.dockyardsoftware.com/ParentDetails/PutParentDetails', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log('Parent Step 2 FULL API response:', JSON.stringify(data));

      if (data?.StatusCode === 200 || response?.ok) {
        setRegisterSuccess('Parent registered successfully!');
        
        localStorage.removeItem('registerParentUserID');
        localStorage.removeItem('registerParentID');

        setTimeout(() => {
          setRegisterForm({
            tud_user_name: '',
            tud_phone: '',
            tud_user_type: 'P',
            tud_profile_image: null,
            address: '',
            contactNo2: '',
            parentRole: 'Mother'
          });
          setRegisterErrors({});
          setCroppedImagePreview(null);
          setCurrentStep(1);
          setRegisterSuccess('');
          
          if (onSuccess) onSuccess();
          onClose();
        }, 2000);
      } else {
        setError(data?.Message || 'Failed to complete registration. Please try again.');
      }
    } catch (err) {
      console.error('Parent Step 2 error:', err);
      setError('Failed to connect to server. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToStep1 = () => {
    setCurrentStep(1);
    setError('');
    setRegisterErrors({});
  };

  const handleClose = () => {
    setRegisterForm({
      tud_user_name: '',
      tud_phone: '',
      tud_user_type: 'P',
      tud_profile_image: null,
      address: '',
      contactNo2: '',
      parentRole: 'Mother'
    });
    setRegisterErrors({});
    setCroppedImagePreview(null);
    setCurrentStep(1);
    setError('');
    setRegisterSuccess('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-[#1E3A5F]">Register Parent</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 p-4 bg-gray-50">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
            currentStep >= 1 ? 'bg-[#F5C518] text-[#1E3A5F]' : 'bg-gray-300 text-gray-600'
          }`}>
            1
          </div>
          <div className={`h-1 w-6 ${currentStep >= 2 ? 'bg-[#F5C518]' : 'bg-gray-300'}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
            currentStep >= 2 ? 'bg-[#F5C518] text-[#1E3A5F]' : 'bg-gray-300 text-gray-600'
          }`}>
            2
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Error Message */}
          {error && (
            <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {registerSuccess && (
            <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg mb-4">
              <AlertCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-green-700">{registerSuccess}</p>
            </div>
          )}

          {/* STEP 1 */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-[#1E3A5F] mb-2">Basic Information</h3>
                <p className="text-sm text-[#5C5C5C] mb-4">Enter parent's basic details</p>
              </div>

              <form onSubmit={handleStep1Next} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-[#1E3A5F] mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="tud_user_name"
                    value={registerForm.tud_user_name}
                    onChange={handleRegisterChange}
                    placeholder="Parent's full name"
                    className={`w-full px-4 py-3 border-2 rounded-xl outline-none transition-all ${
                      registerErrors.tud_user_name
                        ? 'border-red-400 focus:ring-2 focus:ring-red-300'
                        : 'border-gray-200 focus:ring-2 focus:ring-[#F5C518] focus:border-[#F5C518]'
                    }`}
                  />
                  {registerErrors.tud_user_name && (
                    <p className="text-sm text-red-600 mt-1">{registerErrors.tud_user_name}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-[#1E3A5F] mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#3B6FB6]" />
                    <input
                      type="tel"
                      name="tud_phone"
                      value={registerForm.tud_phone}
                      onChange={handleRegisterChange}
                      placeholder="10-digit phone"
                      maxLength={10}
                      className={`w-full px-12 py-3 border-2 rounded-xl outline-none transition-all ${
                        registerErrors.tud_phone
                          ? 'border-red-400 focus:ring-2 focus:ring-red-300'
                          : 'border-gray-200 focus:ring-2 focus:ring-[#F5C518] focus:border-[#F5C518]'
                      }`}
                    />
                  </div>
                  {registerErrors.tud_phone && (
                    <p className="text-sm text-red-600 mt-1">{registerErrors.tud_phone}</p>
                  )}
                </div>

                {/* Profile Image */}
                <div>
                  <label className="block text-sm font-medium text-[#1E3A5F] mb-2">
                    Profile Image <span className="text-gray-500 text-xs">(Optional)</span>
                  </label>
                  <div className="space-y-2">
                    {croppedImagePreview ? (
                      <div className="flex items-center gap-4 p-3 border-2 border-gray-200 rounded-xl bg-gray-50">
                        <img
                          src={croppedImagePreview}
                          alt="Profile"
                          className="w-10 h-10 rounded-full object-cover border-2 border-[#F5C518]"
                        />
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="text-red-600 hover:text-red-700 ml-auto"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        disabled
                        className="w-full flex flex-col items-center gap-2 p-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-400 text-sm cursor-not-allowed"
                      >
                        <Upload className="w-5 h-5" />
                        Image upload
                      </button>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold border-b-4 transition-all ${
                    isLoading
                      ? 'bg-gray-300 text-gray-500 border-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-[#1E3A5F] to-[#3B6FB6] text-white border-[#F5C518] hover:shadow-lg hover:scale-[1.02] active:scale-95'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      Next
                      <ChevronRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* STEP 2 */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-[#1E3A5F] mb-2">Parent Details</h3>
                <p className="text-sm text-[#5C5C5C] mb-4">Complete parent information</p>
              </div>

              <form onSubmit={handleStep2Submit} className="space-y-4">
                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-[#1E3A5F] mb-2">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="address"
                    value={registerForm.address}
                    onChange={handleRegisterChange}
                    placeholder="Full address"
                    rows="2"
                    className={`w-full px-4 py-3 border-2 rounded-xl outline-none transition-all resize-none ${
                      registerErrors.address
                        ? 'border-red-400 focus:ring-2 focus:ring-red-300'
                        : 'border-gray-200 focus:ring-2 focus:ring-[#F5C518] focus:border-[#F5C518]'
                    }`}
                  />
                  {registerErrors.address && (
                    <p className="text-sm text-red-600 mt-1">{registerErrors.address}</p>
                  )}
                </div>

                {/* Secondary Phone */}
                <div>
                  <label className="block text-sm font-medium text-[#1E3A5F] mb-2">
                    Secondary Contact <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="contactNo2"
                    value={registerForm.contactNo2}
                    onChange={handleRegisterChange}
                    placeholder="10-digit phone"
                    maxLength={10}
                    className={`w-full px-4 py-3 border-2 rounded-xl outline-none transition-all ${
                      registerErrors.contactNo2
                        ? 'border-red-400 focus:ring-2 focus:ring-red-300'
                        : 'border-gray-200 focus:ring-2 focus:ring-[#F5C518] focus:border-[#F5C518]'
                    }`}
                  />
                  {registerErrors.contactNo2 && (
                    <p className="text-sm text-red-600 mt-1">{registerErrors.contactNo2}</p>
                  )}
                </div>

                {/* Relationship */}
                <div>
                  <label className="block text-sm font-medium text-[#1E3A5F] mb-2">
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
                    <p className="text-sm text-red-600 mt-1">{registerErrors.parentRole}</p>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleBackToStep1}
                    disabled={isLoading}
                    className="flex-1 px-6 py-3 rounded-xl font-semibold border-2 border-[#3B6FB6] text-[#3B6FB6] hover:bg-gray-100 transition-all disabled:opacity-50"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold border-b-4 transition-all ${
                      isLoading
                        ? 'bg-gray-300 text-gray-500 border-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-[#1E3A5F] to-[#3B6FB6] text-white border-[#F5C518] hover:shadow-lg hover:scale-[1.02] active:scale-95'
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      'Complete'
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RegisterParentModal;
