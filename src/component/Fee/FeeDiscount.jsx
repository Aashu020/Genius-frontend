import React, { useState, useEffect } from "react";
import axios from "axios";
// import styled from "styled-components";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { Edit, Trash2 } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { 
  ErrorMessage, Heading, MainDashboard, Title, Form, Main, FormContainer, InputContainer, Label, Input, Select, Container, 
  Section, TableContainer, Table, Th, Td, Td1, EditButton, DeleteButton, ConfirmationModal, ConfirmButton, ModalContent ,SubmitButton
} from "./FeeStyles";

const FeeDiscount = () => {
  const [title, setTitle] = useState("");
  const [percentage, setPercentage] = useState("");
  const [errors, setErrors] = useState({});
  const [fineList, setFineList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (!title) {
      validationErrors.title = "Please enter a fee discount option.";
    }
    if (!percentage) {
      validationErrors.percentage = "Discount cannot be empty.";
    } else if (isNaN(percentage)) {
      validationErrors.percentage = "Discount must be a number.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const payload = { Title: title, Percentage: percentage };

    try {
      if (isEditing) {
        await axios.put(`http://localhost:8007/discount/update/${fineList[editIndex]._id}`, payload);
        toast.success("Discount updated successfully!");
      } else {
        await axios.post("http://localhost:8007/discount/add", payload);
        toast.success("Discount added successfully!");
      }

      fetchDiscounts();
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("There was an error. Please try again.");
    }
  };

  const fetchDiscounts = async () => {
    try {
      const response = await axios.get("http://localhost:8007/discount/all");
      setFineList(response.data);
    } catch (error) {
      console.error("Error fetching discounts:", error);
    }
  };

  const handleEdit = (index) => {
    setTitle(fineList[index].Title);
    setPercentage(fineList[index].Percentage);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8007/discount/delete/${fineList[deleteIndex]._id}`);
      toast.success("Discount deleted successfully!");
      fetchDiscounts();
      setShowModal(false);
    } catch (error) {
      console.error("Error deleting discount:", error);
      toast.error("There was an error deleting the discount. Please try again.");
    }
  };

  const resetForm = () => {
    setTitle("");
    setPercentage("");
    setErrors({});
    setIsEditing(false);
    setEditIndex(null);
  };

  useEffect(() => {
    fetchDiscounts();
  }, []);

  return (
    <>

      <MainDashboard>
        <FormContainer>
          <Title>Fee Discount</Title>
          <Form onSubmit={handleSubmit}>
            <Section>
              <Heading>Details</Heading>
              <Heading>{isEditing ? "Edit" : "Add"} +</Heading>
            </Section>
            <Main>
              <InputContainer>
                <Label>Fee Discount for</Label>
                <Input
                  type="text"
                  name="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                {errors.title && <ErrorMessage>{errors.title}</ErrorMessage>}
              </InputContainer>
              <InputContainer>
                <Label>Discount</Label>
                <Input
                  type="number"
                  name="Percentage"
                  value={percentage}
                  onChange={(e) => setPercentage(e.target.value)}
                />
                {errors.percentage && <ErrorMessage>{errors.percentage}</ErrorMessage>}
              </InputContainer>
            </Main>
            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
              <SubmitButton type="submit">Submit</SubmitButton>
            </div>
          </Form>
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <Th>Discount For</Th>
                  <Th>Discount</Th>
                  <Th>Action</Th>
                </tr>
              </thead>
              <tbody>
                {fineList.map((fine, index) => (
                  <tr key={fine.id}>
                    <Td>{fine.Title}</Td>
                    <Td>{fine.Percentage}</Td>
                    <Td1>
                      <EditButton onClick={() => handleEdit(index)}>
                        <p>Edit</p>
                        <Edit size={18} />
                      </EditButton>
                      <DeleteButton onClick={() => {
                        setDeleteIndex(index);
                        setShowModal(true);
                      }}>
                        <Trash2 size={18} />
                      </DeleteButton>
                    </Td1>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableContainer>
        </FormContainer>

        {/* Modal for Delete Confirmation */}
        {showModal && (
          <ConfirmationModal>
            <ModalContent>
              <h3>Are you sure you want to delete this fine?</h3>
              <ConfirmButton className="yes" onClick={handleDelete}>Yes</ConfirmButton>
              <ConfirmButton className="no" onClick={() => setShowModal(false)}>No</ConfirmButton>
            </ModalContent>
          </ConfirmationModal>
        )}

        <ToastContainer position="top-right" autoClose={3000} />
      </MainDashboard>

    </>
  );
};

export default FeeDiscount;
