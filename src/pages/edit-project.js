import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate, Navigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import SidebarAdmin from "../components/sidebar-admin";

const supabase = createClient(
  "https://lwchpknnmkmpfbkwcrjs.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3Y2hwa25ubWttcGZia3djcmpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM4Njc3MTQsImV4cCI6MjAyOTQ0MzcxNH0.J7OHUVBFnaRF5b_cpX3LEYfD3uFSrzz6_DnCK3pfPHU"
);

function EditProject() {
  const { id } = useParams();
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const [project, setProject] = React.useState(null);
  const [formData, setFormData] = React.useState({
    nama: "",
    tipe: "",
    lokasi: "",
    des: "",
  });

  React.useEffect(() => {
    const getProjects = async () => {
      try {
        const response = await fetch(
          "https://sihire-be.vercel.app/api/project/get-all-projects/"
        );
        if (response.ok) {
          const data = await response.json();
          setProject(data.find((project) => project.id === +id));
        } else {
          console.error("Failed to fetch job data");
        }
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    };
    getProjects();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (event.target.foto.files.length > 10) {
        alert("You can only upload up to ten photos.");
        throw new Error("You can only upload up to ten photos.");
      }
      if (event.target.des.value.length > 255) {
        alert("Description must be less than 255 characters.");
        throw new Error("Description must be less than 255 characters.");
      }
    
      const fd = new FormData();
      const nama = fd.nama;
      const tipe = fd.tipe;
      const lokasi = fd.lokasi;
      const des = fd.des;
      const foto = event.target.foto.files;
    
      fd.append("project_name", nama);
      fd.append("project_type", tipe);
      fd.append("location", lokasi);
      fd.append("description", des);
    
      const uploadPromises = Array.from(foto).map(file => {
        return supabase.storage
          .from("sihire-project")
          .upload("project/" + uuidv4(), file);
      });
    
      const uploadResults = await Promise.all(uploadPromises);
    
      let imgArray = [];

      uploadResults.forEach(({ data, error }, i) => {
        if (data) {
          imgArray.push(data.path);
        } else {
          console.log(error);
          throw error;
        }
      });

      fd.append("foto1", imgArray);
    
      const fdObject = {};
      fd.forEach((value, key) => {
        fdObject[key] = value;
      });
  
      const response = await fetch(
        "https://sihire-be.vercel.app/api/project/update-project/" + id + "/",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(fdObject),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit On Boarding schedule");
      }
      setSuccessMessage("On Boarding berhasil dibuat!");
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/our-projects");
      }, 5000);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <React.Fragment>
      <SidebarAdmin />
      <p
        style={{
          marginLeft: "22%",
          fontWeight: "bold",
          fontSize: "32px",
          color: "#2A3E4B",
          position: "absolute",
          marginTop: "-250px",
        }}
      >
        Our Project
      </p>
      {
        !project && (
          <div className='flex items-center justify-center max-w-lg ml-[38%]'>Loading...</div>
        )
      }
      {
        project && (
          <form
            className='max-w-lg mx-auto bg-white p-6 rounded shadow-md'
            style={{ marginTop: "-140px", marginLeft: "38%" }}
            encType='multipart/form-data'
            onSubmit={handleSubmit}
          >
            <div className='mb-2'>
              <label
                htmlFor='nama'
                className='block text-gray-600 font-semibold mb-2'
              >
                Nama Proyek<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type='text'
                id='nama'
                name='nama'
                className='w-full border rounded-md p-2'
                required
                value={project ? project.project_name : ''}
                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
              />
            </div>
            <div className='mb-2'>
              <label
                htmlFor='tipe'
                className='block text-gray-600 font-semibold mb-2'
              >
                Tipe Proyek<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type='text'
                id='tipe'
                name='tipe'
                className='w-full border rounded-md p-2'
                required
                value={project ? project.project_type : ''}
                onChange={(e) => setFormData({ ...formData, tipe: e.target.value })}
              />
            </div>
            <div className='mb-2'>
              <label
                htmlFor='lokasi'
                className='block text-gray-600 font-semibold mb-2'
              >
                Lokasi<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type='text'
                id='lokasi'
                name='lokasi'
                className='w-full border rounded-md p-2'
                required
                value={project ? project.location : ''}
                onChange={(e) => setFormData({ ...formData, lokasi: e.target.value })}
              />
            </div>
            <div className='mb-2'>
              <label
                htmlFor='des'
                className='block text-gray-600 font-semibold mb-2'
              >
                Deskripsi<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type='text'
                id='des'
                name='des'
                className='w-full border rounded-md p-2'
                required
                value={project ? project.description : ''}
                onChange={(e) => setFormData({ ...formData, des: e.target.value })}
              />
            </div>
            <div className='mb-2'>
              <label
                htmlFor='foto'
                className='block text-gray-600 font-semibold mb-2'
              >
                Foto<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type='file'
                id='foto'
                name='foto'
                className='w-full border rounded-md p-2'
                required
                multiple
              />
            </div>
            <div className='flex justify-center'>
              <button
                type='submit'
                className='bg-gray-800 text-white px-40 py-2 rounded-md'
              >
                Submit
              </button>
            </div>
          </form>
        )
      }
      {successMessage && (
        <p
          style={{
            color: "green",
            position: "fixed",
            top: "50%",
            left: "55%",
            transform: "translate(-50%, -50%)",
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          {successMessage}
        </p>
      )}
    </React.Fragment>
  );
}

export default EditProject;