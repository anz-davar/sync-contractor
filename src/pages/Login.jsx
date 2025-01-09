// Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DataService from '../services/DataService';

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (ev) => {
        ev.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await DataService.login({
                email,
                password,
            });

            localStorage.setItem('accessToken', response.data.access);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            navigate('/sync-contractor/managementTable');
        } catch (err) {
            setError(err.response?.data?.detail || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="login-main-container" onSubmit={handleLogin}>
            <div className="login-sub-container">
                <label className="login-label">אימייל:</label>
                <input
                    type="email"
                    className="login-input"
                    placeholder="אימייל"
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)}
                    disabled={loading}
                    required
                />
            </div>
            <div className="login-sub-container">
                <label className="login-label">סיסמא:</label>
                <input
                    type="password"
                    className="login-input"
                    placeholder="סיסמא"
                    value={password}
                    onChange={(ev) => setPassword(ev.target.value)}
                    disabled={loading}
                    required
                />
            </div>

            {error && <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

            <button
                type="submit"
                className="login-btn"
                disabled={loading}
            >
                {loading ? 'מתחבר...' : 'היכנס'}
            </button>

            <button
                type="button"
                className="login-forgot-password"
                onClick={() => alert("שכחתי סיסמא עדיין לא מיושם")}
                disabled={loading}
            >
                שכחתי סיסמא
            </button>
        </form>
    );
};
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
//
// export const Login = () => {
//     const [userName, setUserName] = useState("");
//     const [password, setPassword] = useState("");
//
//     const navigate = useNavigate();
//
//
//     const handleLogin = (ev) => {
//         ev.preventDefault();
//         console.log('Username:', userName);
//         console.log('Password:', password);
//
//         // TODO: Perform authentication (e.g., API call)
//         if (userName && password) {
//             navigate('/sync-contractor/managementTable');
//         } else {
//             alert("אנא הזן שם משתמש וסיסמא");
//         }
//     };
//
//     return (
//         <form className="login-main-container" onSubmit={(e) => handleLogin(e)}>
//             <div className="login-sub-container">
//                 <label className="login-label">שם משתמש:</label>
//                 <input id="user-input"
//                     type="text"
//                     className="login-input"
//                     placeholder="שם משתמש"
//                     value={userName}
//                     onChange={(ev) => setUserName(ev.target.value)}
//                 />
//             </div>
//             <div className="login-sub-container">
//                 <label className="login-label">סיסמא:</label>
//                 <input id="password-input"
//                     type="password"
//                     className="login-input"
//                     placeholder="סיסמא"
//                     value={password}
//                     onChange={(ev) => setPassword(ev.target.value)}
//                 />
//             </div>
//
//             <button type="submit" className="login-btn" >היכנס</button>
//
//             <button type="button"
//                 className="login-forgot-password"
//                 onClick={() => alert("שכחתי סיסמא עדיין לא מיושם")}>
//                 שכחתי סיסמא
//             </button>
//         </form>
//     );
// };
