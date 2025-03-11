import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { Edit, Trash2 } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 5px;
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
  align-items: center;
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

const ConfirmationModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
`;

const ConfirmButton = styled.button`
  margin: 5px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &.yes {
    background-color: green;
    color: white;
  }

  &.no {
    background-color: red;
    color: white;
  }
`;

const FeeDiscount = () => {
  const [title, setTitle] = useState("");
  const [percentage, setPercentage] = useState("");
  const [errors, setErrors] = useState({});
  const [fineList, setFineList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (!title) {
      validationErrors.title = "Please enter a fee discount option.";
    }
    if (!percentage) {
      validationErrors.percentage = "Discount cannot be empty.";
    } else if (isNaN(percentage)) {
      validationErrors.percentage = "Discount must be a number.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const payload = { Title: title, Percentage: percentage };

    try {
      if (isEditing) {
        await axios.put(`https://api.edspride.in/discount/update/${fineList[editIndex]._id}`, payload);
        toast.success("Discount updated successfully!");
      } else {
        await axios.post("https://api.edspride.in/discount/add", payload);
        toast.success("Discount added successfully!");
      }

      fetchDiscounts();
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("There was an error. Please try again.");
    }
  };

  const fetchDiscounts = async () => {
    try {
      const response = await axios.get("https://api.edspride.in/discount/all");
      setFineList(response.data);
    } catch (error) {
      console.error("Error fetching discounts:", error);
    }
  };

  const handleEdit = (index) => {
    setTitle(fineList[index].Title);
    setPercentage(fineList[index].Percentage);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://api.edspride.in/discount/delete/${fineList[deleteIndex]._id}`);
      toast.success("Discount deleted successfully!");
      fetchDiscounts();
      setShowModal(false);
    } catch (error) {
      console.error("Error deleting discount:", error);
      toast.error("There was an error deleting the discount. Please try again.");
    }
  };

  const resetForm = () => {
    setTitle("");
    setPercentage("");
    setErrors({});
    setIsEditing(false);
    setEditIndex(null);
  };

  useEffect(() => {
    fetchDiscounts();
  }, []);

  return (
    <>

      <MainDashboard>
        <FormContainer>
          <Title>Fee Discount</Title>
          <Form onSubmit={handleSubmit}>
            <Section>
              <Heading>Details</Heading>
              <Heading>{isEditing ? "Edit" : "Add"} +</Heading>
            </Section>
            <Main>
              <InputContainer>
                <Label>Fee Discount for</Label>
                <Input
                  type="text"
                  name="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                {errors.title && <ErrorMessage>{errors.title}</ErrorMessage>}
              </InputContainer>
              <InputContainer>
                <Label>Discount</Label>
                <Input
                  type="number"
                  name="Percentage"
                  value={percentage}
                  onChange={(e) => setPercentage(e.target.value)}
                />
                {errors.percentage && <ErrorMessage>{errors.percentage}</ErrorMessage>}
              </InputContainer>
            </Main>
            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
              <SubmitButton type="submit">Submit</SubmitButton>
            </div>
          </Form>
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <Th>Discount For</Th>
                  <Th>Discount</Th>
                  <Th>Action</Th>
                </tr>
              </thead>
              <tbody>
                {fineList.map((fine, index) => (
                  <tr key={fine.id}>
                    <Td>{fine.Title}</Td>
                    <Td>{fine.Percentage}</Td>
                    <Td1>
                      <EditButton onClick={() => handleEdit(index)}>
                        <p>Edit</p>
                        <Edit size={18} />
                      </EditButton>
                      <DeleteButton onClick={() => {
                        setDeleteIndex(index);
                        setShowModal(true);
                      }}>
                        <Trash2 size={18} />
                      </DeleteButton>
                    </Td1>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableContainer>
        </FormContainer>

        {/* Modal for Delete Confirmation */}
        {showModal && (
          <ConfirmationModal>
            <ModalContent>
              <h3>Are you sure you want to delete this fine?</h3>
              <ConfirmButton className="yes" onClick={handleDelete}>Yes</ConfirmButton>
              <ConfirmButton className="no" onClick={() => setShowModal(false)}>No</ConfirmButton>
            </ModalContent>
          </ConfirmationModal>
        )}

        <ToastContainer position="top-right" autoClose={3000} />
      </MainDashboard>

    </>
  );
};

export default FeeDiscount;
