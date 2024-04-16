// import React, { useState, useEffect } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import { createClient } from "@supabase/supabase-js";
// import { FileText } from 'lucide-react';

// const supabase = createClient(
//   "https://ldhohewyhcdwckzcjtzn.supabase.co",
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkaG9oZXd5aGNkd2NremNqdHpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAxNjY0MzksImV4cCI6MjAyNTc0MjQzOX0.73gDtZ0yUZmpXvIrga-Mw7amJNaPJu6av7wyr0OSCuo"
// );

// function JobApplicationDetailGA() {
//   const stages = [
//     { name: 'Applied', value: 0 },
//     { name: 'In Review', value: 16 },
//     { name: 'Interview', value: 32 },
//     { name: 'Accepted', value: 48 },
//     { name: 'Declined', value: 64 },
//     { name: 'On Boarding', value: 80 },
//     { name: 'Withdrawn', value: 100 },
//   ];

//   const { id } = useParams();
//   const [formData, setFormData] = useState({
//     applicant: '',
//     job: '',
//     jobName: '',
//     nama: '',
//     email: '',
//     noTelepon: '',
//     cv: '',
//     coverLetter: '',
//     status: '',
//   });

//   const [selectedStatus, setSelectedStatus] = useState('');

//   const calculateProgress = (stageName) => {
//     const stage = stages.find((stage) => stage.name === stageName);
//     return stage ? stage.value : 0;
//   };

//   const currentStage = formData.status;
//   const progress = calculateProgress(currentStage);

//   useEffect(() => {
//     const fetchJobApplicationData = async () => {
//       try {
//         const response = await fetch(
//           'https://sihire-be.vercel.app/api/job-application/get-detail/' + id + '/',
//           {
//             method: 'GET',
//           }
//         );
//         const jobApplicationData = await response.json();
//         const { data, error } = await supabase.storage
//           .from("sihire")
//           .createSignedUrls(
//             [jobApplicationData.cv, jobApplicationData.cover_letter],
//             60
//           );

//         setFormData({
//           ...formData,
//           job: jobApplicationData.job,
//           applicant: jobApplicationData.applicant,
//           cv: data[0].signedUrl,
//           coverLetter: data[1].signedUrl,
//           status: jobApplicationData.status,
//         });

//         setSelectedStatus(jobApplicationData.status); 
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     fetchJobApplicationData();
//   }, []); 

//   const handleStatusChange = (e) => {
//     setSelectedStatus(e.target.value);
//   };


//   return (
//     <div className="bg-gray-100 min-h-screen flex">
//       <div className="container mx-auto mt-8 md:mt-16" style={{ marginTop: '7%' }}>
//         <h1 className="text-2xl font-bold text-left mb-4">Job Application</h1>
//         <hr className="mb-4 border-solid border-black" />
//         <div className="p-4 bg-white rounded-lg shadow-md flex flex-col">
//           <h2 className="text-2xl font-bold mb-2">{formData.job.job_name}</h2>
//           <strong>Status:</strong>{' '}
//           <select
//             value={selectedStatus}
//             onChange={handleStatusChange}
//             className="ml-2"
//           >
//             {stages.map((stage, index) => (
//               <option key={index} value={stage.name}>
//                 {stage.name}
//               </option>
//             ))}
//           </select>
//           <div className="mt-4 relative flex justify-between">
//             {stages.map((stage, index) => (
//               <div key={index} className="flex items-center">
//                 <span
//                   className={`w-2 h-2 rounded-full ${
//                     progress >= stage.value ? 'bg-green-500' : 'bg-gray-400'
//                   }`}
//                 ></span>
//                 <span
//                   className={`text-sm ml-1 ${
//                     progress >= stage.value ? 'text-green-500' : 'text-gray-400'
//                   }`}
//                 >
//                   {stage.name}
//                 </span>
//               </div>
//             ))}
//           </div>
//           <div className="mb-2">
//             <progress className="w-full bg-gray-200" value={progress} max="100"></progress>
//           </div>

//           <div className="mt-4 grid grid-cols-2 gap-4">
//             <div>
//               <strong>Nama</strong>
//               <p>{formData.applicant.user?.name}</p>
//               <br />
//               <strong>Email</strong> {}
//               <p>{formData.applicant.user?.email}</p>
//               <br />
//               <strong>No Telepon</strong> {}
//               <p>{formData.applicant.user?.phone}</p>
//             </div>
//             <div>
//             <strong>CV</strong>
//               {
//                 formData.cv ? 
//                 <a
//                   href={formData.cv}
//                   target='__blank'
//                   rel='noopener noreferrer'
//                   className='mt-2'
//                 >
//                   <FileText color='#bc3434' />
//                 </a> : 
//                 <a
//                   href={formData.cv}
//                   target='__blank'
//                   rel='noopener noreferrer'
//                   className='mt-2 cursor-not-allowed'
//                 >
//                   <FileText color="#707070" />
//                 </a>
//               }
//               <br />
//               <strong>Cover Letter</strong>
//               {
//                 formData.coverLetter ? 
//                 <a
//                   href={formData.coverLetter}
//                   target='__blank'
//                   rel='noopener noreferrer'
//                   className='mt-2'
//                 >
//                   <FileText color='#bc3434' />
//                 </a> : 
//                 <a
//                   href={formData.coverLetter}
//                   target='__blank'
//                   rel='noopener noreferrer'
//                   className='mt-2 cursor-not-allowed'
//                 >
//                   <FileText color="#707070" />
//                 </a>
//               }
//             </div>
//           </div>
//           <Link to={`/job-application-detail-ga/${id}/update-status`}>
//           <button
//             className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded mr-2" style={{width:"720px"}}
//           >
//             Update Status
//           </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default JobApplicationDetailGA;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { createClient } from "@supabase/supabase-js";
import { FileText } from 'lucide-react';

