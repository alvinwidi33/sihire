import React, { useState } from 'react';
import Contractor from '../images/contractor.png';
import styled from 'styled-components';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
function Home() {
    const [currentCardIndex, setCurrentCardIndex] = useState(0);

    const navigateToPreviousCard = () => {
        setCurrentCardIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    const navigateToNextCard = () => {
        setCurrentCardIndex((prevIndex) => Math.min(prevIndex + 1, dataProject.length - 1));
    };
    const containerStyle = {
        position: 'relative',
        width: '100%',
        height: '550px',
        marginTop:"55px"
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
        marginTop:'600px'
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
    const textProject = {
        position: 'absolute',
        top: '75px',
        left: '50%', 
        transform: 'translate(-50%, -50%)',
        color: '#2A3E4B',
        fontSize: '36px',
        textAlign: 'center',
        fontWeight:'bold',
        fontFamily:'Inter, sans-serif',
    };
    const cardContainer = {
        marginTop:'150px',
        marginLeft:'1%',
        marginRight:'1%',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridGap: '20px',
        top:'50%',
        };
    const cardProjectContainer = {
        marginTop:'150px',
        marginLeft:'1%',
        marginRight:'1%',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridGap: '20px',
        top:'50%',
        };
    const Card = styled.div`
        width: 100%;
        height: 220px;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 2.8);
        transition: transform 0.4s ease-out;
        transform-origin: center bottom;

        &:hover {
            transform: translateY(-24px);
        }
    `;
    const CardProject = styled.div`
    margin-top: 4px;
    margin-left: 20%;
    width: 60%;
    height: px;
    background-color: white; 
    border-radius: 10px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
    position:absolute
`;

const dataProject = [
    {
        title: "Rumah 1",
        location: "Jl. Raden Saleh, Karang Tengah \n Tangerang – Indonesia",
        type: "Residential",
        land: "500m",
        building: "300m",
        image: require('../images/rumah1.png')
    },
    {
        title: "Rumah 2",
        location: "Jl. Darmo, Pakis, Surabaya \n Jawa Timur – Indonesia",
        type: "Villa",
        land: "800m",
        building: "600m",
        image: require('../images/rumah2.png')
    },
    {
        title: "Rumah 3",
        location: "Jl. Diponegoro, Menteng \n Jakarta Pusat – Indonesia",
        type: "Luxury Residence",
        land: "1000m",
        building: "750m",
        image: require('../images/rumah3.png')
    }
];

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
    const frameProject = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '694px',
        backgroundColor: '#F2F2F2', 
        marginTop:'994px'
    };
    const cardTitle={
        marginBottom:'4px',
        marginTop: '4px',
        textAlign: 'center',
        fontFamily:'Inter, sans-serif',
        fontSize:'20px',
        fontWeight:'600',
        marginLeft:'8px',
        marginRight:'8px',
    };
    return (
        <React.Fragment>
        <Navbar/>
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
    <div style={frameProject}>
        <p style={textProject}>Our Projects</p>
        <div style={{ position: 'relative' }}>
            {currentCardIndex > 0 && (
                <button onClick={navigateToPreviousCard} style={{ position: 'absolute', top: '70%', left: '200px', transform: 'translate(-50%, -50%)', zIndex: '1' }}>
                    &lt;
                </button>
            )}
            {currentCardIndex < dataProject.length - 1 && (
                <button onClick={navigateToNextCard} style={{ position: 'absolute', top: '70%', right: '200px', transform: 'translate(50%, -50%)', zIndex: '1' }}>
                    &gt;
                </button>
            )}
            <div style={cardProjectContainer}>
                {dataProject.map((item, index) => (
                    <CardProject key={index} style={{ display: index === currentCardIndex ? 'block' : 'none' }}>
                        <img src={item.image} alt={item.title} style={{ width: '100%', height: 'auto', borderRadius: '10px 10px 0 0' }} />
                        <h1>{item.title}</h1>
                        <p>{item.location}</p>
                        <p>{item.type}</p>
                        <p>{item.land}</p>
                        <p>{item.building}</p>
                    </CardProject>
                ))}
            </div>
        </div>
    </div>
        <Footer marginTop="1500px"/>
        </React.Fragment>
    );
}

export default Home;