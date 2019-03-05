import React, {Component} from 'react'
import ProfileFollowersModal from '../../../modals/profile-followers-modal/ProfileFollowersModal'
import ProfileFollowingsModal from '../../../modals/profile-following-modal/ProfileFollowingsModal'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import './ProfileHeader.css'

class ProfileHeader extends Component {
    state = {
        followed: true,
        followers: 0,
        following: 0,
        requestSent: false
    }

    componentDidMount() {
        const {userSummary, followersCount, followingCount, requestSent, followed} = this.props.userObject
        console.log(this.props.userObject)
        this.checkIfUserFollowed(userSummary.id)
        this.setState({followers: followersCount, following: followingCount, requestSent: requestSent, followed: followed})
    }

    checkIfUserFollowed = (userId) => {
        fetch(`http://localhost:5000/api/follow/${userId}/`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            })
            .then(res => res.json())
            .then(follow => {
                this.setState({followed: follow.followed})
            })
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
            .then(() => {
                if (!this.state.followed) {
                    if (this.props.userObject.private) {
                        if (this.state.requestSent) 
                            this.setState({requestSent: false})
                        else 
                            this.setState({requestSent: true})
                    } else {
                        this.setState({
                            followed: true,
                            followers: this.state.followers + 1
                        })
                    }
                } else {
                    this.setState({
                        followed: false,
                        followers: this.state.followers - 1
                    })
                }
            })
    }

    render() {
        const {userSummary, postCount, bio, url} = this.props.userObject
        return (
            <div>
                <div className="container profile-header">
                    <div className="row">
                        <div className="col-4 profile-image-box">
                            <img src={userSummary.imagePath} alt="user" className="big-profile-image"/>
                        </div>
                        <div className="col-8">
                            <p className="profile-username">
                                {userSummary.username}
                                {userSummary.id === this.props.user.id
                                    ? <Link to="/accounts/edit/">
                                            <span className="profile-observed">Edytuj profil</span>
                                        </Link>
                                    : [!this.state.followed
                                            ? (this.props.userObject.private && this.state.requestSent
                                                ? <span
                                                        onClick={() => this.followUserFunc(userSummary.id)}
                                                        className="profile-observed">Wyslano zaproszenie</span>
                                                : <span
                                                    onClick={() => this.followUserFunc(userSummary.id)}
                                                    className="profile-observe">Obserwuj</span>)
                                            : <span
                                                onClick={() => this.followUserFunc(userSummary.id)}
                                                className="profile-observed">Obserwowanie</span>]
}

                            </p>
                            <p className="profile-post-count">Posty:
                                <span className="bold count">{postCount}</span>
                            </p>
                            <p className="profile-followers-count">
                                <span
                                    data-toggle="modal"
                                    data-target="#profileFollowersModal"
                                    className="bold count">{this.state.followers}
                                </span>
                                obserwujących</p>
                            <p className="profile-following-count">Obserwowani:
                                <span
                                    data-toggle="modal"
                                    data-target="#profileFollowingModal"
                                    className="bold count">{this.state.following}
                                </span>
                            </p>
                            <p className="profile-name">
                                <span className="bold">{userSummary.name}</span>
                            </p>
                            <p>{bio}</p>
                            <p className="bold">{url}</p>
                        </div>
                    </div>
                    <ProfileFollowersModal userId={this.props.userObject.userSummary.id}/>
                    <ProfileFollowingsModal userId={this.props.userObject.userSummary.id}/>
                </div>
                <div className="small-profile-numbers">
                    <div className="row text-center">
                        <div className="col-4">
                            Posty:
                            <br/>
                            <span className="bold">{postCount}</span>
                        </div>
                        <div className="col-4">
                            <span
                                data-toggle="modal"
                                data-target="#profileFollowersModal"
                                className="bold count">{this.state.followers}
                            </span><br/>
                            obserwujących
                        </div>
                        <div className="col-4">
                            Obserwowani:
                            <br/>
                            <span
                                data-toggle="modal"
                                data-target="#profileFollowingModal"
                                className="bold count">{this.state.following}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ProfileHeader.propTypes = {
    user: PropTypes.object
}

const mapStateToProps = state => ({user: state.auth.user})

export default connect(mapStateToProps, {})(ProfileHeader);