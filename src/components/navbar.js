import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from "../images/logo.png";

function Navbar() {
    const navbarStyle = {
        backgroundColor: '#fff',
        padding: '10px',
        textAlign: 'right',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: "fixed",
        width: "100%",
        top: "0",
        zIndex: "1000"
    };

    const linkStyle = {
        fontFamily: 'Inter, sans-serif',
        fontSize: '16px',
        fontWeight: 'bold',
        textDecoration: 'none',
        position: 'relative',
        marginRight: '32px',
        transition: 'border-bottom-width 0.3s ease', // Pindahkan properti transition ke sini
        animation: 'moveUnderline 0.3s ease', 
    };

    const activeLinkStyle = {
        borderBottom: '2px solid black',
    };

    return (
        <div className='navbar' style={navbarStyle}>
            <img src={Logo} alt="Logo" style={{ width: '169px', height: '48px' }} />
            <div>
                <NavLink exact to="/" style={linkStyle} activeStyle={activeLinkStyle}>Home</NavLink>
                <NavLink to="/our-team" style={linkStyle} activeStyle={activeLinkStyle}>Our Team</NavLink>
                <NavLink to="/services" style={linkStyle} activeStyle={activeLinkStyle}>Services</NavLink>
                <NavLink to="/our-projects" style={linkStyle} activeStyle={activeLinkStyle}>Our Projects</NavLink>
                <NavLink to="/contact-us" style={linkStyle} activeStyle={activeLinkStyle}>Contact Us</NavLink>
                <NavLink to="/careers" style={linkStyle} activeStyle={activeLinkStyle}>Careers</NavLink>
                <NavLink to="/login">
                    <button style={{
                        width: "80px",
                        padding: "8px",
                        fontSize: "16px",
                        fontFamily: "Inter, sans-serif",
                        fontWeight: "bold",
                        color: "#fff",
                        background: "#891313",
                        borderRadius: "6px",
                        cursor: "pointer",
                        border: "2px solid #891313",
                        marginRight: "20px"
                    }}>
                        Login
                    </button>
                </NavLink>
            </div>
        </div>
    );
}

export default Navbar;
