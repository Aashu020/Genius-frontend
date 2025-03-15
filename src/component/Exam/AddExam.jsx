import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import  baseURL from '../utils/Url'; 
import {
  Container,
  MainDashboard,
  Title,
  Form,
  Heading,
  Section,
  Main,
  FormContainer,
  InputContainer,
  Label,
  Input,
  Select,
  SubmitButton,
  Table,
  Th,
  Td,
  Td1,
  Status,
  Button,
  DeleteButton,
} from "./ExamStyles";



const AddExam = () => {
  const [examDetails, setExamDetails] = useState({
    ExamId: "",
    ExamName: "",
    TheoryMaxMarks: "",
    TheorypassingMarks: "",
    Time: "",
    PracticalMarks: "",
    TotalMarks: "",
    Status: "",
  });
  const [errors, setErrors] = useState({});
  const [examData, setExamData] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExamDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Clear error when user starts typing
    }));
  };

  const validate = () => {
    let tempErrors = {};
    if (!examDetails.ExamName) tempErrors.ExamName = "Exam Name is required.";
    // if (!examDetails.Time) tempErrors.Time = "Total Time is required.";
    if (!examDetails.TheoryMaxMarks)
      tempErrors.TheoryMaxMarks = "Total Marks (Theory) is required.";
    if (!examDetails.TheorypassingMarks)
      tempErrors.TheorypassingMarks = "Minimum Marks (Theory) is required.";
    // if (!examDetails.PracticalMarks)
    //   tempErrors.PracticalMarks = "Practical Marks are required.";
    if (!examDetails.Status) tempErrors.Status = "Status is required.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await axios.post(
        `${baseURL}/exam/add`,
        examDetails
      );
      console.log(response.data);
      localStorage.setItem("examId", response.data.ExamId); // Save ExamId to localStorage
      alert("Form submitted successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error adding exam:", error.response.data.message);
      alert("Error submitting the form");
    }
  };

  useEffect(() => {
    axios
      .get(`${baseURL}/exam/all`)
      .then((response) => {
        setExamData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const Publish = (state) => {
    var dataToSend = { ...state, Status: "Published" };
    axios
      .put(`${baseURL}/exam/update/${state.ExamId}`, dataToSend)
      .then((response) => {
        console.log(response.data);
        setExamData((prevData) =>
          prevData.map((item) =>
            item.ExamId === state.ExamId
              ? { ...item, Status: "Published" }
              : item
          )
        );
      })
      .catch((err) => {
        console.error("Error updating Status", err);
      });
  };

  const handleDelete = async (examId) => {
    try {
      await axios.delete(`${baseURL}/exam/delete/${examId}`);
      setExamData((prevData) =>
        prevData.filter((exam) => exam.ExamId !== examId)
      );
      alert("Exam deleted successfully!");
    } catch (error) {
      console.error("Error deleting exam:", error);
      alert("Error deleting the exam");
    }
  };
  return (
    <>
      <MainDashboard>
        <FormContainer>
          <Title>Add Exam</Title>
          <Form onSubmit={handleSubmit}>
            <Section>
              <Heading>Details</Heading>
              <Heading>Add +</Heading>
            </Section>
            <Main>
              <InputContainer>
                <Label>Exam Name</Label>
                <Input
                  type="text"
                  name="ExamName"
                  placeholder="Enter Exam Name"
                  value={examDetails.ExamName}
                  onChange={handleChange}
                />
                {errors.ExamName && (
                  <div style={{ color: "red", marginTop: "5px" }}>
                    {errors.ExamName}
                  </div>
                )}
              </InputContainer>

              {/* <InputContainer>
                <Label>Total Time (Theory)</Label>
                <Input
                  type="text"
                  name="Time"
                  value={examDetails.Time}
                  onChange={handleChange}
                />
                {errors.Time && (
                  <div style={{ color: "red", marginTop: "5px" }}>
                    {errors.Time}
                  </div>
                )}
              </InputContainer> */}

              <InputContainer>
                <Label>Maximum Marks</Label>
                <Input
                  type="number"
                  name="TheoryMaxMarks"
                  placeholder="Enter Total Marks"
                  value={examDetails.TheoryMaxMarks}
                  onChange={handleChange}
                />
                {errors.TheoryMaxMarks && (
                  <div style={{ color: "red", marginTop: "5px" }}>
                    {errors.TheoryMaxMarks}
                  </div>
                )}
              </InputContainer>

              <InputContainer>
                <Label>Minimum Marks</Label>
                <Input
                  type="number"
                  name="TheorypassingMarks"
                  placeholder="Enter Minimum Marks"
                  value={examDetails.TheorypassingMarks}
                  onChange={handleChange}
                />
                {errors.TheorypassingMarks && (
                  <div style={{ color: "red", marginTop: "5px" }}>
                    {errors.TheorypassingMarks}
                  </div>
                )}
              </InputContainer>

              <InputContainer>
                <Label>Status</Label>
                <Select
                  name="Status"
                  value={examDetails.Status}
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

              {/* <InputContainer>
                <Label>Marks (Practical)</Label>
                <Input
                  type="number"
                  name="PracticalMarks"
                  placeholder="Enter Marks"
                  value={examDetails.PracticalMarks}
                  onChange={handleChange}
                />
                {errors.PracticalMarks && (
                  <div style={{ color: "red", marginTop: "5px" }}>
                    {errors.PracticalMarks}
                  </div>
                )}
              </InputContainer> */}
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

          <Table>
            <thead>
              <tr>
                <Th>Exam Id</Th>
                <Th>Exam Name</Th>
                {/* <Th>Total Time</Th> */}
                <Th>Total Marks</Th>
                <Th>Minimum</Th>
                <Th>Status</Th>
                <Th>Action</Th>
                <Th>Blue Print</Th>
              </tr>
            </thead>
            <tbody>
              {examData.map((exam) => (
                <tr key={exam.ExamId}>
                  <Td>{exam.ExamId}</Td>
                  <Td>{exam.ExamName}</Td>
                  {/* <Td>{exam.Time}</Td> */}
                  <Td>{exam.TotalMarks}</Td>
                  <Td>{exam.TheorypassingMarks}</Td>
                  <Td>
                    <Status>{exam.Status}</Status>
                  </Td>
                  <Td1>
                    {exam.Status === "Draft" && (
                      <Button onClick={() => Publish(exam)}>Publish</Button>
                    )}
                    <DeleteButton onClick={() => handleDelete(exam.ExamId)}>
                      <Trash2 />
                    </DeleteButton>
                  </Td1>
                  <Td>
                    <Button
                      onClick={() => {
                        // localStorage.setItem("examId", exam.ExamId); // Save ExamId to localStorage
                        const role = localStorage.getItem("Role");
                        if (role == "Superadmin" || role == "Admin") {
                          navigate(`/admin/createblueprint/${exam.ExamId}`, {
                            state: { id: exam.ExamId },
                          });
                        } else {
                          navigate(`/employee/createblueprint/${exam.ExamId}`, {
                            state: { id: exam.ExamId },
                          });
                        }
                      }}
                    >
                      Create
                    </Button>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </FormContainer>
      </MainDashboard>
    </>
  );
};

export default AddExam;
