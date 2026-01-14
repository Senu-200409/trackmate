// Notification Actions

export const setNotification = (notification) => ({
  type: 'SET_NOTIFICATION',
  payload: notification,
});

export const setNotifications = (notifications) => ({
  type: 'SET_NOTIFICATIONS',
  payload: notifications,
});

export const addNotification = (notification) => ({
  type: 'ADD_NOTIFICATION',
  payload: notification,
});

export const setUnreadCount = (count) => ({
  type: 'SET_UNREAD_COUNT',
  payload: count,
});

export const markAsRead = (notificationId) => ({
  type: 'MARK_AS_READ',
  payload: notificationId,
});

export const notificationLoading = () => ({
  type: 'NOTIFICATION_LOADING',
});

export const notificationSuccess = () => ({
  type: 'NOTIFICATION_SUCCESS',
});

export const notificationError = (error) => ({
  type: 'NOTIFICATION_ERROR',
  payload: error,
});

// Async Actions (Thunks)
export const fetchNotifications = (userId) => async (dispatch) => {
  dispatch(notificationLoading());
  try {
    // TODO: Replace with actual API call
    dispatch(setNotifications([]));
    dispatch(notificationSuccess());
  } catch (error) {
    dispatch(notificationError(error.message));
  }
};

export const fetchUnreadCount = (userId) => async (dispatch) => {
  dispatch(notificationLoading());
  try {
    // TODO: Replace with actual API call
    dispatch(setUnreadCount(0));
    dispatch(notificationSuccess());
  } catch (error) {
    dispatch(notificationError(error.message));
  }
};

export const markNotificationAsRead = (notificationId) => async (dispatch) => {
  dispatch(notificationLoading());
  try {
    // TODO: Replace with actual API call
    dispatch(markAsRead(notificationId));
    dispatch(notificationSuccess());
  } catch (error) {
    dispatch(notificationError(error.message));
  }
};

export const sendNotification = (notificationData) => async (dispatch) => {
  dispatch(notificationLoading());
  try {
    // TODO: Replace with actual API call
    dispatch(addNotification(notificationData));
    dispatch(notificationSuccess());
  } catch (error) {
    dispatch(notificationError(error.message));
  }
};

export const subscribeToNotifications = (userId) => async (dispatch) => {
  dispatch(notificationLoading());
  try {
    // TODO: Replace with WebSocket subscription when backend is ready
    dispatch(notificationSuccess());
  } catch (error) {
    dispatch(notificationError(error.message));
  }
};
