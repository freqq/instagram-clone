import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class LikedByItem extends Component {
    state = {
        isObserved: false
    }

    componentDidMount(){
        this.setState({isObserved: this.props.like.observed})
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
        const {like} = this.props

        return (
            <div>
                <div className="like-object">
                    <div className="profile-short">
                        <Link to={'/user/' + like.createdBy.username}>
                            <img className="profile-image" src={like.createdBy.imagePath} alt="profile"/>
                            <div className="profile-details">
                                <p className="profile-username">{like.createdBy.username}</p>
                                <p className="profile-name">{like.createdBy.name}</p>
                            </div>
                        </Link>
                        {this.props.currentUser.username === like.createdBy.username
                            ? ''
                            : <span
                                onClick={() => this.followUserFunc(like.createdBy.id)}
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

export default LikedByItem