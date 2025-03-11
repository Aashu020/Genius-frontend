import React, { useState } from "react";
import axios from "axios"; // Import axios
import { Link } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { Eye, Edit, Trash2 } from "lucide-react";

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

// ++++++++++++++++++++++++++++++++++++++++++++++++++++

const ProgressContainer = styled.div`
  width: 50%;
  margin-bottom: 20px;
  margin-top: 30px;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  h2 {
    margin-bottom: 15px;
    font-size: 20px;
    color: #0d47a1;
  }
`;

const ProgressBar = styled.div`
  margin-bottom: 20px;
`;

const SubjectName = styled.div`
  font-size: 16px;
  color: #1a237e;
  margin-bottom: 5px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Progress = styled.div`
  background-color: #e3f2fd;
  border-radius: 10px;
  overflow: hidden;
  height: 8px;
`;

const ProgressInner = styled.div`
  height: 100%;
  width: ${(props) => props.width}%;
  background-color: #0d47a1;
`;
// +++++++++++++++++++++++++++++++++++++++++++++++

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
  gap: 20px;
  grid-template-columns: repeat(3, 1fr);

  @media (max-width: 480px) {
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

const Label2 = styled.span`
  position: absolute;
  top: -10px;
  left: 20px;
  background: linear-gradient(270deg, #6c6c6c 0%, #525252 100%);
  color: white;
  padding: 2px 10px;
  border-radius: 20px;
  font-size: 12px;
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

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 30px;
`;

const Th = styled.th`
  background-color: #f2f2f2;
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  font-weight: 400;
`;

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;
const Td1 = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  display: flex;
  gap: 1rem;
`;
const EditButton = styled.button`
  background-color: #209a16bf;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const DeleteButton = styled.div`
  background-color: red;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  width: 10%;
  display: flex;
  justify-content: center;
`;

// +++++++++++++++++++++++++++++++++

const SelectContainer = styled.div`
  width: 88%;
  cursor: pointer;
`;

const Dropdown = styled.div`
  width: 100%;
  padding: 15px 20px;
  border: 2px solid #7d3cff;
  border-radius: 30px;
  font-size: 16px;
  background-color: #f4f6fc;
  font-weight: bold;
  color: #7a7a7a;
`;

const CheckboxContainer = styled.div`
  position: absolute;
  top: 50px;
  left: 0;
  width: 100%;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
  padding: 10px;
`;

const Checkbox = styled.label`
  display: block;
  margin-bottom: 10px;
  font-size: 16px;
`;

const ClearButton = styled.button`
  width: 100px;
  padding: 5px;
  background-color: red;
  border: none;
  border-radius: 20px;
  color: white;
  font-size: 14px;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: darkred;
  }
