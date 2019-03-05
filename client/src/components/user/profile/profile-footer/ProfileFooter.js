import React, { Component } from 'react'
import './ProfileFooter.css'

export default class ProfileFooter extends Component {
  render() {
    return (
      <div className="profile-footer container d-none d-lg-block">
        <ul className="profile-footer-list">
          <li>Informacje</li>
          <li>Wsparcie</li>
          <li>Prasa</li>
          <li>API</li>
          <li>Praca</li>
          <li>Prywatność</li>
          <li>Regulamin</li>
          <li>Katalog</li>
          <li>Profile</li>
          <li>Hasztagi</li>
          <li>Język</li>
        </ul>
        <p className="profile-footer-copy">© 2019 INSTAGRAM</p>
      </div>
    )
  }
}
