import  { useState } from "react";
// import axios from "axios"; // Import axios
// import { Link } from "react-router-dom";
// import styled from "styled-components";
// import Navbar from "../Navbar";
// import Sidebar from "../Sidebar";
import {  Edit, Trash2 } from "lucide-react";
import {Section,Th,Td,SubmitButton,Select,Label,Input,FormContainer,InputContainer,Main,MainDashboard,Heading,Title,Form } from "../StudentAdmission/StudentAdmission";
import { ProgressContainer,Table100,DeleteButton,EditButton,Td1,ProgressBar,TableContainer,SubjectName,Progress,ProgressInner } from "./SubjectStyle";




// +++++++++++++++++++++++++++++++++

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
            <Table100>
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
            </Table100>
          </TableContainer>
        </FormContainer>
      </MainDashboard>

    </>
  );
};

export default AllotedSubject;
