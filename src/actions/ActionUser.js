import UserServices from '../services/UserServices';

// User Actions

export const setUser = (user) => ({
  type: 'SET_USER',
  payload: user,
});

export const clearUser = () => ({
  type: 'CLEAR_USER',
});

export const setToken = (token) => ({
  type: 'SET_TOKEN',
  payload: token,
});

export const setUsers = (users) => ({
  type: 'SET_USERS',
  payload: users,
});

export const updateUser = (userData) => ({
  type: 'UPDATE_USER',
  payload: userData,
});

export const userLoading = () => ({
  type: 'USER_LOADING',
});

export const userSuccess = () => ({
  type: 'USER_SUCCESS',
});

export const userError = (error) => ({
  type: 'USER_ERROR',
  payload: error,
});

// Async Actions (Thunks)
export const loginUser = (phoneNumber, otp) => async (dispatch) => {
  dispatch(userLoading());
  try {
    const response = await UserServices.login(phoneNumber, otp);
    if (response.success) {
      dispatch(setUser(response.data.user));
      dispatch(setToken(response.data.token));
      dispatch(userSuccess());
    } else {
      dispatch(userError(response.message || 'Login failed'));
    }
  } catch (error) {
    dispatch(userError(error.message));
  }
};

export const logoutUser = () => (dispatch) => {
  UserServices.logout();
  dispatch(clearUser());
};

export const fetchUsers = () => async (dispatch) => {
  dispatch(userLoading());
  try {
    const response = await UserServices.getAllUsers();
    if (response.success) {
      dispatch(setUsers(response.data));
      dispatch(userSuccess());
    }
  } catch (error) {
    dispatch(userError(error.message));
  }
};

export const updateUserProfile = (userData) => async (dispatch) => {
  dispatch(userLoading());
  try {
    const response = await UserServices.updateProfile(userData);
    if (response.success) {
      dispatch(updateUser(response.data));
      dispatch(userSuccess());
    }
  } catch (error) {
    dispatch(userError(error.message));
  }
};