const supabase = createClient(
  "https://ldhohewyhcdwckzcjtzn.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkaG9oZXd5aGNkd2NremNqdHpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAxNjY0MzksImV4cCI6MjAyNTc0MjQzOX0.73gDtZ0yUZmpXvIrga-Mw7amJNaPJu6av7wyr0OSCuo"
);

function JobApplicationDetailGA() {
  const stages = [
    { name: 'Applied', value: 0 },
    { name: 'In Review', value: 16 },
    { name: 'Interview', value: 32 },
    { name: 'Accepted', value: 48 },
    { name: 'Declined', value: 64 },
    { name: 'On Boarding', value: 100 },
  ];

  const { id } = useParams();
  const history = useNavigate();
  const [formData, setFormData] = useState({
    applicant: '',
    job: '',
    jobName: '',
    nama: '',
    email: '',
    noTelepon: '',
    cv: '',
    coverLetter: '',
    status: '',
  });

  const [selectedStatus, setSelectedStatus] = useState('');
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

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
        const { data, error } = await supabase.storage
          .from("sihire")
          .createSignedUrls(
            [jobApplicationData.cv, jobApplicationData.cover_letter],
            60
          );

        setFormData({
          ...formData,
          job: jobApplicationData.job,
          applicant: jobApplicationData.applicant,
          cv: data[0].signedUrl,
          coverLetter: data[1].signedUrl,
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

  const handleSubmit = async () => {
    // Use the selectedStatus from the state instead of formData.status
    const fd = new FormData();
    fd.append("job", formData.job.id);
    fd.append("applicant", formData.applicant.applicant_id);
    fd.append("status", selectedStatus); 
  
    try {
      const response = await fetch('https://sihire-be.vercel.app/api/job-application/put/' + id + '/edit-status/', {
        method: 'PUT',
        headers: {},
        body: fd
      });
  
      if (response.ok) {
        // Status updated successfully
        console.log('Form submitted successfully');
        setShowModal(false); // Close the popup
        // Reload the page
        window.location.reload();
      } else {
        // Handle error response
        console.error('Failed to update status');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex">
      <div className="container mx-auto mt-8 md:mt-16" style={{ marginTop: '7%' }}>
        <h1 className="text-2xl font-bold text-left mb-4">Job Application</h1>
        <hr className="mb-4 border-solid border-black" />
        <div className="p-4 bg-white rounded-lg shadow-md flex flex-col">
          <h2 className="text-2xl font-bold mb-2">{formData.job.job_name}</h2>
          <strong>Status:</strong>
          <div className="mt-4 relative flex justify-between">
            {stages.map((stage, index) => (
              <div key={index} className="flex items-center">
                <span
                className={`w-2 h-2 rounded-full ${
                  formData.status === 'Withdrawn' ? 'bg-red-500' : progress >= stage.value ? 'bg-green-500' : 'bg-gray-400'
                }`}
              ></span>
              <span
                className={`text-sm ml-1 ${
                  formData.status === 'Withdrawn' ? 'text-red-500' : progress >= stage.value ? 'text-green-500' : 'text-gray-400'
                }`}
              >
                {stage.name}
              </span>
            </div>
          ))}
        </div>
        <div className="mb-2">
  <progress
    className="w-full bg-gray-200"
    value={formData.status === 'Withdrawn' ? 100 : progress}
    max="100"
  ></progress>
  <style jsx global>{`
    progress::-webkit-progress-bar {
      background-color: #f5f5f5;
    }
    progress::-webkit-progress-value {
      background-color: ${formData.status === 'Withdrawn' ? 'red' : 'green'};
    }
  `}</style>
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
              {formData.cv ? (
                <a
                  href={formData.cv}
                  target="__blank"
                  rel="noopener noreferrer"
                  className="mt-2"
                >
                  <FileText color="#bc3434" />
                </a>
              ) : (
                <a
                  href={formData.cv}
                  target="__blank"
                  rel="noopener noreferrer"
                  className="mt-2 cursor-not-allowed"
                >
                  <FileText color="#707070" />
                </a>
              )}
              <br />
              <strong>Cover Letter</strong>
              {formData.coverLetter ? (
                <a
                  href={formData.coverLetter}
                  target="__blank"
                  rel="noopener noreferrer"
                  className="mt-2"
                >
                  <FileText color="#bc3434" />
                </a>
              ) : (
                <a
                  href={formData.coverLetter}
                  target="__blank"
                  rel="noopener noreferrer"
                  className="mt-2 cursor-not-allowed"
                >
                  <FileText color="#707070" />
                </a>
              )}
            </div>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded mr-2"
            style={{ width: "720px" }}
          >
            Update Status
          </button>
          {showModal && (
            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity">
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                  <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
                  &#8203;
                  <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="flex justify-between items-center mb-4">
    <h2 className="text-xl font-bold">Update Status</h2>
    <button
      onClick={() => setShowModal(false)}
      className="text-gray-600 hover:text-gray-800 focus:outline-none"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
                      <div className="mb-4">
                        <label htmlFor="status" className="block font-bold">Select Status:</label>
                        <select
                          id="status"
                          value={selectedStatus}
                          onChange={handleStatusChange}
                          className="block w-full mt-1 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        >
                          <option value="">Select...</option>
                          {stages.map((stage, index) => (
                            <option key={index} value={stage.name}>
                              {stage.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <button
                        onClick={handleSubmit}
                        className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobApplicationDetailGA;

