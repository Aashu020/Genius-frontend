import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Edit, Trash2 } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  MainDashboard,Title,Form,InputContainer,Label,Input,SubmitButton,TableContainer,Table,Th,Td,EditButton,DeleteButton,ModalOverlay,ModalContent,YesButton,NoButton
} from "./HomeworkStyle";
import  baseURL from '../utils/Url'; 
const HomeworkType = () => {
  const [homeworkTypes, setHomeworkTypes] = useState([]);
  const [formData, setFormData] = useState({ Type: "" });
  const [editingId, setEditingId] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const fetchHomeworkTypes = async () => {
      const response = await axios.get(`${baseURL}/homeworktype/all`);
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
        await axios.put(`${baseURL}/homeworktype/update/${editingId}`, { HomeworkTypeTitle: formData.Type });
        toast.success("Homework Type updated successfully!");
      } else {
        await axios.post(`${baseURL}/homeworktype/add`, { HomeworkTypeTitle: formData.Type });
        toast.success("Homework Type added successfully!");
      }
      setFormData({ Type: "" });
      setEditingId(null);
      const response = await axios.get(`${baseURL}/homeworktype/all`);
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
      await axios.delete(`${baseURL}/homeworktype/delete/${deletingId}`);
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
                    <EditButton style={{width:'10%'}} onClick={() => handleEdit(homeworkType)}>
                      Edit
                      <Edit size={18} />
                    </EditButton>
                    <DeleteButton style={{width:'10%'}} onClick={() => openDeleteDialog(homeworkType._id)}>
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
