import React, { useState } from 'react';
import { Link } from 'react-router-dom';


export default function SideBar() {
    
    return (
        <>
            <div className={`sidebar-container open`}>
                <div className="sidebar-header">
                    <h2>BamBook</h2>
                </div>
                <ul className="nav-list">
                    <li className="nav-item"><Link to='/' className="nav-link">Home</Link></li>
                    <li className="nav-item"><Link to='/admin/dashboard' className="nav-link">Dashboard</Link></li>
                    <li className="nav-item"><Link to='/admin/dashboard/upload' className="nav-link">Upload Books</Link></li>
                    <li className="nav-item"><Link to='/admin/dashboard/manage' className="nav-link">Manage Books</Link></li>
                    <li className="nav-item"><Link to='/admin/dashboard/upload' className="nav-link">Upload Books</Link></li>
                    <div className="authentication-container">
                        <li className="nav-item"><Link to='/admin/dashboard/login' className="nav-link">Sing In</Link></li>
                        <li className="nav-item"><Link to='/admin/dashboard' className="nav-link">Log Out</Link></li>
                    </div>
                </ul>
            </div>
           
        </>
    );
}
