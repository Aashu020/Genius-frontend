import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  width: 93%;
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
  width: 70%;
  border-collapse: collapse;
  margin-top: 30px;
`;

const Th = styled.th`
  background-color: #f2f2f2;
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
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
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DeleteButton = styled.div`
  background-color: red;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Modal styles
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const ModalButton = styled.button`
  margin: 5px;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const YesButton = styled.button`
  margin: 5px;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: green;
  color: white;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;
const ErrorText = styled.p`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;
const NoButton = styled.button`
  margin: 5px;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: red;
  color: white;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

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
      const response = await axios.get("https://api.edspride.in/department/all");
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

    // Validation
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
        // Update existing department
        const response = await axios.put(
          `https://api.edspride.in/department/update/${editId}`,
          {
            DepartmentName: departmentName,
            Description: description,
          }
        );

        setDepartments(
          departments.map((dep) => (dep._id === editId ? response.data : dep))
        );
        toast.success("Department updated successfully!");
        setEditId(null);
      } else {
        // Create new department
        const response = await axios.post(
          "https://api.edspride.in/department/add",
          {
            DepartmentName: departmentName,
            Description: description,
          }
        );

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
      await axios.delete(`https://api.edspride.in/department/delete/${deleteId}`);
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
    <>
      <MainDashboard>
        <FormContainer>
          <Title>{editId ? "Edit Department" : "Add Department"}</Title>
          <Form onSubmit={handleSubmit}>
            <Section>
              <Heading>Details</Heading>
            </Section>
            <Main>
              <InputContainer>
                <Label>Select Department</Label>
                <Input
                  type="text"
                  value={departmentName}
                  onChange={(e) => {
                    setDepartmentName(e.target.value);
                    if (e.target.value.trim()) {
                      setErrors((prev) => ({ ...prev, departmentName: "" }));
                    }
                  }}
                  placeholder="Enter Department"
                />
                {errors.departmentName && (
                  <ErrorText>{errors.departmentName}</ErrorText>
                )}
              </InputContainer>

              <InputContainer>
                <Label>Description</Label>
                <Input
                  type="text"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    if (e.target.value.trim()) {
                      setErrors((prev) => ({ ...prev, description: "" }));
                    }
                  }}
                  placeholder="Enter Description"
                />
                {errors.description && (
                  <ErrorText>{errors.description}</ErrorText>
                )}
              </InputContainer>
            </Main>
            <div
              style={{ display: "flex", gap: "10px", justifyContent: "center" }}
            >
              <SubmitButton type="submit">
                {editId ? "Update" : "Save"}
              </SubmitButton>
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
                        <DeleteButton
                          onClick={() => handleDelete(department._id)}
                        >
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
    </>
  );
};

export default AddDepartment;
