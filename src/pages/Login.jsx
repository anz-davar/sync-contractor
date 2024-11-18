import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();


    const handleLogin = (ev) => {
        ev.preventDefault();
        console.log('Username:', userName);
        console.log('Password:', password);

        // TODO: Perform authentication (e.g., API call)
        if (userName && password) {
            navigate('/');
        } else {
            alert("אנא הזן שם משתמש וסיסמא");
        }
    };

    return (
        <form className="login-main-container" onSubmit={(e) => handleLogin(e)}>
            <div className="login-sub-container">
                <label className="login-label">שם משתמש:</label>
                <input id="user-input"
                    type="text"
                    className="login-input"
                    placeholder="שם משתמש"
                    value={userName}
                    onChange={(ev) => setUserName(ev.target.value)}
                />
            </div>
            <div className="login-sub-container">
                <label className="login-label">סיסמא:</label>
                <input id="password-input"
                    type="password"
                    className="login-input"
                    placeholder="סיסמא"
                    value={password}
                    onChange={(ev) => setPassword(ev.target.value)}
                />
            </div>

            <button type="submit" className="login-btn" >היכנס</button>

            <button type="button"
                className="login-forgot-password"
                onClick={() => alert("שכחתי סיסמא עדיין לא מיושם")}>
                שכחתי סיסמא
            </button>
        </form>
    );
};
