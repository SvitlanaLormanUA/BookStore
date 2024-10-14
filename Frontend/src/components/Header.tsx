import '../styles/App.css';

export default function Header() {
    return (
        <>
            <div className="header-container">
                <ul className="params">
                    <div className="menuParam">
                        <li className="header-param-icon"></li>
                        <li className="header-param">Shop</li>
                        <li className="header-param">Blog</li>
                        <li className="header-param">About us</li>
                        <li className="header-param">Team</li>
                    </div>
                    <div className="buttons-login">
                        <button className="login">Login</button>
                        <button className="register">Sign Up</button>
                    </div>
                </ul>
            </div>
        </>
    );
}