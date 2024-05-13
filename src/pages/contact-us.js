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

  const handleContactWhatsApp = () => {
    window.open("https://api.whatsapp.com/send?phone=6281802532929");
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
    justifyContent: "space-between",
  };

  const formContainerStyle = {
    flexBasis: "45%",
  };

  const imageContainerStyle = {
    flexBasis: "45%", 
    marginLeft: "5%",
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
            {/* <div>
              <label style={labelStyle} htmlFor="subject">Subject:</label>
              <input
                type="text"
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                style={inputStyle}
              />
            </div> */}
            <div style={{marginTop:'20px', marginBottom:'50px'}}>
              {/* <label style={labelStyle} htmlFor="message">Butuh bantuan untuk proyek Anda atau punya pertanyaan? Jangan ragu untuk menghubungi kami:</label> */}
              {/* <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                style={{ ...inputStyle, height: "150px", resize: "none" }}
              /> */}
<p>Butuh bantuan untuk proyek Anda atau punya pertanyaan? Jangan ragu untuk menghubungi kami:</p>
    <p>Kontak:</p>
    <p><span>📞</span> +62 818 0253 2929</p>
    <p><span>📧</span> <a href="mailto:petrakonindonesia@gmail.com">petrakonindonesia@gmail.com</a></p>
    <p><span>📱</span> <a href="https://instagram.com/petrakon.id">@petrakon.id</a></p>
            </div>
            {/* <button type="submit" style={buttonStyle}>Send Email</button> */}
            <button type="button" onClick={handleContactWhatsApp} style={buttonStyle}>Hubungi WhatsApp</button>
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
