// Initial State for Device
const initialState = {
  device: null,
  devices: [],
  deviceStatus: {},
  gpsTracking: {},
  loading: false,
  error: null,
};

// Device Reducer
export default function DeviceReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_DEVICE':
      return {
        ...state,
        device: action.payload,
      };

    case 'SET_DEVICES':
      return {
        ...state,
        devices: action.payload,
      };

    case 'SET_DEVICE_STATUS':
      return {
        ...state,
        deviceStatus: action.payload,
      };

    case 'SET_GPS_TRACKING':
      return {
        ...state,
        gpsTracking: action.payload,
      };

    case 'UPDATE_DEVICE_LOCATION':
      return {
        ...state,
        gpsTracking: {
          ...state.gpsTracking,
          [action.payload.deviceId]: action.payload.location,
        },
      };

    case 'DEVICE_LOADING':
      return {
        ...state,
        loading: true,
        error: null,
      };

    case 'DEVICE_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
      };

    case 'DEVICE_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case 'UPDATE_DEVICE':
      return {
        ...state,
        device: { ...state.device, ...action.payload },
      };

    default:
      return state;
  }
}
