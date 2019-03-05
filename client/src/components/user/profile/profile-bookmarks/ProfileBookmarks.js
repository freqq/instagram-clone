import React, {Component} from 'react'
import {connect} from 'react-redux';
import './ProfileBookmarks.css'

class ProfileBookmarks extends Component {
    state = {
        activeComponent: 0
    }

    render() {
        return (
            <div className="profile-bookmarks container">
                <hr/>
                <ul className="bookmarks-list">
                    <li
                        className={this.state.activeComponent === 0
                        ? 'bookmark-active'
                        : ''}
                        onClick={() => {
                        this
                            .props
                            .switchComponents(0);
                        this.setState({activeComponent: 0})
                    }}>
                        <i className="fas fa-th"></i>
                        Posty</li>
                    {this.props.userId === this.props.user.id
                        ? <li
                                className={this.state.activeComponent === 2
                                ? 'bookmark-active'
                                : ''}
                                onClick={() => {
                                this
                                    .props
                                    .switchComponents(1);
                                this.setState({activeComponent: 2})
                            }}>
                                <i className="far fa-bookmark"></i>
                                Zapisane</li>
                        : ''}
                    <li
                        className={this.state.activeComponent === 3
                        ? 'bookmark-active'
                        : ''}>
                        <i className="fas fa-thumbtack"></i>
                        Z oznaczeniem</li>
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => ({user: state.auth.user})

export default connect(mapStateToProps, {})(ProfileBookmarks);
