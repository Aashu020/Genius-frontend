import React, { useState, useEffect } from "react";
import axios from "axios";
import { Edit, Trash2 } from "lucide-react";
import  baseURL from '../utils/Url'; 
import {
  MainDashboard,
  Title,
  FormContainer,
  Form,
  Section,
  AcademicPlanHeading,
  AddClassMain,
  InputContainer,
  Label,
  AddClassInput,
  SelectContainer,
  Dropdown,
  CheckboxContainer,
  Checkbox,
  ClearButton,
  SubmitButton,
  TableContainer,
  Table,
  Th,
  Td,
  Td1,
  AddClassEditButton,
  AddClassDeleteButton,
  ErrorText,
} from "./SchoolSetupStyle";

const AddClass = () => {
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState([]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [className, setClassName] = useState("");
  const [editingClassId, setEditingClassId] = useState(null);
  const [errors, setErrors] = useState({ className: "", subject: "" });

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(`${baseURL}/add-subject/all`);
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

  const fetchClasses = async () => {
    try {
      const response = await axios.get(`${baseURL}/class/all`);
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
  console.log(classData)


    try {
      if (editingClassId) {
        await axios.put(`${baseURL}/class/update/${editingClassId}`, classData);
      } else {
        await axios.post(`${baseURL}/class/add`, classData);
      }
      resetForm();
      fetchClasses();
    } catch (error) {
      console.log("Error saving class:", error);
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
      await axios.delete(`${baseURL}/class/delete/${classId}`);
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
    <MainDashboard>
      <FormContainer>
        <Title>{editingClassId ? "Edit Class" : "Add Class"}</Title>
        <Form onSubmit={handleSubmit}>
          <Section>
            <AcademicPlanHeading>Details</AcademicPlanHeading>
            <AcademicPlanHeading>{editingClassId ? "Update +" : "Add +"}</AcademicPlanHeading>
          </Section>
          <AddClassMain>
            <InputContainer>
              <Label>Class Name</Label>
              <AddClassInput
                type="text"
                value={className}
                onChange={handleInputChange(setClassName)}
              />
              {errors.className && <ErrorText>{errors.className}</ErrorText>}
            </InputContainer>

            <InputContainer>
              <Label>Subject</Label>
              <SelectContainer onClick={toggleDropdown}>
                <Dropdown>
                  {selectedSubject.length > 0 ? selectedSubject.join(", ") : "Select Subject"}
                </Dropdown>
                {isDropdownOpen && (
                  <CheckboxContainer>
                    {subjects.map((subject) => (
                      <Checkbox key={subject._id}>
                        <input
                          type="checkbox"
                          value={subject.Subject}
                          checked={selectedSubject.includes(subject.Subject)}
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
                {errors.subject && <ErrorText>{errors.subject}</ErrorText>}
              </SelectContainer>
            </InputContainer>
          </AddClassMain>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
            <SubmitButton type="button" onClick={resetForm}>Cancel</SubmitButton>
            <SubmitButton type="submit">{editingClassId ? "Update" : "Save"}</SubmitButton>
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
                <Td>{cls.Subjects.map((subject) => subject.Subject).join(", ")}</Td>
                <Td1>
                  <AddClassEditButton onClick={() => handleEdit(cls)}>
                    Edit
                    <Edit size={18} />
                  </AddClassEditButton>
                  <AddClassDeleteButton onClick={() => handleDelete(cls.ClassId)}>
                    <Trash2 size={18} />
                  </AddClassDeleteButton>
                </Td1>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </MainDashboard>
  );
};

export default AddClass;