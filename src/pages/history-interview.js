import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SidebarOther from "../components/sidebar-other"; 

function GetHistoryInterview() {
    const [interviews, setInterviews] = useState([]);

  function formatTime(datetimeString) {
    const dateTime = new Date(datetimeString);
    const hours = dateTime.getHours().toString().padStart(2, "0");
    const minutes = dateTime.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  function formatDateTime(datetimeString) {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const formattedDate = new Date(datetimeString).toLocaleDateString(
      "id-ID",
      options
    );
    return formattedDate;
  }

  useEffect(() => {
    const getInterviews = async () => {
      try {
        const response = await fetch(
          "https://sihire-be.vercel.app/api/interview/get-list-history/",
          {
            method: "GET",
          }
        );
        const data = await response.json();
        setInterviews(data);
      } catch (error) {
        console.error("Error fetching interview data:", error);
      }
    };
    getInterviews();
  }, []);

  const isDatePassed = (datetimeString) => {
    const interviewDate = new Date(datetimeString);
    const currentDate = new Date();
    return interviewDate < currentDate;
  };

  return (
    <React.Fragment>
      <p
        style={{
          marginLeft: "22%",
          fontWeight: "bold",
          fontSize: "32px",
          color: "#2A3E4B",
          position: "absolute",
          marginTop: "12px",
        }}
      >
        Wawancara
      </p>
      <SidebarOther />
      <div
        style={{ marginLeft: "22%", position: "absolute", marginTop: "-40px" }}
        className="w-9/12"
      >
        <p
          style={{
            marginLeft: "0",
            fontWeight: "bold",
            fontSize: "32px",
            color: "#2A3E4B",
            marginTop: "-300px",
            marginBottom: "32px",
          }}
        >
          List History Wawancara
        </p>
        <Link to="/get-list-interview-ga">
          <p style={{ display: "inline", marginLeft: "4px", marginTop:"21%" }}>List Wawancara</p>
        </Link>
        <span style={{ display: "inline", marginLeft: "10px" }}>{">"}</span>
        <Link to="/get-list-history-interview">
          <p style={{ display: "inline", marginLeft: "4px", marginTop:"21%" }}>History Wawancara</p>
        </Link>
        {interviews && (
          <table
            style={{
              marginLeft: "0%",
              borderCollapse: "collapse",
              width: "88%",
              padding:"12px",
              marginTop:"20px"
            }}
          >
            <thead>
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
                  Posisi
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
                  Pelamar
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
                  Tanggal
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
                  Waktu
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
                  Pewawancara
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
                  Status
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
                  Konfirmasi
                </th>
                <th
                  style={{
                    border: "2px solid #2A3E4B",
                    padding: "8px",
                    textAlign: "center",
                    fontWeight: "bold",
                    width: "180px",
                    background:"#2A3E4B",
                    color:"white"
                  }}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {interviews.map((interview) => (
                <tr
                  key={interview.interview.id}
                  style={{
                    backgroundColor:
                      interview.interview.job_application_id.status === "Withdrawn"
                        ? "#FFC0CB"
                        : isDatePassed(interview.interview.datetime_end)
                        ? "#D3D3D3"
                        : interview.interview.job_application_id.status === "Interview"
                        ? "#FFFFFF"
                        : "#D3D3D3",
                  }}
                >
                  <td
                    style={{
                      border: "2px solid #2A3E4B",
                      padding: "8px",
                      fontFamily: "Inter, sans-serif",
                      fontWeight: "bold",
                      fontSize: "20px",
                      color: "#2A3E4B",
                      textAlign: "center",
                    }}
                  >
                    {interview.interview.job_application_id.job.job_name}
                  </td>
                  <td
                    style={{
                      border: "2px solid #2A3E4B",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                    {interview.interview.job_application_id.applicant.user.name}
                  </td>
                  <td
                    style={{
                      border: "2px solid #2A3E4B",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                    {interview.interview.datetime_start &&
                      formatDateTime(interview.interview.datetime_start)}
                  </td>
                  <td
                    style={{
                      border: "2px solid #2A3E4B",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                    {interview.interview.datetime_start &&
                      formatTime(interview.interview.datetime_start)}{" "}
                    -{" "}
                    {interview.interview.datetime_end &&
                      formatTime(interview.interview.datetime_end)}
                  </td>
                  <td
                    style={{
                      border: "2px solid #2A3E4B",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                    {interview.interview.interviewer_user_id?.name}
                  </td>
                  <td
                    style={{
                      border: "2px solid #2A3E4B",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                    {interview.interview.job_application_id.status}
                  </td>
                  <td
                    style={{
                      border: "2px solid #2A3E4B",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        color: "#fff",
                        background: "#2A3E4B",
                        fontSize: "12px",
                        width: "90px",
                        height: "32px",
                        borderRadius: "90px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: "auto",
                      }}
                    >
                      {interview.interview.confirm}
                    </div>
                  </td>
                  <td
                    style={{ border: "2px solid #2A3E4B", textAlign: "center" }}
                  >
                    <Link to={`/get-list-interview-other/${interview.id}`}>
                      <button
                        style={{
                          width: "42%",
                          padding: "8px",
                          fontSize: "16px",
                          fontFamily: "Inter, sans-serif",
                          fontWeight: "bold",
                          color: "#2A3E4B",
                          borderRadius: "6px",
                          cursor: "pointer",
                          border: "2px solid #2A3E4B",
                          marginRight: "4px",
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

export default GetHistoryInterview;