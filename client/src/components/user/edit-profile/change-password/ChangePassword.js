import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {changePassword} from '../../../../actions/authActions'
import {changeUserPassword} from '../../../../actions/profileActions'

class ChangePassword extends Component {
    state = {
        oldPassword: '',
        newPassword: '',
        newPasswordAgain: '',
        passwordMatch: true,
        disabled: true
    }

    componentDidMount(){
        document.title = "Zmien hasło · InstagramClone"
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onBlur = () => {
        if (this.state.newPassword === this.state.newPasswordAgain) 
            this.setState({passwordMatch: true})
        else 
            this.setState({passwordMatch: false})
    }

    onSubmit = (e) => {
        e.preventDefault()

        const changePasswordRequest = {
            oldPassword: this.state.oldPassword,
            newPassword: this.state.newPassword
        }

        this.props.changePassword(changePasswordRequest)

        this.setState({
            oldPassword: '',
            newPassword: '',
            newPasswordAgain: ''
        })
    }

    render() {
        const disabled = this.state.newPasswordAgain.length > 0 && this.state.newPassword.length > 0 && this.state.oldPassword.length > 0 && this.state.passwordMatch
        return (
            <div className="profile-short">
                <div className="form-group row">
                    <label htmlFor="name" className="col-sm-3 col-form-label">
                        <Link className="edit-image" to={'/user/' + this.props.user.username}>
                            <img className="profile-image" src={this.props.user.imagePath} alt="profile"/>
                        </Link>
                    </label>
                    <div className="col-sm-7">
                        <div className="profile-details">
                            <p className="profile-username">{this.props.user.username}</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={this.onSubmit}>
                    <div className="form-group row first-row">
                        <label htmlFor="oldPassword" className="col-sm-3 col-form-label">Poprzednie haslo</label>
                        <div className="col-sm-7">
                            <input
                                type="password"
                                className="form-control"
                                id="oldPassword"
                                name="oldPassword"
                                onChange={this.onChange}
                                value={this.state.oldPassword}/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="newPassword" className="col-sm-3 col-form-label">Nowe haslo</label>
                        <div className="col-sm-7">
                            <input
                                style={this.state.passwordMatch
                                ? null
                                : {
                                    border: '1px solid red'
                                }}
                                type="password"
                                className="form-control"
                                id="newPassword"
                                name="newPassword"
                                onChange={this.onChange}
                                onBlur={this.onBlur}
                                value={this.state.newPassword}/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="newPasswordAgain" className="col-sm-3 col-form-label">Potwierdz nowe haslo</label>
                        <div className="col-sm-7">
                            <input
                                style={this.state.passwordMatch
                                ? null
                                : {
                                    border: '1px solid red'
                                }}
                                type="password"
                                className="form-control"
                                id="newPasswordAgain"
                                name="newPasswordAgain"
                                onBlur={this.onBlur}
                                onChange={this.onChange}
                                value={this.state.newPasswordAgain}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="" className="col-sm-3 col-form-label"></label>
                        <div className="col-sm-7">
                            <button
                                type="submit"
                                disabled={!disabled}
                                className="btn btn-primary edit-profil-button">Wyslij</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

ChangePassword.propTypes = {
    user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({user: state.auth.user, editData: state.profiles.editData})

export default connect(mapStateToProps, {changeUserPassword, changePassword})(ChangePassword)
