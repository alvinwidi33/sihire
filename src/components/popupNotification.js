import React from 'react';
import styled from 'styled-components';
import successIconImage from '../images/success-icon.png';
import errorIconImage from '../images/fail-icon.png';

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3); /* Semi-transparent grey background */
`;

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

const SuccessIcon = styled.img`
  width: 50px;
  height: 50px;
  margin: 10px auto;
  display: block;
`;

const ErrorIcon = styled.img`
  width: 50px;
  height: 50px;
  margin: 10px auto;
  display: block;
`;

const NotificationPopup = ({ isVisible, onAccept, onClose, popupText, successIcon=false, errorIcon=false, needsConfirmation=false, acceptText='', declineText='' }) => {
  return (
    isVisible && (
      <>
        <Backdrop onClick={onClose} />
        <PopupContainer>
          <CloseButton onClick={onClose}>X</CloseButton>
          {successIcon && <SuccessIcon src={successIconImage} alt="Success Icon" />}
          {errorIcon && <ErrorIcon src={errorIconImage} alt="Error Icon" />}
          <p>{popupText}</p>
          {needsConfirmation && (
            <>
              <BlueButton onClick={onAccept}>{acceptText}</BlueButton>
              <BlueButton onClick={onClose}>{declineText}</BlueButton>
            </>
          )}
        </PopupContainer>
      </>
    )
  );
};

export default NotificationPopup;
