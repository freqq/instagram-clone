import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import './ProfileActions.css'
import Notifications from './notifications/Notifications';

class ProfileActions extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    render() {
        const {user} = this.props.auth
        return (
            <ul className="navbar-nav ml-auto">
                <div className="dropdown">
                    <i className="nav-icon far fa-heart" data-toggle="dropdown"></i>
                    <Notifications />
                </div>
                <li className="nav-item">
                    <Link to={'/user/' + user.username}>
                        <i className="nav-icon far fa-user"></i>
                    </Link>
                </li>
            </ul>
        )
    }
}

const mapStateToProps = state => ({auth: state.auth})
export default connect(mapStateToProps, {})(ProfileActions)