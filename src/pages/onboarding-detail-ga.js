import React, { useEffect, useState } from 'react';
import Sidebar from '../components/sidebar-ga';
import { useParams, Link } from 'react-router-dom';

function OnboardingDetailGA() {
    const [onboarding, setOnboarding] = useState(null);
    const { id } = useParams();
    function formatTime(datetimeString) {
        const dateTime = new Date(datetimeString);
        const hours = dateTime.getHours().toString().padStart(2, '0');
        const minutes = dateTime.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }
    function formatDateTime(datetimeString) {
        const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = new Date(datetimeString).toLocaleDateString('id-ID', options);
        return formattedDate;
    }
    const rectangleStyle = {
    width: '70%',
    height: '550px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    marginLeft: '22%',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.4)',
    marginTop: '-14%',
  };
  useEffect(() => {
    const getOnboarding = async () => {
      try {
        const response = await fetch(`https://sihire-be.vercel.app/api/onboarding/get-onboarding/${id}/`);
        const data = await response.json();
        setOnboarding(data);
      } catch (error) {
        console.error('Error fetching job:', error);
      }
    };
    getOnboarding();
  }, [id]);

    return (
        <React.Fragment>
            <p style={{ marginLeft: '22%', fontWeight: 'bold', fontSize: '32px', color: '#2A3E4B', position: 'absolute', marginTop: "12px" }}>Onboarding</p>
            <Sidebar />
            <Link to='/get-list-onboarding-internal'>
                <p style={{ marginLeft: '22%', position: 'absolute', marginTop: "-240px" }}>List Onboarding</p>
            </Link>
            <p style={{ marginLeft: '30%', position: 'absolute', marginTop: "-240px" }}>{'>'}</p>
            {onboarding && (
                <React.Fragment key={onboarding.id}>
                    <Link to={`/get-list-onboarding-internal/${id}`}>
                        <p style={{ marginLeft: '31%', position: 'absolute', marginTop: "-240px" }}>{onboarding.job_application_id.job.job_name}</p>
                    </Link>
                    <div className="detail-onboarding-ga">
                        <div className="rectangle-style" style={rectangleStyle}>
                            <p style={{ marginTop: '40px', marginLeft: '5%', fontWeight: 'bold', fontSize: '32px', color: '#2A3E4B', position: 'absolute' }}>{onboarding.job_application_id.applicant.user.name} - {onboarding.job_application_id.job.job_name}</p>
                            <p style={{ marginTop: '100px', marginLeft: '5%', fontWeight: 'bold', fontSize: '24px', color: '#2A3E4B', position: 'absolute' }}>Status</p>
                            <div style={{ marginTop: '140px', marginLeft: '5%', color: "#fff", background: "#2A3E4B", fontSize: "12px", width: "90px", height: "32px", border: "2px solid #fff", borderRadius: "90px", display: "flex", justifyContent: "center", alignItems: "center", position: "absolute" }}>
                                {onboarding.confirm}
                            </div>
                            <p style={{ marginTop: '200px', marginLeft: '5%', fontWeight: 'bold', fontSize: '24px', color: '#2A3E4B', position: 'absolute' }}>Jadwal Onboarding</p>
                            <p style={{ marginTop: '240px', marginLeft: '5%', fontSize: '16px', color: '#2A3E4B', position: 'absolute' }}>
                                Hari/Tanggal : {onboarding.datetime_start && formatDateTime(onboarding.datetime_start)}
                            </p>
                            <p style={{ marginTop: '270px', marginLeft: '5%', fontSize: '16px', color: '#2A3E4B', position: 'absolute' }}>
                                Waktu : {onboarding.datetime_start && formatTime(onboarding.datetime_start)} - {onboarding.datetime_end && formatTime(onboarding.datetime_end)}
                            </p>
                    
                            <p style={{ marginTop: '350px', marginLeft: '5%', fontWeight: 'bold', fontSize: '24px', color: '#2A3E4B', position: 'absolute' }}>Alasan</p>
                            <p style={{ marginTop: '390px', marginLeft: '5%', fontSize: '16px', color: '#2A3E4B', position: 'absolute' }}>
                                {onboarding.reschedule_comment}
                            </p>
                            <Link to={`/get-list-onboarding-ga/${id}/update`}>
                                <button style={{ marginLeft: "800px", marginTop: "480px", backgroundColor: "#2A3E4B", width: "130px", padding: "8px", fontSize: "16px", fontFamily: 'Inter, sans-serif', fontWeight: 'bold', color: "#fff", borderRadius: "6px", cursor: "pointer", border: "2px solid #2A3E4B", marginRight: "4px" }}>
                                    Ubah Jadwal
                                </button>
                            </Link>
                        </div>
                    </div>
                </React.Fragment>
            )}
        </React.Fragment>
    );
}

export default OnboardingDetailGA;