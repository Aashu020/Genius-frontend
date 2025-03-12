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
  AddHouseMain,
  InputContainer,
  Label,
  Input,
  AddHouseInput1,
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

const AddHouse = () => {
  const [houseName, setHouseName] = useState("");
  const [color, setColor] = useState("");
  const [houses, setHouses] = useState([]);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [errors, setErrors] = useState({ houseName: "", color: "" });

  const fetchHouses = async () => {
    try {
      const response = await axios.get("https://api.edspride.in/house/all");
      setHouses(response.data);
    } catch (error) {
      console.error("Error fetching houses:", error);
      toast.error("Failed to fetch houses.");
    }
  };

  useEffect(() => {
    fetchHouses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;
    const newErrors = { houseName: "", color: "" };
    if (!houseName.trim()) {
      newErrors.houseName = "House name is required.";
      isValid = false;
    }
    if (!color.trim()) {
      newErrors.color = "Color is required.";
      isValid = false;
    }
    setErrors(newErrors);

    if (!isValid) return;

    try {
      if (editId) {
        const response = await axios.put(`https://api.edspride.in/house/update/${editId}`, {
          HouseName: houseName,
          Color: color,
        });
        setHouses(houses.map((dep) => (dep._id === editId ? response.data : dep)));
        toast.success("House updated successfully!");
        setEditId(null);
      } else {
        const response = await axios.post("https://api.edspride.in/house/add", {
          HouseName: houseName,
          Color: color,
        });
        setHouses([...houses, response.data]);
        toast.success("House added successfully!");
      }
      setHouseName("");
      setColor("");
      setErrors({ houseName: "", color: "" });
    } catch (error) {
      console.error("Error saving house:", error);
      toast.error("Error saving house.");
    }
  };

  const handleEdit = (house) => {
    setHouseName(house.HouseName);
    setColor(house.Color);
    setEditId(house._id);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`https://api.edspride.in/house/delete/${deleteId}`);
      setHouses(houses.filter((dep) => dep._id !== deleteId));
      toast.success("House deleted successfully!");
      setShowModal(false);
      setDeleteId(null);
    } catch (error) {
      console.error("Error deleting house:", error);
      toast.error("Error deleting house.");
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
        <Title>{editId ? "Edit House" : "Add House"}</Title>
        <Form onSubmit={handleSubmit}>
          <Section>
            <AcademicPlanHeading>Details</AcademicPlanHeading>
          </Section>
          <AddHouseMain>
            <InputContainer>
              <Label>Select House</Label>
              <Input
                type="text"
                value={houseName}
                onChange={(e) => {
                  setHouseName(e.target.value);
                  if (e.target.value.trim()) setErrors((prev) => ({ ...prev, houseName: "" }));
                }}
                placeholder="Enter House"
              />
              {errors.houseName && <ErrorText>{errors.houseName}</ErrorText>}
            </InputContainer>

            <InputContainer>
              <Label>Color</Label>
              <AddHouseInput1
                style={{ display: "flex" }}
                type="color"
                value={color}
                onChange={(e) => {
                  setColor(e.target.value);
                  if (e.target.value.trim()) setErrors((prev) => ({ ...prev, color: "" }));
                }}
                placeholder="Enter Color"
              />
              {errors.color && <ErrorText>{errors.color}</ErrorText>}
            </InputContainer>
          </AddHouseMain>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
            <SubmitButton type="submit">{editId ? "Update" : "Save"}</SubmitButton>
          </div>
        </Form>
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <Th>House</Th>
                <Th>Color</Th>
                <Th>Action</Th>
              </tr>
            </thead>
            <tbody>
              {houses.map((house) => (
                <tr key={house._id}>
                  <Td>{house.HouseName}</Td>
                  <Td>
                    <div
                      style={{
                        width: "60px",
                        height: "30px",
                        backgroundColor: house.Color,
                        borderRadius: "5px",
                      }}
                    />
                  </Td>
                  <Td1>
                    <EditButton onClick={() => handleEdit(house)}>
                      Edit
                      <Edit size={18} />
                    </EditButton>
                    <DeleteButton onClick={() => handleDelete(house._id)}>
                      <Trash2 size={18} />
                    </DeleteButton>
                  </Td1>
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
            <h3>Are you sure you want to delete this house?</h3>
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

export default AddHouse;