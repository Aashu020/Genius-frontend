import React, { useState } from "react";
import { AiFillAppstore } from "react-icons/ai";
import { AiOutlinePlus, AiOutlineDashboard } from "react-icons/ai"; // Using icons for the sidebar items
import { Link } from "react-router-dom";
import {
  SidebarContainer,
  SidebarContainer1,
  DropdownIcon,
  SidebarMenuTitle,
  MenuItem,
  MenuLabel,
  MenuIcon,
  PlusIcon,
} from "./styles/AttendanceSidebarStyles";

const AttendanceSidebar = () => {
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

          <Link to="/attendancetype">
            <MenuItem>
              <MenuLabel>
                <MenuIcon>
                  <AiFillAppstore />
                </MenuIcon>
                {/* Subjects*/}Attendance Type
              </MenuLabel>
              <PlusIcon>
                <AiOutlinePlus />
              </PlusIcon>
            </MenuItem>
          </Link>

          <Link to="/StudentAttendance">
            <MenuItem>
              <MenuLabel>
                <MenuIcon>
                  <AiFillAppstore />
                </MenuIcon>
                Student Attendance
              </MenuLabel>
              <PlusIcon>
                <AiOutlinePlus />
              </PlusIcon>
            </MenuItem>
          </Link>

          <Link to="/AttendanceTable">
            <MenuItem>
              <MenuLabel>
                <MenuIcon>
                  <AiFillAppstore />
                </MenuIcon>
                Attendance Table
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

export default AttendanceSidebar;