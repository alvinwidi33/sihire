import React, { useState } from 'react';
import SidebarApplicant from "../components/sidebar-applicant";
import { Link } from "react-router-dom";

function Star({ selected, onSelect }) {
  return (
    <span style={{ fontSize: '60px', color: selected ? '#2A3E4B' : 'gray', cursor: 'pointer' }} onClick={onSelect}>
      ★
    </span>
  );
}

function AddFeedback() {
  const [rating, setRating] = useState(0);

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
              marginLeft: "44%",
              fontSize: "16px",
              color: "#2A3E4B",
              position: "absolute",
              bottom: "350px", 
            }}
          >
            Deskripsi Ulasan
          </p>
          <textarea
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
        </div>
      </div>
    </React.Fragment>
  );
}

export default AddFeedback;
