import React, { createContext, useState, useCallback, useContext, useEffect } from 'react';

const ProfileImageContext = createContext();

export function ProfileImageProvider({ children }) {
  const [profileImages, setProfileImages] = useState({});

  // Load images from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('profileImages');
      if (saved) {
        setProfileImages(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Failed to load profile images from storage:', error);
    }
  }, []);

  // Save images to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('profileImages', JSON.stringify(profileImages));
    } catch (error) {
      console.error('Failed to save profile images to storage:', error);
    }
  }, [profileImages]);

  const updateProfileImage = useCallback((userId, image) => {
    setProfileImages(prev => ({
      ...prev,
      [userId]: image
    }));
  }, []);

  const getProfileImage = useCallback((userId) => {
    return profileImages[userId] || null;
  }, [profileImages]);

  const removeProfileImage = useCallback((userId) => {
    setProfileImages(prev => {
      const updated = { ...prev };
      delete updated[userId];
      return updated;
    });
  }, []);

  const value = {
    profileImages,
    updateProfileImage,
    getProfileImage,
    removeProfileImage
  };

  return (
    <ProfileImageContext.Provider value={value}>
      {children}
    </ProfileImageContext.Provider>
  );
}

export function useProfileImage() {
  const context = useContext(ProfileImageContext);
  if (!context) {
    throw new Error('useProfileImage must be used within ProfileImageProvider');
  }
  return context;
}

export default ProfileImageContext;
