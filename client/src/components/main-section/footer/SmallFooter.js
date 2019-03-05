import React, {Component} from 'react'
import './SmallFooter.css'

export default class SmallFooter extends Component {
    render() {
        return (
            <div className="d-lg-none small-footer">
                    <ul className="small-footer-list">
                        <li>Informacje</li>
                        <li>Wsparcie</li>
                        <li>Prasa</li>
                        <li>API</li>
                        <li>Praca</li> <br />
                        <li>Prywatność</li>
                        <li>Regulamin</li>
                        <li>Katalog</li>
                        <li>Profile</li> <br />
                        <li>Hasztagi</li>
                        <li>Język</li>
                    </ul>
                    <p className="copyright-small">© 2019 INSTAGRAM</p>
            </div>
        )
    }
}
