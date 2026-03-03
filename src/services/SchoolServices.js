/**
 * School Services
 * API calls for school management
 */

import apiClient, { API_ENDPOINTS } from './AuthService';

const SchoolServices = {
  // Get all schools
  getAllSchools: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.SCHOOL.GET_ALL);
      let data = response.data;
      // backend sometimes wraps results in ResultSet
      if (data && !Array.isArray(data) && Array.isArray(data.ResultSet)) {
        data = data.ResultSet;
      }
      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error('Error fetching schools:', error);
      throw error;
    }
  },

  // Get school by ID
  getSchool: async (schoolId) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.SCHOOL.GET_BY_ID, {
        params: { SchoolID: schoolId },
      });
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error('Error fetching school:', error);
      throw error;
    }
  },

  // Create school
  addSchool: async (schoolData) => {
    try {
      const payload = {
        Userid: schoolData.Userid || 1,
        SchoolName: schoolData.SchoolName,
        City: schoolData.City,
        Town: schoolData.Town,
        Address: schoolData.Address,
        SchoolType: schoolData.SchoolType
      };
      const response = await apiClient.post(API_ENDPOINTS.SCHOOL.ADD, payload);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error('Error creating school:', error);
      throw error;
    }
  },

  // Update school
  updateSchool: async (schoolId, schoolData) => {
    try {
      const payload = {
        SchoolID: schoolId,
        Userid: schoolData.Userid || 1,
        SchoolName: schoolData.SchoolName,
        City: schoolData.City,
        Town: schoolData.Town,
        Address: schoolData.Address,
        SchoolType: schoolData.SchoolType
      };
      const response = await apiClient.put(API_ENDPOINTS.SCHOOL.PUT, payload);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error('Error updating school:', error);
      throw error;
    }
  },

  // Delete school
  deleteSchool: async (schoolId) => {
    try {
      // TODO: Replace with actual API call when backend is ready
      // const url = buildURL(API_ENDPOINTS.SCHOOLS.DELETE, { id: schoolId });
      // return await httpClient.delete(url);

      return {
        success: true,
        message: 'School deleted successfully',
      };
    } catch (error) {
      console.error('Error deleting school:', error);
      throw error;
    }
  },

  // Get school students
  getSchoolStudents: async (schoolId, filter = {}) => {
    try {
      // TODO: Replace with actual API call when backend is ready
      // const url = buildURL(API_ENDPOINTS.SCHOOLS.STUDENTS, { id: schoolId });
      // return await httpClient.get(url, { params: filter });

      return {
        success: true,
        data: [],
      };
    } catch (error) {
      console.error('Error fetching school students:', error);
      throw error;
    }
  },

  // Get school routes
  getSchoolRoutes: async (schoolId) => {
    try {
      // TODO: Replace with actual API call when backend is ready
      // const url = buildURL(API_ENDPOINTS.SCHOOLS.ROUTES, { id: schoolId });
      // return await httpClient.get(url);

      return {
        success: true,
        data: [],
      };
    } catch (error) {
      console.error('Error fetching school routes:', error);
      throw error;
    }
  },

  // Add route to school
  addRouteToSchool: async (schoolId, routeData) => {
    try {
      // TODO: Replace with actual API call when backend is ready
      return {
        success: true,
        message: 'Route added to school successfully',
        data: { id: Date.now(), schoolId, ...routeData },
      };
    } catch (error) {
      console.error('Error adding route to school:', error);
      throw error;
    }
  },

  // Remove route from school
  removeRouteFromSchool: async (schoolId, routeId) => {
    try {
      // TODO: Replace with actual API call when backend is ready
      return {
        success: true,
        message: 'Route removed from school successfully',
      };
    } catch (error) {
      console.error('Error removing route from school:', error);
      throw error;
    }
  },

  // Get school statistics
  getSchoolStatistics: async (schoolId) => {
    try {
      // TODO: Replace with actual API call when backend is ready
      return {
        success: true,
        data: {
          schoolId,
          totalStudents: 0,
          totalRoutes: 0,
          totalBuses: 0,
          averageAttendance: 0,
        },
      };
    } catch (error) {
      console.error('Error fetching school statistics:', error);
      throw error;
    }
  },
};

export default SchoolServices;







