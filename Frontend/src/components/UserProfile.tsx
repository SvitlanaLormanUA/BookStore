import { useContext, useState } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../contects/AuthProvider';

export default function UserProfile() {
    const { user, logOut } = useContext(AuthContext)!;
    const [showPopup, setShowPopup] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';

    const handleOpenPopup = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleConfirmLogout = () => {
        handleClosePopup();
        logOut()
            .then(() => {
                navigate(from, { replace: true });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="user-profile">
            {user ? (
                <div className="user-info">
                    <ProfileDetail label="Name" value={user.displayName} />
                    <ProfileDetail label="Email" value={user.email} />
                    <div className="authentication-container">
                        <Link className="nav-link-upload-book" onClick={handleOpenPopup} to={''}>
                            <FontAwesomeIcon icon={faSignOutAlt} className='icon' /> Log Out
                        </Link>
                        <Link to='/login' className="nav-link-upload-book"> 
                            <FontAwesomeIcon icon={faSignInAlt} className='icon' /> Sign In With Another Account
                        </Link>
                    </div>
                </div>
            ) : (
                <p className="user-loading">Loading user information...</p>
            )}

            {/* Logout Confirmation Popup */}
            {showPopup && (
                <div className="popup-overlay" onClick={handleClosePopup}>
                    <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                        <h3>Are you sure you want to log out?</h3>
                        <div className="popup-buttons">
                            <button onClick={handleConfirmLogout} className="btn btn-primary">Yes</button>
                            <button onClick={handleClosePopup} className="btn btn-danger">No</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function ProfileDetail({ label, value }) {
    return (
        <p className="user-detail">
            <strong>{label}:</strong> {value}
        </p>
    );
}
