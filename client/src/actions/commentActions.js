import { NEW_COMMENT, FETCH_COMMENTS} from './types';

export const fetchComments = (postId) => dispatch => {
    fetch(`http://localhost:5000/api/posts/${postId}/comments`)
    .then(res => res.json())
    .then(comments => 
        dispatch({
        type: FETCH_COMMENTS,
        payload: comments.content
        })
    )
}

export const createComment = (postId ,commentData) => dispatch => {
    fetch(`http://localhost:5000/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("token"),
        },
        body: JSON.stringify(commentData)
    })
    .then(res => res.json())
    .then(post => dispatch({
        type: NEW_COMMENT,
        payload: post
    }))
}