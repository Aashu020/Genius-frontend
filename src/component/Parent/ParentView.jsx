import React from "react";
import styled from "styled-components";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import DynamicDashboard from "../Employee/SubjectProgress";
import TaskTable from "../Employee/Task";
import Calender from "../Calender";
import DynamicSlider from "../Birthday";
import NewAdmissions from "../NewAdmission";
import TimeTable from "../TimeTable";
import Subjectprogress from "./SubjectPro";
import Classmates from "./Classmates";

const Container = styled.div`
  display: flex;
  background-color: #f4f4f4;
  width: calc(100vw - 250px);
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
const ParentView = () => {
  return (
    <Container>
      <MainDashboard>
        <Subjectprogress />
        <TaskTable />

        <CalendarContainer>
          <Calender />

          <DynamicSlider />
        </CalendarContainer>

        <Box>
          <Classmates/>
        </Box>
      </MainDashboard>
    </Container>
  );
};

export default ParentView;
