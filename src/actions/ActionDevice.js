// Device Actions

export const setDevice = (device) => ({
  type: 'SET_DEVICE',
  payload: device,
});

export const setDevices = (devices) => ({
  type: 'SET_DEVICES',
  payload: devices,
});

export const setDeviceStatus = (status) => ({
  type: 'SET_DEVICE_STATUS',
  payload: status,
});

export const setGpsTracking = (tracking) => ({
  type: 'SET_GPS_TRACKING',
  payload: tracking,
});

export const updateDeviceLocation = (deviceId, location) => ({
  type: 'UPDATE_DEVICE_LOCATION',
  payload: { deviceId, location },
});

export const updateDevice = (deviceData) => ({
  type: 'UPDATE_DEVICE',
  payload: deviceData,
});

export const deviceLoading = () => ({
  type: 'DEVICE_LOADING',
});

export const deviceSuccess = () => ({
  type: 'DEVICE_SUCCESS',
});

export const deviceError = (error) => ({
  type: 'DEVICE_ERROR',
  payload: error,
});

// Async Actions (Thunks)
export const fetchDevice = (deviceId) => async (dispatch) => {
  dispatch(deviceLoading());
  try {
    // TODO: Replace with actual API call
    dispatch(deviceSuccess());
  } catch (error) {
    dispatch(deviceError(error.message));
  }
};

export const fetchDevices = () => async (dispatch) => {
  dispatch(deviceLoading());
  try {
    // TODO: Replace with actual API call
    dispatch(setDevices([]));
    dispatch(deviceSuccess());
  } catch (error) {
    dispatch(deviceError(error.message));
  }
};

export const fetchDevicesByBus = (busId) => async (dispatch) => {
  dispatch(deviceLoading());
  try {
    // TODO: Replace with actual API call
    dispatch(setDevices([]));
    dispatch(deviceSuccess());
  } catch (error) {
    dispatch(deviceError(error.message));
  }
};

export const fetchDeviceStatus = (deviceId) => async (dispatch) => {
  dispatch(deviceLoading());
  try {
    // TODO: Replace with actual API call
    dispatch(setDeviceStatus({}));
    dispatch(deviceSuccess());
  } catch (error) {
    dispatch(deviceError(error.message));
  }
};

export const updateDeviceLocationThunk = (deviceId, location) => async (dispatch) => {
  dispatch(deviceLoading());
  try {
    // TODO: Replace with actual API call - should be called frequently for real-time tracking
    dispatch(updateDeviceLocation(deviceId, location));
    dispatch(deviceSuccess());
  } catch (error) {
    dispatch(deviceError(error.message));
  }
};

export const subscribeToGpsTracking = (busId) => async (dispatch) => {
  dispatch(deviceLoading());
  try {
    // TODO: Replace with WebSocket subscription when backend is ready
    dispatch(deviceSuccess());
  } catch (error) {
    dispatch(deviceError(error.message));
  }
};

export const addDevice = (deviceData) => async (dispatch) => {
  dispatch(deviceLoading());
  try {
    // TODO: Replace with actual API call
    dispatch(deviceSuccess());
  } catch (error) {
    dispatch(deviceError(error.message));
  }
};

export const updateDeviceData = (deviceId, deviceData) => async (dispatch) => {
  dispatch(deviceLoading());
  try {
    // TODO: Replace with actual API call
    dispatch(updateDevice(deviceData));
    dispatch(deviceSuccess());
  } catch (error) {
    dispatch(deviceError(error.message));
  }
};
