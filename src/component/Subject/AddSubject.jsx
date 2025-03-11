import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { Edit, Trash2 } from "lucide-react";

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
`;

const Section = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Main = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
`;

const FormContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 20px;
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
`;

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Table = styled.table`
  width: 60%;
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

const EditButton = styled.div`
  background-color: #209a16bf;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  width: 20%;
  display: flex;
  justify-content: center;
  cursor: pointer;
`;
const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;

const DeleteButton = styled.div`
  background-color: red;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  width: 10%;
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

const AddSubject = () => {
  const [subject, setSubject] = useState(""); // State for the new subject
  const [subjects, setSubjects] = useState([]); // State for the list of subjects
  const [editingSubject, setEditingSubject] = useState(null); // State for editing subject
  const [errors, setErrors] = useState({ subject: "" });

  // Fetch existing subjects when component mounts
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(
          "https://api.edspride.in/add-subject/all"
        );
        setSubjects(response.data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchSubjects();
  }, []);
  // ------------------------------------------------------------------------
  const validate = () => {
    let isValid = true;
    const newErrors = { subject: "" };

    if (!subject.trim()) {
      newErrors.subject = "Subject is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const response = await axios.post(
        "https://api.edspride.in/add-subject/add",
        {
          Subject: subject,
        }
      );
      setSubjects([...subjects, response.data]);
      setSubject(""); // Clear input field
      setErrors({ subject: "" });
    } catch (error) {
      console.error("Error adding subject:", error);
    }
  };

  const handleEdit = async (sub) => {
    setEditingSubject(sub); // Set the subject to edit
    setSubject(sub.Subject); // Populate the input with the subject to edit
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const response = await axios.put(
        `https://api.edspride.in/add-subject/update/${editingSubject._id}`,
        {
          Subject: subject,
        }
      );
      setSubjects(
        subjects.map((sub) =>
          sub._id === editingSubject._id ? response.data : sub
        )
      );
      setSubject(""); // Clear input field
      setEditingSubject(null); // Reset editing state
      setErrors({ subject: "" });
    } catch (error) {
      console.error("Error updating subject:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://api.edspride.in/add-subject/delete/${id}`
      );
      setSubjects(subjects.filter((sub) => sub._id !== id)); // Remove deleted subject from state
    } catch (error) {
      console.error("Error deleting subject:", error);
    }
  };
  const handleInputChange = (e) => {
    setSubject(e.target.value);
    if (e.target.value.trim()) {
      setErrors({ ...errors, subject: "" });
    }
  };

  return (
    <>

      <MainDashboard>
        <FormContainer>
          <Title>{editingSubject ? "Edit Subject" : "Add New Subject"}</Title>
          <Form onSubmit={editingSubject ? handleUpdate : handleSubmit}>
            <Section>
              <Heading>Details</Heading>
              <Heading>{editingSubject ? "Update" : "Add +"}</Heading>
            </Section>
            <Main>
              <InputContainer>
                <Label>Subject</Label>
                <Input
                  type="text"
                  value={subject}
                  onChange={handleInputChange}
                />
                {errors.subject && <ErrorMessage>{errors.subject}</ErrorMessage>}
              </InputContainer>
            </Main>
            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "center",
              }}
            >
              <SubmitButton type="button" onClick={() => setSubject("")}>
                Cancel
              </SubmitButton>
              <SubmitButton type="submit">
                {editingSubject ? "Update" : "Save"}
              </SubmitButton>
            </div>
          </Form>

          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <Th>Subject Name</Th>
                  <Th>Action</Th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((sub) => (
                  <tr key={sub._id}>
                    <Td>{sub.Subject}</Td>
                    <Td1>
                      <EditButton onClick={() => handleEdit(sub)}>
                        Edit
                        <Edit size={18} />
                      </EditButton>
                      <DeleteButton onClick={() => handleDelete(sub._id)}>
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

export default AddSubject;
