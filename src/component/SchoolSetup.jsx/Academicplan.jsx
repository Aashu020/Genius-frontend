import React, { useEffect, useState } from "react";
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
  AcademicPlanMain,
  InputContainer,
  Label,
  AcademicPlanInput,
  AcademicPlanInput1,
  SubmitButton,
  TableWrapper,
  AcademicPlanTable,
  EditButton,
  DeleteButton,
} from "./SchoolSetupStyle";

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
      const response = await axios.get('http://localhost:8007/academic-year-plan/all');
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
        const response = await axios.put(`https://api.edspride.in/academic-year-plan/update/${editingEventId}`, formData);
        toast.success("Academic Year Plan updated successfully!");
      } else {
        const response = await axios.post('https://api.edspride.in/academic-year-plan/add', formData);
        toast.success("Academic Year Plan saved successfully!");
      }
      setFormData({
        Title: "",
        Description: "",
        Remarks: "",
        StartDate: "",
        EndDate: "",
        Color: "#000000",
      });
      setEditingEventId(null);
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
        await axios.delete(`http://localhost:8007/academic-year-plan/delete/${id}`);
        toast.success("Event deleted successfully!");
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
            <AcademicPlanHeading>Details</AcademicPlanHeading>
          </Section>
          <AcademicPlanMain>
            <InputContainer>
              <Label>Title</Label>
              <AcademicPlanInput type="text" name="Title" value={formData.Title} onChange={handleChange} required />
            </InputContainer>

            <InputContainer>
              <Label>Description</Label>
              <AcademicPlanInput type="text" name="Description" value={formData.Description} onChange={handleChange} required />
            </InputContainer>

            <InputContainer>
              <Label>Remark</Label>
              <AcademicPlanInput type="text" name="Remarks" value={formData.Remarks} onChange={handleChange} required />
            </InputContainer>

            <InputContainer>
              <Label>Start Date</Label>
              <AcademicPlanInput type="date" name="StartDate" value={formData.StartDate} onChange={handleChange} required />
            </InputContainer>

            <InputContainer>
              <Label>End Date</Label>
              <AcademicPlanInput type="date" name="EndDate" value={formData.EndDate} onChange={handleChange} required />
            </InputContainer>

            <InputContainer style={{ display: "flex" }}>
              <Label>Color</Label>
              <AcademicPlanInput1 type="color" name="Color" value={formData.Color} onChange={handleChange} />
            </InputContainer>
          </AcademicPlanMain>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
            <SubmitButton type="submit">Save</SubmitButton>
          </div>
        </Form>
      </FormContainer>
      <TableWrapper>
        <h3>Events</h3>
        <AcademicPlanTable>
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
        </AcademicPlanTable>
      </TableWrapper>
    </MainDashboard>
  );
};

export default AcademicPlan;