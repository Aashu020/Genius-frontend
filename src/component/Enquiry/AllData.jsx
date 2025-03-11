import { useState, useEffect } from "react";
import styled from "styled-components";
import { Eye, Edit, Trash2 } from "lucide-react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import axios from "axios";

// Styled components
const Container = styled.div`
  display: flex;

  background-color: #f4f4f4;
`;

const MainDashboard = styled.div`
  flex: 1;
  background-color: #f9f9f9;
  height: calc(100vh - 100px);
  overflow-y: auto;
`;

const TableContainer = styled.div`
  font-family: Arial, sans-serif;
  margin: 20px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const ButtonGroup = styled.div`
  display: flex;
  margin-bottom: 20px;
  justify-content: space-between;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  width: 32%;
`;

const OpenButton = styled(Button)`
  background-color: #7b68ee;
`;

const FollowUpButton = styled(Button)`
  background-color: #191970;
`;

const HotButton = styled(Button)`
  background-color: #fc858f;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
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

const ActionButton = styled.button`
  background-color: ${(props) => props.color};
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  margin-right: 5px;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 10px 20px;
  border-top: 1px solid #e0e0e0;
  background-color: #fff;
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
`;

const RowsPerPageDropdown = styled.select`
  margin: 0 10px;
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  font-size: 14px;
  cursor: pointer;
`;

// Modal Component
const ModalContainer = styled.div`
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
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  height: 400px;
  overflow: scroll;
`;

const CloseButton = styled.button`
  background-color: #ff4500;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const DetailRow = styled.div`
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

// Modal for Editing and Deleting
const Modal = ({ student, onClose, onUpdate, onDelete }) => {
  const [formData, setFormData] = useState(student || {});

  useEffect(() => {
    setFormData(student || {});
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  if (!student) return null;

  return (
    <ModalContainer>
      <ModalContent>
        <CloseButton onClick={onClose}>Close</CloseButton>
        <form onSubmit={handleSubmit}>
          {Object.entries(formData).map(([key, value]) => (
            <DetailRow key={key}>
              <label>
                <strong>{key}:</strong>
                <Input
                  name={key}
                  value={value}
                  onChange={handleChange}
                  required
                />
              </label>
            </DetailRow>
          ))}
          <Button type="submit" style={{ backgroundColor: '#7b68ee', color: 'white' }}>Save Changes</Button>
          <Button type="button" style={{ backgroundColor: '#fc858f', color: 'white' }} onClick={() => onDelete(student.RegistrationNo)}>Delete</Button>
        </form>
      </ModalContent>
    </ModalContainer>
  );
};

// Main StudentTable Component
const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [filteredData, setFilteredData] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("https://api.edspride.in/enquiry/all");
        setStudents(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, []);

  const handleFilter = (status) => {
    const filtered = students.filter(student => student.Status.toUpperCase() === status.toUpperCase());
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const handleViewStudent = (student) => {
    setSelectedStudent(student);
  };

  const handleCloseModal = () => {
    setSelectedStudent(null);
  };

  const handleUpdateStudent = async (updatedStudent) => {
    try {
      await axios.put(`https://api.edspride.in/enquiry/update/${updatedStudent.RegistrationNo}`, updatedStudent);
      setStudents(students.map(student => (student.RegistrationNo === updatedStudent.RegistrationNo ? updatedStudent : student)));
      setFilteredData(filteredData.map(student => (student.RegistrationNo === updatedStudent.RegistrationNo ? updatedStudent : student)));
      handleCloseModal();
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  const handleDeleteStudent = async (registrationNo) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this student?");

    if (!isConfirmed) {
      return;
    }

    try {
      await axios.delete(`https://api.edspride.in/enquiry/delete/${registrationNo}`);
      setStudents(students.filter(student => student.RegistrationNo !== registrationNo));
      setFilteredData(filteredData.filter(student => student.RegistrationNo !== registrationNo));
      handleCloseModal();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <>

      <MainDashboard>
        <TableContainer>
          <ButtonGroup>
            <OpenButton onClick={() => handleFilter("Open")}>Open</OpenButton>
            <FollowUpButton onClick={() => handleFilter("Follow Up")}>Follow Up</FollowUpButton>
            <HotButton onClick={() => handleFilter("Hot")}>Hot</HotButton>
          </ButtonGroup>
          <Table>
            <thead>
              <tr>
                <Th>Registration No</Th>
                <Th>Student Name</Th>
                <Th>Admission Class</Th>
                <Th>Parent Details</Th>
                <Th>Contact No</Th>
                <Th>View</Th>
                <Th>Status</Th>
                <Th>Action</Th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((student, index) => (
                <tr key={index}>
                  <Td>{student.RegistrationNo}</Td>
                  <Td>{student.StudentName}</Td>
                  <Td>{student.AdmissionClass}</Td>
                  <Td>{student.FatherName}</Td>
                  <Td>{student.MobileNo}</Td>
                  <Td>
                    <Eye size={18} onClick={() => handleViewStudent(student)} />
                  </Td>
                  <Td>
                  <StatusButton>{student.Status}</StatusButton>
                  </Td>
                  <Td>
                    <ActionButton color="#209A16BF" onClick={() => handleViewStudent(student)}>
                      Edit <Edit size={14} />
                    </ActionButton>
                    <ActionButton color="#ff4500" onClick={() => handleDeleteStudent(student.RegistrationNo)}>
                      <Trash2 size={14} />
                    </ActionButton>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
          <PaginationContainer>
            <PaginationInfo>
              Rows per page:
              <RowsPerPageDropdown>
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
        </TableContainer>
      </MainDashboard>

      <Modal
        student={selectedStudent}
        onClose={handleCloseModal}
        onUpdate={handleUpdateStudent}
        onDelete={handleDeleteStudent}
      />
    </>
  );
};

export default StudentTable;
