import BusServices from '../services/BusServices';

// Bus Actions

export const setBus = (bus) => ({
  type: 'SET_BUS',
  payload: bus,
});

export const setBuses = (buses) => ({
  type: 'SET_BUSES',
  payload: buses,
});

export const setBusHealth = (busHealth) => ({
  type: 'SET_BUS_HEALTH',
  payload: busHealth,
});

export const setMaintenance = (maintenance) => ({
  type: 'SET_MAINTENANCE',
  payload: maintenance,
});

export const updateBus = (busData) => ({
  type: 'UPDATE_BUS',
  payload: busData,
});

export const busLoading = () => ({
  type: 'BUS_LOADING',
});

export const busSuccess = () => ({
  type: 'BUS_SUCCESS',
});

export const busError = (error) => ({
  type: 'BUS_ERROR',
  payload: error,
});

// Async Actions (Thunks)
export const fetchBus = (busId) => async (dispatch) => {
  dispatch(busLoading());
  try {
    const response = await BusServices.getBus(busId);
    if (response.success) {
      dispatch(setBus(response.data));
      dispatch(busSuccess());
    }
  } catch (error) {
    dispatch(busError(error.message));
  }
};

export const fetchBuses = () => async (dispatch) => {
  dispatch(busLoading());
  try {
    const response = await BusServices.getAllBuses();
    if (response.success) {
      dispatch(setBuses(response.data));
      dispatch(busSuccess());
    }
  } catch (error) {
    dispatch(busError(error.message));
  }
};

export const fetchBusHealth = (busId) => async (dispatch) => {
  dispatch(busLoading());
  try {
    const response = await BusServices.getBusStatus(busId);
    if (response.success) {
      dispatch(setBusHealth(response.data));
      dispatch(busSuccess());
    }
  } catch (error) {
    dispatch(busError(error.message));
  }
};

export const fetchMaintenanceRecords = (busId) => async (dispatch) => {
  dispatch(busLoading());
  try {
    const response = await BusServices.getMaintenanceRecords(busId);
    if (response.success) {
      dispatch(setMaintenance(response.data));
      dispatch(busSuccess());
    }
  } catch (error) {
    dispatch(busError(error.message));
  }
};

export const addBus = (busData) => async (dispatch) => {
  dispatch(busLoading());
  try {
    const response = await BusServices.addBus(busData);
    if (response.success) {
      // dispatch(fetchBuses()); // Refresh list ?
      dispatch(busSuccess());
    }
  } catch (error) {
    dispatch(busError(error.message));
  }
};

export const updateBusData = (busId, busData) => async (dispatch) => {
  dispatch(busLoading());
  try {
    const response = await BusServices.updateBus(busId, busData);
    if (response.success) {
      dispatch(updateBus(response.data));
      dispatch(busSuccess());
    }
  } catch (error) {
    dispatch(busError(error.message));
  }
};
