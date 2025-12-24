import {
    GetAllSchool_REQUEST,
    GetAllSchool_SUCCESS,
    GetAllSchool_FAIL,
    AddSchoolDetails_REQUEST,
    AddSchoolDetails_SUCCESS,
    AddSchoolDetails_FAIL,
    // GetCategoriesByCategoryId_REQUEST,
    // GetCategoriesByCategoryId_SUCCESS,
    // GetCategoriesByCategoryId_FAIL,
    PutSchoolDetails_REQUEST,
    PutSchoolDetails_SUCCESS,
    PutSchoolDetails_FAIL
} from '../constants/SchoolConstants';
const initialState = {
    responseBody: [],
    loading: false,
    msg: null,
};

// Get all School
export const GetAllSchool = (state = initialState, action) => {
    switch (action.type) {
        case GetAllSchool_REQUEST:
            return {
                ...state,
                loading: true,
                msg: null,
            };
        case GetAllSchool_SUCCESS:
            return {
                ...state,
                loading: false,
                responseBody: action.payload.responseBody,
                msg: ""
            };
        case GetAllSchool_FAIL:
            return {
                ...state,
                loading: false,
                msg: action.payload.msg,
            };
        default:
            return state;
    }
}

// Add new School
export const AddSchoolDetails = (state = initialState, action) => {
    switch (action.type) {
        case AddSchoolDetails_REQUEST:
            return {
                ...state,
                loading: true,
                msg: null,
            };
        case AddSchoolDetails_SUCCESS:
            return {
                ...state,
                loading: false,
                msg: action.payload.responseBody || "Category added successfully!",
            };
        case AddSchoolDetails_FAIL:
            return {
                ...state,
                loading: false,
                msg: action.payload.msg,
            };
        default:
            return state;
    }
}

// // Get categories by id
// export const GetCategoriesByCategoryId = (state = initialState, action) => {
//     switch (action.type) {
//         case GetCategoriesByCategoryId_REQUEST:
//             return {
//                 ...state,
//                 loading: true,
//                 msg: null,
//             };
//         case GetCategoriesByCategoryId_SUCCESS:
//             return {
//                 ...state,
//                 loading: false,
//                 responseBody: action.payload.responseBody,
//                 msg: null,
//             };
//         case GetCategoriesByCategoryId_FAIL:
//             return {
//                 ...state,
//                 loading: false,
//                 msg: action.payload.msg,
//             };
//         default:
//             return state;
//     }
// }

// Put Categories
export const PutSchoolDetails = (state = initialState, action) => {
    switch (action.type) {
        case PutSchoolDetails_REQUEST:
            return {
                ...state,
                loading: true,
                msg: null,
            };
        case PutSchoolDetails_SUCCESS:
            return {
                ...state,
                loading: false,
                msg: action.payload.responseBody || "school updated successfully!",
            };
        case PutSchoolDetails_FAIL:
            return {
                ...state,
                loading: false,
                msg: action.payload.msg,
            };
        default:
            return state;
    }
};