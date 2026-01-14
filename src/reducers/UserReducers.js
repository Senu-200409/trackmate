// Initial State for User
const initialState = {
  user: null,
  users: [],
  loading: false,
  error: null,
  authenticated: false,
  token: null,
};

// User Reducer
export default function UserReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        authenticated: true,
      };

    case 'CLEAR_USER':
      return {
        ...state,
        user: null,
        authenticated: false,
        token: null,
      };

    case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload,
        authenticated: true,
      };

    case 'SET_USERS':
      return {
        ...state,
        users: action.payload,
      };

    case 'USER_LOADING':
      return {
        ...state,
        loading: true,
        error: null,
      };

    case 'USER_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
      };

    case 'USER_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case 'UPDATE_USER':
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };

    default:
      return state;
  }
}
