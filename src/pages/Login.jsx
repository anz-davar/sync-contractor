import { useState } from "react"


export const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    return <form className="login-main-container"> 
        <div className="login-sub-container">
            <label className="login-label" >שם משתמש:</label>
            <input id="email-input" type="text" className="login-input"/>
        </div>
        <div className="login-sub-container">
            <label className="login-label" >סיסמא:</label>
            <input id="password-input" type="password" className="login-input" />
        </div>

        <button className="login-btn">היכנס</button>

            <button className="login-forgot-password">שכחתי סיסמא</button>

        </form>
}