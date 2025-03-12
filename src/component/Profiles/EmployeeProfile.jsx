import React, { useState, useEffect } from "react";
import styled from "styled-components";
import logo from "../../assets/Images/EDSP3.jpg";
import { BsArrowReturnRight } from "react-icons/bs";

// Styled components
const Container = styled.div`
  height: calc(100vh - 100px);
  overflow-y: auto;
  margin: 0 auto;
`;

const AdmissionLetterContainer = styled.div`
  width: 1000px;
  padding: 20px;
  border: 1px solid #ccc;
  font-family: Arial, sans-serif;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const Logo = styled.img`
  height: 60px;
`;

const Title = styled.h2`
  color: #4a4a4a;
`;

const Section1 = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-bottom: 20px;
  gap: 1rem;
`;

const LeftColumn = styled.div`
  width: 100%;
`;

const Label = styled.p`
  margin: 0;
  font-size: 14px;
  color: #555;
  font-weight: bold;
  border-bottom: 0.5px solid black;
  width: 60%;
`;

const Value = styled.p`
  margin: 0;
  font-size: 14px;
  color: black;
  font-weight: bold;
  margin-bottom: 10px;
`;

const PhotoContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const Photo = styled.img`
  width: 200px;
  height: 200px;
  background-color: gray;
  border-radius: 50%;
`;

const EmployeeProfile = () => {
  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const staffId = localStorage.getItem("Id"); // Fetching ID from local storage
    if (staffId) {
      const fetchStaff = async () => {
        try {
          const response = await fetch(`http://localhost:8007/staff/get/${staffId}`);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          setStaff(data);
        } catch (error) {
          console.error("Error fetching staff data:", error);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchStaff();
    } else {
      console.error("Staff ID not found in local storage.");
      setError("Staff ID not found in local storage.");
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <p>Loading staff details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Container>
      <AdmissionLetterContainer>
        <Header>
          <Logo src={logo} alt="School Logo" />
          <Title>Dev International School</Title>
          <h2 style={{ color: "#222d78", fontWeight: "bold", marginTop: "10px" }}>Staff Details</h2>
        </Header>

        <PhotoContainer>
          <Photo src={`http://localhost:8007/uploads/${staff?.Documents?.Photo}`} alt="Staff" />
        </PhotoContainer>

        <Section1>
          <LeftColumn>
            <Label>Employee ID:</Label>
            <Value><BsArrowReturnRight style={{ color: "black" }} />&nbsp;{staff?.EmployeeId}</Value>
            <Label>Name:</Label>
            <Value><BsArrowReturnRight style={{ color: "black" }} />&nbsp;{staff?.Name}</Value>
            <Label>Date of Birth:</Label>
            <Value><BsArrowReturnRight style={{ color: "black" }} />&nbsp;{staff?.DOB}</Value>
            <Label>Gender:</Label>
            <Value><BsArrowReturnRight style={{ color: "black" }} />&nbsp;{staff?.Gender}</Value>
            <Label>Role:</Label>
            <Value><BsArrowReturnRight style={{ color: "black" }} />&nbsp;{staff?.Role}</Value>
            <Label>Department:</Label>
            <Value><BsArrowReturnRight style={{ color: "black" }} />&nbsp;{staff?.Department}</Value>
            <Label>Email:</Label>
            <Value><BsArrowReturnRight style={{ color: "black" }} />&nbsp;{staff?.Email}</Value>
            <Label>Mobile No:</Label>
            <Value><BsArrowReturnRight style={{ color: "black" }} />&nbsp;{staff?.MobileNo}</Value>
            <Label>Address:</Label>
            <Value><BsArrowReturnRight style={{ color: "black" }} />&nbsp;{staff?.Address}</Value>
          </LeftColumn>

          <LeftColumn>
            <Label>Qualification:</Label>
            <Value><BsArrowReturnRight style={{ color: "black" }} />&nbsp;{staff?.Documents?.QualificationCertificate}</Value>
            <Label>Experience:</Label>
            <Value><BsArrowReturnRight style={{ color: "black" }} />&nbsp;{staff?.Experience}</Value>
            <Label>Salary:</Label>
            <Value><BsArrowReturnRight style={{ color: "black" }} />&nbsp;{staff?.Salary}</Value>
            <Label>Blood Group:</Label>
            <Value><BsArrowReturnRight style={{ color: "black" }} />&nbsp;{staff?.BloodGroup}</Value>
            <Label>Marital Status:</Label>
            <Value><BsArrowReturnRight style={{ color: "black" }} />&nbsp;{staff?.MaritalStatus}</Value>
            <Label>Language Known:</Label>
            <Value><BsArrowReturnRight style={{ color: "black" }} />&nbsp;{staff?.LanguageKnown.join(", ")}</Value>
          </LeftColumn>

          <LeftColumn>
            <Label>Emergency Contact Name:</Label>
            <Value><BsArrowReturnRight style={{ color: "black" }} />&nbsp;{staff?.EmergencyContact?.Name}</Value>
            <Label>Emergency Contact Mobile:</Label>
            <Value><BsArrowReturnRight style={{ color: "black" }} />&nbsp;{staff?.EmergencyContact?.MobileNo}</Value>
            <Label>Last School:</Label>
            <Value><BsArrowReturnRight style={{ color: "black" }} />&nbsp;{staff?.LastSchool}</Value>
            <Label>Referred By:</Label>
            <Value><BsArrowReturnRight style={{ color: "black" }} />&nbsp;{staff?.ReferredName}</Value>
            <Label>Referred Contact:</Label>
            <Value><BsArrowReturnRight style={{ color: "black" }} />&nbsp;{staff?.ReferredContact}</Value>
          </LeftColumn>
        </Section1>
      </AdmissionLetterContainer>
    </Container>
  );
};

export default EmployeeProfile;
