import React from "react";
import styled from "styled-components";
import Navbar from "../Navbar";
import StaffSidebar from "./StaffSidebar";
import Card from "../../assets/Images/IdCard.png";
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

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

const Header = styled.h1`
  color: #222d78;
  font-weight: bold;

  font-size: 24px;
  margin-bottom: 20px;
`;

const SearchBar = styled.input`
  width: 50%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 25px;
  margin-bottom: 20px;
  font-size: 16px;
  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

const Button = styled.button`
  background: linear-gradient(270deg, #222d78 0%, #7130e4 100%);
  width: 30%;
  color: #fff;
  padding: 12px 24px;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  margin: 10px;
  cursor: pointer;
  &:hover {
    background-color: #5142c7;
  }
  @media (max-width: 480px) {
    width: 50%;
    padding: 10px 6px;
    font-size: 12px;
  }
`;

const Button2 = styled.button`
  background: linear-gradient(270deg, #222d78 0%, #7130e4 100%);
  color: #fff;
  width: 30%;
  padding: 12px 24px;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  margin: 10px;
  cursor: pointer;
  &:hover {
    background-color: #5142c7;
  }
  @media (max-width: 480px) {
    width: 50%;
    padding: 10px 6px;
    font-size: 12px;
  }
`;
const OfferLetterWrapper = styled.img`
  background-color: #fff;
  width: 600px;
  height: 500px;

  background-image: url(${Card});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;

  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 30px;
  @media (max-width: 480px) {
    background-color: #fff;
    width: 245px;
    background-size: cover;
    border-radius: 0px;
    height: 165px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  width: 90%;
`;

const IdCard = () => {
  return (
    <>

      <MainDashboard>
        <PageWrapper>
          <Header>Id Card</Header>
          <SearchBar placeholder="Search employee by ID / Name" />
          <Button>Generate Id</Button>

          <OfferLetterWrapper>
            {/* Add other parts of the letter similarly */}
          </OfferLetterWrapper>

          <ButtonContainer>
            <Button2>Generate PDF</Button2>
            <Button2>Print</Button2>
          </ButtonContainer>
        </PageWrapper>
      </MainDashboard>

    </>
  );
};

export default IdCard;
