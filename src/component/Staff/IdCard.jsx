// IdCard.jsx
import React from "react";
import {
  MainDashboard,
  PageWrapper,
  Header,
  SearchBar,
  GradientButton,
  IdCardWrapper,
  ButtonContainer,
} from "./StaffStyle";

const IdCard = () => {
  return (
    <>
      <MainDashboard>
        <PageWrapper>
          <Header>Id Card</Header>
          <SearchBar placeholder="Search employee by ID / Name" />
          <GradientButton>Generate Id</GradientButton>

          <IdCardWrapper />

          <ButtonContainer>
            <GradientButton>Generate PDF</GradientButton>
            <GradientButton>Print</GradientButton>
          </ButtonContainer>
        </PageWrapper>
      </MainDashboard>
    </>
  );
};

export default IdCard;