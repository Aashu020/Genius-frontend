// NotificationModal.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const StyledIcon = styled(FontAwesomeIcon)`
  color: white;
  font-size: 1.5rem;
  margin-right:10px;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${({ show }) => (show ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  z-index: 101;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
  text-align: center;
`;

const CloseButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;
`;

const NotificationModal = () => {
  const [showModal, setShowModal] = useState(false);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      {/* Notification Icon */}
      <StyledIcon icon={faBell} onClick={handleToggleModal} />

      {/* Modal */}
      <ModalOverlay show={showModal}>
        <ModalContent>
          <h2>Notification</h2>
          <p>This is a notification modal!</p>
          <CloseButton onClick={handleToggleModal}>Close</CloseButton>
        </ModalContent>
      </ModalOverlay>
    </>
  );
};

export default NotificationModal;
