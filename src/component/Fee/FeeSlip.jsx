import React from "react";
import styled from "styled-components";
import Navbar from "../Navbar";
import FeeSidebar from "./FeeSidebar";
import Sidebar from "../Sidebar";

const Container = styled.div`
  display: flex;
  
  background-color: #f4f4f4;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const MainDashboard = styled.div`
  flex: 1;
  height: calc(100vh - 100px);
overflow-y: auto;
  background-color: #f9f9f9;
  padding: 20px;
  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const FeeSlipWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  background-color: #f4f6f9;
  min-height: 100vh;
  font-family: Arial, sans-serif;
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

const SchoolName = styled.h1`
  font-size: 28px;
  margin: 10px 0 5px 0;
  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

const Subtext = styled.p`
  font-size: 14px;
  color: #777;
  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

const Title = styled.h2`
  font-size: 22px;
  color: #db2a2a;
  margin-top: 10px;
  @media (max-width: 480px) {
    font-size: 10px;
  }
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
  @media (max-width: 480px) {
    font-size: 9px;
  }
`;

const InfoValue = styled.span`
  font-weight: normal;
  @media (max-width: 480px) {
    font-size: 8px;
  }
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
  @media (max-width: 480px) {
    font-size: 6px;
  }
`;

const TableData = styled.td`
  border: 1px solid #d4d4d4;
  padding: 10px;
  text-align: center;
  font-size: 14px;
  @media (max-width: 480px) {
    font-size: 6px;
  }
`;

const TotalAmount = styled.div`
  text-align: right;
  font-weight: bold;
  margin-top: 10px;
  font-size: 16px;
`;

const Note = styled.p`
  font-size: 14px;
  text-align: center;
  margin-top: 20px;
  color: #db2a2a;
  font-style: italic;
  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

const FeeSlip = () => {
  return (
    <>

      <MainDashboard>
        <FeeSlipWrapper>
          <SlipContainer>
            <Header>
              <Logo src="lego-logo-url" alt="School Logo" />
              <SchoolName>sanjivanee</SchoolName>
              <Subtext>"I don't know"</Subtext>
              <Subtext>9552698702 | India | sanjivanee.com</Subtext>
              <Title>Fee Submission Slip</Title>
            </Header>

            <InfoRow>
              <InfoBlock>
                <InfoLabel>Reg. No:</InfoLabel>
                <InfoValue>123456789</InfoValue>
              </InfoBlock>
              <InfoBlock>
                <InfoLabel>Serial No:</InfoLabel>
                <InfoValue>1231866</InfoValue>
              </InfoBlock>
              <InfoBlock>
                <InfoLabel>Total Amount:</InfoLabel>
                <InfoValue>$1983</InfoValue>
              </InfoBlock>
              <InfoBlock>
                <InfoLabel>Submit Date:</InfoLabel>
                <InfoValue>2024-09-17</InfoValue>
              </InfoBlock>
              <InfoBlock>
                <InfoLabel>Student Name:</InfoLabel>
                <InfoValue>asde</InfoValue>
              </InfoBlock>
              <InfoBlock>
                <InfoLabel>Father Name:</InfoLabel>
                <InfoValue>uygqiyuhio</InfoValue>
              </InfoBlock>
              <InfoBlock>
                <InfoLabel>Fees Month:</InfoLabel>
                <InfoValue>2024-06</InfoValue>
              </InfoBlock>
              <InfoBlock>
                <InfoLabel>Deposit Amount:</InfoLabel>
                <InfoValue>$2000</InfoValue>
              </InfoBlock>
              <InfoBlock>
                <InfoLabel>Class:</InfoLabel>
                <InfoValue>san</InfoValue>
              </InfoBlock>
              <InfoBlock>
                <InfoLabel>Remaining Balance:</InfoLabel>{" "}
                <InfoValue>-$17</InfoValue>
              </InfoBlock>
            </InfoRow>

            <Table>
              <thead>
                <tr>
                  <TableHeader>Sr. No.</TableHeader>
                  <TableHeader>Particulars</TableHeader>
                  <TableHeader>Amount</TableHeader>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <TableData>1</TableData>
                  <TableData>MONTHLY FEE</TableData>
                  <TableData>456</TableData>
                </tr>
                <tr>
                  <TableData>2</TableData>
                  <TableData>ADMISSION FEE</TableData>
                  <TableData>12</TableData>
                </tr>
                <tr>
                  <TableData>3</TableData>
                  <TableData>REGISTRATION FEE</TableData>
                  <TableData>10</TableData>
                </tr>
                <tr>
                  <TableData>4</TableData>
                  <TableData>ART MATERIAL</TableData>
                  <TableData>15</TableData>
                </tr>
                <tr>
                  <TableData>5</TableData>
                  <TableData>TRANSPORT</TableData>
                  <TableData>45</TableData>
                </tr>
                <tr>
                  <TableData>6</TableData>
                  <TableData>BOOKS</TableData>
                  <TableData>45</TableData>
                </tr>
                <tr>
                  <TableData>7</TableData>
                  <TableData>UNIFORM</TableData>
                  <TableData>85</TableData>
                </tr>
                <tr>
                  <TableData>8</TableData>
                  <TableData>FINE</TableData>
                  <TableData>1220</TableData>
                </tr>
                <tr>
                  <TableData>9</TableData>
                  <TableData>OTHERS</TableData>
                  <TableData>100</TableData>
                </tr>
                <tr>
                  <TableData>10</TableData>
                  <TableData>PREVIOUS BALANCE</TableData>
                  <TableData>0</TableData>
                </tr>
                <tr>
                  <TableData>11</TableData>
                  <TableData>DISCOUNT IN FEE</TableData>
                  <TableData>5</TableData>
                </tr>
                <tr>
                  <TableData></TableData>
                  <TableData>
                    <b>TOTAL :</b>
                  </TableData>
                  <TableData>$1983</TableData>
                </tr>
                <tr>
                  <TableData></TableData>
                  <TableData>
                    <b>DEPOSIT :</b>
                  </TableData>
                  <TableData>$1203</TableData>
                </tr>
                <tr>
                  <TableData></TableData>
                  <TableData>
                    <b>DUE-ABLE BALANCE :</b>
                  </TableData>
                  <TableData>$19</TableData>
                </tr>
              </tbody>
            </Table>

            <Note>Fee Submission Record Of "asde S/D/O uygqiyuhio"</Note>

            <Table>
              <thead>
                <tr>
                  <TableHeader>Sr.#</TableHeader>
                  <TableHeader>Submission Date</TableHeader>
                  <TableHeader>Fee Month</TableHeader>
                  <TableHeader>Total Amount</TableHeader>
                  <TableHeader>Deposit</TableHeader>
                  <TableHeader>Due-able</TableHeader>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <TableData>1</TableData>
                  <TableData>2024-09-17</TableData>
                  <TableData>2024-06</TableData>
                  <TableData>1983</TableData>
                  <TableData>2000</TableData>
                  <TableData>-17</TableData>
                </tr>
              </tbody>
            </Table>
          </SlipContainer>
        </FeeSlipWrapper>
      </MainDashboard>

    </>
  );
};

export default FeeSlip;
