import React, {Component} from 'react'
import {fetchComments} from '../../../../actions/commentActions'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';
import './Comments.css'
import CommentPhoto from '../comment-photo/CommentPhoto'
import TimeAgo from 'react-timeago'
import polishStrings from 'react-timeago/lib/language-strings/pl'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'

const formatter = buildFormatter(polishStrings)

class Comments extends Component {
    state = {
        comments: [],
        loadMore: false
    }

    componentDidMount() {
        const {post} = this.props
        fetch(`http://localhost:5000/api/posts/${post.id}/comments`)
            .then(res => res.json())
            .then(comments => {
                this.setState({comments: comments.content})
            })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.newComment) {
            this
                .props
                .comments
                .unshift(nextProps.newComment);
        }
    }

    loadMoreComments = () => {
        this.setState({loadMore: true})
    }

    addComment = (comment) => {
        this
            .state
            .comments
            .unshift(comment);
        this.setState({comments: this.state.comments})
    }

    render() {
        let howManyComments = 0;
        if(this.props.isModal)
                howManyComments = 12
        else
                howManyComments = 5

        let commentItemsSliced = this
            .state
            .comments
            .slice(0, howManyComments)
            .reverse()
            .map(comment => (
                <div className="comment-object" key={comment.id}>
                    <Link to={'/user/' + comment.createdBy.username}>
                        <span className="comment-author">{comment.createdBy.username}</span>
                    </Link>
                    <span className="comment-body">{comment.body}</span>
                </div>
            ))

        let commentItemsFull = this
            .state
            .comments
            .slice(0)
            .reverse()
            .map(comment => (
                <div className="comment-object" key={comment.id}>
                    <Link to={'/user/' + comment.createdBy.username}>
                        <span className="comment-author">{comment.createdBy.username}</span>
                    </Link>
                    <span className="comment-body">{comment.body}</span>
                </div>
            ))

        return (
            <div className={'comments' + (this.props.isModal ? ' modal-comments' : '')}>
                {this.state.comments.length > howManyComments && !this.state.loadMore && !this.props.isModal
                    ?   <div>
                            <span onClick={this.loadMoreComments} className="more-comments">Zobacz wszystkie komentarze ({this.state.comments.length})</span>
                            {commentItemsSliced}
                        </div>

                    : commentItemsFull
}
                {this.props.isModal
                    ? ''
                    : <div>
                        <span className="time-added">
                            <TimeAgo date={this.props.post.creationDateTime} formatter={formatter}/>
                        </span>
                        <hr/>
                        <CommentPhoto addComment={this.addComment} post={this.props.post}/>
                    </div>
}
            </div>
        )
    }
}

Comments.propTypes = {
    fetchComments: PropTypes.func.isRequired,
    comments: PropTypes.array.isRequired,
    newComment: PropTypes.object
}

const mapStateToProps = state => ({comments: state.comments.items, newComment: state.comments.item})

export default connect(mapStateToProps, {fetchComments})(Comments);
