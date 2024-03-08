import React, { useState, useEffect } from 'react';


function AddJobApplication() {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    noTelepon: '',
    cv: null,
    coverLetter: null,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('https://sihire-be.vercel.app/api/users/logged-in/');
        const userData = await response.json();

        setFormData({
          ...formData,
          nama: userData.name,
          email: userData.email,
          noTelepon: userData.phone,
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, type, files } = e.target;
    const fieldValue = type === 'file' ? files[0] : e.target.value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: fieldValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('nama', formData.nama);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('noTelepon', formData.noTelepon);
      formDataToSend.append('cv', formData.cv);
      formDataToSend.append('coverLetter', formData.coverLetter);

      const response = await fetch('https://sihire-be.vercel.app/api/job-application/post/', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

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
            id="cv"
            name="cv"
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