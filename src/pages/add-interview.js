import React, { useEffect, useState } from 'react';
import Sidebar from '../components/sidebar';
import { useParams } from 'react-router-dom';

const AddInterview = () => {
  const { startTime, endTime, job_name } = useParams();
  const [interviewer, setInterviewer] = useState('');
  const [jobOptions, setJobOptions] = useState([]);
  const [selectedJob, setSelectedJob] = useState('');
  const [applicants, setApplicants] = useState([]);
  const [interviewData, setInterviewData] = useState({ applicant: '', datetime: '', startTime: '', endTime: '' });
  const currentDate = new Date();
  const currentDateString = currentDate.toISOString().split('T')[0];
  const currentTimeString = currentDate.toTimeString().split(' ')[0];
  const rectangleStyle = {
    width: '70%',
    height: '760px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    marginLeft: '22%',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.4)',
    marginTop: '-14%',
  };

useEffect(() => {
  const getAvailableInterviewers = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/interview/get-interviewer/${interviewData.datetime}/${interviewData.startTime}/${interviewData.endTime}/${selectedJob}/`, {
        method: 'GET',
      });
      const data = await response.json();
      setInterviewer(data); 
    } catch (error) {
      console.error('Error fetching interviewer:', error);
    }
  };
  if (interviewData.datetime && interviewData.startTime && interviewData.endTime && selectedJob) {
    getAvailableInterviewers();
  }
}, [interviewData.datetime, interviewData.startTime, interviewData.endTime, selectedJob]);

  useEffect(() => {
    const getJobNames = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/interview/get-job-name-applicants/`, {
          method: 'GET',
        });
        const jobNames = await response.json();
        setJobOptions(jobNames);
      } catch (error) {
        console.error('Error fetching job names:', error);
      }
    };
    getJobNames();
  }, []);

  useEffect(() => {
    const selectedJobApplicants = jobOptions.find(option => option.job.job_name === selectedJob)?.applicant;
    if (selectedJobApplicants) {
      setApplicants([selectedJobApplicants]);
    } else {
      setApplicants([]);
    }
  }, [selectedJob, jobOptions]);

  const handleJobChange = (event) => {
    setSelectedJob(event.target.value);
  };

  const handleSubmit = async () => {
  try {
    const datetimeStart = new Date(interviewData.datetime + 'T' + interviewData.startTime);
    const datetimeEnd = new Date(datetimeStart.getTime() + 60 * 60 * 1000);
    const formattedData = {
      ...interviewData,
      datetime_start: datetimeStart.toISOString(),
      datetime_end: datetimeEnd.toISOString(),
      job_name: selectedJob, 
      applicant: interviewData.applicant, 
    };
    const response = await fetch('http://127.0.0.1:8000/api/interview/add-interview/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formattedData),
    });

    if (!response.ok) {
      throw new Error('Failed to submit interview schedule');
    }
    alert('Interview schedule submitted successfully!');
  } catch (error) {
    console.error('Error submitting interview schedule:', error);
    alert('Failed to submit interview schedule. Please try again later.');
  }
};
  return (
    <React.Fragment>
      <p style={{ marginLeft: '22%', fontWeight: 'bold', fontSize: '32px', color: '#2A3E4B', position: 'absolute', marginTop: "12px" }}>Wawancara</p>
      <Sidebar />
      <div className="create-interview" style={{ position: 'relative' }}>
        <div className="rectangle" style={rectangleStyle}>
          <p style={{ marginTop: '20px', marginLeft: '23%', fontWeight: 'bold', fontSize: '32px', color: '#2A3E4B', position: 'absolute' }}>Buat Jadwal Wawancara</p>
          <form onSubmit={handleSubmit}>
  <p style={{ marginTop: '80px', marginLeft: '7%', fontWeight: '600', fontSize: '14px', color: '#2A3E4B', position: 'absolute' }}>Posisi Pekerjaan*</p>
  <select style={{ borderRadius: '5px', border: '2px solid #ccc', height: "40px", width: "56%", marginTop: '110px', marginLeft: '7%', fontWeight: '600', fontSize: '14px', color: '#2A3E4B', position: 'absolute' }} id="job" value={selectedJob} onChange={handleJobChange}>
    <option value="">Select Job</option>
    {jobOptions.map(job => (
      <option key={job.job.id} value={job.job.job_name}>{job.job.job_name}</option>
    ))}
  </select>
  <p style={{ marginTop: '180px', marginLeft: '7%', fontWeight: '600', fontSize: '14px', color: '#2A3E4B', position: 'absolute' }}>Pelamar Tahap Interview*</p>
  <select style={{ borderRadius: '5px', border: '2px solid #ccc', height: "40px", width: "56%", marginTop: '210px', marginLeft: '7%', fontWeight: '600', fontSize: '14px', color: '#2A3E4B', position: 'absolute' }} id="applicant" value={interviewData.applicant} onChange={(e) => setInterviewData({ ...interviewData, applicant: e.target.value })}>
    <option value="">Pilih Applicant</option>
    {applicants && applicants.map(applicant => (
      <option key={applicant.user.user_id} value={applicant.user.user_id}>{applicant.user.name}</option> 
    ))}
  </select>
  <p style={{ marginTop: '280px', marginLeft: '7%', fontWeight: '600', fontSize: '14px', color: '#2A3E4B', position: 'absolute' }}>Tanggal Interview*</p>
  <input
    type="date"
    style={{
      borderRadius: '5px', border: '2px solid #CBD2E0', padding: '8px',
      marginTop: '310px', marginLeft: '7%', fontSize: '14px', color: '#2A3E4B',
      position: 'absolute', width: '56%',
    }}
    value={interviewData.datetime ? new Date(interviewData.datetime).toISOString().split('T')[0] : 'DD/MM/YYYY'}
    onChange={(e) => {
      const selectedDate = e.target.value;
      const currentDate = new Date();
      const currentDateString = currentDate.toISOString().split('T')[0];

      if (selectedDate < currentDateString) {
        alert('Tanggal harus lebih besar dari atau sama dengan tanggal hari ini.');
      } else {
        setInterviewData({ datetime: selectedDate, time: '' });
        if (selectedDate === currentDateString) {
          const currentTimeString = currentDate.toTimeString().split(' ')[0];
          if (interviewData.time < currentTimeString) {
            alert('Waktu harus lebih besar dari waktu saat ini.');
          }
        }
      }
    }}
    min={currentDateString}
  />
  <p style={{ marginTop: '380px', marginLeft: '7%', fontWeight: '600', fontSize: '14px', color: '#2A3E4B', position: 'absolute' }}>Waktu Mulai Interview*</p>
  <input
    type="time"
    style={{
      borderRadius: '5px', border: '2px solid #CBD2E0', padding: '8px',
      marginTop: '410px', marginLeft: '7%', fontSize: '14px', color: '#2A3E4B',
      position: 'absolute', width: '56%',
    }}
    value={interviewData.startTime ? interviewData.startTime : ''}
    onChange={(e) => {
      const selectedTime = e.target.value;
      const formattedTime = selectedTime.substring(0, 5); 

      setInterviewData({ ...interviewData, startTime: formattedTime });
    }}
    min={currentTimeString}
    max={(interviewData.datetime === currentDateString) ? currentTimeString : ''}
    step="3600"
  />
  <p style={{ marginTop: '480px', marginLeft: '7%', fontWeight: '600', fontSize: '14px', color: '#2A3E4B', position: 'absolute' }}>Waktu Berakhir Interview*</p>
  <input
    type="time"
    style={{
      borderRadius: '5px', border: '2px solid #CBD2E0', padding: '8px',
      marginTop: '510px', marginLeft: '7%', fontSize: '14px', color: '#2A3E4B',
      position: 'absolute', width: '56%',
    }}
    value={interviewData.endTime ? interviewData.endTime : ''}
    onChange={(e) => {
      const selectedTime = e.target.value;
      const formattedTime = selectedTime.substring(0, 5); 

      setInterviewData({ ...interviewData, endTime: formattedTime });
    }}
    min={currentTimeString}
    max={(interviewData.datetime === currentDateString) ? currentTimeString : ''}
    step="3600"
  />
  <p style={{ marginTop: '580px', marginLeft: '7%', fontWeight: '600', fontSize: '14px', color: '#2A3E4B', position: 'absolute' }}>Pewawancara*</p>
  <select style={{ borderRadius: '5px', border: '2px solid #ccc', height: "40px", width: "56%", marginTop: '610px', marginLeft: '7%', fontWeight: '600', fontSize: '14px', color: '#2A3E4B', position: 'absolute' }} id="applicant" value={interviewData.applicant} onChange={(e) => setInterviewData({ ...interviewData, applicant: e.target.value })}>
    <option value="">Pilih Pewawancara</option>
    
  </select>

  <button type='submit'
    style={{
      width: '420px', padding: '8px', fontSize: '16px', fontFamily: 'Inter, sans-serif', fontWeight: 'bold',
      color: '#fff', background: '#2A3E4B', borderRadius: '6px', cursor: 'pointer',
      marginTop: '680px', border: '2px solid #2A3E4B',
      marginLeft: '24%', position: 'absolute',
    }}
  >
    Submit
  </button> 
</form>
      </div>
      </div>
    </React.Fragment>
  );
}

export default AddInterview;
