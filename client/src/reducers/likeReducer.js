import {LIKE_EXISTS, LIKE_POST, POST_LIKES} from '../actions/types';

const initialState = {
    isLiked: {},
    likeResponse: {},
    postLikes: []
}

export default function(state = initialState, action){
    switch(action.type){
        case LIKE_EXISTS:
            return{
                ...state, 
                isLiked: action.payload
            }
        case POST_LIKES:
            return{
                ...state, 
                postLikes: action.payload.content
            }
        case LIKE_POST:
            return{
                ...state, 
                likeResponse: action.payload
            }
        default:
            return state;
    }
}

