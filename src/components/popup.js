import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const PopupContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border: 1px solid black;
  border-radius: 5px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px;
  font-size: 16px;
  font-family: Inter, sans-serif;
  font-weight: bold;
  color: #fff;
  background-color: #2a3e4b;
  border: 2px solid #2a3e4b;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #0056b3;
    border-color: #0056b3;
  }
`;

const BlueButton = styled.button`
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

const Popup = ({ isVisible, onAccept, id, onClose }) => {
  return (
    isVisible && (
      <PopupContainer>
        <CloseButton onClick={onClose}>X</CloseButton> {/* Close button */}
        <p>Do you want to accept or propose another time?</p>
        <BlueButton onClick={onAccept}>Accept</BlueButton>
        <Link to={`/onboarding-declined/${id}`}>
          <BlueButton>Ajukan waktu lain</BlueButton>
        </Link>
      </PopupContainer>
    )
  );
};

export default Popup;
