import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
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

const Main = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
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
  width: 88%;
  padding: 15px 20px;
  border: 2px solid #7d3cff;
  border-radius: 30px;
  font-size: 16px;
  color: #7a7a7a;
  background-color: #f4f6fc;
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;
const SubmitButton = styled.button`
  padding: 12px 20px;
  background: linear-gradient(270deg, #222d78 0%, #7130e4 100%);
  border: none;
  border-radius: 30px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 30px;
`;

const Th = styled.th`
  background-color: #f2f2f2;
  padding: 10px;
  text-align: left;
`;

const Td = styled.td`
  padding: 10px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const EditButton = styled.div`
  background-color: #209a16;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  cursor: pointer;
`;

const DeleteButton = styled.div`
  background-color: red;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  cursor: pointer;
`;

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
          "https://api.edspride.in/expense-header/all"
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
          `https://api.edspride.in/expense-header/update/${editingExpenseId}`,
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
          "https://api.edspride.in/expense-header/add",
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
        `https://api.edspride.in/expense-header/delete/${id}`
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
        </FormContainer>
      </MainDashboard>

    </>
  );
};

export default AddExpenseHead;
