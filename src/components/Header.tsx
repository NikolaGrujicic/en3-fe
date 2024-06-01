import React from 'react'
import { Link } from 'react-router-dom'
import Login from './Login'

const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="container">
                <h1>En3</h1>
                <nav>

                    <div className="header-navigation">
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/events">My Events</Link></li>

                            {/* Add more navigation links as needed */}
                        </ul>
                    </div>
                </nav>
                <div className="header-login">
                    <Login/>

                    </div>
            </div>
        </header>
    )
}

export default Header
