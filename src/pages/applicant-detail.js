import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import SidebarGA from '../components/sidebar-ga';
import SidebarOther from '../components/sidebar-other';

const ApplicantDetail = () => {
    const {applicant} = useParams()
    const [userApplicant, setApplicant] = useState(null);
    const [user, setUser] = useState(null);
    const [jobApplications, setJobApplications] = useState(null);
    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await fetch('https://sihire-be.vercel.app/api/users/logged-in/', {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Token ' + window.localStorage.getItem("token")
                    },
                  });
                const data = await response.json();
                setUser(data);
                console.log("data",data)
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        }
        getUser();
    })
    useEffect(() => {
        const getApplicant = async () => {
            try {
                const response = await fetch(`https://sihire-be.vercel.app/api/users/get-user/${applicant}/`);
                const data = await response.json();
                setApplicant(data);
                console.log("data",data)
            } catch (error) {
                console.error('Error fetching applicant:', error);
            }
            }
        getApplicant();
    }, [applicant]);
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

  const TableHeader = {
    backgroundColor: '#2A3E4B',
    color: 'white',
    padding: '10px',
    textAlign: 'left',
};

const TableCell = {
    padding: '10px',
    borderBottom: '1px solid #ddd',
};

const DetailButton = {
    backgroundColor: '#2D3648',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '5px',
    cursor: 'pointer',
    outline: 'none',
};

//   const PageContainer = {
//     backgroundColor: '#f2f2f2',
//     padding: '20px',
//   };

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
    <React.Fragment>
    
    {user && (
    <>
        {user.role === "General Affairs" ? (
            <SidebarGA />
        ) : (
            <SidebarOther />
        )}
    </>
    )}

    <p
        style={{
          marginLeft: "22%",
          fontWeight: "bold",
          fontSize: "32px",
          color: "#2A3E4B",
          position: "absolute",
          marginTop: "-28%"
        }}
      >
        Applicants
      </p>
    {/* <div style={PageContainer}> */}
      <div className="min-h-screen flex">
      <div className="container mx-auto mt-8 md:mt-16" style={{ marginLeft:"22%", marginRight:"3%", marginTop:"-23%" }}>
        <h2 style={SubTitle}><strong>Nama</strong></h2>
        <div>
        {userApplicant && (
            <h2>{userApplicant.name}</h2>
        )}
        </div>
        <h2 style={SubTitle}><strong>Email</strong></h2>
        <div>
        {userApplicant && (
            <h2>{userApplicant.email}</h2>
        )}
        </div>
        <h2 style={SubTitle}><strong>No Telepon</strong></h2>
        <div>
        {userApplicant && (
            <h2>{userApplicant.phone}</h2>
        )}
        </div>
        <h2 style={SubTitle}><strong>Pekerjaan Dilamar</strong></h2>
        <div style={CardContainer}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
    <thead>
        <tr>
            <th style={TableHeader}>Job Name</th>
            <th style={TableHeader}>Status</th>
            <th style={TableHeader}>Action</th>
        </tr>
    </thead>
    <tbody>
        {jobApplications && jobApplications.map(jobApplication => (
            <tr key={jobApplication.id}>
                <td style={TableCell}>{jobApplication.job.job_name}</td>
                <td style={TableCell}>{jobApplication.status}</td>
                <td style={TableCell}>
                {user && (
                    <Link
                        to={user.role === "General Affairs" ? `/job-application-detail-ga/${jobApplication.id}` : `/job-application-detail-dp/${jobApplication.id}`}
                        style={{ marginLeft: '8px', textDecoration: 'none' }}
                    >
                        <button className="detail-button" style={DetailButton}>Detail</button>
                    </Link>
                )}

                </td>
            </tr>
        ))}
    </tbody>
</table>

</div>

    </div>
    </div>
    {/* </div> */}
    </React.Fragment>
  );
};

export default ApplicantDetail;
