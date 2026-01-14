// Initial State for Student
const initialState = {
  student: null,
  students: [],
  enrollments: [],
  attendance: [],
  loading: false,
  error: null,
};

// Student Reducer
export default function StudentReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_STUDENT':
      return {
        ...state,
        student: action.payload,
      };

    case 'SET_STUDENTS':
      return {
        ...state,
        students: action.payload,
      };

    case 'SET_ENROLLMENTS':
      return {
        ...state,
        enrollments: action.payload,
      };

    case 'SET_ATTENDANCE':
      return {
        ...state,
        attendance: action.payload,
      };

    case 'STUDENT_LOADING':
      return {
        ...state,
        loading: true,
        error: null,
      };

    case 'STUDENT_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
      };

    case 'STUDENT_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case 'UPDATE_STUDENT':
      return {
        ...state,
        student: { ...state.student, ...action.payload },
      };

    default:
      return state;
  }
}
