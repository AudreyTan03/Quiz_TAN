import {
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_SEND_CHANGE_PASSWORD_REQUEST,
    USER_SEND_CHANGE_PASSWORD_SUCCESS,
    USER_SEND_CHANGE_PASSWORD_FAIL,
    USER_CONFIRM_CHANGE_PASSWORD_REQUEST,
    USER_CONFIRM_CHANGE_PASSWORD_SUCCESS,
    USER_CONFIRM_CHANGE_PASSWORD_FAIL,
    USER_SET_INSTRUCTOR,
    USER_SET_STUDENT,
    USER_SET_ROLE_FAIL,
} from '../constants/userConstants';

export const userSetRoleReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_SET_INSTRUCTOR:
            return { ...state, is_instructor: true };
        case USER_SET_STUDENT:
            return { ...state, is_instructor: false };
        case USER_SET_ROLE_FAIL:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};


export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_REGISTER_REQUEST:
        return { loading: true };
      case USER_REGISTER_SUCCESS:
        return { loading: false, userInfo: action.payload };
      case USER_REGISTER_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };


export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true };
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload };
        case USER_LOGOUT:
            return {};
        default:
            return state;
    }
};

// Handling new actions for changing password
export const userSendChangePasswordReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_SEND_CHANGE_PASSWORD_REQUEST:
            return { loading: true };
        case USER_SEND_CHANGE_PASSWORD_SUCCESS:
            return { loading: false, success: true };
        case USER_SEND_CHANGE_PASSWORD_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const userConfirmChangePasswordReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_CONFIRM_CHANGE_PASSWORD_REQUEST:
            return { loading: true };
        case USER_CONFIRM_CHANGE_PASSWORD_SUCCESS:
            return { loading: false, success: true };
        case USER_CONFIRM_CHANGE_PASSWORD_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
