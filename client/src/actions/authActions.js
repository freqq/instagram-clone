import {
    CHECK_USERNAME_AVAIBILITY,
    CHECK_EMAIL_AVAIBILITY,
    REGISTER,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    USER_LOADED,
    USER_LOADING,
    PASSWORD_CHANGE_SUCCESS
} from './types'
import axios from 'axios'
import {returnErrors} from "./messages";
import {toast} from 'react-toastify';

export const loadUser = () => (dispatch, getState) => {
    // User Loading
    dispatch({type: USER_LOADING});

    axios
        .get("http://localhost:5000/api/users/me", tokenConfig(getState))
        .then(res => {
            dispatch({type: USER_LOADED, payload: res.data});
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({type: AUTH_ERROR});
        });
};

export const login = (loginRequest) => dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const body = JSON.stringify(loginRequest);

    axios
        .post("http://localhost:5000/api/auth/signin", body, config)
        .then(res => {
            toast.success("Poprawnie zalogowany!", {position: toast.POSITION.TOP_RIGHT});
            dispatch({type: LOGIN_SUCCESS, payload: res.data});
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            toast.error("Zle dane logowania!", {position: toast.POSITION.TOP_RIGHT});
            dispatch({type: LOGIN_FAIL});
        });
}

export const register = (registerRequest) => dispatch => {
    var bodyFormData = new FormData()
    bodyFormData.set('name', registerRequest.name)
    bodyFormData.set('username', registerRequest.username)
    bodyFormData.set('email', registerRequest.email)
    bodyFormData.set('password', registerRequest.password)
    bodyFormData.append('image', registerRequest.image)

    axios({
        method: 'post',
        url: 'http://localhost:5000/api/auth/signup',
        data: bodyFormData,
        config: {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    }).then(registerResponse => {
        dispatch({type: REGISTER, payload: registerResponse})
    })
}

//TODO
export const logout = () => dispatch => {
    dispatch({type: LOGOUT_SUCCESS});
};

export const checkUsernameAvaibility = (username) => dispatch => {
    fetch(`http://localhost:5000/api/users/checkUsernameAvailability?username=${username}`, {
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(usernameAvaibility => {
            dispatch({type: CHECK_USERNAME_AVAIBILITY, payload: usernameAvaibility})
        })
}

export const checkEmailAvaibility = (email) => dispatch => {
    fetch(`http://localhost:5000/api/users/user/checkEmailAvailability?email=${email}`, {
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(emailAvaibility => dispatch({type: CHECK_EMAIL_AVAIBILITY, payload: emailAvaibility}))
}

export const changePassword = (changePasswordRequest) => dispatch => {
    fetch(`http://localhost:5000/api/auth/password/change`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
        body: JSON.stringify(changePasswordRequest)
        })
        .then(res => res.json())
        .then(changePasswordResponse =>{ 
            if(changePasswordResponse.success){
                toast.success("Poprawnie zmienione haslo.", {position: toast.POSITION.TOP_RIGHT});
            } else{
                toast.error("Zle dane podczas zmiany hasla.", {position: toast.POSITION.TOP_RIGHT});
            }
            dispatch({type: PASSWORD_CHANGE_SUCCESS, payload: changePasswordResponse.data})
        })
        .catch(err => {
            toast.error("Blad podczas zmiany hasla.", {position: toast.POSITION.TOP_RIGHT});
        })
}

export const tokenConfig = getState => {
    const token = getState().auth.token;

    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
};