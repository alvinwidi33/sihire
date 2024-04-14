import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar-ga";
import { Link } from "react-router-dom";

function AddJobPosting() {
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [jobData, setJobData] = useState({
    job_name: "",
    description: "",
    datetime_closes: "",
  });

  const rectangleStyle = {
    width: "90%",
    height: "640px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    marginLeft: "0%",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.4)",
    marginTop: "-14%",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!jobData.job_name || !jobData.description || !jobData.datetime_closes) {
      setError("Mohon isi semua form!");
      return;
    }

    setError("");
    const isConfirmed = window.confirm("Do you want to submit the form?");

    if (!isConfirmed) {
      return;
    }
    const transformedDate = (() => {
      const [year, month, day] = jobData.datetime_closes.split("-");
      return `${year}-${month}-${day}`;
    })();

    try {
      const response = await fetch(
        "https://sihire-be.vercel.app/api/job-posting/post/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...jobData,
            datetime_closes: transformedDate,
          }),
        }
      );

      if (response.ok) {
        console.log("Job posted successfully!");
        setSuccessMessage("Job berhasil dibuat!");
        setJobData({
          job_name: "",
          description: "",
          datetime_closes: "",
        });
        setTimeout(() => {
          setSuccessMessage("");
        }, 5000);
      } else {
        console.error("Failed to post job:", response.statusText);
      }
    } catch (error) {
      console.error("Error posting job:", error);
    }
  };

  useEffect(() => {
    if (error) {
      const timeoutId = setTimeout(() => {
        setError("");
      }, 5000);

      return () => clearTimeout(timeoutId);
    }
  }, [error]);

  return (
    <React.Fragment>
      <p
        style={{
          marginLeft: "22%",
          fontWeight: "bold",
          fontSize: "32px",
          color: "#2A3E4B",
          position: "absolute",
        }}
      >
        Job
      </p>
      <Sidebar />
      <Link to="/job-list-ga">
        <p
          style={{
            marginLeft: "22%",
            position: "absolute",
            marginTop: "-280px",
          }}
        >
          List Pekerjaan
        </p>
      </Link>
      <p
        style={{ marginLeft: "29%", position: "absolute", marginTop: "-280px", }}
      >
        {">"}
      </p>
      <Link to="/add-job-posting">
        <p
          style={{
            marginLeft: "30%",
            position: "absolute",
            marginTop: "-280px",
          }}
        >
          Tambah Pekerjaan
        </p>
      </Link>
      <div
        style={{ marginLeft: "22%", position: "absolute", marginTop: "-80px" }}
        className="w-9/12"
      >
        <div className="rectangle" style={rectangleStyle}>
          <p
            style={{
              marginTop: "20px",
              marginLeft: "34%",
              fontWeight: "bold",
              fontSize: "32px",
              color: "#2A3E4B",
              position: "absolute",
            }}
          >
            Buat Pekerjaan
          </p>
          <form onSubmit={handleSubmit}>
            <p
              style={{
                marginTop: "80px",
                marginLeft: "7%",
                fontWeight: "600",
                fontSize: "14px",
                color: "#2A3E4B",
                position: "absolute",
              }}
            >
              Judul Pekerjaan
              <span style={{ color: "red" }}>*</span>
            </p>
            <input
              type="text"
              style={{
                borderRadius: "5px",
                border: "2px solid #CBD2E0",
                padding: "8px",
                marginTop: "110px",
                marginLeft: "7%",
                fontSize: "14px",
                color: "#2A3E4B",
                position: "absolute",
                width: "76%",
              }}
              required
              value={jobData.job_name}
              onChange={(e) =>
                setJobData({ ...jobData, job_name: e.target.value })
              }
            />
            <p
              style={{
                marginTop: "180px",
                marginLeft: "7%",
                fontWeight: "600",
                fontSize: "14px",
                color: "#2A3E4B",
                position: "absolute",
              }}
            >
              Deskripsi
              <span style={{ color: "red" }}>*</span>
            </p>
            <textarea
              style={{
                borderRadius: "5px",
                border: "2px solid #CBD2E0",
                padding: "8px",
                marginTop: "210px",
                marginLeft: "7%",
                fontSize: "14px",
                color: "#2A3E4B",
                position: "absolute",
                width: "76%",
                height: "200px",
                resize: "none",
              }}
              required
              value={jobData.description}
              onChange={(e) =>
                setJobData({ ...jobData, description: e.target.value })
              }
            />
            <p
              style={{
                marginTop: "440px",
                marginLeft: "7%",
                fontWeight: "600",
                fontSize: "14px",
                color: "#2A3E4B",
                position: "absolute",
              }}
            >
              Tanggal Tutup
              <span style={{ color: "red" }}>*</span>
            </p>
            <input
              type="date"
              style={{
                borderRadius: "5px",
                border: "2px solid #CBD2E0",
                padding: "8px",
                marginTop: "470px",
                marginLeft: "7%",
                fontSize: "14px",
                color: "#2A3E4B",
                position: "absolute",
                width: "76%",
              }}
              required
              value={
                jobData.datetime_closes
                  ? new Date(jobData.datetime_closes)
                      .toISOString()
                      .split("T")[0]
                  : ""
              }
              onChange={(e) =>
                setJobData({ ...jobData, datetime_closes: e.target.value })
              }
              min={new Date().toISOString().split("T")[0]}
            />
            {error && (
              <p
                style={{
                  color: "red",
                  position: "fixed",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                {error}
              </p>
            )}
            <button
              type="submit"
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
                marginTop: "52%",
                marginBottom: "12px",
                border: "2px solid #2A3E4B",
                marginLeft: "20%",
                position: "absolute",
              }}
            >
              Submit
            </button>
          </form>
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
      </div>
    </React.Fragment>
  );
}

export default AddJobPosting;
