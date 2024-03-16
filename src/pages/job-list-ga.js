import React, { useState, useEffect } from 'react';
import Sidebar from '../components/sidebar'; // Make sure to import the Sidebar component properly
import { Link, useNavigate } from 'react-router-dom';

function JobListGA() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  function formatDateTime(datetimeString) {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = new Date(datetimeString).toLocaleDateString('id-ID', options);
    return formattedDate;
  }

  useEffect(() => {
    const getJobs = async () => {
      try {
        const response = await fetch('https://sihire-be.vercel.app/api/job-posting/get-internal/');
        if (response.ok) {
          const data = await response.json();
          setJobs(data);
        } else {
          console.error('Failed to fetch job data');
        }
      } catch (error) {
        console.error('Error fetching job data:', error);
      }
    };
    getJobs();
  }, []);

  const handleClose = async (id) => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();

    const confirmClose = window.confirm('Apakah Anda yakin ingin menutup pekerjaan ini?');
    if (!confirmClose) return;

    try {
      const response = await fetch(`https://sihire-be.vercel.app/api/job-posting/edit/${id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ datetime_closes: formattedDate }),
      });
      if (response.ok) {
        setJobs(prevJobs => prevJobs.map(job => {
          if (job.id === id) {
            return { ...job, datetime_closes: formattedDate };
          }
          return job;
        }));
        setSuccessMessage("Pekerjaan berhasil ditutup!");
        setTimeout(() => {
          setSuccessMessage('');
          navigate("/job-list-ga");
        }, 5000);
      } else {
        console.error('Failed to update closing date');
      }
    } catch (error) {
      console.error('Error updating closing date:', error);
    }
  };

  return (
    <React.Fragment>
      <p style={{ marginLeft: "22%", fontWeight: "bold", fontSize: "32px", color: "#2A3E4B", position: "absolute" }}>Job</p>
      <Sidebar /> 
      <div className="job-posting" style={{ position: "relative" }}>
        <p style={{ marginLeft: "22%", fontWeight: "bold", fontSize: "32px", color: "#2A3E4B", marginTop: "-190px", marginBottom: "12px" }}>Lowongan Pekerjaan</p>
        <Link to="/add-job-posting">
          <button style={{ width: "180px", padding: "8px", fontSize: "16px", fontFamily: 'Inter, sans-serif', fontWeight: 'bold', color: "#fff", background: "#2A3E4B",
            borderRadius: "6px", cursor: "pointer",
            marginTop: "-52px", marginBottom: "12px", marginLeft: "80%", position: "absolute", border: "2px solid #2A3E4B", }}>
            Tambah Pekerjaan
          </button>
        </Link>
        {jobs && (
          <table style={{ marginLeft: "22%", borderCollapse: "collapse", width: "70%" }}>
            <thead>
              <tr>
                <th style={{ border: "2px solid #2A3E4B", padding: "4px", textAlign: "center", fontWeight: "bold" }}>JPekerjaan</th>
                <th style={{ border: "2px solid #2A3E4B", padding: "4px", textAlign: "center", fontWeight: "bold" }}>Tanggal Tutup</th>
                <th style={{ border: "2px solid #2A3E4B", padding: "4px", textAlign: "center", fontWeight: "bold" }}>Tutup</th>
                <th style={{ border: "2px solid #2A3E4B", padding: "4px", textAlign: "center", fontWeight: "bold" }}>Detail</th>
              </tr>
            </thead>
            <tbody>
            
              {jobs.map(job => (
                <tr key={job.id} style={job.datetime_closes && new Date(job.datetime_closes) < new Date() ? { backgroundColor: "#D2D2D2" } : {}}>
                  <td style={{ border: "2px solid #2A3E4B", padding: "8px" }}>{job.job_name}</td>
                  <td style={{ border: "2px solid #2A3E4B", padding: "8px" }}>{job.datetime_closes && formatDateTime(job.datetime_closes)}</td>
                  <td style={{ border: "2px solid #2A3E4B", padding: "8px", textAlign:"center"  }}>
                    <button onClick={() => handleClose(job.id)} style={{ padding: "8px", fontSize: "16px", fontFamily: 'Inter, sans-serif', fontWeight: 'bold', color: "#fff", borderRadius: "6px", cursor: "pointer", background: "#2A3E4B", border: "none", marginRight: "5px" }}>Tutup</button>
                  </td>
                  <td style={{ border: "2px solid #2A3E4B", padding: "8px", textAlign:"center" }}>
                    <Link to={`/job-list-ga/${job.id}`}>
                      <button style={{ padding: "8px", fontSize: "16px", fontFamily: 'Inter, sans-serif', fontWeight: 'bold', color: "#2A3E4B", borderRadius: "6px", cursor: "pointer", border: "2px solid #2A3E4B" }}>Detail</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
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
      </React.Fragment>
  );
}

export default JobListGA;
