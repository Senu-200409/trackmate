/**
 * User Services
 * API calls for user authentication and profile management
 */

import apiClient, { API_ENDPOINTS } from './AuthService';

// User Services
const UserServices = {
  // Send OTP to phone number
  sendOTP: async (phoneNumber) => {
    try {
      // TODO: Replace with actual API call when backend is ready
      // const url = buildURL(API_ENDPOINTS.AUTH.SEND_OTP);
      // return await httpClient.post(url, { phoneNumber });

      // Mock response
      return {
        success: true,
        message: 'OTP sent successfully',
        data: { phoneNumber, expiresIn: 300 },
      };
    } catch (error) {
      console.error('Error sending OTP:', error);
      throw error;
    }
  },

  // Verify OTP
  verifyOTP: async (phoneNumber, otp) => {
    try {
      // TODO: Replace with actual API call when backend is ready
      // const url = buildURL(API_ENDPOINTS.AUTH.VERIFY_OTP);
      // return await httpClient.post(url, { phoneNumber, otp });

      // Mock response
      const mockUser = mockUsers.find(u => u.phoneNumber === phoneNumber) || {
        id: Date.now(),
        phoneNumber,
        name: 'User',
        role: 'parent',
      };

      return {
        success: true,
        message: 'Login successful',
        data: {
          user: mockUser,
          token: `mock-token-${Date.now()}`,
        },
      };
    } catch (error) {
      console.error('Error verifying OTP:', error);
      throw error;
    }
  },

  // Login user
  login: async (phoneNumber, otp) => {
    try {
      // TODO: Replace with actual API call when backend is ready
      // const url = buildURL(API_ENDPOINTS.AUTH.LOGIN);
      // return await httpClient.post(url, { phoneNumber, otp });

      return UserServices.verifyOTP(phoneNumber, otp);
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },

  // Logout user
  logout: async () => {
    try {
      // TODO: Replace with actual API call when backend is ready
      // const url = buildURL(API_ENDPOINTS.AUTH.LOGOUT);
      // return await httpClient.post(url, {});

      localStorage.removeItem('token');
      return { success: true, message: 'Logged out successfully' };
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  },

  // Register new user
  register: async (userData) => {
    try {
      // TODO: Replace with actual API call when backend is ready
      // const url = buildURL(API_ENDPOINTS.AUTH.REGISTER);
      // return await httpClient.post(url, userData);

      return {
        success: true,
        message: 'Registration successful',
        data: { ...userData, id: Date.now() },
      };
    } catch (error) {
      console.error('Error registering:', error);
      throw error;
    }
  },

  // Get user profile
  getProfile: async (userId) => {
    try {
      // TODO: Replace with actual API call when backend is ready
      // const url = buildURL(API_ENDPOINTS.AUTH.PROFILE);
      // return await httpClient.get(url);

      const user = mockUsers.find(u => u.id === userId);
      return {
        success: true,
        data: user || { id: userId, name: 'User' },
      };
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  },

  // Update user profile
  updateProfile: async (userId, userData) => {
    try {
      // TODO: Replace with actual API call when backend is ready
      // const url = buildURL(API_ENDPOINTS.AUTH.UPDATE_PROFILE);
      // return await httpClient.put(url, userData);

      return {
        success: true,
        message: 'Profile updated successfully',
        data: { id: userId, ...userData },
      };
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  },

  // Get all users (admin only)
  getAllUsers: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.USER.GET_ALL);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  // Get user by ID
  getUserById: async (userId) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.USER.GET_BY_ID, {
        params: { UserID: userId },
      });
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  },

  // Refresh token
  refreshToken: async () => {
    try {
      // TODO: Replace with actual API call when backend is ready
      // const url = buildURL(API_ENDPOINTS.AUTH.REFRESH_TOKEN);
      // return await httpClient.post(url, {});

      return {
        success: true,
        data: { token: `mock-token-${Date.now()}` },
      };
    } catch (error) {
      console.error('Error refreshing token:', error);
      throw error;
    }
  },
};

export default UserServices;
