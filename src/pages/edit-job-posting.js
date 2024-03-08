import React, { useEffect, useState } from 'react';
import Sidebar from '../components/sidebar';
import { useParams } from 'react-router-dom';

function EditJobPosting() {
  const { id } = useParams();
  const [jobData, setJobData] = useState({
    job_name: '',
    description: '',
    datetime_closes: '',
  });
  const [job, setJob] = useState(null);

  useEffect(() => {
    const getJob = async () => {
      try {
        const response = await fetch(`https://sihire-be.vercel.app/api/job-posting/get/${id}/`);
        const data = await response.json();
        setJob(data);

        setJobData({
          job_name: data.job_name,
          description: data.description,
          datetime_closes: data.datetime_closes,
        });
      } catch (error) {
        console.error('Error fetching job:', error);
      }
    };
    getJob();
  }, [id]);

  const rectangleStyle = {
    width: '70%',
    height: '600px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    marginLeft: '22%',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.4)',
    marginTop: '-12%',
  };

  function formatDateTime(datetimeString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(datetimeString).toLocaleDateString(undefined, options);
    return formattedDate;
  }
  const handleSubmit = async (e) => {
  e.preventDefault();

  const isConfirmed = window.confirm('Do you want to submit the form?');
  if (!isConfirmed) {
    return;
  }

  try {
    const transformedDate = jobData.datetime_closes
      ? new Date(jobData.datetime_closes).toISOString().split('T')[0]
      : null;

    try {
  const response = await fetch(`https://sihire-be.vercel.app/api/job-posting/edit/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
        body: JSON.stringify({ ...jobData, datetime_closes: transformedDate }),
      });

  if (response.ok) {
    console.log('Job updated successfully!');
  } else {
    console.error('Failed to update job:', response.statusText);
  }
} catch (error) {
  console.error('Error updating job:', error);
}

  } catch (error) {
    console.error('Error updating job:', error);
  }
};

  return (
    <React.Fragment>
      <p style={{ marginLeft: '22%', fontWeight: 'bold', fontSize: '32px', color: '#2A3E4B', position: 'absolute' }}>Job</p>
      <Sidebar />
      <div className="add-job-posting" style={{ position: 'relative' }}>
        <div className="rectangle" style={rectangleStyle}>
          <p style={{ marginTop: '12px', marginLeft: '30%', fontWeight: 'bold', fontSize: '32px', color: '#2A3E4B', position: 'absolute' }}>Edit Job</p>
          <form onSubmit={handleSubmit}>
            <p style={{ marginTop: '80px', marginLeft: '7%', fontWeight: '600', fontSize: '14px', color: '#2A3E4B', position: 'absolute' }}>Job Title</p>
            {job && (
              <React.Fragment key={job.id}>
                <input
              type="text"
              style={{
                borderRadius: '5px',
                border: '2px solid #CBD2E0',
                padding: '8px',
                marginTop: '110px',
                marginLeft: '7%',
                fontSize: '14px',
                color: '#2A3E4B',
                position: 'absolute',
                width: '58%',
              }}
              value={jobData.job_name}
              disabled
              readOnly
            />
                <p style={{ marginTop: '180px', marginLeft: '7%', fontWeight: '600', fontSize: '14px', color: '#2A3E4B', position: 'absolute' }}>
                  Job Description
                </p>
                <textarea
                  value={jobData.description}
                  style={{
                    borderRadius: '5px',
                    border: '2px solid #CBD2E0',
                    padding: '8px',
                    marginTop: '210px',
                    marginLeft: '7%',
                    fontSize: '14px',
                    color: '#2A3E4B',
                    position: 'absolute',
                    width: '58%',
                    height: '200px',
                    resize: 'none',
                  }}
                  onChange={(e) => setJobData({ ...jobData, description: e.target.value })}
                />
                <p style={{ marginTop: '440px', marginLeft: '7%', fontWeight: '600', fontSize: '14px', color: '#2A3E4B', position: 'absolute' }}>
                  Closed Date
                </p>
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
              </React.Fragment>
            )}
            <button style={{
              width: '420px',
              padding: '8px',
              fontSize: '16px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 'bold',
              color: '#fff',
              background: '#2A3E4B',
              borderRadius: '6px',
              cursor: 'pointer',
              marginTop: '42%',
              marginBottom: '12px',
              border: '2px solid #2A3E4B',
              marginLeft: '20%',
              position: 'absolute',
            }}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}

export default EditJobPosting;
