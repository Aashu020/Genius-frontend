import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Eye, Trash2 } from "lucide-react";

import { StaffWrapper, HeaderTitle, StyledTable, TableHead, HeadCell, TableBody, BodyCell, Photo } from './Outerstyle';

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
    <StaffWrapper>
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
    </StaffWrapper>
  );
};

export default AbsentStaffList;
