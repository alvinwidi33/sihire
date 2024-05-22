import React, { useState } from 'react';
import Contractor from '../images/contractor.png';
import styled from 'styled-components';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { Link } from 'react-router-dom';

function Home() {
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [projects, setProjects] = React.useState(null);
    const [profileData, setProfileData] = React.useState(null);

    React.useEffect(() => {
      const getProjects = async () => {
        try {
          const response = await fetch(
            "https://sihire-be.vercel.app/api/project/get-all-projects/"
          );
          if (response.ok) {
            const data = await response.json();
            setProjects(data);
          } else {
            console.error("Failed to fetch projects");
          }
        } catch (error) {
          console.error("Error fetching projects:", error);
        }
      };
      getProjects();
    }, []);

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
               <p>but we deliver a different thing.</p>
               <Link to={`/contact-us`}>
               <button style={buttonText} type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-6 py-3 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Hubungi Kami</button>
               </Link>
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
    <p className='mx-auto text-xl font-bold text-center my-8' style={{color: '#2A3E4B',
        fontSize: '36px',
        textAlign: 'center',
        fontWeight:'bold',
        fontFamily:'Inter, sans-serif'}}>Our Projects</p>
            <div className='flex flex-wrap gap-8' style={{marginLeft:"20%"}}>
            {
                projects &&
                projects.filter(p => p.is_highlighted).map((project) => (
                    <div key={project.id} className='bg-white w-64 shadow-lg rounded-xl overflow-hidden'>
                        <div className='flex flex-col h-full'>
                            <img src={"https://lwchpknnmkmpfbkwcrjs.supabase.co/storage/v1/object/public/sihire-project/" + project.foto1.split(",")[0]} alt="project" className='h-36 w-full object-cover'/>
                            <div className='flex flex-col p-4 justify-between gap-4 h-full'>
                                <h2 className='font-bold line-clamp-2'>{project.project_name}</h2>
                                <div className='flex gap-2'>
                                <Link to={`/project/${project.id}`}>
                                  <button style={{
                                      width: "100px",
                                      padding: "8px",
                                      fontSize: "14px",
                                      fontFamily: "Inter, sans-serif",
                                      fontWeight: "bold",
                                      color: "#fff",
                                      background: "#333",
                                      borderRadius: "6px",
                                      cursor: "pointer",
                                      border: "2px solid #333",
                                  }}
                                  >
                                      Lihat Detail
                                  </button>
                                </Link>
                                {profileData && profileData.role === 'Admin' &&
                                    <Link to={`/edit-project/${project.id}`}>
                                        <button 
                                          style={{
                                            width: "90px",
                                            padding: "8px",
                                            fontSize: "14px",
                                            fontFamily: "Inter, sans-serif",
                                            fontWeight: "bold",
                                            color: "#2A3E4B",
                                            borderRadius: "6px",
                                            cursor: "pointer",
                                            border: "2px solid #2A3E4B",
                                          }}
                                        >
                                            Edit
                                        </button>
                                    </Link>
                                }
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
            </div>
    </div>

        <Footer marginTop="1500px"/>
        </React.Fragment>
    );
}

export default Home;