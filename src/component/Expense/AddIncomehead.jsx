import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import styled from "styled-components";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { Edit, Trash2 } from "lucide-react";
import { 
  Container, MainDashboard, Title, Form, Heading, Main, FormContainer, 
  InputContainer, Label, Input, SubmitButton, Table, Th, Td, Td1, 
  EditButton, DeleteButton, ErrorMessage 
} from './ExpenseStyles';


const AddIncomehead = () => {
  const [incomeHeadName, setIncomeHeadName] = useState("");
  const [description, setDescription] = useState("");
  const [income, setIncome] = useState([]);
  const [editId, setEditId] = useState(null); // State to track the editing income head


  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};
    if (!incomeHeadName) formErrors.incomeHeadName = "Income Head Name is required";
    if (!description) formErrors.description = "Description is required";

    return formErrors;
  };

  useEffect(() => {
    const fetchIncomeHeads = async () => {
      try {
        const response = await axios.get(
          "https://api.edspride.in/expense-header/all"
        );
        setIncome(response.data);
      } catch (error) {
        console.error("Error fetching income heads:", error);
      }
    };
    fetchIncomeHeads();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    setErrors({});

    const newIncomeHead = {
      Title: incomeHeadName,
      Type: "Income",
      Description: description,
    };

    try {
      if (editId) {
        // Update existing income head
        const response = await axios.put(
          `https://api.edspride.in/expense-header/update/${editId}`,
          newIncomeHead
        );
        setIncome(
          income.map((head) => (head._id === editId ? response.data : head))
        ); // Update the state
        alert("Income head updated successfully!"); // Alert for update
      } else {
        // Create new income head
        const response = await axios.post(
          "https://api.edspride.in/expense-header/add",
          newIncomeHead
        );
        setIncome([...income, response.data]);
        alert("Income head added successfully!"); // Alert for add
      }
      setIncomeHeadName("");
      setDescription("");
      setEditId(null); // Reset edit ID after submission
    } catch (error) {
      console.error("Error creating/updating income head:", error);
      alert("There was an error saving the income head. Please try again."); // Alert for error
    }
  };

  const handleEdit = (head) => {
    setIncomeHeadName(head.Title);
    setDescription(head.Description);
    setEditId(head._id); // Set the ID of the income head being edited
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this income head?");
    if (confirmDelete) {
      try {
        await axios.delete(
          `https://api.edspride.in/expense-header/delete/${id}`
        );
        setIncome(income.filter((head) => head._id !== id)); // Remove the deleted income head from state
      } catch (error) {
        console.error("Error deleting income head:", error);
      }
    }
  };

  return (
    <>

      <MainDashboard>
        <FormContainer>
          <Title>Add Income Head</Title>
          <Form onSubmit={handleSubmit}>
            <Heading>Details</Heading>
            <Main>
              <InputContainer>
                <Label>Income Head Name</Label>
                <Input
                  type="text"
                  value={incomeHeadName}
                  onChange={(e) => setIncomeHeadName(e.target.value)}
                  placeholder="Enter Name"
                />
                {errors.incomeHeadName && <ErrorMessage>{errors.incomeHeadName}</ErrorMessage>}

              </InputContainer>
              <InputContainer>
                <Label>Description</Label>
                <Input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter Description"
                />
                {errors.description && <ErrorMessage>{errors.description}</ErrorMessage>}

              </InputContainer>
            </Main>
            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "center",
              }}
            >
              <SubmitButton
                type="button"
                onClick={() => {
                  setIncomeHeadName("");
                  setDescription("");
                  setEditId(null);
                }}
              >
                Cancel
              </SubmitButton>
              <SubmitButton type="submit">
                {editId ? "Update" : "Save"}
              </SubmitButton>
            </div>
          </Form>

          <Table>
            <thead>
              <tr>
                <Th>Sr. No</Th>
                <Th>Income Head Name</Th>
                <Th>Description</Th>
                <Th>Action</Th>
              </tr>
            </thead>
            <tbody>
              {income
                .filter((head) => head.Type === "Income") // Filter for type "Income"
                .map((head, index) => (
                  <tr key={head._id}>
                    <Td>{index + 1}</Td>
                    <Td>{head.Title}</Td>
                    <Td>{head.Description}</Td>
                    <Td1>
                      <EditButton onClick={() => handleEdit(head)}>
                        Edit
                        <Edit size={18} />
                      </EditButton>
                      <DeleteButton onClick={() => handleDelete(head._id)}>
                        <Trash2 size={18} />
                      </DeleteButton>
                    </Td1>
                  </tr>
                ))}
            </tbody>
          </Table>
        </FormContainer>
      </MainDashboard>

    </>
  );
};

export default AddIncomehead;
