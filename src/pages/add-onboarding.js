import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SidebarGA from "../components/sidebar-ga";

const AddOnboarding = () => {
  const navigate = useNavigate();
  const { startTime, endTime, job_name } = useParams();
  const [successMessage, setSuccessMessage] = useState("");
  const [interviewers, setInterviewers] = useState([]);
  const [jobOptions, setJobOptions] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [selectedJob, setSelectedJob] = useState("");
  const [applicants, setApplicants] = useState([]);
  const [interviewData, setInterviewData] = useState("");

  const currentDate = new Date();
  const currentDateString = currentDate.toISOString().split("T")[0];
  const currentTimeString = currentDate.toTimeString().slice(0, 5)[0];
  const rectangleStyle = {
    width: "70%",
    height: "760px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    marginLeft: "22%",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.4)",
    marginTop: "-20%",
  };

  useEffect(() => {
    const getAvailableInterviewers = async () => {
      try {
        const response = await fetch(
          `https://sihire-be.vercel.app/api/onboarding/get-pic-user-id/`,
          {
            method: "GET",
          }
        );
        const data = await response.json();
        setInterviewers(data);
      } catch (error) {
        console.error("Error fetching interviewer:", error);
      }
    };
    if (
      interviewData.datetime &&
      interviewData.startTime &&
      interviewData.endTime &&
      selectedJob
    ) {
      getAvailableInterviewers();
    }
  }, [
    interviewData.datetime,
    interviewData.startTime,
    interviewData.endTime,
    selectedJob,
  ]); 

  useEffect(() => {
    const getJobNames = async () => {
      try {
        const response = await fetch(
          `https://sihire-be.vercel.app/api/onboarding/get-job-name-applicants/`,
          {
            method: "GET",
          }
        );
        const jobNames = await response.json();
        setJobOptions(jobNames);
      } catch (error) {
        console.error("Error fetching job names:", error);
      }
    };
    getJobNames();
  }, []);

  useEffect(() => {
    const getInterviews = async () => {
      try {
        const response = await fetch(
          `https://sihire-be.vercel.app/api/onboarding/get-list-onboarding/`,
          {
            method: "GET",
          }
        );
        const interviews = await response.json();
        setInterviews(interviews);
      } catch (error) {
        console.error("Error fetching interviews:", error);
      }
    };
    getInterviews();
  }, []);

  useEffect(() => {
    const selectedJobApplicants = jobOptions.filter(
      (option) => option.job.job_name === selectedJob
    );
    if (selectedJobApplicants) {
      setApplicants(selectedJobApplicants.map((job) => job.applicant));
    } else {
      setApplicants([]);
    }
  }, [selectedJob, jobOptions]);

  const handleJobChange = (event) => {
    const selectedJob = event.target.value;
    setSelectedJob(selectedJob);
  };

  const handleInterviewerChange = (event) => {
    setInterviewData({ ...interviewData, interviewer: event.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const selectedJobObject = jobOptions.find(
        (option) =>
          option.job.job_name === selectedJob &&
          option.applicant.user.user_id === interviewData.applicant
      );
      if (!selectedJobObject) {
        throw new Error("Selected job not found.");
      }
      const isConfirmed = window.confirm(
        "Apakah Anda yakin membuat On Boarding?"
      );

      if (!isConfirmed) {
        return;
      }

      const datetimeStart = new Date(
        interviewData.datetime + "T" + interviewData.startTime
      );
      const datetimeEnd = new Date(
        interviewData.datetime + "T" + interviewData.endTime
      );
      const formattedData = {
        ...interviewData,
        datetime_start: datetimeStart.toISOString(),
        datetime_end: datetimeEnd.toISOString(),
        applicant: interviewData.applicant,
        pic_user_id: interviewData.interviewer,
        job_application_id: selectedJobObject.id,
      };

      const response = await fetch(
        "https://sihire-be.vercel.app/api/onboarding/add-onboarding/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit On Boarding schedule");
      }
      if (response.ok) {
        setSuccessMessage("On Boarding berhasil dibuat!");
        setTimeout(() => {
          setSuccessMessage("");
          navigate("/get-list-onboarding-internal");
        }, 5000);
      } else {
        console.error("Failed to post On Boarding", response.statusText);
      }
    } catch (error) {
      alert("On Boarding applicant sudah ada");
    }
  };

  return (
    <React.Fragment>
      <p
        style={{
          marginLeft: "22%",
          fontWeight: "bold",
          fontSize: "32px",
          color: "#2A3E4B",
          position: "absolute",
          marginTop: "12px",
        }}
      >
        On Boarding
      </p>
      <Link to="/get-list-onboarding-internal">
        <p
          style={{
            marginLeft: "22%",
            position: "absolute",
            marginTop: "100px",
          }}
        >
          List Onboarding
        </p>
      </Link>
      <p
        style={{ marginLeft: "31%", position: "absolute", marginTop: "100px" }}
      >
        {">"}
      </p>
      <Link to="/create-onboarding">
        <p
          style={{
            marginLeft: "32%",
            position: "absolute",
            marginTop: "100px",
          }}
        >
          Tambah Onboarding
        </p>
      </Link>
      <SidebarGA />
      <div className="create-interview" style={{ position: "relative" }}>
        <div className="rectangle" style={rectangleStyle}>
          <p
            style={{
              marginTop: "20px",
              marginLeft: "23%",
              fontWeight: "bold",
              fontSize: "32px",
              color: "#2A3E4B",
              position: "absolute",
            }}
          >
            Buat Jadwal On Boarding
          </p>
          <form onSubmit={handleSubmit}>
            <p
              style={{
                marginTop: "80px",
                marginLeft: "7%",
                fontWeight: "600",
                fontSize: "14px",
                color: "#2A3E4B",
                position: "absolute",
              }}
            >
              Posisi Pekerjaan
              <span style={{ color: "red" }}>*</span>
            </p>
            <select
              style={{
                borderRadius: "5px",
                border: "2px solid #ccc",
                height: "40px",
                width: "56%",
                marginTop: "110px",
                marginLeft: "7%",
                fontWeight: "600",
                fontSize: "14px",
                color: "#2A3E4B",
                position: "absolute",
              }}
              required
              id="job"
              value={selectedJob}
              onChange={handleJobChange}
            >
              <option value="">Select Job</option>
              {jobOptions
                .map((job) => job.job)
                .filter(
                  (job, index, self) =>
                    self.findIndex((job2) => job2.id === job.id) === index
                )
                .map((job) => (
                  <option key={job.id} value={job.job_name}>
                    {job.job_name}
                  </option>
                ))}
            </select>
            <p
              style={{
                marginTop: "180px",
                marginLeft: "7%",
                fontWeight: "600",
                fontSize: "14px",
                color: "#2A3E4B",
                position: "absolute",
              }}
            >
              Pelamar Tahap Onboarding
              <span style={{ color: "red" }}>*</span>
            </p>
            <select
              style={{
                borderRadius: "5px",
                border: "2px solid #ccc",
                height: "40px",
                width: "56%",
                marginTop: "210px",
                marginLeft: "7%",
                fontWeight: "600",
                fontSize: "14px",
                color: "#2A3E4B",
                position: "absolute",
              }}
              required
              id="applicant"
              value={interviewData.applicant}
              onChange={(e) =>
                setInterviewData({
                  ...interviewData,
                  applicant: e.target.value,
                })
              }
            >
              <option value="">Pilih Applicant</option>
              {applicants
                .filter((applicant) =>
                  interviews.length > 0
                    ? !interviews.some(
                        (interview) =>
                          interview.job_application_id.applicant.applicant_id === applicant.applicant_id &&
                          interview.job_application_id.job.job_name === selectedJob
                      )
                    : true
                )
                .map((applicant) => (
                  <option
                    key={applicant.user.user_id}
                    value={applicant.user.user_id}
                  >
                    {applicant.user.name}
                  </option>
                ))}
            </select>
            <p
              style={{
                marginTop: "280px",
                marginLeft: "7%",
                fontWeight: "600",
                fontSize: "14px",
                color: "#2A3E4B",
                position: "absolute",
              }}
            >
              Tanggal Onboarding
              <span style={{ color: "red" }}>*</span>
            </p>
            <input
              type="date"
              style={{
                borderRadius: "5px",
                border: "2px solid #CBD2E0",
                padding: "8px",
                marginTop: "310px",
                marginLeft: "7%",
                fontSize: "14px",
                color: "#2A3E4B",
                position: "absolute",
                width: "56%",
              }}
              required
              value={interviewData.datetime ? interviewData.datetime : ""}
              onChange={(e) => {
                const selectedDate = e.target.value;
                const currentDate = new Date();
                const currentDateString = currentDate
                  .toISOString()
                  .split("T")[0];
                const currentTimeString = currentDate
                  .toTimeString()
                  .slice(0, 5);

                const startTime = new Date(
                  `${selectedDate}T${interviewData.startTime}`
                );

                if (
                  selectedDate === currentDateString &&
                  startTime < currentDate
                ) {
                  alert(
                    "Waktu mulai tidak boleh lebih kecil dari waktu saat ini."
                  );
                } else {
                  setInterviewData({
                    ...interviewData,
                    datetime: selectedDate,
                  });
                }
              }}
              min={currentDateString}
            />
            <p
              style={{
                marginTop: "380px",
                marginLeft: "7%",
                fontWeight: "600",
                fontSize: "14px",
                color: "#2A3E4B",
                position: "absolute",
              }}
            >
              Waktu Mulai Onboarding
              <span style={{ color: "red" }}>*</span>
            </p>
            <input
              type="time"
              style={{
                borderRadius: "5px",
                border: "2px solid #CBD2E0",
                padding: "8px",
                marginTop: "410px",
                marginLeft: "7%",
                fontSize: "14px",
                color: "#2A3E4B",
                position: "absolute",
                width: "56%",
              }}
              required
              value={interviewData.startTime ? interviewData.startTime : ""}
              onChange={(e) => {
                const selectedTime = e.target.value;
                const formattedTime = selectedTime.slice(0, 5);
                const startTime = new Date(
                  `${interviewData.datetime}T${formattedTime}`
                );
                const endTime = new Date(
                  `${interviewData.datetime}T${interviewData.endTime}`
                );
                const currentDate = new Date();
                const currentDateString = currentDate
                  .toISOString()
                  .split("T")[0];
                if (startTime > endTime) {
                  alert(
                    "Waktu mulai tidak boleh lebih dari waktu akhir."
                  );
                  return;
                }
                if (
                  interviewData.datetime === currentDateString &&
                  startTime < currentDate
                ) {
                  alert(
                    "Waktu mulai tidak boleh lebih kecil dari waktu saat ini."
                  );
                } else {
                  setInterviewData({
                    ...interviewData,
                    startTime: formattedTime,
                  });
                }
              }}
              min={
                interviewData.datetime === currentDateString
                  ? currentTimeString
                  : "00:00"
              }
              max={interviewData.datetime === currentDateString ? "23:59" : ""}
            />

            <p
              style={{
                marginTop: "480px",
                marginLeft: "7%",
                fontWeight: "600",
                fontSize: "14px",
                color: "#2A3E4B",
                position: "absolute",
              }}
            >
              Waktu Berakhir Onboarding
              <span style={{ color: "red" }}>*</span>
            </p>
            <input
              type="time"
              style={{
                borderRadius: "5px",
                border: "2px solid #CBD2E0",
                padding: "8px",
                marginTop: "510px",
                marginLeft: "7%",
                fontSize: "14px",
                color: "#2A3E4B",
                position: "absolute",
                width: "56%",
              }}
              value={interviewData.endTime ? interviewData.endTime : ""}
              onChange={(e) => {
                const selectedTime = e.target.value;
                const formattedTime = selectedTime.slice(0, 5);
                const startTime = new Date(
                  `${interviewData.datetime}T${interviewData.startTime}`
                );
                const endTime = new Date(
                  `${interviewData.datetime}T${formattedTime}`
                );
                const currentDate = new Date();
                const currentDateString = currentDate
                  .toISOString()
                  .split("T")[0];
                if (endTime < startTime) {
                  alert(
                    "Waktu berakhir tidak boleh lebih awal dari waktu mulai."
                  );
                  return;
                }

                if (
                  interviewData.datetime === currentDateString &&
                  endTime < currentDate
                ) {
                  alert(
                    "Waktu berakhir tidak boleh lebih kecil dari waktu saat ini."
                  );
                  return;
                }
                setInterviewData({ ...interviewData, endTime: formattedTime });
              }}
              min={
                interviewData.datetime === currentDateString
                  ? currentTimeString
                  : "00:00"
              }
              max={interviewData.datetime === currentDateString ? "23:59" : ""}
            />
            <p
              style={{
                marginTop: "580px",
                marginLeft: "7%",
                fontWeight: "600",
                fontSize: "14px",
                color: "#2A3E4B",
                position: "absolute",
              }}
            >
              Person In Charge
              <span style={{ color: "red" }}>*</span>
            </p>
            <select
              style={{
                borderRadius: "5px",
                border: "2px solid #ccc",
                height: "40px",
                width: "56%",
                marginTop: "610px",
                marginLeft: "7%",
                fontWeight: "600",
                fontSize: "14px",
                color: "#2A3E4B",
                position: "absolute",
              }}
              id="pic_user_id"
              value={interviewData.pic_user_id}
              onChange={handleInterviewerChange}
            >
              <option value="">Pilih Person In Charge</option>
              {interviewers &&
                interviewers.map((pic) => (
                  <option key={pic.user_id} value={pic.user_id}>
                    {pic.name}
                  </option>
                ))}
            </select>

            <button
              type="submit"
              style={{
                width: "420px",
                padding: "8px",
                fontSize: "16px",
                fontFamily: "Inter, sans-serif",
                fontWeight: "bold",
                color: "#fff",
                background: "#2A3E4B",
                borderRadius: "6px",
                cursor: "pointer",
                marginTop: "680px",
                border: "2px solid #2A3E4B",
                marginLeft: "20%",
                position: "absolute",
              }}
            >
              Submit
            </button>
          </form>
          {successMessage && (
            <p
              style={{
                color: "green",
                position: "fixed",
                top: "50%",
                left: "55%",
                transform: "translate(-50%, -50%)",
                background: "white",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
              }}
            >
              {successMessage}
            </p>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddOnboarding;
