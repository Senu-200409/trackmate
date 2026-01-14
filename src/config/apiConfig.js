/**
 * API Configuration
 * Centralized configuration for API endpoints and base URL
 */

// Get base URL from environment variables or use default
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// API Endpoints
export const API_ENDPOINTS = {
  // User/Auth endpoints
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register',
    VERIFY_OTP: '/auth/verify-otp',
    SEND_OTP: '/auth/send-otp',
    REFRESH_TOKEN: '/auth/refresh-token',
    PROFILE: '/auth/profile',
    UPDATE_PROFILE: '/auth/profile/update',
  },

  // Driver endpoints
  DRIVERS: {
    LIST: '/drivers',
    GET: '/drivers/:id',
    CREATE: '/drivers',
    UPDATE: '/drivers/:id',
    DELETE: '/drivers/:id',
    LOCATION: '/drivers/:id/location',
    UPDATE_LOCATION: '/drivers/:id/location',
    ROUTE_STATUS: '/drivers/:id/route-status',
    STUDENTS: '/drivers/:id/students',
  },

  // Owner endpoints
  OWNERS: {
    LIST: '/owners',
    GET: '/owners/:id',
    CREATE: '/owners',
    UPDATE: '/owners/:id',
    DELETE: '/owners/:id',
    ANALYTICS: '/owners/:id/analytics',
    FLEET: '/owners/:id/fleet',
  },

  // Parent endpoints
  PARENTS: {
    LIST: '/parents',
    GET: '/parents/:id',
    CREATE: '/parents',
    UPDATE: '/parents/:id',
    DELETE: '/parents/:id',
    CHILDREN: '/parents/:id/children',
    ALERTS: '/parents/:id/alerts',
    HISTORY: '/parents/:id/history',
    CHILD_LOCATION: '/parents/:id/children/:childId/location',
  },

  // Bus endpoints
  BUSES: {
    LIST: '/buses',
    GET: '/buses/:id',
    CREATE: '/buses',
    UPDATE: '/buses/:id',
    DELETE: '/buses/:id',
    HEALTH: '/buses/:id/health',
    MAINTENANCE: '/buses/:id/maintenance',
  },

  // Student endpoints
  STUDENTS: {
    LIST: '/students',
    GET: '/students/:id',
    CREATE: '/students',
    UPDATE: '/students/:id',
    DELETE: '/students/:id',
    ENROLLMENTS: '/students/:id/enrollments',
    ATTENDANCE: '/students/:id/attendance',
  },

  // Routes endpoints
  ROUTES: {
    LIST: '/routes',
    GET: '/routes/:id',
    CREATE: '/routes',
    UPDATE: '/routes/:id',
    DELETE: '/routes/:id',
    ACTIVE: '/routes/active',
    DETAILS: '/routes/:id/details',
    BY_SCHOOL: '/routes/school/:schoolId',
  },

  // School endpoints
  SCHOOLS: {
    LIST: '/schools',
    GET: '/schools/:id',
    CREATE: '/schools',
    UPDATE: '/schools/:id',
    DELETE: '/schools/:id',
    STUDENTS: '/schools/:id/students',
    ROUTES: '/schools/:id/routes',
  },

  // Notification endpoints
  NOTIFICATIONS: {
    LIST: '/notifications',
    GET: '/notifications/:id',
    SEND: '/notifications/send',
    MARK_READ: '/notifications/:id/read',
    UNREAD_COUNT: '/notifications/unread/count',
  },

  // Device endpoints
  DEVICES: {
    LIST: '/devices',
    GET: '/devices/:id',
    CREATE: '/devices',
    UPDATE: '/devices/:id',
    DELETE: '/devices/:id',
    STATUS: '/devices/:id/status',
    GPS_TRACKING: '/devices/:id/gps-tracking',
    UPDATE_LOCATION: '/devices/:id/location',
  },
};

// Utility function to build URL
export const buildURL = (endpoint, params = {}) => {
  let url = endpoint;
  Object.keys(params).forEach(key => {
    url = url.replace(`:${key}`, params[key]);
  });
  return `${API_BASE_URL}${url}`;
};

// HTTP methods with error handling
export const httpClient = {
  get: async (url, options = {}) => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          ...options.headers,
        },
        ...options,
      });
      return handleResponse(response);
    } catch (error) {
      throw handleError(error);
    }
  },

  post: async (url, data = {}, options = {}) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          ...options.headers,
        },
        body: JSON.stringify(data),
        ...options,
      });
      return handleResponse(response);
    } catch (error) {
      throw handleError(error);
    }
  },

  put: async (url, data = {}, options = {}) => {
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          ...options.headers,
        },
        body: JSON.stringify(data),
        ...options,
      });
      return handleResponse(response);
    } catch (error) {
      throw handleError(error);
    }
  },

  patch: async (url, data = {}, options = {}) => {
    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          ...options.headers,
        },
        body: JSON.stringify(data),
        ...options,
      });
      return handleResponse(response);
    } catch (error) {
      throw handleError(error);
    }
  },

  delete: async (url, options = {}) => {
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          ...options.headers,
        },
        ...options,
      });
      return handleResponse(response);
    } catch (error) {
      throw handleError(error);
    }
  },
};

// Response handler
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw {
      status: response.status,
      message: error.message || 'API Error',
      ...error,
    };
  }
  return response.json();
};

// Error handler
const handleError = (error) => {
  console.error('API Error:', error);
  return {
    message: error.message || 'Network Error',
    ...error,
  };
};

export default {
  API_BASE_URL,
  API_ENDPOINTS,
  buildURL,
  httpClient,
};
