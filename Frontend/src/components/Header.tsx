import { Link, Outlet } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useState, useEffect, useRef, useContext } from 'react';
import '../styles/App.css';
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { useLikedBooks } from '../context/LikedBooksContext';
import { useBooksInCart } from '../context/BooksInCartContext'; 
import UserProfile from './UserProfile'; // Import the UserProfile component
import { AuthContext } from '../contects/AuthProvider';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false); // Track if the profile popup is open
    const { likedBooks } = useLikedBooks(); 
    const { booksInCart } = useBooksInCart(); 
    const { user } = useContext(AuthContext)!; 
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

    const openProfilePopup = () => setIsProfilePopupOpen(true);
    const closeProfilePopup = () => setIsProfilePopupOpen(false);

    return (
        <>
        <div className="header-container">
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
                        <div className="favheart-icon">
                            <Link to="/cart"><FaShoppingCart size="2em" /></Link>
                            <span className='circle-count'>{booksInCart.length}</span>
                        </div> 
                       
                        <div className="favheart-icon">
                            <Link to="/favorite"><FaHeart size="2em" /></Link>
                            <span className='circle-count'>{likedBooks.length}</span>
                        </div> 
                    </div>
                    
                    <div className="login-and-sign-up-btn">
                        {user ? (
                            user.email === "svlormanua@gmail.com" ? ( 
                                <Link to="/admin/dashboard" className="profile-link">  
                                    <div className="profile-circle"></div> 
                                    <p>Admin Profile</p>
                                </Link>
                            ) : (
                                <div className="profile-link" onClick={openProfilePopup}>
                                    <div className="profile-circle"></div>
                                    <p>Your Profile</p>
                                </div>
                            )
                        ) : (
                            <>
                                <a href="/login" target="_blank" rel="noopener noreferrer">
                                    <Button className="custom-login-btn">Login</Button>
                                </a>
                                <a href="/sign-up" target="_blank" rel="noopener noreferrer">
                                    <Button className="custom-register-btn">Sign Up</Button>
                                </a>
                            </>
                        )}
                    </div>
                </div>
            </ul>
            <Outlet />

            {/* Profile Popup */}
            {isProfilePopupOpen && (
                <div className="popup-overlay" onClick={closeProfilePopup}>
                    <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                        <UserProfile />
                        <button className="close-popup" onClick={closeProfilePopup}>X</button>
                    </div>
                </div>
            )}
        </div>
        </>
    );
}
