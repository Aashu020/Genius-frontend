import React, { useState } from "react";
import styled from "styled-components";
import {
  AiOutlinePlus,
  AiOutlineDashboard,
  AiOutlineMinus,
} from "react-icons/ai"; // Using icons for the sidebar items
import { Link } from "react-router-dom";
import { AiFillAppstore } from "react-icons/ai";

const SidebarContainer = styled.div`
  width: 250px;
  height: calc(100vh - 60px);
  overflow-y: auto;
  border-right: 1px solid #e0e0e0;
  &::-webkit-scrollbar {
  width: 8px;
}

/* Track */
&::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
 
/* Handle */
&::-webkit-scrollbar-thumb {
  background: #cecece; 
  border-radius: 10px;
}

/* Handle on hover */
&::-webkit-scrollbar-thumb:hover {
  background: #b3b3b3; 
}
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

const SubMenuItem = styled.div`
  margin: 5px 0px;
  color: white;

  background-color: ${(props) => (props.active ? "#fff" : "#222D78")};
  box-shadow: -1.53px 1.53px 3.07px 0px #5088ff4d inset;
  padding: 6px;
  font-size: 16px;
  font-weight: 500;
  margin-left: 20px;
  border-radius: 8px;
  &:hover {
    background-color: #e6f0ff;
    color: black;
  }
`;

const StudentSidebar = () => {
  const [expandedItem, setExpandedItem] = useState(null); // State to track which menu item is expanded
  const [sidebarVisible, setSidebarVisible] = useState(false); // State to toggle sidebar visibility on mobile

  // Toggles the expanded state of each menu item individually
  const toggleExpand = (index) => {
    setExpandedItem(expandedItem === index ? null : index); // Sets the clicked item to expand/collapse
  };

  // Toggle sidebar visibility for mobile view
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  }

  return (
    <>
      {/* Sidebar Container */}
      <SidebarContainer isVisible={sidebarVisible}>
        <SidebarContainer1>
          <SidebarMenuTitle>Menu</SidebarMenuTitle>

          {/* Dashboard */}
          <Link to="/student/dashboard">
            <MenuItem>
              <MenuLabel>
                <MenuIcon>
                  <AiFillAppstore />
                </MenuIcon>
                Dashboard
              </MenuLabel>
            </MenuItem>
          </Link>
          <PlusIcon onClick={() => toggleExpand(10)}>
            <MenuItem>
              <MenuLabel>
                <MenuIcon>
                  <AiFillAppstore />
                </MenuIcon>
                Time Table
              </MenuLabel>
              {expandedItem === 10 ? <AiOutlineMinus /> : <AiOutlinePlus />}
            </MenuItem>
          </PlusIcon>
          {expandedItem === 10 && (
            <>
              <Link to="/student/schooltimetable">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    School Timetable
                  </MenuLabel>
                </SubMenuItem>
              </Link>
              <Link to="/student/examtimetable">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Exam Timetable
                  </MenuLabel>
                </SubMenuItem>
              </Link>
            </>
          )}
          <Link to="/student/syllabusstudent">
            <MenuItem>
              <MenuLabel>
                <MenuIcon>
                  <AiFillAppstore />
                </MenuIcon>
                Syllabus
              </MenuLabel>
            </MenuItem>
          </Link>


          <Link to="/student/profile">
            <MenuItem>
              <MenuLabel>
                <MenuIcon>
                  <AiFillAppstore />
                </MenuIcon>
                Profile
              </MenuLabel>
              <PlusIcon>
                <AiOutlinePlus />
              </PlusIcon>
            </MenuItem>
          </Link>

          <Link to="/student/birthday">
            <MenuItem>
              <MenuLabel>
                <MenuIcon>
                  <AiFillAppstore />
                </MenuIcon>
                Birthday Wishes
              </MenuLabel>
            </MenuItem>
          </Link>

          <MenuItem onClick={logout}>
            <MenuLabel>
              <MenuIcon>
                <AiFillAppstore />
              </MenuIcon>
              Logout
            </MenuLabel>
          </MenuItem>

        </SidebarContainer1>
      </SidebarContainer>

      {/* Sidebar Toggle for Mobile */}
      <DropdownIcon onClick={toggleSidebar}>
        {sidebarVisible ? "☰" : "☰"}
      </DropdownIcon>
    </>
  );
};

export default StudentSidebar;