import {Outlet, NavLink} from "react-router-dom";

export default function AppLayout() {
    return (
        <div className="layout">
            <header className="app-header">
                <div className='header-container'>
                    <div className="title-container">
                        <h1>MOVIE FACTS</h1>
                    </div>
                    <nav className="navigation-container">
                        <NavLink to="/mutualmovies" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Find Mutual Movies</NavLink>
                        <NavLink to="/revenuelists" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Find Data Lists</NavLink>
                        <NavLink to="/peopletrivia" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Find People Trivia</NavLink>
                        <NavLink to="/findmovies" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Find Movies</NavLink>
                        <NavLink to="/characterguessinggame" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Character Guessing Game</NavLink>
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