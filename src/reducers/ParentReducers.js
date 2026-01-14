// Initial State for Parent
const initialState = {
  parent: null,
  parents: [],
  myChildren: [],
  alerts: [],
  history: [],
  loading: false,
  error: null,
};

// Parent Reducer
export default function ParentReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_PARENT':
      return {
        ...state,
        parent: action.payload,
      };

    case 'SET_PARENTS':
      return {
        ...state,
        parents: action.payload,
      };

    case 'SET_MY_CHILDREN':
      return {
        ...state,
        myChildren: action.payload,
      };

    case 'SET_ALERTS':
      return {
        ...state,
        alerts: action.payload,
      };

    case 'ADD_ALERT':
      return {
        ...state,
        alerts: [action.payload, ...state.alerts],
      };

    case 'SET_HISTORY':
      return {
        ...state,
        history: action.payload,
      };

    case 'PARENT_LOADING':
      return {
        ...state,
        loading: true,
        error: null,
      };

    case 'PARENT_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
      };

    case 'PARENT_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case 'UPDATE_PARENT':
      return {
        ...state,
        parent: { ...state.parent, ...action.payload },
      };

    default:
      return state;
  }
}
