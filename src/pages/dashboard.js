import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import Popup from "../components/popup";
import InterviewPopup from "../components/popupInterview";
import SidebarApplicant from "../components/sidebar-applicant";
import { Chart } from "react-google-charts";
import SidebarDirector from "../components/sidebar-director";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("rekrutmen");
  const [dataStatus, setDataStatus] = useState([]);
  const [dataPosisi, setDataPosisi] = useState([]);
  const [dataRating, setDataRating] = useState({});
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
      `https://sihire-be.vercel.app/api/job-application/get-status?month=${month}&year=${year}`,
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
      `https://sihire-be.vercel.app/api/job-application/get-posisi?month=${month}&year=${year}`,
      {
        method: "GET",
      }
    );

    if (response.ok) {
      var json_response = await response.json();
      setDataPosisi(json_response);
    }
  };

  const getRating = async () => {
    const response = await fetch(
      `https://sihire-be.vercel.app/api/job-application/get-rating?month=${month}&year=${year}`,
      {
        method: "GET",
      }
    );

    if (response.ok) {
      var json_response = await response.json();
      setDataRating(json_response);
    }
  };

  useEffect(() => {
    getStatus();
    getPosisi();
    getRating();
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
      <SidebarDirector />

      <div
        style={{ marginLeft: "22%", position: "absolute", marginTop: "-320px" }}
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
            <div className="flex justify-center">
              <div className="flex gap-4">
                <select
                  id="monthsDropdown"
                  value={month}
                  onChange={handleMonthChange}
                  className="px-20 py-2 border border-black rounded rounded-lg"
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
                    className="px-20 py-2 border border-black rounded rounded-lg"
                  >
                    <option value="None">All Year</option>
                    {years.map((year, index) => (
                      <option key={index} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>

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
            <div className="flex justify-center">
              <div className="flex gap-4">
                <select
                  id="monthsDropdown"
                  value={month}
                  onChange={handleMonthChange}
                  className="px-20 py-2 border border-black rounded rounded-lg"
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
                    className="px-20 py-2 border border-black rounded rounded-lg"
                  >
                    <option value="None">All Year</option>
                    {years.map((year, index) => (
                      <option key={index} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>

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
          <div>
            <div className="flex justify-center mb-10">
              <div className="flex gap-4">
                <select
                  id="monthsDropdown"
                  value={month}
                  onChange={handleMonthChange}
                  className="px-20 py-2 border border-black rounded rounded-lg"
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
                    className="px-20 py-2 border border-black rounded rounded-lg"
                  >
                    <option value="None">All Year</option>
                    {years.map((year, index) => (
                      <option key={index} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>

            {dataRating && (
              <div>
                <div className="flex justify-center">
                  <div>
                    <div className="flex">
                      {dataRating.average > 1 ? (
                        <svg
                          width="49"
                          height="48"
                          viewBox="0 0 49 48"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M24.4986 5L18.3856 17.4776L4.5 19.4911L14.5589 29.3251L12.1544 43L24.4986 36.4192L36.8454 43L34.4586 29.3251L44.5 19.4911L30.6913 17.4776L24.4986 5Z"
                            fill="#333333"
                            stroke="#333333"
                            strokeWidth="4"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="49"
                          height="48"
                          viewBox="0 0 49 48"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M24.4986 5L18.3856 17.4776L4.5 19.4911L14.5589 29.3251L12.1544 43L24.4986 36.4192L36.8454 43L34.4586 29.3251L44.5 19.4911L30.6913 17.4776L24.4986 5Z"
                            stroke="#333333"
                            stroke-width="4"
                            stroke-linejoin="round"
                          />
                        </svg>
                      )}
                      {dataRating.average > 2 ? (
                        <svg
                          width="49"
                          height="48"
                          viewBox="0 0 49 48"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M24.4986 5L18.3856 17.4776L4.5 19.4911L14.5589 29.3251L12.1544 43L24.4986 36.4192L36.8454 43L34.4586 29.3251L44.5 19.4911L30.6913 17.4776L24.4986 5Z"
                            fill="#333333"
                            stroke="#333333"
                            strokeWidth="4"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="49"
                          height="48"
                          viewBox="0 0 49 48"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M24.4986 5L18.3856 17.4776L4.5 19.4911L14.5589 29.3251L12.1544 43L24.4986 36.4192L36.8454 43L34.4586 29.3251L44.5 19.4911L30.6913 17.4776L24.4986 5Z"
                            stroke="#333333"
                            stroke-width="4"
                            stroke-linejoin="round"
                          />
                        </svg>
                      )}
                      {dataRating.average > 3 ? (
                        <svg
                          width="49"
                          height="48"
                          viewBox="0 0 49 48"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M24.4986 5L18.3856 17.4776L4.5 19.4911L14.5589 29.3251L12.1544 43L24.4986 36.4192L36.8454 43L34.4586 29.3251L44.5 19.4911L30.6913 17.4776L24.4986 5Z"
                            fill="#333333"
                            stroke="#333333"
                            strokeWidth="4"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="49"
                          height="48"
                          viewBox="0 0 49 48"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M24.4986 5L18.3856 17.4776L4.5 19.4911L14.5589 29.3251L12.1544 43L24.4986 36.4192L36.8454 43L34.4586 29.3251L44.5 19.4911L30.6913 17.4776L24.4986 5Z"
                            stroke="#333333"
                            stroke-width="4"
                            stroke-linejoin="round"
                          />
                        </svg>
                      )}
                      {dataRating.average > 4 ? (
                        <svg
                          width="49"
                          height="48"
                          viewBox="0 0 49 48"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M24.4986 5L18.3856 17.4776L4.5 19.4911L14.5589 29.3251L12.1544 43L24.4986 36.4192L36.8454 43L34.4586 29.3251L44.5 19.4911L30.6913 17.4776L24.4986 5Z"
                            fill="#333333"
                            stroke="#333333"
                            strokeWidth="4"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="49"
                          height="48"
                          viewBox="0 0 49 48"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M24.4986 5L18.3856 17.4776L4.5 19.4911L14.5589 29.3251L12.1544 43L24.4986 36.4192L36.8454 43L34.4586 29.3251L44.5 19.4911L30.6913 17.4776L24.4986 5Z"
                            stroke="#333333"
                            stroke-width="4"
                            stroke-linejoin="round"
                          />
                        </svg>
                      )}
                      {dataRating.average == 5 ? (
                        <svg
                          width="49"
                          height="48"
                          viewBox="0 0 49 48"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M24.4986 5L18.3856 17.4776L4.5 19.4911L14.5589 29.3251L12.1544 43L24.4986 36.4192L36.8454 43L34.4586 29.3251L44.5 19.4911L30.6913 17.4776L24.4986 5Z"
                            fill="#333333"
                            stroke="#333333"
                            strokeWidth="4"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="49"
                          height="48"
                          viewBox="0 0 49 48"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M24.4986 5L18.3856 17.4776L4.5 19.4911L14.5589 29.3251L12.1544 43L24.4986 36.4192L36.8454 43L34.4586 29.3251L44.5 19.4911L30.6913 17.4776L24.4986 5Z"
                            stroke="#333333"
                            stroke-width="4"
                            stroke-linejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                    <p className="mx-auto">{dataRating.average}</p>
                  </div>
                </div>
                <Chart
                  chartType="BarChart"
                  data={dataRating.count}
                  width={"100%"}
                  height={"400px"}
                />
              </div>
            )}
          </div>
        </ContentContainer>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
