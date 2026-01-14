import ParentServices from '../services/ParentServices';

// Parent Actions

export const setParent = (parent) => ({
  type: 'SET_PARENT',
  payload: parent,
});

export const setParents = (parents) => ({
  type: 'SET_PARENTS',
  payload: parents,
});

export const setMyChildren = (children) => ({
  type: 'SET_MY_CHILDREN',
  payload: children,
});

export const setAlerts = (alerts) => ({
  type: 'SET_ALERTS',
  payload: alerts,
});

export const addAlert = (alert) => ({
  type: 'ADD_ALERT',
  payload: alert,
});

export const setHistory = (history) => ({
  type: 'SET_HISTORY',
  payload: history,
});

export const updateParent = (parentData) => ({
  type: 'UPDATE_PARENT',
  payload: parentData,
});

export const parentLoading = () => ({
  type: 'PARENT_LOADING',
});

export const parentSuccess = () => ({
  type: 'PARENT_SUCCESS',
});

export const parentError = (error) => ({
  type: 'PARENT_ERROR',
  payload: error,
});

// Async Actions (Thunks)
export const fetchParent = (parentId) => async (dispatch) => {
  dispatch(parentLoading());
  try {
    const response = await ParentServices.getParent(parentId);
    if (response.success) {
      dispatch(setParent(response.data));
      dispatch(parentSuccess());
    }
  } catch (error) {
    dispatch(parentError(error.message));
  }
};

export const fetchMyChildren = (parentId) => async (dispatch) => {
  dispatch(parentLoading());
  try {
    const response = await ParentServices.getChildren(parentId);
    if (response.success) {
      dispatch(setMyChildren(response.data));
      dispatch(parentSuccess());
    }
  } catch (error) {
    dispatch(parentError(error.message));
  }
};

export const fetchAlerts = (parentId) => async (dispatch) => {
  dispatch(parentLoading());
  try {
    const response = await ParentServices.getAlerts(parentId);
    if (response.success) {
      dispatch(setAlerts(response.data));
      dispatch(parentSuccess());
    }
  } catch (error) {
    dispatch(parentError(error.message));
  }
};

export const fetchHistory = (parentId) => async (dispatch) => {
  dispatch(parentLoading());
  try {
    const response = await ParentServices.getTripHistory(parentId);
    if (response.success) {
      dispatch(setHistory(response.data));
      dispatch(parentSuccess());
    }
  } catch (error) {
    dispatch(parentError(error.message));
  }
};

export const getChildLocation = (childId) => async (dispatch) => {
  // Can be used to just fetch location once or initiate polling
  try {
    const response = await ParentServices.getChildLocation(childId);
    if (response.success) {
       // Could dispatch an update to a child object or a specific location state
       // For now, just success
      dispatch(parentSuccess());
      return response.data;
    }
  } catch (error) {
    dispatch(parentError(error.message));
  }
};
