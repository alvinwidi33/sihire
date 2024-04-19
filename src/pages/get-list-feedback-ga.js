import React from 'react';
import SidebarGA from "../components/sidebar-ga";

function GetListFeedbackGA() {
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
        Feedback
      </p>
        <SidebarGA/>
            <div style={{ marginLeft: "22%", position: "absolute", marginTop: "-40px" }} className="w-9/12">
                <p
                style={{
                    marginLeft: "0",
                    fontWeight: "bold",
                    fontSize: "32px",
                    color: "#2A3E4B",
                    marginTop: "-300px",
                    marginBottom: "12px",
                }}
                >
          List Feedback
        </p>
        <div className="py-5 rounded rounded-xl border border-2 border-black" style={{ height: '160px', marginBottom: "12px" }}>
            <h2 className="text-xl font-semibold" style={{ textAlign: "center" }}>Filter Feedback</h2>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom:"4px" }}>
                    <p style={{ marginLeft: "22.5%", fontSize: "16px",
                color: "#2A3E4B", }}>Rating</p>
                    <p style={{ marginLeft:"47%", marginRight:"auto", fontSize: "16px",
                color: "#2A3E4B", }}>Posisi</p>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ marginLeft: "2%", border: "2px solid black", borderRadius: "5px", width: "47%", height:"36px" }}>
                        <select style={{ border: "none", width: "100%", textAlign: "center", height:"32px" }}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <div style={{ marginLeft: "2%", marginRight: "2%", border: "2px solid black", borderRadius: "5px", width: "45%" }}>
                        <select style={{ border: "none", width: "100%", textAlign: "center", height:"32px" }}>
                        </select>
                    </div>
                </div>
        </div>
         <table
            style={{
              borderCollapse: "collapse",
              width: "95%",
              padding:"12px",
              marginLeft:"2.5%"
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    border: "2px solid #2A3E4B",
                    padding: "8px",
                    textAlign: "center",
                    fontWeight: "bold",
                    background:"#2A3E4B",
                    color:"white",
                    width: "100px" 
                  }}
                >
                  Rating
                </th>
                <th
                  style={{
                    border: "2px solid #2A3E4B",
                    padding: "8px",
                    textAlign: "center",
                    fontWeight: "bold",
                    background:"#2A3E4B",
                    color:"white",
                    width: "180px" 
                  }}
                >
                  Nama Pelamar
                </th>
                <th
                  style={{
                    border: "2px solid #2A3E4B",
                    padding: "8px",
                    textAlign: "center",
                    fontWeight: "bold",
                    background:"#2A3E4B",
                    color:"white",
                    width: "180px" 
                  }}
                >
                  Username
                </th>
                <th
                  style={{
                    border: "2px solid #2A3E4B",
                    padding: "8px",
                    textAlign: "center",
                    fontWeight: "bold",
                    background:"#2A3E4B",
                    color:"white",
                    width: "180px" 
                  }}
                >
                  Posisi
                </th>
                <th
                  style={{
                    border: "2px solid #2A3E4B",
                    padding: "8px",
                    textAlign: "center",
                    fontWeight: "bold",
                    background:"#2A3E4B",
                    color:"white",
                    width: "400px" , 
                  }}
                >
                  Deskripsi
                </th>
              </tr>
            </thead>
            </table>
            <tbody>

            </tbody>
            </div>
        </React.Fragment>
    );
}

export default GetListFeedbackGA;