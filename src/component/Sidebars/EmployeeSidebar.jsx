import React, { useEffect, useState } from "react";
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
    "Teacher": ["Employee Progress", "TimeTable", "Homework", "Exam", "Subject", "Birthday","Result"],

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
              {/* <Link to="/employee/createblueprint">
                <SubMenuItem>
                  <MenuLabel>
                    <MenuIcon>
                      <AiFillAppstore />
                    </MenuIcon>
                    Create Blue Print
                  </MenuLabel>
                </SubMenuItem>
              </Link> */}
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
          {/* <Link to="/employee/profile">
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
          </Link> */}

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
