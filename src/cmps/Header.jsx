import { Link, useLocation } from "react-router-dom"
import { FaDroplet } from "react-icons/fa6";
export const Header = () => {

    const { pathname } = useLocation()
    const getClassName = (linkName) => {
        const path = `/sync-contractor${linkName}`;
        console.log('path', path);
        console.log('pathname', pathname);

        if (pathname === path)
            return 'active-link';
    }



    return <header className="header-container">
        <h1 className="app-name">Sync {<FaDroplet />} Contractor</h1>
        <nav className="header-nav-bar">
            <Link className={`link-item ${getClassName('/login')}`} to="sync-contractor/login">התחברות</Link>
            <Link className={`link-item ${getClassName('/register')}`} to="sync-contractor/register">הרשמה</Link>
            <Link className={`link-item ${getClassName('/permissions')}`} to="sync-contractor/permissions">הרשאות</Link>
            <Link className={`link-item ${getClassName('/dashboard')}`} to="sync-contractor/dashboard">דשבורד</Link>
            <Link className={`link-item ${getClassName('/managementTable')}`} to="sync-contractor/managementTable">ניהול עבודות</Link>
            <Link className={`link-item ${getClassName('')}`} to="/sync-contractor" > בית</Link>
        </nav >
    </header >
}
