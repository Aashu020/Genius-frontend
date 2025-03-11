// WhatsAppIcon.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import styled from 'styled-components';

const StyledIcon = styled(FontAwesomeIcon)`
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  transition: transform 0.2s;
  margin-right: 10px;

  &:hover {
    transform: scale(1.1);
  }
`;

const WhatsAppIcon = () => {
  const openWhatsApp = () => {
    const phoneNumber = '1234567890'; // Replace with actual phone number
    const whatsappUrl = `https://wa.me/${phoneNumber}`;
    window.open(whatsappUrl, '_blank');
  };

  return <StyledIcon icon={faWhatsapp} onClick={openWhatsApp} />;
};

export default WhatsAppIcon;
