import React, { useState } from 'react';

function AddJobApplication() {
    // State for form fields
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    noTelepon: '',
    cv: null,
    coverLetter: null,
  });

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    
    // For file input, use files property
    const fieldValue = type === 'file' ? files[0] : value;

    setFormData({
      ...formData,
      [name]: fieldValue,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add logic to handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
    <div className="container mx-auto mt-8" style={{marginTop:"3%"}}>
    <h1 className="text-2xl font-bold text-left mb-4">Job Application</h1>
    <hr className="mb-4 border-solid border-black" /> {/* Horizontal line */}
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded shadow-md">
      <h1 className="text-2xl font-bold text-center mb-4">Job Title 1</h1>
        <div className="mb-2">
          <label htmlFor="nama" className="block text-gray-600 font-semibold mb-2">Nama</label>
          <input
            type="text"
            id="nama"
            name="nama"
            value={formData.nama}
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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