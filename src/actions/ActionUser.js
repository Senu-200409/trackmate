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
    // TODO: Replace with actual API call when backend is ready
    // const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ phoneNumber, otp }),
    // });
    // const data = await response.json();
    
    // Temporary mock response
    const mockUser = {
      id: Date.now(),
      phoneNumber,
      role: 'parent',
      name: 'User',
    };
    
    dispatch(setUser(mockUser));
    dispatch(setToken('mock-token-' + Date.now()));
    dispatch(userSuccess());
  } catch (error) {
    dispatch(userError(error.message));
  }
};

export const logoutUser = () => (dispatch) => {
  dispatch(clearUser());
  localStorage.removeItem('token');
};

export const fetchUsers = () => async (dispatch) => {
  dispatch(userLoading());
  try {
    // TODO: Replace with actual API call
    dispatch(setUsers([]));
    dispatch(userSuccess());
  } catch (error) {
    dispatch(userError(error.message));
  }
};

export const updateUserProfile = (userData) => async (dispatch) => {
  dispatch(userLoading());
  try {
    // TODO: Replace with actual API call
    dispatch(updateUser(userData));
    dispatch(userSuccess());
  } catch (error) {
    dispatch(userError(error.message));
  }
};
