import React, { useState, useEffect } from "react";
import axios from "axios";
// import styled from "styled-components";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { Edit, Trash2 } from "lucide-react";
import {Heading,Th,Td,Input,SubmitButton,Label,InputContainer,FormContainer,Section,Container,MainDashboard,Title,Form } from "../StudentAdmission/StudentAdmission";
import { Main,Table,DeleteButton,ErrorMessage,EditButton,TableContainer,Td1} from "./SubjectStyle";

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
          "http://localhost:8007/add-subject/all"
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
        "http://localhost:8007/add-subject/add",
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
        `http://localhost:8007/add-subject/update/${editingSubject._id}`,
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
        `http://localhost:8007/add-subject/delete/${id}`
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
