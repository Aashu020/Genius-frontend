import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Edit, Trash2 } from "lucide-react";
import  baseURL from '../utils/Url'; 
import {
  MainDashboard,
  Title,
  FormContainer,
  Form,
  Section,
  Label,
  AcademicYearMain,
  InputContainer,
  AcademicYearInput,
  AcademicYearSelect,
  AcademicYearSubmitButton,
  TableContainer,
  AcademicYearTable,
  Th,
  Td,
  Td1,
  EditButton,
  DeleteButton,
  ModalOverlay,
  ModalContent,
  YesButton,
  NoButton,
} from "./SchoolSetupStyle";

const AcademicYearInfo = () => {
  const [academicYears, setAcademicYears] = useState([]);
  const [formData, setFormData] = useState({
    StartYear: "",
    StartMonth: "",
    EndYear: "",
    EndMonth: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchAcademicYears();
  }, []);

  const fetchAcademicYears = async () => {
    try {
      const response = await axios.get(`${baseURL}/academic-year-info/all`);
      setAcademicYears(response.data);
    } catch (error) {
      console.error("Error fetching academic years:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.StartYear) tempErrors.StartYear = "Start Year is required.";
    if (!formData.StartMonth) tempErrors.StartMonth = "Start Month is required.";
    if (!formData.EndYear) tempErrors.EndYear = "End Year is required.";
    if (!formData.EndMonth) tempErrors.EndMonth = "End Month is required.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      if (editingId) {
        await axios.put(`${baseURL}/academic-year-info/update/${editingId}`, formData);
        toast.success("Academic year updated successfully!");
      } else {
        await axios.post(`${baseURL}/academic-year-info/add`, formData);
        toast.success("Academic year created successfully!");
      }
      fetchAcademicYears();
      resetForm();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error saving academic year!");
    }
  };

  const handleEdit = (year) => {
    setFormData(year);
    setEditingId(year._id);
  };

  const handleDelete = (id) => {
    setDeletingId(id);
    setShowModal(true);
  };

  const makeActive = (id) => {
    setActiveId(id);
    setShowEditModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${baseURL}/academic-year-info/delete/${deletingId}`);
      setAcademicYears(academicYears.filter((year) => year._id !== deletingId));
      toast.success("Academic year deleted successfully!");
      setShowModal(false);
      setDeletingId(null);
    } catch (error) {
      console.error("Error deleting academic year:", error);
      toast.error("Error deleting academic year.");
      setShowModal(false);
    }
  };

  const confirmActive = async () => {
    try {
      await axios.put(`${baseURL}/academic-year-info/active/${activeId}`);
      toast.success("Academic year activated successfully!");
      setShowEditModal(false);
      setActiveId(null);
      fetchAcademicYears();
    } catch (error) {
      console.error("Error Activating academic year:", error);
      toast.error("Error Activating academic year.");
      setShowEditModal(false);
    }
  };

  const cancelDelete = () => {
    setShowModal(false);
    setDeletingId(null);
  };

  const cancelActive = () => {
    setShowEditModal(false);
    setActiveId(null);
  };

  const resetForm = () => {
    setFormData({
      StartYear: "",
      StartMonth: "",
      EndYear: "",
      EndMonth: "",
    });
    setEditingId(null);
  };

  return (
    <MainDashboard>
      <ToastContainer />
      <FormContainer>
        <Title>Academic Year Information</Title>
        <Form onSubmit={handleSubmit}>
          <Section>
            <Label>Details</Label>
          </Section>
          <AcademicYearMain>
            <InputContainer>
              <Label>Start Year</Label>
              <AcademicYearInput
                type="number"
                name="StartYear"
                value={formData.StartYear}
                onChange={handleChange}
                placeholder="Enter Year"
              />
              {errors.StartYear && (
                <div style={{ color: "red", marginTop: "5px" }}>{errors.StartYear}</div>
              )}
            </InputContainer>
            <InputContainer>
              <Label>Start Month</Label>
              <AcademicYearSelect name="StartMonth" value={formData.StartMonth} onChange={handleChange}>
                <option value="">Select Month</option>
                {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month) => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </AcademicYearSelect>
              {errors.StartMonth && (
                <div style={{ color: "red", marginTop: "5px" }}>{errors.StartMonth}</div>
              )}
            </InputContainer>
            <InputContainer>
              <Label>End Year</Label>
              <AcademicYearInput
                type="number"
                name="EndYear"
                value={formData.EndYear}
                onChange={handleChange}
                placeholder="Enter Year"
              />
              {errors.EndYear && (
                <div style={{ color: "red", marginTop: "5px" }}>{errors.EndYear}</div>
              )}
            </InputContainer>
            <InputContainer>
              <Label>End Month</Label>
              <AcademicYearSelect name="EndMonth" value={formData.EndMonth} onChange={handleChange}>
                <option value="">Select Month</option>
                {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month) => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </AcademicYearSelect>
              {errors.EndMonth && (
                <div style={{ color: "red", marginTop: "5px" }}>{errors.EndMonth}</div>
              )}
            </InputContainer>
          </AcademicYearMain>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
            <AcademicYearSubmitButton type="submit">{editingId ? "Update" : "Save"}</AcademicYearSubmitButton>
          </div>
        </Form>

        <TableContainer>
          <AcademicYearTable>
            <thead>
              <tr>
                <Th>Start Year</Th>
                <Th>Start Month</Th>
                <Th>End Year</Th>
                <Th>End Month</Th>
                <Th>Year</Th>
                <Th>Status</Th>
                <Th>Action</Th>
                <Th>Active</Th>
              </tr>
            </thead>
            <tbody>
              {academicYears.map((year) => (
                <tr key={year._id}>
                  <Td>{year.StartYear}</Td>
                  <Td>{year.StartMonth}</Td>
                  <Td>{year.EndYear}</Td>
                  <Td>{year.EndMonth}</Td>
                  <Td>{year.AcademicYear}</Td>
                  <Td>{year.Status}</Td>
                  <Td>
                    <EditButton onClick={() => makeActive(year._id)}>Active</EditButton>
                  </Td>
                  <Td1>
                    <EditButton onClick={() => handleEdit(year)}>
                      Edit
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Edit size={18} />
                      </div>
                    </EditButton>
                    <DeleteButton onClick={() => handleDelete(year._id)}>
                      <Trash2 size={18} />
                    </DeleteButton>
                  </Td1>
                </tr>
              ))}
            </tbody>
          </AcademicYearTable>
        </TableContainer>
      </FormContainer>

      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <h3>Are you sure you want to delete this academic year?</h3>
            <div>
              <YesButton onClick={confirmDelete}>Yes</YesButton>
              <NoButton onClick={cancelDelete}>No</NoButton>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}

      {showEditModal && (
        <ModalOverlay>
          <ModalContent>
            <h3>{`Are you sure you want to Active this academic year?`}</h3>
            <div>
              <YesButton onClick={confirmActive}>Yes</YesButton>
              <NoButton onClick={cancelActive}>No</NoButton>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}
    </MainDashboard>
  );
};

export default AcademicYearInfo;