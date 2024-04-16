import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const PopupContainer = styled.div`
position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
background-color: white;
padding: 40px;
border: 1px solid black;
border-radius: 5px;
text-align: center; /* Center-align content */
`;

const CloseButton = styled.button`
position: absolute;
top: 10px;
right: 10px;
padding: 5px;
font-size: 16px;
font-family: Inter, sans-serif;
font-weight: bold;
color: #2a3e4b;
border: none; /* Removed border */
cursor: pointer;
transition: all 0.3s ease;
`;

const BlueButton = styled.button`
margin-top: 10px; /* Add margin to separate buttons */
margin-left: 10px; /* Add margin to separate buttons */
padding: 8px 16px;
font-size: 16px;
font-family: Inter, sans-serif;
font-weight: bold;
color: #fff;
background-color: #2a3e4b;
border: 2px solid #2a3e4b;
border-radius: 6px;
cursor: pointer;
transition: all 0.3s ease;

&:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}
`;

const InterviewPopup = ({ isVisible, onAccept, id, onClose }) => {
  return (
    isVisible && (
      <PopupContainer>
        <CloseButton onClick={onClose}>X</CloseButton> {/* Close button */}
        <p>Apakah Anda ingin menerima atau Ajukan waktu lain?</p>
        <BlueButton onClick={onAccept}>Terima</BlueButton>
        <Link to={`/decline-interview/${id}`}>
          <BlueButton>Ajukan waktu lain</BlueButton>
        </Link>
      </PopupContainer>
    )
  );
};

export default InterviewPopup;
