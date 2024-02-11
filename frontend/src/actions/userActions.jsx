import axios from 'axios';
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_SEND_CHANGE_PASSWORD_FAIL,
    USER_SEND_CHANGE_PASSWORD_REQUEST,
    USER_SEND_CHANGE_PASSWORD_SUCCESS,
    USER_CONFIRM_CHANGE_PASSWORD_FAIL,
    USER_CONFIRM_CHANGE_PASSWORD_REQUEST,
    USER_CONFIRM_CHANGE_PASSWORD_SUCCESS,
} from '../constants/userConstants';

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const { data } = await axios.post(
            'api/users/login/',
            { email, password },
            config
        );

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        });

        localStorage.setItem('userInfo', JSON.stringify(data));

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message ?
                    error.response.data.message :
                    error.message
        });
    }
};


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
