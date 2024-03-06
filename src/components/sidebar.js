import React, { useState } from 'react';
import Logo from "../images/logo.png";


function Sidebar() {
const [activePage, setActivePage] = useState('Job Posting');

  const handleButtonClick = (page) => {
    setActivePage(page);
  };
  return (
    <React.Fragment>
      <div className="vertical-line" style={{ marginLeft: '18%', height: '100%', borderLeft: '2px solid #2A3E4B', position: 'absolute', top: '0', bottom: '0' }}></div>
      <div style={{ position: 'relative' }}>
        <img src={Logo} alt="Logo" style={{ width: '169px', height: '48px', marginBottom: '20px', marginTop: '12px', marginLeft: '2%' }} />
        <div className="horizontal-line" style={{ marginLeft:'18%', width: '82%', height: '2px', borderTop: '2px solid #2A3E4B', marginBottom: '20px', marginRight: '10px' }}></div>
      </div>
      <div className="sidebar" style={{ marginTop: '2px'}}>
      <ul>
        <li>
          <button
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 'medium',
              display: 'block',
              marginBottom: '16px',
              border: 'none',
              background: activePage === 'Job Posting' ? '#E2E7F0' : '#fff',
              height:'32px',
              width: '18%',
              textAlign: 'left',
              paddingLeft: '2%', 
            }}
            onClick={() => handleButtonClick('Job Posting')}
          >
            Job Posting
          </button>
        </li>
        <li>
          <button
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 'medium',
              display: 'block',
              marginBottom: '16px',
              border: 'none',
              background: activePage === 'Applicants' ? '#E2E7F0' : '#fff',
              height:'32px',
              width: '18%', 
              textAlign: 'left',
              paddingLeft: '2%',  
            }}
            onClick={() => handleButtonClick('Applicants')}
          >
            Applicants
          </button>
        </li>
        <li>
          <button
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 'medium',
              display: 'block',
              marginBottom: '16px',
              border: 'none',
              background: activePage === 'Feedback' ? '#E2E7F0' : '#fff',
              height:'32px',
              width: '18%',
              textAlign: 'left',
              paddingLeft: '2%', 
            }}
            onClick={() => handleButtonClick('Feedback')}
          >
            Feedback
          </button>
        </li>
        <li>
          <button
  style={{
    fontFamily: 'Inter, sans-serif',
    fontWeight: 'medium',
    display: 'block',
    marginBottom: '16px',
    border: 'none',
    background: activePage === 'On Boarding' ? '#E2E7F0' : '#fff',
    height:'32px',
    width: '18%',
    textAlign: 'left',
    paddingLeft: '2%', 
  }}
  onClick={() => handleButtonClick('On Boarding')}
>
  On Boarding
</button>

        </li>
      </ul>
    </div>

    </React.Fragment>
  );
}

export default Sidebar;