`;

const subjectsProgress = [
  { subject: "English-6A", progress: 80 },
  { subject: "Hindi-5B", progress: 65 },
  { subject: "Mathematics", progress: 90 },
  { subject: "Geography", progress: 75 },
  { subject: "Science", progress: 85 },
  { subject: "History", progress: 60 },
];

const AllotedSubject = () => {
  const subject = Array(3).fill({
    Class: "class 1",
    Section: "section A",
    subject: "english",
    Title: "xyz",
    Homework: "20/09/2024",
    Complete: "28/09/2024",
    Status: "Active/Deactive",
    Approve: "Approve",
  });

  const [formData, setFormData] = useState({
    Class: "",
    Section: "",
    subject: "",
    Chapter: "",
    Date: "",
    CompleteDate: "",
    Title: "",
    Description: "",
    Attechment: "",
    Status: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear the error message for this field
    setErrors({
      ...errors,
      [name]: "",
    });
  };
  const validateForm = () => {
    const newErrors = {};
    if (!formData.Class) newErrors.Class = "Class is required";
    if (!formData.Date) newErrors.Date = "Date is required";
    if (!formData.CompleteDate) newErrors.CompleteDate = "Complete Date is required";
    if (!formData.Chapter) newErrors.Chapter = "Chapter is required";
    if (!formData.Section) newErrors.Section = "Section is required";
    if (!formData.subject) newErrors.subject = "Subject is required";
    if (!formData.Title) newErrors.Title = "Title is required";
    if (!formData.Description) newErrors.Description = "Description is required";
    if (!formData.Attechment) newErrors.Attechment = "Attechment is required";
    if (!formData.Status) newErrors.Status = "Status is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  };

  return (
    <>

      <MainDashboard>
        <ProgressContainer>
          <h2>Subject Progress</h2>
          {subjectsProgress.map((subject, index) => (
            <ProgressBar key={index}>
              <SubjectName>
                <p>{subject.subject}</p>
                <p>{subject.progress}%</p>
              </SubjectName>
              <Progress>
                <ProgressInner width={subject.progress} />
              </Progress>
            </ProgressBar>
          ))}
        </ProgressContainer>

        <FormContainer>
          <Form onSubmit={handleSubmit}>
            <Section>
              <Heading>Homework</Heading>
              <Heading>Add +</Heading>
            </Section>
            <Main>
              <InputContainer>
                <Label>Class </Label>
                <Input
                  type="text"
                  name="Class"
                  value={formData.Class}
                  onChange={handleChange}
                ></Input>
                {errors.Class && (
                  <div style={{ color: "red", marginTop: "5px" }}>
                    {errors.Class}
                  </div>
                )}
              </InputContainer>

              <InputContainer>
                <Label>Section </Label>
                <Input
                  type="text"
                  name="Section"
                  value={formData.Section}
                  onChange={handleChange}
                ></Input>
                {errors.Section && (
                  <div style={{ color: "red", marginTop: "5px" }}>
                    {errors.Section}
                  </div>
                )}
              </InputContainer>

              <InputContainer>
                <Label>Subject </Label>
                <Input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                ></Input>
                {errors.subject && (
                  <div style={{ color: "red", marginTop: "5px" }}>
                    {errors.subject}
                  </div>
                )}
              </InputContainer>

              <InputContainer>
                <Label>Chapter </Label>
                <Input
                  type="text"
                  name="Chapter"
                  value={formData.Chapter}
                  onChange={handleChange}
                ></Input>
                {errors.Chapter && (
                  <div style={{ color: "red", marginTop: "5px" }}>
                    {errors.Chapter}
                  </div>
                )}
              </InputContainer>

              <InputContainer>
                <Label>Homework Date </Label>
                <Input
                  type="date"
                  name="Date"
                  value={formData.Date}
                  onChange={handleChange}
                ></Input>
                {errors.Date && (
                  <div style={{ color: "red", marginTop: "5px" }}>
                    {errors.Date}
                  </div>
                )}
              </InputContainer>

              <InputContainer>
                <Label>Complete Date </Label>
                <Input
                  type="date"
                  name="CompleteDate"
                  value={formData.CompleteDate}
                  onChange={handleChange}
                ></Input>
                {errors.CompleteDate && (
                  <div style={{ color: "red", marginTop: "5px" }}>
                    {errors.CompleteDate}
                  </div>
                )}
              </InputContainer>

              <InputContainer>
                <Label>Title </Label>
                <Input
                  type="text"
                  name="Title"
                  value={formData.Title}
                  onChange={handleChange}
                ></Input>
                {errors.Title && (
                  <div style={{ color: "red", marginTop: "5px" }}>
                    {errors.Title}
                  </div>
                )}
              </InputContainer>

              <InputContainer>
                <Label>Description </Label>
                <Input
                  type="text"
                  name="Description"
                  value={formData.Description}
                  onChange={handleChange}
                ></Input>
                {errors.Description && (
                  <div style={{ color: "red", marginTop: "5px" }}>
                    {errors.Description}
                  </div>
                )}
              </InputContainer>
              <InputContainer>
                <Label>Attechment 1 </Label>
                <Input
                  type="text"
                  name="Attechment"
                  value={formData.Attechment}
                  onChange={handleChange}
                ></Input>
                {errors.Attechment && (
                  <div style={{ color: "red", marginTop: "5px" }}>
                    {errors.Attechment}
                  </div>
                )}
              </InputContainer>
              <InputContainer>
                <Label>Status </Label>
                <Select
                  name="Status"
                  value={formData.Status}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="Draft">Draft</option>
                  <option value="Published">Published</option>
                </Select>
                {errors.Status && (
                  <div style={{ color: "red", marginTop: "5px" }}>
                    {errors.Status}
                  </div>
                )}
              </InputContainer>
            </Main>
            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "center",
              }}
            >
              <SubmitButton type="submit">Save</SubmitButton>
            </div>
          </Form>
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <Th>Class</Th>
                  <Th>Section</Th>
                  <Th>Subject</Th>
                  <Th>Title</Th>
                  <Th>Homework date</Th>
                  <Th>Complete date</Th>
                  <Th>Publish Status</Th>
                  <Th>Approve </Th>
                  <Th>Action </Th>
                </tr>
              </thead>
              <tbody>
                {subject.map((student, index) => (
                  <tr key={index}>
                    <Td>{student.Class}</Td>
                    <Td>{student.Section}</Td>
                    <Td>{student.subject}</Td>
                    <Td>{student.Title}</Td>
                    <Td>{student.Homework}</Td>
                    <Td>{student.Complete}</Td>
                    <Td>{student.Status}</Td>
                    <Td>
                      <EditButton>{student.Approve}</EditButton>
                    </Td>
                    <Td1>
                      <EditButton>
                        <p>Edit</p>
                        <Edit size={18} />
                      </EditButton>
                      <DeleteButton>
                        <Trash2 size={18} />
                      </DeleteButton>
                    </Td1>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableContainer>
        </FormContainer>
      </MainDashboard>

    </>
  );
};

export default AllotedSubject;
