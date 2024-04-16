import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import Popup from "../components/popup";
import InterviewPopup from "../components/popupInterview";
import SidebarApplicant from "../components/sidebar-applicant";

const MyJobApplication = () => {
  const token = window.localStorage.getItem("token");
  const [applicant, setApplicant] = useState(null);
  const [jobApplications, setJobApplications] = useState(null);
  const [onboardingData, setOnboardingData] = useState(null);
  const [interviewData, setInterviewData] = useState(null);
  const [activeTab, setActiveTab] = useState("applications");
  const [isPopupVisible, setPopupVisibility] = useState(false);
  const [confirmationId, setConfirmationId] = useState(null);
  const [isInterviewPopupVisible, setInterviewPopupVisibility] =
    useState(false);
  const [interviewConfirmationId, setInterviewConfirmationId] = useState(null);

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
    if (applicant) {
      const getJobApplications = async () => {
        try {
          const response = await fetch(
            `https://sihire-be.vercel.app/api/job-application/get/${applicant}/`
          );
          const data = await response.json();
          setJobApplications(data);
        } catch (error) {
          console.error("Error fetching job applications:", error);
        }
      };

      const getOnboardingData = async () => {
        try {
          const response = await fetch(
            `https://sihire-be.vercel.app/api/onboarding/get-list-onboarding/${applicant}/`
          );
          const data = await response.json();
          setOnboardingData(data);
        } catch (error) {
          console.error("Error fetching onboarding data:", error);
        }
      };

      const getInterviewData = async () => {
        try {
          const response = await fetch(
            `https://sihire-be.vercel.app/api/interview/get-list-interview/${applicant}/`
          );
          const data = await response.json();
          setInterviewData(data);
        } catch (error) {
          console.error("Error fetching interview data:", error);
        }
      };

      getJobApplications();
      getOnboardingData();
      getInterviewData();
    }
  }, [applicant]);

  useEffect(() => {
    const getApplicant = async () => {
      const response = await fetch(
        `https://sihire-be.vercel.app/api/users/get-user-by-token/${token}/`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        var json_response = await response.json();
        console.log(json_response);
        setApplicant(json_response.applicant_id);
      }
    };

    getApplicant();
  }, []);

  const handleConfirmation = (id) => {
    setConfirmationId(id);
    console.log("varasss", id);
    setPopupVisibility(true);
  };

  const handleInterviewConfirmation = (id) => {
    setInterviewConfirmationId(id);
    setInterviewPopupVisibility(true);
  };

  // const handleAccept = () => {
  //   console.log(`Accepted onboarding with ID ${confirmationId}`);
  //   setPopupVisibility(false);
  // };

  const handleProposeAnotherTime = (id) => {
    console.log(`Proposed another time for onboarding with ID ${id}`);
    // Close the popup
    setPopupVisibility(false);
    // Redirect to the Onboarding Declined page
    // history.push(`/onboarding-declined/${id}`);
  };

  const handleClosePopup = () => {
    setPopupVisibility(false); // Update the state to hide the popup
  };

  const handleCloseInterviewPopup = () => {
    setInterviewPopupVisibility(false);
  };

  const handleWithdraw = async (id) => {
    try {
      const response = await fetch(
        `https://sihire-be.vercel.app/api/job-application/put/${id}/edit-status/`,
        {
          method: "PATCH", // Assuming PATCH method is used for withdrawal
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "Withdrawn", // Update the status to 'Withdrawn'
          }),
        }
      );

      if (response.ok) {
        // If the withdrawal is successful, update the local state to reflect the changed status
        const updatedJobApplications = jobApplications.map((application) => {
          if (application.id === id) {
            return { ...application, status: "Withdrawn" };
          }
          return application;
        });
        setJobApplications(updatedJobApplications);
      } else {
        console.error("Failed to withdraw application");
      }
    } catch (error) {
      console.error("Error withdrawing application:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      // Make a PATCH request to update the confirmation status to 'No'
      const response = await fetch(
        `https://sihire-be.vercel.app/api/onboarding/edit-onboarding-applicant/${id}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            confirm: "No", // Update confirm status to 'No'
          }),
        }
      );

      if (response.ok) {
        // Reload the page after successful update
        window.location.reload();
      } else {
        console.error("Failed to update confirmation status");
      }
    } catch (error) {
      console.error("Error updating confirmation status:", error);
    }
  };

  const handleAcceptInterview = async (e) => {
    e.preventDefault();

    const url = `https://sihire-be.vercel.app/api/interview/edit-interview-applicant/${interviewConfirmationId}/`;

    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          confirm: "Yes",
        }),
      });

      if (response.ok) {
        console.log("Confirmation status updated successfully");
        window.location.reload();
      } else {
        console.error("Failed to update confirmation status");
      }
    } catch (error) {
      console.error("Error updating confirmation status:", error);
    }
  };

  const handleAccept = async () => {
    try {
      // Make a PATCH request to update the confirmation status
      const response = await fetch(
        `https://sihire-be.vercel.app/api/onboarding/edit-onboarding-applicant/${confirmationId}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            confirm: "Yes", // Update confirm status to 'Yes'
          }),
        }
      );

      if (response.ok) {
        // Update the local state or fetch onboarding data again
        // This is optional, you can update the state accordingly
        console.log("Confirmation status updated successfully");
        window.location.reload();
      } else {
        console.error("Failed to update confirmation status");
      }
    } catch (error) {
      console.error("Error updating confirmation status:", error);
    }
  };

  const PageContainer = styled.div`
    padding: 20px;
  `;

  const Title = styled.h1`
    font-weight: bold;
    font-size: 32px;
    color: #2a3e4b;
    border-bottom: 2px solid #2a3e4b;
    margin-bottom: 20px;
  `;

  const TabContainer = styled.div`
    display: flex;
    margin-bottom: 20px;
  `;

  const TabButton = styled.button`
    padding: 10px 20px;
    background-color: ${(props) => (props.active ? "#2D3648" : "#FFF")};
    color: ${(props) => (props.active ? "#FFF" : "#2D3648")};
    border: none;
    border-bottom: 2px solid
      ${(props) => (props.active ? "#FFF" : "transparent")};
    border-radius: 5px 5px 0 0;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
      background-color: #2d3648;
      color: #fff;
    }
  `;

  const ContentContainer = styled.div`
    display: ${(props) => (props.active ? "block" : "none")};
  `;

  const SubTitle = styled.h2`
    font-weight: bold;
    font-size: 32px;
    color: #2a3e4b;
    margin-top: 20px;
  `;

  const Table = styled.table`
    border-collapse: collapse;
    width: 100%;
  `;

  const Th = styled.th`
    border: 2px solid #2a3e4b;
    padding: 8px;
    text-align: center;
    font-weight: bold;
  `;

  const Td = styled.td`
    border: 2px solid #2a3e4b;
    padding: 8px;
    text-align: center;
  `;

  const Button = styled.button`
    padding: 8px;
    font-size: 16px;
    font-family: Inter, sans-serif;
    font-weight: bold;
    color: ${(props) => (props.primary ? "#fff" : "#2a3e4b")};
    background-color: ${(props) => (props.primary ? "#2a3e4b" : "transparent")};
    border: 2px solid #2a3e4b;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
      background-color: ${(props) => (props.primary ? "#193047" : "#2a3e4b")};
      color: #fff;
    }
  `;

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
        Job Applications
      </p>
      <SidebarApplicant />

      <div
        style={{ marginLeft: "22%", position: "absolute", marginTop: "-180px" }}
        className="w-9/12"
      >
        <TabContainer>
          <TabButton
            active={activeTab === "applications"}
            onClick={() => setActiveTab("applications")}
          >
            My Applications
          </TabButton>
          <TabButton
            active={activeTab === "interviews"}
            onClick={() => setActiveTab("interviews")}
          >
            My Interviews
          </TabButton>
          <TabButton
            active={activeTab === "onboarding"}
            onClick={() => setActiveTab("onboarding")}
          >
            My Onboarding
          </TabButton>
        </TabContainer>

        <ContentContainer active={activeTab === "applications"}>
          <SubTitle>My Applications</SubTitle>
          <Table>
            <thead>
              <tr>
                <Th>Pekerjaan</Th>
                <Th>Status</Th>
                <Th>Detail</Th>
                <Th>Withdraw</Th>
              </tr>
            </thead>
            <tbody style={{ backgroundColor: "#D2D2D2" }}>
              {jobApplications &&
                jobApplications.map((jobApplication) => (
                  <tr key={jobApplication.id}>
                    <Td>{jobApplication.job.job_name}</Td>
                    <Td>{jobApplication.status}</Td>
                    <Td>
                      <Link to={`/job-application-detail/${jobApplication.id}`}>
                        <Button>Detail</Button>
                      </Link>
                    </Td>
                    <Td>
                      <Button
                        primary
                        onClick={() => handleWithdraw(jobApplication.id)}
                      >
                        Withdraw
                      </Button>
                    </Td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </ContentContainer>

        <ContentContainer active={activeTab === "interviews"}>
          <SubTitle>My Interviews</SubTitle>
          <Table>
            <thead style={{ backgroundColor: "#D2D2D2" }}>
              <tr>
                <Th>Pekerjaan</Th>
                <Th>Tanggal</Th>
                <Th>Waktu</Th>
                <Th>Status</Th>
                <Th>Action</Th>
              </tr>
            </thead>
            <tbody>
              {interviewData &&
                interviewData.map((interview) => (
                  <tr key={interview.id}>
                    <Td>{interview.job_application_id.job.job_name}</Td>
                    <Td>{interview.datetime_start.split("T")[0]}</Td>
                    <Td>{interview.datetime_start.slice(11, 16)}</Td>
                    <Td>{interview.confirm}</Td>
                    {interview.confirm === "Confirm" && (
                      <Button primary>Batalkan</Button>
                    )}
                    <Td>
                      {interview.confirm === "Not Confirm" ? (
                        <Button
                          primary
                          onClick={() =>
                            handleInterviewConfirmation(interview.id)
                          }
                        >
                          Konfirmasi
                        </Button>
                      ) : (
                        <p>-</p>
                      )}
                    </Td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </ContentContainer>

<<<<<<< HEAD
        <ContentContainer active={activeTab === 'onboarding'}>
        <SubTitle>My Onboarding</SubTitle>
        <Table>
          <thead style={{ backgroundColor: "#D2D2D2" }}>
            <tr>
              <Th>Pekerjaan</Th>
              <Th>Tanggal</Th>
              <Th>Waktu</Th>
              <Th>Status</Th>
              <Th>Konfirmasi</Th>
              <Th>Add Data Diri</Th> {/* New column header */}
            </tr>
          </thead>
          <tbody>
            {onboardingData &&
              onboardingData.map((onboarding) => (
                <tr key={onboarding.id}>
                  <Td>{onboarding.job_application_id.job.job_name}</Td>
                  <Td>{onboarding.datetime_start && formatDateTime(onboarding.datetime_start)}</Td>
                  <Td>{onboarding.datetime_start && formatTime(onboarding.datetime_start)} - {onboarding.datetime_end && formatTime(onboarding.datetime_end)}</Td>
                  <Td>{onboarding.confirm}</Td>
                  <Td>
                    {/* Konfirmasi button */}
                    <Button primary style={{ marginRight: '8px' }} onClick={() => handleConfirmation(onboarding.id)}>Konfirmasi</Button>
                    {/* Tolak button */}
                    <Button onClick={() => handleReject(onboarding.id)}>Tolak</Button>
                  </Td>
                  <Td>
                    {/* Add Data Diri button */}
                    <Link to={`/create-datadiri/${onboarding.id}`}>
                      <Button primary>Add Data Diri</Button>
                    </Link>
                  </Td>
                </tr>
              ))}
          </tbody>
        </Table>
      </ContentContainer>
=======
        <ContentContainer active={activeTab === "onboarding"}>
          <SubTitle>My Onboarding</SubTitle>
          <Table>
            <thead>
              <tr>
                <Th>Job Title</Th>
                <Th>Tanggal</Th>
                <Th>Waktu</Th>
                <Th>Status</Th>
                <Th>Konfirmasi</Th>
              </tr>
            </thead>
            <tbody>
              {onboardingData &&
                onboardingData.map((onboarding) => (
                  <tr key={onboarding.id}>
                    <Td>{onboarding.job_application_id.job.job_name}</Td>
                    <Td>
                      {onboarding.datetime_start &&
                        formatDateTime(onboarding.datetime_start)}
                    </Td>
                    <Td>
                      {onboarding.datetime_start &&
                        formatTime(onboarding.datetime_start)}{" "}
                      -{" "}
                      {onboarding.datetime_end &&
                        formatTime(onboarding.datetime_end)}
                    </Td>
                    <Td>{onboarding.confirm}</Td>
                    <Td>
                      {/* Konfirmasi button */}
                      <Button
                        primary
                        onClick={() => handleConfirmation(onboarding.id)}
                      >
                        Konfirmasi
                      </Button>
                      {/* Tolak button */}
                      <Button onClick={() => handleReject(onboarding.id)}>
                        Tolak
                      </Button>
                    </Td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </ContentContainer>
>>>>>>> 668cadcd5e2c3d4e4ac432cb8a56698ac00eab80

        {/* Render the Popup component */}
        <InterviewPopup
          isVisible={isInterviewPopupVisible}
          id={interviewConfirmationId}
          onAccept={handleAcceptInterview}
          onClose={handleCloseInterviewPopup}
        />
        <Popup
          isVisible={isPopupVisible}
          id={confirmationId}
          onAccept={handleAccept}
          onClose={handleClosePopup}
        />
      </div>
    </React.Fragment>
  );
};

export default MyJobApplication;
