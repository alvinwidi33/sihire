import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

function JobApplicationDetailGA() {
  const stages = [
    { name: 'Applied', value: 0 },
    { name: 'In Review', value: 16 },
    { name: 'Interview', value: 32 },
    { name: 'Accepted', value: 48 },
    { name: 'Declined', value: 64 },
    { name: 'Onboard', value: 80 },
    { name: 'Withdrawn', value: 100 },
  ];

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

  const [selectedStatus, setSelectedStatus] = useState('');

  const calculateProgress = (stageName) => {
    const stage = stages.find((stage) => stage.name === stageName);
    return stage ? stage.value : 0;
  };

  const currentStage = formData.status;
  const progress = calculateProgress(currentStage);

  useEffect(() => {
    const fetchJobApplicationData = async () => {
      try {
        const response = await fetch(
          'https://sihire-be.vercel.app/api/job-application/get-detail/' + id + '/',
          {
            method: 'GET',
          }
        );
        const jobApplicationData = await response.json();

        setFormData({
          ...formData,
          job: jobApplicationData.job,
          applicant: jobApplicationData.applicant,
          cv: jobApplicationData.cv,
          coverLetter: jobApplicationData.coverLetter,
          status: jobApplicationData.status,
        });

        setSelectedStatus(jobApplicationData.status); 
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchJobApplicationData();
  }, []); 

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };


  return (
    <div className="bg-gray-100 min-h-screen flex">
      <div className="container mx-auto mt-8 md:mt-16" style={{ marginTop: '7%' }}>
        <h1 className="text-2xl font-bold text-left mb-4">Job Application</h1>
        <hr className="mb-4 border-solid border-black" />
        <div className="p-4 bg-white rounded-lg shadow-md flex flex-col">
          <h2 className="text-2xl font-bold mb-2">{formData.job.job_name}</h2>
          <strong>Status:</strong>{' '}
          <select
            value={selectedStatus}
            onChange={handleStatusChange}
            className="ml-2"
          >
            {stages.map((stage, index) => (
              <option key={index} value={stage.name}>
                {stage.name}
              </option>
            ))}
          </select>
          <div className="mt-4 relative flex justify-between">
            {stages.map((stage, index) => (
              <div key={index} className="flex items-center">
                <span
                  className={`w-2 h-2 rounded-full ${
                    progress >= stage.value ? 'bg-green-500' : 'bg-gray-400'
                  }`}
                ></span>
                <span
                  className={`text-sm ml-1 ${
                    progress >= stage.value ? 'text-green-500' : 'text-gray-400'
                  }`}
                >
                  {stage.name}
                </span>
              </div>
            ))}
          </div>
          <div className="mb-2">
            <progress className="w-full bg-gray-200" value={progress} max="100"></progress>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <strong>Nama</strong>
              <p>{formData.applicant.user?.name}</p>
              <br />
              <strong>Email</strong> {}
              <p>{formData.applicant.user?.email}</p>
              <br />
              <strong>No Telepon</strong> {}
              <p>{formData.applicant.user?.phone}</p>
            </div>
            <div>
              <strong>CV</strong>
              <p>{formData.cv}</p>
              <br />
              <strong>Cover Letter</strong>
              <p>{formData.coverLetter}</p>
            </div>
          </div>
          <Link to={`/job-application-detail-ga/${id}/update-status`}>
          <button
            className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded mr-2" style={{width:"720px"}}
          >
            Update Status
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default JobApplicationDetailGA;
