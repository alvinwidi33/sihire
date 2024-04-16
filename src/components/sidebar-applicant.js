import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../images/logo.png";

function SidebarApplicant() {
  const [activePage, setActivePage] = useState("Job Posting");
  const [activeUser, setActiveUser] = useState({});
  const token = window.localStorage.getItem("token");
  const navigate = useNavigate();

  const handleClickApplication = () => {
    setActivePage("Application");
    navigate("/my-job-application/");
  };

  const handleClickJobPosting = () => {
    setActivePage("Job Posting");
    navigate("/job-list-applicant");
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
                Job Posting
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
                Application
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
                onClick={() => handleClickMyProfile()}
              >
                My Profile
              </button>
            </li>
          </ul>
        </div>

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

export default SidebarApplicant;
