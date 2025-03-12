import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import styled from "styled-components";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { Edit, Trash2 } from "lucide-react";

// Styled components
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
  margin-top: 20px;

  &:hover {
    background: linear-gradient(270deg, #1c2563 0%, #662acc 100%);
  }
`;
const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 5px;
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
  width: 20%;
  display: flex;
  justify-content: center;
`;

const DeleteButton = styled.div`
  background-color: red;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  width: 10%;
  display: flex;
  justify-content: center;
`;

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
          "http://localhost:8007/expense-header/all"
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
          `http://localhost:8007/expense-header/update/${editId}`,
          newIncomeHead
        );
        setIncome(
          income.map((head) => (head._id === editId ? response.data : head))
        ); // Update the state
        alert("Income head updated successfully!"); // Alert for update
      } else {
        // Create new income head
        const response = await axios.post(
          "http://localhost:8007/expense-header/add",
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
          `http://localhost:8007/expense-header/delete/${id}`
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
