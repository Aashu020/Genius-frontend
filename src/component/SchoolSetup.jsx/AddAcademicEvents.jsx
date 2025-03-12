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
  AddAcademicEventHeading,
  AddAcademicEventMain,
  InputContainer,
  Label,
  AddAcademicEventInput,
  SubmitButton,
  TableContainer,
  AddAcademicEventTable,
  Th,
  Td,
  AddAcademicEventTd1,
  AddAcademicEventEditButton,
  DeleteButton,
  ModalOverlay,
  ModalContent,
  YesButton,
  NoButton,
  ErrorText,
} from "./SchoolSetupStyle";

const AddAcademicEvent = () => {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [time, setTime] = useState("");
  const [venue, setVenue] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [events, setEvents] = useState([]);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [errors, setErrors] = useState({
    title: "",
    startDate: "",
    description: "",
    endDate: "",
    time: "",
    venue: "",
    status: "",
  });

  const fetchEvents = async () => {
    try {
      const response = await axios.get("https://api.edspride.in/academicevents/all");
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
      toast.error("Failed to fetch events.");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;
    const newErrors = {
      title: "",
      startDate: "",
      description: "",
      endDate: "",
      time: "",
      venue: "",
      status: "",
    };
    if (!title.trim()) {
      newErrors.title = "Title is required.";
      isValid = false;
    }
    if (!startDate.trim()) {
      newErrors.startDate = "Start date is required.";
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
        const response = await axios.put(`https://api.edspride.in/academicevents/update/${editId}`, {
          Title: title,
          StartDate: startDate,
          EndDate: endDate,
          Time: time,
          Venue: venue,
          Description: description,
          Status: status,
        });
        setEvents(events.map((event) => (event._id === editId ? response.data : event)));
        toast.success("Event updated successfully!");
        setEditId(null);
      } else {
        const response = await axios.post("https://api.edspride.in/academicevents/add", {
          Title: title,
          StartDate: startDate,
          EndDate: endDate,
          Time: time,
          Venue: venue,
          Description: description,
          Status: status,
        });
        setEvents([...events, response.data]);
        toast.success("Event added successfully!");
      }

      setTitle("");
      setStartDate("");
      setEndDate("");
      setTime("");
      setVenue("");
      setDescription("");
      setStatus("");
      setErrors({
        title: "",
        startDate: "",
        description: "",
        endDate: "",
        time: "",
        venue: "",
        status: "",
      });
    } catch (error) {
      console.error("Error saving event:", error);
      toast.error("Error saving event.");
    }
  };

  const handleEdit = (event) => {
    setTitle(event.Title);
    setStartDate(event.StartDate);
    setEndDate(event.EndDate);
    setTime(event.Time);
    setVenue(event.Venue);
    setDescription(event.Description);
    setStatus(event.Status);
    setEditId(event._id);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`https://api.edspride.in/academicevents/delete/${deleteId}`);
      setEvents(events.filter((event) => event._id !== deleteId));
      toast.success("Event deleted successfully!");
      setShowModal(false);
      setDeleteId(null);
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("Error deleting event.");
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
        <Title>{editId ? "Edit Academic Event" : "Add Academic Event"}</Title>
        <Form onSubmit={handleSubmit}>
          <Section>
            <AddAcademicEventHeading>Event Details</AddAcademicEventHeading>
          </Section>
          <AddAcademicEventMain>
            <InputContainer>
              <Label>Event Title</Label>
              <AddAcademicEventInput
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (e.target.value.trim()) setErrors((prev) => ({ ...prev, title: "" }));
                }}
                placeholder="Enter Event Title"
              />
              {errors.title && <ErrorText>{errors.title}</ErrorText>}
            </InputContainer>

            <InputContainer>
              <Label>Start Date</Label>
              <AddAcademicEventInput
                type="date"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  if (e.target.value.trim()) setErrors((prev) => ({ ...prev, startDate: "" }));
                }}
              />
              {errors.startDate && <ErrorText>{errors.startDate}</ErrorText>}
            </InputContainer>

            <InputContainer>
              <Label>End Date</Label>
              <AddAcademicEventInput type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </InputContainer>

            <InputContainer>
              <Label>Time</Label>
              <AddAcademicEventInput type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </InputContainer>

            <InputContainer>
              <Label>Venue</Label>
              <AddAcademicEventInput type="text" value={venue} onChange={(e) => setVenue(e.target.value)} />
            </InputContainer>

            <InputContainer>
              <Label>Description</Label>
              <AddAcademicEventInput
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
                  padding: "15px 20px",
                  border: "2px solid #7d3cff",
                  borderRadius: "30px",
                  fontSize: "16px",
                  color: "#7a7a7a",
                  backgroundColor: "#f4f6fc",
                  fontWeight: "bold",
                  outline: "none",
                }}
              >
                <option value="">Select Status</option>
                <option value="Draft">Draft</option>
                <option value="Publish">Publish</option>
              </select>
            </InputContainer>
          </AddAcademicEventMain>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
            <SubmitButton type="submit">{editId ? "Update" : "Save"}</SubmitButton>
          </div>
        </Form>

        <TableContainer>
          <AddAcademicEventTable>
            <thead>
              <tr>
                <Th>Sr No</Th>
                <Th>Title</Th>
                <Th>Start Date</Th>
                <Th>End Date</Th>
                <Th>Time</Th>
                <Th>Venue</Th>
                <Th>Description</Th>
                <Th>Status</Th>
                <Th>Action</Th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => (
                <tr key={event._id}>
                  <Td>{index + 1}</Td>
                  <Td>{event.Title}</Td>
                  <Td>{event.StartDate.split("-").reverse().join("-")}</Td>
                  <Td>{event.EndDate.split("-").reverse().join("-")}</Td>
                  <Td>{event.Time}</Td>
                  <Td>{event.Venue}</Td>
                  <Td>{event.Description}</Td>
                  <Td>{event.Status}</Td>
                  <AddAcademicEventTd1>
                    <AddAcademicEventEditButton onClick={() => handleEdit(event)}>
                      Edit <Edit size={18} />
                    </AddAcademicEventEditButton>
                    <DeleteButton onClick={() => handleDelete(event._id)}>
                      <Trash2 size={18} />
                    </DeleteButton>
                  </AddAcademicEventTd1>
                </tr>
              ))}
            </tbody>
          </AddAcademicEventTable>
        </TableContainer>
      </FormContainer>
      <ToastContainer />
      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <h3>Are you sure you want to delete this event?</h3>
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

export default AddAcademicEvent;