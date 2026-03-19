/**
 * User Services
 * API calls for user authentication and profile management
 */

import apiClient, { API_ENDPOINTS } from './AuthService';
import { clearStoredSession } from '../utils/session';

const OTP_FRIENDLY_MESSAGES = [
  {
    match: /not registered|user not found|no user/i,
    message: 'This phone number is not registered. Please register first.',
  },
  {
    match: /inactive|disabled|blocked|deactivated/i,
    message: 'Your account is inactive. Please contact support.',
  },
  {
    match: /invalid otp|otp invalid|wrong otp|incorrect otp/i,
    message: 'The OTP you entered is invalid. Please check and try again.',
  },
  {
    match: /otp expired|expired otp|timeout/i,
    message: 'This OTP has expired. Please request a new OTP.',
  },
  {
    match: /otp session|send otp first|phone number does not match/i,
    message: 'Please request a fresh OTP and try again.',
  },
];

const toNumberOrNull = (value) => {
  if (value === null || value === undefined || value === '') {
    return null;
  }
  const parsed = Number(value);
  return Number.isNaN(parsed) ? null : parsed;
};

const getResponseStatusCode = (payload = {}) => {
  return toNumberOrNull(payload.StatusCode ?? payload.statusCode ?? payload.Code ?? payload.code);
};

const isSuccessStatusCode = (statusCode) => {
  return statusCode === null || statusCode === 200;
};

const createServiceError = (message, code = null, payload = null) => {
  const err = new Error(message || 'Request failed');
  err.backendCode = code;
  err.backendPayload = payload;
  return err;
};

const ensureResponseSuccess = (payload, fallbackMessage) => {
  const statusCode = getResponseStatusCode(payload);
  if (!isSuccessStatusCode(statusCode)) {
    throw createServiceError(payload?.Message || fallbackMessage, statusCode, payload);
  }
};

const isActiveUserStatus = (status) => {
  if (status === null || status === undefined || status === '') {
    return true;
  }
  const normalized = String(status).trim().toUpperCase();
  return normalized === 'A' || normalized === 'ACTIVE' || normalized === '1' || normalized === 'TRUE';
};

