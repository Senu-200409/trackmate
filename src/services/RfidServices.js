/**
 * RFID Services
 * API calls for RFID logs, assignment, and lifecycle updates
 */

import apiClient, { API_ENDPOINTS } from './AuthService';

const unwrapResultSet = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && Array.isArray(payload.ResultSet)) {
    return payload.ResultSet;
  }

  return [];
};

const RfidServices = {
  getAllRfid: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.RFID.GET_ALL);
      return {
        success: true,
        data: unwrapResultSet(response.data),
        raw: response.data,
      };
    } catch (error) {
      console.error('Error fetching RFID logs:', error);
      throw error;
    }
  },

  getRfidByLogId: async (logId) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.RFID.GET_BY_LOG_ID, {
        params: { LogID: logId },
      });
      return {
        success: true,
        data: unwrapResultSet(response.data),
        raw: response.data,
      };
    } catch (error) {
      console.error('Error fetching RFID log by LogID:', error);
      throw error;
    }
  },

  addRfid: async (payload) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.RFID.ADD, payload);
      return {
        success: true,
        message: response.data?.Result || 'RFID added successfully',
        data: response.data,
      };
    } catch (error) {
      console.error('Error adding RFID log:', error);
      throw error;
    }
  },

  updateRfidStatus: async (payload) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.RFID.PUT, payload);
      return {
        success: true,
        message: response.data?.Result || 'RFID status updated successfully',
        data: response.data,
      };
    } catch (error) {
      console.error('Error updating RFID status:', error);
      throw error;
    }
  },
};

export default RfidServices;
