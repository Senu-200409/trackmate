// Initial State for Notification
const initialState = {
  notification: null,
  notifications: [],
  unreadCount: 0,
  loading: false,
  error: null,
};

// Notification Reducer
export default function NotificationReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return {
        ...state,
        notification: action.payload,
      };

    case 'SET_NOTIFICATIONS':
      return {
        ...state,
        notifications: action.payload,
      };

    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
        unreadCount: state.unreadCount + 1,
      };

    case 'SET_UNREAD_COUNT':
      return {
        ...state,
        unreadCount: action.payload,
      };

    case 'MARK_AS_READ':
      return {
        ...state,
        notifications: state.notifications.map(notif =>
          notif.id === action.payload ? { ...notif, read: true } : notif
        ),
        unreadCount: Math.max(0, state.unreadCount - 1),
      };

    case 'NOTIFICATION_LOADING':
      return {
        ...state,
        loading: true,
        error: null,
      };

    case 'NOTIFICATION_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
      };

    case 'NOTIFICATION_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
