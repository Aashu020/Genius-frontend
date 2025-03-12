import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Edit, Trash2 } from "lucide-react";
import {
  MainDashboard,
  Title,
  FormContainer,
  Form,
  Section,
  AcademicPlanHeading,
  AddGradeMain,
  InputContainer,
  Label,
  Input,
  SubmitButton,
  TableContainer,
  Table,
  Th,
  Td,
  Td1,
  EditButton,
  DeleteButton,
  ModalOverlay,
  ModalContent,
  YesButton,
  NoButton,
  ErrorText,
} from "./SchoolSetupStyle";

const AddGrade = () => {
  const [title, setTitle] = useState("");
  const [salary, setSalary] = useState("");
  const [grades, setGrades] = useState([]);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [errors, setErrors] = useState({ title: "", salary: "" });

  const fetchGrades = async () => {
    try {
      const response = await axios.get("https://api.edspride.in/grade/all");
      setGrades(response.data);
    } catch (error) {
      console.error("Error fetching grades:", error);
    }
  };

  useEffect(() => {
    fetchGrades();
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required.";
    if (!salary.trim()) newErrors.salary = "Salary is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      if (editId) {
        await axios.put(`https://api.edspride.in/grade/update/${editId}`, {
          Title: title,
          Salary: salary,
        });
        toast.success("Grade updated successfully!");
        setEditId(null);
      } else {
        const response = await axios.post("https://api.edspride.in/grade/add", {
          Title: title,
          Salary: salary,
        });
        toast.success("Grade added successfully!");
        setGrades([...grades, response.data]);
      }
      setTitle("");
      setSalary("");
      fetchGrades();
    } catch (error) {
      toast.error("Error saving grade.");
      console.error("Error saving grade:", error);
    }
  };

  const handleEdit = (grade) => {
    setTitle(grade.Title);
    setSalary(grade.Salary);
    setEditId(grade._id);
    setErrors({});
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`https://api.edspride.in/grade/delete/${deleteId}`);
      toast.success("Grade deleted successfully!");
      fetchGrades();
    } catch (error) {
      toast.error("Error deleting grade.");
      console.error("Error deleting grade:", error);
    }
    setShowModal(false);
  };

  const cancelDelete = () => {
    setShowModal(false);
  };

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  return (
    <MainDashboard>
      <FormContainer>
        <Title>Add Grade</Title>
        <Form onSubmit={handleSubmit}>
          <Section>
            <AcademicPlanHeading>Details</AcademicPlanHeading>
          </Section>
          <AddGradeMain>
            <InputContainer>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={title}
                onChange={handleChange(setTitle)}
                placeholder="Enter Title"
              />
              {errors.title && <ErrorText>{errors.title}</ErrorText>}
            </InputContainer>

            <InputContainer>
              <Label>Salary</Label>
              <Input
                type="text"
                name="salary"
                value={salary}
                onChange={handleChange(setSalary)}
                placeholder="Enter Salary"
              />
              {errors.salary && <ErrorText>{errors.salary}</ErrorText>}
            </InputContainer>
          </AddGradeMain>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
            <SubmitButton type="submit">{editId ? "Update" : "Save"}</SubmitButton>
          </div>
        </Form>
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <Th>Title</Th>
                <Th>Salary</Th>
                <Th>Action</Th>
              </tr>
            </thead>
            <tbody>
              {grades.map((grade) => (
                <tr key={grade._id}>
                  <Td>{grade.Title}</Td>
                  <Td>{grade.Salary}</Td>
                  <Td1>
                    <EditButton onClick={() => handleEdit(grade)}>
                      Edit
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Edit size={18} />
                      </div>
                    </EditButton>
                    <DeleteButton onClick={() => handleDelete(grade._id)}>
                      <Trash2 size={18} />
                    </DeleteButton>
                  </Td1>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      </FormContainer>
      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <h3>Are you sure you want to delete this grade?</h3>
            <div>
              <YesButton onClick={confirmDelete}>Yes</YesButton>
              <NoButton onClick={cancelDelete}>No</NoButton>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}
      <ToastContainer />
    </MainDashboard>
  );
};

export default AddGrade;