import React, { useState } from 'react';

function OnboardingDeclined() {
  const [onboardingTime, setOnboardingTime] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
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
            <label htmlFor="onboarding-time" style={{ fontSize: '14px', color: '#2A3E4B', fontWeight: '600' }}>Waktu Onboarding</label>
            <input
              type="text"
              id="onboarding-time"
              value={onboardingTime}
              onChange={(e) => setOnboardingTime(e.target.value)}
              style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '2px solid #CBD2E0' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="reason" style={{ fontSize: '14px', color: '#2A3E4B', fontWeight: '600' }}>Alasan</label>
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
