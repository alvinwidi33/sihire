import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateStatusPage() {
  const [selectedStatus, setSelectedStatus] = useState('');
  const history = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    applicant: '',
    job: '',
    jobName: '',
    nama: '',
    email: '',
    noTelepon: '',
    cv: null,
    coverLetter: null,
    status: '',
  });

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
    // Update the form data as well if needed
    setFormData({
      ...formData,
      status: e.target.value,
    });
  };

  useEffect(() => {
    const fetchJobApplicationData = async () => {
      try {
        const response = await fetch('https://sihire-be.vercel.app/api/job-application/get-detail/' + id + '/', {
          method: 'GET',
        });
        const jobApplicationData = await response.json();

        setFormData({
          ...formData,
          job: jobApplicationData.job,
          applicant: jobApplicationData.applicant,
          cv: jobApplicationData.cv,
          coverLetter: jobApplicationData.coverLetter,
          status: jobApplicationData.status,
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchJobApplicationData();

    console.log(formData);
  }, []); 

  const handleSubmit = async (e) => {
    // Use the selectedStatus from the state instead of formData.status
    const fd = new FormData();
    fd.append("job", formData.job.id);
    fd.append("applicant", formData.applicant.applicant_id);
    fd.append("status", selectedStatus); // Use selectedStatus instead

    try {
      const response = await fetch('https://sihire-be.vercel.app/api/job-application/put/' + id + '/edit-status/', {
        method: 'PUT',
        headers: {
          
        },
        body: fd
      });

      const result = await response.json();
      console.log('Form submitted successfully:', result);

      // Redirect or perform any other action after successful submission
      // For example, redirect to the job application detail page
      history(`/job-application-detail-ga/${id}`);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">Update Status</h2>
        <div className="mb-4">
          <label htmlFor="status" className="block font-bold">Select Status:</label>
          <select id="status" value={selectedStatus} onChange={handleStatusChange} className="block w-full mt-1 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
            <option value="">Select...</option>
            <option value="Applied">Applied</option>
            <option value="In Review">In Review</option>
            <option value="Interview">Interview</option>
            <option value="Accepted">Accepted</option>
            <option value="Declined">Declined</option>
            <option value="Onboard">Onboard</option>
          </select>
        </div>
        <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Update</button>
      </div>
    </div>
  );
}

export default UpdateStatusPage;