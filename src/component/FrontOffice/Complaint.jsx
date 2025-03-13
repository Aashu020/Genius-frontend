import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import styled from "styled-components";
import { Edit, Trash2 } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Container, MainDashboard, Title, Form, Heading, Main, FormContainer,
  ErrorMessage, InputContainer, Label, Input, Select, PlusButton, SubmitButton,
  Table, Th, Td, StatusButton, PaginationContainer, PaginationInfo,
  PaginationButton, RowsPerPageDropdown
} from './FrontOfficeStyles1'; // Import styled components


const Complaint = () => {
  const [source, setSource] = useState("");
  const [type, setType] = useState("");
  const [addComplaint, setAddComplaint] = useState("");
  const [complaintFor, setComplaintFor] = useState("");
  const [complaints, setComplaints] = useState([]);
  const [complaintForOptions, setComplaintForOptions] = useState([]);
  const [newComplaintFor, setNewComplaintFor] = useState(""); // State for new Complaint For input
  const [showInput, setShowInput] = useState(false); // State for toggling input visibility
  const [errors, setErrors] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [currentComplaintId, setCurrentComplaintId] = useState(null);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get("http://localhost:8007/complaint/all");
        setComplaints(response.data);
      } catch (error) {
        console.error("Error fetching complaints:", error.response ? error.response.data : error.message);
      }
    };

    const fetchComplaintForOptions = async () => {
      try {
        const response = await axios.get("http://localhost:8007/complaintfor/all");
        setComplaintForOptions(response.data);
      } catch (error) {
        console.error("Error fetching complaint for options:", error.response ? error.response.data : error.message);
      }
    };

    fetchComplaints();
    fetchComplaintForOptions();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!source.trim()) newErrors.source = "Source is required.";
    if (!type.trim()) newErrors.type = "Type is required.";
    if (!addComplaint.trim()) newErrors.addComplaint = "Complaint is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (editMode) {
        await axios.put(`http://localhost:8007/complaint/update/${currentComplaintId}`, {
          Source: source,
          Type: type,
          AddComplaint: addComplaint,
          ComplaintFor: complaintFor,
        });
        toast.success("Edited Successfully!");
      } else {
        await axios.post("http://localhost:8007/complaint/add", {
          Source: source,
          Type: type,
          AddComplaint: addComplaint,
          ComplaintFor: complaintFor,
        });
        toast.success("Added Successfully!");
      }
      // Clear form after submission
      setSource("");
      setType("");
      setAddComplaint("");
      setComplaintFor("");
      setErrors({});
      setEditMode(false);
      setCurrentComplaintId(null);
      const response = await axios.get("http://localhost:8007/complaint/all");
      setComplaints(response.data);
    } catch (error) {
      console.error("Error submitting form:", error.response ? error.response.data : error.message);
      toast.error("Error submitting form");
    }
  };

  const handleAddComplaintFor = async () => {
    if (!newComplaintFor.trim()) {
      setErrors({ ...errors, complaintFor: "Complaint For is required." });
      return;
    }

    try {
      const response = await axios.post("http://localhost:8007/complaintfor/add", { ComplaintForName: newComplaintFor });
      toast.success("Header Added successfully!");
      setComplaintForOptions([...complaintForOptions, response.data]);
      setNewComplaintFor(""); // Clear input after adding
      setShowInput(false); // Hide input after adding
      setErrors({}); // Clear errors
    } catch (error) {
      console.error("Error adding complaint for:", error.response ? error.response.data : error.message);
      toast.error("Error adding complaint for");
    }
  };
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const totalPages = Math.ceil(tasks.length / itemsPerPage);
  const currentData = tasks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleRowsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };
  return (
    <MainDashboard>
      <ToastContainer />
      <FormContainer>
        <Title>{editMode ? "Edit Complaint" : "Add Complaint"}</Title>
        <Form onSubmit={handleSubmit}>
          <Heading>Details</Heading>
          <Main>
            <InputContainer>
              <Label>Source</Label>
              <Input
                type="text"
                placeholder="Enter Source"
                value={source}
                onChange={(e) => setSource(e.target.value)}
              />
              {errors.source && <ErrorMessage>{errors.source}</ErrorMessage>}
            </InputContainer>
            <InputContainer>
              <Label>Type</Label>
              <Input
                type="text"
                placeholder="Enter Type"
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
              {errors.type && <ErrorMessage>{errors.type}</ErrorMessage>}
            </InputContainer>
            <InputContainer>
              <Label>Complaint</Label>
              <Input
                type="text"
                placeholder="Enter Complaint"
                value={addComplaint}
                onChange={(e) => setAddComplaint(e.target.value)}
              />
              {errors.addComplaint && <ErrorMessage>{errors.addComplaint}</ErrorMessage>}
            </InputContainer>
            <InputContainer>
              <Label>Complaint For</Label>
              <Select
                value={complaintFor}
                onChange={(e) => setComplaintFor(e.target.value)}
              >
                <option value="" disabled>Select Complaint For</option>
                {complaintForOptions.map((option) => (
                  <option key={option.id} value={option.ComplaintForName}>{option.ComplaintForName}</option>
                ))}
              </Select>
              <PlusButton type="button" onClick={() => setShowInput(!showInput)}>
                +
              </PlusButton>
              {errors.complaintFor && <ErrorMessage>{errors.complaintFor}</ErrorMessage>}
            </InputContainer>
            {showInput && (
              <InputContainer>
                <Label>Add New Complaint For</Label>
                <Input
                  type="text"
                  placeholder="Enter New Complaint For"
                  value={newComplaintFor}
                  onChange={(e) => setNewComplaintFor(e.target.value)}
                />
                <SubmitButton type="button" onClick={handleAddComplaintFor}>
                  Submit
                </SubmitButton>
                {errors.complaintFor && <ErrorMessage>{errors.complaintFor}</ErrorMessage>}
              </InputContainer>
            )}
          </Main>
          <SubmitButton type="submit">
            {editMode ? "Update Complaint" : "Submit Complaint"}
          </SubmitButton>
        </Form>

        <Table>
          <thead>
            <tr>
              <Th>ID</Th>
              <Th>Source</Th>
              <Th>Type</Th>
              <Th>Complaint</Th>
              <Th>Complaint For</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint) => (
              <tr key={complaint.id}>
                <Td>{complaint.CompliantNo}</Td>
                <Td>{complaint.Source}</Td>
                <Td>{complaint.Type}</Td>
                <Td>{complaint.AddComplaint}</Td>
                <Td>{complaint.ComplaintFor}</Td>
                <Td>
                  <Edit onClick={() => {
                    setEditMode(true);
                    setCurrentComplaintId(complaint.CompliantNo);
                    setSource(complaint.Source);
                    setType(complaint.Type);
                    setAddComplaint(complaint.AddComplaint);
                    setComplaintFor(complaint.ComplaintFor);
                  }} />
                  <Trash2 onClick={async () => {
                    if (window.confirm("Are you sure you want to delete this complaint?")) {
                      try {
                        // Using CompliantNo from the complaint object
                        await axios.delete(`http://localhost:8007/complaint/delete/${complaint.CompliantNo}`);
                        const updatedComplaints = complaints.filter(c => c.CompliantNo !== complaint.CompliantNo); // Filter by CompliantNo
                        setComplaints(updatedComplaints);
                      } catch (error) {
                        console.error("Error deleting complaint:", error.response ? error.response.data : error.message);
                      }
                    }
                  }} />


                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
        <PaginationContainer>
          <PaginationInfo>
            Rows per page:
            <RowsPerPageDropdown onChange={handleRowsPerPageChange} value={itemsPerPage}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </RowsPerPageDropdown>
            {currentPage} of {totalPages}
          </PaginationInfo>

          <div>
            <PaginationButton onClick={handlePrevPage} disabled={currentPage === 1}>
              Previous
            </PaginationButton>
            <PaginationButton onClick={handleNextPage} disabled={currentPage === totalPages}>
              Next
            </PaginationButton>
          </div>
        </PaginationContainer>
      </FormContainer>
    </MainDashboard>
  );
};

export default Complaint;
