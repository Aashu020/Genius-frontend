import React, { useEffect, useState } from "react";
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


const EmployeeSidebar = () => {
  const [expandedItem, setExpandedItem] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [role, setRole] = useState(null); // State to hold the current user's role


  useEffect(() => {
    const storedRole = localStorage.getItem("Role"); // Get the role from localStorage
    if (storedRole) {
      setRole(storedRole); // Set the role in state
    } else {
      setRole("Front Office"); // Default role if none is found
    }
  }, []);

  // Tabs configuration for each role
  const tabsConfig = {
    "FrontOffice": ["Employee Progress", "Enquiry", "Student", "Staff", "Attendance", "TimeTable", "Fee", "Front Office"],
    "Accountant": [
      "Employee Progress", "Fee", "Payroll", "Accounts", "Exam", "Subject"
    ],
    "Librarian": ["Employee Progress", "Enquiry", "Front Office"],
    "SecurityGuard": ["Employee Progress", "Front Office"],
    "Teacher": ["Employee Progress", "TimeTable", "Homework", "Exam", "Subject", "Birthday","Result","Profile"],

  };

  // Helper function to determine if a tab should be visible based on role
  const isTabVisible = (tabName) => {
    const tabs = tabsConfig[role] || [];
    console.log(tabs)
    return tabs.includes(tabName); // Check if the tab is part of the role's allowed tabs
  };

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
  };

  return (
    <>
      {/* Sidebar Container */}
      <SidebarContainer isVisible={sidebarVisible}>
        <SidebarContainer1>
          <SidebarMenuTitle>Menu</SidebarMenuTitle>
          {/* Employee */}

          {isTabVisible("Employee Progress") && (
            <Link to="/employee/dashboard">
              <MenuItem>
                <MenuLabel>
                  <MenuIcon>
                    <AiFillAppstore />
                  </MenuIcon>
                  Dashboard
                </MenuLabel>
                <PlusIcon>
                  <AiOutlinePlus />
                </PlusIcon>
              </MenuItem>
            </Link>
          )}
          {/* Enquiry */}
          {isTabVisible("Enquiry") && (
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
          )}
          {expandedItem === 2 && (
            <>
              <Link to="/employee/addenquiry">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Add Enquiry
                  </MenuLabel>
                </SubMenuItem>
              </Link>
              <Link to="/employee/enquirystatus">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Enquiry Status
                  </MenuLabel>
                </SubMenuItem>
              </Link>
              <Link to="/employee/alldata">
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

          {isTabVisible("Student") && (
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
          )}
          {expandedItem === 3 && (
            <>
              <Link to="/employee/allstudent">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    All Students
                  </MenuLabel>
                </SubMenuItem>
              </Link>
              <Link to="/employee/addstudent">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Add Student
                  </MenuLabel>
                </SubMenuItem>
              </Link>

            </>
          )}

          {isTabVisible("Front Office") && (
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
          )}
          {expandedItem === 5 && (
            <>
              <Link to="/employee/visitorentry">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Visitor
                  </MenuLabel>
                </SubMenuItem>
              </Link>

              <Link to="/employee/earlyliving">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Early leaving
                  </MenuLabel>
                </SubMenuItem>
              </Link>

              <Link to="/employee/postalrecieved">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Postal Recieved
                  </MenuLabel>
                </SubMenuItem>
              </Link>
              <Link to="/employee/postaldispatch">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Postal Dispatch
                  </MenuLabel>
                </SubMenuItem>
              </Link>

              <Link to="/employee/complaint">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Complaint
                  </MenuLabel>
                </SubMenuItem>
              </Link>
              <Link to="/employee/electricity">
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

          {isTabVisible("Staff") && (
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
          )}
          {expandedItem === 4 && (
            <>
              <Link to="/employee/allstaff">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    All Staff
                  </MenuLabel>
                </SubMenuItem>
              </Link>
              <Link to="/employee/addstaff">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Add Staff
                  </MenuLabel>
                </SubMenuItem>
              </Link>




              <Link to="/employee/offerletter">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Offer Letter
                  </MenuLabel>
                </SubMenuItem>
              </Link>

              <Link to="/employee/idcard">
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

          {isTabVisible("Attendance") && (
            <PlusIcon onClick={() => toggleExpand(6)}>
              <MenuItem>
                <MenuLabel>
                  <MenuIcon>
                    <AiFillAppstore />
                  </MenuIcon>
                  Attendance Module
                </MenuLabel>
                {expandedItem === 6 ? <AiOutlineMinus /> : <AiOutlinePlus />}
              </MenuItem>
            </PlusIcon>
          )}
          {expandedItem === 6 && (
            <>
              <Link to="/employee/attendancetype">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Attendance Type
                  </MenuLabel>
                </SubMenuItem>
              </Link>

              <Link to="/employee/StudentAttendance">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Student Attendance
                  </MenuLabel>
                </SubMenuItem>
              </Link>

              <Link to="/employee/AttendanceTable">
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

          {isTabVisible("Fee") && (
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
          )}
          {expandedItem === 7 && (
            <>

              <Link to="/employee/allfees">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    All Fees
                  </MenuLabel>
                </SubMenuItem>
              </Link>

              <Link to="/employee/CollectFees">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Collect Fee
                  </MenuLabel>
                </SubMenuItem>
              </Link>


              <Link to="/employee/createfeeheader">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Create Fee Header
                  </MenuLabel>
                </SubMenuItem>
              </Link>

              <Link to="/employee/feeslab">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Fee Slab
                  </MenuLabel>
                </SubMenuItem>
              </Link>


              <Link to="/employee/finesetup">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Fine Set Up
                  </MenuLabel>
                </SubMenuItem>
              </Link>

              <Link to="/employee/feediscount">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    FeeDiscount
                  </MenuLabel>
                </SubMenuItem>
              </Link>

              <Link to="/employee/feereconciliation">
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

          {isTabVisible("Payroll") && (
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
          )}
          {expandedItem === 8 && (
            <>

              <Link to="/employee/allsalary">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    All Salary
                  </MenuLabel>
                </SubMenuItem>
              </Link>

              <Link to="/employee/generatesalary">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Generate Salary
                  </MenuLabel>
                </SubMenuItem>
              </Link>


              <Link to="/employee/allowence">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Allowence
                  </MenuLabel>
                </SubMenuItem>
              </Link>

              <Link to="/employee/deduction">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Deduction
                  </MenuLabel>
                </SubMenuItem>
              </Link>


            </>
          )}

          {isTabVisible("Accounts") && (
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
          )}
          {expandedItem === 9 && (
            <>
              <Link to="/employee/addexpensehead">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Add Expense Head
                  </MenuLabel>
                </SubMenuItem>
              </Link>

              <Link to="/employee/addexpense">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Add Expense
                  </MenuLabel>
                </SubMenuItem>
              </Link>

              <Link to="/employee/addincomehead">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Add Income Head
                  </MenuLabel>
                </SubMenuItem>
              </Link>

              <Link to="/employee/addincome">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Add Income
                  </MenuLabel>
                </SubMenuItem>
              </Link>

              <Link to="/employee/addvendor">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Add Vendor
                  </MenuLabel>
                </SubMenuItem>
              </Link>
              <Link to="/employee/addaccount">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Add Account
                  </MenuLabel>
                </SubMenuItem>
              </Link>
              <Link to="/employee/cashdeposit">
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

          {isTabVisible("TimeTable") && (
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
          )}
          {expandedItem === 10 && (
            <>
              <Link to="/employee/addperiod">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Add Period
                  </MenuLabel>
                </SubMenuItem>
              </Link>
              <Link to="/employee/createtimetable">
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

          {isTabVisible("Homework") && (
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
          )}
          {expandedItem === 11 && (
            <>
              <Link to="/employee/homeworktype">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Add Homework type
                  </MenuLabel>
                </SubMenuItem>
              </Link>
              <Link to="/employee/homework">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Add Homework
                  </MenuLabel>
                </SubMenuItem>
              </Link>
              <Link to="/employee/allhomework">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    All Homework
                  </MenuLabel>
                </SubMenuItem>
              </Link>
            </>
          )}

          {isTabVisible("Exam") && (
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
          )}
          {expandedItem === 12 && (
            <>
              <Link to="/employee/addexam">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Add Exam
                  </MenuLabel>
                </SubMenuItem>
              </Link>
    
            </>
          )}

          {isTabVisible("Result") && (
            <PlusIcon onClick={() => toggleExpand(15)}>
              <MenuItem>
                <MenuLabel>
                  <MenuIcon>
                    <AiFillAppstore />
                  </MenuIcon>
                  Result
                </MenuLabel>
                {expandedItem === 15 ? <AiOutlineMinus /> : <AiOutlinePlus />}
              </MenuItem>
            </PlusIcon>
          )}
          {expandedItem === 15 && (
            <>
              <Link to="/employee/result">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Result Subject Wise
                  </MenuLabel>
                </SubMenuItem>
              </Link>
              <Link to="/employee/studentwise">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Result Student Wise
                  </MenuLabel>
                </SubMenuItem>
              </Link>

              <Link to="/employee/consolidated">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Consolidated
                  </MenuLabel>
                </SubMenuItem>
              </Link>
            </>
          )}
          {isTabVisible("Birthday") && (
            <Link to="/employee/birthday">
              <MenuItem>
                <MenuLabel>
                  <MenuIcon>
                    <AiFillAppstore />
                  </MenuIcon>
                  Birthday
                </MenuLabel>
              </MenuItem>
            </Link>
          )}

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

export default EmployeeSidebar;
