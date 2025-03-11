import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { Edit, Trash2 } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  @media (max-width: 480px) {
    font-size: 12px;
    height: 30px;
    width: 50%;
    margin-bottom: 30px;
    margin-top: 20px;
  }
`;

const Section = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Main = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(3, 1fr);

  @media (max-width: 480px) {
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
  cursor: pointer;
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
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
`;

const ConfirmButton = styled.button`
  margin: 0 10px;
  padding: 10px 20px;
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

const Addperiod = () => {
  const [formData, setFormData] = useState({
    Title: "",
    StartTime: "",
    EndTime: "",
  });

  const [errors, setErrors] = useState({});
  const [expense, setExpense] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Fetch existing periods
    const fetchPeriods = async () => {
      try {
        const response = await axios.get("https://api.edspride.in/period/all");
        setExpense(response.data);
      } catch (err) {
        console.error("Error fetching periods:", err);
      }
    };
    fetchPeriods();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.Title) newErrors.Title = "Title is required";
    if (!formData.StartTime) newErrors.StartTime = "Starting Time is required";
    if (!formData.EndTime) newErrors.EndTime = "Ending Time is required";
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
      if (isEditing) {
        const response = await axios.put(`https://api.edspride.in/period/update/${currentId}`, formData);
        setExpense(expense.map(item => item._id === currentId ? response.data : item));
        toast.success("Period updated successfully!");
      } else {
        const response = await axios.post("https://api.edspride.in/period/add", formData);
        setExpense([...expense, response.data]);
        toast.success("Period added successfully!");
      }
      setFormData({ Title: "", StartTime: "", EndTime: "" });
      setIsEditing(false);
      setCurrentId(null);
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  const handleEdit = (item) => {
    setFormData({ Title: item.Title, StartTime: item.StartTime, EndTime: item.EndTime });
    setIsEditing(true);
    setCurrentId(item._id);
  };

  const handleDeleteConfirmation = (id) => {
    setShowModal(true);
    setCurrentId(id);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://api.edspride.in/period/delete/${currentId}`);
      setExpense(expense.filter(item => item._id !== currentId));
      toast.success("Period deleted successfully!");
    } catch (err) {
      console.error("Error deleting period:", err);
    } finally {
      setShowModal(false);
      setCurrentId(null);
    }
  };

  return (
    <>

      <MainDashboard>
        <ToastContainer />
        <FormContainer>
          <Title>Add Period</Title>
          <Form onSubmit={handleSubmit}>
            <Section>
              <Heading>Details</Heading>
              <Heading>Add +</Heading>
            </Section>
            <Main>
              <InputContainer>
                <Label>Title</Label>
                <Input
                  type="text"
                  name="Title"
                  value={formData.Title}
                  onChange={handleChange}
                />
                {errors.Title && (
                  <div style={{ color: "red", marginTop: "5px" }}>
                    {errors.Title}
                  </div>
                )}
              </InputContainer>
              <InputContainer>
                <Label>Starting Time</Label>
                <Input
                  type="time"
                  name="StartTime"
                  value={formData.StartTime}
                  onChange={handleChange}
                />
                {errors.StartTime && (
                  <div style={{ color: "red", marginTop: "5px" }}>
                    {errors.StartTime}
                  </div>
                )}
              </InputContainer>
              <InputContainer>
                <Label>Ending Time</Label>
                <Input
                  type="time"
                  name="EndTime"
                  value={formData.EndTime}
                  onChange={handleChange}
                />
                {errors.EndTime && (
                  <div style={{ color: "red", marginTop: "5px" }}>
                    {errors.EndTime}
                  </div>
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
              <SubmitButton type="button">Cancel</SubmitButton>
              <SubmitButton type="submit">{isEditing ? "Update" : "Save"}</SubmitButton>
            </div>
          </Form>

          <Table>
            <thead>
              <tr>
                <Th>Title</Th>
                <Th>Time</Th>
                <Th>Action</Th>
              </tr>
            </thead>
            <tbody>
              {expense.map((item) => (
                <tr key={item._id}>
                  <Td>{item.Title}</Td>
                  <Td>{item.StartTime} - {item.EndTime}</Td>
                  <Td1>
                    <EditButton onClick={() => handleEdit(item)}>
                      Edit
                      <Edit size={18} />
                    </EditButton>
                    <DeleteButton onClick={() => handleDeleteConfirmation(item._id)}>
                      <Trash2 size={18} />
                    </DeleteButton>
                  </Td1>
                </tr>
              ))}
            </tbody>
          </Table>
        </FormContainer>
        {showModal && (
          <ConfirmationModal>
            <ModalContent>
              <h3>Are you sure you want to delete this period?</h3>
              <ConfirmButton className="yes" onClick={handleDelete}>Yes</ConfirmButton>
              <ConfirmButton className="no" onClick={() => setShowModal(false)}>No</ConfirmButton>
            </ModalContent>
          </ConfirmationModal>
        )}
      </MainDashboard>

    </>
  );
};

export default Addperiod;
