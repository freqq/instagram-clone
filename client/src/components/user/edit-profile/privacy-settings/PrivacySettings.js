import React, {Component} from 'react'
import './PrivacySettings.css'
import PrivateAccountModal from '../../../modals/private-account-modal/PrivateAccountModal';
import {setProfilePrivate} from '../../../../actions/profileActions'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

class PrivacySettings extends Component {
    state = {
        isPrivate: null
    }

    componentDidMount() {
        document.title = "Prywatność i bezpieczeństwo · InstagramClone"
        this.setState({isPrivate: this.props.editData.private})
    }

    onChange = (e) => {
        if (this.state.isPrivate === false) {
            this.setState({
                [e.target.name]: e.target.checked
            })
            this.props.setProfilePrivate()
        }
    }

    profileUnPrivate = () => {
        this
            .props
            .setProfilePrivate()
        this.setState({isPrivate: false})
    }

    render() {
        return (
            <div className="privacy-component">
                <h2>Ustawienia prywatności konta</h2>
                <div class="form-check">
                    <input
                        data-toggle="modal"
                        data-target={this.state.isPrivate
                        ? '#privateAccountModal'
                        : ''}
                        class="form-check-input"
                        name="isPrivate"
                        type="checkbox"
                        checked={this.state.isPrivate}
                        onClick={this.onChange}
                        id="isPrivateCheck"/>
                    <label class="form-check-label" for="isPrivateCheck">
                        Konto prywatne
                    </label>
                </div>
                <p className="privacy-text">Kiedy konto jest prywatne, Twoje zdjęcia i filmy na
                    Instagramie mogą oglądać tylko zatwierdzeni przez Ciebie użytkownicy. Nie ma to
                    wpływu na dotychczas obserwujące Cię osoby.</p>
                <PrivateAccountModal profilePrivate={this.profileUnPrivate}/>
            </div>
        )
    }
}

PrivacySettings.propTypes = {
    user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({user: state.auth.user, editData: state.profiles.editData})

export default connect(mapStateToProps, {setProfilePrivate})(PrivacySettings)
