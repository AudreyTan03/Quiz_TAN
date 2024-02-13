import axios from 'axios';
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_SET_INSTRUCTOR,
    USER_SET_STUDENT,
    USER_SEND_CHANGE_PASSWORD_FAIL,
    USER_SEND_CHANGE_PASSWORD_REQUEST,
    USER_SEND_CHANGE_PASSWORD_SUCCESS,
    USER_CONFIRM_CHANGE_PASSWORD_FAIL,
    USER_CONFIRM_CHANGE_PASSWORD_REQUEST,
    USER_CONFIRM_CHANGE_PASSWORD_SUCCESS,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_SET_ROLE_FAIL
} from '../constants/userConstants';

export const register = (name, email, password, userType, confirmPassword) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const { data } = await axios.post(
            'http://127.0.0.1:8000/api/users/register/',
            { name, email, password, password2: confirmPassword, user_type: userType }, // Include confirmPassword as password2
            config
        );
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data,
        });
        localStorage.setItem('userInfo', JSON.stringify(data));

        // Set user role
        if (userType === 'instructor') {
            dispatch({ type: USER_SET_INSTRUCTOR });
        } else {
            dispatch({ type: USER_SET_STUDENT });
        }

        // Redirect logic here

    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.details
                ? error.response.data.details
                : error.message,
        });
    }
};

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const { data } = await axios.post(
            'http://127.0.0.1:8000/api/users/login/',
            { email, password },
            config
        );
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        });
        localStorage.setItem('userInfo', JSON.stringify(data));

        // Set user role
        if (data.is_instructor) {
            dispatch({ type: USER_SET_INSTRUCTOR });
        } else {
            dispatch({ type: USER_SET_STUDENT });
        }

        // Redirect logic here

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.details
                ? error.response.data.details
                : error.message,
        });
    }
};

// Other action creators...


export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: USER_LOGOUT });
};

export const sendChangePassword = (password, password2, token) => async (dispatch) => {
    try {
        dispatch({ type: USER_SEND_CHANGE_PASSWORD_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const { data } = await axios.post(
            'http://127.0.0.1:8000/api/changepassword/',
            { password, password2 },
            config
        );
        dispatch({
            type: USER_SEND_CHANGE_PASSWORD_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: USER_SEND_CHANGE_PASSWORD_FAIL,
            payload: error.response && error.response.data.details
                ? error.response.data.details
                : error.message,
        });
    }
};

export const confirmChangePassword = (password, password2, uid, token) => async (dispatch) => {
    try {
        dispatch({ type: USER_CONFIRM_CHANGE_PASSWORD_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const { data } = await axios.post(
            `http://127.0.0.1:8000/api/reset-password/${uid}/${token}`,
            { password, password2 },
            config
        );
        dispatch({
            type: USER_CONFIRM_CHANGE_PASSWORD_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: USER_CONFIRM_CHANGE_PASSWORD_FAIL,
            payload: error.response && error.response.data.details
                ? error.response.data.details
                : error.message,
        });
    }
};
