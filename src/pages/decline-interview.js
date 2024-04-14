import React, { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import Sidebar from "../components/sidebar-applicant";


const DeclineInterview = () => {
    const { id } = useParams();

    const darkBlueText = {
        color: 'var(--WF-Base-800, #2D3648)',
        fontFamily: 'Inter, sans-serif',
    };

    const containerStyle = {
        marginTop: "-298px",
        backgroundColor: "#F2F2F2",
        paddingTop: "120px",
        paddingLeft: "130px",
    };

    const [formData, setFormData] = useState({
        confirm: 'No',
        reschedule_comment: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = `https://sihire-be.vercel.app/api/interview/edit-interview-applicant/${id}/`;
    
        try {
            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            if (response.ok) {
                console.log('Interview updated successfully');
                console.log('Berhasil Mengajukan Perpindahan Jadwal Wawancara');
            } else {
                console.error('Failed to update interview');
                console.log('Gagal Mengajukan Perpindahan Jadwal Wawancara');
            }
        } catch (error) {
            // Handle network errors
            console.error('Error:', error);
        }
    };

    return (
        <React.Fragment>
                    <div
                style={{
                marginLeft: "22%",
                position: "absolute",
                marginBottom: "40px",
                marginTop: "100px",
                }}
            >
                {/* <Link
                to="/job-list-applicant"
                style={{
                    textDecoration: "none",
                    color: "#2A3E4B",
                    cursor: "pointer",
                }}
                >
                <p style={{ display: "inline", marginLeft: "4px" }}>List Job</p>
                </Link>
                <span style={{ display: "inline", marginLeft: "10px" }}>{">"}</span>
                {job && (
                <React.Fragment key={job.id}>
                    <Link
                    to={`/job-list-applicant/${job.id}`}
                    style={{
                        textDecoration: "none",
                        color: "#2A3E4B",
                        cursor: "pointer",
                    }}
                    >
                    <p style={{ display: "inline", marginLeft: "10px" }}>
                        Job Details
                    </p>
                    </Link>
                </React.Fragment>
                )} */}
            </div>
            <p
                style={{
                marginLeft: "22%",
                fontWeight: "bold",
                fontSize: "32px",
                color: "#2A3E4B",
                position: "absolute",
                }}
            >
                Interview
            </p>
            <Sidebar />
            <div className="container mx-auto" style={containerStyle}>
                
                <div className="min-h-screen py-8">
                    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold mb-4 text-center" style={darkBlueText}>Perubahan Jadwal Interview</h2>
                        <form onSubmit={handleSubmit}>
                            <p style={{ marginTop: '0px', marginLeft: '7%', fontWeight: '600', fontSize: '14px', color: '#2A3E4B'}}>Alasan Perpindahan Jadwal & Pengajuan Jadwal Baru<span className="text-red-500">*</span></p>
                            <input
                                type="textarea"
                                className={`mt-1 p-2 block w-full border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                                style={{
                                borderRadius: '5px', border: '2px solid #CBD2E0', fontSize: '14px', color: '#2A3E4B',
                                width: '400px', height: '200px', marginBottom: '15px',
                                }}
                                name='reschedule_comment'
                                value={formData.reschedule_comment}
                                onChange={handleChange}
                            />
                            

                            <button
                                type="submit"
                                className="w-full px-4 py-2 bg-indigo-800 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
                                style={{ background: 'var(--WF-Base-800, #2D3648)' }}
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default DeclineInterview;
