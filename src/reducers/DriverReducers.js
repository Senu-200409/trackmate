// Initial State for Driver
const initialState = {
  driver: null,
  drivers: [],
  currentLocation: null,
  routeStatus: 'inactive',
  students: [],
  loading: false,
  error: null,
};

// Driver Reducer
export default function DriverReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_DRIVER':
      return {
        ...state,
        driver: action.payload,
      };

    case 'SET_DRIVERS':
      return {
        ...state,
        drivers: action.payload,
      };

    case 'UPDATE_DRIVER_LOCATION':
      return {
        ...state,
        currentLocation: action.payload,
      };

    case 'SET_ROUTE_STATUS':
      return {
        ...state,
        routeStatus: action.payload,
      };

    case 'SET_DRIVER_STUDENTS':
      return {
        ...state,
        students: action.payload,
      };

    case 'DRIVER_LOADING':
      return {
        ...state,
        loading: true,
        error: null,
      };

    case 'DRIVER_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
      };

    case 'DRIVER_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case 'UPDATE_DRIVER':
      return {
        ...state,
        driver: { ...state.driver, ...action.payload },
      };

    default:
      return state;
  }
}
