import {Outlet, NavLink} from "react-router-dom";

export default function AppLayout() {
    return (
        <div className="layout">
            <header className="app-header">
                <div className='header-container'>
                    <div className="title-container">
                        <h1>MOVIE FOX</h1>
                    </div>
                    <nav className="navigation-container">
                        <NavLink to="/mutualmovies" className="navigation-link">Find Mutual Movies</NavLink>
                        <NavLink to="/revenuelists" className="navigation-link">Find Data Lists</NavLink>
                        <NavLink to="/peopletrivia" className="navigation-link">Find People Trivia</NavLink>
                        <NavLink to="/findmovies" className="navigation-link">Find Movies</NavLink>
                        <NavLink to="/characterguessinggame" className="navigation-link">Character Guessing Game</NavLink>
                    </nav>
                </div>
            </header>
            <main className="main-container">
                <Outlet/>
            </main>
            <footer>
                <div className="footer-container">
                    <p className="foot-notes">© 2025 Manuel Weiher</p>
                    <div className="socialmedia-icons">
                        <a href="#" class="fa fa-facebook"></a>
                        <a href="#" class="fa fa-instagram"></a>
                        <a href="#" class="fa fa-youtube"></a>
                    </div>
                </div>
            </footer>
        </div>
    );
}