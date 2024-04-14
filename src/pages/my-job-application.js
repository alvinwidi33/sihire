import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "../components/sidebar-applicant";

const MyJobApplication = () => {
  const { applicant } = useParams();
  const [jobApplications, setJobApplications] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [onboardings, setOnboardings] = useState([]);
  const [activeTab, setActiveTab] = useState("applications");

  const getJobApplications = async () => {
    try {
      const response = await fetch(
        `https://sihire-be.vercel.app/api/job-application/get/${applicant}/`
      );
      const data = await response.json();
      setJobApplications(data);
    } catch (error) {
      console.error("Error fetching job:", error);
    }
  };

  const getInterviews = async () => {
    try {
      const response = await fetch(
        `https://sihire-be.vercel.app/api/interview/get-list-interview/${applicant}/`
      );
      const data = await response.json();
      setInterviews(data);
    } catch (error) {
      console.error("Error fetching interviews:", error);
    }
  };

  const getOnboardings = async () => {
    try {
      const response = await fetch(
        `https://sihire-be.vercel.app/api/onboarding/get-list-onboarding/${applicant}/`
      );
      const data = await response.json();
      setOnboardings(data);
    } catch (error) {
      console.error("Error fetching interviews:", error);
    }
  };

  useEffect(() => {
    getJobApplications();
    getInterviews();
    getOnboardings();
  }, []);

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
      <Sidebar />

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
            <thead style={{ backgroundColor: "#D2D2D2" }}>
              <tr>
                <Th>Pekerjaan</Th>
                <Th>Status</Th>
                <Th>Detail</Th>
                <Th>Withdraw</Th>
              </tr>
            </thead>
            <tbody>
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
                      <Button primary>Withdraw</Button>
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
              {interviews &&
                interviews.map((interview) => (
                  <tr key={interview.id}>
                    <Td>{interview.job_application_id.job.job_name}</Td>
                    <Td>{interview.datetime_start.split("T")[0]}</Td>
                    <Td>{interview.datetime_start.slice(11, 16)}</Td>
                    <Td>{interview.confirm}</Td>
                    {interview.confirm === "Confirm" && (
                      <Button primary>Batalkan</Button>
                    )}
                    {interview.confirm === "Not Confirm" && (
                      <Td>
                        <Button primary>Konfirmasi</Button>
                      </Td>
                    )}
                  </tr>
                ))}
            </tbody>
          </Table>
        </ContentContainer>

        <ContentContainer active={activeTab === "onboarding"}>
          <SubTitle>My Onboarding</SubTitle>
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
              {onboardings &&
                onboardings.map((onboarding) => (
                  <tr key={onboarding.id}>
                    <Td>{onboarding.job_application_id.job.job_name}</Td>
                    <Td>{onboarding.datetime_start.split("T")[0]}</Td>
                    <Td>{onboarding.datetime_start.slice(11, 16)}</Td>
                    <Td>{onboarding.confirm}</Td>
                    {onboarding.confirm === "Confirm" && (
                      <Button primary>Batalkan</Button>
                    )}
                    {onboarding.confirm === "Not Confirm" && (
                      <Td>
                        <Button primary>Konfirmasi</Button>
                      </Td>
                    )}
                  </tr>
                ))}
            </tbody>
          </Table>
        </ContentContainer>
      </div>
    </React.Fragment>
  );
};

export default MyJobApplication;
