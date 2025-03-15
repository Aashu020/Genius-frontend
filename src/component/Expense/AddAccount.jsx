import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { Edit, Trash2 } from "lucide-react";
import { 
  Container, MainDashboard, Title, Form, Heading, Main, FormContainer, 
  InputContainer, Label, Input, SubmitButton, TableWrapper, Table, Th, Td, Td1, 
  EditButton, DeleteButton, ErrorMessage 
} from './ExpenseStyles';
import  baseURL from '../utils/Url'; 
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
    if (!accountData.HolderName) formErrors.HolderName = "Account Holder Name is required";
    if (!accountData.BankName) formErrors.BankName = "Bank Name is required";
    if (!accountData.IFSCCode) {
      formErrors.IFSCCode = "IFSC Code is required";
    } else {
      const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
      if (accountData.IFSCCode.length !== 11 || !ifscRegex.test(accountData.IFSCCode)) {
        formErrors.IFSCCode = "IFSC Code must be 11 characters: 4 letters, 0, and 6 alphanumeric characters.";
      }
    }
    if (!accountData.BranchName) formErrors.BranchName = "Branch Name is required";
    if (!accountData.AccountNo) {
      formErrors.AccountNo = "Account No is required";
    } else {
      const accountNoLength = accountData.AccountNo.length;
      if (accountNoLength < 9 || accountNoLength > 18) {
        formErrors.AccountNo = "Account No must be between 9 to 18 digits.";
      }
    }
    if (!accountData.Remark) formErrors.Remark = "Remark is required";
    return formErrors;
  };

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get(`${baseURL}/bank/all`);
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
      delete updatedErrors.HolderName;
    }
    if (name === "IFSCCode") {
      const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
      if (value.length > 11 || !ifscRegex.test(value)) {
        updatedErrors.IFSCCode = "IFSC Code must be 11 characters: 4 letters, 0, and 6 alphanumeric.";
      } else {
        delete updatedErrors.IFSCCode;
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
          `${baseURL}/bank/update/${currentAccountId}`,
          accountData
        );
        const updatedAccounts = accounts.map((account) =>
          account._id === currentAccountId ? response.data : account
        );
        setAccounts(updatedAccounts);
      } else {
        const response = await axios.post(
          `${baseURL}/bank/add`,
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
      await axios.delete(`${baseURL}/bank/delete/${id}`);
      setAccounts(accounts.filter((account) => account._id !== id));
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  return (
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
              {errors.HolderName && <ErrorMessage>{errors.HolderName}</ErrorMessage>}
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
              {errors.BankName && <ErrorMessage>{errors.BankName}</ErrorMessage>}
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
              {errors.IFSCCode && <ErrorMessage>{errors.IFSCCode}</ErrorMessage>}
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
              {errors.BranchName && <ErrorMessage>{errors.BranchName}</ErrorMessage>}
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
              {errors.AccountNo && <ErrorMessage>{errors.AccountNo}</ErrorMessage>}
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
              {errors.Remark && <ErrorMessage>{errors.Remark}</ErrorMessage>}
            </InputContainer>
          </Main>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
            <SubmitButton type="submit">{editMode ? "Update" : "Save"}</SubmitButton>
          </div>
          <TableWrapper>
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
                        Edit <Edit size={18} />
                      </EditButton>
                      <DeleteButton onClick={() => handleDelete(account._id)}>
                        <Trash2 size={18} />
                      </DeleteButton>
                    </Td1>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableWrapper>
        </Form>
      </FormContainer>
    </MainDashboard>
  );
};

export default AddAccount;