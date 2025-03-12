import React, { useEffect, useState } from "react";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
  width: 100%;
  margin: auto;
  font-family: "Arial", sans-serif;
  background-color: #fff;
  @media (max-width: 468px) {
    padding-bottom: 10px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  color: #1a237e;
  margin-bottom: 20px;
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
  @media (max-width: 468px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Card = styled.div`
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  width: 95px;
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
  /* margin-bottom: 20px; */
`;

const Photo = styled.img`
  width: 40px;
  height: 40px;
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

const NewAdmissions = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('https://api.edspride.in/student/all');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        console.log('Fetched students:', data);

        // Get today's date and calculate the date range for the last 2-3 days
        const today = new Date();
        const twoDaysAgo = new Date(today);
        const threeDaysAgo = new Date(today);
        twoDaysAgo.setDate(today.getDate() - 2);
        threeDaysAgo.setDate(today.getDate() - 3);

        // console.log('Two days ago:', twoDaysAgo, 'Three days ago:', threeDaysAgo);
        // Filter students based on the admission date
        const recentAdmissions = data.filter(student => {
          const admissionDate = new Date(student.AdmissionDate.split("-").reverse().join("-"));
          return admissionDate >= threeDaysAgo || admissionDate <= twoDaysAgo;
        });

        // console.log('Recent admissions:', recentAdmissions);

        // Sort recent admissions by admission date in descending order
        recentAdmissions.sort((a, b) => new Date(b.AdmissionDate.split("-").reverse().join("-")) -
        
        new Date(a.AdmissionDate.split("-").reverse().join("-")));

        // Limit to the most recent 6 admissions
        const limitedRecentAdmissions = recentAdmissions.slice(0, 6);

        console.log('Limited recent admissions:', limitedRecentAdmissions);

        if (limitedRecentAdmissions.length > 0) {
          setStudents(limitedRecentAdmissions);
        } else {
          // If no recent admissions, show older admissions
          const olderAdmissions = data.filter(student => {
            const admissionDate = new Date(student.AdmissionDate);
            return admissionDate < threeDaysAgo;
          });

          console.log('Older admissions:', olderAdmissions);

          // Sort older admissions by admission date in descending order
          olderAdmissions.sort((a, b) => new Date(b.AdmissionDate) - new Date(a.AdmissionDate));

          // Limit to the most recent 6 older admissions if needed
          const limitedOlderAdmissions = olderAdmissions.slice(0, 6);
          console.log('Limited older admissions:', limitedOlderAdmissions);
          setStudents(limitedOlderAdmissions);
        }
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);



  return (
    <Container>
      <SectionTitle>New Admission</SectionTitle>
      <CardGrid>
        {students.length > 0 ? (
          students.map((student) => (
            <Card key={student._id}>
              <PhotoContainer>
                <Photo src={`https://api.edspride.in/uploads/${student?.Document?.StudentPhoto}`} alt="Student" />
              </PhotoContainer>
              <StudentID>Student ID: {student.StudentId}</StudentID>
              <StudentInfo>Name: {student.StudentName}</StudentInfo>
              <StudentInfo>Class: {student.ClassName}</StudentInfo>
            </Card>
          ))
        ) : (
          <StudentInfo>No admissions available.</StudentInfo>
        )}
      </CardGrid>
    </Container>
  );
};

export default NewAdmissions;