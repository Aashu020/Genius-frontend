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

// const Container = styled.div`
//   display: flex;
//   background-color: #f4f4f4;
//   width: calc(100vw - 250px);
// `;

// const SidebarContainer = styled.div`
//   width: 250px;
//   border-right: 1px solid #e0e0e0;
// `;
// const MainDashboard = styled.div`
//   flex: 1;
//   padding: 20px;
//   height: calc(100vh - 100px);
//   overflow-y: auto;
//   background-color: #f9f9f9;
// `;

// // Calendar and birthday boxes

// const CalendarContainer = styled.div`
//   display: flex;
//   background-color: #fff;
//   border-radius: 12px;
//   padding: 20px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
//   margin-bottom: 20px;
//   justify-content: space-between;
//   @media (max-width: 480px) {
//     display: block;
//   }
// `;

// // Birthday Box and Academic Events

// const Box = styled.div`
//   display: flex;
//   @media (max-width: 480px) {
//     display: block;
//   }
// `;
// const Left = styled.div`
//   width: 60%;
//   @media (max-width: 480px) {
//     width: 100%;
//   }
// `;
// const Right = styled.div`
//   width: 40%;
//   @media (max-width: 480px) {
//     width: 100%;
//   }
// `;


// Main container for the layout
const Container = styled.div`
  display: flex;
  background-color: #f4f4f4;
  width: ${({ isSidebarOpen }) => (isSidebarOpen ? "calc(100vw - 250px)" : "100vw")};
  min-height: 100vh;
  transition: width 0.3s ease; /* Smooth width transition */

  /* Very Small Mobile (≤320px) */
  @media (max-width: 320px) {
    flex-direction: column;
    width: 100vw;
    padding: 0;
  }

  /* Mobile (≤480px) */
  @media (max-width: 480px) {
    flex-direction: column;
    width: 100vw;
    padding: 0;
  }

  /* Tablet (≤768px) */
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100vw;
  }

  /* Small Laptop (≤1024px) */
  @media (max-width: 1024px) {
    width: ${({ isSidebarOpen }) => (isSidebarOpen ? "calc(100vw - 200px)" : "100vw")};
  }

  /* Large Screens (≥1025px) */
  @media (min-width: 1025px) {
    width: ${({ isSidebarOpen }) => (isSidebarOpen ? "calc(100vw - 250px)" : "100vw")};
  }
`;

// Sidebar container
const SidebarContainer = styled.div`
  width: 250px;
  border-right: 1px solid #e0e0e0;
  background-color: #fff;
  padding: 10px 0;
  position: relative;
  transition: transform 0.3s ease, width 0.3s ease; /* Smooth transition for collapse */

  /* Sidebar collapsed state (hamburger mode) */
  ${({ isSidebarOpen }) =>
    !isSidebarOpen &&
    `
    width: 0;
    overflow: hidden;
    transform: translateX(-100%); /* Slide off to the left */
    position: absolute;
    z-index: 1000;
  `}

  /* Very Small Mobile (≤320px) */
  @media (max-width: 320px) {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #e0e0e0;
    padding: 8px;
    order: -1;
    font-size: 12px;
    transform: translateX(0); /* Reset transform on mobile */
    position: static; /* Reset to static positioning */
    ${({ isSidebarOpen }) =>
      !isSidebarOpen &&
      `
      display: none; /* Hide when collapsed on mobile */
    `}
  }

  /* Mobile (≤480px) */
  @media (max-width: 480px) {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #e0e0e0;
    padding: 10px;
    order: -1;
    font-size: 14px;
    transform: translateX(0);
    position: static;
    ${({ isSidebarOpen }) =>
      !isSidebarOpen &&
      `
      display: none;
    `}
  }

  /* Tablet (≤768px) */
  @media (max-width: 768px) {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #e0e0e0;
    padding: 15px;
    order: -1;
    font-size: 16px;
    transform: translateX(0);
    position: static;
    ${({ isSidebarOpen }) =>
      !isSidebarOpen &&
      `
      display: none;
    `}
  }

  /* Small Laptop (≤1024px) */
  @media (max-width: 1024px) {
    width: 200px;
  }

  /* Large Screens (≥1025px) */
  @media (min-width: 1025px) {
    width: 250px;
    font-size: 16px;
  }
`;

