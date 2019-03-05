import React, {Component} from 'react'
import Comments from '../comments/Comments'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
import {likePost, checkIfPostLiked} from '../../../../actions/likeActions'
import Share from '../../../modals/share/Share'
import './Post.css'

class Post extends Component {
    state = {
        postLiked: false,
        postSaved: false,
        likeCount: 0,
        doubleClicked: false
    }

    componentDidMount() {
        const {post} = this.props
        this.checkIfLikeExists(post)
        this.checkIfPostSaved(post)
        this.getLikeCount(post)
    }

    checkIfLikeExists = (post) => {
        fetch(`http://localhost:5000/api/posts/${post.id}/like/exists`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            })
            .then(res => res.json())
            .then(like => {
                this.setState({postLiked: like.liked})
            })
    }

    checkIfPostSaved = (post) => {
        fetch(`http://localhost:5000/api/posts/${post.id}/save/exists`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            })
            .then(res => res.json())
            .then(save => {
                this.setState({postSaved: save.saved})
            })
    }

    getLikeCount = (post) => {
        fetch(`http://localhost:5000/api/posts/${post.id}/like/count`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            })
            .then(res => res.json())
            .then(like => {
                this.setState({likeCount: like.count})
            })
    }

    photoDoubleClick = (postId) => {
        this.setState({doubleClicked: true})
        setTimeout(() => {
            this.setState({doubleClicked: false})
        }, 1000);
        if (!this.state.postLiked) {
            this.likePostFunc(postId)
        }

    }

    heartClick = (postId) => {
        this.likePostFunc(postId)
    }

    onSaveClick = (postId) => {
        this.savePostFunc(postId)
    }

    likePostFunc = (postId) => {
        fetch(`http://localhost:5000/api/posts/${postId}/like`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            })
            .then(res => res.json())
            .then(like => {
                this.setState({postLiked: like.liked})
                like.liked
                    ? this.setState({
                        likeCount: this.state.likeCount + 1
                    })
                    : this.setState({
                        likeCount: this.state.likeCount - 1
                    })
            })
    }

    savePostFunc = (postId) => {
        fetch(`http://localhost:5000/api/posts/${postId}/save`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            })
            .then(res => res.json())
            .then(save => {
                this.setState({postSaved: save.saved})
            })
    }

    render() {
        const {post} = this.props
        return (
            <div className="post-element">
                <div className="author-top-bar">
                    <Link to={'/user/' + post.createdBy.username}>
                        <img src={post.createdBy.imagePath} alt="author"/>
                        <span className="author-username">{post.createdBy.username}</span>
                    </Link>
                </div>
                <div className="image-box">
                    <img
                        onDoubleClick={() => this.photoDoubleClick(post.id)}
                        src={post.imagePath}
                        alt="post"
                        className="main-photo"/>
                    <i
                        className={'like-given fas fa-heart' + (this.state.doubleClicked
                        ? ' show-like'
                        : '')}></i>
                </div>
                <div className="actions">
                    {this.state.postLiked
                        ? <i onClick={() => this.heartClick(post.id)} className="fas fa-heart"></i>
                        : <i onClick={() => this.heartClick(post.id)} className="far fa-heart"></i>}
                    <label htmlFor={post.id}>
                        <i className="far fa-comment"></i>
                    </label>
                    <i
                        className="far fa-share-square"
                        data-toggle="modal"
                        data-target="#shareModal"></i>
                    {this.state.postSaved
                        ? <i onClick={() => this.onSaveClick(post.id)} className="fas fa-bookmark"></i>
                        : <i onClick={() => this.onSaveClick(post.id)} className="far fa-bookmark"></i>}

                </div>
                <div className="likes">
                    Liczba polubień:
                    <Link
                        to={{
                        pathname: `/${post.id}/liked_by/`,
                        state: {
                            modal: true
                        }
                    }}>
                        <span className="likes-bold">
                            {this.state.likeCount}
                        </span>
                    </Link>
                </div>
                <div className="post-desc">
                    <Link to={'/user/' + post.createdBy.username}>
                        <span className="author-username-desc">{post.createdBy.username}</span>
                    </Link>
                    {post.description}
                </div>
                <Comments post={post}/>
                <Share/>
            </div>
        )
    }
}

Post.propTypes = {
    likePost: PropTypes.func.isRequired,
    checkIfPostLiked: PropTypes.func.isRequired,
    isLiked: PropTypes.object,
    likeResponse: PropTypes.object
}

const mapStateToProps = state => ({isLiked: state.likes.isLiked, likeResponse: state.likes.likeResponse})

export default connect(mapStateToProps, {checkIfPostLiked, likePost})(Post);