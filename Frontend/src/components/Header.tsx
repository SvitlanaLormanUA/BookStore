import { Link, Outlet } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useState } from 'react';
import '../styles/App.css';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Toggle the menu open/close
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="header-container">
            <div className="hamburger-menu" onClick={toggleMenu}>
                <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
                <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
                <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
            </div>
            <ul className={`params ${isMenuOpen ? 'open' : ''}`}>
                <Tabs className="menuParam mb-3" defaultActiveKey="/main" id="fill-tab-example" fill>
                    <Tab eventKey="team" title={<Link to="/" className="nav-link">Main Page</Link>} />
                    <Tab eventKey="shop" title={<Link to="/shop" className="nav-link">Shop</Link>} />
                    <Tab eventKey="blog" title={<Link to="/blog" className="nav-link">Blog</Link>} />
                    <Tab eventKey="about" title={<Link to="/about" className="nav-link">About us</Link>} />
                </Tabs>
                <div className="buttons-login">
                    <Button className="custom-login-btn">Login</Button>
                    <Button className="custom-register-btn">Sign Up</Button>
                </div>
            </ul>
            <Outlet />
        </div>
    );
}
