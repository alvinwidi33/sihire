import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, Navigate } from 'react-router-dom';
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

  const [file, setFile] = useState()

  function handleChange(event) {
    setFile(event.target.files[0])
  }

 const handleInputChange = (e) => {
  const { name, value } = e.target;

  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};

  const handleSubmit = async (e) => {
  e.preventDefault();

  const isConfirmed = window.confirm('Apakah Anda yakin ingin melamar pekerjaan ini?');

  if (isConfirmed) {
    try {
      fd.append("job", id);
      await new Promise(resolve => setTimeout(resolve, 0));
      fd.append("applicant", formData.applicant);
      fd.append("phone", formData.noTelepon);
      fd.append("cv", formData.cv);
      fd.append("coverLetter", formData.coverLetter);

      const response = await fetch('https://sihire-be.vercel.app/api/job-application/post/', {
        method: 'POST',
        headers: {
        },
        body: fd,
      });
      setSuccessMessage("Job berhasil dilamar!")
      setTimeout(() => {
          setSuccessMessage('');
          navigate(`/my-job-application/${applicantData.applicant_id}`)
        }, 5000);

      const result = await response.json();
      console.log('Form submitted successfully:', result);
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
    type="text"
    id="cv"
    name="cv"
    value={formData.cv}
    onChange={handleInputChange}
    className="w-full border rounded-md p-2"
    required
  />
</div>
<div className="mb-2">
  <label htmlFor="coverLetter" className="block text-gray-600 font-semibold mb-2">Cover Letter</label>
  <input
    type="text"
    id="coverLetter"
    name="coverLetter"
    value={formData.coverLetter}
    onChange={handleInputChange}
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
