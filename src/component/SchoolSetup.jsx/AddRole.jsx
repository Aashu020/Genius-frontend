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
  AddRoleMain,
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
    setErrors({});
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
    <MainDashboard>
      <FormContainer>
        <Title>Add Role</Title>
        <Form onSubmit={handleSubmit}>
          <Section>
            <AcademicPlanHeading>Details</AcademicPlanHeading>
          </Section>
          <AddRoleMain>
            <InputContainer>
              <Label>Role</Label>
              <Input
                type="text"
                name="roleName"
                value={roleName}
                onChange={handleChange(setRoleName)}
                placeholder="Enter Role Name"
              />
              {errors.roleName && <ErrorText>{errors.roleName}</ErrorText>}
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
              {errors.description && <ErrorText>{errors.description}</ErrorText>}
            </InputContainer>
          </AddRoleMain>
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
              {roles.map((role) => (
                <tr key={role._id}>
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
      <ToastContainer />
    </MainDashboard>
  );
};

export default AddRole;