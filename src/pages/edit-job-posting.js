import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SidebarGA from "../components/sidebar-ga";

function EditJobPosting() {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const { id } = useParams();
  function formatDateTime(datetimeString) {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = new Date(datetimeString).toLocaleDateString(
      "id-ID",
      options
    );
    return formattedDate;
  }
  const [jobData, setJobData] = useState({
    job_name: "",
    description: "",
    datetime_closes: "",
  });
  const [job, setJob] = useState(null);

  useEffect(() => {
    const getJob = async () => {
      try {
        const response = await fetch(
          `https://sihire-be.vercel.app/api/job-posting/get/${id}/`
        );
        const data = await response.json();
        setJob(data);

        //Mengurangi 1 hari dari tanggal yang diterima untuk menyesuaikan zona waktu
        const adjustedDate = new Date(data.datetime_closes);
        adjustedDate.setDate(adjustedDate.getDate() + 1);

        // Pastikan bahwa datetime_closes tidak kosong atau null sebelum diformat
        if (data.datetime_closes) {
          setJobData({
            job_name: data.job_name,
            description: data.description,
            datetime_closes: formatDateTime(adjustedDate),
          });
        } else {
          setJobData({
            job_name: data.job_name,
            description: data.description,
            datetime_closes: "", // Atur nilai default jika datetime_closes kosong
          });
        }
      } catch (error) {
        console.error("Error fetching job:", error);
      }
    };
    getJob();
  }, [id]);

  const rectangleStyle = {
    width: "90%",
    height: "650px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.4)",
    marginTop: "-5%",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isConfirmed = window.confirm("Do you want to submit the form?");
    if (!isConfirmed) {
      return;
    }

    try {
      const transformedDate = jobData.datetime_closes
        ? new Date(jobData.datetime_closes).toISOString().split("T")[0]
        : null;
      const response = await fetch(
        `https://sihire-be.vercel.app/api/job-posting/edit/${id}/`,
        {
          method: "PUT",
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
        console.log("Job updated successfully!");
        setSuccessMessage("Job berhasil diperbarui!");
        setTimeout(() => {
          setSuccessMessage("");
          navigate("/job-list-ga");
        }, 5000);
      } else {
        console.error("Failed to update job:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  return (
    <React.Fragment>
      <div style={{ marginLeft: "22%", position: "absolute", marginTop:"100px" }}>
        <Link to="/job-list-ga">
          <p style={{ display: "inline", marginLeft: "4px" }}>List Pekerjaan</p>
        </Link>
        <span style={{ display: "inline", marginLeft: "10px" }}>{">"}</span>
        {job && (
          <React.Fragment key={job.id}>
            <Link to={`/job-list-ga/${job.id}`}>
              <p style={{ display: "inline", marginLeft: "10px" }}>
                Detail
              </p>
            </Link>
            <span style={{ display: "inline", marginLeft: "10px" }}>{">"}</span>
            <Link to={`/job-list-ga/${job.id}/edit`}>
              <p style={{ display: "inline", marginLeft: "10px" }}>Edit Job</p>
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
      <SidebarGA />
      <div
        style={{ marginLeft: "22%", position: "absolute", marginTop: "-240px" }}
        className="w-9/12"
      >
        <div className="rectangle" style={rectangleStyle}>
          <p
            style={{
              marginTop: "12px",
              marginLeft: "32%",
              fontWeight: "bold",
              fontSize: "36px",
              color: "#2A3E4B",
              position: "absolute",
            }}
          >
          Ubah Pekerjaan
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
            </p>
            {job && (
              <React.Fragment key={job.id}>
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
                  value={jobData.job_name}
                  disabled
                  readOnly
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
                </p>
                <textarea
                  value={jobData.description}
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
                  onChange={(e) =>
                    setJobData({
                      ...jobData,
                      description: e.target.value,
                    })
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
              </React.Fragment>
            )}
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
                marginTop: "53%",
                marginBottom: "8px",
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

export default EditJobPosting;
