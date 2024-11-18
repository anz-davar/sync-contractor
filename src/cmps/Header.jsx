import { Link, useLocation } from "react-router-dom"

export const Header = () => {

    const { pathname } = useLocation()

    return <header className="header-container">
        <h1 className="app-name">Sync🪠Contractor</h1>
        <nav className="header-nav-bar">
            <Link className={`link-item ${pathname === "/login" ? "active-link" : ""}`} to="/login">התחברות</Link>
            <Link className={`link-item ${pathname === "/permissions" ? "active-link" : ""}`} to="/permissions">הרשאות</Link>
            <Link className={`link-item ${pathname === "/dashboard" ? "active-link" : ""}`} to="/dashboard">דשבורד</Link>
            <Link className={`link-item ${pathname === "/managementTable" ? "active-link" : ""}`} to="/managementTable">ניהול עבודות</Link>
            <Link className={`link-item ${pathname === "/" ? "active-link" : ""}`} to="/">בית</Link>
        </nav>
    </header>
}