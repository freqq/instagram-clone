import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {lookForUsers} from '../../../actions/profileActions'
import './Search.css'

class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchText: '',
            foundUsers: [],
            showSearch: false
        }
    }

    componentDidMount() {
        document.addEventListener("click", (evt) => {
            const flyoutElement = document.getElementById("scrollable");
            let targetElement = evt.target;

            do {
                if (targetElement === flyoutElement) {
                    return;
                }
                // Go up the DOM
                targetElement = targetElement.parentNode;
            } while (targetElement);
            this.hideSearch()
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.foundUsers) {
            this.setState({foundUsers: nextProps.foundUsers.content})
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        if (this.state.searchText.length > 0) {
            this
                .props
                .lookForUsers(this.state.searchText)
            this.setState({showSearch: true})
        } else {
            this.setState({showSearch: false})
        }
    }

    hideSearch = () => {
        this.setState({showSearch: false})
    }

    render() {
        const foundUsersItems = this
            .state
            .foundUsers
            .map(user => (
                <li key={user.id}>
                    <div className="profile-short">
                        <Link to={'/user/' + user.username}>
                            <img className="profile-image" src={user.imagePath} alt="profile"/>
                            <div className="profile-details">
                                <p className="profile-username">{user.username}</p>
                                <p className="profile-name">{user.name}</p>
                            </div>
                        </Link>
                    </div>
                </li>
            ))

        return (
            <div>
                <div className="search-box">
                    <input
                        className="search-form form-control"
                        type="text"
                        value={this.state.searchText}
                        onChange={this.onChange}
                        name="searchText"
                        placeholder="Szukaj"/> {this.state.searchText.length > 0 && this.state.foundUsers.length > 0 && this.state.showSearch
                        ? <ul id="scrollable" className="search-results">
                                {foundUsersItems}
                            </ul>
                        : ''
}
                </div>
            </div>
        )
    }
}

PropTypes.propTypes = {
    lookForUsers: PropTypes.func.isRequired,
    foundUsers: PropTypes.array
}

const mapStateToProps = state => ({foundUsers: state.profiles.foundUsers})

export default connect(mapStateToProps, {lookForUsers})(Search)
