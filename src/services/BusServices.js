/**
 * Bus Services
 * API calls for bus management
 */

import apiClient, { API_ENDPOINTS } from './AuthService';

const BusServices = {
  // Get all buses
  getAllBuses: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.BUS.GET_ALL);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error('Error fetching buses:', error);
      throw error;
    }
  },

  // Get bus by number plate
  getBusByNumberPlate: async (numberPlate) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.BUS.GET_BY_NUMBERPLATE, {
        params: { NumberPlate: numberPlate },
      });
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error('Error fetching bus:', error);
      throw error;
    }
  },

  // Create bus - calls /BusDetails/AddBusDetails
  createBus: async (busData) => {
    try {
      const normalizedLatitude =
        busData.Latitude !== undefined && busData.Latitude !== null && String(busData.Latitude).trim() !== ''
          ? Number(busData.Latitude)
          : null;

      const normalizedLongitude =
        busData.Longitude !== undefined && busData.Longitude !== null && String(busData.Longitude).trim() !== ''
          ? Number(busData.Longitude)
          : null;

      const payload = {
        NumberPlate: busData.NumberPlate || busData.plate || busData.LicensePlate || '',
        DriverID: busData.DriverID ? Number(busData.DriverID) : (busData.DriverId ? Number(busData.DriverId) : null),
        Vehicle: busData.Vehicle || busData.vehicle || '',
        SheetCount: busData.SheetCount ? Number(busData.SheetCount) : (busData.capacity ? Number(busData.capacity) : 0),
        LicenseExpiry: busData.LicenseExpiry || busData.licenseExpiry || busData.LicenseExpiryDate || '',
        InsuranceExpiry: busData.InsuranceExpiry || busData.insuranceExpiry || '',
        Latitude: normalizedLatitude,
        Longitude: normalizedLongitude,
      };

      const response = await apiClient.post(API_ENDPOINTS.BUS.ADD, payload);
      return {
        success: true,
        message: response.data?.Result || 'Bus added successfully',
        data: response.data,
      };
    } catch (error) {
      console.error('Error creating bus:', error);
      throw error;
    }
  },

  // Update bus
  updateBus: async (busId, busData) => {
    try {
      // TODO: Replace with actual API call when backend is ready
      // const url = buildURL(API_ENDPOINTS.BUSES.UPDATE, { id: busId });
      // return await httpClient.put(url, busData);

      return {
        success: true,
        message: 'Bus updated successfully',
        data: { id: busId, ...busData },
      };
    } catch (error) {
      console.error('Error updating bus:', error);
      throw error;
    }
  },

  // Delete bus
  deleteBus: async (busId) => {
    try {
      // TODO: Replace with actual API call when backend is ready
      // const url = buildURL(API_ENDPOINTS.BUSES.DELETE, { id: busId });
      // return await httpClient.delete(url);

      return {
        success: true,
        message: 'Bus deleted successfully',
      };
    } catch (error) {
      console.error('Error deleting bus:', error);
      throw error;
    }
  },

  // Get bus health
  getBusHealth: async (busId) => {
    try {
      // TODO: Replace with actual API call when backend is ready
      // const url = buildURL(API_ENDPOINTS.BUSES.HEALTH, { id: busId });
      // return await httpClient.get(url);

      return {
        success: true,
        data: {
          busId,
          engineStatus: 'good',
          fuelLevel: 75,
          mileage: 50000,
          lastServiceDate: '2024-12-01',
          nextServiceDate: '2025-06-01',
          tireCondition: 'good',
          acCondition: 'working',
        },
      };
    } catch (error) {
      console.error('Error fetching bus health:', error);
      throw error;
    }
  },

  // Get maintenance records
  getMaintenanceRecords: async (busId) => {
    try {
      // TODO: Replace with actual API call when backend is ready
      // const url = buildURL(API_ENDPOINTS.BUSES.MAINTENANCE, { id: busId });
      // return await httpClient.get(url);

      return {
        success: true,
        data: [],
      };
    } catch (error) {
      console.error('Error fetching maintenance records:', error);
      throw error;
    }
  },

  // Add maintenance record
  addMaintenanceRecord: async (busId, recordData) => {
    try {
      // TODO: Replace with actual API call when backend is ready
      return {
        success: true,
        message: 'Maintenance record added successfully',
        data: { id: Date.now(), busId, ...recordData },
      };
    } catch (error) {
      console.error('Error adding maintenance record:', error);
      throw error;
    }
  },

  // Schedule maintenance
  scheduleMaintenance: async (busId, maintenanceData) => {
    try {
      // TODO: Replace with actual API call when backend is ready
      return {
        success: true,
        message: 'Maintenance scheduled successfully',
        data: { id: Date.now(), busId, ...maintenanceData },
      };
    } catch (error) {
      console.error('Error scheduling maintenance:', error);
      throw error;
    }
  },
};

export default BusServices;
