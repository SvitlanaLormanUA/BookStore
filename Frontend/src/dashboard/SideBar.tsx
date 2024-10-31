import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contects/AuthProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faChartBar, faUpload, faBook, faDatabase, faSignInAlt, faSignOutAlt, faPen } from '@fortawesome/free-solid-svg-icons';

export default function SideBar() {
    const { logOut } = useContext(AuthContext)!;
    const location = useLocation();
    const navigate = useNavigate();

    const [showPopup, setShowPopup] = useState(false);

    const from = location.state?.from?.pathname || '/';

    const handleLogout = () => {
        logOut().then(() => {
            navigate(from, { replace: true });
        }).catch((error) => {
            console.log(error);
        });
    };

    const handleOpenPopup = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleConfirmLogout = () => {
        handleClosePopup();
        handleLogout();
        navigate('/admin/dashboard');
    };

    const isActive = (path) => location.pathname === path ? 'active' : '';

    return (
        <>
            <div className="sidebar-container open">
                <div className="sidebar-header">
                    <h2>BamBook</h2>
                </div>
                <ul className="nav-list">
                    <li className={`nav-item ${isActive('/')}`}><Link to='/' className="nav-link-upload-book">Home</Link></li>
                    <li className={`nav-item ${isActive('/admin/dashboard')}`}><Link to='/admin/dashboard' className="nav-link-upload-book">Dashboard</Link></li>
                    <li className={`nav-item ${isActive('/admin/dashboard/upload')}`}><Link to='/admin/dashboard/upload' className="nav-link-upload-book">Upload Books</Link></li>
                    <li className={`nav-item ${isActive('/admin/dashboard/manage')}`}><Link to='/admin/dashboard/manage' className="nav-link-upload-book">Manage Books</Link></li>
                    <li className={`nav-item ${isActive('/admin/dashboard/book-db')}`}><Link to='/admin/dashboard/book-db' className="nav-link-upload-book">Database Statistics</Link></li>
                    <li className={`nav-item ${isActive('/admin/dashboard/manage-blog')}`}><Link to='/admin/dashboard/manage-blog' className="nav-link-upload-book">Manage Blog </Link></li>
                    <div className="authentication-container">
                        <li className={`nav-item ${isActive('/admin/dashboard/login')}`}><Link to='/admin/dashboard/login' className="nav-link-upload-book"><FontAwesomeIcon icon={faSignInAlt} className='icon'/> Sign In</Link></li>
                        <li className="nav-item">
                            <Link to='/admin/dashboard' className="nav-link-upload-book" onClick={handleOpenPopup}><FontAwesomeIcon icon={faSignOutAlt} className='icon'/> Log Out</Link>
                        </li>
                    </div>
                </ul>
            </div>

            <div className="sidebar-container-mobile open">
                <ul className="nav-list mobile">
                    <li className={`nav-item ${isActive('/')}`}>
                        <Link to='/' className="nav-link-upload-book">
                            <FontAwesomeIcon icon={faHome} />
                        </Link>
                    </li>
                    <li className={`nav-item ${isActive('/admin/dashboard')}`}>
                        <Link to='/admin/dashboard' className="nav-link-upload-book">
                            <FontAwesomeIcon icon={faChartBar} />
                        </Link>
                    </li>
                    <li className={`nav-item ${isActive('/admin/dashboard/upload')}`}>
                        <Link to='/admin/dashboard/upload' className="nav-link-upload-book">
                            <FontAwesomeIcon icon={faUpload} />
                        </Link>
                    </li>
                    <li className={`nav-item ${isActive('/admin/dashboard/manage')}`}>
                        <Link to='/admin/dashboard/manage' className="nav-link-upload-book">
                            <FontAwesomeIcon icon={faBook} />
                        </Link>
                    </li>
                    <li className={`nav-item ${isActive('/admin/dashboard/book-db')}`}>
                        <Link to='/admin/dashboard/book-db' className="nav-link-upload-book">
                            <FontAwesomeIcon icon={faDatabase} />
                        </Link>
                    </li>
                    <li className={`nav-item ${isActive('/admin/dashboard/manage-blog')}`}>
                        <Link to='/admin/dashboard/manage-blog' className="nav-link-upload-book">
                            <FontAwesomeIcon icon={faPen} />
                        </Link>
                    </li>
                    <li className={`nav-item ${isActive('/admin/dashboard/login')}`}>
                        <a href="/login" target="_blank" rel="noopener noreferrer" className="nav-link-upload-book">
                            <FontAwesomeIcon icon={faSignInAlt} />
                        </a>
                    </li>
                    <li className="nav-item">
                        <Link to='/admin/dashboard' className="nav-link-upload-book" onClick={handleOpenPopup}>
                            <FontAwesomeIcon icon={faSignOutAlt} />
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Вікно для підтвердження виходу */}
            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h3>Are you sure you want to log out?</h3>
                        <div className="popup-buttons">
                            <button onClick={handleConfirmLogout} className="btn btn-primary">Yes</button>
                            <button onClick={handleClosePopup} className="btn btn-danger">No</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
