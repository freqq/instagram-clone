import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {toast} from 'react-toastify';
import {PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH, NAME_MIN_LENGTH, NAME_MAX_LENGTH} from '../../../constants'
import {register, checkUsernameAvaibility, checkEmailAvaibility} from '../../../actions/authActions'
import {Link, Redirect} from 'react-router-dom'
import phoneImage from '../images/phoneImage.png'
import loginLogo from '../images/loginLogo.png'
import './Register.css'

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            username: '',
            email: '',
            password: '',
            image: null,
            usernameAvaible: true,
            emailAvaible: true,
            passwordOk: true,
            imageName: 'Zdjecie profilowe',
            nameOk: true
        }
    }

    notify = () => {
        toast.success("Poprawnie zarejestrowany !", {position: toast.POSITION.TOP_RIGHT});
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.emailAvaibility) {
            this.setState({emailAvaible: nextProps.emailAvaibility.available})
        }
        if (nextProps.usernameAvaibility) {
            this.setState({usernameAvaible: nextProps.usernameAvaibility.available})
        }
        if (nextProps.registerResponse) {
            if (nextProps.registerResponse.data) {
                if (nextProps.registerResponse.data.success) {
                    if (nextProps.registerResponse.data.success === true) {
                        this.notify()
                        this
                            .props
                            .history
                            .push("/login");
                    }
                }
            }
        }
    }

    onChange = (e) => this.setState({
        [e.target.name]: e.target.value
    })

    checkUsernameAvaibility = () => {
        this
            .props
            .checkUsernameAvaibility(this.state.username)
    }

    imageChange = (e) => {
        this.setState({image: e.target.files[0], imageName: e.target.files[0].name})
    }

    checkEmailAvaibility = () => {
        this
            .props
            .checkEmailAvaibility(this.state.email)
    }

    checkPassword = () => {
        if (this.state.password.length < PASSWORD_MIN_LENGTH || this.state.password.length > PASSWORD_MAX_LENGTH) 
            this.setState({passwordOk: false})
        else 
            this.setState({passwordOk: true})
    }

    checkName = () => {
        if (this.state.name.length < NAME_MIN_LENGTH || this.state.name.length > NAME_MAX_LENGTH) 
            this.setState({nameOk: false})
        else 
            this.setState({nameOk: true})
    }

    onSubmit = (e) => {
        e.preventDefault()

        const signUpRequest = {
            name: this.state.name,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            image: this.state.image
        }

        this
            .props
            .register(signUpRequest)
    }

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/"/>;
        }

        const isEnabled = this.state.usernameAvaible && this.state.emailAvaible && this.state.username && this.state.name && this.state.passwordOk && this.state.password && this.state.email && this.state.image && this.state.nameOk

        return (
            <div className="login-main register-site background-color">
                <div className="container login-section">
                    <div className="row">
                        <div className="phone-image col-md-6 d-none d-md-block">
                            <img src={phoneImage} alt="phones"/>
                        </div>
                        <div className="col-md-6">
                            <div className="login-box">
                                <img className="login-logo" src={loginLogo} alt="login-logo"/>
                                <form onSubmit={this.onSubmit}>
                                    {this.state.nameOk
                                        ? ''
                                        : <span className="wrong-register">Nazwa musi miec od {NAME_MIN_LENGTH}
                                            do {NAME_MAX_LENGTH}
                                            znakow.</span>}
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            name="name"
                                            value={this.state.name}
                                            onBlur={this.checkName}
                                            onChange={this.onChange}
                                            className="form-control login-input"
                                            required
                                            placeholder="Nazwa"/></div>

                                    {this.state.usernameAvaible
                                        ? ''
                                        : <span className="wrong-register">Nazwa uzytkownika zajeta.</span>}
                                    <div className="form-group">
                                        <input
                                            style={this.state.usernameAvaible
                                            ? null
                                            : {
                                                border: '1px solid red'
                                            }}
                                            type="text"
                                            onBlur={this.checkUsernameAvaibility}
                                            name="username"
                                            value={this.state.username}
                                            onChange={this.onChange}
                                            className="form-control login-input"
                                            required
                                            placeholder="Nazwa uzytkownika"/></div>
                                    {this.state.emailAvaible
                                        ? ''
                                        : <span className="wrong-register">Email zajety.</span>}
                                    <div className="form-group">
                                        <input
                                            style={this.state.emailAvaible
                                            ? null
                                            : {
                                                border: '1px solid red'
                                            }}
                                            type="email"
                                            onBlur={this.checkEmailAvaibility}
                                            name="email"
                                            value={this.state.email}
                                            onChange={this.onChange}
                                            required
                                            className="form-control login-input"
                                            placeholder="Email"/></div>
                                    {this.state.passwordOk
                                        ? ''
                                        : <span className="wrong-register">Haslo musi miec od {PASSWORD_MIN_LENGTH}
                                            do {PASSWORD_MAX_LENGTH}
                                            znakow.</span>}
                                    <div className="form-group">
                                        <input
                                            style={this.state.passwordOk
                                            ? null
                                            : {
                                                border: '1px solid red'
                                            }}
                                            value={this.state.password}
                                            onChange={this.onChange}
                                            onBlur={this.checkPassword}
                                            type="password"
                                            required
                                            name="password"
                                            className="form-control login-input"
                                            placeholder="Haslo"/></div>

                                    <div className="input-group custom-file-upload">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="inputGroupFileAddon01"></span>
                                        </div>
                                        <div className="custom-file">
                                            <input
                                                onChange={this.imageChange}
                                                type="file"
                                                name="photo"
                                                required
                                                className="custom-file-input"/>
                                            <label className="custom-file-label" htmlFor="inputGroupFile01">{this.state.imageName.length > 20
                                                    ? (
                                                        <span>{this
                                                                .state
                                                                .imageName
                                                                .slice(0, 15)}...</span>
                                                    )
                                                    : <span>{this.state.imageName}</span>
}</label>
                                        </div>
                                    </div>
                                    <button
                                        disabled={!isEnabled}
                                        type="submit"
                                        className="btn btn-block mybtn btn-primary margin-bottom login-button">Zarejestruj</button>
                                </form>
                            </div>
                            <div className="login-box sign-up-box">
                                Masz juz konto ?
                                <Link className="register-sign" to="/login">Zaloguj sie</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Register.propTypes = {
    register: PropTypes.func.isRequired,
    checkUsernameAvaibility: PropTypes.func.isRequired,
    checkEmailAvaibility: PropTypes.func.isRequired,
    usernameAvaibility: PropTypes.object,
    emailAvaibility: PropTypes.object,
    registerResponse: PropTypes.object,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({registerResponse: state.auth.registerResponse, usernameAvaibility: state.auth.usernameAvaibility, emailAvaibility: state.auth.emailAvaibility, isAuthenticated: state.auth.isAuthenticated})

export default connect(mapStateToProps, {register, checkUsernameAvaibility, checkEmailAvaibility})(Register);
