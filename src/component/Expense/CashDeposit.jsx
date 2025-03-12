import React, { useEffect, useState } from "react";
import axios from "axios"; // Import axios
import { Link } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { Eye, Edit, Trash2 } from "lucide-react";

const Container = styled.div`
  display: flex;
  background-color: #f4f4f4;
`;

const MainDashboard = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #f9f9f9;
  height: calc(100vh - 100px);
  overflow-y: auto;
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
  @media (max-width: 480px) {
    font-size: 12px;
    height: 30px;
    width: 50%;
    margin-bottom: 30px;
    margin-top: 20px;
  }
`;

const Main = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const FormContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 20px;
  @media (max-width: 480px) {
    margin-bottom: 12px;
  }
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
  @media (max-width: 480px) {
    height: 10px;
    width: 80%;
    font-size: 12px;
    padding: 12px 18px;
  }
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
  transition: background 0.3s;
  margin-top: 20px;

  &:hover {
    background: linear-gradient(270deg, #1c2563 0%, #662acc 100%);
  }

  @media (max-width: 768px) {
    width: 100%;
    font-size: 12px;
    padding: 5px;
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

const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 5px;
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
  @media (max-width: 480px) {
    height: 38px;
    width: 94%;
    font-size: 12px;
    padding: 10px 12px;
  }
`;
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
        "http://localhost:8007/cash-detail/all"
      );
      setAccounts(response.data); // Assuming response.data is an array of accounts
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchBank = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8007/bank/all"
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
          `http://localhost:8007/cash-detail/update/${currentId}`,
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
          "http://localhost:8007/cash-detail/add",
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
          `http://localhost:8007/cash-detail/delete/${id}`
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
