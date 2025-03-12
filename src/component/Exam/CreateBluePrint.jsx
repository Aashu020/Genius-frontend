import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useLocation } from "react-router-dom";
import ExamPage from "./ExamPage";  // Import ExamPage
import { toast, ToastContainer } from "react-toastify";  // Import toast from react-toastify
import "react-toastify/dist/ReactToastify.css";

import {
  MainDashboard,
  Title,
  Form,
  Section,
  Main,
  InputContainer,
  Label,
  Input,
  Select,
  SubmitButton,
} from "./ExamStyles";


const CreateBluePrint = () => {
  const location = useLocation();
  const [examName, setExamName] = useState("");
  const [sections, setSections] = useState([
    { section: "", numQuestions: "", eachQuestionMark: "" },
  ]);
  const [totalMarksFromAPI, setTotalMarksFromAPI] = useState(0);
  const [loading, setLoading] = useState(true);
  const [totalMarks, setTotalMarks] = useState(0);

  const examId = location.state?.id; // Access examId from location state

  // Fetch existing blueprint data if examId exists
  useEffect(() => {
    if (examId) {
      const fetchBlueprint = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8007/exam/get/${examId}`
          );
          setExamName(response.data.ExamName);
          setTotalMarksFromAPI(response.data.TotalMarks);
          const blueprintData = response.data.BluePrint;
          setSections(
            blueprintData.map((section) => ({
              section: section.Section,
              numQuestions: section.QuestionNo.toString(),
              eachQuestionMark: section.Marks.toString(),
            }))
          );
        } catch (error) {
          console.error("Error fetching blueprint data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchBlueprint();
    } else {
      setLoading(false);
    }
  }, [examId]);

  const addSection = () => {
    setSections([
      ...sections,
      { section: "", numQuestions: "", eachQuestionMark: "" },
    ]);
  };

  const handleSectionChange = (index, field, value) => {
    const updatedSections = [...sections];
    updatedSections[index][field] = value;
    setSections(updatedSections);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // If the total marks exceed the allowed marks, prevent submission
    if (totalMarks > totalMarksFromAPI) {
      alert("The total marks in the blueprint cannot exceed the allowed total marks!");
      return;
    }

    const dataToSend = {
      BluePrint: sections.map((section) => ({
        Section: section.section,
        QuestionNo: Number(section.numQuestions),
        Marks: Number(section.eachQuestionMark),
        TotalMarks: Number(section.numQuestions) * Number(section.eachQuestionMark),
      })),
    };

    try {
      const response = await axios.put(
        `http://localhost:8007/exam/update/${examId}`,
        dataToSend
      );
      console.log("Exam blueprint updated successfully:", response.data);
      toast.success("Exam blueprint updated successfully!");
    } catch (error) {
      console.error("Error updating exam blueprint:", error);
      toast.error("Error updating exam blueprint.");
    }
  };

  // Calculate the total marks of the blueprint
  useEffect(() => {
    const total = sections.reduce(
      (acc, section) =>
        acc + (Number(section.numQuestions) * Number(section.eachQuestionMark)),
      0
    );
    setTotalMarks(total);
  }, [sections]);

  if (loading) return <div>Loading...</div>;

  // Check if the blueprint total exceeds the total marks from the API
  const isValid = totalMarks <= totalMarksFromAPI;

  return (
    <MainDashboard>
      <ToastContainer />
      <Form onSubmit={handleSubmit}>
        <Title>Create BluePrint ({examName})</Title>

        {sections.map((section, index) => (
          <Main key={index}>
            <InputContainer>
              <Label>Section</Label>
              <Select
                value={section.section}
                onChange={(e) =>
                  handleSectionChange(index, "section", e.target.value)
                }
              >
                <option value="">Select</option>
                <option value="Multiple choice Question(MCQ)">
                  Multiple choice Question(MCQ)
                </option>
                <option value="Multiple Select Question(MSQ)">
                  Multiple Select Question(MSQ)
                </option>
                <option value="Short Answer Question(SAQ)">
                  Short Answer Question(SAQ)
                </option>
                <option value="Long Answer Question(LAQ)">
                  Long Answer Question(LAQ)
                </option>
                <option value="True/False">True/False</option>
                <option value="Match the Following">Match the Following</option>
                <option value="Fill In The Blank">Fill In The Blank</option>
                <option value="Case-Based Question">Case-Based Question</option>
              </Select>
            </InputContainer>

            <InputContainer>
              <Label>No. of Questions</Label>
              <Input
                type="text"
                placeholder="Enter No. of Questions"
                value={section.numQuestions}
                onChange={(e) =>
                  handleSectionChange(index, "numQuestions", e.target.value)
                }
              />
            </InputContainer>

            <InputContainer>
              <Label>Each Question Mark</Label>
              <Input
                type="text"
                placeholder="Enter Each Question Mark"
                value={section.eachQuestionMark}
                onChange={(e) =>
                  handleSectionChange(index, "eachQuestionMark", e.target.value)
                }
              />
            </InputContainer>
          </Main>
        ))}

        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          <SubmitButton type="button" onClick={addSection}>
            Add Section +
          </SubmitButton>
        </div>

        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          <SubmitButton type="submit" disabled={!isValid}>
            Save
          </SubmitButton>
          {/* <SubmitButton type="submit" disabled={!isValid}>
            Publish
          </SubmitButton> */}
        </div>

        {/* Display the total marks */}
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <p>
            Maximum Marks: {totalMarksFromAPI}
          </p>
          <p>
            Total Marks in Blueprint: {totalMarks}
          </p>
          {!isValid && (
            <p style={{ color: "red" }}>
              The total marks in the blueprint cannot exceed the total marks allowed!
            </p>
          )}
        </div>
      </Form>

      {/* Pass the sections state to ExamPage to dynamically reflect changes */}
      <ExamPage sections={sections} />
    </MainDashboard>
  );
};

export default CreateBluePrint;
