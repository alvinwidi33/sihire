import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import Popup from "../components/popup";
import InterviewPopup from "../components/popupInterview";
import SidebarApplicant from "../components/sidebar-applicant";
import { Chart } from "react-google-charts";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("rekrutmen");
  const [dataStatus, setDataStatus] = useState([]);
  const [dataPosisi, setDataPosisi] = useState([]);
  const [month, setMonth] = useState("None");
  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };
  const [year, setYear] = useState("None");
  const handleYearChange = (event) => {
    setYear(event.target.value);
  };
  const years = [];
  for (let year = new Date().getFullYear(); year >= 1970; year--) {
    years.push(year);
  }

  const getStatus = async () => {
    const response = await fetch(
      `http://127.0.0.1:8000/api/job-application/get-status?month=${month}&year=${year}`,
      {
        method: "GET",
      }
    );

    if (response.ok) {
      var json_response = await response.json();
      setDataStatus(json_response);
    }
  };

  const getPosisi = async () => {
    const response = await fetch(
      `http://127.0.0.1:8000/api/job-application/get-posisi?month=${month}&year=${year}`,
      {
        method: "GET",
      }
    );

    if (response.ok) {
      var json_response = await response.json();
      setDataPosisi(json_response);
    }
  };

  useEffect(() => {
    getStatus();
    getPosisi();
  }, [month, year]);

  const TabContainer = styled.div`
    display: flex;
    margin-bottom: 20px;
  `;

  const TabButton = styled.button`
    padding: 10px 20px;
    background-color: ${(props) => (props.active ? "#2D3648" : "#FFF")};
    color: ${(props) => (props.active ? "#FFF" : "#2D3648")};
    border: none;
    border-bottom: 2px solid
      ${(props) => (props.active ? "#FFF" : "transparent")};
    border-radius: 5px 5px 0 0;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
      background-color: #2d3648;
      color: #fff;
    }
  `;

  const ContentContainer = styled.div`
    display: ${(props) => (props.active ? "block" : "none")};
  `;

  const SubTitle = styled.h2`
    font-weight: bold;
    font-size: 32px;
    color: #2a3e4b;
    margin-top: 20px;
  `;

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
        Dashboard
      </p>
      <SidebarApplicant />

      <div
        style={{ marginLeft: "22%", position: "absolute", marginTop: "-180px" }}
        className="w-9/12"
      >
        <TabContainer>
          <TabButton
            active={activeTab === "rekrutmen"}
            onClick={() => setActiveTab("rekrutmen")}
          >
            Rangkuman Data Rekrutmen
          </TabButton>
          <TabButton
            active={activeTab === "posisi"}
            onClick={() => setActiveTab("posisi")}
          >
            Posisi Paling Diminati
          </TabButton>
          <TabButton
            active={activeTab === "feedback"}
            onClick={() => setActiveTab("feedback")}
          >
            Rangkuman Feedback
          </TabButton>
        </TabContainer>

        <ContentContainer active={activeTab === "rekrutmen"}>
          <SubTitle>Rangkuman Data Rekrutmen</SubTitle>
          <div>
            <select
              id="monthsDropdown"
              value={month}
              onChange={handleMonthChange}
            >
              <option value="None">All Month</option>
              <option value="01">January</option>
              <option value="02">February</option>
              <option value="03">March</option>
              <option value="04">April</option>
              <option value="05">May</option>
              <option value="06">June</option>
              <option value="07">July</option>
              <option value="08">August</option>
              <option value="09">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
            {years.length != 0 && (
              <select
                id="yearsDropdown"
                value={year}
                onChange={handleYearChange}
              >
                <option value="None">All Year</option>
                {years.map((year, index) => (
                  <option key={index} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            )}

            {dataStatus && (
              <Chart
                chartType="PieChart"
                data={dataStatus}
                width={"100%"}
                height={"400px"}
              />
            )}
          </div>
        </ContentContainer>

        <ContentContainer active={activeTab === "posisi"}>
          <SubTitle>Posisi Paling Diminati</SubTitle>
          <div>
            <select
              id="monthsDropdown"
              value={month}
              onChange={handleMonthChange}
            >
              <option value="None">All Month</option>
              <option value="01">January</option>
              <option value="02">February</option>
              <option value="03">March</option>
              <option value="04">April</option>
              <option value="05">May</option>
              <option value="06">June</option>
              <option value="07">July</option>
              <option value="08">August</option>
              <option value="09">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
            {years.length != 0 && (
              <select
                id="yearsDropdown"
                value={year}
                onChange={handleYearChange}
              >
                <option value="None">All Year</option>
                {years.map((year, index) => (
                  <option key={index} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            )}

            {dataPosisi && (
              <Chart
                chartType="BarChart"
                data={dataPosisi}
                width={"100%"}
                height={"400px"}
              />
            )}
          </div>
        </ContentContainer>

        <ContentContainer active={activeTab === "feedback"}>
          <SubTitle>Rangkuman Feedback</SubTitle>
        </ContentContainer>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
