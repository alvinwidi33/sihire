import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SidebarOther from "../components/sidebar-other";

function JobListInternal() {
  const [jobs, setJobs] = useState(null);
  function formatDateTime(datetimeString) {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = new Date(datetimeString).toLocaleDateString(
      "id-ID",
      options
    );
    return formattedDate;
  }

  useEffect(() => {
    const getJobs = async () => {
      await fetch("https://sihire-be.vercel.app/api/job-posting/get-internal/")
        .then((resp) => resp.json())
        .then((data) => {
          setJobs(data);
        });
    };
    getJobs();
  }, []);

  function isJobClosed(datetimeString) {
    const closingDate = new Date(datetimeString);
    const currentDate = new Date();
    return closingDate < currentDate;
  }

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
        Pekerjaan
      </p>
      <SidebarOther />
      <div
        style={{ marginLeft: "22%", position: "absolute", marginTop: "-330px" }}
        className="w-9/12"
      >
        <p
          style={{
            marginLeft: "0",
            fontWeight: "bold",
            fontSize: "32px",
            color: "#2A3E4B",
            marginBottom: "12px",
          }}
        >
          Lowongan Pekerjaan
        </p>
        {jobs && (
          <table
            style={{
              marginLeft: "0",
              borderCollapse: "collapse",
              width: "90%",
            }}
          >
            <thead style={{}}>
              <tr>
                <th
                  style={{
                    border: "2px solid #2A3E4B",
                    padding: "8px",
                    textAlign: "center",
                    fontWeight: "bold",
                    background:"#2A3E4B",
                    color:"white"
                  }}
                >
                  Pekerjaan
                </th>
                <th
                  style={{
                    border: "2px solid #2A3E4B",
                    padding: "8px",
                    textAlign: "center",
                    fontWeight: "bold",
                    background:"#2A3E4B",
                    color:"white"
                  }}
                >
                  Tanggal Tutup
                </th>
                <th
                  style={{
                    border: "2px solid #2A3E4B",
                    padding: "8px",
                    textAlign: "center",
                    fontWeight: "bold",
                    background:"#2A3E4B",
                    color:"white"
                  }}
                >
                  Detail
                </th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr
                  key={job.id}
                  style={
                    isJobClosed(job.datetime_closes)
                      ? { backgroundColor: "#D2D2D2" }
                      : {}
                  }
                >
                  <td
                    style={{
                      border: "2px solid #2A3E4B",
                      padding: "8px",
                      fontFamily: "Inter, sans-serif",
                      fontWeight: "bold",
                      fontSize: "24px",
                      color: "#2A3E4B",
                    }}
                  >
                    {job.job_name}
                  </td>
                  <td style={{ border: "2px solid #2A3E4B", padding: "8px" }}>
                    {formatDateTime(job.datetime_closes)}
                  </td>
                  <td
                    style={{
                      border: "2px solid #2A3E4B",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                    <Link to={`/job-list-other/${job.id}`}>
                      <button
                        style={{
                          width: "90px",
                          padding: "8px",
                          fontSize: "16px",
                          fontFamily: "Inter, sans-serif",
                          fontWeight: "bold",
                          color: "#2A3E4B",
                          borderRadius: "6px",
                          cursor: "pointer",
                          border: "2px solid #2A3E4B",
                        }}
                      >
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

export default JobListInternal;
