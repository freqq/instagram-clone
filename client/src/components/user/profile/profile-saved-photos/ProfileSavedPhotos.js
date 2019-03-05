import React, {Component} from 'react'
import './ProfileSavedPhotos.css'

class ProfileSavedPhotos extends Component {
    state = {
        photos: []
    }
    componentDidMount() {
        this.setState({photos: this.props.userObject.savedPosts})
    }

    render() {
        if (this.state.photos.length > 0) {
            const posts = this
                .state
                .photos
                .slice(0)
                .reverse()
                .map(photo => ((
                    <div className="profile-image-object col-4" key={photo.id}>
                        <img src={photo.imagePath} alt="post"/>
                        <div className="overlay">
                            <span className="overlay-likes">
                                <i className="fas fa-heart"></i>
                                {photo.likeCount}</span>
                            <span className="overlay-comments">
                                <i className="fas fa-comments"></i>
                                {photo.commentCount}</span>
                        </div>
                    </div>
                )))
            return (
                <div className="container profile-photos">
                    <div className="row">
                        {posts}
                    </div>
                </div>
            )
        } else {
            return (
                <div className="no-posts">
                    Uzytkownikow nie zapisał jescze zadnego posta.
                </div>
            )
        }
    }
}

export default ProfileSavedPhotos