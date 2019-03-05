import React from 'react'
import './Logo.css'
import { Link } from 'react-router-dom'

function Logo() {
    return (
        <div>
            <Link to="/">
                <i className="fab fa-instagram"></i>
                <span className="brand-name-logo" id="brand-name">Instagram</span>
            </Link>
        </div>
    )
}

export default Logo