import React, { useState } from "react";
import { AiFillAppstore } from "react-icons/ai";

import styled from "styled-components";
import { AiOutlinePlus, AiOutlineDashboard } from "react-icons/ai";
import { Link } from "react-router-dom";

const SidebarContainer = styled.div`
  width: 250px;
  border-right: 1px solid #e0e0e0;
  @media (max-width: 768px) {
    display: ${(props) =>
      props.isVisible ? "block" : "none"}; /* Conditionally show/hide sidebar */
    position: ${(props) => (props.isVisible ? "absolute" : "none")};
    z-index: 10;
  }
`;
const SidebarContainer1 = styled.div`
  background-color: #fff;
  border-right: 1px solid #e0e0e0;
  padding: 10px;

  a {
    color: #fff;

    text-decoration: none;
  }
`;

const DropdownIcon = styled.span`
  margin-left: 5px;
  cursor: pointer; /* Make it clickable */
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  @media (min-width: 769px) {
    display: none;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;
const SidebarMenuTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 20px;
  text-align: left;
  padding-left: 10px;
  font-weight: 600;
  color: #2a2a2a;
`;

const MenuItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  font-size: 16px;
  font-weight: 500;
  color: ${(props) => (props.active ? "black" : "white")};
  background-color: ${(props) => (props.active ? "#fff" : "#222D78")};
  box-shadow: -1.53px 1.53px 3.07px 0px #5088ff4d inset;

  border-radius: 8px;
  margin: 5px 0;
  cursor: pointer;

  &:hover {
    background-color: #e6f0ff;
    color: black;
  }
`;

const MenuLabel = styled.div`
  display: flex;
  align-items: center;
`;

const MenuIcon = styled.div`
  font-size: 20px;
  margin-right: 10px;
`;

const PlusIcon = styled.div`
  font-size: 16px;
`;

const SalarySidebar = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
  return (
    <>
      <SidebarContainer isVisible={sidebarVisible}>
        <SidebarContainer1>
          <SidebarMenuTitle>Menu</SidebarMenuTitle>

          <Link to="/generatesalary">
            {" "}
            <MenuItem>
              <MenuLabel>
                <MenuIcon>
                  <AiFillAppstore />
                </MenuIcon>
            Generate Salary
              </MenuLabel>
              <PlusIcon>
                <AiOutlinePlus />
              </PlusIcon>
            </MenuItem>
          </Link>

          <Link to="/salaryform">
            {" "}
            <MenuItem>
              <MenuLabel>
                <MenuIcon>
                  <AiFillAppstore />
                </MenuIcon>
               Pay Salary Form
              </MenuLabel>
              <PlusIcon>
                <AiOutlinePlus />
              </PlusIcon>
            </MenuItem>
          </Link>

          <Link to="/salaryslip">
            {" "}
            <MenuItem>
              <MenuLabel>
                <MenuIcon>
                  <AiFillAppstore />
                </MenuIcon>
           Salary Slip
              </MenuLabel>
              <PlusIcon>
                <AiOutlinePlus />
              </PlusIcon>
            </MenuItem>
          </Link>

          <Link to="/allowence">
            {" "}
            <MenuItem>
              <MenuLabel>
                <MenuIcon>
                  <AiFillAppstore />
                </MenuIcon>
           Allowence
              </MenuLabel>
              <PlusIcon>
                <AiOutlinePlus />
              </PlusIcon>
            </MenuItem>
          </Link>

          <Link to="/deduction">
            {" "}
            <MenuItem>
              <MenuLabel>
                <MenuIcon>
                  <AiFillAppstore />
                </MenuIcon>
           Deduction
              </MenuLabel>
              <PlusIcon>
                <AiOutlinePlus />
              </PlusIcon>
            </MenuItem>
          </Link>

          <Link to="/salarysubmit">
            {" "}
            <MenuItem>
              <MenuLabel>
                <MenuIcon>
                  <AiFillAppstore />
                </MenuIcon>
           Salary
              </MenuLabel>
              <PlusIcon>
                <AiOutlinePlus />
              </PlusIcon>
            </MenuItem>
          </Link>
        </SidebarContainer1>
      </SidebarContainer>
      <DropdownIcon onClick={toggleSidebar}>
        {sidebarVisible ? "☰" : "☰"} {/* Change icon based on visibility */}
      </DropdownIcon>
    </>
  );
};

export default SalarySidebar;
