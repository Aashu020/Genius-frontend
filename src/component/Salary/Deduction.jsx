import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import  baseURL from '../utils/Url'; 
import {
  Container, MainDashboard, Title, Form, InputContainer, Label, Input, SubmitButton,
  TableWrapper, Table, TableHeader, HeaderRow, HeaderCell, TableBody, BodyRow,
  BodyCell, ActionButton, EditIcon, DeleteIcon, ErrorMessage, ConfirmationModal,
  ModalContent, ConfirmButton
} from "./SalayStyle";

const Deduction = () => {
  const [deductionName, setDeductionName] = useState("");
  const [error, setError] = useState("");
  const [deductions, setDeductions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentDeduction, setCurrentDeduction] = useState(null);

  // Fetch existing deductions from API
  const fetchDeductions = async () => {
    try {
      const response = await axios.get(`${baseURL}/payroll-header/all`);
      setDeductions(response.data);
    } catch (err) {
      console.error("Error fetching deductions:", err);
    }
  };

  useEffect(() => {
    fetchDeductions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (deductionName.trim() === "") {
      setError("Deduction Head Name is required");
    } else {
      setError("");
      try {
        const response = await axios.post(`${baseURL}/payroll-header/add`, {
          Title: deductionName,
          Type: "Deduction",
        });
        setDeductions([...deductions, response.data]); // Add the new deduction to the list
        setDeductionName(""); // Reset the input field
        toast.success("Deduction Head added successfully!");
      } catch (err) {
        console.error("Error adding deduction:", err);
        toast.error("There was an error adding the deduction.");
      }
    }
  };

  const handleEdit = (item) => {
    setDeductionName(item.Title);
    setCurrentDeduction(item);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (deductionName.trim() === "") {
      setError("Deduction Head Name is required");
    } else {
      setError("");
      try {
        const response = await axios.put(`${baseURL}/payroll-header/update/${currentDeduction._id}`, {
          Title: deductionName,
        });
        const updatedDeductions = deductions.map((deduction) =>
          deduction._id === currentDeduction._id ? response.data : deduction
        );
        setDeductions(updatedDeductions);
        setDeductionName(""); // Reset the input field
        setCurrentDeduction(null);
        toast.success("Deduction Head updated successfully!");
      } catch (err) {
        console.error("Error updating deduction:", err);
        toast.error("There was an error updating the deduction.");
      }
    }
  };

  const handleDeleteConfirmation = (item) => {
    setShowModal(true);
    setCurrentDeduction(item);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${baseURL}/payroll-header/delete/${currentDeduction._id}`);
      setDeductions(deductions.filter((deduction) => deduction._id !== currentDeduction._id));
      setShowModal(false);
      toast.success("Deduction Head deleted successfully!");
    } catch (err) {
      console.error("Error deleting deduction:", err);
      toast.error("There was an error deleting the deduction.");
    }
  };

  return (
    <>

      <MainDashboard>
        <Title>Deduction Head</Title>
        <Form onSubmit={currentDeduction ? handleUpdate : handleSubmit}>
          <InputContainer>
            <Label>Deduction Head Name</Label>
            <Input
              type="text"
              placeholder="Enter Name"
              value={deductionName}
              onChange={(e) => setDeductionName(e.target.value)}
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </InputContainer>
          <SubmitButton type="submit">{currentDeduction ? "Update" : "Submit"}</SubmitButton>
        </Form>

        <TableWrapper>
          <Table>
            <TableHeader>
              <HeaderRow>
                <HeaderCell>Sr. No.</HeaderCell>
                <HeaderCell>Deduction Head Name</HeaderCell>
                <HeaderCell>Type</HeaderCell>
                <HeaderCell>Action</HeaderCell>
              </HeaderRow>
            </TableHeader>
            <TableBody>
              {deductions
                .filter(item => item.Type === "Deduction") // Filter for Type "Deduction"
                .map((item, index) => (
                  <BodyRow key={item._id}>
                    <BodyCell>{index + 1}</BodyCell>
                    <BodyCell>{item.Title}</BodyCell>
                    <BodyCell>{item.Type}</BodyCell>
                    <BodyCell>
                      <ActionButton edit onClick={() => handleEdit(item)}>
                        <EditIcon />
                        <span>Edit</span>
                      </ActionButton>
                      <ActionButton onClick={() => handleDeleteConfirmation(item)}>
                        <DeleteIcon />
                        <span>Delete</span>
                      </ActionButton>
                    </BodyCell>
                  </BodyRow>
                ))}
            </TableBody>
          </Table>
        </TableWrapper>

        {showModal && (
          <ConfirmationModal>
            <ModalContent>
              <h3>Are you sure you want to delete this deduction?</h3>
              <ConfirmButton className="yes" onClick={handleDelete}>Yes</ConfirmButton>
              <ConfirmButton className="no" onClick={() => setShowModal(false)}>No</ConfirmButton>
            </ModalContent>
          </ConfirmationModal>
        )}
      </MainDashboard>
      <ToastContainer />
    </>
  );
};

export default Deduction;
