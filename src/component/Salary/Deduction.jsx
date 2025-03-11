import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Container = styled.div`
  display: flex;
  background-color: #f4f4f4;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const MainDashboard = styled.div`
  padding: 20px;
  border-radius: 10px;
  flex: 1;
  height: calc(100vh - 100px);
  overflow-y: auto;
  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const Title = styled.h2`
  color: #0d47a1;
  text-align: center;
  font-weight: bold;
`;

const Form = styled.form`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  transition: background 0.3s;
  margin-top: 20px;

  &:hover {
    background: linear-gradient(270deg, #1c2563 0%, #662acc 100%);
  }
`;

const TableWrapper = styled.div`
  width: 100%;
  margin: 20px 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  background-color: white;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead``;

const HeaderRow = styled.tr``;

const HeaderCell = styled.th`
  padding: 12px;
  text-align: left;
  font-weight: 600;
  color: #666;
`;

const TableBody = styled.tbody``;

const BodyRow = styled.tr`
  &:nth-child(odd) {
    background-color: #f9f9f9;
  }
`;

const BodyCell = styled.td`
  padding: 12px;
  text-align: left;
  font-size: 14px;
`;

const ActionButton = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  padding: 5px 10px;
  margin-right: 5px;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  border-radius: 4px;
  background-color: ${(props) => (props.edit ? "#4caf50" : "#f44336")};
  color: #fff;

  &:hover {
    opacity: 0.9;
  }

  svg {
    margin-right: 5px;
  }
`;

const EditIcon = styled(FaEdit)`
  color: #fff;
`;

const DeleteIcon = styled(FaTrashAlt)`
  color: #fff;
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

const ConfirmationModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
`;

const ConfirmButton = styled.button`
  margin: 5px;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  color: white;
  cursor: pointer;

  &.yes {
    background: #4caf50;
  }

  &.no {
    background: #f44336;
  }
`;

const Deduction = () => {
  const [deductionName, setDeductionName] = useState("");
  const [error, setError] = useState("");
  const [deductions, setDeductions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentDeduction, setCurrentDeduction] = useState(null);

  // Fetch existing deductions from API
  const fetchDeductions = async () => {
    try {
      const response = await axios.get("https://api.edspride.in/payroll-header/all");
      setDeductions(response.data);
    } catch (err) {
      console.error("Error fetching deductions:", err);
    }
  };

  useEffect(() => {
    fetchDeductions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (deductionName.trim() === "") {
      setError("Deduction Head Name is required");
    } else {
      setError("");
      try {
        const response = await axios.post("https://api.edspride.in/payroll-header/add", {
          Title: deductionName,
          Type: "Deduction",
        });
        setDeductions([...deductions, response.data]); // Add the new deduction to the list
        setDeductionName(""); // Reset the input field
        toast.success("Deduction Head added successfully!");
      } catch (err) {
        console.error("Error adding deduction:", err);
        toast.error("There was an error adding the deduction.");
      }
    }
  };

  const handleEdit = (item) => {
    setDeductionName(item.Title);
    setCurrentDeduction(item);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (deductionName.trim() === "") {
      setError("Deduction Head Name is required");
    } else {
      setError("");
      try {
        const response = await axios.put(`https://api.edspride.in/payroll-header/update/${currentDeduction._id}`, {
          Title: deductionName,
        });
        const updatedDeductions = deductions.map((deduction) =>
          deduction._id === currentDeduction._id ? response.data : deduction
        );
        setDeductions(updatedDeductions);
        setDeductionName(""); // Reset the input field
        setCurrentDeduction(null);
        toast.success("Deduction Head updated successfully!");
      } catch (err) {
        console.error("Error updating deduction:", err);
        toast.error("There was an error updating the deduction.");
      }
    }
  };

  const handleDeleteConfirmation = (item) => {
    setShowModal(true);
    setCurrentDeduction(item);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://api.edspride.in/payroll-header/delete/${currentDeduction._id}`);
      setDeductions(deductions.filter((deduction) => deduction._id !== currentDeduction._id));
      setShowModal(false);
      toast.success("Deduction Head deleted successfully!");
    } catch (err) {
      console.error("Error deleting deduction:", err);
      toast.error("There was an error deleting the deduction.");
    }
  };

  return (
    <>

      <MainDashboard>
        <Title>Deduction Head</Title>
        <Form onSubmit={currentDeduction ? handleUpdate : handleSubmit}>
          <InputContainer>
            <Label>Deduction Head Name</Label>
            <Input
              type="text"
              placeholder="Enter Name"
              value={deductionName}
              onChange={(e) => setDeductionName(e.target.value)}
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </InputContainer>
          <SubmitButton type="submit">{currentDeduction ? "Update" : "Submit"}</SubmitButton>
        </Form>

        <TableWrapper>
          <Table>
            <TableHeader>
              <HeaderRow>
                <HeaderCell>Sr. No.</HeaderCell>
                <HeaderCell>Deduction Head Name</HeaderCell>
                <HeaderCell>Type</HeaderCell>
                <HeaderCell>Action</HeaderCell>
              </HeaderRow>
            </TableHeader>
            <TableBody>
              {deductions
                .filter(item => item.Type === "Deduction") // Filter for Type "Deduction"
                .map((item, index) => (
                  <BodyRow key={item._id}>
                    <BodyCell>{index + 1}</BodyCell>
                    <BodyCell>{item.Title}</BodyCell>
                    <BodyCell>{item.Type}</BodyCell>
                    <BodyCell>
                      <ActionButton edit onClick={() => handleEdit(item)}>
                        <EditIcon />
                        Edit
                      </ActionButton>
                      <ActionButton onClick={() => handleDeleteConfirmation(item)}>
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
              <h3>Are you sure you want to delete this deduction?</h3>
              <ConfirmButton className="yes" onClick={handleDelete}>Yes</ConfirmButton>
              <ConfirmButton className="no" onClick={() => setShowModal(false)}>No</ConfirmButton>
            </ModalContent>
          </ConfirmationModal>
        )}
      </MainDashboard>
      <ToastContainer />
    </>
  );
};

export default Deduction;
