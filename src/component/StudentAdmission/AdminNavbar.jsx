import React from 'react';
import styled from 'styled-components';

// Styled components for Navbar
const NavbarContainer = styled.div`
  width: 100%;
  height: 50px;
  background-color: #1e2a7a; /* Dark blue color */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

const LogoContainer = styled.div`
  background-color: #d3d3d3; /* Light gray for the logo background */
  color: black;
  font-size: 16px;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
`;

const LogoText = styled.span`
  font-weight: bold;
`;

const InstituteContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #66b3ff; /* Light blue background for the institute name */
  padding: 10px 15px;
  border-radius: 5px;
  color: white;
  font-size: 16px;
`;

const InstituteIcon = styled.img`
  height: 25px;
  margin-right: 8px;
`;

const InstituteText = styled.span`
  margin-right: 5px;
`;

const DropdownIcon = styled.span`
  font-size: 12px;
  margin-left: 5px;
`;

const AdminNavbar = () => {
  return (
    <NavbarContainer>
      <LogoContainer>
        <LogoText>Logo</LogoText>
      </LogoContainer>

      <InstituteContainer>
        <InstituteIcon src="/path/to/your/institute-icon.png" alt="Institute Icon" />
        <InstituteText>Institute Name</InstituteText>
        <DropdownIcon>▼</DropdownIcon>
      </InstituteContainer>
    </NavbarContainer>
  );
};

export default AdminNavbar;
