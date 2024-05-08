import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { Link, useParams } from "react-router-dom";
import Footer from "../components/footer";

function CareersJob() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  function formatDateTime(datetimeString) {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = new Date(datetimeString).toLocaleDateString(
      "id-ID",
      options
    );
    return formattedDate;
  }

  useEffect(() => {
    const getJob = async () => {
      try {
        const response = await fetch(
          `https://sihire-be.vercel.app/api/job-posting/get/${id}/`
        );
        const data = await response.json();
        setJob(data);
      } catch (error) {
        console.error("Error fetching job:", error);
      }
    };
    getJob();
  }, [id]);

  return (
    <React.Fragment>
    <Navbar/>
      <div
        style={{
          marginLeft: "22%",
          position: "absolute",
          marginBottom: "40px",
          marginTop: "100px",
        }}
      >
        {job && (
          <React.Fragment key={job.id}>
            
              
          </React.Fragment>
        )}
      </div>
      <div
        style={{ marginLeft: "16%", position: "absolute", marginTop: "300px" }}
        className="w-9/12"
      >
        {job && (
          <React.Fragment key={job.id}>
            <p
              style={{
                fontWeight: "bold",
                fontSize: "32px",
                color: "#2A3E4B",
                marginTop: "-200px",
                marginBottom: "12px",
              }}
            >
              {job.job_name}
            </p>
            <p
              style={{
                fontWeight: "bold",
                fontSize: "24px",
                color: "#2A3E4B",
                marginTop: "-0px",
                marginBottom: "4px",
              }}
            >
              Deskripsi
            </p>
            <p
              style={{
                fontSize: "16px",
                color: "#2A3E4B",
                marginBottom: "20px",
                whiteSpace: "pre-line",
              }}
            >
              {job.description}
            </p>
            <p
              style={{
                fontWeight: "bold",
                fontSize: "24px",
                color: "#2A3E4B",
                marginBottom: "4px",
              }}
            >
              Tanggal Tutup
            </p>
            <p
              style={{
                position: "absolute",
                fontSize: "16px",
                color: "#2A3E4B",
                marginBottom: "12px",
              }}
            >
              {job.datetime_closes && formatDateTime(job.datetime_closes)}
            </p>
            <Link to={`/login`}>
              <button
                style={{
                  width: "520px",
                  padding: "8px",
                  fontSize: "16px",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: "bold",
                  color: "#fff",
                  background: "#2A3E4B",
                  borderRadius: "6px",
                  cursor: "pointer",
                  marginTop: "6%",
                  marginBottom: "12px",
                  border: "2px solid #2A3E4B",
                  marginLeft: "22%",
                  position: "absolute",
                }}
              >
                Lamar
              </button>
            </Link>
          </React.Fragment>
        )}
      </div>
      <Footer marginTop="940px"/>
    </React.Fragment>
  );
}

export default CareersJob;
