import React from 'react';
import Contractor from '../images/contractor.png';
import styled from 'styled-components';

function Home() {
    const containerStyle = {
        position: 'relative',
        width: '100%',
        height: '550px',
    };

    const imageStyle = {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    };

    const overlayStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '550px',
        backgroundColor: 'rgba(0, 0, 0, 0.64)', 
    };

    const textStyle = {
        position: 'absolute',
        top: '48%',
        left: '50%', 
        transform: 'translate(-50%, -50%)',
        color: '#fff',
        fontSize: '36px',
        textAlign: 'center',
        fontWeight:'bold',
        fontFamily:'Inter, sans-serif',
    };
    const buttonText ={
        color: '#fff',
        fontSize: '18px',
        textAlign: 'center',
        fontWeight:'bold',
        fontFamily:'Inter, sans-serif',
    };
    const frameSafety = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '394px',
        backgroundColor: '#891313', 
        marginTop:'615px'
    };
    const textFrame = {
        position: 'absolute',
        top: '20%',
        left: '50%', 
        transform: 'translate(-50%, -50%)',
        color: '#fff',
        fontSize: '36px',
        textAlign: 'center',
        fontWeight:'bold',
        fontFamily:'Inter, sans-serif',
    };
    const cardContainer = {
        marginTop:'150px',
        marginLeft:'28px',
        marginRight:'28px',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridGap: '20px',
        top:'50%',
        };
    const Card = styled.div`
        width: 104%;
        height: 100%;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 2.8);
        transition: transform 0.4s ease-out;
        transform-origin: center bottom;

        &:hover {
            transform: translateY(-24px);
        }
    `;

    const data = [
        { title: 'Social Security and Healthcare Security', 
        text: 'Jaminan Kesehatan dan Keselamatan Ketenagakerjaan of BPJS for each our project',
        image:"medical-box.png"},
        { title: 'Standard Personal Protective Equipment for Workers', 
        text: 'Safety Helmet, Eye Protection, Protection Glove and Safety Shoe and Body Harness',
        image:'setting.png' },
        { title: 'Safety Activities', 
        text: 'Safety Meeting, Safety Briefing, Morning Exercise, Cleaning Project Area, and Smoking Area Facility',
        image:'set-off.png'},
        { title: 'Safety Plus', text: 'Blood Donors, General Check up and K3 Training',
        image:'five-star-badge.png' },
    ];
    const cardText={
        textAlign: 'center',
        fontFamily:'Inter, sans-serif',
        fontSize:'14px',
        marginLeft:'8px',
        marginRight:'8px',
        marginBottom:'12px',
    };
    const cardTitle={
        marginBottom:'4px',
        marginTop: '12px',
        textAlign: 'center',
        fontFamily:'Inter, sans-serif',
        fontSize:'20px',
        fontWeight:'600',
        marginLeft:'4px',
        marginRight:'4px',
    };
    return (
        <React.Fragment>
        <div style={containerStyle}>
            <img src={Contractor} alt="Logo" style={imageStyle} />
            <div style={overlayStyle}></div>
            <div style={textStyle}>
                <p>We do not follow the mainstream,</p>
               <p>but we deliver a different thing.</p>
               <button style={buttonText} type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-6 py-3 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Hubungi Kami</button>
            </div>
        </div>
        <div style={frameSafety}>
    <p style={textFrame}>Safety Awareness Program</p>
    <div style={cardContainer}>
        {data.map((item, index) => (
            <Card key={index}>
                <img
                    src={require(`../images/${item.image}`)}
                    alt={item.title}
                    style={{ display: 'block', margin: 'auto', marginTop: '12px' }}
                />
                <h2 style={cardTitle}>{item.title}</h2>
                <p style={cardText}>{item.text}</p>
            </Card>
        ))}
    </div>
    </div>
        </React.Fragment>
    );
}

export default Home;