import React, {Component} from "react";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getPostModal} from '../../../actions/postActions'
import {Link} from 'react-router-dom'
import './PostModal.css'
import TimeAgo from 'react-timeago'
import polishStrings from 'react-timeago/lib/language-strings/pl'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import CommentPhoto from '../../main-section/posts/comment-photo/CommentPhoto'
import Comments from "../../main-section/posts/comments/Comments";
import ProfileLikedByModal from '../profile-liked-by-modal/ProfileLikedByModal'

const formatter = buildFormatter(polishStrings)

class PostModal extends Component {
    state = {
        postLiked: false,
        postSaved: false,
        postModal: null,
        likeCount: 0,
        doubleClicked: false,
        hasNext: true,
        hasPrevious: true
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.postModal)
            this.setState({
                postModal: nextProps.postModal
            })
        if(nextProps.postModal.likeCount)
            this.setState({likeCount: nextProps.postModal.likeCount})
    }

    static defaultProps = {
        isModal: true
    };

    checkIfLikeExists = (postId) => {
        fetch(`http://localhost:5000/api/posts/${postId}/like/exists`, {
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

    checkIfPostSaved = (postId) => {
        fetch(`http://localhost:5000/api/posts/${postId}/save/exists`, {
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

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick, false)
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

    addComment = (comment) => {
        this
            .state
            .comments
            .unshift(comment);
        this.setState({comments: this.state.comments})
    }

    handleClick = (e) => {
        if (this.node.contains(e.target)) {
            return;
        }

        this.onClose()
    }

    onClose = () => {
        this
            .props
            .history
            .goBack();
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClick, false)
        this
            .props
            .getPostModal(this.props.match.params.postId)
        this.checkIfLikeExists(this.props.match.params.postId)
        this.checkIfPostSaved(this.props.match.params.postId)
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

    render() {
        const {postModal} = this.state
        return (
            <div className="post-modal-component">
                 <div
                className="modal"
                style={{
                display: "block",
                position: this.props.isModal
                    ? "fixed"
                    : "static"
            }}>
                <div className="modal-dialog post-modal" ref={node => this.node = node}>
                    <div className="modal-content">
                        <div className="modal-body">
                            {!postModal
                                ? 'Laduje'
                                : ( < div className = "row" > <div className="col-8">
                                    <div className="image-box">
                                    <img src={postModal.postResponse.imagePath} onDoubleClick={() => this.photoDoubleClick(postModal.postResponse.id)} alt=""/>
                                    <i
                        className={'like-given fas fa-heart' + (this.state.doubleClicked
                        ? ' show-like'
                        : '')}></i>
                                    </div>
                                    
                                </div> < div className = "col-4" > <div className="top-modal-author">
                                <Link to={'/user/' + postModal.postResponse.createdBy.username}>

                                    <img src={this.props.postModal.postResponse.createdBy.imagePath} alt=""/>
                                    <p className="modal-author-username">{this.props.postModal.postResponse.createdBy.username}</p>
                                    </Link>
                                </div> < hr /> <p className="modal-author-username">{this.props.postModal.postResponse.createdBy.username}</p> < p className = "modal-post-desc" > {
                                        this.props.postModal.postResponse.description
                                    } </p>

                                    <Comments isModal={true} post={this.props.postModal.postResponse} />

                                    <div className="modal-actions">
                                    <hr />
                                        <div className="actions">
                                        {this.state.postLiked
                                            ? <i
                                                    onClick={() => this.heartClick(postModal.postResponse.id)}
                                                    className="fas fa-heart"></i>
                                            : <i
                                                onClick={() => this.heartClick(postModal.postResponse.id)}
                                                className="far fa-heart"></i>}
                                        <label htmlFor={postModal.postResponse.id}>
                                            <i className="far fa-comment"></i>
                                        </label>
                                        {this.state.postSaved
                                            ? <i
                                                    onClick={() => this.onSaveClick(postModal.postResponse.id)}
                                                    className="fas fa-bookmark"></i>
                                            : <i
                                                onClick={() => this.onSaveClick(postModal.postResponse.id)}
                                                className="far fa-bookmark"></i>}

                                    </div> < div className = "likes" > Liczba polubień : 
                                        <span data-toggle="modal"
                        data-target="#profileLikedByModal" className="likes-bold">
                                            {this.state.likeCount}
                                        </span>
                                    <span className="time-added">
                    <TimeAgo date={this.props.postModal.postResponse.creationDateTime} formatter={formatter}/>
                </span>
                <hr />
                <CommentPhoto addComment={this.addComment} post={this.props.postModal.postResponse}/>
                                    </div>
                                    </div> 
                                    </div> 
                                    </div>
        )}
                        {this.state.hasNext ? 
                            <i class="picture-right fas fa-angle-right"></i> : '' }
                        {this.state.hasPrevious ? 
                            <i class="picture-left fas fa-angle-left"></i> : '' }
                        </div>
                    </div>
                </div>
            </div>
            <ProfileLikedByModal />
            </div>
        );
    }
}

PostModal.propTypes = {
    postModal: PropTypes.array.isRequired
}

const mapStateToProps = state => ({postModal: state.posts.postModal, user: state.auth.user})

export default connect(mapStateToProps, {getPostModal})(PostModal);