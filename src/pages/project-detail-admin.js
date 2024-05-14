import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import { useParams } from 'react-router-dom';
import useEmblaCarousel from 'embla-carousel-react';
import SidebarAdmin from '../components/sidebar-admin';

function OurProjectDetailAdmin() {
    const { id } = useParams();
    const [project, setProject] = React.useState(null);
    const [highlightedImage, setHighlightedImage] = React.useState(null);
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [emblaRef, emblaApi] = useEmblaCarousel()


    const scrollPrev = React.useCallback(() => {
      if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])
  
    const scrollNext = React.useCallback(() => {
      if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    React.useEffect(() => {
      const getProjects = async () => {
        try {
          const response = await fetch(
            "https://sihire-be.vercel.app/api/project/get-all-projects/"
          );
          if (response.ok) {
            const data = await response.json();
            setProject(data.find((project) => project.id === +id));
            setHighlightedImage(data.find((project) => project.id === +id).foto1);
          } else {
            console.error("Failed to fetch job data");
          }
        } catch (error) {
          console.error("Error fetching job data:", error);
        }
      };
      getProjects();
    }, []);

    return (
        <React.Fragment>
          
                <><SidebarAdmin />
                <div style={{ marginTop: '-21%' }}></div>
                <p
                    style={{
                        marginLeft: "22%",
                        fontWeight: "bold",
                        fontSize: "32px",
                        color: "#2A3E4B",
                        position: "absolute",
                    }}
                >
                    Our Project
                </p></>
          

          {
            !project && (
              <div className='flex items-center justify-center min-h-screen w-full'>Loading...</div>
            )
          }
          {
            project && (
          <div className='bg-white-100 p-16 min-h-screen flex justify-center items-center'>
            <div className='flex flex-col justify-center items-center rounded-lg shadow-lg w-3/4 h-full p-8 ml-auto'>
              <div className='flex gap-8 mt-16'>
                  <div className='flex flex-col gap-2'>
                      <div className="overflow-hidden" ref={emblaRef}>
                          <div className="flex w-96">
                              {project.foto1.split(",").map((img) => {
                                  return (
                                      <img
                                          src={"https://lwchpknnmkmpfbkwcrjs.supabase.co/storage/v1/object/public/sihire-project/" + img}
                                          alt="Project Image"
                                          className='h-full object-cover cursor-pointer embla__slide'
                                          onClick={() => setHighlightedImage(img)}
                                      />
                                  );
                              })}
                          </div>
                          <div className="flex justify-center mt-4"> 
                          <button className="embla__prev" onClick={scrollPrev} style={{ backgroundColor: 'black', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '25px', cursor: 'pointer', marginRight: '10px' }}>
                            Prev
                            </button>
                            <button className="embla__next" onClick={scrollNext} style={{ backgroundColor: 'black', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '25px', cursor: 'pointer' }}>
                            Next
                          </button>
                          </div>
                      </div>
                      <div className='flex gap-2'>
                      </div>
                  </div>
                  <div className='flex flex-col gap-2 h-full justify-center items-center'>
                    <p className='text-xl font-bold text-center mb-8'>{project.project_name ?? "Project"}</p>
                    <p><strong>Tipe project: </strong>{project.project_type}</p>
                    <p><strong>Lokasi: </strong>{project.location}</p>
                    <p><strong>Deskripsi: </strong>{project.description}</p>
                  </div>
              </div>
              </div>
          </div>)
          }
      </React.Fragment>
  );  
}

export default OurProjectDetailAdmin;