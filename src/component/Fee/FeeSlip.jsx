import React from "react";
import styled from "styled-components";
import Navbar from "../Navbar";
import FeeSidebar from "./FeeSidebar";
import Sidebar from "../Sidebar";
import { Container, MainDashboard, FeeSlipWrapper, SlipContainer, Head, Logo, SchoolName1, Subtext, Title1, InfoRow, InfoBlock, InfoLabel, InfoValue, Table, TableHeader1, TableData, TotalAmount, Note } from "./FeeStyles";
import { Heading } from "lucide-react";

const FeeSlip = () => {
  return (
    <>

      <MainDashboard>
        <FeeSlipWrapper>
          <SlipContainer>
            <Head>
              <Logo src="lego-logo-url" alt="School Logo" />
              <SchoolName1>sanjivanee</SchoolName1>
              <Subtext>"I don't know"</Subtext>
              <Subtext>9552698702 | India | sanjivanee.com</Subtext>
              <Title1>Fee Submission Slip</Title1>
            </Head>

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

            <Table style={{width:'100%'}}>
              <thead>
                <tr>
                  <TableHeader1>Sr. No.</TableHeader1>
                  <TableHeader1>Particulars</TableHeader1>
                  <TableHeader1>Amount</TableHeader1>
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

            <Table style={{width:'100%'}}>
              <thead>
                <tr>
                  <TableHeader1>Sr.#</TableHeader1>
                  <TableHeader1>Submission Date</TableHeader1>
                  <TableHeader1>Fee Month</TableHeader1>
                  <TableHeader1>Total Amount</TableHeader1>
                  <TableHeader1>Deposit</TableHeader1>
                  <TableHeader1>Due-able</TableHeader1>
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
