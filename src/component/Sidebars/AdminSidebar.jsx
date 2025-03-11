import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
    AiOutlinePlus,
    AiOutlineDashboard,
    AiOutlineMinus,
} from "react-icons/ai"; // Using icons for the sidebar items
import { Link, useNavigate } from "react-router-dom";
import { AiFillAppstore } from "react-icons/ai";
import axios from "axios";


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

const IconImg = styled.img`
    width: 22px;

`;
const
    AdminSidebar = () => {
        const navigate = useNavigate();
        const [expandedItem, setExpandedItem] = useState(null); // State to track which menu item is expanded
        const [sidebarVisible, setSidebarVisible] = useState(false); // State to toggle sidebar visibility on mobile
        const [role, setRole] = useState(null); // State to hold the current user's role

        // Toggles the expanded state of each menu item individually
        const toggleExpand = (index) => {
            setExpandedItem(expandedItem === index ? null : index); // Sets the clicked item to expand/collapse
        };

        // Toggle sidebar visibility for mobile view
        const toggleSidebar = () => {
            setSidebarVisible(!sidebarVisible);
        };

        useEffect(() => {
            axios
                .get("https://api.edspride.in/schoolsetup/all")
                .then((response) => {
                    if (response.data.length === 0) {
                        navigate('/initial-setup')
                    }

                })
                .catch((error) => {
                    console.error(error);
                })
        }, [])


        useEffect(() => {
            const storedRole = localStorage.getItem("Role");
            if (storedRole) {
                setRole(storedRole);
            } else {
                setRole("Front Office");
            }
        }, []);

        const tabsConfig = {
            "Superadmin": ["Dashboard", "Enquiry", "Student", "Staff", "Front Office", "Attendance", "Fee", "Payroll", "Accounts", "Timetable", "Homework", "Exam", "Subject", "Result", "School Setup", "Logins"],
            "Admin": [
                "Dashboard", "Enquiry", "Student", "Staff", "Front Office", "Attendance", "Fee", "Payroll", "Accounts", "Timetable", "Homework", "Exam", "Subject", "Result"
            ]
        };

        // Helper function to determine if a tab should be visible based on role
        const isTabVisible = (tabName) => {
            const tabs = tabsConfig[role] || [];
            // console.log(tabs)
            return tabs.includes(tabName);
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


                        {isTabVisible("Dashboard") && (
                            <Link to="/admin/dashboard">
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
                                <Link to="/admin/addenquiry">
                                    <SubMenuItem>
                                        <MenuLabel>
                                            <MenuIcon>
                                                <AiFillAppstore />
                                            </MenuIcon>
                                            Add Enquiry
                                        </MenuLabel>
                                    </SubMenuItem>
                                </Link>
                                <Link to="/admin/enquirystatus">
                                    <SubMenuItem>
                                        <MenuLabel>
                                            <MenuIcon>
                                                <AiFillAppstore />
                                            </MenuIcon>
                                            Enquiry Status
                                        </MenuLabel>
                                    </SubMenuItem>
                                </Link>
                                <Link to="/admin/alldata">
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
                                <Link to="/admin/allstudent">
                                    <SubMenuItem>
                                        <MenuLabel>
                                            <MenuIcon>
                                                <AiFillAppstore />
                                            </MenuIcon>
                                            All Students
                                        </MenuLabel>
                                    </SubMenuItem>
                                </Link>
                                <Link to="/admin/addstudent">
                                    <SubMenuItem>
                                        <MenuLabel>
                                            <MenuIcon>
                                                <AiFillAppstore />
                                            </MenuIcon>
                                            Add Student
                                        </MenuLabel>
                                    </SubMenuItem>
                                </Link>
                                <Link to="/admin/student-bulk">
                                    <SubMenuItem>
                                        <MenuLabel>
                                            <MenuIcon>
                                                <AiFillAppstore />
                                            </MenuIcon>
                                            Bulk Upload
                                        </MenuLabel>
                                    </SubMenuItem>
                                </Link>
                                <Link to="/admin/admitcard">
                                    <SubMenuItem>
                                        <MenuLabel>
                                            <MenuIcon>
                                                <AiFillAppstore />
                                            </MenuIcon>
                                            Admit Card
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
                                <Link to="/admin/allstaff">
                                    <SubMenuItem>
                                        <MenuLabel>
                                            <MenuIcon>
                                                <AiFillAppstore />
                                            </MenuIcon>
                                            All Staff
                                        </MenuLabel>
                                    </SubMenuItem>
                                </Link>
                                <Link to="/admin/addstaff">
                                    <SubMenuItem>
                                        <MenuLabel>
                                            <MenuIcon>
                                                <AiFillAppstore />
                                            </MenuIcon>
                                            Add Staff
                                        </MenuLabel>
                                    </SubMenuItem>
                                </Link>



                                <Link to="/admin/offerletter">
                                    <SubMenuItem>
                                        <MenuLabel>
                                            <MenuIcon>
                                                <AiFillAppstore />
                                            </MenuIcon>
                                            Offer Letter
                                        </MenuLabel>
                                    </SubMenuItem>
                                </Link>

                                <Link to="/admin/idcard">
                                    <SubMenuItem>
                                        <MenuLabel>
                                            <MenuIcon>
                                                <AiFillAppstore />
                                            </MenuIcon>
                                            ID Card
                                        </MenuLabel>
                                    </SubMenuItem>
                                </Link>

                                <Link to="/admin/staff-bulk">
                                    <SubMenuItem>
                                        <MenuLabel>
                                            <MenuIcon>
                                                <AiFillAppstore />
                                            </MenuIcon>
                                            Bulk Upload
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
                                <Link to="/admin/visitorentry">
                                    <SubMenuItem>
                                        <MenuLabel>
                                            <MenuIcon>
                                                <AiFillAppstore />
                                            </MenuIcon>
                                            Visitor
                                        </MenuLabel>
                                    </SubMenuItem>
                                </Link>

                                <Link to="/admin/earlyliving">
                                    <SubMenuItem>
                                        <MenuLabel>
                                            <MenuIcon>
                                                <AiFillAppstore />
                                            </MenuIcon>
                                            Early leaving
                                        </MenuLabel>
                                    </SubMenuItem>
                                </Link>

                                <Link to="/admin/postalrecieved">
                                    <SubMenuItem>
                                        <MenuLabel>
                                            <MenuIcon>
                                                <AiFillAppstore />
                                            </MenuIcon>
                                            Postal Recieved
                                        </MenuLabel>
                                    </SubMenuItem>
                                </Link>
                                <Link to="/admin/postaldispatch">
                                    <SubMenuItem>
                                        <MenuLabel>
                                            <MenuIcon>
                                                <AiFillAppstore />
                                            </MenuIcon>
                                            Postal Dispatch
                                        </MenuLabel>
                                    </SubMenuItem>
                                </Link>

                                <Link to="/admin/complaint">
                                    <SubMenuItem>
                                        <MenuLabel>
                                            <MenuIcon>
                                                <AiFillAppstore />
                                            </MenuIcon>
                                            Complaint
                                        </MenuLabel>
                                    </SubMenuItem>
                                </Link>
                                <Link to="/admin/electricity">
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

                        {isTabVisible("Attendance") && (
                            <PlusIcon onClick={() => toggleExpand(6)}>
                                <MenuItem>
                                    <MenuLabel>
                                        <MenuIcon>
                                            <AiFillAppstore />
                                        </MenuIcon>
                                        Attendance
                                        {/* Salary */}
                                    </MenuLabel>
                                    {expandedItem === 6 ? <AiOutlineMinus /> : <AiOutlinePlus />}
                                </MenuItem>
                            </PlusIcon>
                        )}
                        {expandedItem === 6 && (
                            <>
                                <Link to="/admin/attendancetype">
                                    <SubMenuItem>
                                        <MenuLabel>
                                            <MenuIcon>
                                                <AiFillAppstore />
                                            </MenuIcon>
                                            Staff Attendance
                                        </MenuLabel>
                                    </SubMenuItem>
                                </Link>

                                <Link to="/admin/StudentAttendance">
                                    <SubMenuItem>
                                        <MenuLabel>
                                            <MenuIcon>
                                                <AiFillAppstore />
                                            </MenuIcon>
                                            Student Attendance
                                        </MenuLabel>
                                    </SubMenuItem>
                                </Link>

                                <Link to="/admin/AttendanceTable">
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
                                <Link to="/admin/allfees">
                                    <SubMenuItem>
                                        <MenuLabel>
                                            <MenuIcon>
                                                <AiFillAppstore />
                                            </MenuIcon>
                                            All Fees
                                        </MenuLabel>
                                    </SubMenuItem>
                                </Link>

                                <Link to="/admin/CollectFees">
                                    <SubMenuItem>
                                        <MenuLabel>
                                            <MenuIcon>
                                                <AiFillAppstore />
                                            </MenuIcon>
                                            Collect Fee
                                        </MenuLabel>
                                    </SubMenuItem>
                                </Link>

                                {/* <Link to="/admin/Payment">
                                <SubMenuItem>
                                    <MenuLabel>
                                        <MenuIcon>
                                            <AiFillAppstore />
                                        </MenuIcon>
                                        Payment
                                    </MenuLabel>
                                </SubMenuItem>
                            </Link>

                            <Link to="/admin/feesubmitted">
                                <SubMenuItem>
                                    <MenuLabel>
                                        <MenuIcon>
                                            <AiFillAppstore />
                                        </MenuIcon>
                                        Submitted
                                    </MenuLabel>
                                </SubMenuItem>
                            </Link> */}

                                <Link to="/admin/createfeeheader">
                                    <SubMenuItem>
                                        <MenuLabel>
                                            <MenuIcon>
                                                <AiFillAppstore />
                                            </MenuIcon>
                                            Create Fee Header
                                        </MenuLabel>
                                    </SubMenuItem>
                                </Link>

                                <Link to="/admin/feeslab">
                                    <SubMenuItem>
                                        <MenuLabel>
                                            <MenuIcon>
                                                <AiFillAppstore />
                                            </MenuIcon>
                                            Fee Slab
                                        </MenuLabel>
                                    </SubMenuItem>
                                </Link>

                                <Link to="/admin/feedemand">
                                    <SubMenuItem>
                                        <MenuLabel>
                                            <MenuIcon>
                                                <AiFillAppstore />
                                            </MenuIcon>
                                            Fee Demand
                                        </MenuLabel>
                                    </SubMenuItem>
                                </Link>

                                <Link to="/admin/finesetup">
                                    <SubMenuItem>
                                        <MenuLabel>
                                            <MenuIcon>
                                                <AiFillAppstore />
                                            </MenuIcon>
                                            Fine Set Up
                                        </MenuLabel>
                                    </SubMenuItem>
                                </Link>

                                <Link to="/admin/feediscount">
                                    <SubMenuItem>
                                        <MenuLabel>
                                            <MenuIcon>
                                                <AiFillAppstore />
                                            </MenuIcon>
                                            FeeDiscount
                                        </MenuLabel>
                                    </SubMenuItem>
                                </Link>

                                <Link to="/admin/fee-Paid">
                                    <SubMenuItem>
                                        <MenuLabel>
                                            <MenuIcon>
                                                <AiFillAppstore />
                                            </MenuIcon>
                                            Fee Paid
                                        </MenuLabel>
                                    </SubMenuItem>
                                </Link>
                                <Link to="/admin/fee-remaining">
                                    <SubMenuItem>
                                        <MenuLabel>
                                            <MenuIcon>
                                                <AiFillAppstore />
                                            </MenuIcon>
                                            Fee Remaining
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
                                <Link to="/admin/allsalary">
                                    <SubMenuItem>
                                        <MenuLabel>
                                            <MenuIcon>
                                                <AiFillAppstore />
                                            </MenuIcon>
                                            All Salary
                                        </MenuLabel>
                                    </SubMenuItem>
                                </Link>
                                <Link to="/admin/generatesalary">
                                    <SubMenuItem>
                                        <MenuLabel>
                                            <MenuIcon>
                                                <AiFillAppstore />
                                            </MenuIcon>
                                            Generate Salary
                                        </MenuLabel>
                                    </SubMenuItem>
                                </Link>

                                {/* <Link to="/admin/salaryform">
                                <SubMenuItem>
                                    <MenuLabel>
                                        <MenuIcon>
                                            <AiFillAppstore />
                                        </MenuIcon>
                                        Pay Salary Form{" "}
                                    </MenuLabel>
                                </SubMenuItem>
                            </Link>

                            <Link to="/admin/salaryslip">
                                <SubMenuItem>
                                    <MenuLabel>
                                        <MenuIcon>
                                            <AiFillAppstore />
                                        </MenuIcon>
                                        Salary Slip
                                    </MenuLabel>
                                </SubMenuItem>
                            </Link> */}

                                <Link to="/admin/allowence">
                                    <SubMenuItem>
                                        <MenuLabel>
                                            <MenuIcon>
                                                <AiFillAppstore />
                                            </MenuIcon>
                                            Allowence
                                        </MenuLabel>
                                    </SubMenuItem>
                                </Link>

                                <Link to="/admin/deduction">
                                    <SubMenuItem>
                                        <MenuLabel>
                                            <MenuIcon>
                                                <AiFillAppstore />
                                            </MenuIcon>
                                            Deduction
                                        </MenuLabel>
                                    </SubMenuItem>
                                </Link>

                                {/* <Link to="/admin/salarysubmit">
                                <SubMenuItem>
                                    <MenuLabel>
                                        <MenuIcon>
                                            <AiFillAppstore />
                                        </MenuIcon>
                                        Salary
                                    </MenuLabel>
                                </SubMenuItem>
                            </Link> */}
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
                                <Link to="/admin/addexpensehead">
                                    <SubMenuItem>
                                        <MenuLabel>
                                            <MenuIcon>
                                                <AiFillAppstore />
                                            </MenuIcon>
                                            Add Expense Head
                                        </MenuLabel>
                                    </SubMenuItem>
                                </Link>

                                <Link to="/admin/addexpense">
                                    <SubMenuItem>
                                        <MenuLabel>
                                            <MenuIcon>
                                                <AiFillAppstore />
                                            </MenuIcon>
                                            Add Expense
                                        </MenuLabel>
                                    </SubMenuItem>
                                </Link>

                                <Link to="/admin/addincomehead">
                                    <SubMenuItem>
                                        <MenuLabel>
                                            <MenuIcon>
                                                <AiFillAppstore />
                                            </MenuIcon>
                                            Add Income Head
                                        </MenuLabel>
                                    </SubMenuItem>
                                </Link>

                                <Link to="/admin/addincome">
                                    <SubMenuItem>
                                        <MenuLabel>
                                            <MenuIcon>
                                                <AiFillAppstore />
                                            </MenuIcon>
                                            Add Income
                                        </MenuLabel>
                                    </SubMenuItem>
                                </Link>

                                <Link to="/admin/addvendor">
                                    <SubMenuItem>
                                        <MenuLabel>
                                            <MenuIcon>
                                                <AiFillAppstore />
                                            </MenuIcon>
                                            Add Vendor
                                        </MenuLabel>
                                    </SubMenuItem>
                                </Link>
                                <Link to="/admin/addaccount">
                                    <SubMenuItem>
                                        <MenuLabel>
                                            <MenuIcon>
                                                <AiFillAppstore />
                                            </MenuIcon>
                                            Add Account
                                        </MenuLabel>
                                    </SubMenuItem>
                                </Link>
                                <Link to="/admin/cashdeposit">
                                    <SubMenuItem>
                                        <MenuLabel>
                                            <MenuIcon>
                                                <AiFillAppstore />
                                            </MenuIcon>
                                            Cash Deposit
                                        </MenuLabel>
                                    </SubMenuItem>
                                </Link>
                                <Link to="/admin/ledger">
                                    <SubMenuItem>
                                        <MenuLabel>
                                            <MenuIcon>
                                                <AiFillAppstore />
                                            </MenuIcon>
                                            Ledger
                                        </MenuLabel>
                                    </SubMenuItem>
                                </Link>

                            </>
                        )}

                        {isTabVisible("Timetable") && (
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
                                <Link to="/admin/addperiod">
                                    <SubMenuItem>
                                        <MenuLabel>
                                            <MenuIcon>
                                                <AiFillAppstore />
                                            </MenuIcon>
                                            Add Period
                                        </MenuLabel>
                                    </SubMenuItem>
                                </Link>
                                <Link to="/admin/createtimetable">
                                    <SubMenuItem>
                                        <MenuLabel>
                                            <MenuIcon>
                                                <AiFillAppstore />
                                            </MenuIcon>
                                            Create Time table
                                        </MenuLabel>
                                    </SubMenuItem>
                                </Link>
                                <Link to="/admin/alltimetable">
                                    <SubMenuItem>
                                        <MenuLabel>
                                            <MenuIcon>
                                                <AiFillAppstore />
                                            </MenuIcon>
                                            All Time table
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
                                <Link to="/admin/allhomework">
                                    <SubMenuItem>
                                        <MenuLabel>
                                            <MenuIcon>
                                                <AiFillAppstore />
                                            </MenuIcon>
                                            All Homework
                                        </MenuLabel>
                                    </SubMenuItem>
                                </Link>
                                <Link to="/admin/homeworktype">
                                    <SubMenuItem>
                                        <MenuLabel>
                                            <MenuIcon>
                                                <AiFillAppstore />
                                            </MenuIcon>
                                            Homework type
                                        </MenuLabel>
                                    </SubMenuItem>
                                </Link>
                                <Link to="/admin/homework">
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
                                <Link to="/admin/addexam">
                                    <SubMenuItem>
                                        <MenuLabel>
                                            <MenuIcon>
                                                <AiFillAppstore />
                                            </MenuIcon>
                                            Add Exam
                                        </MenuLabel>
                                    </SubMenuItem>
                                </Link>
                                {/* <Link to="/admin/createblueprint">
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

                        {isTabVisible("Subject") && (
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
                        )}
                        {expandedItem === 13 && (
                            <>
                                <Link to="/admin/addsubject">
                                    <SubMenuItem>
                                        <MenuLabel>
                                            <MenuIcon>
                                                <AiFillAppstore />
                                            </MenuIcon>
                                            Add Subject
                                        </MenuLabel>
                                    </SubMenuItem>
                                </Link>
                                <Link to="/admin/createsyllabus">
                                    <SubMenuItem>
                                        <MenuLabel>
                                            <MenuIcon>
                                                <AiFillAppstore />
                                            </MenuIcon>
                                            Create Syllabus
                                        </MenuLabel>
                                    </SubMenuItem>
                                </Link>

                                {/* <Link to="/admin/allotedsubject">
                                    <SubMenuItem>
                                        <MenuLabel>
                                            <MenuIcon>
                                                <AiFillAppstore />
                                            </MenuIcon>
                                            Alloted Subject
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
                                <Link to="/admin/result">
                                    <SubMenuItem>
                                        <MenuLabel>
                                            <MenuIcon>
                                                <AiFillAppstore />
                                            </MenuIcon>
                                            Result Subject Wise
                                        </MenuLabel>
                                    </SubMenuItem>
                                </Link>
                                <Link to="/admin/studentwise">
                                    <SubMenuItem>
                                        <MenuLabel>
                                            <MenuIcon>
                                                <AiFillAppstore />
                                            </MenuIcon>
                                            Result Student Wise
                                        </MenuLabel>
                                    </SubMenuItem>
                                </Link>

                                <Link to="/admin/consolidated">
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

                        {isTabVisible("School Setup") && (
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
                        )}
                        {expandedItem === 14 && (
                            <>
                                <Link to="/admin/setup">
                                    <SubMenuItem>
                                        <MenuLabel>
                                            <MenuIcon>
                                                <AiFillAppstore />
                                            </MenuIcon>
                                            School Setup
                                        </MenuLabel>
                                    </SubMenuItem>
                                </Link>
                                <Link to="/admin/addclass">
                                    <SubMenuItem>
                                        <MenuLabel>
                                            <MenuIcon>
                                                <AiFillAppstore />
                                            </MenuIcon>
                                            Add Class
                                        </MenuLabel>
                                    </SubMenuItem>
                                </Link>

                                <Link to="/admin/addsetion">
                                    <SubMenuItem>
                                        <MenuLabel>
                                            <MenuIcon>
                                                <AiFillAppstore />
                                            </MenuIcon>
                                            Add Section
                                        </MenuLabel>
                                    </SubMenuItem>
                                </Link>

                                <Link to="/admin/adddepartment">
                                    <SubMenuItem>
                                        <MenuLabel>
                                            <MenuIcon>
                                                <AiFillAppstore />
                                            </MenuIcon>
                                            Add Department
                                        </MenuLabel>
                                    </SubMenuItem>
                                </Link>

                                <Link to="/admin/adddesignation">
                                    <SubMenuItem>
                                        <MenuLabel>
                                            <MenuIcon>
                                                <AiFillAppstore />
                                            </MenuIcon>
                                            Add Designation
                                        </MenuLabel>
                                    </SubMenuItem>
                                </Link>

                                <Link to="/admin/academicevents">
                                    <SubMenuItem>
                                        <MenuLabel>
                                            <MenuIcon>
                                                <AiFillAppstore />
                                            </MenuIcon>
                                            Add Academic Events
                                        </MenuLabel>
                                    </SubMenuItem>
                                </Link>


                                <Link to="/admin/noticebox">
                                    <SubMenuItem>
                                        <MenuLabel>
                                            <MenuIcon>
                                                <AiFillAppstore />
                                            </MenuIcon>
                                            Add Notice Box
                                        </MenuLabel>
                                    </SubMenuItem>
                                </Link>


                                <Link to="/admin/house">
                                    <SubMenuItem>
                                        <MenuLabel>
                                            <MenuIcon>
                                                <AiFillAppstore />
                                            </MenuIcon>
                                            Add House
                                        </MenuLabel>
                                    </SubMenuItem>
                                </Link>
                                <Link to="/admin/addroute">
                                    <SubMenuItem>
                                        <MenuLabel>
                                            <MenuIcon>
                                                <AiFillAppstore />
                                            </MenuIcon>
                                            Add Route
                                        </MenuLabel>
                                    </SubMenuItem>
                                </Link>
                                <Link to="/admin/addgrade">
                                    <SubMenuItem>
                                        <MenuLabel>
                                            <MenuIcon>
                                                <AiFillAppstore />
                                            </MenuIcon>
                                            Add Grade
                                        </MenuLabel>
                                    </SubMenuItem>
                                </Link>

                                <Link to="/admin/academicyearinfo">
                                    <SubMenuItem>
                                        <MenuLabel>
                                            <MenuIcon>
                                                <AiFillAppstore />
                                            </MenuIcon>
                                            Academic year Information
                                        </MenuLabel>
                                    </SubMenuItem>
                                </Link>

                                <Link to="/admin/academicplan">
                                    <SubMenuItem>
                                        <MenuLabel>
                                            <MenuIcon>
                                                <AiFillAppstore />
                                            </MenuIcon>
                                            Academic year Plan
                                        </MenuLabel>
                                    </SubMenuItem>
                                </Link>


                                <Link to="/admin/datesheet">
                                    <SubMenuItem>
                                        <MenuLabel>
                                            <MenuIcon>
                                                <AiFillAppstore />
                                            </MenuIcon>
                                            Date Sheet
                                        </MenuLabel>
                                    </SubMenuItem>
                                </Link>

                                <Link to="/admin/datesheettable">
                                    <SubMenuItem>
                                        <MenuLabel>
                                            <MenuIcon>
                                                <AiFillAppstore />
                                            </MenuIcon>
                                            Date Sheet Table
                                        </MenuLabel>
                                    </SubMenuItem>
                                </Link>

                                {/* <Link to="/admin/result">
                                <SubMenuItem>
                                    <MenuLabel>
                                        <MenuIcon>
                                            <AiFillAppstore />
                                        </MenuIcon>
                                        Result
                                    </MenuLabel>
                                </SubMenuItem>
                            </Link> */}

                                {/* <Link to="/admin/studentwise">
                                <SubMenuItem>
                                    <MenuLabel>
                                        <MenuIcon>
                                            <AiFillAppstore />
                                        </MenuIcon>
                                        Student Wise
                                    </MenuLabel>
                                </SubMenuItem>
                            </Link> */}
                                {/* <Link to="/admin/consolidated">
                                <SubMenuItem>
                                    <MenuLabel>
                                        <MenuIcon>
                                            <AiFillAppstore />
                                        </MenuIcon>
                                        Consolidated
                                    </MenuLabel>
                                </SubMenuItem>
                            </Link> */}

                            </>
                        )}

                        {isTabVisible("Logins") && (
                            <Link to="/admin/logins">
                                <MenuItem>
                                    <MenuLabel>
                                        <MenuIcon>
                                            <AiFillAppstore />
                                        </MenuIcon>
                                        Logins
                                    </MenuLabel>
                                    <PlusIcon>
                                        <AiOutlinePlus />
                                    </PlusIcon>
                                </MenuItem>
                            </Link>
                        )}

                        {/* <Link to="/admin/profile">
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

export default AdminSidebar;