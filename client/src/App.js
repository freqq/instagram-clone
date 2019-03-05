import React, {Component, Fragment} from 'react';
import MainSection from './components/main-section/MainSection'
import EditProfile from './components/user/edit-profile/EditProfile'
import Login from './components/user/login/Login'
import Register from './components/user/register/Register'
import {Provider} from 'react-redux';
import store from './store';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import PrivateRoute from './components/common/PrivateRoute';
import {loadUser} from './actions/authActions'
import Profile from './components/user/profile/Profile';
import {ModalContainer} from 'react-router-modal';
import LikedBy from './components/main-section/posts/post/liked-by/LikedBy';
import PostModal from './components/modals/post-modal/PostModal'

class App extends Component {
    previousLocation = this.props.location;

    componentDidMount() {
        store.dispatch(loadUser());
    }

    componentWillUpdate(nextProps) {
        const {location} = this.props;
        if (nextProps.history.action !== "POP" && (!location.state || !location.state.modal)) {
            this.previousLocation = this.props.location;
        }
    }

    render() {
        const {location} = this.props;

        const isModal = !!(location.state && location.state.modal && this.previousLocation !== location);

        return (
            <Provider store={store}>
                <Router>
                    <Fragment>
                        <div className="App">
                            <Switch
                                location={isModal
                                ? this.previousLocation
                                : location}>
                                <PrivateRoute exact path="/" component={MainSection}/>
                                <PrivateRoute exact path="/accounts/edit" component={EditProfile}/>
                                <Route exact path="/user/:username" component={Profile}/>
                                <Route exact path="/login" component={Login}/>
                                <Route exact path="/register" component={Register}/>
                                <Route
                                    path="/:postId/liked_by/"
                                    render={(props) => (
                                    <div>
                                        {isModal
                                            ? null
                                            : <MainSection {...props} isModal={!isModal}/>}
                                        <LikedBy {...props} onClose={() => this.props.history.push("/")}/>
                                    </div>
                                )}/>
                                <Route
                                    path="/user/:username/p/:postId/"
                                    render={(props) => (
                                    <div>
                                        {isModal
                                            ? null
                                            : <Profile {...props} isModal={!isModal}/>}
                                        <PostModal {...props} onClose={() => this.props.history.push("/")}/>
                                    </div>
                                )}/>

                            </Switch>

                            {isModal
                                ? <Route component={LikedBy}/>
                                : null}

                            <ToastContainer/>
                            <ModalContainer/>
                        </div>
                    </Fragment>
                </Router>
            </Provider>
        );
    }
}

export default App