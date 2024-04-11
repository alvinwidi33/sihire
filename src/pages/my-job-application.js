import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';

const MyJobApplication = () => {
  const { applicant } = useParams();
  const [jobApplications, setJobApplications] = useState(null);
  const [activeTab, setActiveTab] = useState('applications');

  useEffect(() => {
    const getJobApplications = async () => {
      try {
        const response = await fetch(
          `https://sihire-be.vercel.app/api/job-application/get/${applicant}/`
        );
        const data = await response.json();
        setJobApplications(data);
        console.log('data', data);
      } catch (error) {
        console.error('Error fetching job:', error);
      }
    };
    getJobApplications();
  }, [applicant]);

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
    background-color: ${(props) => (props.active ? '#2D3648' : '#FFF')};
    color: ${(props) => (props.active ? '#FFF' : '#2D3648')};
    border: none;
    border-bottom: 2px solid ${(props) => (props.active ? '#FFF' : 'transparent')};
    border-radius: 5px 5px 0 0;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
      background-color: #2d3648;
      color: #fff;
    }
  `;

  const ContentContainer = styled.div`
    display: ${(props) => (props.active ? 'block' : 'none')};
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
    color: ${(props) => (props.primary ? '#fff' : '#2a3e4b')};
    background-color: ${(props) => (props.primary ? '#2a3e4b' : 'transparent')};
    border: 2px solid #2a3e4b;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
      background-color: ${(props) => (props.primary ? '#193047' : '#2a3e4b')};
      color: #fff;
    }
  `;

  return (
    <PageContainer>
      <Title>Job Application</Title>

      <TabContainer>
        <TabButton active={activeTab === 'applications'} onClick={() => setActiveTab('applications')}>
          My Applications
        </TabButton>
        <TabButton active={activeTab === 'interviews'} onClick={() => setActiveTab('interviews')}>
          My Interviews
        </TabButton>
        <TabButton active={activeTab === 'onboarding'} onClick={() => setActiveTab('onboarding')}>
          My Onboarding
        </TabButton>
      </TabContainer>

      <ContentContainer active={activeTab === 'applications'}>
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
          <tbody style={{backgroundColor: "#D2D2D2"}}>
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

      <ContentContainer active={activeTab === 'interviews'}>
        <SubTitle>My Interviews</SubTitle>
        {/* Content for My Interviews */}
      </ContentContainer>

      <ContentContainer active={activeTab === 'onboarding'}>
        <SubTitle>My Onboarding</SubTitle>
        {/* Content for My Onboarding */}
      </ContentContainer>
    </PageContainer>
  );
};

export default MyJobApplication;
