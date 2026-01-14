import RoutesServices from '../services/RoutesServices';

// Route Actions

export const setRoute = (route) => ({
  type: 'SET_ROUTE',
  payload: route,
});

export const setRoutes = (routes) => ({
  type: 'SET_ROUTES',
  payload: routes,
});

export const setActiveRoutes = (activeRoutes) => ({
  type: 'SET_ACTIVE_ROUTES',
  payload: activeRoutes,
});

export const setRouteDetails = (routeDetails) => ({
  type: 'SET_ROUTE_DETAILS',
  payload: routeDetails,
});

export const updateRoute = (routeData) => ({
  type: 'UPDATE_ROUTE',
  payload: routeData,
});

export const routesLoading = () => ({
  type: 'ROUTES_LOADING',
});

export const routesSuccess = () => ({
  type: 'ROUTES_SUCCESS',
});

export const routesError = (error) => ({
  type: 'ROUTES_ERROR',
  payload: error,
});

// Async Actions (Thunks)
export const fetchRoute = (routeId) => async (dispatch) => {
  dispatch(routesLoading());
  try {
    const response = await RoutesServices.getRoute(routeId);
    if (response.success) {
      dispatch(setRoute(response.data));
      dispatch(routesSuccess());
    }
  } catch (error) {
    dispatch(routesError(error.message));
  }
};

export const fetchRoutes = () => async (dispatch) => {
  dispatch(routesLoading());
  try {
    const response = await RoutesServices.getAllRoutes();
    if (response.success) {
      dispatch(setRoutes(response.data));
      dispatch(routesSuccess());
    }
  } catch (error) {
    dispatch(routesError(error.message));
  }
};

export const fetchActiveRoutes = () => async (dispatch) => {
  dispatch(routesLoading());
  try {
    const response = await RoutesServices.getActiveRoutes();
    if (response.success) {
      dispatch(setActiveRoutes(response.data));
      dispatch(routesSuccess());
    }
  } catch (error) {
    dispatch(routesError(error.message));
  }
};

export const fetchRouteDetails = (routeId) => async (dispatch) => {
  dispatch(routesLoading());
  try {
    const response = await RoutesServices.getRouteDetails(routeId);
    if (response.success) {
      dispatch(setRouteDetails(response.data));
      dispatch(routesSuccess());
    }
  } catch (error) {
    dispatch(routesError(error.message));
  }
};

export const fetchRoutesBySchool = (schoolId) => async (dispatch) => {
  dispatch(routesLoading());
  try {
    const response = await RoutesServices.getRoutesBySchool(schoolId);
    if (response.success) {
      dispatch(setRoutes(response.data));
      dispatch(routesSuccess());
    }
  } catch (error) {
    dispatch(routesError(error.message));
  }
};

export const addRoute = (routeData) => async (dispatch) => {
  dispatch(routesLoading());
  try {
    const response = await RoutesServices.addRoute(routeData);
    if (response.success) {
      dispatch(routesSuccess());
    }
  } catch (error) {
    dispatch(routesError(error.message));
  }
};
