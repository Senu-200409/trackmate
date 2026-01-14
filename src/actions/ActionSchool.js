import SchoolServices from '../services/SchoolServices';

// School Actions

export const setSchool = (school) => ({
  type: 'SET_SCHOOL',
  payload: school,
});

export const setSchools = (schools) => ({
  type: 'SET_SCHOOLS',
  payload: schools,
});

export const updateSchool = (schoolData) => ({
  type: 'UPDATE_SCHOOL',
  payload: schoolData,
});

export const schoolLoading = () => ({
  type: 'SCHOOL_LOADING',
});

export const schoolSuccess = () => ({
  type: 'SCHOOL_SUCCESS',
});

export const schoolError = (error) => ({
  type: 'SCHOOL_ERROR',
  payload: error,
});

// Async Actions (Thunks)

export const fetchSchool = (schoolId) => async (dispatch) => {
  dispatch(schoolLoading());
  try {
    const response = await SchoolServices.getSchool(schoolId);
    if (response.success) {
      dispatch(setSchool(response.data));
      dispatch(schoolSuccess());
    }
  } catch (error) {
    dispatch(schoolError(error.message));
  }
};

export const fetchSchools = () => async (dispatch) => {
  dispatch(schoolLoading());
  try {
    const response = await SchoolServices.getAllSchools();
    if (response.success) {
      dispatch(setSchools(response.data));
      dispatch(schoolSuccess());
    }
  } catch (error) {
    dispatch(schoolError(error.message));
  }
};

export const addSchool = (schoolData) => async (dispatch) => {
  dispatch(schoolLoading());
  try {
    const response = await SchoolServices.addSchool(schoolData);
    if (response.success) {
      dispatch(schoolSuccess());
    }
  } catch (error) {
    dispatch(schoolError(error.message));
  }
};

export const updateExistingSchool = (schoolId, schoolData) => async (dispatch) => {
  dispatch(schoolLoading());
  try {
    const response = await SchoolServices.updateSchool(schoolId, schoolData);
    if (response.success) {
      dispatch(updateSchool(response.data));
      dispatch(schoolSuccess());
    }
  } catch (error) {
    dispatch(schoolError(error.message));
  }
};
