import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Container, MainDashboard, Title, Form, InputContainer, Label, Input, SubmitButton,
  TableWrapper, Table, TableHeader, HeaderRow, HeaderCell, TableBody, BodyRow,
  BodyCell, ActionButton, EditIcon, DeleteIcon, ErrorMessage, ConfirmationModal,
  ModalContent, ConfirmButton
} from "./SalayStyle";

const Allowence = () => {
  const [formData, setFormData] = useState({ allowenceHeadName: "" });
  const [formErrors, setFormErrors] = useState({});
  const [allowenceHeads, setAllowenceHeads] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch allowance heads from the API
  const fetchAllowanceHeads = async () => {
    try {
      const response = await axios.get("http://localhost:8007/payroll-header/all");
      // Filter allowance heads to include only those with Type "Allowance"
      const filteredData = response.data.filter(item => item.Type === "Allowance");
      setAllowenceHeads(filteredData);
    } catch (error) {
      console.error("Error fetching allowance heads:", error);
    }
  };

  useEffect(() => {
    fetchAllowanceHeads();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when input changes
    if (value.trim() !== "") {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation check
    let errors = {};
    if (!formData.allowenceHeadName.trim()) {
      errors.allowenceHeadName = "Allowance Head Name is required.";
    }

    setFormErrors(errors);

    // If no errors, submit the form
    if (Object.keys(errors).length === 0) {
      try {
        if (isEditing) {
          await axios.put(`http://localhost:8007/payroll-header/update/${itemToDelete}`, {
            Title: formData.allowenceHeadName,
            Type: "Allowance",
          });
          toast.success("Allowance Head updated successfully!");
        } else {
          await axios.post("http://localhost:8007/payroll-header/add", {
            Title: formData.allowenceHeadName,
            Type: "Allowance",
          });
          toast.success("Allowance Head added successfully!");
        }
        fetchAllowanceHeads(); // Refresh the list after submission
        setFormData({ allowenceHeadName: "" }); // Reset form
        setIsEditing(false); // Reset editing state
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error("There was an error submitting the form.");
      }
    }
  };

  const handleEdit = (item) => {
    setFormData({ allowenceHeadName: item.Title });
    setItemToDelete(item._id);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    setItemToDelete(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8007/payroll-header/delete/${itemToDelete}`);
      toast.success("Allowance Head deleted successfully!");
      fetchAllowanceHeads(); // Refresh the list after deletion
      setShowModal(false); // Close modal
    } catch (error) {
      console.error("Error deleting allowance head:", error);
      toast.error("There was an error deleting the allowance head.");
    }
  };

  return (
    <>

      <ToastContainer />

      <MainDashboard>
        <Form onSubmit={handleSubmit}>
          <Title>Allowance Head</Title>
          <InputContainer>
            <Label>Allowance Head Name</Label>
            <Input
              type="text"
              placeholder="Enter Name"
              name="allowenceHeadName"
              value={formData.allowenceHeadName}
              onChange={handleChange}
            />
            {formErrors.allowenceHeadName && (
              <ErrorMessage>{formErrors.allowenceHeadName}</ErrorMessage>
            )}
          </InputContainer>
          <SubmitButton type="submit">{isEditing ? "Update" : "Submit"}</SubmitButton>
        </Form>

        <TableWrapper>
          <Table>
            <TableHeader>
              <HeaderRow>
                <HeaderCell>Sr. No.</HeaderCell>
                <HeaderCell>Allowance Head Name</HeaderCell>
                <HeaderCell>Type</HeaderCell>
                <HeaderCell>Action</HeaderCell>
              </HeaderRow>
            </TableHeader>
            <TableBody>
              {allowenceHeads.map((item, index) => (
                <BodyRow key={item._id}>
                  <BodyCell>{index + 1}</BodyCell>
                  <BodyCell>{item.Title}</BodyCell>
                  <BodyCell>{item.Type}</BodyCell>
                  <BodyCell>
                    <ActionButton edit onClick={() => handleEdit(item)}>
                      <EditIcon />
                      Edit
                    </ActionButton>
                    <ActionButton onClick={() => handleDelete(item._id)}>
                      <DeleteIcon />
                      Delete
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
              <h3>Are you sure you want to delete this allowance head?</h3>
              <ConfirmButton className="yes" onClick={confirmDelete}>Yes</ConfirmButton>
              <ConfirmButton className="no" onClick={() => setShowModal(false)}>No</ConfirmButton>
            </ModalContent>
          </ConfirmationModal>
        )}
      </MainDashboard>
      
    </>
  );
};

export default Allowence;
