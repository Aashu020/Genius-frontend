import React from "react";
import styled from "styled-components";

const Salary = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  /* min-height: 100vh; */
  font-family: Arial, sans-serif;
`;
const Container = styled.div`
  display: flex;


  /* background-color: #f4f4f4; */
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const MainDashboard = styled.div`
  flex: 1;
  height: calc(100vh - 100px);
  overflow-y: auto;
  padding: 20px;
  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const SlipContainer = styled.div`
  width: 90%;
  max-width: 800px;
  background-color: white;
  padding: 20px;
  border: 1px solid #d4d4d4;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const Logo = styled.img`
  width: 100px;
`;

const CompanyName = styled.h1`
  font-size: 28px;
  margin: 10px 0 5px 0;
`;

const Subtext = styled.p`
  font-size: 14px;
  color: #777;
`;

const Title = styled.h2`
  font-size: 22px;
  color: #db2a2a;
  margin-top: 10px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;

const InfoBlock = styled.div`
  flex: 0 0 48%;
  font-size: 14px;
  margin-bottom: 10px;
`;

const InfoLabel = styled.p`
  font-weight: bold;
  display: inline-block;
  margin-right: 5px;
`;

const InfoValue = styled.span`
  font-weight: normal;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableHeader = styled.th`
  border: 1px solid #d4d4d4;
  padding: 10px;
  text-align: center;
  background-color: #f9f9f9;
  font-size: 14px;
  font-weight: bold;
`;

const TableData = styled.td`
  border: 1px solid #d4d4d4;
  padding: 10px;
  text-align: center;
  font-size: 14px;
`;

const SalarySubmit = () => {
  return (
    <>

      <MainDashboard>
        <Salary>
          <SlipContainer>
            <Header>
              <Logo src="lego-logo-url" alt="Company Logo" />
              <CompanyName>sanjivanee</CompanyName>
              <Subtext>"I don't know"</Subtext>
              <Subtext>9652296702 | India | sanjivanee.com</Subtext>
              <Title>Salary Slip</Title>
            </Header>

            <InfoRow>
              <InfoBlock>
                <InfoLabel>Employee ID:</InfoLabel>
                <InfoValue>122828</InfoValue>
              </InfoBlock>
              <InfoBlock>
                <InfoLabel>Salary Month:</InfoLabel>
                <InfoValue>2024-10</InfoValue>
              </InfoBlock>
              <InfoBlock>
                <InfoLabel>Date Of Receiving:</InfoLabel>
                <InfoValue>2024-09-17</InfoValue>
              </InfoBlock>
              <InfoBlock>
                <InfoLabel>Salary Amount:</InfoLabel>
                <InfoValue>$ 123,059</InfoValue>
              </InfoBlock>
              <InfoBlock>
                <InfoLabel>Employee Type:</InfoLabel>
                <InfoValue>Teacher</InfoValue>
              </InfoBlock>
              <InfoBlock>
                <InfoLabel>Employee Name:</InfoLabel>
                <InfoValue>bnh</InfoValue>
              </InfoBlock>
              <InfoBlock>
                <InfoLabel>F/H Name:</InfoLabel>
                <InfoValue>hhhjjh</InfoValue>
              </InfoBlock>
            </InfoRow>

            <Table>
              <thead>
                <tr>
                  <TableHeader>Sr.#</TableHeader>
                  <TableHeader>Salary Month</TableHeader>
                  <TableHeader>Date</TableHeader>
                  <TableHeader>Bonus</TableHeader>
                  <TableHeader>Deduction</TableHeader>
                  <TableHeader>Net Salary</TableHeader>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <TableData>1</TableData>
                  <TableData>2024-10</TableData>
                  <TableData>2024-09-17</TableData>
                  <TableData>122</TableData>
                  <TableData>2,541</TableData>
                  <TableData>123,059</TableData>
                </tr>
              </tbody>
            </Table>
          </SlipContainer>
        </Salary>
      </MainDashboard>

    </>
  );
};

export default SalarySubmit;
