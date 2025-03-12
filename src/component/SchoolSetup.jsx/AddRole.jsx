import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import styled from "styled-components";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { Edit, Trash2 } from "lucide-react";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import the CSS

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
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const DeleteButton = styled.div`
  background-color: red;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
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

const AddRole = () => {
  const [roleName, setRoleName] = useState("");
  const [description, setDescription] = useState("");
  const [roles, setRoles] = useState([]);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [errors, setErrors] = useState({ roleName: "", description: "" });

  const fetchRoles = async () => {
    try {
      const response = await axios.get("http://localhost:8007/role/all");
      setRoles(response.data);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!roleName.trim()) newErrors.roleName = "Role name is required.";
    if (!description.trim()) newErrors.description = "Description is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      if (editId) {
        await axios.put(`http://localhost:8007/role/update/${editId}`, {
          RoleName: roleName,
          Description: description,
        });
        toast.success("Role updated successfully!");
        setEditId(null);
      } else {
        const response = await axios.post("http://localhost:8007/role/add", {
          RoleName: roleName,
          Description: description,
        });
        toast.success("Role added successfully!");
        setRoles([...roles, response.data]);
      }
      setRoleName("");
      setDescription("");
      fetchRoles();
    } catch (error) {
      toast.error("Error saving role.");
      console.error("Error saving role:", error);
    }
  };

  const handleEdit = (role) => {
    setRoleName(role.RoleName);
    setDescription(role.Description);
    setEditId(role._id);
    setErrors({}); // Clear errors on edit
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8007/role/delete/${deleteId}`);
      toast.success("Role deleted successfully!");
      fetchRoles();
    } catch (error) {
      toast.error("Error deleting role.");
      console.error("Error deleting role:", error);
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
    <>

      <MainDashboard>
        <FormContainer>
          <Title>Add Role</Title>
          <Form onSubmit={handleSubmit}>
            <Section>
              <Heading>Details</Heading>
            </Section>
            <Main>
              <InputContainer>
                <Label>Role</Label>
                <Input
                  type="text"
                  name="roleName"
                  value={roleName}
                  onChange={handleChange(setRoleName)}
                  placeholder="Enter Role Name"
                />
                {errors.roleName && <span style={{ color: "red" }}>{errors.roleName}</span>}
              </InputContainer>

              <InputContainer>
                <Label>Description</Label>
                <Input
                  type="text"
                  name="description"
                  value={description}
                  onChange={handleChange(setDescription)}
                  placeholder="Enter Description"
                />
                {errors.description && <span style={{ color: "red" }}>{errors.description}</span>}
              </InputContainer>
            </Main>
            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
              <SubmitButton type="submit">{editId ? "Update" : "Save"}</SubmitButton>
            </div>
          </Form>
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <Th>Role</Th>
                  <Th>Description</Th>
                  <Th>Action</Th>
                </tr>
              </thead>
              <tbody>
                {roles.map((role, index) => (
                  <tr key={index}>
                    <Td>{role.RoleName}</Td>
                    <Td>{role.Description}</Td>
                    <Td1>
                      <EditButton onClick={() => handleEdit(role)}>
                        Edit
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <Edit size={18} />
                        </div>
                      </EditButton>
                      <DeleteButton onClick={() => handleDelete(role._id)}>
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
              <h3>Are you sure you want to delete this role?</h3>
              <div>
                <YesButton onClick={confirmDelete}>Yes</YesButton>
                <NoButton onClick={cancelDelete}>No</NoButton>
              </div>
            </ModalContent>
          </ModalOverlay>
        )}
      </MainDashboard>

      <ToastContainer />
    </>
  );
};

export default AddRole;
