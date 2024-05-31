import React from 'react'
import { Link } from 'react-router-dom'

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
                            {/* Add more navigation links as needed */}
                        </ul>
                    </div>
                </nav>
                <div className="header-login">
                    Login
                            {/* Insert component here ex. <Login/> */}

                    </div>
            </div>
        </header>
    )
}

export default Header
