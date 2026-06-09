import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function MobileMenu() {
    const [menuOpen, setMenuOpen] = useState(false);

    function toggleMenu() {
        setMenuOpen(prev => !prev);
    }

    function closeMenu() {
        setMenuOpen(false);
    }

    return (
        <div className="mobile-menu-container">
            <button className="menu-button" onClick={toggleMenu}>
                {menuOpen ? "✕" : "☰"}
            </button>

            <div className={`mobile-menu ${menuOpen ? "show-menu" : ""}`}>
                <NavLink to="/findmovies" onClick={closeMenu} className={({ isActive }) => isActive ? "mobile-nav-link active" : "mobile-nav-link"}>Movies</NavLink>
                <NavLink to="/revenuelists" onClick={closeMenu} className={({ isActive }) => isActive ? "mobile-nav-link active" : "mobile-nav-link"}>Movie Lists</NavLink>
                <NavLink to="/people" onClick={closeMenu} className={({ isActive }) => isActive ? "mobile-nav-link active" : "mobile-nav-link"}>People</NavLink>
                <NavLink to="/characterguessinggame" onClick={closeMenu} className={({ isActive }) => isActive ? "mobile-nav-link active" : "mobile-nav-link"}>Character Game</NavLink>
            </div>
        </div>
    );
}