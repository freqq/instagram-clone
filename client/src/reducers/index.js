import { combineReducers } from 'redux';
import postReducer from './postReducer';
import commentReducer from './commentReducer';
import authReducer from './authReducer'
import likeReducer from './likeReducer'
import profileReducers from './profileReducers';

export default combineReducers ({
    posts: postReducer,
    comments: commentReducer,
    auth: authReducer,
    likes: likeReducer,
    profiles: profileReducers
})