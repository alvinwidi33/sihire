import React, { useEffect, useState } from 'react';
import Sidebar from '../components/sidebar';
import { useNavigate } from 'react-router-dom';

function Applicants() {
    const navigate = useNavigate();
    const [applications, setApplications] = useState([]);
    const [jobs, setJobs] = useState([]);

    const getJobs = async () => {
        await fetch("https://sihire-be.vercel.app/api/job-posting/get-all/")
            .then(resp => resp.json())
            .then(data => {
                setJobs(data);
        });
    };

    const getJobApplication = async () => {
        await fetch("https://sihire-be.vercel.app/api/job-application/get/")
            .then(resp => resp.json())
            .then(data => {
                setApplications(data);
                console.log(data);
        });
    };

    const detailJobApplication = (id) => {
        navigate(`/job-application-detail/${id}`)
    };

    useEffect(() => {
        getJobs();
        getJobApplication();
    }, []);

    return (
        <React.Fragment>
            <p style={{ marginLeft: '22%', fontWeight: 'bold', fontSize: '32px', color: '#2A3E4B', position: 'absolute' }}>Applicants</p>
            <Sidebar/>
            <div style={{ marginLeft: '22%', position: 'absolute', marginTop:"-240px"}} className='w-9/12'>
                <h1 className='text-2xl font-bold'>All Applicants</h1>
                <div className='w-full text-center'>
                    <div className='py-5 rounded rounded-xl border border-2 border-black'>
                        <h2 className='text-xl font-semibold'>Filter Applicants</h2>
                        <div className='flex justify-around mt-5'>
                            <div flex-center>
                                <p>Status</p>
                                <select id="cars" name="cars" className="px-20 py-2 border border-black rounded rounded-lg">
                                    <option value="volvo">Applied</option>
                                    <option value="saab">In Review</option>
                                    <option value="fiat">Interview</option>
                                    <option value="audi">Accepted</option>
                                    <option value="audi">Declined</option>
                                    <option value="audi">Onboard</option>
                                    <option value="audi">Withdrawn</option>
                                </select>
                            </div>
                            <div>
                                <p>Posisi</p>
                                <select id="posisi" name="posisi"  className="px-20 py-2 border border-black rounded rounded-lg">
                                    {jobs && jobs.map((job) => (
                                        <option value={job.name}>{job.job_name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th>Posisi</th>
                                <th>Nama</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications && applications.map((application) => (
                                <tr key={application.id}>
                                    <td scope="col" className="px-6 py-3">{application.job.job_name}</td>
                                    <td>{application.applicant.user.name}</td>
                                    <td>{application.status}</td>
                                    <td>
                                    <button onClick={() => detailJobApplication(application.id)} className="ml-10" style={{width:"90px",padding: "4px",color: "#fff",borderRadius: "6px",cursor: "pointer",border: "2px solid #2A3E4B",background:"#2A3E4B"}}>
                                        Detail
                                    </button>
                                    </td>
                                </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Applicants;
