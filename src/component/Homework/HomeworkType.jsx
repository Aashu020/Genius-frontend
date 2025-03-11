import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Edit, Trash2 } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const InputContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 20px;
`;

const Label = styled.span`
  position: absolute;
  top: -10px;
  left: 20px;
  background: #222d78;
  color: white;
  padding: 2px 10px;
  border-radius: 20px;
  font-size: 12px;
`;

const Input = styled.input`
  width: 93%;
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

const EditButton = styled.div`
  background-color: #209a16bf;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  width: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const DeleteButton = styled.div`
  background-color: red;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  width: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const ModalOverlay = styled.div`
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

const YesButton = styled.button`
  background: green;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    background: darkgreen;
  }
`;

const NoButton = styled.button`
  background: red;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: darkred;
  }
`;

const HomeworkType = () => {
  const [homeworkTypes, setHomeworkTypes] = useState([]);
  const [formData, setFormData] = useState({ Type: "" });
  const [editingId, setEditingId] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const fetchHomeworkTypes = async () => {
      const response = await axios.get("https://api.edspride.in/homeworktype/all");
      setHomeworkTypes(response.data);
    };
    fetchHomeworkTypes();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, Type: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`https://api.edspride.in/homeworktype/update/${editingId}`, { HomeworkTypeTitle: formData.Type });
        toast.success("Homework Type updated successfully!");
      } else {
        await axios.post("https://api.edspride.in/homeworktype/add", { HomeworkTypeTitle: formData.Type });
        toast.success("Homework Type added successfully!");
      }
      setFormData({ Type: "" });
      setEditingId(null);
      const response = await axios.get("https://api.edspride.in/homeworktype/all");
      setHomeworkTypes(response.data);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error occurred while saving homework type.");
    }
  };

  const handleEdit = (homeworkType) => {
    setFormData({ Type: homeworkType.HomeworkTypeTitle });
    setEditingId(homeworkType._id);
  };

  const openDeleteDialog = (id) => {
    setDeletingId(id);
    setIsDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`https://api.edspride.in/homeworktype/delete/${deletingId}`);
      setHomeworkTypes(homeworkTypes.filter((type) => type._id !== deletingId));
      toast.success("Homework Type deleted successfully!");
      setIsDialogOpen(false);
      setDeletingId(null);
    } catch (error) {
      console.error("Error deleting homework type:", error);
      toast.error("Error deleting homework type.");
      setIsDialogOpen(false);
    }
  };

  const cancelDelete = () => {
    setIsDialogOpen(false);
    setDeletingId(null);
  };

  return (
    <MainDashboard>
      <ToastContainer />
      <Title>Homework Type</Title>
      <Form onSubmit={handleSubmit}>
        <InputContainer>
          <Label>Add Type</Label>
          <Input value={formData.Type} onChange={handleChange} />
        </InputContainer>
        <SubmitButton type="submit">Save</SubmitButton>
      </Form>
      <TableContainer>
        <Table>
          <thead>
            <tr>
              <Th>Type</Th>
              <Th>Action</Th>
            </tr>
          </thead>
          <tbody>
            {homeworkTypes.map((homeworkType) => (
              <tr key={homeworkType._id}>
                <Td>{homeworkType.HomeworkTypeTitle}</Td>
                <Td>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <EditButton onClick={() => handleEdit(homeworkType)}>
                      Edit
                      <Edit size={18} />
                    </EditButton>
                    <DeleteButton onClick={() => openDeleteDialog(homeworkType._id)}>
                      Delete
                      <Trash2 size={18} />
                    </DeleteButton>
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>
      {isDialogOpen && (
        <ModalOverlay>
          <ModalContent>
            <h3>Are you sure you want to delete this homework type?</h3>
            <div>
              <YesButton onClick={confirmDelete}>Yes</YesButton>
              <NoButton onClick={cancelDelete}>No</NoButton>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}
    </MainDashboard>
  );
};

export default HomeworkType;
