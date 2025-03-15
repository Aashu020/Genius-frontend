import React, { useState, useEffect } from "react";
import axios from "axios";
// import styled from "styled-components";
import { Edit, Trash2 } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { Container, MainDashboard, Title, Form, Heading, Section, Main, FormContainer, InputContainer, Label, Input, SubmitButton, TableContainer, Table, Th, Td, Td1, EditButton, DeleteButton, ErrorMessage, ConfirmationModal, ModalContent, ConfirmButton } from "./FeeStyles";
import  baseURL from '../utils/Url'; 
const FineSetUp = () => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [errors, setErrors] = useState({});
  const [fines, setFines] = useState([]);
  const [editingFine, setEditingFine] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [fineToDelete, setFineToDelete] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Fine name is required.";
    if (!amount || amount <= 0) newErrors.amount = "A valid amount is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = { Name: name, Amount: amount };

    try {
      if (editingFine) {
        await axios.put(`${baseURL}/fine-setup/update/${editingFine._id}`, payload);
        toast.success("Fine updated successfully!");
      } else {
        await axios.post(`${baseURL}/fine-setup/add`, payload);
        toast.success("Fine added successfully!");
      }
      resetForm();
      fetchFines();
    } catch (error) {
      console.error("Error submitting the form:", error);
      toast.error("There was an error submitting the form. Please try again.");
    }
  };

  const fetchFines = async () => {
    try {
      const response = await axios.get(`${baseURL}/fine-setup/all`);
      setFines(response.data);
    } catch (error) {
      console.error("Error fetching fines:", error);
    }
  };

  const handleEdit = (fine) => {
    setName(fine.Name);
    setAmount(fine.Amount);
    setEditingFine(fine);
  };

  const confirmDelete = (fine) => {
    setFineToDelete(fine);
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${baseURL}/fine-setup/delete/${fineToDelete._id}`);
      toast.success("Fine deleted successfully!");
      setShowModal(false);
      fetchFines();
    } catch (error) {
      console.error("Error deleting fine:", error);
      toast.error("There was an error deleting the fine. Please try again.");
    }
  };

  const resetForm = () => {
    setName("");
    setAmount("");
    setEditingFine(null);
    setErrors({});
  };

  useEffect(() => {
    fetchFines();
  }, []);

  return (
    <>

      <MainDashboard>
        <FormContainer>
          <Title>Fine Setup</Title>
          <Form onSubmit={handleSubmit}>
            <Section>
              <Heading>Details</Heading>
              <Heading>{editingFine ? "Update" : "Add"}</Heading>
            </Section>
            <Main>
              <InputContainer>
                <Label>Fine Name</Label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
              </InputContainer>

              <InputContainer>
                <Label>Amount</Label>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                {errors.amount && <ErrorMessage>{errors.amount}</ErrorMessage>}
              </InputContainer>
            </Main>
            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
              <SubmitButton type="submit">{editingFine ? "Update" : "Submit"}</SubmitButton>
            </div>
          </Form>
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <Th>Fine Name</Th>
                  <Th>Amount</Th>
                  <Th>Action</Th>
                </tr>
              </thead>
              <tbody>
                {fines.map((fine) => (
                  <tr key={fine.id}>
                    <Td>{fine.Name}</Td>
                    <Td>{fine.Amount}</Td>
                    <Td1>
                      <EditButton onClick={() => handleEdit(fine)}>
                        <p>Edit</p>
                        <Edit size={18} />
                      </EditButton>
                      <DeleteButton onClick={() => confirmDelete(fine)}>
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
          <ConfirmationModal>
            <ModalContent>
              <h3>Are you sure you want to delete this fine?</h3>
              <ConfirmButton className="yes" onClick={handleDelete}>Yes</ConfirmButton>
              <ConfirmButton className="no" onClick={() => setShowModal(false)}>No</ConfirmButton>
            </ModalContent>
          </ConfirmationModal>
        )}
        <ToastContainer />
      </MainDashboard>

    </>
  );
};

export default FineSetUp;
