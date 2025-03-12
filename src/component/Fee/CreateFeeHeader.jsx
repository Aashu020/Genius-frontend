import React, { useState, useEffect } from "react";
import axios from "axios";
// import styled from "styled-components";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { Edit, Trash2 } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ErrorMessage,Heading,MainDashboard,Title,Form,Main,FormContainer,InputContainer,Label ,Input,Select,Container,Section,TableContainer,Table,Th,Td,Td1,EditButton,DeleteButton,ConfirmationModal,ConfirmButton,SubmitButton} from "./FeeStyles";

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
        <FormContainer style={{ backgroundColor: "white", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
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
