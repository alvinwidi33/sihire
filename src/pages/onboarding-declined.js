// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import Sidebar from "../components/sidebar-applicant";

// function OnboardingDeclined(props) {
//   const path = useLocation(); // Get the applicant from URL parameters
//   const history = useNavigate();
//   const id = path.pathname.split("/").pop();
//   const [reason, setReason] = useState('');

//   const handleSubmit = async (e) => {

//     e.preventDefault();
//     try {
//       const response = await fetch(`https://sihire-be.vercel.app/api/onboarding/edit-onboarding-applicant/${id}/`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ reschedule_comment: reason }),
//       });
  
//       if (!response.ok) {
//         throw new Error('Failed to update onboarding.');
//       }
  
//       // Clear the reason input field upon successful submission
//       setReason('');
  
//       // Show success message or redirect to another page
//       alert('Onboarding reschedule comment updated successfully.');
  
//       // Optionally, redirect the user to another page after successful submission
//       history(-1);
//     } catch (error) {
//       console.error('Error updating onboarding:', error);
//       // Show error message to the user
//       alert('Failed to update onboarding. Please try again later.');
//     }
//   };
  

//   return (
//     <div style={{ maxWidth: '800px', margin: '0 auto' }}>
//       <p style={{ marginLeft: "22%",
//           fontWeight: "bold",
//           fontSize: "32px",
//           color: "#2A3E4B",
//           position: "absolute",
//           marginTop: "12px", }}>Onboarding</p>
//       <Sidebar />

//       <div style={{ textAlign: 'center', margin: '20px 0' }}>
//         <h2 style={{ fontSize: '32px', color: '#2A3E4B', fontWeight: 'bold' }}>Onboarding</h2>
//       </div>

//       <div style={{ boxShadow: '0 2px 10px rgba(0, 0, 0, 0.4)', borderRadius: '10px', padding: '60px', background: '#fff' }}>
//         <form onSubmit={handleSubmit}>

//           <div style={{ marginBottom: '20px' }}>
//             <label htmlFor="reason" style={{ fontSize: '14px', color: '#2A3E4B', fontWeight: '600' }}>Alasan Perpindahan Jadwal & Jadwal yang diinginkan</label>
//             <textarea
//               id="reason"
//               value={reason}
//               onChange={(e) => setReason(e.target.value)}
//               style={{ width: '100%', height: '200px', padding: '8px', borderRadius: '5px', border: '2px solid #CBD2E0', resize: 'none' }}
//             ></textarea>
//           </div>

//           <div style={{ display: 'flex', justifyContent: 'center' }}>

//             <button type="submit" style={{ width: '30%', padding: '12px', fontSize: '16px', fontFamily: 'Inter, sans-serif', fontWeight: 'bold', color: '#fff', background: '#2A3E4B', borderRadius: '6px', border: '2px solid #2A3E4B', cursor: 'pointer' }}>Submit</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default OnboardingDeclined;

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SidebarApplicant from "../components/sidebar-applicant";

function OnboardingDeclined(props) {
  const path = useLocation(); // Get the applicant from URL parameters
  const history = useNavigate();
  const id = path.pathname.split("/").pop();
  const [reason, setReason] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://sihire-be.vercel.app/api/onboarding/edit-onboarding-applicant/${id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reschedule_comment: reason }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update onboarding.');
      }
  
      // Clear the reason input field upon successful submission
      setReason('');
  
      // Show success message or redirect to another page
      alert('Onboarding reschedule comment updated successfully.');
  
      // Optionally, redirect the user to another page after successful submission
      history(-1);
    } catch (error) {
      console.error('Error updating onboarding:', error);
      // Show error message to the user
      alert('Failed to update onboarding. Please try again later.');
    }
  };

  const darkBlueText = {
    color: 'var(--WF-Base-800, #2D3648)',
    fontFamily: 'Inter, sans-serif',
    fontSize: "27px"
};

  const rectangleStyle = {
    width: "70%",
    height: "850px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    marginLeft: "22%",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.4)",
    marginTop: "-14%",
  };


  return (
    <React.Fragment>
      <p style={{ marginLeft: "22%",
          fontWeight: "bold",
          fontSize: "32px",
          color: "#2A3E4B",
          position: "absolute",
          marginTop: "12px", }}>Onboarding</p>
      <SidebarApplicant /> {/* Place Sidebar component here */}

      {/* <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <h2 style={{ fontSize: '32px', color: '#2A3E4B', fontWeight: 'bold' }}>Onboarding</h2>
      </div> */}

      <div style={{ marginLeft: "22%", marginRight: "5%", marginTop: "-160px", boxShadow: '0 2px 10px rgba(0, 0, 0, 0.4)', borderRadius: '10px', padding: '60px', background: '#fff' }}>
      <h2 className="text-lg font-semibold mb-4 text-center" style={darkBlueText}>Perubahan Jadwal Onboarding</h2>
        <form onSubmit={handleSubmit}>

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="reason" style={{ fontSize: '15px', color: '#2A3E4B', fontWeight: '600' }}>Alasan Perpindahan Jadwal & Jadwal yang diinginkan</label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              style={{ width: '100%', height: '200px', padding: '8px', borderRadius: '5px', border: '2px solid #CBD2E0', resize: 'none' }}
            ></textarea>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>

            <button type="submit" style={{ width: '30%', padding: '12px', fontSize: '16px', fontFamily: 'Inter, sans-serif', fontWeight: 'bold', color: '#fff', background: '#2A3E4B', borderRadius: '6px', border: '2px solid #2A3E4B', cursor: 'pointer' }}>Submit</button>
          </div>
        </form>
      </div>
      </React.Fragment>
  );
}

export default OnboardingDeclined;

