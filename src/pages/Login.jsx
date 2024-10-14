import { useState } from "react"


export const Login = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    //const handleChange = (ev) => {
    //    const field = ev.target.name
    //    const value = (ev.target.type === 'number') ? +ev.target.value : ev.target.value
    //    setFields(prevFields => ({ ...prevFields, [field]: value }))
    //}

    const onLoginBtnClick = (ev) => {
        ev.preventDefault()
        console.log('pass', password);
        console.log('user', userName);
        
    }

    return <form className="login-main-container" onSubmit={ev => ev.preventDefault()}> 
        <div className="login-sub-container">
            <label className="login-label" >שם משתמש:</label>
            <input id="user-input" 
            type="text" 
            className="login-input" 
            value={userName}
            onChange={(ev) => setUserName(ev.target.value)} />
        </div>
        <div className="login-sub-container">
            <label className="login-label" >סיסמא:</label>
            <input id="password-input" 
            type="password" 
            className="login-input" 
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}/>
        </div>

        <button className="login-btn" onClick={(ev)=> onLoginBtnClick(ev)}>היכנס</button>

            <button className="login-forgot-password">שכחתי סיסמא</button>

        </form>
}