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

const AddAccount = () => {
  const [accountData, setAccountData] = useState({
    BankName: "",
    HolderName: "",
    IFSCCode: "",
    BranchName: "",
    Remark: "",
    AccountNo: "",
  });

  const [accounts, setAccounts] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentAccountId, setCurrentAccountId] = useState(null);

  const [errors, setErrors] = useState({});
  const validateForm = () => {
    let formErrors = {};
    if (!accountData.HolderName)
      formErrors.HolderName = "Account Holder Name is required";
    if (!accountData.BankName) formErrors.BankName = "Bank Name is required";
    if (!accountData.IFSCCode) {
      formErrors.IFSCCode = "IFSC Code is required";
    } else {
      // Validate IFSC code format: 4 uppercase letters, '0', and 6 alphanumeric characters
      const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
      if (accountData.IFSCCode.length !== 11 || !ifscRegex.test(accountData.IFSCCode)) {
        formErrors.IFSCCode = "IFSC Code must be 11 characters: 4 letters, 0, and 6 alphanumeric characters.";
      }
    }
    if (!accountData.BranchName)
      formErrors.BranchName = "Branch Name is required";

    if (!accountData.AccountNo) {
      formErrors.AccountNo = "Account No is required";
    } else {
      // Validate Account Number length
      const accountNoLength = accountData.AccountNo.length;
      if (accountNoLength < 9 || accountNoLength > 18) {
        formErrors.AccountNo = "Account No must be between 9 to 18 digits.";
      }
    } if (!accountData.Remark) formErrors.Remark = "Remark is required";
    return formErrors;
  };

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8007/bank/all"
        ); // Adjust this endpoint
        setAccounts(response.data);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };
    fetchAccounts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedErrors = { ...errors };

    if (name === "AccountNo") {
      if (!/^\d*$/.test(value)) {
        setErrors((prev) => ({
          ...prev,
          AccountNo: "Account No can only contain numbers.",
        }));
        return;
      } else {
        setErrors((prev) => ({ ...prev, AccountNo: "" }));
        delete updatedErrors.AccountNo;
      }
    }
    if (name === "HolderName" && !/^[a-zA-Z\s]*$/.test(value)) {
      setErrors((prev) => ({
        ...prev,
        HolderName: "Holder Name can only contain letters.",
      }));
      return;
    } else {
      setErrors((prev) => ({ ...prev, HolderName: "" }));
      delete updatedErrors.HolderName;
    }
    if (name === "IFSCCode") {
      const gstRegex = /^[A-Z]{4}0[a-zA-Z0-9]{6}$/;
      if (value.length > 11) {
        updatedErrors.IFSCCode = "IFSC Code must be 11 characters long.";
      } else if (!gstRegex.test(value)) {
        updatedErrors.IFSCCode = "IFSC Code is invalid.";
      } else {
        delete updatedErrors.IFSCCode;
      }
    }

    if (name === "AccountNo") {
      if (!/^\d*$/.test(value)) {
        updatedErrors.AccountNo = "Account No can only contain numbers.";
      } else {
        // Check length
        const accountNoLength = value.length;
        if (accountNoLength < 9 || accountNoLength > 18) {
          updatedErrors.AccountNo = "Account No must be between 9 to 18 digits.";
        } else {
          delete updatedErrors.AccountNo;
        }
      }
    }

    setAccountData({ ...accountData, [name]: value });
    setErrors(updatedErrors);

  };

  const handleEdit = (account) => {
    setAccountData({
      BankName: account.BankName,
      HolderName: account.HolderName,
      IFSCCode: account.IFSCCode,
      BranchName: account.BranchName,
      Remark: account.Remark,
      AccountNo: account.AccountNo,
    });
    setEditMode(true);
    setCurrentAccountId(account._id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    try {
      if (editMode) {
        const response = await axios.put(
          `http://localhost:8007/bank/update/${currentAccountId}`,
          accountData
        );
        const updatedAccounts = accounts.map((account) =>
          account._id === currentAccountId ? response.data : account
        );
        setAccounts(updatedAccounts);
      } else {
        const response = await axios.post(
          "http://localhost:8007/bank/add",
          accountData
        );
        setAccounts([...accounts, response.data]);
      }
      setAccountData({
        BankName: "",
        HolderName: "",
        IFSCCode: "",
        BranchName: "",
        Remark: "",
        AccountNo: "",
      });
      setEditMode(false);
      setErrors({});
    } catch (error) {
      console.error("Error saving account:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:8007/bank/delete/${id}`
      );
      setAccounts(accounts.filter((account) => account._id !== id));
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  return (
    <>

      <MainDashboard>
        <FormContainer>
          <Title>Add Account</Title>
          <Form onSubmit={handleSubmit}>
            <Heading>Details</Heading>
            <Main>
              <InputContainer>
                <Label>Account Holder Name</Label>
                <Input
                  type="text"
                  name="HolderName"
                  placeholder="Enter Name"
                  value={accountData.HolderName}
                  onChange={handleChange}
                />
                {errors.HolderName && (
                  <ErrorMessage>{errors.HolderName}</ErrorMessage>
                )}
              </InputContainer>
              <InputContainer>
                <Label>Bank Name</Label>
                <Input
                  type="text"
                  name="BankName"
                  placeholder="Enter Bank Name"
                  value={accountData.BankName}
                  onChange={handleChange}
                />
                {errors.BankName && (
                  <ErrorMessage>{errors.BankName}</ErrorMessage>
                )}
              </InputContainer>
              <InputContainer>
                <Label>IFSC Code</Label>
                <Input
                  type="text"
                  name="IFSCCode"
                  placeholder="Enter IFSC Code"
                  value={accountData.IFSCCode}
                  onChange={handleChange}
                  maxLength={11}
                />
                {errors.IFSCCode && (
                  <ErrorMessage>{errors.IFSCCode}</ErrorMessage>
                )}
              </InputContainer>
              <InputContainer>
                <Label>Branch Name</Label>
                <Input
                  type="text"
                  name="BranchName"
                  placeholder="Enter Branch Name"
                  value={accountData.BranchName}
                  onChange={handleChange}
                />
                {errors.BranchName && (
                  <ErrorMessage>{errors.BranchName}</ErrorMessage>
                )}
              </InputContainer>
              <InputContainer>
                <Label>Account No</Label>
                <Input
                  type="text"
                  name="AccountNo"
                  placeholder="Enter Account No"
                  value={accountData.AccountNo}
                  onChange={handleChange}
                  maxLength={18}

                />
                {errors.AccountNo && (
                  <ErrorMessage>{errors.AccountNo}</ErrorMessage>
                )}
              </InputContainer>
              <InputContainer>
                <Label>Remark</Label>
                <Input
                  type="text"
                  name="Remark"
                  placeholder="Enter Remark"
                  value={accountData.Remark}
                  onChange={handleChange}
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
                <Th>Account Holder Name</Th>
                <Th>Account No</Th>
                <Th>Bank Name</Th>
                <Th>IFSC Code</Th>
                <Th>Remark</Th>
                <Th>Action</Th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account, index) => (
                <tr key={account._id}>
                  <Td>{index + 1}</Td>
                  <Td>{account.HolderName}</Td>
                  <Td>{account.AccountNo}</Td>
                  <Td>{account.BankName}</Td>
                  <Td>{account.IFSCCode}</Td>
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

export default AddAccount;
