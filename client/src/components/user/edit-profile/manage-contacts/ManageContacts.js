import React, {Component} from 'react'
import './ManageContacts.css'

class ManageContacts extends Component {
    componentDidMount() {
        document.title = "Zarządzaj kontaktami · InstagramClone"
    }
    
    render() {
        return (
            <div className="privacy-component manage-component">
                <h2>Zarządzaj kontaktami</h2>
                <p className="manage-text">Osoby wyszczególnione tutaj to kontakty przesłane
                    przez Ciebie na Instagram. Aby usunąć zsynchronizowane kontakty, dotknij opcji
                    Usuń wszystkie. Jeżeli usuniesz kontakty z tej strony, zostaną przesłane nowe
                    kontakty dodane na telefonie. Jeżeli chcesz zatrzymać synchronizowanie, przejdź
                    do ustawień urządzenia i wyłącz dostęp do kontaktów.</p>
                <p className="manage-text">Kontakty są widoczne tylko dla Ciebie, ale Instagram
                    używa przesłanych przez Ciebie informacji o kontaktach w celu proponowania
                    znajomych Tobie i innym osobom, a także zwiększenia wygody korzystania z
                    serwisu.</p>
                <div className="contacts-synchronized">
                    <span className="bold">0 zsynchronizowanych kontaktów
                    </span>
                    <span className="delete-all-contacts">Usuń wszystkie</span>
                </div>
                <div className="contacts-synchronized">
                    Kiedy prześlesz swoje kontakty do Instagramu, będą widoczne tutaj.
                </div>
                <button disabled className="btn btn-primary edit-profil-button" type="submit">Usuń wszystkie</button>
            </div>
        )
    }
}

export default ManageContacts
