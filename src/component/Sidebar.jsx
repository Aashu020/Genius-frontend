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

const Sidebar = () => {
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

  return (
    <>
      {/* Sidebar Container */}
      <SidebarContainer isVisible={sidebarVisible}>
        <SidebarContainer1>
          <SidebarMenuTitle>Menu</SidebarMenuTitle>

          {/* Dashboard */}
          <Link to="/dashboard">
            <MenuItem>
              <MenuLabel>
                <MenuIcon>
                  <AiFillAppstore />
                </MenuIcon>
                Dashboard
              </MenuLabel>
              <PlusIcon onClick={() => toggleExpand(1)}>
                {expandedItem === 1 ? <AiOutlineMinus /> : <AiOutlinePlus />}
              </PlusIcon>
            </MenuItem>
          </Link>
          {expandedItem === 1 && (
            <>
              <Link to="/feeparticular">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Fee Particular
                  </MenuLabel>
                </SubMenuItem>
              </Link>
            </>
          )}

          {/* Employee */}
          <Link to="/employee">
            <MenuItem>
              <MenuLabel>
                <MenuIcon>
                  <AiFillAppstore />
                </MenuIcon>
                Employee Progress
              </MenuLabel>
              <PlusIcon>
                <AiOutlinePlus />
              </PlusIcon>
            </MenuItem>
          </Link>

          <Link to="/Parent">
            <MenuItem>
              <MenuLabel>
                <MenuIcon>
                  <AiFillAppstore />
                </MenuIcon>
                Parent
              </MenuLabel>
              <PlusIcon>
                <AiOutlinePlus />
              </PlusIcon>
            </MenuItem>
          </Link>

          {/* Enquiry */}
          <PlusIcon onClick={() => toggleExpand(2)}>
            <MenuItem>
              <MenuLabel>
                <MenuIcon>
                  <AiFillAppstore />
                </MenuIcon>
                Enquiry
              </MenuLabel>
              {expandedItem === 2 ? <AiOutlineMinus /> : <AiOutlinePlus />}
            </MenuItem>
          </PlusIcon>
          {expandedItem === 2 && (
            <>
              <Link to="/addenquiry">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Add Enquiry
                  </MenuLabel>
                </SubMenuItem>
              </Link>
              <Link to="/enquirystatus">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Enquiry Status
                  </MenuLabel>
                </SubMenuItem>
              </Link>
              <Link to="/alldata">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Student Table
                  </MenuLabel>
                </SubMenuItem>
              </Link>
            </>
          )}

          {/* Other Menu Items */}

          <PlusIcon onClick={() => toggleExpand(3)}>
            <MenuItem>
              <MenuLabel>
                <MenuIcon>
                  <AiFillAppstore />
                </MenuIcon>
                Students Admission
              </MenuLabel>
              {expandedItem === 3 ? <AiOutlineMinus /> : <AiOutlinePlus />}
            </MenuItem>
          </PlusIcon>

          {expandedItem === 3 && (
            <>
              <Link to="/allstudent">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Student All
                  </MenuLabel>
                </SubMenuItem>
              </Link>
              <Link to="/addstudent">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Add Student
                  </MenuLabel>
                </SubMenuItem>
              </Link>
              <Link to="/familydetail">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Family Details
                  </MenuLabel>
                </SubMenuItem>
              </Link>
              <Link to="/document">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Documents upload
                  </MenuLabel>
                </SubMenuItem>
              </Link>
            </>
          )}

          <PlusIcon onClick={() => toggleExpand(4)}>
            <MenuItem>
              <MenuLabel>
                <MenuIcon>
                  <AiFillAppstore />
                </MenuIcon>
                Staff
              </MenuLabel>
              {expandedItem === 4 ? <AiOutlineMinus /> : <AiOutlinePlus />}
            </MenuItem>
          </PlusIcon>

          {expandedItem === 4 && (
            <>
              <Link to="/addstaff">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Add Staff
                  </MenuLabel>
                </SubMenuItem>
              </Link>
              <Link to="/staffdetail">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Family Details
                  </MenuLabel>
                </SubMenuItem>
              </Link>
              <Link to="/staffdocument">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Documents upload
                  </MenuLabel>
                </SubMenuItem>
              </Link>

              <Link to="/allstaff">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    All Staff
                  </MenuLabel>
                </SubMenuItem>
              </Link>

              <Link to="/offerletter">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Offer Letter
                  </MenuLabel>
                </SubMenuItem>
              </Link>

              <Link to="/idcard">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    ID Card
                  </MenuLabel>
                </SubMenuItem>
              </Link>
            </>
          )}

          <PlusIcon onClick={() => toggleExpand(5)}>
            <MenuItem>
              <MenuLabel>
                <MenuIcon>
                  <AiFillAppstore />
                </MenuIcon>
                Front Office
              </MenuLabel>
              {expandedItem === 5 ? <AiOutlineMinus /> : <AiOutlinePlus />}
            </MenuItem>
          </PlusIcon>
          {expandedItem === 5 && (
            <>
              <Link to="/visitorentry">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Visitor
                  </MenuLabel>
                </SubMenuItem>
              </Link>

              <Link to="/earlyliving">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Early leaving
                  </MenuLabel>
                </SubMenuItem>
              </Link>

              <Link to="/postalrecieved">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Postal Recieved
                  </MenuLabel>
                </SubMenuItem>
              </Link>
              <Link to="/postaldispatch">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Postal Dispatch
                  </MenuLabel>
                </SubMenuItem>
              </Link>

              <Link to="/complaint">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Complaint
                  </MenuLabel>
                </SubMenuItem>
              </Link>
              <Link to="/electricity">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Electricity
                  </MenuLabel>
                </SubMenuItem>
              </Link>
            </>
          )}

          <PlusIcon onClick={() => toggleExpand(6)}>
            <MenuItem>
              <MenuLabel>
                <MenuIcon>
                  <AiFillAppstore />
                </MenuIcon>
                Attendance Module
                {/* Salary */}
              </MenuLabel>
              {expandedItem === 6 ? <AiOutlineMinus /> : <AiOutlinePlus />}
            </MenuItem>
          </PlusIcon>
          {expandedItem === 6 && (
            <>
              <Link to="/attendancetype">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Attendance Type
                  </MenuLabel>
                </SubMenuItem>
              </Link>

              <Link to="/StudentAttendance">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Student Attendance
                  </MenuLabel>
                </SubMenuItem>
              </Link>

              <Link to="/AttendanceTable">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Attendance Table
                  </MenuLabel>
                </SubMenuItem>
              </Link>
            </>
          )}

          <PlusIcon onClick={() => toggleExpand(7)}>
            <MenuItem>
              <MenuLabel>
                <MenuIcon>
                  <AiFillAppstore />
                </MenuIcon>
                Fee
              </MenuLabel>
              {expandedItem === 7 ? <AiOutlineMinus /> : <AiOutlinePlus />}
            </MenuItem>
          </PlusIcon>
          {expandedItem === 7 && (
            <>
              <Link to="/CollectFees">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Collect Fee
                  </MenuLabel>
                </SubMenuItem>
              </Link>

              <Link to="/Payment">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Payment
                  </MenuLabel>
                </SubMenuItem>
              </Link>

              <Link to="/feesubmitted">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Submitted
                  </MenuLabel>
                </SubMenuItem>
              </Link>

              <Link to="/createfeeheader">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Create Fee Header
                  </MenuLabel>
                </SubMenuItem>
              </Link>

              <Link to="/feeslab">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Fee Slab
                  </MenuLabel>
                </SubMenuItem>
              </Link>
              
              <Link to="/feeslip">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Fee Slip
                  </MenuLabel>
                </SubMenuItem>
              </Link>

              <Link to="/finesetup">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Fine Set Up
                  </MenuLabel>
                </SubMenuItem>
              </Link>

              <Link to="/feediscount">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    FeeDiscount
                  </MenuLabel>
                </SubMenuItem>
              </Link>

              <Link to="/feereconciliation">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Fee Reconciliation
                  </MenuLabel>
                </SubMenuItem>
              </Link>
            </>
          )}

          <PlusIcon onClick={() => toggleExpand(8)}>
            <MenuItem>
              <MenuLabel>
                <MenuIcon>
                  <AiFillAppstore />
                </MenuIcon>
                Payroll
              </MenuLabel>
              {expandedItem === 8 ? <AiOutlineMinus /> : <AiOutlinePlus />}
            </MenuItem>
          </PlusIcon>
          {expandedItem === 8 && (
            <>
              <Link to="/generatesalary">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Generate Salary
                  </MenuLabel>
                </SubMenuItem>
              </Link>

              <Link to="/salaryform">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Pay Salary Form{" "}
                  </MenuLabel>
                </SubMenuItem>
              </Link>

              <Link to="/salaryslip">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Salary Slip
                  </MenuLabel>
                </SubMenuItem>
              </Link>

              <Link to="/allowence">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Allowence
                  </MenuLabel>
                </SubMenuItem>
              </Link>

              <Link to="/deduction">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Deduction
                  </MenuLabel>
                </SubMenuItem>
              </Link>

              <Link to="/salarysubmit">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Salary
                  </MenuLabel>
                </SubMenuItem>
              </Link>
            </>
          )}

          <PlusIcon onClick={() => toggleExpand(9)}>
            <MenuItem>
              <MenuLabel>
                <MenuIcon>
                  <AiFillAppstore />
                </MenuIcon>
                Accounts
              </MenuLabel>
              {expandedItem === 9 ? <AiOutlineMinus /> : <AiOutlinePlus />}
            </MenuItem>
          </PlusIcon>
          {expandedItem === 9 && (
            <>
              <Link to="/addexpensehead">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Add Expense Head
                  </MenuLabel>
                </SubMenuItem>
              </Link>

              <Link to="/addexpense">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Add Expense
                  </MenuLabel>
                </SubMenuItem>
              </Link>

              <Link to="/addincomehead">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Add Income Head
                  </MenuLabel>
                </SubMenuItem>
              </Link>

              <Link to="/addincome">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Add Income
                  </MenuLabel>
                </SubMenuItem>
              </Link>

              <Link to="/addvendor">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Add Vendor
                  </MenuLabel>
                </SubMenuItem>
              </Link>
              <Link to="/addaccount">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Add Account
                  </MenuLabel>
                </SubMenuItem>
              </Link>
              <Link to="/cashdeposit">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Cash Deposit
                  </MenuLabel>
                </SubMenuItem>
              </Link>
            </>
          )}

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
              <Link to="/addperiod">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Add Period
                  </MenuLabel>
                </SubMenuItem>
              </Link>
              <Link to="/createtimetable">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Create Time table
                  </MenuLabel>
                </SubMenuItem>
              </Link>
            </>
          )}

          <PlusIcon onClick={() => toggleExpand(11)}>
            <MenuItem>
              <MenuLabel>
                <MenuIcon>
                  <AiFillAppstore />
                </MenuIcon>
                Homework
              </MenuLabel>
              {expandedItem === 11 ? <AiOutlineMinus /> : <AiOutlinePlus />}
            </MenuItem>
          </PlusIcon>
          {expandedItem === 11 && (
            <>
              <Link to="/homeworktype">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Homework type
                  </MenuLabel>
                </SubMenuItem>
              </Link>
              <Link to="/homework">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Homework
                  </MenuLabel>
                </SubMenuItem>
              </Link>
            </>
          )}

          <PlusIcon onClick={() => toggleExpand(12)}>
            <MenuItem>
              <MenuLabel>
                <MenuIcon>
                  <AiFillAppstore />
                </MenuIcon>
                Exam
              </MenuLabel>
              {expandedItem === 12 ? <AiOutlineMinus /> : <AiOutlinePlus />}
            </MenuItem>
          </PlusIcon>
          {expandedItem === 12 && (
            <>
              <Link to="/addexam">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Add Exam
                  </MenuLabel>
                </SubMenuItem>
              </Link>
              <Link to="/createblueprint">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Create Blue Print
                  </MenuLabel>
                </SubMenuItem>
              </Link>
            </>
          )}

          <PlusIcon onClick={() => toggleExpand(13)}>
            <MenuItem>
              <MenuLabel>
                <MenuIcon>
                  <AiFillAppstore />
                </MenuIcon>
                Subject
              </MenuLabel>
              {expandedItem === 13 ? <AiOutlineMinus /> : <AiOutlinePlus />}
            </MenuItem>
          </PlusIcon>
          {expandedItem === 13 && (
            <>
              <Link to="/addsubject">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Add Subject
                  </MenuLabel>
                </SubMenuItem>
              </Link>
              <Link to="/createsyllabus">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Create Syllabus
                  </MenuLabel>
                </SubMenuItem>
              </Link>

              <Link to="/allotedsubject">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                     Alloted Subject
                  </MenuLabel>
                </SubMenuItem>
              </Link>
            </>
          )}

          <PlusIcon onClick={() => toggleExpand(14)}>
            <MenuItem>
              <MenuLabel>
                <MenuIcon>
                  <AiFillAppstore />
                </MenuIcon>
                School Setup
              </MenuLabel>
              {expandedItem === 14 ? <AiOutlineMinus /> : <AiOutlinePlus />}
            </MenuItem>
          </PlusIcon>
          {expandedItem === 14 && (
            <>
              <Link to="/setup">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    School Setup
                  </MenuLabel>
                </SubMenuItem>
              </Link>
              <Link to="/addclass">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Add Class
                  </MenuLabel>
                </SubMenuItem>
              </Link>

              <Link to="/addsetion">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Add Section
                  </MenuLabel>
                </SubMenuItem>
              </Link>

              <Link to="/adddepartment">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Add Department
                  </MenuLabel>
                </SubMenuItem>
              </Link>

              <Link to="/addrole">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Add Role
                  </MenuLabel>
                </SubMenuItem>
              </Link>

              <Link to="/adddesignation">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Add Designation
                  </MenuLabel>
                </SubMenuItem>
              </Link>

              <Link to="/academicyearinfo">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Academic year Information
                  </MenuLabel>
                </SubMenuItem>
              </Link>

              <Link to="/academicplan">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Academic year Plan
                  </MenuLabel>
                </SubMenuItem>
              </Link>


              <Link to="/datesheet">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Date Sheet
                  </MenuLabel>
                </SubMenuItem>
              </Link>

              <Link to="/datesheettable">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Date Sheet Table
                  </MenuLabel>
                </SubMenuItem>
              </Link>

          
            </>
          )}
        </SidebarContainer1>
      </SidebarContainer>

      {/* Sidebar Toggle for Mobile */}
      <DropdownIcon onClick={toggleSidebar}>
        {sidebarVisible ? "☰" : "☰"}
      </DropdownIcon>
    </>
  );
};

export default Sidebar;
