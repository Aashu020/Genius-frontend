import React, { useState } from "react";
import styled from "styled-components";
import {
  AiOutlinePlus,
  AiOutlineDashboard,
  AiOutlineMinus,
} from "react-icons/ai"; // Using icons for the sidebar items
import { Link } from "react-router-dom";
import { AiFillAppstore } from "react-icons/ai";
import {
  SidebarContainer, SidebarContainer1, DropdownIcon, SidebarMenuTitle,
  MenuItem, MenuLabel, MenuIcon, PlusIcon, SubMenuItem
} from './SidebarStyles';


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