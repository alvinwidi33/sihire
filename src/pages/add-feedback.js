import React, { useState } from 'react';
import SidebarApplicant from "../components/sidebar-applicant";
import { Link, useParams, useNavigate } from "react-router-dom";

function Star({ selected, onSelect }) {
  return (
    <span style={{ fontSize: '60px', color: selected ? '#2A3E4B' : 'gray', cursor: 'pointer' }} onClick={onSelect}>
      ★
    </span>
  );
}

function AddFeedback() {
  const [successMessage, setSuccessMessage] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const [reviewDescription, setReviewDescription] = useState('');
  const [rating, setRating] = useState(0);
  const handleReviewDescriptionChange = (event) => {
    setReviewDescription(event.target.value);
  };

  const handleStarClick = (starValue) => {
    setRating(starValue);
  };

  const rectangleStyle = {
    width: "90%",
    height: "560px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.4)",
    marginTop: "100px",
    position: "relative", 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0 || reviewDescription.trim() === '') {
      alert("Mohon isi deskripsi ulasan dan beri peringkat sebelum mengirim umpan balik.");
      return;
    }
    const isConfirmed = window.confirm("Apakah Anda yakin ingin mengirim umpan balik?");

    if (isConfirmed) {
      const formattedData = {
        rating: rating,
        feedbacks: reviewDescription
      };

      try {
        const response = await fetch(
          `https://sihire-be.vercel.app/api/job-application/give-feedback/${id}/`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formattedData),
          }
        );

        if (response.ok) {
          setSuccessMessage("Feedback berhasil dikirim!");
        setTimeout(() => {
          setSuccessMessage("");
          navigate(`/job-application-detail/${id}`);
        }, 5000);
        } else {
          console.error("Gagal mengirim ulasan");
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <React.Fragment>
      <div style={{ marginLeft: "22%", position: "absolute", marginTop: "10px" }}>
        <p
          style={{
            fontWeight: "bold",
            fontSize: "32px",
            color: "#2A3E4B",
            marginBottom: "45px",
          }}
        >
          Feedback
        </p>
        <Link to="/get-list-interview-ga">
          <p style={{ display: "inline", marginLeft: "4px", marginTop: "21%" }}>List Wawancara</p>
        </Link>
        <span style={{ display: "inline", marginLeft: "10px" }}>{">"}</span>
        <Link to="/create-interview">
          <p style={{ display: "inline", marginLeft: "4px", marginTop: "21%" }}>Tambah Wawancara</p>
        </Link>
      </div>
      <SidebarApplicant />
      <div style={{ marginLeft: "22%", position: "absolute", marginTop: "-240px" }} className="w-9/12">
        <div className='rectangle' style={rectangleStyle}>
          <p
            style={{
              marginTop: "20px",
              marginLeft: "42.5%",
              fontWeight: "bold",
              fontSize: "32px",
              color: "#2A3E4B",
              position: "absolute",
            }}
          >
            Feedback
          </p>
          <form onSubmit={handleSubmit}>
            <p
              style={{
                marginLeft: "45%",
                fontSize: "16px",
                color: "#2A3E4B",
                position: "absolute",
                bottom: "450px", 
              }}
            >
              Beri Bintang
              <span style={{ color: "red" }}>*</span>
            </p>
            <div style={{ marginLeft: "36%", position: "absolute", bottom: "380px", left: "0", right: "0" }}>
              {[...Array(5)].map((star, index) => (
                <Star
                  key={index}
                  selected={index < rating}
                  onSelect={() => handleStarClick(index + 1)}
                />
              ))}
            </div>
            <p
              style={{
                marginLeft: "43.5%",
                fontSize: "16px",
                color: "#2A3E4B",
                position: "absolute",
                bottom: "350px", 
              }}
            >
              Deskripsi Ulasan
              <span style={{ color: "red" }}>*</span>
            </p>
            <textarea
              value={reviewDescription}
              onChange={handleReviewDescriptionChange}
              style={{
                borderRadius: "5px",
                border: "2px solid #CBD2E0",
                padding: "8px",
                marginTop: "220px",
                marginLeft: "15%",
                fontSize: "14px",
                color: "#2A3E4B",
                position: "absolute",
                width: "70%",
                height: "200px",
                resize: "none",
              }}
            />

            <button
              type="submit"
              style={{
                width: "60%",
                padding: "8px",
                fontSize: "16px",
                fontFamily: "Inter, sans-serif",
                fontWeight: "bold",
                color: "#fff",
                background: "#2A3E4B",
                borderRadius: "6px",
                cursor: "pointer",
                marginTop: "440px",
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

export default AddFeedback;
