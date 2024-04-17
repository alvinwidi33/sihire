import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SidebarGA from "../components/sidebar-ga";

function UpdateJadwalInteviewGA() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [interviewers, setInterviewers] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [interview, setInterview] = useState(null);
  const [interviews, setInterviews] = useState([]);
  const [interviewData, setInterviewData] = useState({
    datetime_start: "",
    datetime_end: "",
    startTime: "",
    endTime: "",
    interviewer: "",
  });
  const currentDate = new Date();
  const currentDateString = currentDate.toISOString().split("T")[0];
  const currentTimeString = currentDate.toTimeString().slice(0, 5)[0];
  const [interviewer, setInterviewer] = useState("");

  const rectangleStyle = {
    width: "90%",
    height: "800px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.4)",
    marginTop:"-120px"
  };

  const isOverlapping = (aStart, aEnd, bStart, bEnd) => {
    if (aStart <= bStart && bEnd <= aEnd) return false;
    if (aStart <= bStart && bStart < aEnd) return true;
    if (aStart < bEnd && bEnd <= aEnd) return true;
    return false;
  };

  useEffect(() => {
    const getInterview = async () => {
      try {
        const response = await fetch(
          `https://sihire-be.vercel.app/api/interview/get-interview/${id}/`
        );
        const data = await response.json();
        setInterview(data);
        setInterviewer(data?.interviewer_user_id || "");
      } catch (error) {
        console.error("Error fetching interview:", error);
      }
    };
    const getAvailableInterviewers = async () => {
      try {
        const response = await fetch(
          `https://sihire-be.vercel.app/api/interview/get-interviewer/`,
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
    getInterview();
    getAvailableInterviewers();
  }, [id]);

  useEffect(() => {
    const getInterviews = async () => {
      try {
        const response = await fetch(
          `https://sihire-be.vercel.app/api/interview/get-list-interview/`,
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

  const handleInterviewerChange = (event) => {
    setInterviewer(event.target.value);
    setInterviewData({ ...interviewData, interviewer: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isConfirmed = window.confirm(
      "Apakah Anda yakin ingin memperbarui interview?"
    );

    if (!isConfirmed) {
      return;
    }
    const datetimeStart =
      interviewData.datetime_start && !interviewData.startTime // hanya ganti tanggal
        ? new Date(
            interviewData.datetime_start +
              "T" +
              interview.datetime_start.slice(11, 16)
          )
        : !interviewData.datetime_start && interviewData.startTime // hanya ganti jam mulai
        ? new Date(
            interview.datetime_start.slice(0, 10) +
              "T" +
              interviewData.startTime
          )
        : interviewData.datetime_start && interviewData.startTime // ganti tanggal dan jam mulai
        ? new Date(interviewData.datetime_start + "T" + interviewData.startTime)
        : new Date(interview.datetime_start); // tidak diganti

    const datetimeEnd =
  interviewData.datetime_start && !interviewData.endTime // hanya ganti tanggal
    ? new Date(
        interviewData.datetime_start +
          "T" +
          interview.datetime_end.slice(11, 16)
      )
    : !interviewData.datetime_start && interviewData.endTime // hanya ganti jam selesai
    ? new Date(
        interview.datetime_end.slice(0, 10) + "T" + interviewData.endTime
      )
    : interviewData.datetime_start && interviewData.endTime // ganti tanggal dan jam selesai
    ? new Date(interviewData.datetime_start + "T" + interviewData.endTime)
    : new Date(interview.datetime_end); 
      if((datetimeStart < currentDate) || (datetimeEnd < currentDate)){
        alert("Waktu tidak boleh kurang dari sekarang")
        return;
      }
      if(datetimeStart > datetimeEnd){
        alert("Waktu mulai tidak boleh melewati waktu akhir")
        return;
      }
      if(datetimeEnd < datetimeStart){
        alert("Waktu akhir tidak boleh kurang dari waktu mulai")
        return;
      }
    const formattedData = {
      datetime_start: datetimeStart.toISOString(),
      datetime_end: datetimeEnd.toISOString(), //baris 139
      interviewer_user_id: interviewData.interviewer
        ? interviewData.interviewer
        : interview.interviewer_user_id.user_id,
      job_application_id: interview.job_application_id.id,
    };

    const isInterviewerScheduledInTheTimeRange = interviewers.find(
      (interviewer) =>
        interviews.find(
          (interview) =>
            interview.interviewer_user_id.user_id === interviewer.user_id &&
            isOverlapping(
              new Date(interview.datetime_start),
              new Date(interview.datetime_end),
              datetimeStart,
              datetimeEnd
            )
        )
    );

    try {
      if (isInterviewerScheduledInTheTimeRange) {
        throw new Error(
          "There is another interview in this time range for this interviewer"
        );
      }

      const response = await fetch(
        `https://sihire-be.vercel.app/api/interview/edit-interview-perusahaan/${id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit interview schedule");
      }

      if (response.ok) {
        setSuccessMessage("Interview berhasil diperbarui!");
        setTimeout(() => {
          setSuccessMessage("");
          navigate("/get-list-interview-ga");
        }, 5000);
      } else {
        console.error("Failed to post interview", response.statusText);
      }
    } catch (error) {
      console.error("Error updating interview:", error);
      alert(error);
    }
  };
  const deleteInterview = async (id) => {
    try {
      const response = await fetch(
        `https://sihire-be.vercel.app/api/interview/delete-interview/${id}/`,
        {
          method: "DELETE",
        }
      );
      const isConfirmed = window.confirm(
        "Apakah Anda yakin ingin menghapus wawancara?"
      );

      if (isConfirmed && response.ok) {
        setSuccessMessage("Wawancara berhasil dihapus.");
        await new Promise((resolve) => setTimeout(resolve, 5000));
        setSuccessMessage("");
        navigate("/get-list-interview-ga");
        setInterview(null);
      }
    } catch (error) {
      console.error("Error deleting interview:", error);
      setSuccessMessage("Terjadi kesalahan saat menghapus wawancara.");
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
        Wawancara
      </p>
      <SidebarGA />
      <Link to="/get-list-interview-ga">
        <p
          style={{
            marginLeft: "22%",
            position: "absolute",
            marginTop: "-340px",
          }}
        >
          List Wawancara
        </p>
      </Link>
      <p
        style={{ marginLeft: "30%", position: "absolute", marginTop: "-340px" }}
      >
        {">"}
      </p>
      {interview && (
        <React.Fragment key={interview.id}>
          <Link to={`/get-list-interview-ga/${id}`}>
            <p
              style={{
                marginLeft: "31%",
                position: "absolute",
                marginTop: "-340px",
              }}
            >
              {interview.job_application_id.job.job_name}
            </p>
          </Link>
          <p
            style={{
              marginLeft: "39%",
              position: "absolute",
              marginTop: "-340px",
            }}
          >
            {">"}
          </p>
          <Link to={`/get-list-interview-ga/${id}/update/`}>
            <p
              style={{
                marginLeft: "40%",
                position: "absolute",
                marginTop: "-340px",
              }}
            >
              Update
            </p>
          </Link>
          <div
        style={{ marginLeft: "22%", position: "absolute", marginTop: "-180px" }}
        className="w-9/12"
      >
            <div className="rectangle-style" style={rectangleStyle}>
              <p
                style={{
                  marginTop: "20px",
                  marginLeft: "27%",
                  fontWeight: "bold",
                  fontSize: "32px",
                  color: "#2A3E4B",
                  position: "absolute",
                }}
              >
                Ubah Jadwal Wawancara
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
                </p>
                <input
                  type="text"
                  style={{
                    pointerEvents: "none",
                    borderRadius: "5px",
                    border: "2px solid #ccc",
                    height: "40px",
                    width: "76%",
                    marginTop: "110px",
                    marginLeft: "7%",
                    fontWeight: "600",
                    fontSize: "14px",
                    color: "#2A3E4B",
                    position: "absolute",
                  }}
                  value={interview.job_application_id.job.job_name}
                  readOnly
                />
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
                  Applicant
                </p>
                <input
                  type="text"
                  style={{
                    pointerEvents: "none",
                    borderRadius: "5px",
                    border: "2px solid #ccc",
                    height: "40px",
                    width: "76%",
                    marginTop: "210px",
                    marginLeft: "7%",
                    fontWeight: "600",
                    fontSize: "14px",
                    color: "#2A3E4B",
                    position: "absolute",
                  }}
                  value={interview.job_application_id.applicant.user.name}
                  readOnly
                />
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
                  Tanggal Interview
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
                    width: "76%",
                  }}
                  value={
                    interviewData.datetime_start ||
                    (interview && interview.datetime_start
                      ? interview.datetime_start.split("T")[0]
                      : "")
                  }
                  onChange={(e) => {
    const selectedDate = e.target.value;
    const currentTime = new Date();
    const currentDateString = currentTime.toISOString().split("T")[0];
    const currentTimeString = currentTime.toTimeString().slice(0, 5);

    if (selectedDate === currentDateString) {
        const startTime = new Date(
            `${currentDateString}T${interviewData.startTime || "00:00"}`
        );

        if (startTime <= currentTime) {
            alert(
                "Waktu mulai harus setelah waktu saat ini. Harap pilih waktu yang valid."
            );
            return;
        }
    }

    setInterviewData((prevState) => ({
        ...prevState,
        datetime_start: selectedDate,
    }));
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
                  Waktu Mulai Interview
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
                    width: "76%",
                  }}
                  value={
                    interviewData.startTime ||
                    (interview && interview.datetime_start
                      ? interview.datetime_start.slice(11, 16)
                      : "")
                  }
onChange={(e) => {
  const selectedTime = e.target.value;
  const formattedTime = selectedTime.slice(0, 5);
  const startTime = new Date(
    `${interviewData.datetime_start}T${formattedTime}`
  );
  const currentTime = new Date();
  const currentDateString = currentTime.toISOString().split("T")[0];
  const currentTimeString = currentTime.toTimeString().slice(0, 5);

  if (
    interviewData.datetime_start === currentDateString &&
    startTime < currentTime
  ) {
    alert(
      "Tanggal atau waktu mulai tidak valid. Pastikan tanggal dan waktu mulai sesuai."
    );
    return;
  }
  if (
    interviewData.endTime &&
    selectedTime > interviewData.endTime
  ) {
    alert("Waktu mulai tidak boleh lebih melewati waktu akhir.");
    return;
  }

  setInterviewData({
    ...interviewData,
    startTime: formattedTime,
  });
}}
                  min={
                    interviewData.datetime === currentDateString
                      ? currentTimeString
                      : "00:00"
                  }
                  max={
                    interviewData.datetime === currentDateString ? "23:59" : ""
                  }
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
                  Waktu Berakhir Interview
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
                    width: "76%",
                  }}
                  value={
                    interviewData.endTime ||
                    (interview && interview.datetime_end
                      ? interview.datetime_end.slice(11, 16)
                      : "")
                  }
                  onChange={(e) => {
                    const selectedTime = e.target.value;
                    const prevEndTime =
                      interview && interview.datetime_end
                        ? interview.datetime_end.slice(11, 16)
                        : "";

                    if (
                      interviewData.startTime &&
                      selectedTime < interviewData.startTime
                    ) {
                      alert(
                        "Waktu berakhir tidak boleh lebih awal dari waktu mulai."
                      );
                      return;
                    }

                    setInterviewData({
                      ...interviewData,
                      endTime: selectedTime,
                    });
                  }}
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
                  Pewawancara
                </p>
                <select
                  style={{
                    borderRadius: "5px",
                    border: "2px solid #ccc",
                    height: "40px",
                    width: "76%",
                    marginTop: "610px",
                    marginLeft: "7%",
                    fontWeight: "600",
                    fontSize: "14px",
                    color: "#2A3E4B",
                    position: "absolute",
                  }}
                  id="interviewer"
                  value={interviewer}
                  onChange={handleInterviewerChange}
                >
                  <option value="">{interview.interviewer_user_id.name}</option>
                  {interviewers &&
                    interviewers.map((interviewer) => (
                      <option
                        key={interviewer.user_id}
                        value={interviewer.user_id}
                      >
                        {interviewer.name}
                      </option>
                    ))}
                </select>
                <button
                  type="submit"
                  style={{
                    width: "500px",
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
              <button
                onClick={() => deleteInterview(interview.id)}
                style={{
                  width: "500px",
                  padding: "8px",
                  fontSize: "16px",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: "bold",
                  color: "#2A3E4B",
                  borderRadius: "6px",
                  cursor: "pointer",
                  marginTop: "730px",
                  border: "2px solid #2A3E4B",
                  marginLeft: "20%",
                  position: "absolute",
                }}
              >
                Hapus
              </button>
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default UpdateJadwalInteviewGA;