// Main dashboard area
const MainDashboard = styled.div`
  flex: 1;
  padding: 20px;
  height: calc(100vh - 100px);
  overflow-y: auto;
  background-color: #f9f9f9;
  transition: margin-left 0.3s ease; /* Smooth transition for margin */

  /* Adjust margin when sidebar is collapsed */
  ${({ isSidebarOpen }) =>
    !isSidebarOpen &&
    `
    margin-left: 0;
  `}

  /* Very Small Mobile (≤320px) */
  @media (max-width: 320px) {
    padding: 8px;
    height: auto;
    width: 100%;
    font-size: 12px;
    margin-left: 0; /* No margin when sidebar is hidden */
  }

  /* Mobile (≤480px) */
  @media (max-width: 480px) {
    padding: 10px;
    height: auto;
    width: 100%;
    font-size: 14px;
    margin-left: 0;
  }

  /* Tablet (≤768px) */
  @media (max-width: 768px) {
    padding: 15px;
    height: auto;
    width: 100%;
    font-size: 15px;
    margin-left: 0;
  }

  /* Small Laptop (≤1024px) */
  @media (max-width: 1024px) {
    padding: 15px;
    height: calc(100vh - 100px);
    font-size: 16px;
  }

  /* Large Screens (≥1025px) */
  @media (min-width: 1025px) {
    padding: 20px;
    height: calc(100vh - 100px);
    font-size: 16px;
  }
`;

// Calendar and birthday boxes container
const CalendarContainer = styled.div`
  display: flex;
  background-color: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
  justify-content: space-between;

  /* Very Small Mobile (≤320px) */
  @media (max-width: 320px) {
    display: block;
    padding: 8px;
    border-radius: 6px;
    margin-bottom: 10px;
    font-size: 12px;
  }

  /* Mobile (≤480px) */
  @media (max-width: 480px) {
    display: block;
    padding: 10px;
    border-radius: 8px;
    margin-bottom: 15px;
    font-size: 14px;
  }

  /* Tablet (≤768px) */
  @media (max-width: 768px) {
    display: block;
    padding: 15px;
    border-radius: 10px;
    margin-bottom: 15px;
    font-size: 15px;
  }

  /* Small Laptop (≤1024px) */
  @media (max-width: 1024px) {
    padding: 15px;
    border-radius: 10px;
    margin-bottom: 15px;
    font-size: 16px;
  }

  /* Large Screens (≥1025px) */
  @media (min-width: 1025px) {
    display: flex;
    padding: 20px;
    border-radius: 12px;
    margin-bottom: 20px;
    font-size: 16px;
  }
`;

// Birthday Box and Academic Events container
const Box = styled.div`
  display: flex;

  /* Very Small Mobile (≤320px) */
  @media (max-width: 320px) {
    display: block;
  }

  /* Mobile (≤480px) */
  @media (max-width: 480px) {
    display: block;
  }

  /* Tablet (≤768px) */
  @media (max-width: 768px) {
    display: block;
  }

  /* Small Laptop (≤1024px) */
  @media (max-width: 1024px) {
    flex-direction: row;
  }

  /* Large Screens (≥1025px) */
  @media (min-width: 1025px) {
    display: flex;
  }
`;

// Left section of the Box
const Left = styled.div`
  width: 60%;

  /* Very Small Mobile (≤320px) */
  @media (max-width: 320px) {
    width: 100%;
    margin-bottom: 8px;
  }

  /* Mobile (≤480px) */
  @media (max-width: 480px) {
    width: 100%;
    margin-bottom: 10px;
  }

  /* Tablet (≤768px) */
  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 15px;
  }

  /* Small Laptop (≤1024px) */
  @media (max-width: 1024px) {
    width: 55%;
  }

  /* Large Screens (≥1025px) */
  @media (min-width: 1025px) {
    width: 60%;
  }
`;

// Right section of the Box
const Right = styled.div`
  width: 40%;

  /* Very Small Mobile (≤320px) */
  @media (max-width: 320px) {
    width: 100%;
  }

  /* Mobile (≤480px) */
  @media (max-width: 480px) {
    width: 100%;
  }

  /* Tablet (≤768px) */
  @media (max-width: 768px) {
    width: 100%;
  }

  /* Small Laptop (≤1024px) */
  @media (max-width: 1024px) {
    width: 45%;
  }

  /* Large Screens (≥1025px) */
  @media (min-width: 1025px) {
    width: 40%;
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
