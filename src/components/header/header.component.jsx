import './header.styles.css';
import React, {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';

const Header = () => {
    const [activeTab, setActiveTab] = useState('Home');
    const location = useLocation();
    useEffect(() => {
        if (location.pathname === '/') {
            setActiveTab('Home');
        } else if (location.pathname === '/add') {
            setActiveTab('Add');
        } else if (location.pathname === '/about') {
            setActiveTab('About');
        }
    }, [location]);
    
    return (
        <div className="header">
            <Link to="/">
                <div className="header_title" onClick={() => setActiveTab('Home')}>Contacts</div>
            </Link>
            <div className="header_menu">
                <Link to="/">
                    <div className={`header_menu_tab ${activeTab === 'Home' ? 'active' : ''}`} onClick={() => setActiveTab('Home')}>Home</div>
                </Link>
                <Link to="/add">
                    <div className={`header_menu_tab ${activeTab === 'Add' ? 'active' : ''}`} onClick={() => setActiveTab('Add')}>Add</div>
                </Link>
                <Link to="/about">
                    <div className={`header_menu_tab ${activeTab === 'About' ? 'active' : ''}`} onClick={() => setActiveTab('About')}>About</div>
                </Link>
            </div>
        </div>
    );
}

export default Header;