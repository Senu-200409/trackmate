import DeviceServices from '../services/DeviceServices';

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
    const response = await DeviceServices.getDevice(deviceId);
    if (response.success) {
      dispatch(setDevice(response.data));
      dispatch(deviceSuccess());
    }
  } catch (error) {
    dispatch(deviceError(error.message));
  }
};

export const fetchDevices = () => async (dispatch) => {
  dispatch(deviceLoading());
  try {
    const response = await DeviceServices.getAllDevices();
    if (response.success) {
      dispatch(setDevices(response.data));
      dispatch(deviceSuccess());
    }
  } catch (error) {
    dispatch(deviceError(error.message));
  }
};

export const fetchDevicesByBus = (busId) => async (dispatch) => {
  dispatch(deviceLoading());
  try {
    const response = await DeviceServices.getDevicesByBus(busId);
    if (response.success) {
      dispatch(setDevices(response.data));
      dispatch(deviceSuccess());
    }
  } catch (error) {
    dispatch(deviceError(error.message));
  }
};

export const fetchDeviceStatus = (deviceId) => async (dispatch) => {
  dispatch(deviceLoading());
  try {
    const response = await DeviceServices.getDeviceStatus(deviceId);
    if (response.success) {
      dispatch(setDeviceStatus(response.data));
      dispatch(deviceSuccess());
    }
  } catch (error) {
    dispatch(deviceError(error.message));
  }
};

export const updateDeviceLocationThunk = (deviceId, location) => async (dispatch) => {
  // dispatch(deviceLoading()); // Can skip for real-time
  try {
    const response = await DeviceServices.updateLocation(deviceId, location);
    if (response.success) {
      dispatch(updateDeviceLocation(deviceId, location));
      // dispatch(deviceSuccess());
    }
  } catch (error) {
    dispatch(deviceError(error.message));
  }
};

export const registerDevice = (deviceData) => async (dispatch) => {
  dispatch(deviceLoading());
  try {
    const response = await DeviceServices.registerDevice(deviceData);
    if (response.success) {
      dispatch(deviceSuccess());
      // Refresh list
      dispatch(fetchDevices());
    }
  } catch (error) {
    dispatch(deviceError(error.message));
  }
};
