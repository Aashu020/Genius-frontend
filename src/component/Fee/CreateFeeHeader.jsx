import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { Edit, Trash2 } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
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
  width: 88%;
  padding: 15px 20px;
  border: 2px solid #7d3cff;
  border-radius: 30px;
  font-size: 16px;
  color: #7a7a7a;
  background-color: #f4f6fc;
  font-weight: bold;
  outline: none;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

const Select = styled.select`
  width: 100%;
  padding: 15px 20px;
  border: 2px solid #7d3cff;
  border-radius: 30px;
  font-size: 16px;
  color: #7a7a7a;
  background-color: #f4f6fc;
  font-weight: bold;
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
  align-items: center;
`;

const DeleteButton = styled.div`
  background-color: red;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  width: 10%;
  display: flex;
  justify-content: center;
`;

const ConfirmationModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
`;

const ConfirmButton = styled.button`
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  font-weight: bold;

  &.yes {
    background-color: green;
  }

  &.no {
    background-color: red;
  }
`;

const CreateFeeHeader = () => {
  const [headerName, setHeaderName] = useState("");
  const [revenueOption, setRevenueOption] = useState("");
  const [feeMode, setFeeMode] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});
  const [subjects, setSubjects] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get("http://localhost:8007/feeHeader/all");
        setSubjects(response.data);
      } catch (error) {
        console.error("Error fetching fee headers:", error);
      }
    };
    fetchSubjects();
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!headerName) newErrors.headerName = "Header Name is required.";
    if (!revenueOption) newErrors.revenueOption = "School Revenue option is required.";
    if (!feeMode) newErrors.feeMode = "Fee Mode selection is required.";
    if (!description) newErrors.description = "Description is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const feeHeaderData = {
        Name: headerName,
        SchoolRevenue: revenueOption === "true",
        FeeMode: feeMode,
        Description: description,
      };

      try {
        if (selectedSubject) {
          const response = await axios.put(`http://localhost:8007/feeHeader/update/${selectedSubject._id}`, feeHeaderData);
          setSubjects(subjects.map(sub => (sub._id === selectedSubject._id ? response.data : sub)));
          toast.success("Fee Header updated successfully!");
        } else {
          const response = await axios.post("http://localhost:8007/feeHeader/add", feeHeaderData);
          setSubjects(prevSubjects => [...prevSubjects, response.data]);
          toast.success("Fee Header added successfully!");
        }

        resetForm();
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error("Failed to submit data.");
      }
    }
  };

  const resetForm = () => {
    setHeaderName("");
    setRevenueOption("");
    setFeeMode("");
    setDescription("");
    setSelectedSubject(null);
  };

  const handleEdit = (subject) => {
    setSelectedSubject(subject);
    setHeaderName(subject.Name);
    setRevenueOption(subject.SchoolRevenue.toString());
    setFeeMode(subject.FeeMode);
    setDescription(subject.Description);
  };

  const handleDeleteConfirmation = (subject) => {
    setSelectedSubject(subject);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8007/feeHeader/delete/${selectedSubject._id}`);
      setSubjects(subjects.filter(sub => sub._id !== selectedSubject._id));
      toast.success("Fee Header deleted successfully!");
      setShowDeleteModal(false);
      resetForm();
      // Refresh the page
      window.location.reload();
    } catch (error) {
      console.error("Error deleting subject:", error);
      toast.error("Failed to delete fee header.");
    }
  };

  return (
    <>

      <MainDashboard>
        <ToastContainer />
        <FormContainer>
          <Title>Create Fee Header</Title>
          <Form onSubmit={handleSubmit}>
            <Section>
              <Heading>Details</Heading>
              <Heading>{selectedSubject ? "Edit" : "Add"} +</Heading>
            </Section>
            <Main>
              <InputContainer>
                <Label>Header Name</Label>
                <Input
                  type="text"
                  value={headerName}
                  onChange={(e) => setHeaderName(e.target.value)}
                />
                {errors.headerName && <ErrorMessage>{errors.headerName}</ErrorMessage>}
              </InputContainer>

              <InputContainer>
                <Label>Add to School Revenue</Label>
                <Select
                  value={revenueOption}
                  onChange={(e) => setRevenueOption(e.target.value)}
                >
                  <option value="">Select an option</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </Select>
                {errors.revenueOption && <ErrorMessage>{errors.revenueOption}</ErrorMessage>}
              </InputContainer>

              <InputContainer>
                <Label>Fee Mode</Label>
                <Select
                  value={feeMode}
                  onChange={(e) => setFeeMode(e.target.value)}
                >
                  <option value="">Select Fee Mode</option>
                  <option value="One Time">One Time</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Half Yearly">Half Yearly</option>
                </Select>
                {errors.feeMode && <ErrorMessage>{errors.feeMode}</ErrorMessage>}
              </InputContainer>

              <InputContainer>
                <Label>Description</Label>
                <Input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                {errors.description && <ErrorMessage>{errors.description}</ErrorMessage>}
              </InputContainer>
            </Main>

            <SubmitButton type="submit">{selectedSubject ? "Update" : "Submit"}</SubmitButton>
          </Form>
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <Th>Header Name</Th>
                  <Th>Fee Mode</Th>
                  <Th>Description</Th>
                  <Th>Action</Th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((subject, index) => (
                  <tr key={index}>
                    <Td>{subject.Name}</Td>
                    <Td>{subject.FeeMode}</Td>
                    <Td>{subject.Description}</Td>
                    <Td1>
                      <EditButton onClick={() => handleEdit(subject)}>
                        <p>Edit</p>
                        <Edit size={18} />
                      </EditButton>
                      <DeleteButton onClick={() => handleDeleteConfirmation(subject)}>
                        <Trash2 size={18} />
                      </DeleteButton>
                    </Td1>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableContainer>
        </FormContainer>

        {showDeleteModal && (
          <ConfirmationModal>
            <h3>Are you sure you want to delete this Fee Header?</h3>
            <ConfirmButton className="yes" onClick={handleDelete}>Yes</ConfirmButton>
            <ConfirmButton className="no" onClick={() => setShowDeleteModal(false)}>No</ConfirmButton>
          </ConfirmationModal>
        )}
      </MainDashboard>

    </>
  );
};

export default CreateFeeHeader;
