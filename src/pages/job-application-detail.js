import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { createClient } from "@supabase/supabase-js";
import { FileText } from 'lucide-react';
import SidebarApplicant from '../components/sidebar-applicant';

const supabase = createClient(
  "https://ldhohewyhcdwckzcjtzn.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkaG9oZXd5aGNkd2NremNqdHpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAxNjY0MzksImV4cCI6MjAyNTc0MjQzOX0.73gDtZ0yUZmpXvIrga-Mw7amJNaPJu6av7wyr0OSCuo"
);

function JobApplicationDetail() {
  const stages = [
    { name: 'Applied', value: 0 },
    { name: 'In Review', value: 25 },
    { name: 'Interview', value: 50 },
    { name: 'Accepted', value: 75 },
    { name: 'On Boarding', value: 100 },
  ];

  const { id } = useParams();

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

  const calculateProgress = (stageName) => {
    const stage = stages.find((stage) => stage.name === stageName);
    return stage ? stage.value : 0;
  };

  const currentStage = formData.status;
  const progress = currentStage === 'Withdrawn' || currentStage === 'Declined' ? 100 : calculateProgress(currentStage);

  useEffect(() => {
    const fetchJobApplicationData = async () => {
      try {
        const response = await fetch('https://sihire-be.vercel.app/api/job-application/get-detail/' + id + '/', {
          method: 'GET',
        });
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
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchJobApplicationData();
  }, []);

  const handleSubmit = async (e) => {
    const fd = new FormData();
    fd.append("job", formData.job.id);
    fd.append("applicant", formData.applicant.applicant_id);
    fd.append("status", "Withdrawn");

    try {
      const response = await fetch('https://sihire-be.vercel.app/api/job-application/put/' + id + '/edit-status/', {
        method: 'PUT',
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
    <React.Fragment>
      <p style={{ marginLeft: '22%', fontWeight: 'bold', fontSize: '32px', color: '#2A3E4B', position: 'absolute', marginTop: "12px" }}>Job Application</p>
      <SidebarApplicant />
    <div className="min-h-screen flex" style={{ marginLeft:"18%", marginTop:"-15%"}}>
      <div className="container mx-auto mt-8 md:mt-16 w-11/12">
        <div className="p-4 bg-white rounded-lg shadow-md flex flex-col" style={{boxShadow: '0 2px 10px rgba(0, 0, 0, 0.4)'}}>
          <h2 className="text-2xl font-bold mb-2">{formData.job.job_name}</h2>
          <strong>Status: {formData.status}</strong>
          <div className="mt-4 relative flex justify-between">
            {stages.map((stage, index) => (
              <div key={index} className="flex items-center">
                <span
                  className={`w-2 h-2 rounded-full ${
                    (formData.status === 'Withdrawn' || formData.status === 'Declined') ? 'bg-red-500' : progress >= stage.value ? 'bg-green-500' : 'bg-gray-400'
                  }`}
                ></span>
                <span
                  className={`text-sm ml-1 ${
                    (formData.status === 'Withdrawn' || formData.status === 'Declined') ? 'text-red-500' : progress >= stage.value ? 'text-green-500' : 'text-gray-400'
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
              value={(formData.status === 'Withdrawn' || formData.status === 'Declined') ? 100 : progress}
              max="100"
            ></progress>
            <style jsx global>{`
              progress::-webkit-progress-bar {
                background-color: #f5f5f5;
              }
              progress::-webkit-progress-value {
                background-color: ${(formData.status === 'Withdrawn' || formData.status === 'Declined') ? 'red' : 'green'};
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
              {
                formData.cv ?
                  <a
                    href={formData.cv}
                    target='__blank'
                    rel='noopener noreferrer'
                    className='mt-2'
                  >
                    <FileText color='#bc3434' />
                  </a> :
                  <a
                    href={formData.cv}
                    target='__blank'
                    rel='noopener noreferrer'
                    className='mt-2 cursor-not-allowed'
                  >
                    <FileText color="#707070" />
                  </a>
              }
              <br />
              <strong>Cover Letter</strong>
              {
                formData.coverLetter ?
                  <a
                    href={formData.coverLetter}
                    target='__blank'
                    rel='noopener noreferrer'
                    className='mt-2'
                  >
                    <FileText color='#bc3434' />
                  </a> :
                  <a
                    href={formData.coverLetter}
                    target='__blank'
                    rel='noopener noreferrer'
                    className='mt-2 cursor-not-allowed'
                  >
                    <FileText color="#707070" />
                  </a>
              }
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded mr-2">Beri Ulasan</button>
            <button
              onClick={handleSubmit}
              className={`py-2 px-4 rounded border bg-white border-black hover:bg-gray-200 hover:text-black`}
              disabled={formData.status === 'Withdrawn'}
            >
              Withdraw
            </button>
          </div>
        </div>
      </div>
    </div>
    </React.Fragment>
  );
}

export default JobApplicationDetail;
