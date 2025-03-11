import React from "react";
import styled from "styled-components";

import Navbar from "../Navbar";
import DynamicDashboard from "./SubjectProgress";
import TaskTable from "./Task";
import Calender from "../Calender";
import DynamicSlider from "../Birthday";
import AbsentStaffList from "../AbsentStaff";
import AbsentStudentList from "../AbsentStudent";
import NewAdmissions from "../NewAdmission";
import TimeTable from "../TimeTable";
import Sidebar from "../Sidebar";

const Container = styled.div`
  display: flex;
  background-color: #f4f4f4;
`;

const SidebarContainer = styled.div`
  width: 250px;
  border-right: 1px solid #e0e0e0;
`;
const MainDashboard = styled.div`
  flex: 1;
  padding: 20px;
  height: calc(100vh - 100px);
  overflow-y: auto;
  background-color: #f9f9f9;
`;

// Calendar and birthday boxes

const CalendarContainer = styled.div`
  display: flex;
  background-color: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
  justify-content: space-between;
  @media (max-width: 480px) {
    display: block;
  }
`;

// Birthday Box and Academic Events

const Box = styled.div`
  display: flex;
  @media (max-width: 480px) {
    display: block;
  }
`;
const Left = styled.div`
  width: 60%;
  @media (max-width: 480px) {
    width: 100%;
  }
`;
const Right = styled.div`
  width: 40%;
  @media (max-width: 480px) {
    width: 100%;
  }
`;

const EmployeeProgress = () => {
  return (
    <>
      <MainDashboard>
        <DynamicDashboard />

        <CalendarContainer>
          <Calender />

          <DynamicSlider />
        </CalendarContainer>

        <Box>
          <Left>
            <AbsentStudentList />
            <TimeTable />
          </Left>
          <Right>
            <NewAdmissions />
          </Right>
        </Box>
      </MainDashboard>
    </>
  );
};

export default EmployeeProgress;
