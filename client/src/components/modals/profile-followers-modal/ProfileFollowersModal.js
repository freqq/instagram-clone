import React, {Component} from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ProfileFollowerItem from './ProfileFollowerItem'
import {getUserFollowers} from '../../../actions/profileActions'

class ProfileFollowersModal extends Component {
    componentDidMount() {
        this
            .props
            .getUserFollowers(this.props.userId)
    }

    render() {
        const followersItems = this
            .props
            .followers
            .map(follower => (<ProfileFollowerItem
                currentUserId={this.props.user.id}
                follower={follower}
                key={follower.id}/>))

        return (
            <div
                className="modal fade"
                id="profileFollowersModal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div className="modal-dialog liked-by-modal" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Obserwujacy</h5>
                            <button className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {this.props.followers.length > 0
                                ? <div>{followersItems}</div>
                                : <span className="no-likes">Nikt jescze nie obserwuje tego uzytkownika.</span>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ProfileFollowersModal.propTypes = {
    followers: PropTypes.array.isRequired
}

const mapStateToProps = state => ({followers: state.profiles.followers, user: state.auth.user})

export default connect(mapStateToProps, {getUserFollowers})(ProfileFollowersModal);