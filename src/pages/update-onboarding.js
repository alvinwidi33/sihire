import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SidebarGA from "../components/sidebar-ga";

function UpdateOnboarding() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [interviewers, setInterviewers] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [onboarding, setOnboarding] = useState(null);
  const [onboardingData, setOnboardingData] = useState({
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
    width: "70%",
    height: "850px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    marginLeft: "22%",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.4)",
    marginTop: "-14%",
  };

  useEffect(() => {
    const getOnboarding = async () => {
      try {
        const response = await fetch(
          `https://sihire-be.vercel.app/api/onboarding/get-onboarding/${id}/`
        );
        const data = await response.json();
        setOnboarding(data);
        setInterviewer(data?.pic_user_id || "");
      } catch (error) {
        console.error("Error fetching onboarding:", error);
      }
    };
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
    getOnboarding();
    getAvailableInterviewers();
  }, [id]);

  const handleInterviewerChange = (event) => {
    setInterviewer(event.target.value);
    setOnboardingData({ ...onboardingData, interviewer: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isConfirmed = window.confirm(
      "Apakah Anda yakin ingin memperbarui onboarding?"
    );

    if (!isConfirmed) {
      return;
    }
    const datetimeStart =
      onboardingData.datetime_start && !onboardingData.startTime // hanya ganti tanggal
        ? new Date(
            onboardingData.datetime_start +
              "T" +
              onboarding.datetime_start.slice(11, 16)
          )
        : !onboardingData.datetime_start && onboardingData.startTime // hanya ganti jam mulai
        ? new Date(
            onboarding.datetime_start.slice(0, 10) +
              "T" +
              onboardingData.startTime
          )
        : onboardingData.datetime_start && onboardingData.startTime // ganti tanggal dan jam mulai
        ? new Date(
            onboardingData.datetime_start + "T" + onboardingData.startTime
          )
        : new Date(onboarding.datetime_start); // tidak diganti

    const datetimeEnd =
      onboardingData.datetime_start && !onboardingData.endTime // hanya ganti tanggal
        ? new Date(
            onboardingData.datetime_start +
              "T" +
              onboarding.datetime_start.slice(11, 16)
          )
        : !onboardingData.datetime_start && onboardingData.endTime // hanya ganti jam selesai
        ? new Date(
            onboarding.datetime_end.slice(0, 10) + "T" + onboardingData.endTime
          )
        : onboardingData.datetime_start && onboardingData.endTime // ganti tanggal dan jam selesai
        ? new Date(onboardingData.datetime_end + "T" + onboardingData.endTime)
        : new Date(onboarding.datetime_end); //
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
      datetime_end: datetimeEnd.toISOString(),
      pic_user_id: onboardingData.interviewer
        ? onboardingData.interviewer
        : onboarding.pic_user_id.user_id,
      job_application_id: onboarding.job_application_id.id,
    };

    try {
      const response = await fetch(
        `https://sihire-be.vercel.app/api/onboarding/edit-onboarding-perusahaan/${id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit onboarding schedule");
      }

      if (response.ok) {
        setSuccessMessage("Onboarding berhasil diperbarui!");
        setTimeout(() => {
          setSuccessMessage("");
          navigate("/get-list-interview-ga");
        }, 5000);
      } else {
        console.error("Failed to post onboarding", response.statusText);
      }
    } catch (error) {
      console.error("Error updating onboarding:", error);
    }
  };

  const deleteOnboarding = async (id) => {
    try {
      const response = await fetch(
        `https://sihire-be.vercel.app/api/onboarding/delete-onboarding/${id}/`,
        {
          method: "DELETE",
        }
      );
      const isConfirmed = window.confirm(
        "Apakah Anda yakin ingin menghapus onboarding?"
      );

      if (isConfirmed && response.ok) {
        setSuccessMessage("Onboarding berhasil dihapus.");
        await new Promise((resolve) => setTimeout(resolve, 5000));
        setSuccessMessage("");
        navigate("/get-list-interview-ga");
        setOnboarding(null);
      }
    } catch (error) {
      console.error("Error deleting onboarding:", error);
      setSuccessMessage("Terjadi kesalahan saat menghapus onboarding.");
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
      <SidebarGA />
      <Link to="/get-list-interview-ga">
        <p
          style={{
            marginLeft: "22%",
            position: "absolute",
            marginTop: "-240px",
          }}
        >
          List Onboarding
        </p>
      </Link>
      <p
        style={{ marginLeft: "30%", position: "absolute", marginTop: "-240px" }}
      >
        {">"}
      </p>
      {onboarding && (
        <React.Fragment key={onboarding.id}>
          <Link to={`/get-list-interview-ga/${id}`}>
            <p
              style={{
                marginLeft: "31%",
                position: "absolute",
                marginTop: "-240px",
              }}
            >
              {onboarding.job_application_id.job.job_name}
            </p>
          </Link>
          <p
            style={{
              marginLeft: "39%",
              position: "absolute",
              marginTop: "-240px",
            }}
          >
            {">"}
          </p>
          <Link to={`/get-list-interview-ga/${id}/update/`}>
            <p
              style={{
                marginLeft: "40%",
                position: "absolute",
                marginTop: "-240px",
              }}
            >
              Update
            </p>
          </Link>
          <div className="update-interview">
            <div className="rectangle-style" style={rectangleStyle}>
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
                Ubah Jadwal Onboarding
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
                    width: "56%",
                    marginTop: "110px",
                    marginLeft: "7%",
                    fontWeight: "600",
                    fontSize: "14px",
                    color: "#2A3E4B",
                    position: "absolute",
                  }}
                  value={onboarding.job_application_id.job.job_name}
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
                    width: "56%",
                    marginTop: "210px",
                    marginLeft: "7%",
                    fontWeight: "600",
                    fontSize: "14px",
                    color: "#2A3E4B",
                    position: "absolute",
                  }}
                  value={onboarding.job_application_id.applicant.user.name}
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
                  Tanggal Onboarding*
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
                  value={
                    onboardingData.datetime_start ||
                    (onboarding && onboarding.datetime_start
                      ? onboarding.datetime_start.split("T")[0]
                      : "")
                  }
                  onChange={(e) => {
                    const selectedDate = e.target.value;
                    const currentTime = new Date();
                    const currentDateString = currentTime
                      .toISOString()
                      .split("T")[0];
                    const currentTimeString = currentTime
                      .toTimeString()
                      .slice(0, 5);

                    const startTime = new Date(
                    `${selectedDate}T${onboardingData.startTime}`
                  );

                    if (
                      selectedDate === currentDateString &&
                      startTime < currentTime
                    ) {
                      alert(
                        "Tanggal atau waktu mulai tidak valid. Pastikan tanggal dan waktu mulai sesuai."
                      );
                      return;
                    }

                    setOnboardingData((prevState) => ({
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
                  Waktu Mulai Onboarding*
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
                  value={
                    onboardingData.startTime ||
                    (onboarding && onboarding.datetime_start
                      ? onboarding.datetime_start.slice(11, 16)
                      : "")
                  }
                  onChange={(e) => {
                    const selectedTime = e.target.value;
                    const formattedTime = selectedTime.slice(0, 5);
                    const startTime = new Date(
                      `${onboardingData.datetime_start}T${formattedTime}`
                    );
                    const currentTime = new Date();
                    const currentDateString = currentTime
                      .toISOString()
                      .split("T")[0];
                    const currentTimeString = currentTime
                      .toTimeString()
                      .slice(0, 5);

                    if (
                      onboardingData.datetime_start === currentDateString &&
                      startTime < currentTime
                    ) {
                      alert(
                        "Tanggal atau waktu mulai tidak valid. Pastikan tanggal dan waktu mulai sesuai."
                      );
                      return;
                    }

                    setOnboardingData({
                      ...onboardingData,
                      startTime: formattedTime,
                    });
                  }}
                  min={
                    onboardingData.datetime === currentDateString
                      ? currentTimeString
                      : "00:00"
                  }
                  max={
                    onboardingData.datetime === currentDateString ? "23:59" : ""
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
                  Waktu Berakhir Onboarding*
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
                  value={
                    onboardingData.endTime ||
                    (onboarding && onboarding.datetime_end
                      ? onboarding.datetime_end.slice(11, 16)
                      : "")
                  }
                  onChange={(e) => {
                    const selectedTime = e.target.value;
                    const prevEndTime =
                      onboarding && onboarding.datetime_end
                        ? onboarding.datetime_end.slice(11, 16)
                        : "";

                    if (
                      onboardingData.startTime &&
                      selectedTime < onboardingData.startTime
                    ) {
                      alert(
                        "Waktu berakhir tidak boleh lebih awal dari waktu mulai."
                      );
                      return;
                    }
                    setOnboardingData({
                      ...onboardingData,
                      endTime: selectedTime,
                    });
                  }}
                  min={
                    onboardingData.datetime_end === currentDateString
                      ? currentTimeString
                      : "00:00"
                  }
                  max={
                    onboardingData.datetime_end === currentDateString
                      ? "23:59"
                      : ""
                  }
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
                  Pewawancara*
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
                  id="interviewer"
                  value={interviewer}
                  onChange={handleInterviewerChange}
                >
                  <option value="">{onboarding.pic_user_id.name}</option>
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
                    marginLeft: "17%",
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
                onClick={() => deleteOnboarding(onboarding.id)}
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
                  marginLeft: "17%",
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

export default UpdateOnboarding;
