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
const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 5px;
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

const AddClass = () => {
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState([]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [className, setClassName] = useState("");
  const [editingClassId, setEditingClassId] = useState(null);
  const [errors, setErrors] = useState({ className: "", subject: "" });


  // Fetch subjects
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

  const validate = () => {
    const newErrors = { className: "", subject: "" };
    if (!className.trim()) newErrors.className = "Class Name is required.";
    if (selectedSubject.length === 0) newErrors.subject = "Select at least one subject.";
    setErrors(newErrors);
    return !newErrors.className && !newErrors.subject;
  };

  // Fetch classes
  const fetchClasses = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8007/class/all"
      );
      setClasses(response.data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleSubjectChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedSubject((prev) => [...prev, value]);
    } else {
      setSelectedSubject((prev) => prev.filter((subject) => subject !== value));
    }
    setErrors((prev) => ({ ...prev, subject: "" }));
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const clearSelections = () => {
    setSelectedSubject([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const classData = {
      Class: className,
      Subjects: selectedSubject.map((subject) => ({ Subject: subject })),
    };

    try {
      if (editingClassId) {
        await axios.put(
          `http://localhost:8007/class/update/${editingClassId}`,
          classData
        );
      } else {
        await axios.post(
          "http://localhost:8007/class/add",
          classData
        );
      }
      resetForm();
      fetchClasses();
    } catch (error) {
      console.error("Error saving class:", error);
    }
  };
  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setErrors((prev) => ({ ...prev, className: "" }));
  };
  const handleEdit = (cls) => {
    setEditingClassId(cls.ClassId);
    setClassName(cls.Class);
    setSelectedSubject(cls.Subjects.map((subject) => subject.Subject));
    setDropdownOpen(true);
  };

  const handleDelete = async (classId) => {
    try {
      await axios.delete(
        `http://localhost:8007/class/delete/${classId}`
      );
      fetchClasses();
    } catch (error) {
      console.error("Error deleting class:", error);
    }
  };

  const resetForm = () => {
    setClassName("");
    setSelectedSubject([]);
    setEditingClassId(null);
    setDropdownOpen(false);
  };

  return (
    <>

      <MainDashboard>
        <FormContainer>
          <Title>{editingClassId ? "Edit Class" : "Add Class"}</Title>
          <Form onSubmit={handleSubmit}>
            <Section>
              <Heading>Details</Heading>
              <Heading>{editingClassId ? "Update +" : "Add +"}</Heading>
            </Section>
            <Main>
              <InputContainer>
                <Label>Class Name</Label>
                <Input
                  type="text"
                  value={className}
                  onChange={handleInputChange(setClassName)}

                />
                {errors.className && (
                  <ErrorMessage>{errors.className}</ErrorMessage>
                )}
              </InputContainer>

              <InputContainer>
                <Label>Subject</Label>
                <SelectContainer onClick={toggleDropdown}>
                  <Dropdown>
                    {selectedSubject.length > 0
                      ? selectedSubject.join(", ")
                      : "Select Subject"}
                  </Dropdown>
                  {isDropdownOpen && (
                    <CheckboxContainer>
                      {subjects.map((subject) => (
                        <Checkbox key={subject._id}>
                          <input
                            type="checkbox"
                            value={subject.Subject}
                            checked={selectedSubject.includes(
                              subject.Subject
                            )}
                            onChange={handleSubjectChange}
                          />
                          {subject.Subject}
                        </Checkbox>
                      ))}
                      <ClearButton type="button" onClick={clearSelections}>
                        Clear
                      </ClearButton>
                    </CheckboxContainer>
                  )}
                  {errors.subject && (
                    <ErrorMessage>{errors.subject}</ErrorMessage>
                  )}
                </SelectContainer>
              </InputContainer>
            </Main>
            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "center",
              }}
            >
              <SubmitButton type="button" onClick={resetForm}>
                Cancel
              </SubmitButton>
              <SubmitButton type="submit">
                {editingClassId ? "Update" : "Save"}
              </SubmitButton>
            </div>
          </Form>
        </FormContainer>
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <Th>Class ID</Th>
                <Th>Class Name</Th>
                <Th>Subjects</Th>
                <Th>Action</Th>
              </tr>
            </thead>
            <tbody>
              {classes.map((cls) => (
                <tr key={cls.ClassId}>
                  <Td>{cls.ClassId}</Td>
                  <Td>{cls.Class}</Td>
                  <Td>
                    {cls.Subjects.map((subject) => subject.Subject).join(
                      ", "
                    )}
                  </Td>
                  <Td1>
                    <EditButton onClick={() => handleEdit(cls)}>
                      Edit
                      <Edit size={18} />
                    </EditButton>
                    <DeleteButton onClick={() => handleDelete(cls.ClassId)}>
                      <Trash2 size={18} />
                    </DeleteButton>
                  </Td1>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      </MainDashboard>

    </>
  );
};

export default AddClass;
