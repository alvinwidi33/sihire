import React from 'react';
import Navbar from '../components/navbar';
import { Link } from 'react-router-dom';
import Logo from "../images/logo.png";

function OurProjects() {
    const [projects, setProjects] = React.useState(null);
    const [profileData, setProfileData] = React.useState(null);
    const frameFooter = {
        width: '100%',
        height: '300px',
        backgroundColor: '#F2F2F2',
        position:"absolute",
    };
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

    React.useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await fetch('https://sihire-be.vercel.app/api/users/logged-in/', {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Token ' + window.localStorage.getItem("token")
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log(data)
                    setProfileData(data);
                } else {
                    console.error('Failed to fetch profile data');
                }
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };

        fetchProfileData();
    }, []);

    return (
        <>
            <Navbar />
            <div className='bg-white-100 p-16 min-h-screen'>
                <p className='mx-auto text-xl font-bold text-center my-8'>Our Projects</p>
                <div className='flex flex-wrap gap-8' style={{ marginLeft: '65px' }}> {/* Adjusted marginLeft here */}
                    {projects &&
                        projects.map((project) => (
                            <div key={project.id} className='bg-white w-64 shadow-lg rounded-xl overflow-hidden'>
                                <div className='flex flex-col h-full'>
                                    <img src={"https://lwchpknnmkmpfbkwcrjs.supabase.co/storage/v1/object/public/sihire-project/" + project.foto1.split(",")[0]} alt="project" className='h-36 w-full object-cover' />
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
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            <div style={frameFooter}>
            <div style={{marginLeft:"8%"}}>
            <img src={Logo} alt="Logo" style={{ width: '169px', height: '48px', marginTop:"60px" }} />
            <p style={{fontFamily:"Inter, sans-serif", marginTop:"40px"}}>Copyright 2023 PT Petrakon</p>
            </div>
            <div style={{textAlign:"center",fontFamily:"Inter, sans-serif"}}>
                <p style={{marginTop:"-100px"}}>Contacts</p>
                <p style={{marginTop:"20px", fontWeight:"bold"}}>+62 818 0253 2929</p>
                <p style={{marginTop:"10px", fontWeight:"bold"}}>petrakonindonesia@gmail.com</p>
                <p style={{marginTop:"10px", fontWeight:"bold"}}>@petrakon.id</p>
            </div>
            <div style={{textAlign:"end", fontFamily:"Inter, sans-serif", marginRight:"8%"}}>
                <p style={{marginTop:"-140px"}}>Jl. Green Lake City Boulevard No.7 Blok H</p>
                <p style={{marginTop:"10px"}}>Duri Kosambi, Kecamatan Cengkareng</p>
                <p style={{marginTop:"10px"}}>Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta</p>
                <p style={{marginTop:"10px"}}>11750</p>
            </div>
        </div>
        </>
    );
}

export default OurProjects;
