import OwnerServices from '../services/OwnerServices';

// Owner Actions

export const setOwner = (owner) => ({
  type: 'SET_OWNER',
  payload: owner,
});

export const setOwners = (owners) => ({
  type: 'SET_OWNERS',
  payload: owners,
});

export const setFleet = (fleet) => ({
  type: 'SET_FLEET',
  payload: fleet,
});

export const setAnalytics = (analytics) => ({
  type: 'SET_ANALYTICS',
  payload: analytics,
});

export const updateOwner = (ownerData) => ({
  type: 'UPDATE_OWNER',
  payload: ownerData,
});

export const ownerLoading = () => ({
  type: 'OWNER_LOADING',
});

export const ownerSuccess = () => ({
  type: 'OWNER_SUCCESS',
});

export const ownerError = (error) => ({
  type: 'OWNER_ERROR',
  payload: error,
});

// Async Actions (Thunks)
export const fetchOwner = (ownerId) => async (dispatch) => {
  dispatch(ownerLoading());
  try {
    const response = await OwnerServices.getOwner(ownerId);
    if (response.success) {
      dispatch(setOwner(response.data));
      dispatch(ownerSuccess());
    }
  } catch (error) {
    dispatch(ownerError(error.message));
  }
};

export const fetchOwners = () => async (dispatch) => {
  dispatch(ownerLoading());
  try {
    const response = await OwnerServices.getAllOwners();
    if (response.success) {
      dispatch(setOwners(response.data));
      dispatch(ownerSuccess());
    }
  } catch (error) {
    dispatch(ownerError(error.message));
  }
};

export const fetchFleet = (ownerId) => async (dispatch) => {
  dispatch(ownerLoading());
  try {
    const response = await OwnerServices.getFleet(ownerId);
    if (response.success) {
      dispatch(setFleet(response.data));
      dispatch(ownerSuccess());
    }
  } catch (error) {
    dispatch(ownerError(error.message));
  }
};

export const fetchAnalytics = (ownerId) => async (dispatch) => {
  dispatch(ownerLoading());
  try {
    const response = await OwnerServices.getAnalytics(ownerId);
    if (response.success) {
      dispatch(setAnalytics(response.data));
      dispatch(ownerSuccess());
    }
  } catch (error) {
    dispatch(ownerError(error.message));
  }
};

export const addBusToFleet = (ownerId, busData) => async (dispatch) => {
  dispatch(ownerLoading());
  try {
    const response = await OwnerServices.addBusToFleet(ownerId, busData);
    if (response.success) {
       // Refresh fleet after adding
       const fleetResponse = await OwnerServices.getFleet(ownerId);
       if (fleetResponse.success) {
         dispatch(setFleet(fleetResponse.data));
       }
      dispatch(ownerSuccess());
    }
  } catch (error) {
    dispatch(ownerError(error.message));
  }
};
