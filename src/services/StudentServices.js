/**
 * Student Services
 * API calls for student management
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

const StudentServices = {
  // Get all students
  getAllStudents: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.STUDENT.GET_ALL);
      return {
        success: true,
        data: unwrapResultSet(response.data),
        raw: response.data,
      };
    } catch (error) {
      console.error('Error fetching students:', error);
      throw error;
    }
  },

  // Get student by ID
  getStudentById: async (studentId) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.STUDENT.GET_BY_ID, {
        params: { StudentID: studentId },
      });
      return {
        success: true,
        data: unwrapResultSet(response.data),
        raw: response.data,
      };
    } catch (error) {
      console.error('Error fetching student by ID:', error);
      throw error;
    }
  },

  // Create student
  createStudent: async (studentData) => {
    try {
      const formData = new FormData();
      formData.append('FullName', studentData.FullName || '');
      formData.append('Age', studentData.Age || '');
      formData.append('Gender', studentData.Gender || '');
      formData.append('RfidID', studentData.RfidID || '');
      formData.append('ParentID', studentData.ParentID || '');
      formData.append('SchoolID', studentData.SchoolID || '');
      formData.append('NumberPlate', studentData.NumberPlate || '');
      formData.append('Userid', studentData.Userid || '1');

      if (studentData.file) {
        formData.append('file', studentData.file);
      } else {
        // Backend expects a non-empty placeholder string for blank file.
        formData.append('file', ' ');
      }

      // Diagnostics for payload mismatch troubleshooting.
      console.log('[StudentServices.createStudent] Request payload', {
        FullName: studentData.FullName,
        Age: studentData.Age,
        Gender: studentData.Gender,
        RfidID: studentData.RfidID,
        ParentID: studentData.ParentID,
        SchoolID: studentData.SchoolID,
        NumberPlate: studentData.NumberPlate,
        Userid: studentData.Userid,
        hasFile: !!studentData.file,
        fileMeta: studentData.file ? {
          name: studentData.file.name,
          size: studentData.file.size,
          type: studentData.file.type,
        } : null,
      });

      const response = await apiClient.post(API_ENDPOINTS.STUDENT.ADD, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('[StudentServices.createStudent] Response', response?.data);

      const statusCode = Number(response?.data?.StatusCode);
      const isSuccess = statusCode === 200;
      const backendMessage = response?.data?.Message || response?.data?.Result || 'Student registration failed';

      if (!isSuccess) {
        const apiError = new Error(backendMessage);
        apiError.response = { data: response?.data };
        throw apiError;
      }

      return {
        success: isSuccess,
        message: backendMessage,
        data: response.data,
      };
    } catch (error) {
      console.error('Error creating student:', error);
      console.error('[StudentServices.createStudent] Error response', error?.response?.data || null);
      throw error;
    }
  },

  // Update student
  updateStudent: async (studentId, studentData) => {
    try {
      const payload = {
        StudentID: studentId,
        Age: studentData.Age,
      };

      const response = await apiClient.post(API_ENDPOINTS.STUDENT.PUT, payload);

      return {
        success: true,
        message: response.data?.Result || 'Student updated successfully',
        data: response.data,
      };
    } catch (error) {
      console.error('Error updating student:', error);
      throw error;
    }
  },

  // Delete student
  deleteStudent: async (studentId) => {
    try {
      // TODO: Replace with actual API call when backend is ready
      // const url = buildURL(API_ENDPOINTS.STUDENTS.DELETE, { id: studentId });
      // return await httpClient.delete(url);

      return {
        success: true,
        message: 'Student deleted successfully',
      };
    } catch (error) {
      console.error('Error deleting student:', error);
      throw error;
    }
  },

  // Get student enrollments
  getEnrollments: async (studentId) => {
    try {
      // TODO: Replace with actual API call when backend is ready
      // const url = buildURL(API_ENDPOINTS.STUDENTS.ENROLLMENTS, { id: studentId });
      // return await httpClient.get(url);

      return {
        success: true,
        data: [],
      };
    } catch (error) {
      console.error('Error fetching enrollments:', error);
      throw error;
    }
  },

  // Enroll student
  enrollStudent: async (studentData) => {
    try {
      // TODO: Replace with actual API call when backend is ready
      return {
        success: true,
        message: 'Student enrolled successfully',
        data: { id: Date.now(), ...studentData },
      };
    } catch (error) {
      console.error('Error enrolling student:', error);
      throw error;
    }
  },

  // Get student attendance
  getAttendance: async (studentId, filter = {}) => {
    try {
      // TODO: Replace with actual API call when backend is ready
      // const url = buildURL(API_ENDPOINTS.STUDENTS.ATTENDANCE, { id: studentId });
      // return await httpClient.get(url, { params: filter });

      return {
        success: true,
        data: [],
      };
    } catch (error) {
      console.error('Error fetching attendance:', error);
      throw error;
    }
  },

  // Mark attendance
  markAttendance: async (studentId, attendanceData) => {
    try {
      // TODO: Replace with actual API call when backend is ready
      return {
        success: true,
        message: 'Attendance marked successfully',
        data: { id: Date.now(), studentId, ...attendanceData },
      };
    } catch (error) {
      console.error('Error marking attendance:', error);
      throw error;
    }
  },

  // Get students by school
  getStudentsBySchool: async (schoolId, filter = {}) => {
    try {
      // TODO: Replace with actual API call when backend is ready
      return {
        success: true,
        data: [],
      };
    } catch (error) {
      console.error('Error fetching school students:', error);
      throw error;
    }
  },

  // Get students by route
  getStudentsByRoute: async (routeId) => {
    try {
      // TODO: Replace with actual API call when backend is ready
      return {
        success: true,
        data: [],
      };
    } catch (error) {
      console.error('Error fetching route students:', error);
      throw error;
    }
  },
};

export default StudentServices;
