import React, { useState } from "react";
import styled from "styled-components";
import { FaTrashAlt } from 'react-icons/fa';

const MainDashboard = styled.div`
  flex: 1;
  padding: 20px;
  height: calc(100vh - 100px);
  overflow-y: auto;
  background-color: #f9f9f9;
`;

const Title = styled.h2`
  color: #0d47a1;
  text-align: center;
  margin-bottom: 30px;
  font-weight: bold;
`;

const Form = styled.form`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const Heading = styled.div`
  width: 30%;
  background: linear-gradient(270deg, #222d78 0%, #7130e4 100%);
  color: white;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  margin-bottom: 40px;
  @media (max-width: 480px) {
    font-size: 12px;
    height: 30px;
    width: 50%;
    margin-bottom: 30px;
    margin-top: 20px;
  }
`;

const Section = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Main = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const Main1 = styled.div`
  display: grid;
  margin-top: 30px;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;
const FormContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 20px;
  @media (max-width: 480px) {
    margin-bottom: 12px;
  }
`;

const Label = styled.span`
  position: absolute;
  top: -10px;
  left: 20px;
  background: linear-gradient(270deg, #222d78 0%, #7130e4 100%);
  color: white;
  padding: 2px 10px;
  border-radius: 20px;
  font-size: 12px;
`;

const Select = styled.select`
  width: 100%;
  padding: 15px 20px;
  border: 2px solid #7d3cff;
  border-radius: 30px;
  font-size: 16px;
  color: #7a7a7a;
  background-color: #f4f6fc;
  font-weight: bold;
  @media (max-width: 480px) {
    height: 38px;
    width: 94%;
    font-size: 12px;
    padding: 10px 12px;
  }
`;

const Input = styled.input`
  width: 88%;
  padding: 15px 20px;
  border: 2px solid #7d3cff;
  border-radius: 30px;
  font-size: 16px;
  color: #7a7a7a;
  background-color: #f4f6fc;
  font-weight: bold;
  outline: none;

  @media (max-width: 480px) {
    height: 10px;
    width: 80%;
    font-size: 12px;
    padding: 12px 18px;
  }
`;

const SubmitButton = styled.button`
  width: 320px;
  padding: 12px;
  background: linear-gradient(270deg, #222d78 0%, #7130e4 100%);
  border: none;
  border-radius: 30px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s;
  margin-top: 20px;

  &:hover {
    background: linear-gradient(270deg, #1c2563 0%, #662acc 100%);
  }

  @media (max-width: 768px) {
    width: 100%;
    font-size: 12px;
    padding: 5px;
  }
`;
// ----------------------------------------------------------------------------------------

const Container = styled.div`
  width: 90%;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  font-family: Arial, sans-serif;
`;

const Header = styled.h2`
  color: #1d1d8f;
  font-size: 1.5rem;
  border-bottom: 2px solid #ddd;
  padding-bottom: 10px;
`;

const InfoSection = styled.div`
  margin: 10px 0;
  font-size: 1rem;
  span {
    font-weight: bold;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
`;

const Th = styled.th`
  background-color: #f2f2f2;
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
`;

const Td = styled.td`
  padding: 8px;
  border: 1px solid #ddd;
  text-align: center;
`;

const Input1 = styled.input`
  width: 50px;
  padding: 5px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  background-color: #1d1d8f;
  color: white;
  padding: 5px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #3333cc;
  }
`;

const DetailsSection = styled.div`
  margin-top: 20px;
  font-size: 0.9rem;
  color: #333;

  .optional {
    font-style: italic;
    color: #777;
  }
`;

const DetailsTable = styled(Table)`
  margin-top: 5px;
  td, th {
    padding: 6px;
    font-size: 0.9rem;
  }
  input {
    width: 95%;
  }
`;

const SubmitButton1 = styled(Button)`
  background-color: #3f3fbf;
  padding: 10px 20px;
  font-size: 1rem;
  width: 100px;
`;


const ResultUpdate = () => {
  const [formData, setFormData] = useState({
    Type: "",
    class: "",
    section: "",
    exam: "",
    student: "",
    admissionNo: ""
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  }

  return (
    <MainDashboard>
      <FormContainer>
        <Title>Result Update Student Wise</Title>
        <Form onSubmit={handleSubmit}>
          <Heading>Student Wise</Heading>
          <Main>
            <InputContainer>
              <Label>Select Class</Label>
              <Select name="class" value={formData.class} onChange={handleChange}>
                <option value="">Select Class</option>
                <option value="1">Class 1</option>
                <option value="2">Class 2</option>
              </Select>
            </InputContainer>

            <InputContainer>
              <Label>Select Section</Label>
              <Select name="section" value={formData.section} onChange={handleChange}>
                <option value="">Select Section</option>
                <option value="A">A</option>
                <option value="B">B</option>
              </Select>
            </InputContainer>
          </Main>
          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "center",
            }}
          >
            <SubmitButton type="submit">Search</SubmitButton>
          </div>


          <Main1>

            <InputContainer>
              <Label>Select Exam</Label>
              <Select name="exam" value={formData.exam} onChange={handleChange}>
                <option value="">Select Exam</option>
                <option value="Dec">December Exam</option>
                <option value="Jan">January Exam</option>
              </Select>
            </InputContainer>

            <InputContainer>
              <Label>Select Student</Label>
              <Select name="student" value={formData.student} onChange={handleChange}>
                <option value="">Select Student</option>
                <option value="1">Student 1</option>
                <option value="2">Student 2</option>
              </Select>
            </InputContainer>

            <InputContainer>
              <Label>Enter Admission No.</Label>
              <Input
                type="number"
                name="admissionNo"
                value={formData.admissionNo}
                onChange={handleChange}
                placeholder="Enter Admission No."
              />
              {errors.Type && (
                <div style={{ color: "red", marginTop: "5px" }}>
                  {errors.Type}
                </div>
              )}
            </InputContainer>
          </Main1>

          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "center",
            }}
          >
            <SubmitButton type="submit">Search</SubmitButton>
          </div>
        </Form>

        <Container>
          <Header>Result Update Subject Wise</Header>
          <InfoSection>
            Student Name: <span>GURSEVEX SINGH</span> &nbsp;
            Class: <span>1st</span> &nbsp;
            Section: <span>A</span> &nbsp;
            Exam Name: <span>December Exam</span> &nbsp;
            Admission No: <span>12453423</span>
          </InfoSection>

          <Table>
            <thead>
              <tr>
                <Th>SR NO.</Th>
                <Th>Subject</Th>
                <Th>Exam Name</Th>
                <Th>Min Marks</Th>
                <Th>Max Marks</Th>
                <Th>Obtained Marks</Th>
                <Th>Practical</Th>
                <Th>Grade</Th>
                <Th>Action</Th>
              </tr>
            </thead>
            <tbody>
              {[...Array(7)].map((_, index) => (
                <tr key={index}>
                  <Td>{index + 1}</Td>
                  <Td>Hindi</Td>
                  <Td>December Exam</Td>
                  <Td><Input1 type="text" defaultValue="35" /></Td>
                  <Td><Input1 type="text" defaultValue="100" /></Td>
                  <Td><Input1 type="text" defaultValue="56" /></Td>
                  <Td><Input1 type="text" defaultValue="12" /></Td>
                  <Td><Input1 type="text" defaultValue="35" /></Td>
                  <Td><FaTrashAlt color="red" cursor="pointer" /></Td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Button>Update</Button>

          <DetailsSection>
            <div className="optional">Details (Optional)</div>
            Generally Needed in Half Yearly / Annual / Term 1 Last/Term 2 Exams
            <DetailsTable>
              <tbody>
                <tr>
                  <Td>Attendance</Td>
                  <Td><Input1 type="text" /></Td>
                  <Td>Height (CM)</Td>
                  <Td><Input1 type="text" /></Td>
                </tr>
                <tr>
                  <Td>Weight (KG)</Td>
                  <Td><Input1 type="text" /></Td>
                  <Td>Result</Td>
                  <Td><Input1 type="text" /></Td>
                </tr>
                <tr>
                  <Td>Division</Td>
                  <Td><Input1 type="text" /></Td>
                  <Td>Result Date</Td>
                  <Td><Input1 type="text" defaultValue="24 Oct 2024" /></Td>
                </tr>
                <tr>
                  <Td>Promoted to Class</Td>
                  <Td colSpan="3"><Input1 type="text" /></Td>
                </tr>
              </tbody>
            </DetailsTable>
          </DetailsSection>

          <SubmitButton1>Submit</SubmitButton1>
        </Container>

      </FormContainer>
    </MainDashboard>
  );
};

export default ResultUpdate;
