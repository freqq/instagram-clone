import React, {Component} from "react";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getPostLikes} from '../../../../../actions/likeActions'
import LikedByItem from './liked-by-item/LikedByItem'
import './LikedBy.css'

class LikedBy extends Component {
    static defaultProps = {
        isModal: true
    };

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick, false)
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
            .getPostLikes(this.props.match.params.postId)
    }

    render() {
        const likeItems = this
            .props
            .postLikes
            .map(like => (
                <LikedByItem currentUser={this.props.user} like={like} key={like.id}/>
            ))

        return (
            <div
                className="modal"
                style={{
                display: "block",
                position: this.props.isModal
                    ? "fixed"
                    : "static"
            }}>
                <div className="modal-dialog liked-by-modal" ref={node => this.node = node}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Polubienia</h5>

                            {this.props.isModal && (
                                <button className="close" onClick={this.props.onClose || this.onClose}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            )}
                        </div>

                        <div className="modal-body">
                            {this.props.postLikes.length > 0
                                ? <div>{likeItems}</div>
                                : <span className="no-likes">Nikt jescze nie polubil tego posta.</span>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

LikedBy.propTypes = {
    postLikes: PropTypes.array.isRequired
}

const mapStateToProps = state => ({postLikes: state.likes.postLikes, user: state.auth.user})

export default connect(mapStateToProps, {getPostLikes})(LikedBy);