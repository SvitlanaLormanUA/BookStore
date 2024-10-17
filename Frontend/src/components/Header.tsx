import { Link, Outlet } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useState } from 'react';
import '../styles/App.css';
import { FaShoppingCart, FaHeart } from "react-icons/fa";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Toggle the menu open/close
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
        <div className="header-container">
            {/* Hamburger menu is shown only on smaller screens */}
            <div className="hamburger-menu " onClick={toggleMenu}>
                <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
                <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
                <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
            </div>
            
            <ul className={`params ${isMenuOpen ? 'open' : ''}`}>
                <Tabs className="menuParam mb-3" defaultActiveKey="/main" id="fill-tab-example" fill>
                    <Tab eventKey="books" title={<Link to="/genres" className="nav-link">Books</Link>} />
                    <Tab eventKey="main" title={<Link to="/" className="nav-link">Main Page</Link>} />
                    <Tab eventKey="shop" title={<Link to="/shop" className="nav-link">Shop</Link>} />
                    <Tab eventKey="blog" title={<Link to="/blog" className="nav-link">Blog</Link>} />
                    <Tab eventKey="about" title={<Link to="/about" className="nav-link">About us</Link>} />
                </Tabs>

                <div className="buttons-login">
                    <div className="chosen-books">
                        <Link to="/basket"><FaShoppingCart size="2em" /></Link>
                        <Link to="/favorite"><FaHeart size="2em" /></Link>
                    </div>
                    <Link to="/login">
                        <Button className="custom-login-btn">Login</Button>
                    </Link>
                    <Link to="/register">
                        <Button className="custom-register-btn">Sign Up</Button>
                    </Link>
                </div>
            </ul>
            <Outlet />
        </div>
        </>
    );
}
