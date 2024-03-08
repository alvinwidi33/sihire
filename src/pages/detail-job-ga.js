import React, { useEffect, useState } from 'react';
import Sidebar from '../components/sidebar';
import { useParams, Link } from 'react-router-dom';

function DetailJobGA() {
const { id } = useParams();
  const [job, setJob] = useState();
function formatDateTime(datetimeString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = new Date(datetimeString).toLocaleDateString(undefined, options);
  return formattedDate;
}

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
      <button style={{width:"90px", padding: "8px", fontSize: "16px", fontFamily: 'Inter, sans-serif', fontWeight: 'bold', color: "#fff", background: "#2A3E4B", 
      borderRadius: "6px", cursor: "pointer", marginTop: "-180px", marginBottom: "12px", border: "2px solid #2A3E4B",
      marginLeft: "82%", position:"absolute"}}>
        Edit
    </button>
      <div className="detail-job" style={{ position: "relative" }}>
        {job && (
          <React.Fragment key={job.id}>
            <Link to={`/job-list-ga/${job.id}/edit`}>
              <button style={{width:"90px", padding: "8px", fontSize: "16px", fontFamily: 'Inter, sans-serif', fontWeight: 'bold', color: "#fff", background: "#2A3E4B", 
                borderRadius: "6px", cursor: "pointer", 
                marginTop: "30px", marginBottom: "12px", marginLeft: "82%", position:"absolute",border: "2px solid #2A3E4B", }}>
                Edit
              </button>
            </Link>
            <p style={{ marginLeft: "22%", fontWeight: "bold", fontSize: "32px", color: "#2A3E4B", marginTop: "-190px", marginBottom: "12px" }}>
              {job.job_name}
            </p>
            <p style={{ marginLeft: "22%", fontWeight: "bold", fontSize: "24px", color: "#2A3E4B", marginTop: "-0px", marginBottom: "4px" }}>
              Job Description
            </p>
            <p style={{ marginLeft: "22%", fontSize: "16px", color: "#2A3E4B", marginBottom: "12px" }}>
                {job.description}
            </p>
            <p style={{ marginTop:"20%",marginLeft: "22%", fontWeight: "bold", fontSize: "24px", color: "#2A3E4B", marginBottom: "4px" }}>
                Closed Date
            </p>
            <p style={{ marginLeft: "22%", fontSize: "16px", color: "#2A3E4B", marginBottom: "12px" }}>
              {job.datetime_closes && formatDateTime(job.datetime_closes)}
            </p>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
        }

export default DetailJobGA;