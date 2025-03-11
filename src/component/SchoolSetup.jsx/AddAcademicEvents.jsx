import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Edit, Trash2 } from "lucide-react";

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
  padding: 15.8px 12px;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
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
  align-items: center;
`;

// Modal styles
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
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const ModalButton = styled.button`
  margin: 5px;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const YesButton = styled.button`
  margin: 5px;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: green;
  color: white;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;
const ErrorText = styled.p`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;
const NoButton = styled.button`
  margin: 5px;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: red;
  color: white;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

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

        // Validation
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
                // Update existing event
                const response = await axios.put(
                    `https://api.edspride.in/academicevents/update/${editId}`,
                    {
                        Title: title,
                        StartDate: startDate,
                        EndDate: endDate,
                        Time: time,
                        Venue: venue,
                        Description: description,
                        Status: status,
                    }
                );

                setEvents(
                    events.map((event) => (event._id === editId ? response.data : event))
                );
                toast.success("Event updated successfully!");
                setEditId(null);
            } else {
                // Create new event
                const response = await axios.post(
                    "https://api.edspride.in/academicevents/add",
                    {
                        Title: title,
                        StartDate: startDate,
                        EndDate: endDate,
                        Time: time,
                        Venue: venue,
                        Description: description,
                        Status: status,
                    }
                );

                setEvents([...events, response.data]);
                toast.success("Event added successfully!");
            }

            // Clear form fields
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
        <>
            <MainDashboard>
                <FormContainer>
                    <Title>{editId ? "Edit Academic Event" : "Add Academic Event"}</Title>
                    <Form onSubmit={handleSubmit}>
                        <Section>
                            <Heading>Event Details</Heading>
                        </Section>
                        <Main>
                            <InputContainer>
                                <Label>Event Title</Label>
                                <Input
                                    type="text"
                                    value={title}
                                    onChange={(e) => {
                                        setTitle(e.target.value);
                                        if (e.target.value.trim()) {
                                            setErrors((prev) => ({ ...prev, title: "" }));
                                        }
                                    }}
                                    placeholder="Enter Event Title"
                                />
                                {errors.title && <ErrorText>{errors.title}</ErrorText>}
                            </InputContainer>

                            <InputContainer>
                                <Label>Start Date</Label>
                                <Input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => {
                                        setStartDate(e.target.value);
                                        if (e.target.value.trim()) {
                                            setErrors((prev) => ({ ...prev, startDate: "" }));
                                        }
                                    }}
                                />
                                {errors.startDate && <ErrorText>{errors.startDate}</ErrorText>}
                            </InputContainer>

                            <InputContainer>
                                <Label>End Date</Label>
                                <Input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => {
                                        setEndDate(e.target.value);
                                    }}
                                />
                            </InputContainer>

                            <InputContainer>
                                <Label>Time</Label>
                                <Input
                                    type="time"
                                    value={time}
                                    onChange={(e) => {
                                        setTime(e.target.value);
                                    }}
                                />
                            </InputContainer>

                            <InputContainer>
                                <Label>Venue</Label>
                                <Input
                                    type="text"
                                    value={venue}
                                    onChange={(e) => {
                                        setVenue(e.target.value);
                                    }}
                                />
                            </InputContainer>

                            <InputContainer>
                                <Label>Description</Label>
                                <Input
                                    type="text"
                                    value={description}
                                    onChange={(e) => {
                                        setDescription(e.target.value);
                                        if (e.target.value.trim()) {
                                            setErrors((prev) => ({ ...prev, description: "" }));
                                        }
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

                        </Main>
                        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                            <SubmitButton type="submit">
                                {editId ? "Update" : "Save"}
                            </SubmitButton>
                        </div>
                    </Form>

                    <TableContainer>
                        <Table>
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
                                        <Td1>
                                            <EditButton onClick={() => handleEdit(event)}>
                                                Edit <Edit size={18} />
                                            </EditButton>
                                            <DeleteButton onClick={() => handleDelete(event._id)}>
                                                <Trash2 size={18} />
                                            </DeleteButton>
                                        </Td1>
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
                            <h3>Are you sure you want to delete this event?</h3>
                            <div>
                                <YesButton onClick={confirmDelete}>Yes</YesButton>
                                <NoButton onClick={cancelDelete}>No</NoButton>
                            </div>
                        </ModalContent>
                    </ModalOverlay>
                )}
            </MainDashboard>
        </>
    );
};

export default AddAcademicEvent;
