// Example Integration Guide - Profile Image System

// ============================================================================
// EXAMPLE 1: Using Profile Images in a Dashboard Page
// ============================================================================

import React, { useState, useEffect } from 'react';
import OwnerHeader from '../../components/Owner/OwnerHeader';
import { useProfileImage } from '../../context/ProfileImageContext';

function OwnerDashboard({ onMenuClick, setActiveTab, onLogout }) {
  const [ownerName, setOwnerName] = useState('David Smith');
  const [companyName] = useState('TrackMate Fleet');
  const { getProfileImage, updateProfileImage } = useProfileImage();
  const [ownerImage, setOwnerImage] = useState(null);
  const userId = 'owner-david'; // Unique identifier for the owner

  // Load owner's profile image on mount
  useEffect(() => {
    const savedImage = getProfileImage(userId);
    if (savedImage) {
      setOwnerImage(savedImage);
    }
  }, [userId, getProfileImage]);

  const handleProfileImageUpdate = (newImage) => {
    updateProfileImage(userId, newImage);
    setOwnerImage(newImage);
  };

  return (
    <div>
      <OwnerHeader
        notifications={[]}
        ownerName={ownerName}
        companyName={companyName}
        onMenuClick={onMenuClick}
        setActiveTab={setActiveTab}
        onLogout={onLogout}
        profileImage={ownerImage}
        onProfileImageUpdate={handleProfileImageUpdate}
      />
      {/* Rest of your dashboard content */}
    </div>
  );
}

export default OwnerDashboard;

// ============================================================================
// EXAMPLE 2: Using Profile Images in Driver Dashboard
// ============================================================================

import React, { useState, useEffect } from 'react';
import DriverHeader from '../../components/Driver/DriverHeader';
import { useProfileImage } from '../../context/ProfileImageContext';

function DriverDashboard({ onMenuClick, setActiveTab, onLogout }) {
  const [driverName, setDriverName] = useState('John Doe');
  const { getProfileImage, updateProfileImage } = useProfileImage();
  const [driverImage, setDriverImage] = useState(null);
  const userId = 'driver-john'; // Unique identifier for the driver

  useEffect(() => {
    const savedImage = getProfileImage(userId);
    if (savedImage) {
      setDriverImage(savedImage);
    }
  }, [userId, getProfileImage]);

  const handleProfileImageUpdate = (newImage) => {
    updateProfileImage(userId, newImage);
    setDriverImage(newImage);
  };

  return (
    <div>
      <DriverHeader
        notifications={[]}
        driverName={driverName}
        onMenuClick={onMenuClick}
        setActiveTab={setActiveTab}
        onLogout={onLogout}
        profileImage={driverImage}
        onProfileImageUpdate={handleProfileImageUpdate}
      />
      {/* Rest of your dashboard content */}
    </div>
  );
}

export default DriverDashboard;

// ============================================================================
// EXAMPLE 3: Using Profile Images in Parent Dashboard
// ============================================================================

import React, { useState, useEffect } from 'react';
import ParentHeader from '../../components/Parent/ParentHeader';
import { useProfileImage } from '../../context/ProfileImageContext';

function ParentDashboard({ onMenuClick, setActiveTab, onLogout }) {
  const [parentName, setParentName] = useState('Mrs. Sarah Johnson');
  const { getProfileImage, updateProfileImage } = useProfileImage();
  const [parentImage, setParentImage] = useState(null);
  const userId = 'parent-sarah'; // Unique identifier for the parent

  useEffect(() => {
    const savedImage = getProfileImage(userId);
    if (savedImage) {
      setParentImage(savedImage);
    }
  }, [userId, getProfileImage]);

  const handleProfileImageUpdate = (newImage) => {
    updateProfileImage(userId, newImage);
    setParentImage(newImage);
  };

  return (
    <div>
      <ParentHeader
        notifications={[]}
        parentName={parentName}
        onMenuClick={onMenuClick}
        setActiveTab={setActiveTab}
        onLogout={onLogout}
        profileImage={parentImage}
        onProfileImageUpdate={handleProfileImageUpdate}
      />
      {/* Rest of your dashboard content */}
    </div>
  );
}

export default ParentDashboard;

// ============================================================================
// EXAMPLE 4: Custom Component Using ImageCropper Directly
// ============================================================================

import React, { useState } from 'react';
import ImageCropper from '../../components/ImageCropper';
import { useProfileImage } from '../../context/ProfileImageContext';
import { Upload } from 'lucide-react';

