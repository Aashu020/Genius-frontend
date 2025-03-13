import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Edit, Trash2 } from "lucide-react";
import {
  MainDashboard,
  Title,
  FormContainer,
  Form,
  Section,
  AcademicPlanHeading,
  AddNoticeBoxMain,
  InputContainer,
  Label,
  Input,
  SubmitButton,
  TableContainer,
  Table,
  Th,
  Td,
  AddNoticeBoxTd1,
  EditButton,
  DeleteButton,
  ModalOverlay,
  ModalContent,
  YesButton,
  NoButton,
  ErrorText,
} from "./SchoolSetupStyle";

const AddNoticeBox = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [notices, setNotices] = useState([]);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [errors, setErrors] = useState({ title: "", date: "", description: "" });

  const fetchNotices = async () => {
    try {
      const response = await axios.get("https://api.edspride.in/noticebox/all");
      setNotices(response.data);
    } catch (error) {
      console.error("Error fetching notices:", error);
      toast.error("Failed to fetch notices.");
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;
    const newErrors = { title: "", date: "", description: "" };
    if (!title.trim()) {
      newErrors.title = "Title is required.";
      isValid = false;
    }
    if (!date.trim()) {
      newErrors.date = "Date is required.";
      isValid = false;
    }
    if (!description.trim()) {
      newErrors.description = "Description is required.";
      isValid = false;
    }
    setErrors(newErrors);

    if (!isValid) return;

    try {
      if (editId) {
        const response = await axios.put(`https://api.edspride.in/noticebox/update/${editId}`, {
          Title: title,
          Date: date,
          Time: time,
          Description: description,
          Status: status,
        });
        setNotices(notices.map((notice) => (notice._id === editId ? response.data : notice)));
        toast.success("Notice updated successfully!");
        setEditId(null);
      } else {
        const response = await axios.post("https://api.edspride.in/noticebox/add", {
          Title: title,
          Date: date,
          Time: time,
          Description: description,
          Status: status,
        });
        setNotices([...notices, response.data]);
        toast.success("Notice added successfully!");
      }
      setTitle("");
      setDate("");
      setTime("");
      setDescription("");
      setStatus("");
      setErrors({ title: "", date: "", description: "" });
    } catch (error) {
      console.error("Error saving notice:", error);
      toast.error("Error saving notice.");
    }
  };

  const handleEdit = (notice) => {
    setTitle(notice.Title);
    setDate(notice.Date);
    setTime(notice.Time);
    setDescription(notice.Description);
    setStatus(notice.Status);
    setEditId(notice._id);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`https://api.edspride.in/noticebox/delete/${deleteId}`);
      setNotices(notices.filter((notice) => notice._id !== deleteId));
      toast.success("Notice deleted successfully!");
      setShowModal(false);
      setDeleteId(null);
    } catch (error) {
      console.error("Error deleting notice:", error);
      toast.error("Error deleting notice.");
      setShowModal(false);
    }
  };

  const cancelDelete = () => {
    setShowModal(false);
    setDeleteId(null);
  };

  return (
    <MainDashboard>
      <FormContainer>
        <Title>{editId ? "Edit Notice" : "Add Notice"}</Title>
        <Form onSubmit={handleSubmit}>
          <Section>
            <AcademicPlanHeading>Notice Details</AcademicPlanHeading>
          </Section>
          <AddNoticeBoxMain>
            <InputContainer>
              <Label>Notice Title</Label>
              <Input
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (e.target.value.trim()) setErrors((prev) => ({ ...prev, title: "" }));
                }}
                placeholder="Enter Notice Title"
              />
              {errors.title && <ErrorText>{errors.title}</ErrorText>}
            </InputContainer>

            <InputContainer>
              <Label>Date</Label>
              <Input
                type="date"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                  if (e.target.value.trim()) setErrors((prev) => ({ ...prev, date: "" }));
                }}
              />
              {errors.date && <ErrorText>{errors.date}</ErrorText>}
            </InputContainer>

            <InputContainer>
              <Label>Time</Label>
              <Input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </InputContainer>

            <InputContainer>
              <Label>Description</Label>
              <Input
                type="text"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  if (e.target.value.trim()) setErrors((prev) => ({ ...prev, description: "" }));
                }}
                placeholder="Enter Description"
              />
              {errors.description && <ErrorText>{errors.description}</ErrorText>}
            </InputContainer>

            <InputContainer>
              <Label>Status</Label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                style={{
                  width: "93%",
                  padding: "10px 16px",
                  border: "2px solid #7d3cff",
                  borderRadius: "30px",
                  fontSize: "12px",
                  color: "#7a7a7a",
                  backgroundColor: "#f4f6fc",
                  fontWeight: "bold",
                  height: "6vh",
                  outline: "none",
                }}
              >
                <option value="">Select Status</option>
                <option value="Draft">Draft</option>
                <option value="Publish">Publish</option>
              </select>
            </InputContainer>
          </AddNoticeBoxMain>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
            <SubmitButton type="submit">{editId ? "Update" : "Save"}</SubmitButton>
          </div>
        </Form>

        <TableContainer>
          <Table>
            <thead>
              <tr>
                <Th>Sr No</Th>
                <Th>Title</Th>
                <Th>Date</Th>
                <Th>Time</Th>
                <Th>Description</Th>
                <Th>Status</Th>
                <Th>Action</Th>
              </tr>
            </thead>
            <tbody>
              {notices.map((notice, index) => (
                <tr key={notice._id}>
                  <Td>{index + 1}</Td>
                  <Td>{notice.Title}</Td>
                  <Td>{notice.Date.split("-").reverse().join("-")}</Td>
                  <Td>{notice.Time}</Td>
                  <Td>{notice.Description}</Td>
                  <Td>{notice.Status}</Td>
                  <AddNoticeBoxTd1>
                    <EditButton onClick={() => handleEdit(notice)}>
                      Edit <Edit size={18} />
                    </EditButton>
                    <DeleteButton onClick={() => handleDelete(notice._id)}>
                      <Trash2 size={18} />
                    </DeleteButton>
                  </AddNoticeBoxTd1>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      </FormContainer>
      <ToastContainer />
      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <h3>Are you sure you want to delete this notice?</h3>
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

export default AddNoticeBox;