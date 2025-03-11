import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
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
  padding: 20px;
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

// Confirmation Modal
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
  z-index: 999;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
`;

const ConfirmButton = styled.button`
  padding: 10px 15px;
  margin: 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &.yes {
    background-color: #4caf50;
    color: white;
  }
  &.no {
    background-color: #f44336;
    color: white;
  }
`;

const Allowence = () => {
  const [formData, setFormData] = useState({ allowenceHeadName: "" });
  const [formErrors, setFormErrors] = useState({});
  const [allowenceHeads, setAllowenceHeads] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch allowance heads from the API
  const fetchAllowanceHeads = async () => {
    try {
      const response = await axios.get("https://api.edspride.in/payroll-header/all");
      // Filter allowance heads to include only those with Type "Allowance"
      const filteredData = response.data.filter(item => item.Type === "Allowance");
      setAllowenceHeads(filteredData);
    } catch (error) {
      console.error("Error fetching allowance heads:", error);
    }
  };

  useEffect(() => {
    fetchAllowanceHeads();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when input changes
    if (value.trim() !== "") {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation check
    let errors = {};
    if (!formData.allowenceHeadName.trim()) {
      errors.allowenceHeadName = "Allowance Head Name is required.";
    }

    setFormErrors(errors);

    // If no errors, submit the form
    if (Object.keys(errors).length === 0) {
      try {
        if (isEditing) {
          await axios.put(`https://api.edspride.in/payroll-header/update/${itemToDelete}`, {
            Title: formData.allowenceHeadName,
            Type: "Allowance",
          });
          toast.success("Allowance Head updated successfully!");
        } else {
          await axios.post("https://api.edspride.in/payroll-header/add", {
            Title: formData.allowenceHeadName,
            Type: "Allowance",
          });
          toast.success("Allowance Head added successfully!");
        }
        fetchAllowanceHeads(); // Refresh the list after submission
        setFormData({ allowenceHeadName: "" }); // Reset form
        setIsEditing(false); // Reset editing state
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error("There was an error submitting the form.");
      }
    }
  };

  const handleEdit = (item) => {
    setFormData({ allowenceHeadName: item.Title });
    setItemToDelete(item._id);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    setItemToDelete(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`https://api.edspride.in/payroll-header/delete/${itemToDelete}`);
      toast.success("Allowance Head deleted successfully!");
      fetchAllowanceHeads(); // Refresh the list after deletion
      setShowModal(false); // Close modal
    } catch (error) {
      console.error("Error deleting allowance head:", error);
      toast.error("There was an error deleting the allowance head.");
    }
  };

  return (
    <>

      <ToastContainer />

      <MainDashboard>
        <Form onSubmit={handleSubmit}>
          <Title>Allowance Head</Title>
          <InputContainer>
            <Label>Allowance Head Name</Label>
            <Input
              type="text"
              placeholder="Enter Name"
              name="allowenceHeadName"
              value={formData.allowenceHeadName}
              onChange={handleChange}
            />
            {formErrors.allowenceHeadName && (
              <ErrorMessage>{formErrors.allowenceHeadName}</ErrorMessage>
            )}
          </InputContainer>
          <SubmitButton type="submit">{isEditing ? "Update" : "Submit"}</SubmitButton>
        </Form>

        <TableWrapper>
          <Table>
            <TableHeader>
              <HeaderRow>
                <HeaderCell>Sr. No.</HeaderCell>
                <HeaderCell>Allowance Head Name</HeaderCell>
                <HeaderCell>Type</HeaderCell>
                <HeaderCell>Action</HeaderCell>
              </HeaderRow>
            </TableHeader>
            <TableBody>
              {allowenceHeads.map((item, index) => (
                <BodyRow key={item._id}>
                  <BodyCell>{index + 1}</BodyCell>
                  <BodyCell>{item.Title}</BodyCell>
                  <BodyCell>{item.Type}</BodyCell>
                  <BodyCell>
                    <ActionButton edit onClick={() => handleEdit(item)}>
                      <EditIcon />
                      Edit
                    </ActionButton>
                    <ActionButton onClick={() => handleDelete(item._id)}>
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
              <h3>Are you sure you want to delete this allowance head?</h3>
              <ConfirmButton className="yes" onClick={confirmDelete}>Yes</ConfirmButton>
              <ConfirmButton className="no" onClick={() => setShowModal(false)}>No</ConfirmButton>
            </ModalContent>
          </ConfirmationModal>
        )}
      </MainDashboard>
      
    </>
  );
};

export default Allowence;