function ProfilePhotoUploader({ userId, onImageSaved }) {
  const [showCropper, setShowCropper] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const { updateProfileImage, getProfileImage } = useProfileImage();

  const handleSaveImage = (croppedImage) => {
    // Save to context
    updateProfileImage(userId, croppedImage);
    
    // Save to local state
    setCurrentImage(croppedImage);
    
    // Notify parent component
    if (onImageSaved) {
      onImageSaved(croppedImage);
    }
    
    // Close modal
    setShowCropper(false);
  };

  return (
    <div className="space-y-4">
      {/* Current Image Display */}
      {currentImage && (
        <div className="flex justify-center">
          <img
            src={currentImage}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-[#1E3A5F]"
          />
        </div>
      )}

      {/* Upload Button */}
      <button
        onClick={() => setShowCropper(true)}
        className="flex items-center gap-2 px-4 py-2 bg-[#1E3A5F] text-white rounded-lg hover:bg-[#3B6FB6] transition-colors"
      >
        <Upload className="w-4 h-4" />
        {currentImage ? 'Change Photo' : 'Upload Photo'}
      </button>

      {/* Image Cropper Modal */}
      <ImageCropper
        isOpen={showCropper}
        onClose={() => setShowCropper(false)}
        onSave={handleSaveImage}
        title="Upload Your Profile Picture"
      />
    </div>
  );
}

export default ProfilePhotoUploader;

// ============================================================================
// EXAMPLE 5: Settings Page with Profile Photo Management
// ============================================================================

import React, { useState, useEffect } from 'react';
import ProfilePhotoUploader from '../../components/ProfilePhotoUploader';
import { useProfileImage } from '../../context/ProfileImageContext';
import { Trash2 } from 'lucide-react';

function SettingsPage({ onMenuClick, setActiveTab, onLogout, userId }) {
  const { getProfileImage, removeProfileImage } = useProfileImage();
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const savedImage = getProfileImage(userId);
    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, [userId, getProfileImage]);

  const handleRemovePhoto = () => {
    if (window.confirm('Are you sure you want to remove your profile photo?')) {
      removeProfileImage(userId);
      setProfileImage(null);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>

      {/* Profile Photo Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Profile Photo</h2>
        
        <ProfilePhotoUploader
          userId={userId}
          onImageSaved={(image) => setProfileImage(image)}
        />

        {profileImage && (
          <button
            onClick={handleRemovePhoto}
            className="mt-4 flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Remove Photo
          </button>
        )}
      </div>

      {/* Other Settings Sections */}
      {/* ... */}
    </div>
  );
}

export default SettingsPage;

// ============================================================================
// EXAMPLE 6: User List with Profile Images
// ============================================================================

import React, { useEffect, useState } from 'react';
import { useProfileImage } from '../../context/ProfileImageContext';
import { User } from 'lucide-react';

function UserList({ users }) {
  const { getProfileImage } = useProfileImage();
  const [userImages, setUserImages] = useState({});

  useEffect(() => {
    // Load all user images
    const images = {};
    users.forEach(user => {
      const image = getProfileImage(user.id);
      if (image) {
        images[user.id] = image;
      }
    });
    setUserImages(images);
  }, [users, getProfileImage]);

  return (
    <div className="space-y-4">
      {users.map(user => (
        <div key={user.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
          {userImages[user.id] ? (
            <img
              src={userImages[user.id]}
              alt={user.name}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="w-6 h-6 text-gray-400" />
            </div>
          )}
          
          <div className="flex-1">
            <div className="font-semibold text-gray-900">{user.name}</div>
            <div className="text-sm text-gray-600">{user.email}</div>
          </div>
          
          <div className="text-sm text-gray-500">{user.role}</div>
        </div>
      ))}
    </div>
  );
}

export default UserList;

// ============================================================================
// QUICK REFERENCE - Key Integration Points
// ============================================================================

/*
1. WRAP YOUR APP WITH PROVIDER
   In App.js:
   <ProfileImageProvider>
     {/* Your app content */}
   </ProfileImageProvider>

2. GET/SET IMAGES IN COMPONENTS
   const { updateProfileImage, getProfileImage, removeProfileImage } = useProfileImage();

3. PASS TO HEADERS
   <OwnerHeader
     profileImage={ownerImage}
     onProfileImageUpdate={handleImageUpdate}
   />

4. UPDATE USER ID
   Replace 'owner-david', 'driver-john', 'parent-sarah' with actual user IDs
   Use unique, consistent identifiers for each user

5. OPTIONAL: BACKEND INTEGRATION
   When ready to persist to database:
   - Call backend API on onProfileImageUpdate
   - Fetch images on mount via API instead of localStorage
   - Keep localStorage as fallback/cache
*/
