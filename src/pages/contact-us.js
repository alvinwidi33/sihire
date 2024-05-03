import React, { useState } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Fotocontact from "../images/contactus.png";

function ContactUs() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSendEmail = (e) => {
    e.preventDefault();
    const emailSubject = encodeURIComponent(subject);
    const emailMessage = encodeURIComponent(message);
    window.location.href = `mailto:fiberglobeauty@gmail.com?subject=${emailSubject}&body=${emailMessage}`;
  };  

  const rectangleStyle = {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.4)",
    margin: "auto",
    marginTop: "8%",
    padding: "20px",
    position: "relative",
    display: "flex",
  };

  const formContainerStyle = {
    flexBasis: "50%",
  };

  const imageContainerStyle = {
    flexBasis: "50%",
    marginLeft: "20px", // Add spacing between form and image
  };

  const imageStyle = {
    marginTop: "20px",
    width: "100%",
    height: "auto",
    display: "block",
    borderRadius: "7px",
  };

  const labelStyle = {
    fontWeight: "600",
    fontSize: "14px",
    color: "#2A3E4B",
    marginBottom: "5px",
  };

  const inputStyle = {
    borderRadius: "5px",
    border: "2px solid #CBD2E0",
    padding: "8px",
    width: "100%",
    fontSize: "14px",
    color: "#2A3E4B",
    marginBottom: "15px",
  };

  const buttonStyle = {
    width: "50%",
    padding: "8px",
    fontSize: "16px",
    fontFamily: "Inter, sans-serif",
    fontWeight: "bold",
    color: "#fff",
    background: "#2A3E4B",
    borderRadius: "6px",
    cursor: "pointer",
    border: "2px solid #2A3E4B",
    alignSelf: "center",
  };

  return (
    <React.Fragment>
      <Navbar />
      <div className="rectangle" style={rectangleStyle}>
        <div style={formContainerStyle}>
          <h2 style={{fontWeight: 'bold', fontSize: '32px', color: '#2A3E4B' }}>Contact Us</h2>
          <form onSubmit={handleSendEmail}>
            <div>
              <label style={labelStyle} htmlFor="subject">Subject:</label>
              <input
                type="text"
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle} htmlFor="message">Message:</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                style={{ ...inputStyle, height: "150px", resize: "none" }}
              />
            </div>
            <button type="submit" style={buttonStyle}>Send Email</button>
          </form>
        </div>
        <div style={imageContainerStyle}>
          <img src={Fotocontact} alt="Contact Us" style={imageStyle} />
        </div>
      </div>
      <Footer marginTop="47%" /> {/* Adjust marginTop as needed */}
    </React.Fragment>
  );
}

export default ContactUs;
