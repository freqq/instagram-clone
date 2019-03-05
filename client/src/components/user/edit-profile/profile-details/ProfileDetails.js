import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {DEFAULT_AVATAR_PATH, NAME_MAX_LENGTH, NAME_MIN_LENGTH} from '../../../../constants/index'
import {getUserDataToEdit, updateUserData, updateUserProfilePicture, deleteUserProfilePicture} from '../../../../actions/profileActions'
import {checkUsernameAvaibility, checkEmailAvaibility} from '../../../../actions/authActions'
import EditProfileChangePhotoModal from '../../../modals/edit-profile-change-photo-modal/EditProfileChangePhotoModal'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

class ProfileDetails extends Component {
    state = {
        name: '',
        username: '',
        imagePath: '',
        email: '',
        url: '',
        bio: '',
        phone: '',
        sex: null,
        sendable: false,
        image: null,
        usernameAvaible: true,
        emailAvaible: true,
        firstNameCheck: true,
        firstEmailCheck: true,
        nameOk: true,
        userSaved: false,
        phoneOk: true,
        alreadyUpdatedPhoto: false,
        alreadyDeletedPhoto: false
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        if (!this.state.sendable) {
            this.setState({sendable: true})
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.editData) {
            if (this.state.userSaved) {} else {
                this.setState({
                    userSaved: true,
                    name: nextProps.editData.name,
                    imagePath: nextProps.editData.imagePath,
                    username: nextProps.editData.username,
                    url: nextProps.editData.url,
                    email: nextProps.editData.email,
                    phone: nextProps.editData.phone,
                    bio: nextProps.editData.bio,
                    sex: nextProps.editData.sex
                })
            }
        }

        if (nextProps.emailAvaibility) {
            if (this.state.firstEmailCheck) {
                this.setState({firstEmailCheck: false})
            } else {
                if (nextProps.emailAvaibility.available !== undefined) 
                    this.setState({emailAvaible: nextProps.emailAvaibility.available})
            }
        }
        if (nextProps.usernameAvaibility) {
            if (this.state.firstNameCheck) {
                this.setState({firstNameCheck: false})
            } else {
                if (nextProps.usernameAvaibility.available !== undefined) 
                    this.setState({usernameAvaible: nextProps.usernameAvaibility.available})
            }
        }
        if (nextProps.updateUserPath) {
            if (!this.state.alreadyUpdatedPhoto) {
                if (nextProps.updateUserPath.imagePath !== undefined) 
                    this.setState({imagePath: nextProps.updateUserPath.imagePath, alreadyUpdatedPhoto: true})
            }
        }
        if (nextProps.deleteUserPhoto) {
            if (!this.state.alreadyDeletedPhoto) {
                this.setState({imagePath: DEFAULT_AVATAR_PATH, alreadyDeletedPhoto: true})
            }
        }
    }

    componentDidMount() {
        document.title = "Edycja profilu · InstagramClone"
        document
            .getElementsByClassName('react-tabs')[0]
            .classList
            .add('row')
        this
            .props
            .getUserDataToEdit(this.props.user.id)
    }

    checkPhoneNumber = (phoneNumber) => {
        if (phoneNumber.length === 0) {
            this.setState({phoneOk: true})
        } else {
            let isPhone = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(phoneNumber)
            this.setState({phoneOk: isPhone})
        }
    }

    onSubmit = (e) => {
        e.preventDefault()

        const profileUpdateRequest = {
            name: this.state.name,
            username: this.state.username,
            url: this.state.url,
            bio: this.state.bio,
            email: this.state.email,
            phone: this.state.phone,
            sex: this.state.sex
        }

        this
            .props
            .updateUserData(profileUpdateRequest)
    }

    checkUsernameAvaibility = () => {
        if (this.state.username !== this.props.editData.username) {
            this
                .props
                .checkUsernameAvaibility(this.state.username)
        }
    }

    checkEmailAvaibility = () => {
        if (this.state.email !== this.props.editData.email) {
            this
                .props
                .checkEmailAvaibility(this.state.email)
        }
    }

    checkName = () => {
        if (this.state.name.length < NAME_MIN_LENGTH || this.state.name.length > NAME_MAX_LENGTH) 
            this.setState({nameOk: false})
        else 
            this.setState({nameOk: true})
    }

    imageChange = (e) => {
        console.log('here')
        this.setState({image: e.target.files[0], alreadyUpdatedPhoto: false})
        this
            .props
            .updateUserProfilePicture(e.target.files[0])
    }

    removePhoto = () => {
        console.log('delet')
        this.setState({alreadyDeletedPhoto: false})
        this
            .props
            .deleteUserProfilePicture()
    }

