import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css'; // Optional: for styling

function Navbar({ title }) {
    return (
        <nav className="navbar">
            <h1>{title}</h1>
            <ul className="nav-links">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/how-to-play/Groups">How to Play</Link>
                </li>
                <li>
                    <Link to="/questions">Questions</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
