import React, { useState, useEffect } from 'react';
import Sidebar from '../components/sidebar'; // Make sure to import the Sidebar component properly
import { Link } from 'react-router-dom';

function GetListInterviewGA() {
    const [interviews, setInterviews] = useState([]);
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
        const getInterviews = async () => {
            try {
                const response = await fetch('https://sihire-be.vercel.app/api/interview/get-list-interview/', {
                    method: "GET",
                });
                const data = await response.json();
                setInterviews(data);
            } catch (error) {
                console.error('Error fetching interview data:', error);
            }
        };
        getInterviews();
    }, []);

    const deleteInterview = async (id) => {
        try {
            const response = await fetch(`https://sihire-be.vercel.app/api/interview/delete-interview/${id}/`, {
                method: "DELETE",
            });
            const isConfirmed = window.confirm('Apakah Anda yakin ingin menghapus wawancara?');

            if (isConfirmed) {
                setInterviews(interviews.filter(interview => interview.id !== id));
                setSuccessMessage('Wawancara berhasil dihapus.');
                setTimeout(() => {
                setSuccessMessage('');
                }, 5000);
            }
        } catch (error) {
            console.error('Error deleting interview:', error);
            setSuccessMessage('Terjadi kesalahan saat menghapus wawancara.');
        }
    }

    return (
        <React.Fragment>
            <p style={{ marginLeft: '22%', fontWeight: 'bold', fontSize: '32px', color: '#2A3E4B', position: 'absolute', marginTop: "12px" }}>Wawancara</p>
            <Sidebar />
            <div className="list-interview" style={{ position: 'relative' }}>
                <p style={{ marginLeft: "22%", fontWeight: "bold", fontSize: "32px", color: "#2A3E4B", marginTop: "-220px", marginBottom: "32px" }}>List Wawancara</p>
                <Link to="/create-interview">
                    <button style={{
                        width: "180px", padding: "8px", fontSize: "16px", fontFamily: 'Inter, sans-serif', fontWeight: 'bold', color: "#fff", background: "#2A3E4B",
                        borderRadius: "6px", cursor: "pointer",
                        marginTop: "-72px", marginBottom: "32px", marginLeft: "80%", position: "absolute", border: "2px solid #2A3E4B",
                    }}>
                        Tambah Wawancara
                    </button>
                </Link>
                {interviews && (
                    <table style={{ marginLeft: "22%", borderCollapse: "collapse", width: "70%" }}>
                        <thead>
                            <tr>
                                <th style={{ border: "2px solid #2A3E4B", padding: "8px", textAlign: "center", fontWeight: "bold" }}>Posisi</th>
                                <th style={{ border: "2px solid #2A3E4B", padding: "8px", textAlign: "center", fontWeight: "bold" }}>Pelamar</th>
                                <th style={{ border: "2px solid #2A3E4B", padding: "8px", textAlign: "center", fontWeight: "bold" }}>Tanggal</th>
                                <th style={{ border: "2px solid #2A3E4B", padding: "8px", textAlign: "center", fontWeight: "bold" }}>Waktu</th>
                                <th style={{ border: "2px solid #2A3E4B", padding: "8px", textAlign: "center", fontWeight: "bold" }}>Pewawancara</th>
                                <th style={{ border: "2px solid #2A3E4B", padding: "8px", textAlign: "center", fontWeight: "bold" }}>Status</th>
                                <th style={{ border: "2px solid #2A3E4B", padding: "8px", textAlign: "center", fontWeight: "bold" }}>Konfirmasi</th>
                                <th style={{ border: "2px solid #2A3E4B", padding: "8px", textAlign: "center", fontWeight: "bold", width: "180px" }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {interviews.map(interview => (
                                <tr key={interview.id} style={{ backgroundColor: 
                                interview.job_application_id.status === "Withdrawn" ? "#FFC0CB" :
                                interview.job_application_id.status === "Interview" ? "#FFFFFF" : 
                                "#D3D3D3"
                            }}>
                                    <td style={{ border: "2px solid #2A3E4B", padding: "8px", fontFamily: 'Inter, sans-serif', fontWeight: 'bold', fontSize: "20px", color: "#2A3E4B", textAlign:"center" }}>{interview.job_application_id.job.job_name}</td>
                                    <td style={{ border: "2px solid #2A3E4B", padding: "8px", textAlign:"center" }}>{interview.job_application_id.applicant.user.name}</td>
                                    <td style={{ border: "2px solid #2A3E4B", padding: "8px", textAlign: "center" }}>{interview.datetime_start && formatDateTime(interview.datetime_start)}</td>
                                    <td style={{ border: "2px solid #2A3E4B", padding: "8px", textAlign: "center" }}>
                                        {interview.datetime_start && formatTime(interview.datetime_start)} - {interview.datetime_end && formatTime(interview.datetime_end)}
                                    </td>
                                    <td style={{ border: "2px solid #2A3E4B", padding: "8px", textAlign: "center" }}>
                                        {interview.interviewer_user_id?.name}
                                    </td>
                                    <td style={{ border: "2px solid #2A3E4B", padding: "8px", textAlign: "center" }}>
                                        {interview.job_application_id.status}
                                    </td>
                                    <td style={{ border: "2px solid #2A3E4B", padding: "8px", textAlign: "center" }}>
                                        <div style={{ color: "#fff", background: "#2A3E4B", fontSize: "12px", width: "90px", height: "32px", border: "2px solid #fff", borderRadius: "90px", display: "flex", justifyContent: "center", alignItems: "center", margin: "auto" }}>
                                            {interview.confirm}
                                        </div>
                                    </td>
                                    <td style={{ border: "2px solid #2A3E4B", textAlign: "center" }}>
                                        <Link to={`/get-list-interview-ga/${interview.id}`}>
                                            <button style={{ width: "80px", padding: "8px", fontSize: "16px", fontFamily: 'Inter, sans-serif', fontWeight: 'bold', color: "#2A3E4B", borderRadius: "6px", cursor: "pointer", border: "2px solid #2A3E4B", marginRight: "4px" }}>
                                                Detail
                                            </button>
                                        </Link>
                                        <button onClick={() => deleteInterview(interview.id)} style={{ background: "#2A3E4B", width: "80px", padding: "8px", fontSize: "16px", fontFamily: 'Inter, sans-serif', fontWeight: 'bold', color: "#fff", borderRadius: "6px", cursor: "pointer", border: "2px solid #2A3E4B", }}>
                                            Hapus
                                        </button>
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

export default GetListInterviewGA;
