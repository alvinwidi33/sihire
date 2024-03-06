import React, { useState, useEffect } from 'react';
import Sidebar from '../components/sidebar';
import { Link } from 'react-router-dom';

function JobList() {
  const [jobs, setJobs] = useState(null);

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
        <p style={{ marginLeft: "22%", fontWeight: "bold", fontSize: "32px", color: "#2A3E4B", marginTop: "-190px", marginBottom:"12px" }}>Jobs Available</p>
  {jobs && jobs.map(job => (
    <div key={job.id} style={{ marginLeft: "22%", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.4)", padding: "14px", maxWidth: "68%", height: "70px", borderRadius: "6px", marginBottom:"16px" }}>
    <div className='job-item' style={{marginLeft:"4%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 'bold', fontSize: "24px", color: "#2A3E4B" }}>{job.job_name}</span>
      <Link to={`/job-list/${job.id}`}>
      <button style={{width:"90px",padding: "8px",fontSize: "16px",fontFamily: 'Inter, sans-serif',fontWeight: 'bold',color: "#2A3E4B",borderRadius: "6px",cursor: "pointer",border: "2px solid #2A3E4B",}}>
  Detail
</button>
</Link>
</div>
    </div>
  ))}
</div>
    </React.Fragment>
  );
}

export default JobList;
