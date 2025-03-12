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
  grid-template-columns: repeat(3, 1fr);
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

const Label2 = styled.span`
  position: absolute;
  top: -10px;
  left: 20px;
  background: linear-gradient(270deg, #6c6c6c 0%, #525252 100%);

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

const Select = styled.select`
  width: 100%;
  padding: 15px 20px;
  border: 2px solid #7d3cff;
  border-radius: 30px;
  font-size: 16px;
  color: #7a7a7a;
  background-color: #f4f6fc;
  font-weight: bold;
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
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

const DeleteButton = styled.div`
  background-color: red;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;
const AddExpense = () => {
  const [expenseDate, setExpenseDate] = useState("");
  const [expenseHead, setExpenseHead] = useState("");
  const [expenseName, setExpenseName] = useState("");
  const [amount, setAmount] = useState("");
  const [vendor, setVendor] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [expenseDetail, setExpenseDetail] = useState("");
  const [expenseHeads, setExpenseHeads] = useState([]);
  const [vendors, setVendors] = useState([]); // State for vendors
  const [expenses, setExpenses] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentExpenseId, setCurrentExpenseId] = useState(null);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};
    if (!expenseDate) formErrors.expenseDate = "Expense date is required";
    if (!expenseHead) formErrors.expenseHead = "Expense head is required";
    if (!expenseName) formErrors.expenseName = "Expense name is required";
    if (!amount) formErrors.amount = "Amount is required";
    if (!vendor) formErrors.vendor = "Vendor is required";
    if (!paymentMode) formErrors.paymentMode = "Payment mode is required";
    if (!expenseDetail) formErrors.expenseDetail = "ExpenseDetail is required";
    return formErrors;
  };

  // Fetch expense heads
  useEffect(() => {
    const fetchExpenseHeads = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8007/expense-header/all"
        );
        setExpenseHeads(response.data);
      } catch (error) {
        console.error("Error fetching expense heads:", error);
      }
    };

    fetchExpenseHeads();
  }, []);

  // Fetch vendors
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8007/vendor/all"
        );
        setVendors(response.data);
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    };

    fetchVendors();
  }, []);

  // Fetch expenses
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8007/revenue/all"
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
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    setErrors({});

    const expenseData = {
      Date: expenseDate,
      Label: expenseHead,
      Name: expenseName,
      Amount: amount,
      Vendor: vendor,
      PaymentMode: paymentMode,
      Detail: expenseDetail,
      Type: "Expense",
    };

    try {
      if (isEditing) {
        // Update the expense
        await axios.put(
          `http://localhost:8007/revenue/update/${currentExpenseId}`,
          expenseData
        );
        setExpenses(
          expenses.map((expense) =>
            expense._id === currentExpenseId
              ? { ...expense, ...expenseData }
              : expense
          )
        );
        alert("Expense updated successfully!"); // Alert for update
        setIsEditing(false);
      } else {
        // Add a new expense
        const response = await axios.post(
          "http://localhost:8007/revenue/add",
          expenseData
        );
        setExpenses([...expenses, response.data]);
        alert("Expense added successfully!"); // Alert for add
      }

      // Reset form fields
      setExpenseDate("");
      setExpenseHead("");
      setExpenseName("");
      setAmount("");
      setVendor("");
      setPaymentMode("");
      setExpenseDetail("");
    } catch (error) {
      console.error("Error saving expense:", error);
      alert("There was an error saving the expense. Please try again."); // Alert for error
    }
  };

  const handleEdit = (expense) => {
    setExpenseDate(expense.Date);
    setExpenseHead(expense.Label);
    setExpenseName(expense.Name);
    setAmount(expense.Amount);
    setVendor(expense.Vendor);
    setPaymentMode(expense.PaymentMode);
    setExpenseDetail(expense.Detail);
    setCurrentExpenseId(expense._id);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:8007/revenue/delete/${id}`
      );
      setExpenses(expenses.filter((expense) => expense._id !== id));
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <>

      <MainDashboard>
        <FormContainer>
          <Title>{isEditing ? "Edit Expense" : "Add Expense"}</Title>
          <Form onSubmit={handleSubmit}>
            <Heading>Details</Heading>
            <Main>
              <InputContainer>
                <Label>Expense Date</Label>
                <Input
                  type="date"
                  value={expenseDate}
                  onChange={(e) => setExpenseDate(e.target.value)}
                  // min={today} // Prevent selection of past dates
                />
                {errors.expenseDate && <ErrorMessage>{errors.expenseDate}</ErrorMessage>}
              </InputContainer>
              <InputContainer>
                <Label>Expense Head</Label>
                <Select
                  value={expenseHead}
                  onChange={(e) => setExpenseHead(e.target.value)}

                >
                  <option value="">Select</option>
                  {expenseHeads
                    .filter((head) => head.Type === "Expense") // Filter based on Type
                    .map((head) => (
                      <option key={head.id} value={head.id}>
                        {head.Title}
                      </option>
                    ))}
                </Select>
                {errors.expenseHead && <ErrorMessage>{errors.expenseHead}</ErrorMessage>}

              </InputContainer>
              <InputContainer>
                <Label>Expense Name</Label>
                <Input
                  type="text"
                  value={expenseName}
                  onChange={(e) => setExpenseName(e.target.value)}
                  placeholder="Enter Name"

                />
                {errors.expenseName && <ErrorMessage>{errors.expenseName}</ErrorMessage>}

              </InputContainer>
              <InputContainer>
                <Label>Amount</Label>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter Amount"

                />
                {errors.amount && <ErrorMessage>{errors.amount}</ErrorMessage>}

              </InputContainer>
              <InputContainer>
                <Label2>Vendor</Label2>
                <Select
                  value={vendor}
                  onChange={(e) => setVendor(e.target.value)}

                >
                  <option value="">Select</option>
                  {vendors.map((vendor) => (
                    <option key={vendor._id} value={vendor._id}>
                      {vendor.Name}{" "}
                      {/* Adjust based on the actual property names */}
                    </option>
                  ))}
                </Select>
                {errors.vendor && <ErrorMessage>{errors.vendor}</ErrorMessage>}

              </InputContainer>
              <InputContainer>
                <Label>Payment Mode</Label>
                <Select
                  value={paymentMode}
                  onChange={(e) => setPaymentMode(e.target.value)}

                >
                  <option value="">Select Payment Mode</option>
                  <option value="GPay">GPay</option>
                  <option value="Phone Pay">Phone Pay</option>
                  <option value="UPI">UPI</option>
                  <option value="Cash">Cash</option>
                </Select>
                {errors.paymentMode && <ErrorMessage>{errors.paymentMode}</ErrorMessage>}

              </InputContainer>
              <InputContainer>
                <Label>Expense Detail</Label>
                <Input
                  type="text"
                  value={expenseDetail}
                  onChange={(e) => setExpenseDetail(e.target.value)}
                  placeholder="Enter Expense Detail"
                />
                {errors.expenseDetail && <ErrorMessage>{errors.expenseDetail}</ErrorMessage>}

              </InputContainer>
            </Main>
            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "center",
              }}
            >
              <SubmitButton type="submit">
                {isEditing ? "Update" : "Save"}
              </SubmitButton>
            </div>
          </Form>

          <Table>
            <thead>
              <tr>
                <Th>Sr. No</Th>
                <Th>Name</Th>
                <Th>Date</Th>
                <Th>Expense Head</Th>
                <Th>Name of Person</Th>
                <Th>Amount</Th>
                <Th>Detail</Th>
                <Th>Type</Th>
                <Th>Action</Th>
              </tr>
            </thead>
            <tbody>
              {expenses
                .filter((expense) => expense.Type === "Expense")
                .map((expense, index) => (
                  <tr key={expense._id}>
                    <Td>{index + 1}</Td>
                    <Td>{expense.Name}</Td>
                    <Td>{expense.Date.split("-").reverse().join("-")}</Td>
                    <Td>{expense.Label}</Td>
                    <Td>{expense.Name}</Td>
                    <Td>{expense.Amount}</Td>
                    <Td>{expense.Detail}</Td>
                    <Td>{expense.Type}</Td>
                    <Td1>
                      <EditButton onClick={() => handleEdit(expense)}>
                        Edit <Edit size={18} />
                      </EditButton>
                      <DeleteButton onClick={() => handleDelete(expense._id)}>
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

export default AddExpense;
