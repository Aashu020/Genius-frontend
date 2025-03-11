import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Edit, Trash2 } from "lucide-react";

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

const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 5px;
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
    height: 10px;
    width: 80%;
    font-size: 12px;
    padding: 12px 18px;
  }
`;

const Input1 = styled.input`
  width: 100%;
  padding: 8px 60px;
  border: 2px solid #7d3cff;
  border-radius: 30px;
  font-size: 16px;
  color: #7a7a7a;
  background-color: #f4f6fc;
  font-weight: bold;
  outline: none;
  height: 55px;
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

const TableWrapper = styled.div`
  flex: 2;
  padding: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
  }
`;

const EditButton = styled.button`
  background-color: #209a16;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  display: flex;
  align-items: center;
`;

const DeleteButton = styled.div`
  background-color: red;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  display: flex;
  align-items: center;
`;

const AcademicPlan = () => {
  const [formData, setFormData] = useState({
    Title: "",
    Description: "",
    Remarks: "",
    StartDate: "",
    EndDate: "",
    Color: "#000000",
  });

  const [events, setEvents] = useState([]);
  const [editingEventId, setEditingEventId] = useState(null);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('https://api.edspride.in/academic-year-plan/all');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };
  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingEventId) {
        // Update existing event
        const response = await axios.put(`https://api.edspride.in/academic-year-plan/update/${editingEventId}`, formData);
        toast.success("Academic Year Plan updated successfully!");
      } else {
        // Add new event
        const response = await axios.post('https://api.edspride.in/academic-year-plan/add', formData);
        toast.success("Academic Year Plan saved successfully!");
      }
      // Reset form
      setFormData({
        Title: "",
        Description: "",
        Remarks: "",
        StartDate: "",
        EndDate: "",
        Color: "#000000",
      });
      setEditingEventId(null);
      // Refresh the events list
      fetchEvents();
    } catch (error) {
      console.error("Error saving academic plan:", error);
      toast.error("Error saving academic year plan. Please try again.");
    }
  };

  const handleEdit = (event) => {
    setEditingEventId(event._id);
    setFormData({
      Title: event.Title,
      Description: event.Description,
      Remarks: event.Remarks,
      StartDate: event.StartDate,
      EndDate: event.EndDate,
      Color: event.Color,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await axios.delete(`https://api.edspride.in/academic-year-plan/delete/${id}`);
        toast.success("Event deleted successfully!");
        // Refresh the events list
        const updatedEvents = events.filter(event => event._id !== id);
        setEvents(updatedEvents);
      } catch (error) {
        console.error("Error deleting event:", error);
        toast.error("Error deleting event. Please try again.");
      }
    }
  };

  return (
    <MainDashboard>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <FormContainer>
        <Title>Academic Year Plan</Title>
        <Form onSubmit={handleSubmit}>
          <Section>
            <Heading>Details</Heading>
          </Section>
          <Main>
            <InputContainer>
              <Label>Title </Label>
              <Input type="text" name="Title" value={formData.Title} onChange={handleChange} required />
            </InputContainer>

            <InputContainer>
              <Label>Description</Label>
              <Input type="text" name="Description" value={formData.Description} onChange={handleChange} required />
            </InputContainer>

            <InputContainer>
              <Label>Remark</Label>
              <Input type="text" name="Remarks" value={formData.Remarks} onChange={handleChange} required />
            </InputContainer>

            <InputContainer>
              <Label>Start Date</Label>
              <Input type="date" name="StartDate" value={formData.StartDate} onChange={handleChange} required />
            </InputContainer>

            <InputContainer>
              <Label>End Date </Label>
              <Input type="date" name="EndDate" value={formData.EndDate} onChange={handleChange} required />
            </InputContainer>

            <InputContainer style={{ display: "flex" }}>
              <Label>Color</Label>
              <Input1 type="color" name="Color" value={formData.Color} onChange={handleChange} />
            </InputContainer>
          </Main>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
            <SubmitButton type="submit">Save</SubmitButton>
          </div>
        </Form>
      </FormContainer>
      <TableWrapper>
        <h3>Events</h3>
        <Table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Color</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map(event => (
              <tr key={event._id}>
                <td>{event.Title}</td>
                <td>{event.Description}</td>
                <td>{new Date(event.StartDate).toISOString().split("T")[0].split("-").reverse().join("-")}</td>
                <td>{new Date(event.EndDate).toISOString().split("T")[0].split("-").reverse().join("-")}</td>
                <td>
                  <span style={{ display: 'inline-block', width: '20px', height: '20px', backgroundColor: event.Color }} />
                </td>
                <td style={{display:"flex", gap:"5px"}}>
                  <EditButton onClick={() => handleEdit(event)}>
                    Edit
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Edit size={18} />
                    </div>
                  </EditButton>
                  <DeleteButton onClick={() => handleDelete(event._id)}>
                    <Trash2 size={18} />
                  </DeleteButton>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
    </MainDashboard>
  );
};

export default AcademicPlan;
