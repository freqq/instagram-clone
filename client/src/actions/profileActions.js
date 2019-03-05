import {
    SEARCH_USERS,
    SEARCH_USERS_NOT_FOUND,
    GET_USER_PROFILE,
    GET_USER_PROFILE_NOT_FOUND,
    GET_USER_FOLLOWERS,
    GET_USER_FOLLOWING,
    GET_USER_DATA_TO_EDIT,
    UPDATE_USER,
    UPDATE_USER_FAIL,
    UPDATE_USER_PHOTO,
    DELETE_USER_PHOTO,
    PROFILE_PRIVATE,
    GET_PROFILE_NOTIFICATIONS,
    DECLINE_FOLLOW_REQUEST,
    ACCEPT_FOLLOW_REQUEST
} from './types'
import axios from 'axios'
import {toast} from 'react-toastify';
import {returnErrors} from "./messages";

export const lookForUsers = (searchText) => (dispatch, getState) => {
    axios
        .get(`http://localhost:5000/api/users/search/${searchText}`, tokenConfig(getState))
        .then(res => {
            dispatch({type: SEARCH_USERS, payload: res.data});
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({type: SEARCH_USERS_NOT_FOUND});
        });
};

export const getUserProfileByUsername = (username) => (dispatch, getState) => {
    axios
        .get(`http://localhost:5000/api/users/profile/${username}`, tokenConfig(getState))
        .then(res => {
            dispatch({type: GET_USER_PROFILE, payload: res.data});
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({type: GET_USER_PROFILE_NOT_FOUND});
        });
};

export const setProfilePrivate = () => (dispatch) => {
    fetch(`http://localhost:5000/api/users/me/private`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
        })
        .then(res => res.json())
        .then(privateResponse => dispatch({type: PROFILE_PRIVATE, payload: privateResponse.data}))
}

export const getUserFollowers = (userId) => (dispatch, getState) => {
    axios
        .get(`http://localhost:5000/api/follow/${userId}/followers`, tokenConfig(getState))
        .then(res => {
            dispatch({type: GET_USER_FOLLOWERS, payload: res.data.userSummaryList});
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({type: GET_USER_PROFILE_NOT_FOUND});
        });
}

export const getUserFollowing = (userId) => (dispatch, getState) => {
    axios
        .get(`http://localhost:5000/api/follow/${userId}/following`, tokenConfig(getState))
        .then(res => {
            dispatch({type: GET_USER_FOLLOWING, payload: res.data.userSummaryList});
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({type: GET_USER_PROFILE_NOT_FOUND});
        });
}

export const getUserDataToEdit = (userId) => (dispatch, getState) => {
    axios
        .get(`http://localhost:5000/api/users/profile/edit`, tokenConfig(getState))
        .then(res => {
            dispatch({type: GET_USER_DATA_TO_EDIT, payload: res.data});
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({type: GET_USER_PROFILE_NOT_FOUND});
        });
}

export const updateUserData = profileUpdateRequest => (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + localStorage.getItem("token")
        }
    };

    const body = JSON.stringify(profileUpdateRequest);

    axios
        .put("http://localhost:5000/api/users/profile/edit", body, config)
        .then(updateResponse => {
            dispatch({type: UPDATE_USER, payload: updateResponse.data})
            toast.success("Uzytkownik poprawnie edytowany.", {position: toast.POSITION.TOP_RIGHT});
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            toast.error("Wystapil blad podczas edycji uzytkownika.", {position: toast.POSITION.TOP_RIGHT});
            dispatch({type: UPDATE_USER_FAIL});
        })

}

export const updateUserProfilePicture = picture => (dispatch, getState) => {
    var bodyFormData = new FormData()
    bodyFormData.set('image', picture)

    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": 'Bearer ' + localStorage.getItem("token")
        }
    };

    axios
        .post('http://localhost:5000/api/users/profile/photo', bodyFormData, config)
        .then(updatePhotoResponse => {
            toast.success("Zdjecie profilowe uzytkownika zmienione poprawnie.", {position: toast.POSITION.TOP_RIGHT});
            dispatch({type: UPDATE_USER_PHOTO, payload: updatePhotoResponse.data})
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            toast.error("Wystapil blad podczas edycji zdjecia profilowego uzytkownika.", {position: toast.POSITION.TOP_RIGHT});
            dispatch({type: UPDATE_USER_FAIL});
        })
}

export const deleteUserProfilePicture = () => dispatch => {
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": 'Bearer ' + localStorage.getItem("token")
        }
    };

    axios
        .delete('http://localhost:5000/api/users/profile/photo', config)
        .then(deletePhotoResponse => {
            toast.success("Zdjecie profilowe uzytkownika zostalo poprawnie usuniete.", {position: toast.POSITION.TOP_RIGHT});
            dispatch({type: DELETE_USER_PHOTO, payload: deletePhotoResponse.data})
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            toast.error("Wystapil blad podczas usuwania zdjecia profilowego uzytkownika.", {position: toast.POSITION.TOP_RIGHT});
            dispatch({type: UPDATE_USER_FAIL});
        })
}

export const getUserNotifications = () => dispatch => {
    fetch(`http://localhost:5000/api/users/notifications`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
        })
        .then(res => res.json())
        .then(notifications => dispatch({type: GET_PROFILE_NOTIFICATIONS, payload: notifications}))
}

export const acceptFollowRequest = (followId) => dispatch => {
    fetch(`http://localhost:5000/api/follow/${followId}/accept`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
        })
        .then(res => res.json())
        .then(acceptFollowResponse => dispatch({type: ACCEPT_FOLLOW_REQUEST, payload: acceptFollowResponse.data}))
}

export const declineFollowRequest = (followId) => dispatch => {
    fetch(`http://localhost:5000/api/follow/${followId}/decline`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
        })
        .then(res => res.json())
        .then(acceptDeclineResponse => dispatch({type: DECLINE_FOLLOW_REQUEST, payload: acceptDeclineResponse.data}))
}

export const changeUserPassword = (changePasswordRequest) => dispatch => {}

export const tokenConfig = getState => {
    // Get token from state
    const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    // If token, add to headers config
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
};