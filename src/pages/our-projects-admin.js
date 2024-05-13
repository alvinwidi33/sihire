import React from 'react';
import Navbar from '../components/navbar';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react'
import SidebarAdmin from '../components/sidebar-admin';

function OurProjectsAdmin() {
    const [projects, setProjects] = React.useState(null);
    const [profileData, setProfileData] = React.useState(null);

    const handleHighlight = async (id) => {
      try {
          const response = await fetch('https://sihire-be.vercel.app/api/project/highlight-project/' + id + "/", {
              method: 'PATCH',
              headers: {
                  'Authorization': 'Token ' + window.localStorage.getItem("token")
              }
          });
          if (!response.ok) {
              console.error('Failed to update project');
          } else {
            window.location.reload()
          }
      } catch (error) {
          console.error('Error to update project:', error);
      }
    }

    React.useEffect(() => {
      const getProjects = async () => {
        try {
          const response = await fetch(
            "https://sihire-be.vercel.app/api/project/get-all-projects/"
          );
          if (response.ok) {
            const data = await response.json();
            console.log(data)
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
        <SidebarAdmin></SidebarAdmin>
        
        <div className='bg-white-100 p-16 min-h-screen'>
        <p
                    style={{
                        marginLeft: "17%",
                        fontWeight: "bold",
                        fontSize: "32px",
                        color: "#2A3E4B",
                        position: "absolute",
                        marginTop: '-26%'
                    }}
                >
                    Our Project
                </p>
                <div style={{ marginTop: '-14%', marginLeft: 'calc(24% + 2rem)' }}>
            <Link to="/add-project">
          <button
            style={{
              width: "18%",
              padding: "8px",
              fontSize: "16px",
              fontFamily: "Inter, sans-serif",
              fontWeight: "bold",
              color: "#fff",
              background: "#2A3E4B",
              borderRadius: "6px",
              cursor: "pointer",
              marginTop: "-72px",
              marginBottom: "32px",
              marginLeft: "20%",
              position: "absolute",
              border: "2px solid #2A3E4B",
            }}
          >
            Tambah Proyek
          </button>
        </Link>
            <div className='flex flex-wrap gap-8'>
            {
                projects &&
                projects.sort((a, b) => {
                  if (a.is_highlighted && !b.is_highlighted) {
                      return -1;
                  } else if (!a.is_highlighted && b.is_highlighted) {
                      return 1;
                  } else {
                      return 0;
                  }
              }).map((project) => (
                    <div key={project.id} className='bg-white w-64 shadow-lg rounded-xl overflow-hidden'>
                        <div className='relative flex flex-col h-full'>
                        {profileData && profileData.role === 'Admin' && (
                          project.is_highlighted ? (
                            <Star className='absolute w-10 h-10 right-2 top-2 bg-yellow-300 p-1 rounded-full cursor-pointer' onClick={() => handleHighlight(project.id)}/>
                          ) : (
                            <Star className='absolute w-10 h-10 right-2 top-2 bg-white p-1 rounded-full cursor-pointer' onClick={() => handleHighlight(project.id)}/>
                          )
                        )}
                            <img src={"https://lwchpknnmkmpfbkwcrjs.supabase.co/storage/v1/object/public/sihire-project/" + project.foto1.split(",")[0]} alt="project" className='h-36 w-full object-cover'/>
                            <div className='flex flex-col p-4 justify-between gap-4 h-full'>
                                <h2 className='font-bold line-clamp-2'>{project.project_name}</h2>
                                <div className='flex gap-2'>
                                <Link to={`/project-admin/${project.id}`}>
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
        </div>
        </>
    );
}

export default OurProjectsAdmin;