    render() {
        return (
            <div className="profile-short">
                <div className="form-group row">
                    <label htmlFor="name" className="col-sm-3 col-form-label">
                        <Link className="edit-image" to={'/user/' + this.state.username}>
                            <img className="profile-image" src={this.state.imagePath} alt="profile"/>
                        </Link>
                    </label>
                    <div className="col-sm-7">
                        <div className="profile-details">
                            <p className="profile-username">{this.state.username}</p>
                            <p
                                data-toggle="modal"
                                data-target="#changeProfilePhotoModal"
                                className="profile-name change-name">Zmien zdjecie profilowe</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={this.onSubmit}>
                    <div className="form-group row first-row">
                        <label htmlFor="name" className="col-sm-3 col-form-label">Imie i nazwisko</label>
                        <div className="col-sm-7">
                            {this.state.nameOk
                                ? ''
                                : <span className="wrong-register">Imie i nazwisko musi miec {NAME_MIN_LENGTH}
                                    do {NAME_MAX_LENGTH}
                                    znakow.</span>}
                            <input
                                style={this.state.nameOk
                                ? null
                                : {
                                    border: '1px solid red'
                                }}
                                type="text"
                                onBlur={this.checkName}
                                className="form-control"
                                id="name"
                                name="name"
                                onChange={this.onChange}
                                value={this.state.name}/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="username" className="col-sm-3 col-form-label">Nazwa uzytkownika</label>
                        <div className="col-sm-7">
                            {this.state.usernameAvaible
                                ? ''
                                : <span className="wrong-register">Nazwa uzytkownika zajeta.</span>}
                            <input
                                type="text"
                                style={this.state.usernameAvaible
                                ? null
                                : {
                                    border: '1px solid red'
                                }}
                                onBlur={this.checkUsernameAvaibility}
                                className="form-control"
                                id="username"
                                name="username"
                                onChange={this.onChange}
                                value={this.state.username}/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="url" className="col-sm-3 col-form-label">Witryna internetowa</label>
                        <div className="col-sm-7">
                            <input
                                type="text"
                                className="form-control"
                                id="url"
                                name="url"
                                onChange={this.onChange}
                                value={this.state.url}/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="bio" className="col-sm-3 col-form-label">Biogram</label>
                        <div className="col-sm-7">
                            <textarea
                                type="text"
                                className="form-control"
                                id="bio"
                                name="bio"
                                onChange={this.onChange}
                                rows="3"
                                value={this.state.bio}/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="bio" className="col-sm-3 col-form-label"></label>
                        <div className="col-sm-7 private-info-box">
                            <span className="private-info">Informacje prywatne</span>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="email" className="col-sm-3 col-form-label">Adres e-mail</label>
                        <div className="col-sm-7">
                            {this.state.emailAvaible
                                ? ''
                                : <span className="wrong-register">Email zajety.</span>}
                            <input
                                type="text"
                                name="email"
                                style={this.state.emailAvaible
                                ? null
                                : {
                                    border: '1px solid red'
                                }}
                                onChange={this.onChange}
                                onBlur={this.checkEmailAvaibility}
                                className="form-control"
                                id="email"
                                value={this.state.email}/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="phone" className="col-sm-3 col-form-label">Numer telefonu</label>
                        <div className="col-sm-7">
                            {this.state.phoneOk
                                ? ''
                                : <span className="wrong-register">Podaj prawidlowy numer telefonu.</span>}
                            <input
                                style={this.state.phoneOk
                                ? null
                                : {
                                    border: '1px solid red'
                                }}
                                type="text"
                                name="phone"
                                onBlur={() => this.checkPhoneNumber(this.state.phone)}
                                className="form-control"
                                onChange={this.onChange}
                                id="phone"
                                value={this.state.phone}/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="sex" className="col-sm-3 col-form-label">Plec</label>
                        <div className="col-sm-7">
                            <select
                                name="sex"
                                className="form-control custom"
                                id="sex"
                                onChange={this.onChange}
                                value={this.state.sex}>
                                <option>Mezczyzna</option>
                                <option>Kobieta</option>
                                <option>Nieokreslone</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="" className="col-sm-3 col-form-label"></label>
                        <div className="col-sm-7">
                            <button
                                type="submit"
                                disabled={!this.state.sendable}
                                className="btn btn-primary edit-profil-button">Wyslij</button>
                        </div>
                    </div>
                </form>

                <EditProfileChangePhotoModal
                    imageChange={this.imageChange}
                    removePhoto={this.removePhoto}/>
            </div>
        )
    }
}

ProfileDetails.propTypes = {
    user: PropTypes.object.isRequired,
    getUserDataToEdit: PropTypes.func.isRequired,
    updateUserData: PropTypes.func.isRequired,
    checkUsernameAvaibility: PropTypes.func.isRequired,
    checkEmailAvaibility: PropTypes.func.isRequired,
    usernameAvaibility: PropTypes.object,
    emailAvaibility: PropTypes.object
}

const mapStateToProps = state => ({
    updateUserPath: state.profiles.updateUserPath,
    user: state.auth.user,
    editData: state.profiles.editData,
    editUserStatus: state.profiles.editUserStatus,
    usernameAvaibility: state.auth.usernameAvaibility,
    emailAvaibility: state.auth.emailAvaibility,
    deleteUserPhoto: state.profiles.deleteUserPhoto
})

export default connect(mapStateToProps, {
    getUserDataToEdit,
    checkUsernameAvaibility,
    checkEmailAvaibility,
    updateUserData,
    updateUserProfilePicture,
    deleteUserProfilePicture
})(ProfileDetails)