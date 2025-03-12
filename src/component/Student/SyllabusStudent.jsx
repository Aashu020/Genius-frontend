import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Importing axios
import styled from 'styled-components'; // Importing styled-components

// Styled components for layout and styling
import {
    Container2, MainDashboard, Title, ClassDetails, Section, SubjectList,
    SubjectItem, SubjectTitle, SyllabusList, SyllabusItem, SyllabusTitle,
    TopicList, TopicItem, LoadingMessage, ErrorMessage
  } from '../Subject/SubjectStyle';

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
                .get(`http://localhost:8007/student/get/${studentId}`)
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
                .get('http://localhost:8007/class/all')
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
