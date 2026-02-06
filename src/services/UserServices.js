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
      const response = await apiClient.get(`${API_ENDPOINTS.USER.SEND_OTP}?Phone=${phoneNumber}`);
      return {
        success: true,
        message: 'OTP sent successfully',
        data: response.data,
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

      // Mock response until API is available
      const mockUser = {
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
      const formData = new FormData();
      formData.append('Phone', userData.tud_phone);
      formData.append('UserType', userData.tud_user_type);
      formData.append('UserName', userData.tud_user_name);
      formData.append('ProfileImage', userData.tud_profile_image || '');

      const response = await apiClient.post('/UserDetails/RegisterUser', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return {
        success: true,
        message: response.data.Message,
        data: { 
          userId: response.data.UserID,
          statusCode: response.data.StatusCode 
        },
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

      // Mock user until API is available
      return {
        success: true,
        data: { id: userId, name: 'User' },
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
