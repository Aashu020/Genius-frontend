import React, { useState } from "react";
import { FaTrashAlt } from 'react-icons/fa';
import { MainDashboard,
  Title,
  Form,
  Heading,
  Section,
  Main,
  Main1,
  FormContainer,
  InputContainer,
  Label,
  Select,
  Input,
  SubmitButton,
  Container,
  Header,
  InfoSection,
  Table,
  Th,
  Td,
  Input1,
  Button,
  DetailsSection,
  DetailsTable,
  SubmitButton1,} from './ResultUpdateStyle';


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
