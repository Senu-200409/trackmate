// Initial State for Routes
const initialState = {
  route: null,
  routes: [],
  activeRoutes: [],
  routeDetails: {},
  loading: false,
  error: null,
};

// Routes Reducer
export default function RoutesReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_ROUTE':
      return {
        ...state,
        route: action.payload,
      };

    case 'SET_ROUTES':
      return {
        ...state,
        routes: action.payload,
      };

    case 'SET_ACTIVE_ROUTES':
      return {
        ...state,
        activeRoutes: action.payload,
      };

    case 'SET_ROUTE_DETAILS':
      return {
        ...state,
        routeDetails: action.payload,
      };

    case 'ROUTES_LOADING':
      return {
        ...state,
        loading: true,
        error: null,
      };

    case 'ROUTES_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
      };

    case 'ROUTES_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case 'UPDATE_ROUTE':
      return {
        ...state,
        route: { ...state.route, ...action.payload },
      };

    default:
      return state;
  }
}
