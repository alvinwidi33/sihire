import React, { useEffect, useState } from 'react';
import Sidebar from '../components/sidebar';
import { useParams, Link, useNavigate } from 'react-router-dom';

const AddOnboarding = () => {
  const navigate = useNavigate();
  const { startTime, endTime, job_name } = useParams();
  const [successMessage, setSuccessMessage] = useState('');
  const [pic_user_id, set_pic_user_id] = useState([]);
  const [jobOptions, setJobOptions] = useState([]);
  const [selectedJob, setSelectedJob] = useState('');
  const [applicants, setApplicants] = useState([]);
  const [onboardingData, setOnboardingData] = useState('');

  const currentDate = new Date();
  const currentDateString = currentDate.toISOString().split('T')[0];
  const currentTimeString = currentDate.toTimeString().slice(0,5)[0];
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
    const getAvailablePIC = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/onboarding/get-pic-user-id/`, {
          method: 'GET',
        });
        const data = await response.json();
        set_pic_user_id(data); 
      } catch (error) {
        console.error('Error fetching pic:', error);
      }
    };
    if (onboardingData.datetime && onboardingData.startTime && onboardingData.endTime && selectedJob) {
      getAvailablePIC();
    }
  }, [onboardingData.datetime, onboardingData.startTime, onboardingData.endTime, selectedJob]); // Add dependencies to rerun effect when these values change

  useEffect(() => {
    const getJobNames = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/onboarding/get-job-name-applicants/`, {
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
  const selectedJob = event.target.value; 
  setSelectedJob(selectedJob); 
};

  const handlePICChange = (event) => { 
    setOnboardingData({ ...onboardingData, pic_user_id: event.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
  try {
    const selectedJobObject = jobOptions.find(option => option.job.job_name === selectedJob);
    if (!selectedJobObject) {
      throw new Error('Selected job not found.');
    }
    const isConfirmed = window.confirm('Apakah Anda yakin membuat On Boarding?');

    if (!isConfirmed) {
      return;
    }

    const datetimeStart = new Date(onboardingData.datetime + 'T' + onboardingData.startTime);
    const datetimeEnd = new Date(onboardingData.datetime + 'T' + onboardingData.endTime);
    const formattedData = {
      ...onboardingData,
      datetime_start: datetimeStart.toISOString(),
      datetime_end: datetimeEnd.toISOString(),
      applicant: onboardingData.applicant,
      pic_user_id: onboardingData.pic_user_id,
      job_application_id: selectedJobObject.id, 
    };

    const response = await fetch('http://127.0.0.1:8000/api/onboarding/add-onboarding/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formattedData),
    });

    if (!response.ok) {
      throw new Error('Failed to submit onboarding schedule');
    }
    if (response.ok) {
        console.log('Job posted successfully!');
        setSuccessMessage("On Boarding berhasil dibuat!");
        setTimeout(() => {
            setSuccessMessage('');
            navigate("/get-list-interview-ga");
        }, 5000);
    } else {
        console.error('Failed to post on boarding', response.statusText);
      }

  } catch (error) {
    console.error('Error submitting on boarding schedule:', error);
    alert('Failed to submit on boarding schedule. Please try again later.');
  }
};

  return (
    <React.Fragment>
      <p style={{ marginLeft: '22%', fontWeight: 'bold', fontSize: '32px', color: '#2A3E4B', position: 'absolute', marginTop: "12px" }}>On Boarding</p>
      <Link to ='/get-list-interview-ga'>
        <p style={{marginLeft:'22%', position:'absolute', marginTop:"100px" }}>List On Boarding</p>
        </Link>
        <p style={{marginLeft:'30%', position:'absolute', marginTop:"100px" }}>{'>'}</p>
        <Link to='/create-onboarding'>
        <p style={{marginLeft:'31%', position:'absolute', marginTop:"100px"}}>Tambah On Boarding</p>
        </Link>
      <Sidebar />
      <div className="create-onboarding" style={{ position: 'relative' }}>
        <div className="rectangle" style={rectangleStyle}>
          <p style={{ marginTop: '20px', marginLeft: '23%', fontWeight: 'bold', fontSize: '32px', color: '#2A3E4B', position: 'absolute' }}>Buat Jadwal On Boarding</p>
          <form onSubmit={handleSubmit}>
            <p style={{ marginTop: '80px', marginLeft: '7%', fontWeight: '600', fontSize: '14px', color: '#2A3E4B', position: 'absolute' }}>Posisi Pekerjaan*</p>
            <select style={{ borderRadius: '5px', border: '2px solid #ccc', height: "40px", width: "56%", marginTop: '110px', marginLeft: '7%', fontWeight: '600', fontSize: '14px', color: '#2A3E4B', position: 'absolute' }} required id="job" value={selectedJob} onChange={handleJobChange}>
              <option value="">Select Job</option>
              {jobOptions.map(job => (
                <option key={job.job.id} value={job.job.job_name}>{job.job.job_name}</option>
              ))}
            </select>
            <p style={{ marginTop: '180px', marginLeft: '7%', fontWeight: '600', fontSize: '14px', color: '#2A3E4B', position: 'absolute' }}>Pelamar Tahap On Boarding*</p>
            <select style={{ borderRadius: '5px', border: '2px solid #ccc', height: "40px", width: "56%", marginTop: '210px', marginLeft: '7%', fontWeight: '600', fontSize: '14px', color: '#2A3E4B', position: 'absolute' }} required id="applicant" value={onboardingData.applicant} onChange={(e) => setOnboardingData({ ...onboardingData, applicant: e.target.value })}>
              <option value="">Pilih Applicant</option>
              {applicants && applicants.map(applicant => (
                <option key={applicant.user.user_id} value={applicant.user.user_id}>{applicant.user.name}</option>
              ))}
            </select>
            <p style={{ marginTop: '280px', marginLeft: '7%', fontWeight: '600', fontSize: '14px', color: '#2A3E4B', position: 'absolute' }}>Tanggal On Boarding*</p>
            <input
              type="date"
              style={{
                borderRadius: '5px',
                border: '2px solid #CBD2E0',
                padding: '8px',
                marginTop: '310px',
                marginLeft: '7%',
                fontSize: '14px',
                color: '#2A3E4B',
                position: 'absolute',
                width: '56%',
              }}
              required
              value={onboardingData.datetime ? onboardingData.datetime : ''}
              onChange={(e) => {
                const selectedDate = e.target.value;
                const currentDate = new Date();
                const currentDateString = currentDate.toISOString().split('T')[0];
                const currentTimeString = currentDate.toTimeString().slice(0, 5);

                const startTime = new Date(`${selectedDate}T${onboardingData.startTime}`);

                if (selectedDate === currentDateString && startTime < currentDate) {
                  alert('Waktu mulai tidak boleh lebih kecil dari waktu saat ini.');
                } else {
                  setOnboardingData({ ...onboardingData, datetime: selectedDate });
                }
              }}
              min={currentDateString}
            />
            <p style={{ marginTop: '380px', marginLeft: '7%', fontWeight: '600', fontSize: '14px', color: '#2A3E4B', position: 'absolute' }}>Waktu Mulai On Boarding*</p>
            <input
              type="time"
              style={{
                borderRadius: '5px',
                border: '2px solid #CBD2E0',
                padding: '8px',
                marginTop: '410px',
                marginLeft: '7%',
                fontSize: '14px',
                color: '#2A3E4B',
                position: 'absolute',
                width: '56%',
              }}
              required
              value={onboardingData.startTime ? onboardingData.startTime : ''}
              onChange={(e) => {
                const selectedTime = e.target.value;
                const formattedTime = selectedTime.slice(0, 5);
                const startTime = new Date(`${onboardingData.datetime}T${formattedTime}`);
                const currentDate = new Date();
                const currentDateString = currentDate.toISOString().split('T')[0];

                if (onboardingData.datetime === currentDateString && startTime < currentDate) {
                  alert('Waktu mulai tidak boleh lebih kecil dari waktu saat ini.');
                } else {
                  setOnboardingData({ ...onboardingData, startTime: formattedTime });
                }
              }}
              min={onboardingData.datetime === currentDateString ? currentTimeString : '00:00'}
              max={onboardingData.datetime === currentDateString ? '23:59' : ''}
            />

            <p style={{ marginTop: '480px', marginLeft: '7%', fontWeight: '600', fontSize: '14px', color: '#2A3E4B', position: 'absolute' }}>Waktu Berakhir On Boarding*</p>
            <input
              type="time"
              style={{
                borderRadius: '5px',
                border: '2px solid #CBD2E0',
                padding: '8px',
                marginTop: '510px',
                marginLeft: '7%',
                fontSize: '14px',
                color: '#2A3E4B',
                position: 'absolute',
                width: '56%',
              }}
              value={onboardingData.endTime ? onboardingData.endTime : ''}
              onChange={(e) => {
                const selectedTime = e.target.value;
                const formattedTime = selectedTime.slice(0, 5);
                const startTime = new Date(`${onboardingData.datetime}T${onboardingData.startTime}`);
                const endTime = new Date(`${onboardingData.datetime}T${formattedTime}`);
                const currentDate = new Date();
                const currentDateString = currentDate.toISOString().split('T')[0];
                if (endTime < startTime) {
                  alert('Waktu berakhir tidak boleh lebih awal dari waktu mulai.');
                  return;
                }

                if (onboardingData.datetime === currentDateString && endTime < currentDate) {
                  alert('Waktu berakhir tidak boleh lebih kecil dari waktu saat ini.');
                  return;
                }
                setOnboardingData({ ...onboardingData, endTime: formattedTime });
              }}
              min={onboardingData.datetime === currentDateString ? currentTimeString : '00:00'}
              max={onboardingData.datetime === currentDateString ? '23:59' : ''}
            />
            <p style={{ marginTop: '580px', marginLeft: '7%', fontWeight: '600', fontSize: '14px', color: '#2A3E4B', position: 'absolute' }}>PIC*</p>
            <select style={{ borderRadius: '5px', border: '2px solid #ccc', height: "40px", width: "56%", marginTop: '610px', marginLeft: '7%', fontWeight: '600', fontSize: '14px', color: '#2A3E4B', position: 'absolute' }} id="pic_user_id" value={onboardingData.pic_user_id} onChange={handlePICChange}> 
              <option value="">Pilih Person In Charge*</option>
              {pic_user_id && pic_user_id.map(pic => (
                <option key={pic.user_id} value={pic.user_id}>
                  {pic.name}
                </option>
              ))}
            </select>

            <button type='submit'
              style={{
                width: '420px', padding: '8px', fontSize: '16px', fontFamily: 'Inter, sans-serif', fontWeight: 'bold',
                color: '#fff', background: '#2A3E4B', borderRadius: '6px', cursor: 'pointer',
                marginTop: '680px', border: '2px solid #2A3E4B',
                marginLeft: '20%', position: 'absolute',
              }}
            >
              Submit
            </button>
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
          {successMessage}
        </p>
      )}
        </div>
      </div>
    </React.Fragment>
  );
}

export default AddOnboarding;