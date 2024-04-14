import React, { useState, useEffect } from 'react';
import Sidebar from '../components/sidebar-ga'; 
import { Link } from 'react-router-dom';

function GetListOnboardingInternal() {
    const [onboarding, setOnboarding] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');

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

    useEffect(() => {
        const getOnboarding = async () => {
            try {
                const response = await fetch('https://sihire-be.vercel.app/api/onboarding/get-list-onboarding/', {
                    method: "GET",
                });
                const data = await response.json();
                setOnboarding(data);
            } catch (error) {
                console.error('Error fetching onboarding data:', error);
            }
        };
        getOnboarding();
    }, []);

    const isDatePassed = (datetimeString) => {
        const onboardDate = new Date(datetimeString);
        const currentDate = new Date();
        return onboardDate < currentDate;
    };

    return (
        <React.Fragment>
            <p style={{ marginLeft: '22%', fontWeight: 'bold', fontSize: '32px', color: '#2A3E4B', position: 'absolute', marginTop: "12px" }}>On Boarding</p>
            <Sidebar />
            <div className="list-onboarding" style={{ position: 'relative' }}>
                <p style={{ marginLeft: "22%", fontWeight: "bold", fontSize: "32px", color: "#2A3E4B", marginTop: "-220px", marginBottom: "32px" }}>List Onboarding</p>
                <Link to="/create-onboarding">
                    <button style={{
                        width: "180px", padding: "8px", fontSize: "16px", fontFamily: 'Inter, sans-serif', fontWeight: 'bold', color: "#fff", background: "#2A3E4B",
                        borderRadius: "6px", cursor: "pointer",
                        marginTop: "-72px", marginBottom: "32px", marginLeft: "80%", position: "absolute", border: "2px solid #2A3E4B",
                    }}>
                        Tambah Onboarding
                    </button>
                </Link>
                {onboarding && (
                    <table style={{ marginLeft: "22%", borderCollapse: "collapse", width: "70%" }}>
                        <thead>
                            <tr>
                                <th style={{ border: "2px solid #2A3E4B", padding: "8px", textAlign: "center", fontWeight: "bold" }}>Posisi</th>
                                <th style={{ border: "2px solid #2A3E4B", padding: "8px", textAlign: "center", fontWeight: "bold" }}>Pelamar</th>
                                <th style={{ border: "2px solid #2A3E4B", padding: "8px", textAlign: "center", fontWeight: "bold" }}>Tanggal</th>
                                <th style={{ border: "2px solid #2A3E4B", padding: "8px", textAlign: "center", fontWeight: "bold" }}>Waktu</th>
                                <th style={{ border: "2px solid #2A3E4B", padding: "8px", textAlign: "center", fontWeight: "bold" }}>Konfirmasi</th>
                                <th style={{ border: "2px solid #2A3E4B", padding: "8px", textAlign: "center", fontWeight: "bold" }}>Reschedule Comment</th>
                                <th style={{ border: "2px solid #2A3E4B", padding: "8px", textAlign: "center", fontWeight: "bold", width: "180px" }}>Action</th>
                            </tr>
                        </thead>
                        
<tbody>
    {onboarding.map(onboarding => (
        <tr key={onboarding.id} style={{ backgroundColor: (onboarding.job_application_id.status === "Withdrawn" ? "#FFC0CB" : (isDatePassed(onboarding.datetime_end) ? "#D3D3D3" : (onboarding.job_application_id.status === "On Boarding" ? "#FFFFFF" : "#D3D3D3"))) }}>
            <td style={{ border: "2px solid #2A3E4B", padding: "8px", fontFamily: 'Inter, sans-serif', fontWeight: 'bold', fontSize: "20px", color: "#2A3E4B", textAlign:"center" }}>{onboarding.job_application_id.job.job_name}</td>
            <td style={{ border: "2px solid #2A3E4B", padding: "8px", textAlign:"center" }}>{onboarding.job_application_id.applicant.user.name}</td>
            <td style={{ border: "2px solid #2A3E4B", padding: "8px", textAlign: "center" }}>{onboarding.datetime_start && formatDateTime(onboarding.datetime_start)}</td>
            <td style={{ border: "2px solid #2A3E4B", padding: "8px", textAlign: "center" }}>
                {onboarding.datetime_start && formatTime(onboarding.datetime_start)} - {onboarding.datetime_end && formatTime(onboarding.datetime_end)}
            </td>
            <td style={{ border: "2px solid #2A3E4B", padding: "8px", textAlign: "center" }}>
                {onboarding.confirm}
            </td>
            <td style={{ border: "2px solid #2A3E4B", padding: "8px", textAlign: "center" }}>
                {onboarding.reschedule_comment ? onboarding.reschedule_comment : 'None'}
            </td>
            <td style={{ border: "2px solid #2A3E4B", textAlign: "center" }}>
                <Link to={`/onboarding-detail-ga/${onboarding.id}`}>
                    <button style={{ width: "80px", padding: "8px", fontSize: "16px", fontFamily: 'Inter, sans-serif', fontWeight: 'bold', color: "#2A3E4B", borderRadius: "6px", cursor: "pointer", border: "2px solid #2A3E4B", marginRight: "4px" }}>
                        Detail
                    </button>
                </Link>
            </td>
        </tr>
    ))}
</tbody>


                    </table>
                )}
                {successMessage && (
                    <p
                        style={{
                            color: 'green',
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            background: 'white',
                            padding: '20px',
                            borderRadius: '10px',
                            boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                        }}
                    >
                        {successMessage}
                    </p>
                )}
            </div>
        </React.Fragment>
    );
}

export default GetListOnboardingInternal;
