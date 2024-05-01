import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, Navigate } from 'react-router-dom';
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import SidebarAdmin from '../components/sidebar-admin';

const supabase = createClient(
  "https://lwchpknnmkmpfbkwcrjs.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3Y2hwa25ubWttcGZia3djcmpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM4Njc3MTQsImV4cCI6MjAyOTQ0MzcxNH0.J7OHUVBFnaRF5b_cpX3LEYfD3uFSrzz6_DnCK3pfPHU"
);

function EditProject() {
const [successMessage, setSuccessMessage] = useState('');
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
          marginTop: "-250px"
        }}
      >
        Our Project
      </p>
      <form className="max-w-lg mx-auto bg-white p-6 rounded shadow-md" style={{marginTop: '-140px', marginLeft:'38%'}} encType="multipart/form-data">
        <div className="mb-2">
          <label htmlFor="nama" className="block text-gray-600 font-semibold mb-2">Nama Proyek<span style={{ color: "red" }}>*</span></label>
          <input
            type="text"
            id="nama"
            name="nama"
            disabled
            className="w-full border rounded-md p-2"
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="tipe" className="block text-gray-600 font-semibold mb-2">Tipe Proyek<span style={{ color: "red" }}>*</span></label>
          <input
            type="text"
            id="tipe"
            name="tipe"
            
            disabled
            className="w-full border rounded-md p-2"
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="lokasi" className="block text-gray-600 font-semibold mb-2">Lokasi<span style={{ color: "red" }}>*</span></label>
          <input
            type="text"
            id="lokasi"
            name="lokasi"
            
            disabled
            className="w-full border rounded-md p-2"
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="des" className="block text-gray-600 font-semibold mb-2">Deskripsi<span style={{ color: "red" }}>*</span></label>
          <input
            type="text"
            id="des"
            name="des"
            
            disabled
            className="w-full border rounded-md p-2"
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="foto" className="block text-gray-600 font-semibold mb-2">Foto<span style={{ color: "red" }}>*</span></label>
          <input
            type="file"
            id="foto"
            name="foto"
            className="w-full border rounded-md p-2"
            required
          />
        </div>
        <div className="flex justify-center">
              <button type="submit" className="bg-gray-800 text-white px-40 py-2 rounded-md">Submit</button>
            </div>
      </form>
      {successMessage && (
        <p
          style={{
            color: 'green',
            position: 'fixed',
            top: '50%',
            left: '55%',
            transform: 'translate(-50%, -50%)',
            background: 'white',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
          }}
        >
          {successMessage}</p>
      )}
      
    </React.Fragment>
  );
}

export default EditProject;