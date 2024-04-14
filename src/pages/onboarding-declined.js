import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function OnboardingDeclined(props) {
  const path = useLocation(); // Get the applicant from URL parameters
  const history = useNavigate();
  const id = path.pathname.split("/").pop();
  console.log("cowoknya varas", id)
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
  

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <header style={{ textAlign: 'center', borderBottom: '1px solid #000', padding: '10px 0' }}>
        <h1 style={{ margin: '0' }}>Onboarding</h1>
      </header>

      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <h2 style={{ fontSize: '32px', color: '#2A3E4B', fontWeight: 'bold' }}>Onboarding</h2>
      </div>

      <div style={{ boxShadow: '0 2px 10px rgba(0, 0, 0, 0.4)', borderRadius: '10px', padding: '60px', background: '#fff' }}>
        <form onSubmit={handleSubmit}>

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="reason" style={{ fontSize: '14px', color: '#2A3E4B', fontWeight: '600' }}>Alasan Perpindahan Jadwal & Jadwal yang diinginkan</label>
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
    </div>
  );
}

export default OnboardingDeclined;
