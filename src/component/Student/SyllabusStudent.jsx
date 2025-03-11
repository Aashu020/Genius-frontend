import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Importing axios
import styled from 'styled-components'; // Importing styled-components

// Styled components for layout and styling
const Container = styled.div`
   display: flex;
  background-color: #f4f4f4;
  width: calc(100vw - 250px);
`;
const MainDashboard = styled.div`
  flex: 1;
  padding: 50px;
  height: calc(100vh - 100px);
  background-color: #f9f9f9;
`;
const Title = styled.h2`
  text-align: center;
  color: #1f1f1f;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const ClassDetails = styled.div`
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
`;

const Section = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #3e3e3e;
`;

const SubjectList = styled.div`
  margin-top: 40px;
`;

const SubjectItem = styled.div`
  margin-bottom: 30px;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const SubjectTitle = styled.h4`
  color: #5a3eff;
  font-size: 22px;
  margin-bottom: 15px;
  font-weight: 600;
`;

const SyllabusList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const SyllabusItem = styled.li`
  margin-bottom: 15px;
`;

const SyllabusTitle = styled.p`
  font-weight: bold;
  color: #333;
  font-size: 18px;
  margin-bottom: 10px;
`;

const TopicList = styled.ul`
  list-style-type: none;
  padding-left: 20px;
`;

const TopicItem = styled.li`
  color: #666;
  font-size: 16px;
  margin-bottom: 5px;
`;

const LoadingMessage = styled.div`
  text-align: center;
  font-size: 18px;
  color: #333;
  margin-top: 20px;
`;

const ErrorMessage = styled.div`
  text-align: center;
  font-size: 18px;
  color: red;
  margin-top: 20px;
`;

const SyllabusStudent = () => {
    const [studentId, setStudentId] = useState(null);
    const [studentClass, setStudentClass] = useState(null);
    const [classDetails, setClassDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch studentId from localStorage when the component mounts
    useEffect(() => {
        const storedStudentId = localStorage.getItem('Id');
        if (storedStudentId) {
            setStudentId(storedStudentId);
        } else {
            setError('Student ID not found in localStorage');
        }
    }, []);

    // Fetch student data using the studentId
    useEffect(() => {
        if (studentId) {
            axios
                .get(`https://api.edspride.in/student/get/${studentId}`)
                .then((response) => {
                    const data = response.data;
                    if (data && data.ClassName) {
                        setStudentClass(data.ClassName); // Set class name from student data
                    } else {
                        setError('Class information not found for student');
                    }
                })
                .catch((err) => {
                    setError('Error fetching student data');
                    console.error(err);
                });
        }
    }, [studentId]);

    // Fetch class details based on student class name
    useEffect(() => {
        if (studentClass) {
            axios
                .get('https://api.edspride.in/class/all')
                .then((response) => {
                    const classData = response.data;
                    const classInfo = classData.find((cls) => cls.Class === studentClass);
                    if (classInfo) {
                        setClassDetails(classInfo); // Set class details
                    } else {
                        setError('Class not found');
                    }
                })
                .catch((err) => {
                    setError('Error fetching class data');
                    console.error(err);
                })
                .finally(() => {
                    setLoading(false); // Set loading to false once data is fetched
                });
        }
    }, [studentClass]);

    // Display loading message if data is still being fetched
    if (loading) {
        return <LoadingMessage>Loading student and class data...</LoadingMessage>;
    }

    // Display error message if there's an error
    if (error) {
        return <ErrorMessage>{error}</ErrorMessage>;
    }

    return (
        <Container>
            <MainDashboard>
                <Title>Syllabus for {studentClass}</Title>

                {classDetails && (
                    <ClassDetails>
                        <h3>Class: {classDetails.Class}</h3>
                        <p>Academic Year: {classDetails.AcademicYear}</p>
                        <Section>Section: {classDetails.Section.join(', ')}</Section>

                        <SubjectList>
                            {classDetails.Subjects && classDetails.Subjects.length > 0 ? (
                                classDetails.Subjects.map((subject, index) => (
                                    <SubjectItem key={index}>
                                        <SubjectTitle>{subject.Subject}</SubjectTitle>
                                        {subject.Syllabus && subject.Syllabus.length > 0 ? (
                                            <SyllabusList>
                                                {subject.Syllabus.map((syllabus, syllabusIndex) => (
                                                    <SyllabusItem key={syllabusIndex}>
                                                        <SyllabusTitle>{syllabus.Title}</SyllabusTitle>
                                                        <TopicList>
                                                            {syllabus.Topics.map((topic, topicIndex) => (
                                                                <TopicItem key={topicIndex}>{topic}</TopicItem>
                                                            ))}
                                                        </TopicList>
                                                    </SyllabusItem>
                                                ))}
                                            </SyllabusList>
                                        ) : (
                                            <p>No syllabus available for this subject.</p>
                                        )}
                                    </SubjectItem>
                                ))
                            ) : (
                                <p>No subjects available.</p>
                            )}
                        </SubjectList>
                    </ClassDetails>
                )}
            </MainDashboard>
        </Container>
    );
};

export default SyllabusStudent;
