import React from "react";
import styled from "styled-components";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import AddEnquiryForm from "./AddEnquiry";
import EnquirySidebar from "./EnquirySidebar";

const Container = styled.div`
  display: flex;
  background-color: #f4f4f4;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const MainDashboard = styled.div`
  flex: 1;
  overflow-y: auto;
  background-color: #f9f9f9;
  padding: 20px;
  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const MainEnquiry = () => {
  return (
    <div>

      <MainDashboard>
        <AddEnquiryForm />
      </MainDashboard>

    </div>
  );
};

export default MainEnquiry;
