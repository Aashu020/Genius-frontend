import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { Edit, Trash2 } from "lucide-react";
import { 
  Container, MainDashboard, Title, Form, Heading, Main, FormContainer, 
  InputContainer, Label, Input, SubmitButton, Table, Th, Td, 
  ActionButtons, EditButton, DeleteButton, ErrorMessage ,TableWrapper
} from './ExpenseStyles';

const AddExpenseHead = () => {
  const [expenseHeadName, setExpenseHeadName] = useState("");
  const [description, setDescription] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [editingExpenseId, setEditingExpenseId] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8007/expense-header/all"
        );
        setExpenses(response.data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    fetchExpenses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const newErrors = {};
    if (!expenseHeadName) newErrors.expenseHeadName = "Expense Head Name is required.";
    if (!description) newErrors.description = "Description is required.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return; // Stop submission if there are errors
    }

    const data = {
      Title: expenseHeadName,
      Type: "Expense",
      Description: description,
    };

    try {
      if (editingExpenseId) {
        await axios.put(
          `http://localhost:8007/expense-header/update/${editingExpenseId}`,
          data
        );
        setExpenses(
          expenses.map((expense) =>
            expense._id === editingExpenseId ? { ...expense, ...data } : expense
          )
        );
        alert("Expense head updated successfully!"); // Alert for update
      } else {
        const response = await axios.post(
          "http://localhost:8007/expense-header/add",
          data
        );
        setExpenses([...expenses, response.data]);
        alert("Expense head added successfully!"); // Alert for add
      }

      // Reset form
      setExpenseHeadName("");
      setDescription("");
      setEditingExpenseId(null);
      setErrors({});
    } catch (error) {
      console.error("Error saving expense header:", error);
      alert("There was an error saving the expense head. Please try again."); // Alert for error
    }
  };


  const handleEdit = (expense) => {
    setExpenseHeadName(expense.Title);
    setDescription(expense.Description);
    setEditingExpenseId(expense._id);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this expense head?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:8007/expense-header/delete/${id}`
      );
      setExpenses(expenses.filter((expense) => expense._id !== id));
    } catch (error) {
      console.error("Error deleting expense header:", error);
    }
  };

  return (
    <>

      <MainDashboard>
        <FormContainer>
          <Title>
            {editingExpenseId ? "Edit Expense Head" : "Add Expense Head"}
          </Title>
          <Form onSubmit={handleSubmit}>
            <Heading>Details</Heading>
            <Main>
              <InputContainer>
                <Label>Expense Head Name</Label>
                <Input
                  type="text"
                  value={expenseHeadName}
                  onChange={(e) => setExpenseHeadName(e.target.value)}
                  placeholder="Enter Your name"

                />
                {errors.expenseHeadName && <ErrorMessage>{errors.expenseHeadName}</ErrorMessage>}
              </InputContainer>
              <InputContainer>
                <Label>Description</Label>
                <Input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter the Description"
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
                  setExpenseHeadName("");
                  setDescription("");
                  setEditingExpenseId(null);
                }}
              >
                Cancel
              </SubmitButton>
              <SubmitButton type="submit">
                {editingExpenseId ? "Update" : "Save"}
              </SubmitButton>
            </div>
          </Form>

          <TableWrapper>

          <Table>
            <thead>
              <tr>
                <Th>Sr. No</Th>
                <Th>Expense Head Name</Th>
                <Th>Type</Th>
                <Th>Description</Th>
                <Th>Action</Th>
              </tr>
            </thead>
            <tbody>
              {expenses
                .filter((expense) => expense.Type === "Expense")
                .map((expense, index) => (
                  <tr key={expense._id}>
                    <Td>{index + 1}</Td>
                    <Td>{expense.Title}</Td>
                    <Td>{expense.Type}</Td>
                    <Td>{expense.Description}</Td>
                    <Td>
                      <ActionButtons>
                        <EditButton onClick={() => handleEdit(expense)}>
                          <Edit />
                        </EditButton>
                        <DeleteButton
                          onClick={() => handleDelete(expense._id)}
                        >
                          <Trash2 />
                        </DeleteButton>
                      </ActionButtons>
                    </Td>
                  </tr>
                ))}
            </tbody>
          </Table>
          </TableWrapper>
        </FormContainer>
      </MainDashboard>

    </>
  );
};

export default AddExpenseHead;
