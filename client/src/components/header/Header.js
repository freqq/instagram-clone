import React, {Component} from 'react'
import './Header.css'
import Search from './search/Search'
import Logo from './logo/Logo'
import ProfileActions from './profile-actions/ProfileActions'

class Header extends Component {
    render() {
        return (
                <nav className="navbar fixed-top navbar-expand navbar-dark bg-white">
                    <div className="container">
                        <div
                            className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
                           <Logo />
                        </div>
                        <div className="mx-auto order-0 d-none d-md-block">
                            <Search />
                            <button
                                className="navbar-toggler"
                                type="button"
                                data-toggle="collapse"
                                data-target=".dual-collapse2">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                        </div>
                        <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                            <ProfileActions />
                        </div>
                    </div>
                </nav>
        )
    }
}

export default Header
