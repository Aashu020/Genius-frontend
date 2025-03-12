import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { Edit, Trash2 } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";

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

const Section = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Main = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(3, 1fr);

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
  background: #222d78;
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
  background: #222d78;
  border: none;
  border-radius: 30px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s;
  margin-top: 20px;

  &:hover {
    background: #1c2563;
  }
`;

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
`;

const YesButton = styled.button`
  background: green;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    background: darkgreen;
  }
`;

const NoButton = styled.button`
  background: red;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: darkred;
  }
`;

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
      const response = await axios.get(
        "http://localhost:8007/academic-year-info/all"
      );
      setAcademicYears(response.data);
    } catch (error) {
      console.error("Error fetching academic years:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Clear error when user starts typing
    }));
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.StartYear) tempErrors.StartYear = "Start Year is required.";
    if (!formData.StartMonth) tempErrors.StartMonth = "Start Month is required.";
    if (!formData.EndYear)
      tempErrors.EndYear = "End Year is required.";
    if (!formData.EndMonth)
      tempErrors.EndMonth = "End Month is required.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    console.log("Form Data Submitted:", formData);
    try {
      if (editingId) {
        await axios.put(
          `http://localhost:8007/academic-year-info/update/${editingId}`,
          formData
        );
        toast.success("Academic year updated successfully!");
      } else {
        await axios.post(
          "http://localhost:8007/academic-year-info/add",
          formData
        );
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
      await axios.delete(
        `http://localhost:8007/academic-year-info/delete/${deletingId}`
      );
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
      await axios.put(
        `http://localhost:8007/academic-year-info/active/${activeId}`
      );
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
      Status: "",
    });
    setEditingId(null);
  };

  return (
    <>
      <MainDashboard>
        <ToastContainer />
        <FormContainer>
          <Title>Academic Year Information</Title>
          <Form onSubmit={handleSubmit}>
            <Section>
              <Label>Details</Label>
            </Section>
            <Main>
              <InputContainer>
                <Label>Start Year</Label>
                <Input
                  type="number"
                  name="StartYear"
                  value={formData.StartYear}
                  onChange={handleChange}
                  placeholder="Enter Year"
                />
                    {errors.StartYear && (
                  <div style={{ color: "red", marginTop: "5px" }}>
                    {errors.StartYear}
                  </div>
                )}
              </InputContainer>
              <InputContainer>
                <Label>Star Month</Label>
                <Select
                  name="StartMonth"
                  value={formData.StartMonth}
                  onChange={handleChange}
                >
                  <option value="">Select Month</option>
                  {[
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                  ].map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </Select>
                {errors.StartMonth && (
                  <div style={{ color: "red", marginTop: "5px" }}>
                    {errors.StartMonth}
                  </div>
                )}
              </InputContainer>
              <InputContainer>
                <Label>End Year</Label>
                <Input
                  type="number"
                  name="EndYear"
                  value={formData.EndYear}
                  onChange={handleChange}
                  placeholder="Enter Year"
                />
                   {errors.EndYear && (
                  <div style={{ color: "red", marginTop: "5px" }}>
                    {errors.EndYear}
                  </div>
                )}
              </InputContainer>
              <InputContainer>
                <Label>End Month</Label>
                <Select
                  name="EndMonth"
                  value={formData.EndMonth}
                  onChange={handleChange}
                >
                  <option value="">Select Month</option>
                  {[
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                  ].map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </Select>
                {errors.EndMonth && (
                  <div style={{ color: "red", marginTop: "5px" }}>
                    {errors.EndMonth}
                  </div>
                )}
              </InputContainer>
              {/* <InputContainer>
                <Label>Status</Label>
                <Select name="Status" value={formData.Status} onChange={handleChange} required>
                  <option value="">Select Status</option>
                  <option value="Active">Active</option>
                  <option value="DeActive">DeActive</option>
                </Select>
              </InputContainer> */}
            </Main>
            <div
              style={{ display: "flex", gap: "10px", justifyContent: "center" }}
            >
              <SubmitButton type="submit">
                {editingId ? "Update" : "Save"}
              </SubmitButton>
            </div>
          </Form>

          <TableContainer>
            <Table>
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
                      <EditButton onClick={() => makeActive(year._id)}>
                        Active
                      </EditButton>
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
            </Table>
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
    </>
  );
};

export default AcademicYearInfo;
