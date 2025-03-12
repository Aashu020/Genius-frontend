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
  AddDepartmentMain,
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

const AddDepartment = () => {
  const [departmentName, setDepartmentName] = useState("");
  const [description, setDescription] = useState("");
  const [departments, setDepartments] = useState([]);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [errors, setErrors] = useState({ departmentName: "", description: "" });

  const fetchDepartments = async () => {
    try {
      const response = await axios.get("http://localhost:8007/department/all");
      setDepartments(response.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
      toast.error("Failed to fetch departments.");
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;
    const newErrors = { departmentName: "", description: "" };
    if (!departmentName.trim()) {
      newErrors.departmentName = "Department name is required.";
      isValid = false;
    }
    if (!description.trim()) {
      newErrors.description = "Description is required.";
      isValid = false;
    }
    setErrors(newErrors);

    if (!isValid) return;

    try {
      if (editId) {
        const response = await axios.put(`https://api.edspride.in/department/update/${editId}`, {
          DepartmentName: departmentName,
          Description: description,
        });
        setDepartments(departments.map((dep) => (dep._id === editId ? response.data : dep)));
        toast.success("Department updated successfully!");
        setEditId(null);
      } else {
        const response = await axios.post("https://api.edspride.in/department/add", {
          DepartmentName: departmentName,
          Description: description,
        });
        setDepartments([...departments, response.data]);
        toast.success("Department added successfully!");
      }
      setDepartmentName("");
      setDescription("");
      setErrors({ departmentName: "", description: "" });
    } catch (error) {
      console.error("Error saving department:", error);
      toast.error("Error saving department.");
    }
  };

  const handleEdit = (department) => {
    setDepartmentName(department.DepartmentName);
    setDescription(department.Description);
    setEditId(department._id);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8007/department/delete/${deleteId}`);
      setDepartments(departments.filter((dep) => dep._id !== deleteId));
      toast.success("Department deleted successfully!");
      setShowModal(false);
      setDeleteId(null);
    } catch (error) {
      console.error("Error deleting department:", error);
      toast.error("Error deleting department.");
      setShowModal(false);
    }
  };

  const cancelDelete = () => {
    setShowModal(false);
    setDeleteId(null);
  };

  return (
    <MainDashboard>
      <FormContainer>
        <Title>{editId ? "Edit Department" : "Add Department"}</Title>
        <Form onSubmit={handleSubmit}>
          <Section>
            <AcademicPlanHeading>Details</AcademicPlanHeading>
          </Section>
          <AddDepartmentMain>
            <InputContainer>
              <Label>Select Department</Label>
              <Input
                type="text"
                value={departmentName}
                onChange={(e) => {
                  setDepartmentName(e.target.value);
                  if (e.target.value.trim()) setErrors((prev) => ({ ...prev, departmentName: "" }));
                }}
                placeholder="Enter Department"
              />
              {errors.departmentName && <ErrorText>{errors.departmentName}</ErrorText>}
            </InputContainer>

            <InputContainer>
              <Label>Description</Label>
              <Input
                type="text"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  if (e.target.value.trim()) setErrors((prev) => ({ ...prev, description: "" }));
                }}
                placeholder="Enter Description"
              />
              {errors.description && <ErrorText>{errors.description}</ErrorText>}
            </InputContainer>
          </AddDepartmentMain>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
            <SubmitButton type="submit">{editId ? "Update" : "Save"}</SubmitButton>
          </div>
        </Form>
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <Th>Department</Th>
                <Th>Description</Th>
                <Th>Action</Th>
              </tr>
            </thead>
            <tbody>
              {departments.map((department) => (
                <tr key={department._id}>
                  <Td>{department.DepartmentName}</Td>
                  <Td>{department.Description}</Td>
                  <Td>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <EditButton onClick={() => handleEdit(department)}>
                        Edit
                        <Edit size={18} />
                      </EditButton>
                      <DeleteButton onClick={() => handleDelete(department._id)}>
                        <Trash2 size={18} />
                      </DeleteButton>
                    </div>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      </FormContainer>
      <ToastContainer />
      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <h3>Are you sure you want to delete this department?</h3>
            <div>
              <YesButton onClick={confirmDelete}>Yes</YesButton>
              <NoButton onClick={cancelDelete}>No</NoButton>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}
    </MainDashboard>
  );
};

export default AddDepartment;