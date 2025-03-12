import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Edit, Trash2, Eye } from 'lucide-react'; // Import Eye icon
import { 
  HomeworkListContainer, HomeworkListTitle, Table, Th, Td, Td1, EditButton, DeleteButton, ViewButton, ConfirmationModal,  ModalContent, ConfirmButton, DetailModalContent 
} from "./HomeworkStyle";

const AllHomework = () => {
  const [homework, setHomework] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [homeworkDetails, setHomeworkDetails] = useState(null);

  useEffect(() => {
    const fetchHomework = async () => {
      try {
        const response = await fetch('https://api.edspride.in/homework/all');
        const data = await response.json();
        setHomework(data);
      } catch (error) {
        console.error('Error fetching homework data:', error);
      }
    };

    fetchHomework();
  }, []);

  const handlePublish = async (id) => {
    try {
      const response = await fetch(`https://api.edspride.in/homework/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Status: 'Publish' }),
      });

      if (response.ok) {
        setHomework((prev) =>
          prev.map((item) =>
            item._id === id ? { ...item, Status: 'Publish' } : item
          )
        );
        toast.success('Homework published successfully!');
      } else {
        toast.error('Failed to publish homework');
      }
    } catch (error) {
      console.error('Error publishing homework:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`https://api.edspride.in/homework/delete/${currentId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setHomework((prev) => prev.filter((item) => item._id !== currentId));
        toast.success('Homework deleted successfully!');
      } else {
        toast.error('Failed to delete homework');
      }
    } catch (error) {
      console.error('Error deleting homework:', error);
    } finally {
      setShowConfirm(false);
    }
  };

  const handleView = async (id) => {
    try {
      const response = await fetch(`https://api.edspride.in/homework/${id}`);
      const data = await response.json();
      console.log(data)
      if (response.ok) {
        setHomeworkDetails(data); 
        setShowDetailModal(true); 
      } else {
        toast.error(data.message || 'Error fetching homework details');
      }
    } catch (error) {
      console.error('Error fetching homework details:', error);
      toast.error('Failed to load homework details');
    }
  };

  return (
    <HomeworkListContainer>
      <HomeworkListTitle>All Homework</HomeworkListTitle>
      <Table>
        <thead>
          <tr>
            <Th>Date</Th>
            <Th>Type</Th>
            <Th>Class</Th>
            <Th>Section</Th>
            <Th>Subject</Th>
            <Th>Chapter</Th>
            <Th>Title</Th>
            <Th>Details</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {homework.map((item) => (
            <tr key={item._id}>
              <Td>{item.Date.split("-").reverse().join("-")}</Td>
              <Td>{item.Type}</Td>
              <Td>{item.Class}</Td>
              <Td>{item.Section}</Td>
              <Td>{item.Subject}</Td>
              <Td>{item.Chapter}</Td>
              <Td>{item.Title}</Td>
              <Td>{item.Details}</Td>
              <Td>{item.Status}</Td>
              <Td1>
                {item.Status === 'Draft' ? (
                  <EditButton onClick={() => handlePublish(item._id)}>
                    Publish
                  </EditButton>
                ) : (
                  <DeleteButton
                    onClick={() => {
                      setCurrentId(item._id);
                      setShowConfirm(true);
                    }}
                  >
                    <Trash2 size={18} />
                  </DeleteButton>
                )}
                <ViewButton onClick={() => handleView(item._id)}>
                  <Eye size={18} />
                </ViewButton>
              </Td1>
            </tr>
          ))}
        </tbody>
      </Table>

      {showConfirm && (
        <ConfirmationModal>
          <ModalContent>
            <h3>Are you sure you want to delete this homework?</h3>
            <ConfirmButton className="yes" onClick={handleDelete}>
              Yes
            </ConfirmButton>
            <ConfirmButton className="no" onClick={() => setShowConfirm(false)}>
              No
            </ConfirmButton>
          </ModalContent>
        </ConfirmationModal>
      )}

      {showDetailModal && homeworkDetails && (
        <ConfirmationModal>
          <DetailModalContent>
            <h3>Homework Details</h3>
            <p><strong>Date:</strong> {homeworkDetails.Date.split("-").reverse().join("-")}</p>
            <p><strong>Type:</strong> {homeworkDetails.Type}</p>
            <p><strong>Class:</strong> {homeworkDetails.Class}</p>
            <p><strong>Section:</strong> {homeworkDetails.Section}</p>
            <p><strong>Subject:</strong> {homeworkDetails.Subject}</p>
            <p><strong>Chapter:</strong> {homeworkDetails.Chapter}</p>
            <p><strong>Title:</strong> {homeworkDetails.Title}</p>
            <p><strong>Details:</strong> {homeworkDetails.Details}</p>
            <p><strong>Status:</strong> {homeworkDetails.Status}</p>
            {/* Display image if it exists */}
            {homeworkDetails.Image ? (
              <p style={{display:"flex", alignItems:"center"}}><strong>File:</strong><a target='_blank' href={`https://api.edspride.in/uploads/${homeworkDetails.Image}`}><Eye/></a></p>
            ) : (
              <p>No File available</p>
            )}
            <ConfirmButton className="no" onClick={() => setShowDetailModal(false)}>
              Close
            </ConfirmButton>
          </DetailModalContent>
        </ConfirmationModal>
      )}

      <ToastContainer />
    </HomeworkListContainer>
  );
};

export default AllHomework;