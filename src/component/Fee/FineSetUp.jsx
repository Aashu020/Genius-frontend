import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Edit, Trash2 } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

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

const Section = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Main = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(2, 1fr);
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
  transition: background 0.3s;
  margin-top: 20px;

  &:hover {
    background: linear-gradient(270deg, #1c2563 0%, #662acc 100%);
  }
`;

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Table = styled.table`
  width: 70%;
  border-collapse: collapse;
  margin-top: 30px;
`;

const Th = styled.th`
  background-color: #f2f2f2;
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
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
  align-items: center;
`;

const DeleteButton = styled.div`
  background-color: red;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  display: flex;
  justify-content: center;
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 12px;
  margin-top: 5px;
  display: block;
`;

const ConfirmationModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
`;

const ConfirmButton = styled.button`
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  font-weight: bold;

  &.yes {
    background-color: green;
  }

  &.no {
    background-color: red;
  }
`;

const FineSetUp = () => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [errors, setErrors] = useState({});
  const [fines, setFines] = useState([]);
  const [editingFine, setEditingFine] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [fineToDelete, setFineToDelete] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Fine name is required.";
    if (!amount || amount <= 0) newErrors.amount = "A valid amount is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = { Name: name, Amount: amount };

    try {
      if (editingFine) {
        await axios.put(`https://api.edspride.in/fine-setup/update/${editingFine._id}`, payload);
        toast.success("Fine updated successfully!");
      } else {
        await axios.post("https://api.edspride.in/fine-setup/add", payload);
        toast.success("Fine added successfully!");
      }
      resetForm();
      fetchFines();
    } catch (error) {
      console.error("Error submitting the form:", error);
      toast.error("There was an error submitting the form. Please try again.");
    }
  };

  const fetchFines = async () => {
    try {
      const response = await axios.get("https://api.edspride.in/fine-setup/all");
      setFines(response.data);
    } catch (error) {
      console.error("Error fetching fines:", error);
    }
  };

  const handleEdit = (fine) => {
    setName(fine.Name);
    setAmount(fine.Amount);
    setEditingFine(fine);
  };

  const confirmDelete = (fine) => {
    setFineToDelete(fine);
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://api.edspride.in/fine-setup/delete/${fineToDelete._id}`);
      toast.success("Fine deleted successfully!");
      setShowModal(false);
      fetchFines();
    } catch (error) {
      console.error("Error deleting fine:", error);
      toast.error("There was an error deleting the fine. Please try again.");
    }
  };

  const resetForm = () => {
    setName("");
    setAmount("");
    setEditingFine(null);
    setErrors({});
  };

  useEffect(() => {
    fetchFines();
  }, []);

  return (
    <>

      <MainDashboard>
        <FormContainer>
          <Title>Fine Setup</Title>
          <Form onSubmit={handleSubmit}>
            <Section>
              <Heading>Details</Heading>
              <Heading>{editingFine ? "Update" : "Add"}</Heading>
            </Section>
            <Main>
              <InputContainer>
                <Label>Fine Name</Label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
              </InputContainer>

              <InputContainer>
                <Label>Amount</Label>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                {errors.amount && <ErrorMessage>{errors.amount}</ErrorMessage>}
              </InputContainer>
            </Main>
            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
              <SubmitButton type="submit">{editingFine ? "Update" : "Submit"}</SubmitButton>
            </div>
          </Form>
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <Th>Fine Name</Th>
                  <Th>Amount</Th>
                  <Th>Action</Th>
                </tr>
              </thead>
              <tbody>
                {fines.map((fine) => (
                  <tr key={fine.id}>
                    <Td>{fine.Name}</Td>
                    <Td>{fine.Amount}</Td>
                    <Td1>
                      <EditButton onClick={() => handleEdit(fine)}>
                        <p>Edit</p>
                        <Edit size={18} />
                      </EditButton>
                      <DeleteButton onClick={() => confirmDelete(fine)}>
                        <Trash2 size={18} />
                      </DeleteButton>
                    </Td1>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableContainer>
        </FormContainer>
        {showModal && (
          <ConfirmationModal>
            <ModalContent>
              <h3>Are you sure you want to delete this fine?</h3>
              <ConfirmButton className="yes" onClick={handleDelete}>Yes</ConfirmButton>
              <ConfirmButton className="no" onClick={() => setShowModal(false)}>No</ConfirmButton>
            </ModalContent>
          </ConfirmationModal>
        )}
        <ToastContainer />
      </MainDashboard>

    </>
  );
};

export default FineSetUp;
