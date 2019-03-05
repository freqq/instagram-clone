import React, {Component} from 'react'
import {connect} from 'react-redux';
import {getUserNotifications, acceptFollowRequest, declineFollowRequest} from '../../../../actions/profileActions'
import TimeAgo from 'react-timeago'
import polishStrings from 'react-timeago/lib/language-strings/pl'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import {Link} from 'react-router-dom'
import './Notifications.css'
import RequestNotification from './request-notofication/RequestNotification';

const formatter = buildFormatter(polishStrings)

class Notifications extends Component {
    state = {
        observePayloads: [],
        postPayloads: [],
        followRequestPayloads: [],
        followRequestCount: null,
        requestsState: false,
        showNotifications: false
    }

    componentDidMount() {
        this
            .props
            .getUserNotifications()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.notifications) {
            if (nextProps.notifications.observeNotificationPayloads !== undefined) {
                this.setState({observePayloads: nextProps.notifications.observeNotificationPayloads})
            }
            if (nextProps.notifications.postNotificationPayloads !== undefined) {
                this.setState({postPayloads: nextProps.notifications.postNotificationPayloads})
            }
            if (nextProps.notifications.followRequestPayloads !== undefined) {
                this.setState({followRequestPayloads: nextProps.notifications.followRequestPayloads})
            }
            if (nextProps.notifications.followRequestCount !== undefined) {
                this.setState({followRequestCount: nextProps.notifications.followRequestCount})
            }
        }
    }

    render() {
        const observeItems = this
            .state
            .observePayloads
            .map(observeItem => (
                <div className="profile-short observe-item" key="observeItem.id">
                    <Link to={'/user/' + observeItem.creator.username}>
                        <img
                            className="profile-image"
                            src={observeItem.creator.imagePath}
                            alt="profile"/>
                        <div className="profile-details">
                            <p className="profile-username">{observeItem.creator.username}</p>
                            <p className="profile-name">zaczął/zaczęła Cię obserwować.</p>
                        </div>
                        <span className="time-ago">
                            <TimeAgo date={observeItem.creationDateTime} formatter={formatter}/>
                        </span>
                        {observeItem.observed
                            ? <span className="dropdown-observe already">Obserwowanie</span>
                            : <span className="dropdown-observe">Obserwuj</span>}
                    </Link>
                </div>
            ))

        const likeItems = this
            .state
            .postPayloads
            .filter(likeItems => likeItems.postNotificationType === 'POST_LIKED')
            .map(likeItem => (
                <div className="profile-short post-not" key={likeItem.id}>
                    <Link to="">
                        <img className="profile-image" src={likeItem.creator.imagePath} alt="profile"/>
                        <div className="profile-details">
                            <p className="profile-username">{likeItem.creator.username}</p>
                            <p className="profile-name">lubi twoje zdjęcie.</p>
                        </div>
                        <span className="time-ago">
                            <TimeAgo date={likeItem.creationDateTime} formatter={formatter}/>
                        </span>
                        <img className="liked-image" src={likeItem.imagePath} alt="profile"/>
                    </Link>
                </div>
            ))

        const commentItems = this
            .state
            .postPayloads
            .filter(commentItem => commentItem.postNotificationType === 'POST_COMMENTED')
            .map(commentItem => (
                <div className="profile-short post-not" key={commentItem.id}>
                    <Link to="">
                        <img
                            className="profile-image"
                            src={commentItem.creator.imagePath}
                            alt="profile"/>
                        <div className="profile-details">
                            <p className="profile-username">{commentItem.creator.username}</p>
                            <p className="profile-name">skomentowal/skomentowala twoje zdjęcie.</p>
                        </div>
                        <span className="time-ago">
                            <TimeAgo date={commentItem.creationDateTime} formatter={formatter}/>
                        </span>
                        <img className="liked-image" src={commentItem.imagePath} alt="profile"/>
                    </Link>
                </div>
            ))

        const followRequestsItems = this
            .state
            .followRequestPayloads
            .map(followRequest => (<RequestNotification key={followRequest.id} followRequest={followRequest}/>))

        return (
            <div>
                <div className="new-box">
                    <div className="dropdown-menu dropdown-menu-right notifications-dropdown">
                        <span className="dropdown-menu-arrow"></span>
                        {this.state.requestsState
                            ? (
                                <div className="follow-requests">
                                    {followRequestsItems}
                                </div>
                            )
                            : (
                                <div  id="notification-box" className="no-requests">
                                    {this.state.followRequestCount > 0
                                        ? <div
                                                className="profile-short requests"
                                                onClick={() => this.setState({requestsState: true})}
                                                data-toggle="dropdown">
                                                {this.state.followRequestCount < 10
                                                    ? <span className="observe-requests small-count">{this.state.followRequestCount}</span>
                                                    : <span className="observe-requests">+10</span>
}
                                                <div className="profile-details">
                                                    <p className="profile-username">Prosby o zezwolenie na obserwowanie</p>
                                                    <p className="profile-name">Zatwierdz lub zignoruj prośby</p>
                                                </div>
                                                <i className="fas fa-angle-right"></i>
                                            </div>
                                        : ''}
                                    {observeItems}
                                    {likeItems}
                                    {commentItems}
                                </div>
                            )}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({auth: state.auth, notifications: state.profiles.notifications})

export default connect(mapStateToProps, {getUserNotifications, acceptFollowRequest, declineFollowRequest})(Notifications)