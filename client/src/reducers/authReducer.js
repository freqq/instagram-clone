import {
    REGISTER,
    CHECK_USERNAME_AVAIBILITY,
    CHECK_EMAIL_AVAIBILITY,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    USER_LOADED,
    USER_LOADING
} from '../actions/types';

const initialState = {
    usernameAvaibility: {},
    emailAvaibility: {},
    loginResponse: {},
    registerResponse: {},
    isAuthenticated: false,
    isLoading: false,
    user: null,
    token: localStorage.getItem("token")
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            localStorage.setItem("token", action.payload.accessToken);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
                token: localStorage.getItem("token")
            };
        case REGISTER:
            return {
                ...state,
                registerResponse: action.payload
            }
        case CHECK_USERNAME_AVAIBILITY:
            return {
                ...state,
                usernameAvaibility: action.payload
            }
        case CHECK_EMAIL_AVAIBILITY:
            return {
                ...state,
                emailAvaibility: action.payload
            }
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            localStorage.removeItem("token");
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false
            };
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            };
        default:
            return state;
    }
}
