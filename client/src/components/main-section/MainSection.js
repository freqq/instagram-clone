import React, {Component} from 'react'
import Posts from './posts/Posts'
import SideMenu from './side-menu/SideMenu'
import Header from '../header/Header'
import './MainSection.css'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {loadUser} from '../../actions/authActions'

class MainSection extends Component {    
    componentDidMount(){
        document.title = "InstagramClone"

        if(this.props.isModal)
            document.body.style.overflow = "hidden"
        else {
            document.body.style.overflowY = "scroll"
        }
        
    }

    render() {
        return (
            <div className={'background-color' + (this.props.isModal ? ' opacity-modal' : '')}>
                <Header/>
                <div className={'container main-section'}>
                    <div className="row">
                        <div className="col-lg-8 content">
                            <Posts/>
                        </div>
                        <div className="col-lg-4 d-none d-lg-block">
                            <SideMenu/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

MainSection.propTypes = {
    user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({user: state.auth.user})

export default connect(mapStateToProps, {loadUser})(MainSection)

