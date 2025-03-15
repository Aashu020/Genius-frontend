import React, { useState, useEffect } from "react";
import { Eye, Edit, Trash2 } from "lucide-react";
import axios from "axios";
import {
  Wrapper, StyledTable, TableHeader, HeaderCell, TableBody, BodyCell,
  StatusBadge, EditButton, DeleteButton, ModalOverlay, ModalContent,
  CloseButton, PaginationWrapper
} from "../Employee/TaskStyle";
import  baseURL from '../utils/Url'; 

const TaskTable = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [studentClass, setStudentClass] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch student ID from localStorage
  useEffect(() => {
    const studentId = localStorage.getItem("Id");

    if (studentId) {
      axios
        .get(`${baseURL}/student/get/${studentId}`)
        .then((response) => {
          const className = response.data.ClassName;
          setStudentClass(className);
        })
        .catch((err) => {
          setError("Error fetching student data");
          console.error(err);
        });
    } else {
      setError("Student ID not found in localStorage");
    }
  }, []);

  // Fetch homework data filtered by student class
  useEffect(() => {
    if (studentClass) {
      axios
        .get(`${baseURL}/homework/all`)
        .then((response) => {
          const filteredTasks = response.data.filter(
            (task) => task.Class === studentClass
          );
          setTasks(filteredTasks);
        })
        .catch((err) => {
          setError("Error fetching homework data");
          console.error(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [studentClass]);

  // Handle view button click (open modal with selected task data)
  const handleViewTask = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
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
                <BodyCell style={{ textAlign: "center", display: "flex" }}>
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
            <CloseButton onClick={closeModal}>×</CloseButton>
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