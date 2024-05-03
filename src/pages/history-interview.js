import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import SidebarGA from "../components/sidebar-ga";

function GetHistoryInterview() {
    const [interviews, setInterviews] = useState([]);
      const [selectedPosisi, setSelectedPosisi] = useState("None");
      const [selectedConfirm, setSelectedConfirm] = useState("None");
      const [filteredHistory, setFilteredHistory] = useState([]);
      const [searchTerm, setSearchTerm] = useState("");
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
          "https://sihire-be.vercel.app/api/interview/get-list-interview-history/",
          {
            method: "GET",
          }
        );
        const data = await response.json();
        setInterviews(data);
        setFilteredHistory(data);
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
const handlePosisiChange = (event) => {
    const selectedPosisi = event.target.value;
    setSelectedPosisi(selectedPosisi);
    filterHistory(selectedConfirm, selectedPosisi, searchTerm);
};
const handleConfirmChange = (event) => {
    const selectedConfirm = event.target.value;
    setSelectedConfirm(selectedConfirm);
    filterHistory(selectedConfirm, selectedPosisi, searchTerm); 
}

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        filterHistory(selectedConfirm, selectedPosisi, event.target.value);
    }
const filterHistory = (confirm, posisi, searchTerm) => {
    const filtered = interviews.filter(interview => {
        const isMatchingConfirm = confirm === "None" || interview.confirm === confirm;
        const isMatchingPosisi = posisi === "None" || (interview.job_application_id.job?.job_name === posisi);
        const isMatchingSearchTerm = searchTerm === "" || interview.job_application_id.applicant.user.name.toLowerCase().includes(searchTerm.toLowerCase());
        
        return isMatchingConfirm && isMatchingPosisi && isMatchingSearchTerm;
    });
    setFilteredHistory(filtered);
};


const uniqueConfirm = Array.from(new Set(interviews.map(interview => interview.confirm)));
const uniqueJobNames = Array.from(new Set(interviews.map(interview => interview.job_application_id.job?.job_name)));
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
      <SidebarGA />
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
            marginTop: "-320px",
           
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
        <div className="py-5 rounded rounded-xl border border-2 border-black" style={{ height: '160px', marginBottom: "12px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom:"4px" }}>
            <p style={{ marginLeft: "21%", fontSize: "16px", color: "#2A3E4B", }}>Konfirmasi</p>
            <p style={{ marginLeft:"47%", marginRight:"auto", fontSize: "16px", color: "#2A3E4B", }}>Posisi</p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ marginLeft: "2%", border: "2px solid black", borderRadius: "5px", width: "47%", height:"36px" }}>
              <select
              value={selectedConfirm}
                onChange={handleConfirmChange}
                style={{ border: "none", width: "100%", textAlign: "center", height:"32px" }}
              >
                <option value="None">None</option>
                  {uniqueConfirm.map((confirm, index) => (
                    <option key={index} value={confirm}>
                      {confirm}
                    </option>
                  ))}

              </select>

            </div>
            <div style={{ marginLeft: "2%", marginRight: "2%", border: "2px solid black", borderRadius: "5px", width: "45%" }}>
              <select
                value={selectedPosisi}
                onChange={handlePosisiChange}
                style={{ border: "none", width: "100%", textAlign: "center", height: "32px" }}
              >
                <option value="None">None</option>
                  {uniqueJobNames.map((jobName, index) => (
                    <option key={index} value={jobName}>
                      {jobName}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div style={{ marginTop: "20px", marginLeft:"16%" }}>
                <input
                    type="text"
                    placeholder="Cari berdasarkan nama pelamar..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={{ textAlign:"center",border: "2px solid black", borderRadius: "5px", height: "36px", padding: "0 10px", width:"80%" }}
                />
            </div>
        </div>
        {filteredHistory.length > 0 ? (
          <table
            style={{
              marginLeft: "0%",
              borderCollapse: "collapse",
              width: "100%",
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
                  Last Updated
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
              {filteredHistory.map((interview) => (
                <tr
                  key={interview.id}
                  style={{
                    backgroundColor:
                      interview.job_application_id.status === "Withdrawn"
                        ? "#FFC0CB"
                        : isDatePassed(interview.datetime_end)
                        ? "#D3D3D3"
                        : interview.job_application_id.status === "Interview"
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
                    {interview.job_application_id.job.job_name}
                  </td>
                  <td
                    style={{
                      border: "2px solid #2A3E4B",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                    {interview.job_application_id.applicant.user.name}
                  </td>
                  <td
                    style={{
                      border: "2px solid #2A3E4B",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                    {interview.datetime_start &&
                      formatDateTime(interview.datetime_start)}
                  </td>
                  <td
                    style={{
                      border: "2px solid #2A3E4B",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                    {interview.datetime_start &&
                      formatTime(interview.datetime_start)}{" "}
                    -{" "}
                    {interview.datetime_end &&
                      formatTime(interview.datetime_end)}
                  </td>
                  <td
                    style={{
                      border: "2px solid #2A3E4B",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                    {interview.interviewer_user_id?.name}
                  </td>
                  <td
                    style={{
                      border: "2px solid #2A3E4B",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                    {interview.job_application_id.status}
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
                      {interview.confirm}
                    </div>
                  </td>
                  <td
                    style={{
                      border: "2px solid #2A3E4B",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                    {interview.created_at &&
                      formatDateTime(interview.created_at)} - {interview.created_at &&
                      formatTime(interview.created_at)}
                  </td>
                  <td
                    style={{ border: "2px solid #2A3E4B", textAlign: "center" }}
                  >
                    <Link to={`/get-list-history-interview/${interview.id}/`}>
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
        ): (
          <p style={{ marginLeft: "42.5%", fontSize: "16px", color: "#2A3E4B" }}>
            Yang Anda Cari tidak ada
          </p>
        )}
      </div>
    </React.Fragment>
  );
}

export default GetHistoryInterview;