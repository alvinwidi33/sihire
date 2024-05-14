import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../images/logo.png";

function SidebarGA() {
  const [activePage, setActivePage] = useState("Job Posting");
  const [activeUser, setActiveUser] = useState(null);
  const token = window.localStorage.getItem("token");
  const navigate = useNavigate();

  const handleClickApplication = () => {
    setActivePage("Applicants");
    navigate("/applicants");
  };

  const handleClickJobPosting = () => {
    setActivePage("Job Posting");
    navigate("/job-list-ga");
  };

  const handleClickFeedback = () => {
    setActivePage("Feedback");
    navigate("/get-list-feedback-ga");
  };
  const handleClickInterview = () => {
    setActivePage("Interview");
    navigate("/get-list-interview-ga");
  };
  const handleClickOnBoarding = () => {
    setActivePage("On Boarding");
    navigate("/get-list-onboarding-internal");
  };

  const handleClickMyProfile = () => {
    setActivePage("My Profile");
    navigate("/my-profile");
  };

  const getUser = async () => {
    const response = await fetch(
      `https://sihire-be.vercel.app/api/users/get-user-by-token/${token}/`,
      {
        method: "GET",
      }
    );

    if (response.ok) {
      var json_response = await response.json();
      setActiveUser(json_response);
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "https://sihire-be.vercel.app/api/users/logout/",
        {
          method: "POST",
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (response.ok) {
        var json_response = await response.json();
        localStorage.removeItem("token");
        console.log("Logout successful");
        window.location.href = "/login";
      } else {
        console.error("logout failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const profilePictureStyle = {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    backgroundColor: "#F2F2F2",
    backgroundSize: "cover",
    border: "2px solid grey",
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <React.Fragment>
      <div
        className="vertical-line"
        style={{
          marginLeft: "18%",
          height: "160%",
          borderLeft: "2px solid #2A3E4B",
          position: "absolute",
          top: "0",
          bottom: "0",
        }}
      ></div>
      <div className="h-full flex flex-col justify-between">
        <div style={{ position: "relative" }}>
          <img
            src={Logo}
            alt="Logo"
            style={{
              width: "169px",
              height: "48px",
              marginBottom: "20px",
              marginTop: "12px",
              marginLeft: "2%",
            }}
          />
          <div
            className="horizontal-line"
            style={{
              marginLeft: "18%",
              width: "86%",
              height: "2px",
              borderTop: "2px solid #2A3E4B",
              marginBottom: "20px",
              marginRight: "10px",
            }}
          ></div>
        </div>
        <div className="sidebar" style={{ marginTop: "2px" }}>
          <ul>
            <li>
              <button
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: "medium",
                  display: "block",
                  marginBottom: "16px",
                  border: "none",
                  height: "32px",
                  width: "18%",
                  textAlign: "left",
                  paddingLeft: "2%",
                }}
                onClick={() => handleClickJobPosting()}
              >
                Lowongan Pekerjaan
              </button>
            </li>
            <li>
              <button
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: "medium",
                  display: "block",
                  marginBottom: "16px",
                  border: "none",
                  height: "32px",
                  width: "18%",
                  textAlign: "left",
                  paddingLeft: "2%",
                }}
                onClick={() => handleClickApplication()}
              >
                Pelamar
              </button>
            </li>
            <li>
              <button
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: "medium",
                  display: "block",
                  marginBottom: "16px",
                  border: "none",
                  height: "32px",
                  width: "18%",
                  textAlign: "left",
                  paddingLeft: "2%",
                }}
                onClick={() => handleClickFeedback()}
              >
                Ulasan
              </button>
            </li>
            <li>
              <button
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: "medium",
                  display: "block",
                  marginBottom: "16px",
                  border: "none",
                  height: "32px",
                  width: "18%",
                  textAlign: "left",
                  paddingLeft: "2%",
                }}
                onClick={() => handleClickInterview()}
              >
                Wawancara
              </button>
            </li>
            <li>
              <button
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: "medium",
                  display: "block",
                  marginBottom: "16px",
                  border: "none",
                  height: "32px",
                  width: "18%",
                  textAlign: "left",
                  paddingLeft: "2%",
                }}
                onClick={() => handleClickOnBoarding()}
              >
                On Boarding
              </button>
            </li>
          </ul>
        </div>

        {activeUser && (
          <a
            href="/my-profile"
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: "medium",
              margin: "16px 0px 16px 0px",
              border: "none",
              height: "32px",
              width: "18%",
              textAlign: "left",
              paddingLeft: "2%",
            }}
            className="flex gap-4 items-center"
          >
            {activeUser.foto ? (
              <img
                src={activeUser.foto}
                alt="Profile Pic"
                style={profilePictureStyle}
              />
            ) : (
              <img
                src="https://cdn-icons-png.flaticon.com/512/709/709699.png"
                alt="Profile Pic"
                style={profilePictureStyle}
              />
            )}

            <p>{activeUser.name}</p>
          </a>
        )}

        <button
          onClick={handleLogout}
          className="ml-10"
          style={{
            width: "90px",
            padding: "8px",
            fontSize: "16px",
            fontFamily: "Inter, sans-serif",
            color: "#fff",
            borderRadius: "6px",
            cursor: "pointer",
            border: "2px solid #2A3E4B",
            background: "#2A3E4B",
          }}
        >
          Log Out
        </button>
      </div>
    </React.Fragment>
  );
}

export default SidebarGA;
