import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, Navigate } from 'react-router-dom';
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";

const supabase = createClient(
  "https://ldhohewyhcdwckzcjtzn.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkaG9oZXd5aGNkd2NremNqdHpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAxNjY0MzksImV4cCI6MjAyNTc0MjQzOX0.73gDtZ0yUZmpXvIrga-Mw7amJNaPJu6av7wyr0OSCuo"
);

function AddJobApplication() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [applicantData, setApplicantData] = useState(null);
  const [formData, setFormData] = useState({
    applicant: '',
    user: '',
    job: id,
    nama: '',
    email: '',
    noTelepon: '',
    cv: '',
    coverLetter: '',
  });
  console.log("job",id)

  const fd = new FormData();

  console.log(formData);
  console.log(fd);

   useEffect(() => {
    const getJob = async () => {
      try {
        const response = await fetch(`https://sihire-be.vercel.app/api/job-posting/get/${id}/`);
        const data = await response.json();
        setJob(data);
      } catch (error) {
        console.error('Error fetching job:', error);
      }
    };
    const fetchUserData = async () => {
      try {
        const response = await fetch('https://sihire-be.vercel.app/api/users/logged-in/', {
          method: 'GET',
          headers: {
              'Authorization': 'Token ' + window.localStorage.getItem("token")
          },
        });
        const userData = await response.json();
        const applicant_id = await fetchApplicantData(userData.user_id);
        setFormData({
          ...formData,
          user: userData.user_id,
          nama: userData.name,
          email: userData.email,
          noTelepon: userData.phone,
          applicant:applicant_id,
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    const fetchApplicantData = async (userId) => {
      try {
        const applicant_response = await fetch(`https://sihire-be.vercel.app/api/users/get-applicant/${userId}/`, {
          method: 'GET',
        });
        console.log('ayam',applicant_response)
        const applicantData = await applicant_response.json();
        setApplicantData(applicantData);
        console.log('kambing',applicantData)
        return applicantData.applicant_id
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    getJob();
    fetchUserData();
    fetchApplicantData();

  }, []); 

  const [FileCV, setFileCV] = useState(undefined);
  const [FileCoverLetter, setFileCoverLetter] = useState(undefined);

  function handleFileCVChange(event) {
    setFileCV(event.target.files[0]);
  }

  function handleFileCoverLetterChange(event) {
    setFileCoverLetter(event.target.files[0]);
  }

  const handleSubmit = async (e) => {
  e.preventDefault();

  const isConfirmed = window.confirm('Apakah Anda yakin ingin melamar pekerjaan ini?');

  if (isConfirmed) {
    try {
      fd.append("job", id);
      await new Promise(resolve => setTimeout(resolve, 0));
      fd.append("applicant", formData.applicant);
      fd.append("coverLetter", formData.coverLetter);

      if (FileCV) {
        const { data, error } = await supabase.storage
          .from("sihire")
          .upload("cv/" + uuidv4(), FileCV);
        if (data) {
          fd.append("cv", data.path);
        } else {
          console.log(error);
          throw error;
        }
      }

      if (FileCoverLetter) {
        const { data, error } = await supabase.storage
          .from("sihire")
          .upload("coverletter/" + uuidv4(), FileCoverLetter);
        if (data) {
          fd.append("coverLetter", data.path);
        } else {
          console.log(error);
          throw error;
        }
      }

      const response = await fetch('https://sihire-be.vercel.app/api/job-application/post/', {
        method: 'POST',
        headers: {
        },
        body: fd,
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Form submitted successfully:", result);
        setSuccessMessage("Job berhasil dilamar!");
        setTimeout(() => {
          setSuccessMessage("");
          navigate(`/my-job-application/${applicantData.applicant_id}`);
        }, 5000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }
};

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
    <div className="container mx-auto mt-8" style={{ marginTop: "3%" }}>
      <h1 className="text-2xl font-bold text-left mb-4">Job Application</h1>

      <div style={{ marginLeft: '-1%', position: 'absolute', marginBottom: '40px' }}>
        <Link to='/job-list-applicant'>
          <p style={{ display: 'inline', marginLeft: '4px' }}>List Job</p>
        </Link>
        <span style={{ display: 'inline', marginLeft: '10px' }}>{'>'}</span>
        {job && (
          <React.Fragment key={job.id}>
            <Link to={`/job-list-applicant/${job.id}`}>
              <p style={{ display: 'inline', marginLeft: '10px' }}>Job Details</p>
            </Link>
            <span style={{ display: 'inline', marginLeft: '10px' }}>{'>'}</span>
            <Link to={`/add-job-application/${job.id}`}>
              <p style={{ display: 'inline', marginLeft: '10px' }}>Add Job Application</p>
            </Link>
          </React.Fragment>
        )}
      </div>
    <hr className="mb-4 border-solid border-black" /> 
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded shadow-md" style={{marginTop:'40px'}} encType="multipart/form-data">
      {job && (
        <React.Fragment key={job.id}>
          <h1 className="text-2xl font-bold text-center mb-4">{job.job_name}</h1>
        </React.Fragment>
      )}
        <div className="mb-2">
          <label htmlFor="nama" className="block text-gray-600 font-semibold mb-2">Nama</label>
          <input
            type="text"
            id="nama"
            name="nama"
            value={formData.nama}
            disabled
            className="w-full border rounded-md p-2"
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="email" className="block text-gray-600 font-semibold mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            disabled
            className="w-full border rounded-md p-2"
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="noTelepon" className="block text-gray-600 font-semibold mb-2">No Telepon</label>
          <input
            type="tel"
            id="noTelepon"
            name="noTelepon"
            value={formData.noTelepon}
            disabled
            className="w-full border rounded-md p-2"
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="cv" className="block text-gray-600 font-semibold mb-2">CV</label>
          <input
            type="file"
            id="cv"
            name="cv"
            onChange={handleFileCVChange}
            className="w-full border rounded-md p-2"
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="coverLetter" className="block text-gray-600 font-semibold mb-2">Cover Letter</label>
          <input
            type="file"
            id="coverLetter"
            name="coverLetter"
            onChange={handleFileCoverLetterChange}
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
    </div>
    </div>
  );
}

export default AddJobApplication;