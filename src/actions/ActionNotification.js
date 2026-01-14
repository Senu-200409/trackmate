import NotificationServices from '../services/NotificationServices';

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
    const response = await NotificationServices.getNotifications(userId);
    if (response.success) {
      dispatch(setNotifications(response.data));
      
      // Calculate unread count mock logic if needed, or if API returns it
      const unread = response.data.filter(n => !n.read).length;
      dispatch(setUnreadCount(unread));

      dispatch(notificationSuccess());
    }
  } catch (error) {
    dispatch(notificationError(error.message));
  }
};

export const fetchUnreadCount = (userId) => async (dispatch) => {
  dispatch(notificationLoading());
  try {
    const response = await NotificationServices.getUnreadCount(userId);
    if (response.success) {
      dispatch(setUnreadCount(response.data.count));
      dispatch(notificationSuccess());
    }
  } catch (error) {
    // Fallback if not implemented
    console.warn("fetchUnreadCount might not be fully implemented in mock", error);
    dispatch(notificationSuccess()); 
  }
};

export const markNotificationAsRead = (notificationId) => async (dispatch) => {
  // dispatch(notificationLoading()); // Optional, maybe too noisy for UI
  try {
    const response = await NotificationServices.markAsRead(notificationId);
    if (response.success) {
      dispatch(markAsRead(notificationId));
      dispatch(notificationSuccess());
    }
  } catch (error) {
    dispatch(notificationError(error.message));
  }
};

export const sendNotification = (notificationData) => async (dispatch) => {
  dispatch(notificationLoading());
  try {
    const response = await NotificationServices.sendNotification(notificationData);
    if (response.success) {
      dispatch(addNotification(response.data));
      dispatch(notificationSuccess());
    }
  } catch (error) {
    dispatch(notificationError(error.message));
  }
};

export const subscribeToNotifications = (userId) => async (dispatch) => {
  // dispatch(notificationLoading());
  try {
    // TODO: Replace with WebSocket subscription when backend is ready
    // For now, maybe just fetch once
    dispatch(fetchNotifications(userId));
    dispatch(notificationSuccess());
  } catch (error) {
    dispatch(notificationError(error.message));
  }
};
