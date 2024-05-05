import React from 'react';
import Navbar from '../components/navbar';
import { useParams } from 'react-router-dom';
import useEmblaCarousel from 'embla-carousel-react'

function OurProjectDetail() {
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
      <>
          <Navbar/>
          {
            !project && (
              <div className='flex items-center justify-center min-h-screen w-full'>Loading...</div>
            )
          }
          {
            project && (
          <div className='bg-gray-100 p-16 min-h-screen'>
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
                          <button className="embla__prev" onClick={scrollPrev}>
                            Prev
                          </button>
                          <button className="embla__next" onClick={scrollNext}>
                            Next
                          </button>
                      </div>
                      <div className='flex gap-2'>
                      </div>
                  </div>
                  <div className='flex flex-col gap-2'>
                      <p className='mx-auto text-xl font-bold text-center mb-8'>{project.project_name ?? "Project"}</p>
                      <p><strong>Tipe project: </strong>{project.project_type}</p>
                      <p><strong>Lokasi: </strong>{project.location}</p>
                      <p><strong>Deskripsi: </strong>{project.description}</p>
                  </div>
              </div>
          </div>)
          }
      </>
  );  
}

export default OurProjectDetail;