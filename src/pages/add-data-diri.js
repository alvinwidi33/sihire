import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, Navigate } from 'react-router-dom';
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import SidebarApplicant from '../components/sidebar-applicant';

const supabase = createClient(
  "https://lwchpknnmkmpfbkwcrjs.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3Y2hwa25ubWttcGZia3djcmpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM4Njc3MTQsImV4cCI6MjAyOTQ0MzcxNH0.J7OHUVBFnaRF5b_cpX3LEYfD3uFSrzz6_DnCK3pfPHU"
);

function AddDataDiri() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    ktp: '',
    bank: '',
    bpjs: '',
    npwp: '',
    foto_diri: ''
  });

  const [dataDiri, setDataDiri] = useState(null);

  useEffect(() => {
    const getDatDiri = async () => {
      try {
        const response = await fetch(`https://sihire-be.vercel.app/api/onboarding/get-onboarding/${id}/`);
        const data = await response.json();
        setDataDiri(data);

      } catch (error) {
        console.error('Error fetching job:', error);
      }
    };
    getDatDiri();
  }, [id]);

  const fd = new FormData();
  const [FileKtp, setFileKtp] = useState(undefined);
  const [FileBank, setFileBank] = useState(undefined);
  const [FileBpjs, setFileBpjs] = useState(undefined);
  const [FileNpwp, setFileNpwp] = useState(undefined);
  const [FileFotoDiri, setFileFotoDiri] = useState(undefined);

  function handleFileKtpChange(event) {
    setFileKtp(event.target.files[0]);
  }

  function handleFileBankChange(event) {
    setFileBank(event.target.files[0]);
  }

  function handleFileBpjsChange(event) {
    setFileBpjs(event.target.files[0]);
  }

  function handleFileNpwpChange(event) {
    setFileNpwp(event.target.files[0]);
  }

  function handleFileFotoDiriChange(event) {
    setFileFotoDiri(event.target.files[0]);
  }

  const handleSubmit = async (e) => {
  e.preventDefault();

  const isConfirmed = window.confirm('Apakah Anda yakin ingin mengumpulkan ini?');

  if (isConfirmed) {
    try {
      await new Promise(resolve => setTimeout(resolve, 0));

      if (FileKtp) {
        const { data, error } = await supabase.storage
          .from("sihire")
          .upload("ktp/" + uuidv4(), FileKtp);
        if (data) {
          fd.append("ktp", data.path);
        } else {
          console.log(error);
          throw error;
        }
      }

      if (FileBank) {
        const { data, error } = await supabase.storage
          .from("sihire")
          .upload("bank/" + uuidv4(), FileBank);
        if (data) {
          fd.append("bank", data.path);
        } else {
          console.log(error);
          throw error;
        }
      }

      if (FileBpjs) {
        const { data, error } = await supabase.storage
          .from("sihire")
          .upload("bpjs/" + uuidv4(), FileBpjs);
        if (data) {
          fd.append("bpjs", data.path);
        } else {
          console.log(error);
          throw error;
        }
      }

      if (FileNpwp) {
        const { data, error } = await supabase.storage
          .from("sihire")
          .upload("npwp/" + uuidv4(), FileNpwp);
        if (data) {
          fd.append("npwp", data.path);
        } else {
          console.log(error);
          throw error;
        }
      }

      if (FileFotoDiri) {
        const { data, error } = await supabase.storage
          .from("sihire")
          .upload("fotodiri/" + uuidv4(), FileFotoDiri);
        if (data) {
          fd.append("foto_diri", data.path);
        } else {
          console.log(error);
          throw error;
        }
      }

      const response = await fetch(`https://sihire-be.vercel.app/api/onboarding/edit-onboarding-applicant/${id}/`, {
        method: 'PATCH',
        headers: {
        },
        body: fd,
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Form submitted successfully:", result);
        setSuccessMessage("Data Diri berhasil dikumpulkan!");
        setTimeout(() => {
          setSuccessMessage("");
          navigate(`/my-job-application/`);
        }, 5000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }
};

  return (
    <React.Fragment>
    <SidebarApplicant />
    {/* <div className="bg-gray-100 min-h-screen flex justify-center items-center">
    <div className="container mx-auto mt-8" style={{ marginTop: "3%" }}> */}
      <p
        style={{
          marginLeft: "22%",
          fontWeight: "bold",
          fontSize: "32px",
          color: "#2A3E4B",
          position: "absolute",
          marginTop: "-288px"
        }}
      >
        On Boarding
      </p>

    {/* <hr className="mb-4 border-solid border-black" />  */}
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded shadow-md" style={{marginTop:'-160px'}} encType="multipart/form-data">
      
        <h1 className="text-2xl font-bold text-center mb-4">Data Personal</h1>
        <div className="mb-2">
          <label htmlFor="ktp" className="block text-gray-600 font-semibold mb-2">KTP<span style={{ color: "red" }}>*</span></label>
          <input
            type="file"
            id="ktp"
            name="ktp"
            onChange={handleFileKtpChange}
            className="w-full border rounded-md p-2"
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="bank" className="block text-gray-600 font-semibold mb-2">Rekening Bank<span style={{ color: "red" }}>*</span></label>
          <input
            type="file"
            id="bank"
            name="bank"
            onChange={handleFileBankChange}
            className="w-full border rounded-md p-2"
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="bpjs" className="block text-gray-600 font-semibold mb-2">BPJS<span style={{ color: "red" }}>*</span></label>
          <input
            type="file"
            id="bpjs"
            name="bpjs"
            onChange={handleFileBpjsChange}
            className="w-full border rounded-md p-2"
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="npwp" className="block text-gray-600 font-semibold mb-2">NPWP<span style={{ color: "red" }}>*</span></label>
          <input
            type="file"
            id="npwp"
            name="npwp"
            onChange={handleFileNpwpChange}
            className="w-full border rounded-md p-2"
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="fotodiri" className="block text-gray-600 font-semibold mb-2">Foto Diri<span style={{ color: "red" }}>*</span></label>
          <input
            type="file"
            id="fotodiri"
            name="fotodiri"
            onChange={handleFileFotoDiriChange}
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
    {/* </div>
    </div> */}
    </React.Fragment>
  );
}

export default AddDataDiri;