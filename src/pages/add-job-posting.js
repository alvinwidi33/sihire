import React, { useState, useEffect } from 'react';
import Sidebar from '../components/sidebar';

function AddJobPosting() {
  const [error, setError] = useState('');
  const [jobData, setJobData] = useState({
    job_name: '',
    description: '',
    datetime_closes: '',
  });

  const rectangleStyle = {
    width: '70%',
    height: '600px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    marginLeft: '22%',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.4)',
    marginTop: '-12%',
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!jobData.job_name || !jobData.description || !jobData.datetime_closes) {
      setError('Please fill in all the required fields.');
      return;
    }

    setError('');
    const isConfirmed = window.confirm('Do you want to submit the form?');

    if (!isConfirmed) {
      return;
    }
    const transformedDate = (() => {
  const [year, month, day] = jobData.datetime_closes.split('-');
  return `${year}-${month}-${day}`;
})();

    try {
      const response = await fetch('https://sihire-be.vercel.app/api/job-posting/post/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...jobData, datetime_closes: transformedDate }),
      });

      if (response.ok) {
        console.log('Job posted successfully!');
      } else {
        console.error('Failed to post job:', response.statusText);
      }
    } catch (error) {
      console.error('Error posting job:', error);
    }
  };

  useEffect(() => {
    if (error) {
      const timeoutId = setTimeout(() => {
        setError('');
      }, 5000); 

      return () => clearTimeout(timeoutId);
    }
  }, [error]);

  return (
    <React.Fragment>
      <p style={{ marginLeft: '22%', fontWeight: 'bold', fontSize: '32px', color: '#2A3E4B', position: 'absolute' }}>Job</p>
      <Sidebar />
      <div className="add-job-posting" style={{ position: 'relative' }}>
        <div className="rectangle" style={rectangleStyle}>
          <p style={{ marginTop: '12px', marginLeft: '29%', fontWeight: 'bold', fontSize: '32px', color: '#2A3E4B', position: 'absolute' }}>Create Job</p>
          <form onSubmit={handleSubmit}>
            <p style={{ marginTop: '80px', marginLeft: '7%', fontWeight: '600', fontSize: '14px', color: '#2A3E4B', position: 'absolute' }}>Job Title</p>
            <input
              type="text"
              style={{
                borderRadius: '5px', border: '2px solid #CBD2E0', padding: '8px',
                marginTop: '110px', marginLeft: '7%', fontSize: '14px', color: '#2A3E4B',
                position: 'absolute', width: '58%',
              }}
              value={jobData.job_name}
              onChange={(e) => setJobData({ ...jobData, job_name: e.target.value })}
            />
            <p style={{ marginTop: '180px', marginLeft: '7%', fontWeight: '600', fontSize: '14px', color: '#2A3E4B', position: 'absolute' }}>Job Description</p>
            <textarea
              style={{
                borderRadius: '5px', border: '2px solid #CBD2E0', padding: '8px', marginTop: '210px',
                marginLeft: '7%', fontSize: '14px', color: '#2A3E4B', position: 'absolute',
                width: '58%', height: '200px', resize: 'none',
              }}
              value={jobData.description}
              onChange={(e) => setJobData({ ...jobData, description: e.target.value })}
            />
            <p style={{ marginTop: '440px', marginLeft: '7%', fontWeight: '600', fontSize: '14px', color: '#2A3E4B', position: 'absolute' }}>Closed Date</p>
            <input
                type="date"
                style={{
                    borderRadius: '5px', border: '2px solid #CBD2E0', padding: '8px',
                    marginTop: '470px', marginLeft: '7%', fontSize: '14px', color: '#2A3E4B',
                    position: 'absolute', width: '58%',
                }}
                value={jobData.datetime_closes ? new Date(jobData.datetime_closes).toISOString().split('T')[0] : ''}
                onChange={(e) => setJobData({ ...jobData, datetime_closes: e.target.value })}
                />

            {error && (
                <p
                    style={{
                    color: 'red',
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    }}
                >
                    {error}
                </p>
                )}
            <button type='submit'
              style={{
                width: '420px', padding: '8px', fontSize: '16px', fontFamily: 'Inter, sans-serif', fontWeight: 'bold',
                color: '#fff', background: '#2A3E4B', borderRadius: '6px', cursor: 'pointer',
                marginTop: '42%', marginBottom: '12px', border: '2px solid #2A3E4B',
                marginLeft: '20%', position: 'absolute',
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

export default AddJobPosting;
