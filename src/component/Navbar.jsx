import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Logoimgage from "../assets/Images/EDSP3.jpg";
import WhatsAppIcon from "./Whatsapp";
import NotificationModal from "./Notification";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Styled Components for the Header
const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #64b5f6;
  padding: 10px 20px;
  height: 60px;
  box-sizing: border-box;
`;

const Logo = styled.div`
  height: 50px;
  width: 130px;
  
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  gap: 15px;
  position: relative; /* Ensure the dropdown is positioned correctly */
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  background-color: #f0f0f5;
  border-radius: 30px;
  padding: 5px 15px;
  width: 100%;
`;

const SearchInput = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  padding: 8px;
  font-size: 14px;
  width: 100%;
  
  ::placeholder {
    color: #666;
  }
`;

const SearchIcon = styled.span`
  margin-left: 10px;
  font-size: 16px;
`;

const MenuIcon = styled.span`
  margin-right: 10px;
  font-size: 16px;
  color: black;
`;

const InstituteSection = styled.div`
  display: flex;
  align-items: center;
`;

const InstituteName = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #fff;
`;

const DropdownIcon = styled.span`
  margin-left: 5px;
`;

// Styled component for the dropdown list
const DropdownList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  border: 1px solid #ccc;
  max-height: 200px;
  overflow-y: auto;
  position: absolute;
  background-color: white;
  z-index: 10;
  width: 100%; /* Ensures it aligns with the search box */
`;

const DropdownItem = styled.li`
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const Navbar = () => {
  var navigate = useNavigate()
  const [query, setQuery] = useState('');
  const [formData, setFormData] = useState(null);

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard' },
    { name: 'Add Enquiry', path: '/admin/addenquiry' },
    { name: 'Enquiry Status', path: '/admin/enquirystatus' },
    { name: 'Student Table', path: '/admin/alldata' },
    { name: 'All Students', path: '/admin/allstudent' },
    { name: 'Add Student', path: '/admin/addstudent' },
    { name: 'All Staff', path: '/admin/allstaff' },
    { name: 'Add Staff', path: '/admin/addstaff' },
    { name: 'Offer Letter', path: '/admin/offerletter' },
    { name: 'ID Card', path: '/admin/idcard' },
    { name: 'Visitor', path: '/admin/visitorentry' },
    { name: 'Early Leaving', path: '/admin/earlyliving' },
    { name: 'Postal Received', path: '/admin/postalrecieved' },
    { name: 'Postal Dispatch', path: '/admin/postaldispatch' },
    { name: 'Complaint', path: '/admin/complaint' },
    { name: 'Electricity', path: '/admin/electricity' },
    { name: 'Attendance Type', path: '/admin/attendancetype' },
    { name: 'Student Attendance', path: '/admin/StudentAttendance' },
    { name: 'Attendance Table', path: '/admin/AttendanceTable' },
    { name: 'All Fees', path: '/admin/allfees' },
    { name: 'Collect Fee', path: '/admin/CollectFees' },
    { name: 'Create Fee Header', path: '/admin/createfeeheader' },
    { name: 'Fee Slab', path: '/admin/feeslab' },
    { name: 'Fine Set Up', path: '/admin/finesetup' },
    { name: 'Fee Discount', path: '/admin/feediscount' },
    { name: 'Fee Reconciliation', path: '/admin/feereconciliation' },
    { name: 'All Salary', path: '/admin/allsalary' },
    { name: 'Generate Salary', path: '/admin/generatesalary' },
    { name: 'Allowance', path: '/admin/allowence' },
    { name: 'Deduction', path: '/admin/deduction' },
    { name: 'Add Expense Head', path: '/admin/addexpensehead' },
    { name: 'Add Expense', path: '/admin/addexpense' },
    { name: 'Add Income Head', path: '/admin/addincomehead' },
    { name: 'Add Income', path: '/admin/addincome' },
    { name: 'Add Vendor', path: '/admin/addvendor' },
    { name: 'Add Account', path: '/admin/addaccount' },
    { name: 'Cash Deposit', path: '/admin/cashdeposit' },
    { name: 'Ledger', path: '/admin/ledger' },
    { name: 'Add Period', path: '/admin/addperiod' },
    { name: 'Create Time Table', path: '/admin/timetabledashboard' },
    { name: 'All Homework', path: '/admin/allhomework' },
    { name: 'Homework Type', path: '/admin/homeworktype' },
    { name: 'Homework', path: '/admin/homework' },
    { name: 'Add Exam', path: '/admin/addexam' },
    { name: 'Add Subject', path: '/admin/addsubject' },
    { name: 'Create Syllabus', path: '/admin/createsyllabus' },
    { name: 'Allotted Subject', path: '/admin/allotedsubject' },
    { name: 'School Setup', path: '/admin/setup' },
    { name: 'Add Class', path: '/admin/addclass' },
    { name: 'Add Section', path: '/admin/addsetion' },
    { name: 'Add Department', path: '/admin/adddepartment' },
    { name: 'Add Designation', path: '/admin/adddesignation' },
    { name: 'Add House', path: '/admin/house' },
    { name: 'Add Route', path: '/admin/addroute' },
    { name: 'Add Grade', path: '/admin/addgrade' },
    { name: 'Academic Year Information', path: '/admin/academicyearinfo' },
    { name: 'Academic Year Plan', path: '/admin/academicplan' },
    { name: 'Date Sheet', path: '/admin/datesheet' },
    { name: 'Date Sheet Table', path: '/admin/datesheettable' },
    { name: 'Result', path: '/admin/result' },
    { name: 'Student Wise', path: '/admin/studentwise' },
    { name: 'Consolidated', path: '/admin/consolidated' },
  ];

  const filteredItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (path) => {
    navigate(path);
    setQuery('');
  };

  useEffect(() => {
    axios
      .get("http://localhost:8007/schoolsetup/all")
      .then((response) => {
        // console.log(response.data);
        if (response.data.length > 0) {
          // setPresent(true);
          setFormData(response.data[0])
          // console.log(response.data[0])
        }
      })
      .catch((error) => {
        console.error(error);
      })
  }, [])

  return (
    <HeaderContainer>
      {/* Logo */}
      <Logo>
        <img src={Logoimgage} alt="Logo" />
      </Logo>

      {/* Search Bars */}
      <SearchContainer>
        <SearchBox>
          <MenuIcon>☰</MenuIcon>
          <SearchInput
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="search..."
          />
          <SearchIcon>🔍</SearchIcon>
        </SearchBox>

        {/* Display filtered results */}
        {query && (
          <DropdownList>
            {filteredItems.map((item) => (
              <DropdownItem key={item.name} onClick={() => handleSelect(item.path)}>
                {item.name}
              </DropdownItem>
            ))}
          </DropdownList>
        )}
      </SearchContainer>

      {/* Institute Name */}
      <InstituteSection>
        {/* <WhatsAppIcon /> */}
        {/* <NotificationModal /> */}
        <InstituteName>
          <img
            style={{ height: "45px"}}
            src={`http://localhost:8007/uploads/${formData?.SchoolLogo.replace(/^uploads\//, '')}`}
            alt="School-Logo"
          />

        </InstituteName>
      </InstituteSection>
    </HeaderContainer>
  );
};

export default Navbar;
