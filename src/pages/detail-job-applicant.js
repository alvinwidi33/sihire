import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SidebarApplicant from "../components/sidebar-applicant";

function DetailJobApplicant() {
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
      <div
        style={{
          marginLeft: "22%",
          position: "absolute",
          marginBottom: "40px",
          marginTop: "100px",
        }}
      >
        <Link
          to="/job-list-applicant"
          style={{
            textDecoration: "none",
            color: "#2A3E4B",
            cursor: "pointer",
          }}
        >
          <p style={{ display: "inline", marginLeft: "4px" }}>List Pekerjaan</p>
        </Link>
        <span style={{ display: "inline", marginLeft: "10px" }}>{">"}</span>
        {job && (
          <React.Fragment key={job.id}>
            <Link
              to={`/job-list-applicant/${job.id}`}
              style={{
                textDecoration: "none",
                color: "#2A3E4B",
                cursor: "pointer",
              }}
            >
              <p style={{ display: "inline", marginLeft: "10px" }}>
                Detail
              </p>
            </Link>
          </React.Fragment>
        )}
      </div>
      <p
        style={{
          marginLeft: "22%",
          fontWeight: "bold",
          fontSize: "32px",
          color: "#2A3E4B",
          position: "absolute",
        }}
      >
        Pekerjaan
      </p>
      <SidebarApplicant />
      <div
        style={{ marginLeft: "22%", position: "absolute", marginTop: "40px" }}
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
            <Link to={`/add-job-application/${job.id}`}>
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
    </React.Fragment>
  );
}

export default DetailJobApplicant;
