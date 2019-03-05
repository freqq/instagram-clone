import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './ProfilePhotos.css'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

class ProfilePhotos extends Component {
    state = {
        photos: [],
        isPrivate: false
    }

    updateDimensions = () => {
        var photoContainer = document.querySelector('.profile-photos');
        var footerContainer = document.querySelector('.profile-footer');
        var profileBookmarks = document.querySelector('.profile-bookmarks');
        var profileHeader = document.querySelector('.profile-header');

        if (photoContainer !== null) {
            if (window.innerWidth <= 1000) {
                photoContainer
                    .classList
                    .add("container-fluid");
                photoContainer
                    .classList
                    .remove("container");
                footerContainer
                    .classList
                    .add("container-fluid");
                footerContainer
                    .classList
                    .remove("container");
            } else {
                photoContainer
                    .classList
                    .remove("container-fluid");
                photoContainer
                    .classList
                    .add("container");
                footerContainer
                    .classList
                    .remove("container-fluid");
                footerContainer
                    .classList
                    .add("container");
            }
            if (window.innerWidth <= 700) {
                photoContainer
                    .classList
                    .add("no-margin");
            } else {
                photoContainer
                    .classList
                    .remove("no-margin");
            }
            if (window.innerWidth <= 770) {
                profileBookmarks
                    .classList
                    .add("container-fluid");
                profileBookmarks
                    .classList
                    .remove("container");
                profileHeader
                    .classList
                    .add("container-fluid");
                profileHeader
                    .classList
                    .remove("container");
            } else {
                profileBookmarks
                    .classList
                    .remove("container-fluid");
                profileBookmarks
                    .classList
                    .add("container");
                profileHeader
                    .classList
                    .remove("container-fluid");
                profileHeader
                    .classList
                    .add("container");
            }
        }
    }

    componentDidMount() {
        this.setState({photos: this.props.userObject.posts, isPrivate: this.props.userObject.private})
        window.addEventListener("resize", this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    render() {

        if (this.state.isPrivate && (this.props.userObject.userSummary.id !== this.props.user.id) && !this.props.userObject.followed) {
            return (
                <div className="container">
                    <div className="private-profile">
                        <p className="private-title">To konto jest prywatne</p>
                        <p className="private-body">Obserwuj, aby wyswietlic zdjecia i filmy.</p>
                    </div>
                </div>
            )
        } else {
            if (this.state.photos.length > 0) {
                const posts = this
                    .state
                    .photos
                    .slice(0)
                    .reverse()
                    .map(photo => ((
                        <div className="profile-image-object col-4" key={photo.id}>
                            <Link
                                to={{
                                pathname: `/user/${this.props.userObject.userSummary.username}/p/${photo.id}/`,
                                state: {
                                    modal: true,
                                    hasNext: false,
                                    hasPrevious: false
                                }
                            }}>
                                <img src={photo.imagePath} alt="post"/>
                                <div className="overlay">
                                    <span className="overlay-likes">
                                        <i className="fas fa-heart"></i>
                                        {photo.likeCount}</span>
                                    <span className="overlay-comments">
                                        <i className="fas fa-comments"></i>
                                        {photo.commentCount}</span>
                                </div>
                            </Link>
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
                        Uzytkownikow nie dodal jeszcze zadnego posta.
                    </div>
                )
            }
        }
    }
}

ProfilePhotos.propTypes = {
    user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({user: state.auth.user})

export default connect(mapStateToProps, {})(ProfilePhotos)