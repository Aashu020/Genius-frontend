import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Eye, Edit, Trash2 } from "lucide-react";
import axios from "axios";

// Styled Components with updated constant names
const Wrapper = styled.div`
  width: 90%;
  margin: 20px auto;
  padding: 10px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: "Arial", sans-serif;
  @media (max-width: 468px) {
    width: 100%;
    padding: 0;
  }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  @media (max-width: 468px) {
    width: 95%;
    margin: 0px auto;
  }
`;

const TableHeader = styled.thead`
  color: black;
  font-weight: bolder;
`;

const HeaderCell = styled.th`
  padding: 12px;
  text-align: left;
  font-size: 14px;
  color: #666;
  font-weight: bold;
  border-bottom: 1px solid #e0e0e0;
  @media (max-width: 468px) {
    padding: 5px;
    font-size: 10px;
  }
`;

const TableBody = styled.tbody`
  color: black;
`;

const BodyCell = styled.td`
  padding: 12px;
  font-size: 14px;
  color: #333;
  border-bottom: 1px solid #e0e0e0;
  @media (max-width: 468px) {
    padding: 5px;
    font-size: 10px;
  }
`;

const StatusBadge = styled.span`
  background-color: #e0e0e0;
  padding: 5px 10px;
  border-radius: 15px;
  color: #666;
  font-size: 12px;
  @media (max-width: 468px) {
    padding: 5px;
    font-size: 8px;
  }
`;

const EditButton = styled.div`
  background-color: #209a16bf;
  padding: 5px 10px;
  font-size: 14px;
  border-radius: 5px;
  color: white;
  width: 40%;
  display: flex;
  justify-content: center;
`;

const DeleteButton = styled.div`
  background-color: red;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  width: 12%;
  display: flex;
  justify-content: center;
`;

// Modal Styles
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 600px;
  position: relative;
  @media (max-width: 468px) {
    width: 90%;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  font-size: 14px;
  color: #666;
  @media (max-width: 468px) {
    font-size: 12px;
    padding: 5px 10px;
    margin: 10px 0;
  }
`;

const TaskTable = () => {
  const [tasks, setTasks] = useState([]); // State for tasks
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [studentClass, setStudentClass] = useState(''); // State for student class
  const [selectedTask, setSelectedTask] = useState(null); // State for selected task
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state

  // Fetch student ID from localStorage
  useEffect(() => {
    const studentId = localStorage.getItem("Id"); // Retrieve studentId from localStorage

    if (studentId) {
      // Fetch student data by ID
      axios
        .get(`https://api.edspride.in/student/get/${studentId}`)
        .then((response) => {
          const className = response.data.ClassName; // Extract the ClassName from the student data
          setStudentClass(className); // Set the student class to state
        })
        .catch((err) => {
          setError("Error fetching student data");
          console.error(err);
        });
    } else {
      setError("Student ID not found in localStorage");
    }
  }, []); // This runs only once after the component mounts

  // Fetch homework data filtered by student class
  useEffect(() => {
    if (studentClass) {
      // Fetch all homework
      axios
        .get("https://api.edspride.in/homework/all")
        .then((response) => {
          // Filter homework by class
          const filteredTasks = response.data.filter(
            (task) => task.Class === studentClass
          );
          setTasks(filteredTasks); // Set the filtered tasks to state
        })
        .catch((err) => {
          setError("Error fetching homework data");
          console.error(err);
        })
        .finally(() => {
          setLoading(false); // Set loading to false after the request is complete
        });
    }
  }, [studentClass]); // This runs whenever the studentClass changes

  // Handle view button click (open modal with selected task data)
  const handleViewTask = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true); // Open the modal
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null); // Clear selected task when closing
  };

  // If still loading, show a loading message
  if (loading) {
    return <div>Loading tasks...</div>;
  }

  // If there's an error fetching the data, show an error message
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Wrapper>
      <StyledTable>
        <TableHeader>
          <tr>
            <HeaderCell>Title</HeaderCell>
            <HeaderCell>Subject</HeaderCell>
            <HeaderCell>Assigned Date</HeaderCell>
            <HeaderCell>Status</HeaderCell>
            <HeaderCell>Action Buttons</HeaderCell>
          </tr>
        </TableHeader>
        <TableBody>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <tr key={task._id}>
                <BodyCell>{task.Title}</BodyCell>
                <BodyCell>{task.Subject}</BodyCell>
                <BodyCell>{task.Date}</BodyCell>
                <BodyCell>
                  <StatusBadge>{task.Status}</StatusBadge>
                </BodyCell>
                <BodyCell style={{ textAlign: "center", display: "flex"}}>
                  
                  <div onClick={() => handleViewTask(task)}>
                    <Eye size={18} />
                  </div>
                </BodyCell>
              </tr>
            ))
          ) : (
            <tr>
              <BodyCell colSpan="5" style={{ textAlign: "center" }}>
                No tasks found for this class.
              </BodyCell>
            </tr>
          )}
        </TableBody>
      </StyledTable>

      {/* Modal for viewing homework details */}
      {isModalOpen && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={closeModal}>&times;</CloseButton>
            <h2>{selectedTask.Title}</h2>
            <p><strong>Subject:</strong> {selectedTask.Subject}</p>
            <p><strong>Date Assigned:</strong> {selectedTask.Date}</p>
            <p><strong>Status:</strong> {selectedTask.Status}</p>
            <p><strong>Details:</strong> {selectedTask.Details}</p>
          </ModalContent>
        </ModalOverlay>
      )}
    </Wrapper>
  );
};

export default TaskTable;
