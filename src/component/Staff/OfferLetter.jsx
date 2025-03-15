// OfferLetter.jsx
import React, { useState, useEffect } from "react";
import {
  MainDashboard,
  PageWrapper,
  Header,
  SearchBar,
  GradientButton,
  OfferLetterWrapper,
  OfferLetterHeader,
  SectionTitle,
  ContentText,
  ButtonContainer,
} from "./StaffStyle";
import  baseURL from '../utils/Url'; 
const OfferLetter = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(`${baseURL}/staff/all`);
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.EmployeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <MainDashboard>
        <PageWrapper>
          <Header>OFFER LETTER</Header>
          <SearchBar
            placeholder="Search employee by ID / Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <GradientButton>Generate Offer Letter</GradientButton>

          <OfferLetterWrapper>
            <OfferLetterHeader>
              <div>
                <ContentText>[Company Name]</ContentText>
                <ContentText>[Date]</ContentText>
              </div>
              <div>
                <ContentText>[Candidate Name]</ContentText>
                <ContentText>[Address]</ContentText>
                <ContentText>[City, State, Code]</ContentText>
              </div>
            </OfferLetterHeader>
            <SectionTitle>Job Offer Letter</SectionTitle>
            <ContentText>
              Dear [Candidate Name],
              <br />
              <br />
              We are pleased to offer you the position of [Job Title] at
              [Company Name]. We believe your skills and experience make you an
              excellent fit and a valuable addition to our organization...
            </ContentText>
          </OfferLetterWrapper>

          <ButtonContainer>
            <GradientButton>Generate PDF</GradientButton>
            <GradientButton>Print</GradientButton>
          </ButtonContainer>
        </PageWrapper>
      </MainDashboard>
    </>
  );
};

export default OfferLetter;