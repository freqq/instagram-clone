import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {createComment} from '../../../../actions/commentActions'
import './CommentPhoto.css'

class CommentPhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            body: ''
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleKeyPress = (e) => {
        if (e.key === 'Enter' && this.state.body.length > 0) {
            const comment = {
                body: this.state.body
            }

            fetch(`http://localhost:5000/api/posts/${this.props.post.id}/comments`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                },
                    body: JSON.stringify(comment)
                })
                .then(res => res.json())
                .then(comment => {
                    this.props.addComment(comment)
                })
            this.setState({"body": ''})
        }
    }

    render() {
        return (
            <div className="comment-photo">
                <input
                    id={this.props.post.id}
                    value={this.state.body}
                    name="body"
                    onChange={this.onChange}
                    onKeyPress={this.handleKeyPress}
                    className="form-control add-comment"
                    type="text"
                    placeholder="Dodaj komentarz..."/>
            </div>
        )
    }
}

PropTypes.propTypes = {
    createComment: PropTypes.func.isRequired
}

export default connect(null, {createComment})(CommentPhoto)
