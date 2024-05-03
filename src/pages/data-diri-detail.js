import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { createClient } from "@supabase/supabase-js";
import { FileText } from 'lucide-react';
import SidebarOther from '../components/sidebar-other';
import SidebarGA from '../components/sidebar-ga';
import SidebarApplicant from '../components/sidebar-applicant';
import SidebarDirector from '../components/sidebar-director';

const supabase = createClient(
  "https://lwchpknnmkmpfbkwcrjs.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3Y2hwa25ubWttcGZia3djcmpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM4Njc3MTQsImV4cCI6MjAyOTQ0MzcxNH0.J7OHUVBFnaRF5b_cpX3LEYfD3uFSrzz6_DnCK3pfPHU"
);

function DataDiriDetail() {
    const [user, setUser] = useState(null);

  const { id } = useParams();
  const [formData, setFormData] = useState({
    applicant: '',
    nama: '',
    email: '',
    noTelepon: '',
    cv: '',
    coverLetter: '',
    status: '',
  });
  useEffect(() => {
    const getUser = async () => {
        try {
            const response = await fetch('https://sihire-be.vercel.app/api/users/logged-in/', {
                method: 'GET',
                headers: {
                    'Authorization': 'Token ' + window.localStorage.getItem("token")
                },
              });
            const data = await response.json();
            setUser(data);
            console.log("data",data)
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    }
    getUser();
})

  useEffect(() => {
    const fetchOnboardingData = async () => {
      try {
        const response = await fetch(
          'https://sihire-be.vercel.app/api/onboarding/get-onboarding/' + id + '/',
          {
            method: 'GET',
          }
        );
        const onboardingData = await response.json();
        const { data, error } = await supabase.storage
          .from("sihire")
          .createSignedUrls(
            [onboardingData.ktp, onboardingData.bank, onboardingData.bpjs, onboardingData.npwp, onboardingData.foto_diri],
            60
          );

        setFormData({
          ...formData,
          ktp: data[0].signedUrl,
          bank: data[1].signedUrl,
          bpjs: data[2].signedUrl,
          npwp: data[3].signedUrl,
          foto_diri: data[4].signedUrl
        });

      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchOnboardingData();
  }, []); 

  return (
    <React.Fragment>
      {user && (
    <>
        {user.role === "General Affairs" ? (
            <><SidebarGA /><p
                style={{
                    marginLeft: "22%",
                    fontWeight: "bold",
                    fontSize: "32px",
                    color: "#2A3E4B",
                    position: "absolute",
                    marginTop: "-32%"
                }}
            >
                On Boarding
            </p></>
        ) : user.role === "Applicant" ? (
            <><SidebarApplicant /><p
                style={{
                    marginLeft: "22%",
                    fontWeight: "bold",
                    fontSize: "32px",
                    color: "#2A3E4B",
                    position: "absolute",
                    marginTop: "-21%"
                }}
            >
                On Boarding
            </p></>
        ) : user.role === "Director" ? (
            <><SidebarDirector /><p
            style={{
                marginLeft: "22%",
                fontWeight: "bold",
                fontSize: "32px",
                color: "#2A3E4B",
                position: "absolute",
                marginTop: "-35%"
            }}
        >
            On Boarding
        </p></>
        ) : (
            <><SidebarOther /><p
                style={{
                    marginLeft: "22%",
                    fontWeight: "bold",
                    fontSize: "32px",
                    color: "#2A3E4B",
                    position: "absolute",
                    marginTop: "-32%"
                }}
            >
                On Boarding
            </p></>
        )}
    </>
)}

    <div className="min-h-screen flex" style={{ marginLeft:"18%", marginTop:"-20%"}}>
      <div className="container mx-auto mt-8 md:mt-16 w-11/12">
        <div className="p-4 bg-white rounded-lg shadow-md flex flex-col" style={{boxShadow: '0 2px 10px rgba(0, 0, 0, 0.4)'}}>
        <h2 className="text-2xl font-bold mb-2">Data Diri</h2>
        <br></br>
          <div className="mt-4 grid grid-cols-3 gap-5">
            <div>
            <strong>KTP</strong>
              {formData.ktp ? (
                <a
                  href={formData.ktp}
                  target="__blank"
                  rel="noopener noreferrer"
                  className="mt-2"
                >
                  <FileText color="#bc3434" />
                </a>
              ) : (
                <a
                  href={formData.ktp}
                  target="__blank"
                  rel="noopener noreferrer"
                  className="mt-2 cursor-not-allowed"
                >
                  <FileText color="#707070" />
                </a>
              )}
              <br />
              <strong>Rekening Bank</strong>
              {formData.bank ? (
                <a
                  href={formData.bank}
                  target="__blank"
                  rel="noopener noreferrer"
                  className="mt-2"
                >
                  <FileText color="#bc3434" />
                </a>
              ) : (
                <a
                  href={formData.bank}
                  target="__blank"
                  rel="noopener noreferrer"
                  className="mt-2 cursor-not-allowed"
                >
                  <FileText color="#707070" />
                </a>
              )}
            </div>
            <div>
            <strong>BPJS</strong>
              {formData.bpjs ? (
                <a
                  href={formData.bpjs}
                  target="__blank"
                  rel="noopener noreferrer"
                  className="mt-2"
                >
                  <FileText color="#bc3434" />
                </a>
              ) : (
                <a
                  href={formData.bpjs}
                  target="__blank"
                  rel="noopener noreferrer"
                  className="mt-2 cursor-not-allowed"
                >
                  <FileText color="#707070" />
                </a>
              )}
              <br />
              <strong>NPWP</strong>
              {formData.npwp ? (
                <a
                  href={formData.npwp}
                  target="__blank"
                  rel="noopener noreferrer"
                  className="mt-2"
                >
                  <FileText color="#bc3434" />
                </a>
              ) : (
                <a
                  href={formData.npwp}
                  target="__blank"
                  rel="noopener noreferrer"
                  className="mt-2 cursor-not-allowed"
                >
                  <FileText color="#707070" />
                </a>
              )}
              <br />
            
            </div>
            <div>
            <strong>Foto Diri</strong>
              {formData.foto_diri ? (
                <a
                  href={formData.foto_diri}
                  target="__blank"
                  rel="noopener noreferrer"
                  className="mt-2"
                >
                  <FileText color="#bc3434" />
                </a>
              ) : (
                <a
                  href={formData.foto_diri}
                  target="__blank"
                  rel="noopener noreferrer"
                  className="mt-2 cursor-not-allowed"
                >
                  <FileText color="#707070" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </React.Fragment>
  );
}

export default DataDiriDetail;