// User Services
const UserServices = {
  getFriendlyOtpErrorMessage: (error, fallback = 'Unable to process OTP request. Please try again.') => {
    const backendMessage =
      error?.backendPayload?.Message
      || error?.response?.data?.Message
      || error?.message
      || '';

    const lowerMessage = String(backendMessage).trim();
    const mapped = OTP_FRIENDLY_MESSAGES.find((entry) => entry.match.test(lowerMessage));
    return mapped ? mapped.message : (lowerMessage || fallback);
  },

  // Send OTP to phone number
  sendOTP: async (phoneNumber) => {
    try {
      const response = await apiClient.post(
        `${API_ENDPOINTS.USER.SEND_OTP}?Phone=${phoneNumber}`
      );

      ensureResponseSuccess(response.data, 'Failed to send OTP.');

      const otpValue = response.data?.ResultSet;
      if (!otpValue) {
        throw createServiceError('OTP was not generated. Please try again.', getResponseStatusCode(response.data), response.data);
      }
      
      // Always store the phone number after successful OTP send
      localStorage.setItem('otpPhone', phoneNumber);
      
      // Store OTP from ResultSet (backend returns OTP in ResultSet field)
      localStorage.setItem('sentOtp', otpValue);
      
      // Log for debugging
      console.log('OTP sent to phone:', phoneNumber);
      console.log('OTP response data:', response.data);
      
      return {
        success: true,
        message: response.data?.Message || 'OTP sent successfully',
        data: response.data,
      };
    } catch (error) {
      console.error('Error sending OTP:', error);
      throw error;
    }
  },

  // Verify OTP by comparing with localStorage
  verifyOTP: async (phoneNumber, otp) => {
    try {
      // Get OTP from localStorage
      const storedOtp = localStorage.getItem('sentOtp');
      const storedPhone = localStorage.getItem('otpPhone');
      
      // Log for debugging
      console.log('Verifying OTP...');
      console.log('Stored phone:', storedPhone, 'Input phone:', phoneNumber);
      console.log('Stored OTP:', storedOtp, 'Input OTP:', otp);
      
      // Check if phone number was stored
      if (!storedPhone) {
        throw new Error('No OTP session found. Please send OTP first.');
      }
      
      // Compare phone numbers
      if (storedPhone !== phoneNumber) {
        throw new Error(`Phone number does not match. Expected: ${storedPhone}, Got: ${phoneNumber}`);
      }
      
      // Compare OTPs
      if (storedOtp !== otp) {
        throw createServiceError('Invalid OTP');
      }
      
      return {
        success: true,
        message: 'OTP verified successfully',
      };
    } catch (error) {
      console.error('Error verifying OTP:', error);
      throw error;
    }
  },

  // Get user by phone number
  getUserByPhone: async (phoneNumber) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.USER.GET_ALL);
      ensureResponseSuccess(response.data, 'Failed to fetch users.');
      
      // Find user with matching phone number
      if (response.data && response.data.ResultSet) {
        const user = response.data.ResultSet.find(
          u => u.Phone === phoneNumber
        );
        
        if (user) {
          if (!isActiveUserStatus(user.Status)) {
            throw createServiceError('User account is inactive');
          }

          return {
            success: true,
            data: user,
          };
        }
      }
      
      throw createServiceError('User not registered');
    } catch (error) {
      console.error('Error fetching user by phone:', error);
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

      clearStoredSession();
      return { success: true, message: 'Logged out successfully' };
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  },

  // Register new user (Step 1: create record in Users table)
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

      // Try to extract UserID from various possible response shapes
      let userId = response.data?.UserID
        || response.data?.ResultSet?.UserID
        || response.data?.userId;

      // If UserID was not returned by RegisterUser, look it up by phone number
      if (!userId) {
        console.log('UserID not in register response, fetching by phone...');
        const allUsersResp = await apiClient.get(API_ENDPOINTS.USER.GET_ALL);
        if (allUsersResp.data && allUsersResp.data.ResultSet) {
          const user = allUsersResp.data.ResultSet.find(
            u => u.Phone === userData.tud_phone
          );
          if (user) {
            userId = user.UserID;
          }
        }
      }

      if (!userId) {
        throw new Error('Registration succeeded but could not retrieve UserID. Please contact support.');
      }

      console.log('User registered with UserID:', userId);

      return {
        success: true,
        message: response.data.Message || 'User registered successfully',
        data: {
          UserID: userId,
          statusCode: response.data.StatusCode,
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
      const response = await apiClient.get(API_ENDPOINTS.USER.GET_BY_ID, { params: { UserID: userId } });
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  },

  // Update user profile
  updateProfile: async (userId, userData) => {
    try {
      // Ensure payload contains UserID if backend expects it
      const payload = { UserID: userId, ...userData };
      const response = await apiClient.put(API_ENDPOINTS.USER.PUT, payload);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  },

  // Add new user
  addUser: async (userData) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.USER.ADD, userData);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error('Error adding user:', error);
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

  // Update user status
  updateUserStatus: async (userId, status) => {
    try {
      const response = await apiClient.post(
        API_ENDPOINTS.USER.UPDATE_STATUS,
        {
          UserID: userId,
          Status: status,
        }
      );
      return {
        success: true,
        message: response.data.Result || 'User status updated successfully',
        data: response.data,
      };
    } catch (error) {
      console.error('Error updating user status:', error);
      throw error;
    }
  },

  // Update basic user details (name/phone)
  updateUser: async (userData) => {
    try {
      // some backends expect a different endpoint name
      const url = API_ENDPOINTS.USER.UPDATE || API_ENDPOINTS.USER.PUT;
      const response = await apiClient.post(url, userData);
      return {
        success: true,
        message: response.data.Result || 'User updated successfully',
        data: response.data,
      };
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },
};

export default UserServices;
