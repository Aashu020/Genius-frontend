import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

const Container = styled.div`
  display: flex;
  
  background-color: #f4f4f4;
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

const OfferLetterWrapper = styled.div`
  background-color: #fff;
  padding: 30px;
  width: 80%;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 30px;
`;

const OfferLetterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  color: #624ef2;
  font-size: 20px;
  margin-bottom: 20px;
`;

const ContentText = styled.p`
  color: #333;
  font-size: 16px;
  line-height: 1.6;
  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  width: 90%;
`;

const OfferLetter = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("https://api.edspride.in/staff/all");
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
            <Button>Generate Offer Letter</Button>

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
                [Company Name]. We believe your skills and experience make you
                an excellent fit and a valuable addition to our organization...
              </ContentText>

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

export default OfferLetter;
