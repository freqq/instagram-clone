import React, {Component} from 'react'

class ProfileLikedByModal extends Component {
    render() {
        return (
            <div
                className="modal fade"
                id="profileLikedByModal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Polubienia</h5>
                        </div>
                        <div className="modal-body">
                            <ul className="share-methods">
                                <li>
                                    <i className="fab fa-facebook-square"></i>
                                    <span className="share-method-name">Udostępnij na Facebooku</span>
                                </li>
                                <li>
                                    <i className="fab fa-facebook-messenger"></i>
                                    <span className="share-method-name">Udostępnij w Messengerze</span>
                                </li>
                                <li>
                                    <i className="fab fa-twitter-square"></i>
                                    <span className="share-method-name">Udostępnij na Twitterze</span>
                                </li>
                                <li>
                                    <i className="far fa-envelope"></i>
                                    <span className="share-method-name">Udostępnij za posrednictwem e-maila</span>
                                </li>
                                <li>
                                    <i className="far fa-copy"></i>
                                    <span className="share-method-name">Kopiuj link</span>
                                </li>
                                <li>
                                    <span className="share-cancel">Anuluj</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProfileLikedByModal