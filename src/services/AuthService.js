/**
 * Auth Service
 * Centralized API configuration with base URL and axios instance
 */

import axios from 'axios';

// Base URL for all API calls
export const API_BASE_URL = 'http://localhost:60748';

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Request interceptor for adding auth tokens
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem('authToken');
          // window.location.href = '/login';
          break;
        case 403:
          console.error('Access forbidden');
          break;
        case 404:
          console.error('Resource not found');
          break;
        case 500:
          console.error('Server error');
          break;
        default:
          console.error('API Error:', error.response.status);
      }
    }
    return Promise.reject(error);
  }
);

// API Endpoints organized by entity
export const API_ENDPOINTS = {
  // School endpoints
  SCHOOL: {
    GET_ALL: '/SchoolDetails/GetAllSchoolDetails',
    GET_BY_ID: '/SchoolDetails/GetSchoolDetailsBySchoolID',
  },

  // Bus endpoints
  BUS: {
    GET_ALL: '/BusDetails/GetAllBusDetails',
    GET_BY_NUMBERPLATE: '/BusDetails/GetBusDetailsByNumberplate',
  },

  // Device endpoints
  DEVICE: {
    GET_ALL: '/DeviceDetails/GetAllDeviceDetails',
    GET_BY_ID: '/DeviceDetails/GetDeviceDetailsByDeviceID',
  },

  // Driver endpoints
  DRIVER: {
    GET_ALL: '/DriverDetails/GetAllDriverDetails',
    GET_BY_ID: '/DriverDetails/GetDriverDetailsByDriverID',
  },

  // Notification endpoints
  NOTIFICATION: {
    GET_ALL: '/NotificationDetails/GetAllNotificationDetails',
  },

  // Owner endpoints
  OWNER: {
    GET_ALL: '/OwnerDetails/GetAllOwnerDetails',
    GET_BY_ID: '/OwnerDetails/GetOwnerDetailsByOwnerID',
  },

  // Parent endpoints
  PARENT: {
    GET_ALL: '/ParentDetails/GetAllParentDetails',
    GET_BY_ID: '/ParentDetails/GetParentDetailsByParentID',
  },

  // Student endpoints
  STUDENT: {
    GET_ALL: '/StudentDetails/GetAllStudentDetails',
  },

  // User endpoints
  USER: {
    GET_ALL: '/UserDetails/GetAllUsers',
    GET_BY_ID: '/UserDetails/GetUserByUserID',
  },
};

export default apiClient;
