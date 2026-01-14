// Initial State for Owner
const initialState = {
  owner: null,
  owners: [],
  fleet: [],
  analytics: {
    totalBuses: 0,
    totalDrivers: 0,
    totalStudents: 0,
    activeRoutes: 0,
  },
  loading: false,
  error: null,
};

// Owner Reducer
export default function OwnerReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_OWNER':
      return {
        ...state,
        owner: action.payload,
      };

    case 'SET_OWNERS':
      return {
        ...state,
        owners: action.payload,
      };

    case 'SET_FLEET':
      return {
        ...state,
        fleet: action.payload,
      };

    case 'SET_ANALYTICS':
      return {
        ...state,
        analytics: action.payload,
      };

    case 'OWNER_LOADING':
      return {
        ...state,
        loading: true,
        error: null,
      };

    case 'OWNER_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
      };

    case 'OWNER_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case 'UPDATE_OWNER':
      return {
        ...state,
        owner: { ...state.owner, ...action.payload },
      };

    default:
      return state;
  }
}
