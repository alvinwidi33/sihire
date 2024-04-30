import Navbar from '../components/navbar';
import React, { useEffect, useState } from "react";

function ProjectManagerCards({ pm }) {
  return (
    <div className="flex flex-wrap justify-center">
      {pm.map((manager, index) => (
        <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg h-full w-64 m-4">
          <img className="w-full h-48 object-cover" src={manager.foto} alt={manager.name} />
          <div className="px-6 py-4">
            <div className="font-bold text-lg mb-2 text-center">{manager.name}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function DirectorCards({ dir }) {
  return (
    <div className="flex flex-wrap justify-center">
      {dir.map((director, index) => (
        <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg h-full w-64 m-4">
          <img className="w-full h-48 object-cover" src={director.foto} alt={director.name} />
          <div className="px-6 py-4">
            <div className="font-bold text-lg mb-2 text-center">{director.name}</div>
          </div>
        </div>
      ))}
    </div>
  );
}  

function OurTeam() {
  const [pm, setPm] = useState([]);
  useEffect(() => {
    const getPm = async () => {
      await fetch("https://sihire-be.vercel.app/api/users/get-all-pm/") 
        .then((resp) => resp.json())
        .then((data) => {
          setPm(data);
        });
    };
    getPm();
  }, []);

  const [dir, setDir] = useState([]);
  useEffect(() => {
    const getDir = async () => {
      await fetch("https://sihire-be.vercel.app/api/users/get-all-director/") 
        .then((resp) => resp.json())
        .then((data) => {
          setDir(data);
        });
    };
    getDir();
  }, []);
  
  return (
    <React.Fragment>
      <Navbar/>
      <Navbar/>
      <div>
        <h1 style={{ textAlign: "center", marginTop: "100px", fontWeight: "bold", fontSize: "30px"}}>Our Team</h1>
        <h2 style={{ textAlign: "center", marginTop: "70px", fontWeight: "bold" }}>Director</h2>
        <div className="mt-8">
          <DirectorCards dir={dir} />
        </div>
        <h2 style={{ textAlign: "center", marginTop: "70px", fontWeight: "bold" }}>Project Manager</h2>
        <div className="mt-8">
          <ProjectManagerCards pm={pm} />
        </div>
        <div style={{ marginBottom: "50px" }} />
      </div>
    </React.Fragment>
  );
}

export default OurTeam;
