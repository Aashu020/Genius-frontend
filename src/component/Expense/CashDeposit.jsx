import React, { useEffect, useState } from "react";
import axios from "axios"; // Import axios
import { Link } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { Eye, Edit, Trash2 } from "lucide-react";
import { 
  Container, MainDashboard, Title, Form, Heading, Main, FormContainer, 
  InputContainer, Label, Input, Select, SubmitButton, Table, Th, Td, 
  Td1, EditButton, DeleteButton, ErrorMessage 
} from './ExpenseStyles';

const CashDeposit = () => {
  const [formData, setFormData] = useState({
    Type: "",
    Date: "",
    Amount: "",
    ByWhom: "",
    Bank: "",
    Remark: "",
  });

  const [accounts, setAccounts] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [bankList, setBankList] = useState([]);
  

  const [errors, setErrors] = useState({});
 
  // Fetch existing accounts data on component mount
  const fetchAccounts = async () => {
    try {
      const response = await axios.get(
        "https://api.edspride.in/cash-detail/all"
      );
      setAccounts(response.data); // Assuming response.data is an array of accounts
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchBank = async () => {
    try {
      const response = await axios.get(
        "https://api.edspride.in/bank/all"
      );
      console.log(response.data);
      setBankList(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  useEffect(() => {
    fetchBank();
    fetchAccounts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear the error message for this field
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.Type) newErrors.Type = "Type is required";
    if (!formData.Date) newErrors.Date = "Date is required";
    if (!formData.Amount) {
      newErrors.Amount = "Amount is required";
    } else {
      // Regular expression to match positive numbers with optional decimals
      const amountRegex = /^\d+(\.\d{1,2})?$/;
      if (!amountRegex.test(formData.Amount)) {
        newErrors.Amount = "Amount should be a valid number (e.g., 1000 or 1000.50)";
      } else if (parseFloat(formData.Amount) <= 0) {
        newErrors.Amount = "Amount should be greater than zero";
      }
    }
    if (!formData.ByWhom) newErrors.ByWhom = "By Whom is required";
    if (!formData.Bank) newErrors.Bank = "Bank is required";
    if (!formData.Remark) newErrors.Remark = "Remark is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      if (editMode) {
        // Update existing entry
        const response = await axios.put(
          `https://api.edspride.in/cash-detail/update/${currentId}`,
          formData
        );
        setAccounts((prev) =>
          prev.map((account) =>
            account._id === currentId ? response.data : account
          )
        ); // Update the specific entry
        alert("Entry updated successfully!"); // Alert for successful update
      } else {
        // Create new entry
        const response = await axios.post(
          "https://api.edspride.in/cash-detail/add",
          formData
        );
        setAccounts((prev) => [...prev, response.data]); // Add new entry to accounts
        alert("Entry added successfully!"); // Alert for successful addition
      }
      // Clear form
      setFormData({
        Type: "",
        Date: "",
        Amount: "",
        ByWhom: "",
        Bank: "",
        Remark: "",
      });
      setEditMode(false);
      setCurrentId(null);
      setErrors({});
    } catch (error) {
      console.error("Error saving data:", error);
      alert("There was an error saving the data. Please try again."); // Alert for error
    }
  };

  const handleEdit = (account) => {
    setFormData(account);
    setEditMode(true);
    setCurrentId(account._id); // Assuming each account has a unique 'id'
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this entry?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(
          `https://api.edspride.in/cash-detail/delete/${id}`
        );
        setAccounts((prev) => prev.filter((account) => account._id !== id)); // Remove deleted entry from accounts
        alert("Entry deleted successfully!"); // Alert for successful deletion
      } catch (error) {
        console.error("Error deleting account:", error);
        alert("There was an error deleting the entry. Please try again."); // Alert for error
      }
    }
  };


  const today = new Date().toISOString().split('T')[0];

  return (
    <>

      <MainDashboard>
        <FormContainer>
          <Title>Cash Deposit / Withdraw</Title>
          <Form onSubmit={handleSubmit}>
            <Heading>Details</Heading>

            <Main>
              <InputContainer>
                <Label>Type</Label>
                <Select
                  name="Type"
                  value={formData.Type}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="Deposit">Deposit</option>
                  <option value="Withdraw">Withdraw</option>
                </Select>
                {errors.Type && <ErrorMessage>{errors.Type}</ErrorMessage>}
              </InputContainer>

              <InputContainer>
                <Label>Date</Label>
                <Input
                  type="date"
                  name="Date"
                  value={formData.Date}
                  onChange={handleChange}
                  // min={today}
                />
                {errors.Date && <ErrorMessage>{errors.Date}</ErrorMessage>}
              </InputContainer>

              <InputContainer>
                <Label>Amount</Label>
                <Input
                  type="text"
                  name="Amount"
                  value={formData.Amount}
                  onChange={handleChange}
                  placeholder="Enter Amount"
                />
                {errors.Amount && (
                  <ErrorMessage>{errors.Amount}</ErrorMessage>
                )}
              </InputContainer>

              <InputContainer>
                <Label>By Whom</Label>
                <Input
                  type="text"
                  name="ByWhom"
                  value={formData.ByWhom}
                  onChange={handleChange}
                  placeholder="By Whom"
                />
                {errors.ByWhom && (
                  <ErrorMessage>{errors.ByWhom}</ErrorMessage>
                )}
              </InputContainer>

              <InputContainer>
                <Label>Bank</Label>
                {/* <Input
                  type="text"
                  name="Bank"
                  value={formData.Bank}
                  onChange={handleChange}
                  placeholder="Bank Name"
                /> */}
                <Select
                name="Bank"
                value={formData.Bank}
                onChange={handleChange}
                >
                  <option value="">Select</option>
                  {bankList.map(data => {
                    return (
                      <option key={data.id} value={data.BankName}>{data.BankName}</option>
                    )
                  })}
                </Select>
                {errors.Bank && <ErrorMessage>{errors.Bank}</ErrorMessage>}
              </InputContainer>

              <InputContainer>
                <Label>Remark</Label>
                <Input
                  type="text"
                  name="Remark"
                  value={formData.Remark}
                  onChange={handleChange}
                  placeholder="Remark"
                />
                {errors.Remark && (
                  <ErrorMessage>{errors.Remark}</ErrorMessage>
                )}
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
                {editMode ? "Update" : "Save"}
              </SubmitButton>
            </div>
          </Form>

          <Table>
            <thead>
              <tr>
                <Th>Sr. No</Th>
                <Th>By Whom</Th>
                <Th>Bank Name</Th>
                <Th>Type</Th>
                <Th>Date</Th>
                <Th>Amount</Th>
                <Th>Remark</Th>
                <Th>Action</Th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account, index) => (
                <tr key={index}>
                  <Td>{index + 1}</Td>
                  <Td>{account.ByWhom}</Td>
                  <Td>{account.Bank}</Td>
                  <Td>{account.Type}</Td>
                  <Td>{account.Date.split("-").reverse().join("-")}</Td>
                  <Td>{account.Amount}</Td>
                  <Td>{account.Remark}</Td>
                  <Td1>
                    <EditButton onClick={() => handleEdit(account)}>
                      Edit
                      <Edit size={18} />
                    </EditButton>
                    <DeleteButton onClick={() => handleDelete(account._id)}>
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

export default CashDeposit;
