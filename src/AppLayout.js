import {Outlet, NavLink} from "react-router-dom";
import MobileMenu from "./components/MobileMenu";

export default function AppLayout() {
    return (
        <div className="layout">
            <header className="app-header">
                <div className='header-container'>
                    <div className="title-container">
                        <NavLink to="/" end className="home-link" >
                            <h1>MOVIE DATA FINDER</h1>
                        </NavLink>
                    </div>
                    <nav className="navigation-container">
                        <NavLink to="/findmovies" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Movies</NavLink>
                        <NavLink to="/revenuelists" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Movie Lists</NavLink>
                        <NavLink to="/people" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>People</NavLink>
                        <NavLink to="/characterguessinggame" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Character Game</NavLink>
                    </nav>
                    <MobileMenu />
                </div>
            </header>
            <main className="main-container">
                <Outlet/>
            </main>
            <footer>
                <div className="footer-container">
                    <p className="foot-notes">© 2025 Manuel Weiher</p>
                    <div className="socialmedia-icons">
                        <a href="#" className="fa fa-facebook"></a>
                        <a href="#" className="fa fa-instagram"></a>
                        <a href="#" className="fa fa-youtube"></a>
                    </div>
                </div>
            </footer>
        </div>
    );
}