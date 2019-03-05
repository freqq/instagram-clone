import React, {Component} from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ProfileFollowingItem from './ProfileFollowingItem'
import {getUserFollowing} from '../../../actions/profileActions'

class ProfileFollowingsModal extends Component {
    componentDidMount() {
        this
            .props
            .getUserFollowing(this.props.userId)
    }

    render() {
        const followingItems = this
            .props
            .followings
            .map(follower => (<ProfileFollowingItem
                currentUserId={this.props.user.id}
                follower={follower}
                key={follower.id}/>))

        return (
            <div
                className="modal fade"
                id="profileFollowingModal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div className="modal-dialog liked-by-modal" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Obserwowani</h5>
                            <button className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {this.props.followings.length > 0
                                ? <div>{followingItems}</div>
                                : <span className="no-likes">Uzytkownik jeszcze nikogo nie obserwuje.</span>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ProfileFollowingsModal.propTypes = {
    followings: PropTypes.array.isRequired
}

const mapStateToProps = state => ({followings: state.profiles.followings, user: state.auth.user})

export default connect(mapStateToProps, {getUserFollowing})(ProfileFollowingsModal);