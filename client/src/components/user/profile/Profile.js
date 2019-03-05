import React, {Component} from 'react'
import Header from '../../header/Header'
import ProfileHeader from './profile-header/ProfileHeader'
import ProfileBookmarks from './profile-bookmarks/ProfileBookmarks'
import ProfilePhotos from './profile-photos/ProfilePhotos'
import ProfileFooter from './profile-footer/ProfileFooter'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import './Profile.css'
import {getUserProfileByUsername} from '../../../actions/profileActions'
import ProfileSavedPhotos from './profile-saved-photos/ProfileSavedPhotos';
import './Profile.css'
import SmallFooter from '../../main-section/footer/SmallFooter';

class Profile extends Component {
    state = {
        userProfile: null,
        activeBookmark: 0
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.userProfile) {
            this.setState({userProfile: nextProps.userProfile})
        }
    }

    switchBookmark = (bookmarkId) => {
        this.setState({activeBookmark: bookmarkId})
    }

    componentWillMount() {
        const {username} = this.props.match.params
        if (this.props.userProfile !== null) 
            document.title = `${this.props.userProfile.userSummary.name} (@${username}) · Zdjecia i filmy na InstagramClone`
        if (this.props.isModal) 
            document.body.style.overflow = "hidden"
        else {
            document.body.style.overflowY = "scroll"
        }

        this
            .props
            .getUserProfileByUsername(username)
    }

    render() {
        const {userProfile} = this.state
        if (!userProfile) {
            return (
                <h1>Loading</h1>
            )
        } else {
            return (
                <div
                    className={'profile-component background-color' + (this.props.isModal
                    ? ' opacity-modal'
                    : '')}>
                    <Header/>
                    <ProfileHeader userObject={userProfile}/>
                    <ProfileBookmarks
                        userId={userProfile.userSummary.id}
                        switchComponents={this.switchBookmark}/> {this.state.activeBookmark === 0
                        ? <ProfilePhotos userObject={userProfile}/>
                        : <ProfileSavedPhotos userObject={userProfile}/>
}
                    <ProfileFooter/>
                    <SmallFooter/>
                </div>
            )
        }
    }
}

PropTypes.propTypes = {
    getUserProfileByUsername: PropTypes.func.isRequired,
    userProfile: PropTypes.object
}

const mapStateToProps = state => ({userProfile: state.profiles.userProfile})

export default connect(mapStateToProps, {getUserProfileByUsername})(Profile)