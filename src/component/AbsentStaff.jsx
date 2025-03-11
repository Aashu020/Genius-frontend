import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Eye, Trash2 } from "lucide-react";

const Wrapper = styled.div`
  width: 90%;
  margin: auto;
  margin-top: 20px;
  @media (max-width: 480px) {
    width: 100%;
    margin: 0;
    margin-bottom: 20px;
  }
`;

const HeaderTitle = styled.h2`
  font-size: 20px;
  color: #1a237e;
  margin-bottom: 20px;
  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const TableHead = styled.thead`
  background-color: #f0f0f0;
`;

const HeadCell = styled.th`
  padding: 12px 15px;
  text-align: left;
  color: #666;
  font-weight: bold;
  @media (max-width: 480px) {
    font-size: 10px;
    padding: 8px 8px;
  }
`;

const TableBody = styled.tbody`
  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const BodyCell = styled.td`
  padding: 12px 15px;
  text-align: left;
  font-size: 16px;
  color: #333;
  @media (max-width: 480px) {
    font-size: 10px;
    padding: 8px 8px;
  }
`;

const Photo = styled.img`
  width: 115px;
  height: 110px;
  background-color: gray;
  border-radius: 50%;
`;

const DeleteButton = styled.div`
  background-color: red;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  width: 20%;
  display: flex;
  justify-content: center;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  @media (max-width: 480px) {
    height: 2rem;
    width: 2rem;
    padding: 1px 0;
  }
`;

const AbsentStaffList = () => {
  const [absentStaff, setAbsentStaff] = useState([]);

  useEffect(() => {
    const fetchAbsentStaff = async () =>  {
      try {
        const response = await fetch('https://api.edspride.in/staff-attendance/all');
        const data = await response.json();
        const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

        const absentStaffList = data
          .filter(entry => entry.Date === today)
          .flatMap(entry => 
            entry.Attendance.filter(attendance => attendance.Status !== 'Present')
          );

          console.log(data)

        // Fetch additional staff details using EmployeeId
        const staffDetails = await Promise.all(absentStaffList.map(async (staff) => {
          const employeeResponse = await fetch(`https://api.edspride.in/staff/get/${staff.EmployeeId}`);
          const employeeData = await employeeResponse.json();
          return {
            id: employeeData._id,
            name: employeeData.Name, // Using the "Name" attribute
            roleClass: employeeData.Role, // Using the "Role" attribute
            image: employeeData.image || 'https://via.placeholder.com/40', // Placeholder if no image
            mobileNo: employeeData.MobileNo, // Add any additional attributes you may need
            email: employeeData.Email // Add any additional attributes you may need
          };
        }));

        setAbsentStaff(staffDetails);
      } catch (error) {
        console.error('Error fetching absent staff:', error);
      }
    };

    fetchAbsentStaff();
  }, []);

  return (
    <Wrapper>
      <HeaderTitle>Today's Absent Staff</HeaderTitle>
      <StyledTable>
        <TableHead>
          <tr>
            <HeadCell>Profile Picture</HeadCell>
            <HeadCell>Name</HeadCell>
            <HeadCell>Role/Class</HeadCell>
          </tr>
        </TableHead>
        <TableBody>
          {absentStaff.map((staff, index) => (
            <tr key={index}>
              <BodyCell><Photo src={`https://api.edspride.in/uploads/${staff?.Documents?.Photo}`} alt="Staff" /></BodyCell>
              <BodyCell>{staff.name}</BodyCell>
              <BodyCell>{staff.roleClass}</BodyCell>
             
            </tr>
          ))}
        </TableBody>
      </StyledTable>
    </Wrapper>
  );
};

export default AbsentStaffList;
