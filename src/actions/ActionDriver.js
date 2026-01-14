import DriverServices from '../services/DriverServices';

// Driver Actions

export const setDriver = (driver) => ({
  type: 'SET_DRIVER',
  payload: driver,
});

export const setDrivers = (drivers) => ({
  type: 'SET_DRIVERS',
  payload: drivers,
});

export const updateDriverLocation = (location) => ({
  type: 'UPDATE_DRIVER_LOCATION',
  payload: location,
});

export const setRouteStatus = (status) => ({
  type: 'SET_ROUTE_STATUS',
  payload: status,
});

export const setDriverStudents = (students) => ({
  type: 'SET_DRIVER_STUDENTS',
  payload: students,
});

export const updateDriver = (driverData) => ({
  type: 'UPDATE_DRIVER',
  payload: driverData,
});

export const driverLoading = () => ({
  type: 'DRIVER_LOADING',
});

export const driverSuccess = () => ({
  type: 'DRIVER_SUCCESS',
});

export const driverError = (error) => ({
  type: 'DRIVER_ERROR',
  payload: error,
});

// Async Actions (Thunks)
export const fetchDriver = (driverId) => async (dispatch) => {
  dispatch(driverLoading());
  try {
    const response = await DriverServices.getDriver(driverId);
    if (response.success) {
      dispatch(setDriver(response.data));
      if (response.data.routeStatus) {
        dispatch(setRouteStatus(response.data.routeStatus));
      }
      dispatch(driverSuccess());
    }
  } catch (error) {
    dispatch(driverError(error.message));
  }
};

export const fetchDrivers = () => async (dispatch) => {
  dispatch(driverLoading());
  try {
    const response = await DriverServices.getAllDrivers();
    if (response.success) {
      dispatch(setDrivers(response.data));
      dispatch(driverSuccess());
    }
  } catch (error) {
    dispatch(driverError(error.message));
  }
};

export const updateDriverLocationThunk = (driverId, location) => async (dispatch) => {
  try {
    const response = await DriverServices.updateLocation(driverId, location);
    if (response.success) {
      dispatch(updateDriverLocation(location));
    }
  } catch (error) {
    console.error('Location update error:', error);
  }
};

export const startRoute = (driverId) => async (dispatch) => {
  dispatch(driverLoading());
  try {
    const response = await DriverServices.startRoute(driverId);
    if (response.success) {
      dispatch(setRouteStatus('active'));
      dispatch(driverSuccess());
    }
  } catch (error) {
    dispatch(driverError(error.message));
  }
};

export const endRoute = (driverId) => async (dispatch) => {
  dispatch(driverLoading());
  try {
    const response = await DriverServices.endRoute(driverId);
    if (response.success) {
      dispatch(setRouteStatus('completed'));
      dispatch(driverSuccess());
    }
  } catch (error) {
    dispatch(driverError(error.message));
  }
};

export const fetchDriverStudents = (driverId) => async (dispatch) => {
  dispatch(driverLoading());
  try {
    const response = await DriverServices.getDriverStudents(driverId);
    if (response.success) {
      dispatch(setDriverStudents(response.data));
      dispatch(driverSuccess());
    }
  } catch (error) {
    dispatch(driverError(error.message));
  }
};
