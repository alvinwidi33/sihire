import React, { useState, useEffect } from 'react';

function AddJobApplication() {
  const [formData, setFormData] = useState({
    applicant: '',
    user: '',
    job: 1,
    nama: '',
    email: '',
    noTelepon: '',
    cv: null,
    coverLetter: null,
  });

  const fd = new FormData();

  console.log(formData);
  console.log(fd);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/users/logged-in/', {
          method: 'GET',
          headers: {
              'Authorization': 'Token ' + window.localStorage.getItem("token")
          },
        });
        const userData = await response.json();

        setFormData({
          ...formData,
          user: userData.user_id,
          nama: userData.name,
          email: userData.email,
          noTelepon: userData.phone,
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    const fetchApplicantData = async () => {
      try {
        const applicant_response = await fetch('http://127.0.0.1:8000/api/users/get-applicant/' + formData.user + '/', {
          method: 'GET',
        });

        const applicantData = await applicant_response.json();

        setFormData({
          ...formData,
          applicant: applicantData.applicant_id,
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
    fetchApplicantData();
  }, []); 

  const [file, setFile] = useState()

  function handleChange(event) {
    setFile(event.target.files[0])
  }

  const handleInputChange = (e) => {

    const { name, value, type, files } = e.target;

    const fieldValue = type === 'file' ? files[0] : value;

    fd.append([name],fieldValue);

    setFormData((prevData) => ({
      ...prevData,
      [name]: fieldValue,
    }));
  };

  const handleSubmit = async (e) => {
    fd.append("job", 1);
    fd.append("applicant", formData.applicant);
    fd.append("phone", formData.phone);
    fd.append("cv", formData.cv);
    fd.append("coverLetter", formData.coverLetter);
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/api/job-application/post/', {
        method: 'POST',
        headers: {
        },
        body: fd
      });

      const result = await response.json();
      console.log('Form submitted successfully:', result);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
    <div className="container mx-auto mt-8" style={{marginTop:"3%"}}>
    <h1 className="text-2xl font-bold text-left mb-4">Job Application</h1>
    <hr className="mb-4 border-solid border-black" /> {/* Horizontal line */}
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded shadow-md" encType="multipart/form-data">
      <h1 className="text-2xl font-bold text-center mb-4">Job Title 1</h1>
        <div className="mb-2">
          <label htmlFor="nama" className="block text-gray-600 font-semibold mb-2">Nama</label>
          <input
            type="text"
            id="nama"
            name="nama"
            value={formData.nama}
            readOnly
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
            readOnly
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
            readOnly
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
            onChange={handleInputChange}
            className="w-full border rounded-md p-2"
            accept=".pdf, .doc, .docx"
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="coverLetter" className="block text-gray-600 font-semibold mb-2">Cover Letter</label>
          <input
            type="file"
            id="coverLetter"
            name="coverLetter"
            onChange={handleInputChange}
            className="w-full border rounded-md p-2"
            accept=".pdf, .doc, .docx"
            required
          />
        </div>
        <div className="flex justify-center">
              <button type="submit" className="bg-gray-800 text-white px-40 py-2 rounded-md">Submit</button>
            </div>
      </form>
    </div>
    </div>
  );
}

export default AddJobApplication;