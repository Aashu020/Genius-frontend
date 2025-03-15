import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for API requests
import styled from 'styled-components'; // Import styled-components for styling
import  baseURL from '../utils/Url'; 
// Styled Components
const Container1 = styled.div`
  width: 100%;
  margin: auto;
  font-family: "Arial", sans-serif;
  background-color: #fff;
  padding: 20px;
  @media (max-width: 468px) {
    padding-bottom: 10px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  color: #1a237e;
  margin-bottom: 20px;
  text-align: center;
  @media (max-width: 468px) {
    font-size: 14px;
    padding: 10px;
    margin-bottom: 10px;
  }
`;

const CardGrid = styled.div`
display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    justify-items: center;
    align-items: center;
    justify-content: center;
  @media (max-width: 468px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Card = styled.div`
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  width: 200px;
  height: 150px;
  text-align: center;
  @media (max-width: 468px) {
    width: 80%;
    height: 120px;
    padding: 4px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }
`;

const PhotoContainer = styled.div`
  text-align: center;
  margin-bottom: 10px;
`;

const Photo = styled.img`
  width: 60px;
  height: 60px;
  background-color: gray;
  border-radius: 50%;
`;

const StudentID = styled.h4`
  margin: 0;
  font-size: 14px;
  color: #333;
  @media (max-width: 468px) {
    font-size: 12px;
  }
`;

const StudentInfo = styled.p`
  font-size: 12px;
  color: #666;
  margin: 5px 0;
  @media (max-width: 468px) {
    font-size: 10px;
  }
`;

const Classmates = () => {
    const [studentId, setStudentId] = useState(null); // State to store studentId
    const [studentData, setStudentData] = useState(null); // State to store fetched student data
    const [classmates, setClassmates] = useState([]); // State to store students in the same class
    const [allStudents, setAllStudents] = useState([]); // State to store all students
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [studentClass, setStudentClass] = useState(''); // State to store the class of the student

    // Fetch studentId from localStorage when the component mounts
    useEffect(() => {
        const storedStudentId = localStorage.getItem('Id'); // Retrieve studentId from localStorage
        if (storedStudentId) {
            setStudentId(storedStudentId); // Set studentId in state
        } else {
            console.error('Student ID not found in localStorage');
        }
    }, []); // Empty dependency array ensures this runs only once after mount

    // Fetch student data using the studentId
    useEffect(() => {
        if (studentId) {
            axios
                .get(`${baseURL}/student/get/${studentId}`)
                .then((response) => {
                    setStudentData(response.data); // Set student data from API response
                    setStudentClass(response.data.ClassName); // Set student class
                })
                .catch((err) => {
                    setError('Error fetching student data'); // Handle errors
                    console.error(err);
                })
                .finally(() => {
                    setLoading(false); // Set loading to false after the request is complete
                });
        }
    }, [studentId]); // Fetch student data when studentId changes

    // Fetch all students (not filtered by class)
    useEffect(() => {
        axios
            .get(`${baseURL}/student/all`) // Fetch all students
            .then((response) => {
                setAllStudents(response.data); // Store all students data
            })
            .catch((err) => {
                setError('Error fetching all students data');
                console.error(err);
            });
    }, []); // This only runs once after mount

    // Filter the students by the class of the current student
    useEffect(() => {
        if (studentClass && allStudents.length > 0) {
            // Filter students based on the class
            const classmatesInSameClass = allStudents.filter(
                (student) => student.ClassName === studentClass && student._id !== studentId // Exclude the current student
            );
            setClassmates(classmatesInSameClass); // Set filtered classmates
        }
    }, [studentClass, allStudents, studentId]); // Runs whenever studentClass or allStudents change

    // If still loading, show a loading message
    if (loading) {
        return <div>Loading student data...</div>;
    }

    // If there's an error fetching the data, show an error message
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <Container1>

            <SectionTitle>Classmates in {studentClass}</SectionTitle>
            <CardGrid>
                {classmates.length > 0 ? (
                    classmates.map((classmate) => (
                        <Card key={classmate._id}>
                            <PhotoContainer>
                            <Photo src={`${baseURL}/uploads/${classmate?.Document?.StudentPhoto}`} alt="Student" />
                            </PhotoContainer>
                            <StudentID>{classmate.StudentName}</StudentID>
                            <StudentID>{classmate.RollNo}</StudentID>
                            <StudentID>{classmate.House}</StudentID>

                        </Card>
                    ))
                ) : (
                    <p>No classmates found in this class.</p>
                )}
            </CardGrid>
        </Container1>
    );
};

export default Classmates;
