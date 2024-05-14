import React, { useState } from 'react';
import { useNavigate, useParams, Link } from "react-router-dom";
import SidebarApplicant from "../components/sidebar-applicant";


const DeclineInterview = () => {
    const { id } = useParams();

    const darkBlueText = {
        color: 'var(--WF-Base-800, #2D3648)',
        fontFamily: 'Inter, sans-serif',
    };

    const containerStyle = {
        marginTop: "-298px",
        paddingTop: "120px",
        paddingLeft: "130px",
    };

    const [formData, setFormData] = useState({
        confirm: 'Berhalangan',
        reschedule_comment: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const navigate = useNavigate();

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
                navigate('/my-job-application');
            } else {
                console.error('Failed to update interview');
                console.log('Gagal Mengajukan Perpindahan Jadwal Wawancara');
            }
        } catch (error) {
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
                Wawancara
            </p>
            <SidebarApplicant />
            <div className="container mx-auto" style={containerStyle}>
            
                {/* Breadcrum */}
                <div
                    className="flex flex-row items-center mb-2"
                    style={{marginLeft: '100px', marginTop: '-20px'}}
                >
                    <Link
                    to="/my-job-application"
                    style={{
                        textDecoration: "none",
                        color: "#2A3E4B",
                        cursor: "pointer",
                    }}
                    >
                        <p style={{ display: "inline", marginLeft: "4px" }}>Lamaran Pekerjaan</p>
                    </Link>
                    <span style={{ display: "inline", marginLeft: "10px" }}>{">"}</span>
                    <Link
                    to={`/decline-interview/${id}`}
                    style={{
                        textDecoration: "none",
                        color: "#2A3E4B",
                        cursor: "pointer",
                    }}
                    >
                        <p style={{ display: "inline", marginLeft: "10px" }}>
                            Pengajuan Jadwal Wawancara Lain
                        </p>
                    </Link>
                </div>
                
                {/* Main Part */}
                <div className="min-h-screen py-8">
                <div
                    className="mx-auto p-6 bg-white rounded-lg shadow-md"
                    style={{ boxShadow: '0 2px 10px rgba(0, 0, 0, 0.4)', marginLeft: '190px', width: 'calc(100% - 300px)' }}
                >
                        <h2 className="text-lg font-semibold mb-4 text-center" style={darkBlueText}>Pengajuan Jadwal Wawancara Lain</h2>
                        <form onSubmit={handleSubmit}>
                            <p style={{ fontWeight: '600', fontSize: '14px', color: '#2A3E4B'}}>Berikan alasan yang jelas atas ketidakhadiran Anda pada jadwal wawancara yang telah ditetapkan & usulkan jadwal alternatif yang memungkinkan!<span className="text-red-500">*</span></p>
                            <textarea
                                className={`mt-1 p-2 block w-full border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                                style={{
                                borderRadius: '5px', border: '2px solid #CBD2E0', fontSize: '14px', color: '#2A3E4B',
                                height: '150px', marginBottom: '15px',
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
                                Kirim
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default DeclineInterview;
