import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './ProfileFollowerItem.css'

class ProfileFollowerItem extends Component {
    state = {
        isObserved: false
    }

    componentDidMount() {
        this.checkIfFollowed(this.props.follower.id)
    }

    checkIfFollowed(userId){
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
        const {follower} = this.props
        return (
            <div>
                <div className="follower-object">
                    <div className="profile-short">
                        <Link to={'/user/' + follower.username}>
                            <img className="profile-image" src={follower.imagePath} alt="profile"/>
                            <div className="profile-details">
                                <p className="profile-username bold">{follower.username}</p>
                                <p className="profile-name">{follower.name}</p>
                            </div>
                        </Link>
                        {this.props.currentUserId === follower.id
                            ? ''
                            : <span
                                onClick={() => this.followUserFunc(follower.id)}
                                className={'dropdown-observe' + (this.state.isObserved
                                ? ' already'
                                : '')}>
                                {this.state.isObserved
                                    ? 'Obserwowanie'
                                    : 'Obserwuj'}
                            </span>
}
                    </div>
                </div>
            </div>
        )
    }
}

export default ProfileFollowerItem
