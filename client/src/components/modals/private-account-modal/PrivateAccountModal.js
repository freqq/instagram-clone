import React, {Component} from 'react'
import './PrivateAccountModal.css'

class PrivateAccountModal extends Component {
    render() {
        return (
            <div>
                <div
                    className="modal fade"
                    id="privateAccountModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div className="modal-dialog liked-by-modal" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    Zmienic ustawienia prywatnosci ?
                                    <p className="modal-silver">Każdy będzie mógł zobaczyć Twoje zdjęcia i filmy na
                                        Instagramie. Nie trzeba już zatwierdzać obserwujących.</p>
                                </h5>
                            </div>
                            <div className="modal-body">
                                <ul className="change-profile-photo-menu">
                                    <li
                                        onClick={this.props.profilePrivate}
                                        className="add-photo"
                                        data-dismiss="modal"
                                        aria-label="Close">
                                        Ok
                                    </li>
                                    <li data-dismiss="modal" aria-label="Close">Anuluj</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PrivateAccountModal