import { Link } from "react-router-dom"


export const Header = () => {

    return <header className="header-container">
        <h1 className="app-name">Sync🪠Contractor</h1>
        <nav className="header-nav-bar">
            <Link className="link-item" to={"/login"}>התחברות</Link>
            <Link className="link-item" to={"/permissions"}>הרשאות</Link>
            <Link className="link-item" to={"/dashboard"}>דשבורד</Link>
            <Link className="link-item" to={"/showWork"}>הצג עבודה</Link>
            <Link className="link-item" to={"/managementTable"}>ניהול עבודות</Link>
            <Link className="link-item" to='/'> בית </Link>
        </nav>
    </header>
}