import {LIKE_POST, LIKE_EXISTS, POST_LIKES} from './types';

export const likePost = (postId) => dispatch => {
    fetch(`http://localhost:5000/api/posts/${postId}/like`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        })
        .then(res => res.json())
        .then(like => {
            dispatch({type: LIKE_POST, payload: like})
            console.log(like)
        })
}

export const checkIfPostLiked = (postId) => dispatch => {
    fetch(`http://localhost:5000/api/posts/${postId}/like/exists`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        })
        .then(res => res.json())
        .then(like => {
            dispatch({type: LIKE_EXISTS, payload: like})
            console.log(like)
        })
}

export const getPostLikes = (postId) => dispatch => {
    fetch(`http://localhost:5000/api/posts/${postId}/like/`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        })
        .then(res => res.json())
        .then(likes => {
            dispatch({type: POST_LIKES, payload: likes})
        })
}