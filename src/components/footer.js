import React from 'react';
import Logo from "../images/logo.png";

function Footer({ marginTop }) {
    const frameFooter = {
        top: 0,
        left: 0,
        width: '100%',
        height: '300px',
        backgroundColor: '#F2F2F2',
        position:"absolute",
        marginTop: marginTop
    };
    return (
        <div style={frameFooter}>
            <div style={{marginLeft:"8%"}}>
            <img src={Logo} alt="Logo" style={{ width: '169px', height: '48px', marginTop:"60px" }} />
            <p style={{fontFamily:"inter", marginTop:"40px"}}>Copyright 2023 PT Petrakon</p>
            </div>
            <div style={{textAlign:"center",fontFamily:"inter"}}>
                <p style={{marginTop:"-100px"}}>Contacts</p>
                <p style={{marginTop:"20px", fontWeight:"bold"}}>+62 818 0253 2929</p>
                <p style={{marginTop:"10px", fontWeight:"bold"}}>petrakonindonesia@gmail.com</p>
                <p style={{marginTop:"10px", fontWeight:"bold"}}>@petrakon.id</p>
            </div>
            <div style={{textAlign:"end", fontFamily:"inter", marginRight:"8%"}}>
                <p style={{marginTop:"-140px"}}>Jl. Green Lake City Boulevard No.7 Blok H</p>
                <p style={{marginTop:"10px"}}>Duri Kosambi, Kecamatan Cengkareng</p>
                <p style={{marginTop:"10px"}}>Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta</p>
                <p style={{marginTop:"10px"}}>11750</p>
            </div>
        </div>
    );
}

export default Footer;