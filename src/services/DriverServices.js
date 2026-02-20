/**
 * Driver Services
 * API calls for driver management
 */

import apiClient, { API_ENDPOINTS } from './AuthService';

const DriverServices = {
  // Get all drivers
  getAllDrivers: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.DRIVER.GET_ALL);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error('Error fetching drivers:', error);
      throw error;
    }
  },

  // Get driver by ID
  getDriver: async (driverId) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.DRIVER.GET_BY_ID, {
        params: { DriverID: driverId },
      });
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error('Error fetching driver:', error);
      throw error;
    }
  },

  // Create driver
  createDriver: async (driverData) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.DRIVER.CREATE, {
        UserID: driverData.UserID,
        LicenseNo: driverData.LicenseNo,
        LicenseType: driverData.LicenseType,
        Status: driverData.Status
      });
      return {
        success: true,
        message: 'Driver created successfully',
        data: response.data,
      };
    } catch (error) {
      console.error('Error creating driver:', error);
      return {
        success: false,
        message: error.message || 'Failed to create driver',
        data: null,
      };
    }
  },

  // Update driver
  updateDriver: async (driverId, driverData) => {
    try {
      // Some backends expect the id in payload
      const payload = { DriverID: driverId, ...driverData };
      // API uses POST for update on this backend
      const response = await apiClient.post(API_ENDPOINTS.DRIVER.PUT, payload);
      return {
        success: true,
        message: 'Driver updated successfully',
        data: response.data,
      };
    } catch (error) {
      console.error('Error updating driver:', error);
      throw error;
    }
  },

  // Delete driver
  deleteDriver: async (driverId) => {
    try {
      // TODO: Replace with actual API call when backend is ready
      // const url = buildURL(API_ENDPOINTS.DRIVERS.DELETE, { id: driverId });
      // return await httpClient.delete(url);

      return {
        success: true,
        message: 'Driver deleted successfully',
      };
    } catch (error) {
      console.error('Error deleting driver:', error);
      throw error;
    }
  },

  // Update driver location
  updateLocation: async (driverId, location) => {
    try {
      // TODO: Replace with actual API call when backend is ready
      // const url = buildURL(API_ENDPOINTS.DRIVERS.UPDATE_LOCATION, { id: driverId });
      // return await httpClient.patch(url, location);

      return {
        success: true,
        message: 'Location updated successfully',
        data: { driverId, location, timestamp: new Date() },
      };
    } catch (error) {
      console.error('Error updating location:', error);
      throw error;
    }
  },

  // Get driver location
  getLocation: async (driverId) => {
    try {
      // TODO: Replace with actual API call when backend is ready
      // const url = buildURL(API_ENDPOINTS.DRIVERS.LOCATION, { id: driverId });
      // return await httpClient.get(url);

      // Mock location until API is available
      return {
        success: true,
        data: { lat: 28.7041, lng: 77.1025 },
      };
    } catch (error) {
      console.error('Error fetching location:', error);
      throw error;
    }
  },

  // Update route status
  updateRouteStatus: async (driverId, status) => {
    try {
      // TODO: Replace with actual API call when backend is ready
      // const url = buildURL(API_ENDPOINTS.DRIVERS.ROUTE_STATUS, { id: driverId });
      // return await httpClient.patch(url, { status });

      return {
        success: true,
        message: `Route status updated to ${status}`,
        data: { driverId, status, timestamp: new Date() },
      };
    } catch (error) {
      console.error('Error updating route status:', error);
      throw error;
    }
  },

  // Get driver students
  getDriverStudents: async (driverId) => {
    try {
      // TODO: Replace with actual API call when backend is ready
      // const url = buildURL(API_ENDPOINTS.DRIVERS.STUDENTS, { id: driverId });
      // return await httpClient.get(url);

      return {
        success: true,
        data: [],
      };
    } catch (error) {
      console.error('Error fetching driver students:', error);
      throw error;
    }
  },

  // Start route
  startRoute: async (driverId, routeData) => {
    try {
      // TODO: Replace with actual API call when backend is ready
      return DriverServices.updateRouteStatus(driverId, 'active');
    } catch (error) {
      console.error('Error starting route:', error);
      throw error;
    }
  },

  // End route
  endRoute: async (driverId, routeData) => {
    try {
      // TODO: Replace with actual API call when backend is ready
      return DriverServices.updateRouteStatus(driverId, 'completed');
    } catch (error) {
      console.error('Error ending route:', error);
      throw error;
    }
  },
};

export default DriverServices;
