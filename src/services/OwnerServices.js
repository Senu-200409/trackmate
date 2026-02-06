/**
 * Owner Services
 * API calls for owner/school management
 */

import apiClient, { API_ENDPOINTS } from './AuthService';

const OwnerServices = {
  // Get all owners
  getAllOwners: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.OWNER.GET_ALL);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error('Error fetching owners:', error);
      throw error;
    }
  },

  // Get owner by ID
  getOwner: async (ownerId) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.OWNER.GET_BY_ID, {
        params: { OwnerID: ownerId },
      });
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error('Error fetching owner:', error);
      throw error;
    }
  },

  // Create owner
  createOwner: async (ownerData) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.OWNER.ADD, ownerData);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error('Error creating owner:', error);
      throw error;
    }
  },

  // Update owner
  updateOwner: async (ownerId, ownerData) => {
    try {
      // Some backends expect the id in payload
      const payload = { OwnerID: ownerId, ...ownerData };
      // API uses POST for PutOwnerDetails on this backend
      const response = await apiClient.post(API_ENDPOINTS.OWNER.PUT, payload);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error('Error updating owner:', error);
      throw error;
    }
  },

  // Delete owner
  deleteOwner: async (ownerId) => {
    try {
      // TODO: Replace with actual API call when backend is ready
      // const url = buildURL(API_ENDPOINTS.OWNERS.DELETE, { id: ownerId });
      // return await httpClient.delete(url);

      return {
        success: true,
        message: 'Owner deleted successfully',
      };
    } catch (error) {
      console.error('Error deleting owner:', error);
      throw error;
    }
  },

  // Get owner analytics
  getAnalytics: async (ownerId) => {
    try {
      // TODO: Replace with actual API call when backend is ready
      // const url = buildURL(API_ENDPOINTS.OWNERS.ANALYTICS, { id: ownerId });
      // return await httpClient.get(url);

      return {
        success: true,
        data: {
          totalBuses: 5,
          totalDrivers: 5,
          totalStudents: 250,
          activeRoutes: 3,
          completedTrips: 120,
          averageRating: 4.5,
        },
      };
    } catch (error) {
      console.error('Error fetching analytics:', error);
      throw error;
    }
  },

  // Get owner fleet
  getFleet: async (ownerId) => {
    try {
      // TODO: Replace with actual API call when backend is ready
      // const url = buildURL(API_ENDPOINTS.OWNERS.FLEET, { id: ownerId });
      // return await httpClient.get(url);

      return {
        success: true,
        data: [],
      };
    } catch (error) {
      console.error('Error fetching fleet:', error);
      throw error;
    }
  },

  // Add bus to fleet
  addBusToFleet: async (ownerId, busData) => {
    try {
      // TODO: Replace with actual API call when backend is ready
      // const url = buildURL(API_ENDPOINTS.OWNERS.FLEET, { id: ownerId });
      // return await httpClient.post(url, busData);

      return {
        success: true,
        message: 'Bus added to fleet successfully',
        data: { id: Date.now(), ...busData },
      };
    } catch (error) {
      console.error('Error adding bus to fleet:', error);
      throw error;
    }
  },

  // Remove bus from fleet
  removeBusFromFleet: async (ownerId, busId) => {
    try {
      // TODO: Replace with actual API call when backend is ready
      return {
        success: true,
        message: 'Bus removed from fleet successfully',
      };
    } catch (error) {
      console.error('Error removing bus from fleet:', error);
      throw error;
    }
  },

  // Get owner drivers
  getDrivers: async (ownerId) => {
    try {
      // TODO: Replace with actual API call when backend is ready
      return {
        success: true,
        data: [],
      };
    } catch (error) {
      console.error('Error fetching drivers:', error);
      throw error;
    }
  },

  // Get owner routes
  getRoutes: async (ownerId) => {
    try {
      // TODO: Replace with actual API call when backend is ready
      return {
        success: true,
        data: [],
      };
    } catch (error) {
      console.error('Error fetching routes:', error);
      throw error;
    }
  },
};

export default OwnerServices;
