import React, { useEffect, useState } from 'react';
import Sidebar from '../components/sidebar';
import { Link } from 'react-router-dom';

function JobListApplicant() {
  const [jobs, setJobs] = useState(null);
  function formatDateTime(datetimeString) {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = new Date(datetimeString).toLocaleDateString('id-ID', options);
  return formattedDate;
}
  useEffect(() => {
    const getJobs = async () => {
      await fetch('https://sihire-be.vercel.app/api/job-posting/get/')
        .then(resp => resp.json())
        .then(data => {
          setJobs(data);
        });
    };
    getJobs();
  }, []);

  return (
    <React.Fragment>
      <p style={{ marginLeft: "22%", fontWeight: "bold", fontSize: "32px", color: "#2A3E4B", position: "absolute" }}>Job</p>
      <Sidebar />
      <div className="job-posting" style={{ position: "relative" }}>
        <p style={{ marginLeft: "22%", fontWeight: "bold", fontSize: "32px", color: "#2A3E4B", marginTop: "-190px", marginBottom:"12px" }}>Lowongan Pekerjaan</p>
        {jobs && (
          <table style={{ marginLeft: "22%", borderCollapse: "collapse", width: "70%" }}>
            <thead>
              <tr>
                <th style={{ border: "2px solid #2A3E4B", padding: "8px", textAlign: "center", fontWeight: "bold" }}>Job Name</th>
                <th style={{ border: "2px solid #2A3E4B", padding: "8px", textAlign: "center", fontWeight: "bold" }}>Close Date</th>
                <th style={{ border: "2px solid #2A3E4B", padding: "8px", textAlign: "center", fontWeight: "bold" }}>Lamar</th>
                <th style={{ border: "2px solid #2A3E4B", padding: "8px", textAlign: "center", fontWeight: "bold" }}>Detail</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map(job => (
                <tr key={job.id}>
                  <td style={{ border: "2px solid #2A3E4B", padding: "8px", fontFamily: 'Inter, sans-serif', fontWeight: 'bold', fontSize: "24px", color: "#2A3E4B" }}>{job.job_name}</td>
                  <td style={{ border: "2px solid #2A3E4B", padding: "8px" }}>{job.datetime_closes && formatDateTime(job.datetime_closes)}</td>
                  <td style={{ border: "2px solid #2A3E4B", padding: "8px", textAlign:"center" }}>
                    <Link to={`/add-job-application/${job.id}`}>
                      <button style={{width:"90px",padding: "8px",fontSize: "16px",fontFamily: 'Inter, sans-serif',fontWeight: 'bold',color: "#fff",borderRadius: "6px",cursor: "pointer",border: "2px solid #2A3E4B",background:"#2A3E4B"}}>
                        Lamar
                      </button>
                    </Link>
                  </td>
                  <td style={{ border: "2px solid #2A3E4B", padding: "8px", textAlign:"center" }}>
                    <Link to={`/job-list-applicant/${job.id}`}>
                      <button style={{width:"90px",padding: "8px",fontSize: "16px",fontFamily: 'Inter, sans-serif',fontWeight: 'bold',color: "#2A3E4B",borderRadius: "6px",cursor: "pointer",border: "2px solid #2A3E4B",}}>
                        Detail
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </React.Fragment>
  );
}

export default JobListApplicant;
