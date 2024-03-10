import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from "../images/logo.png";

function Navbar() {
    const [activeLink, setActiveLink] = useState('/');

    const handleSetActiveLink = (link) => {
        setActiveLink(link);
    };

    const navbarStyle = {
        backgroundColor: '#fff',
        padding: '10px',
        textAlign: 'right',
        display: 'flex',
        position:"fixed",
        width:"100%",
        top:"0",
        zIndex:"1000"
    };

    const linkStyle = {
        marginLeft: '2.8%',
        fontFamily: 'Inter, sans-serif',
        fontSize: '16px',
        fontWeight: 'bold',
        justifyContent: 'flex-end',
        marginTop: '10px',
        textDecoration: 'none',
        position: 'relative',
    };

    const activeLinkStyle = {
        borderBottom: '2px solid black',
        transition: 'border-bottom-width 0.3s ease',
        animation: 'moveUnderline 0.3s ease',
    };

    return (
        <div className='navbar' style={navbarStyle}>
            <div>
                <img src={Logo} alt="Logo" style={{ width: '169px', height: '48px', marginRight: '400px' }} />
            </div>
            <Link to="/" style={activeLink === '/' ? { ...linkStyle, ...activeLinkStyle } : linkStyle} onClick={() => handleSetActiveLink('/')}>Home</Link>
            <Link to="/our-team" style={activeLink === '/our-team' ? { ...linkStyle, ...activeLinkStyle } : linkStyle} onClick={() => handleSetActiveLink('/our-team')}>Our Team</Link>
            <Link to="/services" style={activeLink === '/services' ? { ...linkStyle, ...activeLinkStyle } : linkStyle} onClick={() => handleSetActiveLink('/services')}>Services</Link>
            <Link to="/our-projects" style={activeLink === '/our-projects' ? { ...linkStyle, ...activeLinkStyle } : linkStyle} onClick={() => handleSetActiveLink('/our-projects')}>Our Projects</Link>
            <Link to="/contact-us" style={activeLink === '/contact-us' ? { ...linkStyle, ...activeLinkStyle } : linkStyle} onClick={() => handleSetActiveLink('/contact-us')}>Contact Us</Link>
            <Link to="/careers" style={activeLink === '/careers' ? { ...linkStyle, ...activeLinkStyle } : linkStyle} onClick={() => handleSetActiveLink('/careers')}>Careers</Link>
            <Link to="/dashb-job-appli" style={activeLink === '/dashb-job-appli' ? { ...linkStyle, ...activeLinkStyle } : linkStyle} onClick={() => handleSetActiveLink('/dashb-job-appli')}>Dashboard</Link>
            <style>{`
                @keyframes moveUnderline {
                    from {
                        transform: scaleX(0);
                        transform-origin: 100% 50%;
                    }
                    to {
                        transform: scaleX(1);
                        transform-origin: 0% 50%;
                    }
                }
            `}</style>
        </div>
    );
}

export default Navbar;
