import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function UpdateStatusPage() {
  const [selectedStatus, setSelectedStatus] = useState('');
  const history = useHistory();

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('https://sihire-be.vercel.app/api/job-application/get-detail/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: selectedStatus }),
      });

      if (response.ok) {
        history.push('/job-application-detail'); 
      } else {
        console.error('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
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
