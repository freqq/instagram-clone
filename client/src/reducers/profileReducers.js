import {
    SEARCH_USERS,
    GET_USER_PROFILE,
    GET_USER_FOLLOWING,
    GET_USER_FOLLOWERS,
    GET_USER_DATA_TO_EDIT,
    UPDATE_USER,
    UPDATE_USER_PHOTO,
    DELETE_USER_PHOTO,
    GET_PROFILE_NOTIFICATIONS
} from '../actions/types';

const initialState = {
    foundUsers: [],
    userProfile: null,
    followers: [],
    followings: [],
    editData: {},
    editUserStatus: {},
    updateUserPath: null,
    deleteUserPhoto: null,
    notifications: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SEARCH_USERS:
            return {
                ...state,
                foundUsers: action.payload
            }
        case GET_USER_FOLLOWERS:
            return {
                ...state,
                followers: action.payload
            }
        case GET_USER_FOLLOWING:
            return {
                ...state,
                followings: action.payload
            }
        case GET_PROFILE_NOTIFICATIONS:
            return {
                ...state,
                notifications: action.payload
            }
        case UPDATE_USER_PHOTO:
            return {
                ...state,
                updateUserPath: action.payload
            }
        case DELETE_USER_PHOTO:
            return {
                ...state,
                deleteUserPhoto: action.payload
            }
        case UPDATE_USER:
            return {
                ...state,
                editUserStatus: action.payload
            }
        case GET_USER_PROFILE:
            return {
                ...state,
                userProfile: action.payload
            }
        case GET_USER_DATA_TO_EDIT:
            return {
                ...state,
                editData: action.payload
            }
        default:
            return state;
    }

}
