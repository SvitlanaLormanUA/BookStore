import { Link, Outlet } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useState, useEffect, useRef } from 'react';
import '../styles/App.css';
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { useLikedBooks } from '../context/LikedBooksContext';


export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { likedBooks, removeLikedBook } = useLikedBooks(); 
    const menuRef = useRef(null);  
    const hamburgerRef = useRef(null);  

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target) && 
            hamburgerRef.current && !hamburgerRef.current.contains(event.target)) {
            setIsMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <>
        <div className="header-container">
            {/* Hamburger menu is shown only on smaller screens */}
            <div className="hamburger-menu" onClick={toggleMenu} ref={hamburgerRef}>
                <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
                <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
                <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
            </div>
            
            <div className="brand-name-fixed">
                <Link to="/" className="brand-link">BamBook</Link>
            </div>

            <ul className={`params ${isMenuOpen ? 'open' : ''}`} ref={menuRef}>
                <Tabs className="menuParam mb-3" defaultActiveKey="/main" id="fill-tab-example" fill>
                    <Tab eventKey="books" title={<Link to="/books" className="nav-link">Books</Link>} />
                    <Tab eventKey="main" title={<Link to="/" className="nav-link">Main Page</Link>} />
                    <Tab eventKey="blog" title={<Link to="/blog" className="nav-link">Blog</Link>} />
                    <Tab eventKey="about" title={<Link to="/about" className="nav-link">About us</Link>} />
                </Tabs>

                <div className="buttons-login">
                    <div className="chosen-books">
                    
                        <Link to="/cart"><FaShoppingCart size="2em" /> </Link>
                      
                       
                        <div className="favheart-icon">
                            <Link to="/favorite"><FaHeart size="2em" /></Link>
                            <span className='circle-count'>{likedBooks.length}</span>
                        </div> 
                       

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
