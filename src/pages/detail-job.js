import React, { useEffect, useState } from 'react';
import Sidebar from '../components/sidebar';
import { useParams } from 'react-router-dom';

function DetailJob() {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const getJob = async () => {
      try {
        const response = await fetch(`https://sihire-be.vercel.app/api/job-posting/get/${id}/`);
        const data = await response.json();
        setJob(data);
      } catch (error) {
        console.error('Error fetching job:', error);
      }
    };
    getJob();
  }, [id]);

  return (
    <React.Fragment>
      <p style={{ marginLeft: "22%", fontWeight: "bold", fontSize: "32px", color: "#2A3E4B", position: "absolute" }}>Job</p>
      <Sidebar />
      <div className="detail-job" style={{ position: "relative" }}>
        {job && job.map(job => (
  <React.Fragment key={job.id}>
    <p style={{ marginLeft: "22%", fontWeight: "bold", fontSize: "32px", color: "#2A3E4B", marginTop: "-190px", marginBottom: "12px" }}>
      {job.job_name}
    </p>
    <p>
      Description
    </p>
    <p>
        {job.description}
    </p>
  </React.Fragment>
))}

      </div>
    </React.Fragment>
  );
}
export default DetailJob;