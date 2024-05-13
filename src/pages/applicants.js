import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SidebarGA from "../components/sidebar-ga";
import SidebarDirector from "../components/sidebar-director";
import SidebarOther from "../components/sidebar-other";

function Applicants() {
  const navigate = useNavigate();
  const location = useLocation();
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const role = window.localStorage.getItem("role");
  const [selectedStatus, setSelectedStatus] = useState(
    location.state ? location.state.status : "None"
  );
  const [selectedPosisi, setSelectedPosisi] = useState("None");

  const getJobs = async () => {
    await fetch("https://sihire-be.vercel.app/api/job-posting/get-all/")
      .then((resp) => resp.json())
      .then((data) => {
        setJobs(data);
      });
  };

  const getJobApplication = async () => {
    await fetch(
      `https://sihire-be.vercel.app/api/job-application/get?status=${selectedStatus}&posisi=${selectedPosisi}`
    )
      .then((resp) => resp.json())
      .then((data) => {
        setApplications(data);
      });
  };

  const detailApplicant = (id) => {
    navigate(`/applicant-detail/${id}`);
  };

  const detailJobApplication = (id) => {
    if (role === "General Affairs") {
      navigate(`/job-application-detail-ga/${id}`);
    }

    navigate(`/job-application-detail-dp/${id}`);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handlePosisiChange = (event) => {
    setSelectedPosisi(event.target.value);
  };

  useEffect(() => {
    getJobs();
  }, []);

  useEffect(() => {
    getJobApplication();

    console.log(`Status: ${selectedStatus}, Posisi: ${selectedPosisi}`);
  }, [selectedStatus, selectedPosisi]);

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
        Applicants
      </p>
      {role === "General Affairs" ? (
        <SidebarGA />
      ) : role === "Director" ? (
        <SidebarDirector />
      ) : (
        <SidebarOther />
      )}
      <div
        style={{ marginLeft: "22%", position: "absolute", marginTop: "-340px" }}
        className="w-9/12"
      >
        <h1 className="text-2xl font-bold">All Applicants</h1>
        <div className="w-full text-center">
          <div className="py-5 rounded rounded-xl border border-2 border-black">
            <h2 className="text-xl font-semibold">Filter Applicants</h2>
            <div className="flex justify-around mt-5">
              <div flex-center>
                <p>Status</p>
                <select
                  value={selectedStatus}
                  onChange={handleStatusChange}
                  id="cars"
                  name="cars"
                  className="px-20 py-2 border border-black rounded rounded-lg"
                >
                  <option value="None">Semua Status</option>
                  <option value="Applied">Applied</option>
                  <option value="In Review">In Review</option>
                  <option value="Interview">Interview</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Declined">Declined</option>
                  <option value="On Boarding">On Boarding</option>
                  <option value="Withdrawn">Withdrawn</option>
                </select>
              </div>
              <div>
                <p>Posisi</p>
                <select
                  value={selectedPosisi}
                  onChange={handlePosisiChange}
                  id="posisi"
                  name="posisi"
                  className="px-20 py-2 border border-black rounded rounded-lg"
                >
                  <option value="None">Semua Posisi</option>
                  {jobs &&
                    jobs.map((job) => (
                      <option value={job.id}>{job.job_name}</option>
                    ))}
                </select>
              </div>
            </div>
          </div>
          <table className="w-full mt-10">
            <thead className="">
              <tr>
                <th className="text-white bg-gray-900 text-center font-bold py-2">
                  Posisi
                </th>
                <th className="text-white bg-gray-900 text-center font-bold py-2">
                  Nama
                </th>
                <th className="text-white bg-gray-900 text-center font-bold py-2">
                  Status
                </th>
                <th className="text-white bg-gray-900 text-center font-bold py-2">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {applications &&
                applications.map((application) => (
                  <tr key={application.id}>
                    <td
                      scope="col"
                      className="border-2 border-solid border-blue-900 p-3 text-center"
                    >
                      {application.job.job_name}
                    </td>
                    <td className="border-2 border-solid border-blue-900 p-3 text-center">
                      <a
                        onClick={() =>
                          detailApplicant(application.applicant.applicant_id)
                        }
                      >
                        {application.applicant.user.name}
                      </a>
                    </td>
                    <td className="border-2 border-solid border-blue-900 p-3 text-center">
                      {application.status}
                    </td>
                    <td className="border-2 border-solid border-blue-900 p-3 text-center">
                      <button
                        onClick={() => detailJobApplication(application.id)}
                        className="ml-10"
                        style={{
                          width: "90px",
                          padding: "4px",
                          color: "#fff",
                          borderRadius: "6px",
                          cursor: "pointer",
                          border: "2px solid #2A3E4B",
                          background: "#2A3E4B",
                        }}
                      >
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
