// Initial State for Bus
const initialState = {
  bus: null,
  buses: [],
  busHealth: {},
  maintenance: [],
  loading: false,
  error: null,
};

// Bus Reducer
export default function BusReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_BUS':
      return {
        ...state,
        bus: action.payload,
      };

    case 'SET_BUSES':
      return {
        ...state,
        buses: action.payload,
      };

    case 'SET_BUS_HEALTH':
      return {
        ...state,
        busHealth: action.payload,
      };

    case 'SET_MAINTENANCE':
      return {
        ...state,
        maintenance: action.payload,
      };

    case 'BUS_LOADING':
      return {
        ...state,
        loading: true,
        error: null,
      };

    case 'BUS_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
      };

    case 'BUS_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case 'UPDATE_BUS':
      return {
        ...state,
        bus: { ...state.bus, ...action.payload },
      };

    default:
      return state;
  }
}
