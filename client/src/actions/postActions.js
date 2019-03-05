import {NEW_POST, FETCH_POSTS, CLEAR_POSTS, POST_MODAL} from './types';

export const fetchPosts = (size, page) => dispatch => {
    fetch(`http://localhost:5000/api/posts/?size=${size}&page=${page}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        })
        .then(res => res.json())
        .then(posts => dispatch({type: FETCH_POSTS, payload: posts}))
}

export const clearPosts = () => dispatch => {
    dispatch({type: CLEAR_POSTS, payload: []})
}

export const getPostModal = (postId) => dispatch => {
    fetch(`http://localhost:5000/api/posts/${postId}/modal`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        })
        .then(res => res.json())
        .then(post => {
            dispatch({type: POST_MODAL, payload: post})
        })
}

export const createPost = (postData) => dispatch => {
    fetch('https://localhost:5000/api/posts', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
            body: JSON.stringify(postData)
        })
        .then(res => res.json())
        .then(post => dispatch({type: NEW_POST, payload: post}))
}