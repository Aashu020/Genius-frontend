import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import styled from "styled-components";
import { Edit, Trash2 } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TableWrapper } from "../Outerstyle2";

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

const Main = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
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

const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 5px;
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

const Select = styled.select`
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

const PlusButton = styled.button`
  width: 35px;
  padding: 12px;
  background: linear-gradient(270deg, #222d78 0%, #7130e4 100%);
  border: none;
  border-radius: 30px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s;
  margin-left: 10px;

  &:hover {
    background: linear-gradient(270deg, #1c2563 0%, #662acc 100%);
  }
`;

const SubmitButton = styled.button`
  width: 150px;
  padding: 12px;
  background: linear-gradient(270deg, #222d78 0%, #7130e4 100%);
  border: none;
  border-radius: 30px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s;
  margin-left: 10px;

  &:hover {
    background: linear-gradient(270deg, #1c2563 0%, #662acc 100%);
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 30px;
`;

const TableWrapper1 = styled.div`
width: 100%;
overflow-x: auto;
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

const StatusButton = styled.button`
  background-color: #ebedeb;
  color: black;
  border: none;
  padding: 5px 10px;
  border-radius: 15px;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: end; 
  align-items: center;
  padding: 10px 20px;
  border-top: 1px solid #e0e0e0;
  background-color: #fff;
  @media (max-width:480px){
    font-size: 10px;
    padding: 5px;
  }
  @media (max-width:376px){
    font-size: 8px;
    padding: 2px;
  }
`;

const PaginationInfo = styled.div`
  display: flex;
  align-items: center;
  color: #888;
`;

const PaginationButton = styled.button`
  background-color: #fff;
  color: ${(props) => (props.disabled ? "#ccc" : "#000")};
  border: none;
  padding: 5px 15px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  font-size: 14px;
  
  &:hover {
    background-color: ${(props) => (props.disabled ? "#fff" : "#f0f0f0")};
  }
  @media (max-width:480px){
    font-size: 10px;
    padding: 5px;
  }
  @media (max-width:376px){
    font-size: 8px;
    padding: 2px;
  }
`;

const RowsPerPageDropdown = styled.select`
  margin: 0 10px;
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  font-size: 14px;
  cursor: pointer;
  @media (max-width:480px){
    font-size: 10px;
  }
  @media (max-width:376px){
    font-size: 8px;
    padding: 2px;
  }
`;

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


<TableWrapper1>
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
        </TableWrapper1>
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
