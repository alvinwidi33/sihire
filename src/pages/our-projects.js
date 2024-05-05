import React from 'react';
import Navbar from '../components/navbar';
import { Link } from 'react-router-dom';


function OurProjects() {
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
        <Navbar/>
        <div className='bg-gray-100 p-16 min-h-screen'>
            <p className='mx-auto text-xl font-bold text-center my-8'>Our Projects</p>
            <div className='flex flex-wrap gap-8'>
            {
                projects &&
                projects.map((project) => (
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
        </>
    );
}

export default OurProjects;