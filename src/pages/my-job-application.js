import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';

const MyJobApplication = () => {
    const {applicant} = useParams()
    const [jobApplications, setJobApplications] = useState(null);
    useEffect(() => {
        const getJobApplications = async () => {
        try {
            const response = await fetch(`https://sihire-be.vercel.app/api/job-application/get/${applicant}/`);
            const data = await response.json();
            setJobApplications(data);
            console.log("data",data)
        } catch (error) {
            console.error('Error fetching job:', error);
        }
        };
    getJobApplications();
  }, [applicant]);

  const PageContainer = {
    backgroundColor: '#f2f2f2',
    padding: '20px',
  };

  const Title = {
    color: 'var(--Seal, #2A3E4B)',
    borderBottom: '2px solid var(--Seal, #2A3E4B)',
  };

  const SubTitle = {
    marginTop: '20px',
  };

  const CardContainer = {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '10px',
  };

  const Card = {
    width: '1078px',
    height: '88px',
    flexShrink: 0,
    borderRadius: '8px',
    background: 'var(--WF-Base-White, #FFF)',
    boxShadow: '0px 10px 20px 0px rgba(0, 0, 0, 0.25)',
    marginBottom: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px',
  };

  const AcceptedButton = styled.div`
    display: inline-flex;
    height: 40px;
    padding: 8px 16px;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
    border-radius: 999px;
    background: var(--WF-Base-800, #2D3648);
    color: white;
    cursor: pointer;
    user-select: none;
  `;

  return (
    <div style={PageContainer}>
      <h1 style={Title}>Job Application</h1>

      <h2 style={SubTitle}>My Applications</h2>
      <div style={CardContainer}>
      {jobApplications && jobApplications.map(jobApplication => (
        <div style={Card}>
          <div>{jobApplication.job.job_name}</div>
          <div>
            <AcceptedButton>{jobApplication.status}</AcceptedButton>
            <Link to={`/job-application-detail/${jobApplication.id}`}>
            <button style={{marginLeft: '8px'}}>Detail</button>
            </Link>
          </div>
        </div>
    ))}
      </div>

      <h2 style={SubTitle}>My Interviews</h2>
      <div style={CardContainer}>
        <div style={Card}>
          <div>Design Interior</div>
          <div>29 Feb 2024</div>
          <div>14:00</div>
          <div>
            <button style={{marginLeft: '8px'}}>Konfirmasi</button>
          </div>
        </div>
      </div>

      <h2 style={SubTitle}>My Onboarding</h2>
    </div>
  );
};

export default MyJobApplication;
