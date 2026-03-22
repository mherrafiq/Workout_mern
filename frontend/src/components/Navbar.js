import { Link, NavLink } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext"
import { useTheme } from "../context/ThemeContext"
import Logo from "./Logo"
import ProfileDropdown from "./ProfileDropdown"

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()
    const { isDarkMode, toggleTheme } = useTheme()

    const handleClick = () => {
        logout()
    }

    return (
        <header>
            <div className="container">
                <Link to="/" className="logo-link">
                    <div className="logo-wrapper">
                        <Logo />
                    </div>
                    <h1>Workout Buddy</h1>
                </Link>
                <nav>
                    <div className="nav-actions">
                        <button className="theme-toggle" onClick={toggleTheme} title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
                            <span className="material-symbols-outlined">
                                {isDarkMode ? "light_mode" : "dark_mode"}
                            </span>
                        </button>
                        {user && (
                            <div className="user-info">
                                <NavLink to="/promotions" className="promo-nav-link">Home</NavLink>
                                <NavLink to="/" end className="promo-nav-link">Workout Schedule</NavLink>
                                
                                <ProfileDropdown />
                                
                                <span className="welcome-text">Welcome, {user.firstName || user.email}</span>
                                <button onClick={handleClick}>Log out</button>
                            </div>
                        )}
                        {!user && (
                            <div className="auth-nav">
                                <NavLink to="/promotions" className="promo-nav-link">Home</NavLink>
                                <NavLink to="/" end className="promo-nav-link">Workout Schedule</NavLink>
                                <Link to="/login" className="btn-login">Login</Link>
                                <Link to="/signup" className="btn-signup">Signup</Link>
                            </div>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Navbar