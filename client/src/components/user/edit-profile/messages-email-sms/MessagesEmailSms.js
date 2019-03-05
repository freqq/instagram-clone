import React, {Component} from 'react'
import './MessagesEmailSms.css'

export default class MessagesEmailSms extends Component {
    componentDidMount() {
        document.title = "Powiadomienia · InstagramClone"
    }

    render() {
        return (
            <div className="privacy-component messages-email-sms">
                <h2>Subskrybuj:</h2>
                <div className="choice-box">
                    <div class="form-check">
                        <input
                            class="form-check-input"
                            name="isPrivate"
                            type="checkbox"
                            onClick={this.onChange}
                            id="isPrivateCheck"/>
                        <label class="form-check-label" for="isPrivateCheck">
                            E-maile z aktualnościami
                        </label>
                    </div>
                    <p className="privacy-text">Poznawaj nowe produkty w pierwszej kolejności.</p>
                </div>

                <div className="choice-box">
                    <div class="form-check">
                        <input
                            class="form-check-input"
                            name="isPrivate"
                            type="checkbox"
                            onClick={this.onChange}
                            id="isPrivateCheck"/>
                        <label class="form-check-label" for="isPrivateCheck">
                            E-maile z przypomnieniami
                        </label>
                    </div>
                    <p className="privacy-text">Nie przegap ciekawych informacji.</p>
                </div>

                <div className="choice-box">
                    <div class="form-check">
                        <input
                            class="form-check-input"
                            name="isPrivate"
                            type="checkbox"
                            onClick={this.onChange}
                            id="isPrivateCheck"/>
                        <label class="form-check-label" for="isPrivateCheck">
                            E-maile o produktach
                        </label>
                    </div>
                    <p className="privacy-text">Korzystaj ze wskazówek na temat narzędzi Instagramu.</p>
                </div>

                <div className="choice-box">
                    <div class="form-check">
                        <input
                            class="form-check-input"
                            name="isPrivate"
                            type="checkbox"
                            onClick={this.onChange}
                            id="isPrivateCheck"/>
                        <label class="form-check-label" for="isPrivateCheck">
                            E-maile o badaniach
                        </label>
                    </div>
                    <p className="privacy-text">Przekazuj opinie i bierz udział w badaniach naukowych.</p>
                </div>

                <div className="choice-box">
                    <div class="form-check">
                        <input
                            class="form-check-input"
                            name="isPrivate"
                            type="checkbox"
                            onClick={this.onChange}
                            id="isPrivateCheck"/>
                        <label class="form-check-label" for="isPrivateCheck">
                            Wiadomości SMS
                        </label>
                    </div>
                    <p className="privacy-text">Otrzymuj przypomnienia w wiadomościach SMS.</p>
                </div>
            </div>
        )
    }
}
