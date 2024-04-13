import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar-ga";
import { useParams, Link, useNavigate } from "react-router-dom";

function DetailJobGA() {
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const [job, setJob] = useState();
  function formatDateTime(datetimeString) {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = new Date(datetimeString).toLocaleDateString(
      "id-ID",
      options
    );
    return formattedDate;
  }

  async function handleClose() {
    const shouldClose = window.confirm(
      "Are you sure you want to close this job?"
    );
    if (!shouldClose) {
      return; // If the user cancels, do nothing
    }

    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();
    try {
      const response = await fetch(
        `https://sihire-be.vercel.app/api/job-posting/edit/${id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ datetime_closes: formattedDate }),
        }
      );
      if (response.ok) {
        const updatedJob = { ...job, datetime_closes: formattedDate };
        setJob(updatedJob);
        setSuccessMessage("Pekerjaan berhasil ditutup!");
        setTimeout(() => {
          setSuccessMessage("");
          navigate("/job-list-ga");
        }, 5000);
      } else {
        console.error("Failed to update closing date");
      }
    } catch (error) {
      console.error("Error updating closing date:", error);
    }
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
      <div style={{ marginLeft: "22%", position: "absolute" }}>
        <p
          style={{
            fontWeight: "bold",
            fontSize: "32px",
            color: "#2A3E4B",
            marginBottom: "40px",
          }}
        >
          Job
        </p>
        <Link to="/job-list-ga">
          <p style={{ display: "inline", marginLeft: "4px" }}>List Job</p>
        </Link>
        <span style={{ display: "inline", marginLeft: "10px" }}>{">"}</span>
        {job && (
          <React.Fragment key={job.id}>
            <Link to={`/job-list-ga/${job.id}`}>
              <p style={{ display: "inline", marginLeft: "10px" }}>
                Job Details
              </p>
            </Link>
          </React.Fragment>
        )}
      </div>
      <Sidebar />
      <div
        className="detail-job"
        style={{ position: "relative", marginTop: "-20px" }}
      >
        {job && (
          <React.Fragment key={job.id}>
            <Link to={`/job-list-ga/${job.id}/edit`}>
              <button
                style={{
                  width: "90px",
                  padding: "8px",
                  fontSize: "16px",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: "bold",
                  color: "#fff",
                  background: "#2A3E4B",
                  borderRadius: "6px",
                  cursor: "pointer",
                  marginBottom: "12px",
                  marginLeft: "82%",
                  position: "absolute",
                  border: "2px solid #2A3E4B",
                }}
              >
                Edit
              </button>
            </Link>
            <button
              onClick={handleClose}
              style={{
                width: "90px",
                padding: "8px",
                fontSize: "16px",
                fontFamily: "Inter, sans-serif",
                fontWeight: "bold",
                color: "#2A3E4B",
                background: "#fff",
                borderRadius: "6px",
                cursor: "pointer",
                marginLeft: "74%",
                position: "absolute",
                border: "2px solid #2A3E4B",
              }}
            >
              Tutup
            </button>
            <p
              style={{
                marginLeft: "22%",
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
                marginLeft: "22%",
                fontWeight: "bold",
                fontSize: "24px",
                color: "#2A3E4B",
                marginTop: "0",
                marginBottom: "4px",
              }}
            >
              Deskripsi
            </p>
            <p
              style={{
                marginLeft: "22%",
                fontSize: "16px",
                color: "#2A3E4B",
                marginBottom: "32px",
                whiteSpace: "pre-line",
              }}
            >
              {job.description}
            </p>

            <p
              style={{
                marginLeft: "22%",
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
                marginLeft: "22%",
                fontSize: "16px",
                color: "#2A3E4B",
                marginBottom: "12px",
              }}
            >
              {job.datetime_closes && formatDateTime(job.datetime_closes)}
            </p>
          </React.Fragment>
        )}
        {successMessage && (
          <p
            style={{
              color: "green",
              position: "fixed",
              top: "50%",
              left: "55%",
              transform: "translate(-50%, -50%)",
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            {successMessage}
          </p>
        )}
      </div>
    </React.Fragment>
  );
}

export default DetailJobGA;
