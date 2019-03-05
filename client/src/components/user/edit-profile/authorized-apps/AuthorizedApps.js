import React, {Component} from 'react'

class AuthorizedApps extends Component {
    componentDidMount() {
        document.title = "Autoryzowane aplikacje · InstagramClone"
    }

    render() {
        return (
            <div className="privacy-component">
                <p className="privacy-text">Nie zezwalasz żadnej aplikacji na dostęp do Twojego konta na Instagramie.</p>
            </div>
        )
    }
}

export default AuthorizedApps
