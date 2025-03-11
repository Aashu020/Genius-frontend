import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Styled components
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

const Status = styled.button`
  background-color: #209a16bf;
  border: none;
  padding: 8px 20px;
  border-radius: 5px;
  color: white;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Td1 = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  background-color: #209a16bf;
  border: none;
  padding: 8px 10px;
  border-radius: 5px;
  color: white;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DeleteButton = styled.button`
  background-color: red;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

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
        "https://api.edspride.in/exam/add",
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
      .get("https://api.edspride.in/exam/all")
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
      .put(`https://api.edspride.in/exam/update/${state.ExamId}`, dataToSend)
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
      await axios.delete(`https://api.edspride.in/exam/delete/${examId}`);
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
