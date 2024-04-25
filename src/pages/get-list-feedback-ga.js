import React, { useState, useEffect } from 'react';
import SidebarGA from "../components/sidebar-ga";

function GetListFeedbackGA() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [selectedPosisi, setSelectedPosisi] = useState("None");
  const [selectedRating, setSelectedRating] = useState("None");
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  
  useEffect(() => {
    const getFeedbacks = async () => {
      try {
        const response = await fetch(
          "https://sihire-be.vercel.app/api/job-application/get-feedback/",
          {
            method: "GET",
          }
        );
        const data = await response.json();
        setFeedbacks(data);
        setFilteredFeedbacks(data);
      } catch (error) {
        console.error("Error fetching interview data:", error);
      }
    };
    getFeedbacks();
  }, []);
  
  const handlePosisiChange = (event) => {
    setSelectedPosisi(event.target.value);
    filterFeedbacks(selectedRating, event.target.value);
  };

  const handleRatingChange = (event) => {
    setSelectedRating(event.target.value);
    filterFeedbacks(event.target.value, selectedPosisi);
  };

const filterFeedbacks = (rating, posisi) => {
  if (posisi === "None") {
    const filtered = feedbacks.filter(feedback => {
      return (rating === "None" || feedback.rating === parseInt(rating));
    });
    setFilteredFeedbacks(filtered);
  } else {
    const filtered = feedbacks.filter(feedback => {
      return (
        (rating === "None" || feedback.rating === parseInt(rating)) &&
        (feedback.job.job_name === posisi)
      );
    });
    setFilteredFeedbacks(filtered);
  }
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
        Feedback
      </p>
      <SidebarGA/>
      <div style={{ marginLeft: "22%", position: "absolute", marginTop: "-40px" }} className="w-9/12">
        <p
          style={{
            marginLeft: "0",
            fontWeight: "bold",
            fontSize: "32px",
            color: "#2A3E4B",
            marginTop: "-300px",
            marginBottom: "12px",
          }}
        >
          List Feedback
        </p>
        <div className="py-5 rounded rounded-xl border border-2 border-black" style={{ height: '160px', marginBottom: "12px" }}>
          <h2 className="text-xl font-semibold" style={{ textAlign: "center" }}>Filter Feedback</h2>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom:"4px" }}>
            <p style={{ marginLeft: "22.5%", fontSize: "16px", color: "#2A3E4B", }}>Rating</p>
            <p style={{ marginLeft:"47%", marginRight:"auto", fontSize: "16px", color: "#2A3E4B", }}>Posisi</p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ marginLeft: "2%", border: "2px solid black", borderRadius: "5px", width: "47%", height:"36px" }}>
              <select
                value={selectedRating}
                onChange={handleRatingChange}
                style={{ border: "none", width: "100%", textAlign: "center", height:"32px" }}
              >
                <option value="None">None</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div style={{ marginLeft: "2%", marginRight: "2%", border: "2px solid black", borderRadius: "5px", width: "45%" }}>
              <select
                value={selectedPosisi}
                onChange={handlePosisiChange}
                style={{ border: "none", width: "100%", textAlign: "center", height: "32px" }}
              >
                <option value="None">None</option>
                {feedbacks.map((feedback) => (
                  <option key={feedback.id} value={feedback.job.job_name}>
                    {feedback.job.job_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {filteredFeedbacks.length > 0 ? (
          <table
            style={{
              borderCollapse: "collapse",
              width: "95%",
              padding:"12px",
              marginLeft:"2.5%"
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
                    color:"white",
                    width: "100px" 
                  }}
                >
                  Rating
                </th>
                <th
                  style={{
                    border: "2px solid #2A3E4B",
                    padding: "8px",
                    textAlign: "center",
                    fontWeight: "bold",
                    background:"#2A3E4B",
                    color:"white",
                    width: "180px" 
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
                    color:"white",
                    width: "180px" 
                  }}
                >
                  Nama Pelamar
                </th>
                <th
                  style={{
                    border: "2px solid #2A3E4B",
                    padding: "8px",
                    textAlign: "center",
                    fontWeight: "bold",
                    background:"#2A3E4B",
                    color:"white",
                    width: "180px" 
                  }}
                >
                  Username
                </th>
                <th
                  style={{
                    border: "2px solid #2A3E4B",
                    padding: "8px",
                    textAlign: "center",
                    fontWeight: "bold",
                    background:"#2A3E4B",
                    color:"white",
                    width: "400px" , 
                  }}
                >
                  Deskripsi
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredFeedbacks.map((feedback) => (
                <tr key={feedback.id}>
                  <td
                    style={{
                      border: "2px solid #2A3E4B",
                      padding: "6px",
                      fontFamily: "Inter, sans-serif",
                      fontWeight: "bold",
                      fontSize: "16px",
                      color: "#2A3E4B",
                      textAlign: "center", 
                    }}
                  >
                    {feedback.rating}
                  </td>
                  <td
                    style={{
                      border: "2px solid #2A3E4B",
                      padding: "6px",
                      fontFamily: "Inter, sans-serif",
                      fontWeight: "bold",
                      fontSize: "16px",
                      color: "#2A3E4B",
                      textAlign: "center", 
                    }}
                  >
                    {feedback.job.job_name}
                  </td>
                  <td
                    style={{
                      border: "2px solid #2A3E4B",
                      padding: "6px",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "16px",
                      textAlign: "center", 
                    }}
                  >
                    {feedback.applicant.user?.name}
                  </td>
                  <td
                    style={{
                      border: "2px solid #2A3E4B",
                      padding: "6px",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "16px",
                      textAlign: "center", 
                    }}
                  >
                    {feedback.applicant.user?.username}
                  </td>
                  <td
                    style={{
                      border: "2px solid #2A3E4B",
                      padding: "6px",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "16px",
                      textAlign: "center", 
                    }}
                  >
                    {feedback.feedbacks}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ marginLeft: "42.5%", fontSize: "16px", color: "#2A3E4B" }}>
            Yang Anda Cari tidak ada
          </p>
        )}
      </div>
    </React.Fragment>
  );
}

export default GetListFeedbackGA;
