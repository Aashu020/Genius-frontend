import React, { useState } from "react";
import { AiFillAppstore } from "react-icons/ai";
import {PlusIcon,
  MenuIcon,
  MenuLabel,
  MenuItem,
  SidebarMenuTitle,
  DropdownIcon,
  SidebarContainer1,
  SidebarContainer} from "./StudentAdmission";
import { AiOutlinePlus, AiOutlineDashboard } from "react-icons/ai";
import { Link } from "react-router-dom";

const AdmissionSidebar = () => {
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

          <Link to="/addstudent">
            {" "}
            <MenuItem>
              <MenuLabel>
                <MenuIcon>
                  <AiFillAppstore />
                </MenuIcon>
                {/* Subjects*/}Add Student
              </MenuLabel>
              <PlusIcon>
                <AiOutlinePlus />
              </PlusIcon>
            </MenuItem>
          </Link>

          <Link to="/familydetail">
            {" "}
            <MenuItem>
              <MenuLabel>
                <MenuIcon>
                  <AiFillAppstore />
                </MenuIcon>
                {/* Subjects*/}Family details
              </MenuLabel>
              <PlusIcon>
                <AiOutlinePlus />
              </PlusIcon>
            </MenuItem>
          </Link>

          <Link to="/document">
            {" "}
            <MenuItem>
              <MenuLabel>
                <MenuIcon>
                  <AiFillAppstore />
                </MenuIcon>
                {/* Students*/}upload Document
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

export default AdmissionSidebar;
