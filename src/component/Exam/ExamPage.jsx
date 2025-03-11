import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 80%;
  margin: 20px auto;
  border: 1px solid #ccc;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Header = styled.div`
  text-align: center;
  border-bottom: 2px solid #000;
  padding-bottom: 10px;
  margin-bottom: 20px;

  h1 {
    margin: 0;
    font-size: 24px;
  }
`;

const Section = styled.div`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 10px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
  background-color: #f2f2f2;
  font-weight: bold;
`;

const Td = styled.td`
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
`;

const ExamPage = ({ sections }) => {
  return (
    <Container>
      <Header>
        <h1>Exam Blueprint</h1>
      </Header>
      {sections.length > 0 ? (
        sections.map((section, index) => (
          <Section key={index}>
            <SectionTitle>Section {section.section}</SectionTitle>
            <Table>
              <thead>
                <tr>
                  <Th>No of Questions</Th>
                  <Th>Marks For Each Question</Th>
                  <Th>Total Marks</Th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <Td>{section.numQuestions}</Td>
                  <Td>{section.eachQuestionMark}</Td>
                  <Td>{section.numQuestions * section.eachQuestionMark}</Td>
                </tr>
              </tbody>
            </Table>
          </Section>
        ))
      ) : (
        <p>No sections available.</p>
      )}
    </Container>
  );
};

export default ExamPage;