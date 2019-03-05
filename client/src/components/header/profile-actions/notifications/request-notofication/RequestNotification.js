import React, {Component} from 'react'
import {connect} from 'react-redux';
import {acceptFollowRequest, declineFollowRequest} from '../../../../../actions/profileActions'

class RequestNotification extends Component {
    state = {
        accepted: null,
        isObserved: false
    }

    componentDidMount() {
        this.checkIfFollowed(this.props.followRequest.creator.id)
    }

    checkIfFollowed(userId) {
        fetch(`http://localhost:5000/api/follow/${userId}/`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            })
            .then(res => res.json())
            .then(follow => {
                this.setState({isObserved: follow.followed})
            })
    }

    acceptRequest = (followRequestId) => {
        this
            .props
            .acceptFollowRequest(followRequestId)
        this.setState({accepted: true})
    }

    declineRequest = (followRequestId) => {
        this
            .props
            .declineFollowRequest(followRequestId)
        this.setState({accepted: false})
    }

    followUserFunc = (userId) => {
        fetch(`http://localhost:5000/api/follow/${userId}/`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            })
            .then(res => res.json())
            .then(follow => {
                this.setState({isObserved: follow.followed})
            })
    }

    render() {
        const {followRequest} = this.props
        return (
            <div>
                {this.state.accepted === false
                    ? ''
                    : (
                        <div className="profile-short" key={followRequest.id}>
                            <img
                                className="profile-image"
                                src={followRequest.creator.imagePath}
                                alt="profile"/>
                            <div className="profile-details">
                                <p className="profile-username">{followRequest.creator.username}</p>
                                <p className="profile-name">{followRequest.creator.name}</p>
                            </div>
                            {this.state.accepted
                                ? <span
                                        onClick={() => this.followUserFunc(followRequest.creator.id)}
                                        className={'dropdown-observe' + (this.state.isObserved
                                        ? ' already'
                                        : '')}>
                                        {this.state.isObserved
                                            ? 'Obserwowanie'
                                            : 'Obserwuj'}
                                    </span>
                                : <div>
                                    <span
                                        className={'dropdown-observe already'}
                                        onClick={() => this.declineRequest(followRequest.id)}>
                                        Usuń
                                    </span>
                                    <span
                                        className={'dropdown-observe'}
                                        onClick={() => this.acceptRequest(followRequest.id)}>
                                        Potwierdź
                                    </span>
                                </div>}
                        </div>
                    )}
            </div>
        )
    }
}

const mapStateToProps = state => ({auth: state.auth, notifications: state.profiles.notifications})

export default connect(mapStateToProps, {acceptFollowRequest, declineFollowRequest})(RequestNotification)
