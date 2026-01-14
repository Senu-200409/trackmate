import StudentServices from '../services/StudentServices';

// Student Actions

export const setStudent = (student) => ({
  type: 'SET_STUDENT',
  payload: student,
});

export const setStudents = (students) => ({
  type: 'SET_STUDENTS',
  payload: students,
});

export const setEnrollments = (enrollments) => ({
  type: 'SET_ENROLLMENTS',
  payload: enrollments,
});

export const setAttendance = (attendance) => ({
  type: 'SET_ATTENDANCE',
  payload: attendance,
});

export const updateStudent = (studentData) => ({
  type: 'UPDATE_STUDENT',
  payload: studentData,
});

export const studentLoading = () => ({
  type: 'STUDENT_LOADING',
});

export const studentSuccess = () => ({
  type: 'STUDENT_SUCCESS',
});

export const studentError = (error) => ({
  type: 'STUDENT_ERROR',
  payload: error,
});

// Async Actions (Thunks)
export const fetchStudent = (studentId) => async (dispatch) => {
  dispatch(studentLoading());
  try {
    const response = await StudentServices.getStudent(studentId);
    if (response.success) {
      dispatch(setStudent(response.data));
      dispatch(studentSuccess());
    }
  } catch (error) {
    dispatch(studentError(error.message));
  }
};

export const fetchStudents = () => async (dispatch) => {
  dispatch(studentLoading());
  try {
    const response = await StudentServices.getAllStudents();
    if (response.success) {
      dispatch(setStudents(response.data));
      dispatch(studentSuccess());
    }
  } catch (error) {
    dispatch(studentError(error.message));
  }
};

export const fetchStudentsBySchool = (schoolId) => async (dispatch) => {
  dispatch(studentLoading());
  try {
    const response = await StudentServices.getStudentsBySchool(schoolId);
    if (response.success) {
      dispatch(setStudents(response.data));
      dispatch(studentSuccess());
    }
  } catch (error) {
    dispatch(studentError(error.message));
  }
};

export const fetchEnrollments = (studentId) => async (dispatch) => {
  dispatch(studentLoading());
  try {
    // Assuming a service method exists or returns inside getStudent
    const response = await StudentServices.getStudent(studentId);
    if (response.success && response.data.enrollments) {
        dispatch(setEnrollments(response.data.enrollments));
    }
    dispatch(studentSuccess());
  } catch (error) {
    dispatch(studentError(error.message));
  }
};

export const fetchAttendance = (studentId) => async (dispatch) => {
  dispatch(studentLoading());
  try {
    const response = await StudentServices.getAttendance(studentId);
    if (response.success) {
      dispatch(setAttendance(response.data));
      dispatch(studentSuccess());
    }
  } catch (error) {
    dispatch(studentError(error.message));
  }
};

export const enrollStudent = (studentData) => async (dispatch) => {
  dispatch(studentLoading());
  try {
    const response = await StudentServices.addStudent(studentData);
    if (response.success) {
      dispatch(studentSuccess());
    }
  } catch (error) {
    dispatch(studentError(error.message));
  }
};
