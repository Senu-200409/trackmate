import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// Import all reducers
import UserReducer from './reducers/UserReducers';
import DriverReducer from './reducers/DriverReducers';
import OwnerReducer from './reducers/OwnerReducers';
import ParentReducer from './reducers/ParentReducers';
import BusReducer from './reducers/BusReducers';
import StudentReducer from './reducers/StudentReducers';
import RouteReducer from './reducers/RoutesReducers';
import SchoolReducer from './reducers/SchoolReducers';
import NotificationReducer from './reducers/NotificationReducers';
import DeviceReducer from './reducers/DeviceReducers';

// Root Reducer
const rootReducer = combineReducers({
  user: UserReducer,
  driver: DriverReducer,
  owner: OwnerReducer,
  parent: ParentReducer,
  bus: BusReducer,
  student: StudentReducer,
  route: RouteReducer,
  school: SchoolReducer,
  notification: NotificationReducer,
  device: DeviceReducer,
});

// Create Redux Store
const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;
