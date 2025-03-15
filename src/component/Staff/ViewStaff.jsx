import { useState, useEffect } from "react";
import styled from "styled-components";
import logo from "../../assets/Images/EDSP3.jpg";
import { BsArrowReturnRight } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import axios from "axios";
import  baseURL from '../utils/Url'; 
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
  margin: 0 auto;

  @media (max-width: 1024px) {
    width: 90%;
  }

  @media (max-width: 480px) {
    width: 90%;
    padding: 10px;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 20px;

  @media (max-width: 480px) {
    margin-bottom: 15px;
  }
`;

const Logo = styled.img`
  height: 60px;

  @media (max-width: 480px) {
    height: 40px;
  }
`;

const Title = styled.h2`
  color: #4a4a4a;
  
  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const Section1 = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-bottom: 20px;
  gap: 1rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
`;

const LeftColumn = styled.div`
  width: 100%;

  @media (max-width: 480px) {
    margin-bottom: 15px;
  }
`;

const Label = styled.p`
  margin: 0;
  font-size: 14px;
  color: #555;
  font-weight: bold;
  border-bottom: 0.5px solid black;
  width: 100%;

  @media (max-width: 480px) {
    width: 100%;
    font-size: 12px;
  }
  
`;

const Value = styled.p`
  margin: 0;
  font-size: 14px;
  color: black;
  font-weight: bold;
  margin-bottom: 10px;

  @media (max-width: 480px) {
    font-size: 12px;
    margin-bottom: 8px;
  }
`;

const PhotoContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;

  @media (max-width: 480px) {
    margin-bottom: 15px;
  }
`;

const Photo = styled.img`
  width: 115px;
  height: 110px;
  background-color: gray;
  border-radius: 50%;

  @media (max-width: 480px) {
    width: 80px;
    height: 75px;
  }
`;

const QRCodesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;

  @media (max-width: 480px) {
    margin-top: 15px;
  }
`;

const QRCode = styled.img`
  width: 80px;
  height: 80px;
  margin: 5px 0;

  @media (max-width: 480px) {
    width: 60px;
    height: 60px;
  }
`;
const ViewStaff = () => {
  const location = useLocation();
  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [school, setSchool] = useState(null);

  useEffect(() => {
    if (location.state && location.state.Id) {
      const fetchStaff = async () => {
        try {
          const response = await fetch(`${baseURL}/staff/get/${location.state.Id}`);
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
      console.error("Staff ID not provided.");
      setError("Staff ID not provided.");
      setLoading(false);
    }
  }, [location.state]);

  useEffect(() => {
    axios
      .get(`${baseURL}/schoolsetup/all`)
      .then((response) => {
        if (response.data.length > 0) {
          setSchool(response.data[0]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStaff((prevStaff) => ({
      ...prevStaff,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${baseURL}/staff/update/${location.state.Id}`, staff); // Fixed endpoint from 'student' to 'staff'
      if (response.status === 200) {
        alert("Staff data updated successfully!");
      }
    } catch (error) {
      console.error("Error updating staff data:", error);
      setError("Failed to update staff data.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Container>
      <AdmissionLetterContainer>
        <Header>
          <Logo style={{ height: "80px" }} src={`${baseURL}/uploads/${school?.SchoolLogo.replace(/^uploads\//, "")}`} alt="School Logo" />
          <Title>{school?.SchoolName}</Title>
          <p>{school?.EmailId} | {school?.PhoneNo}</p>
          <p>{school?.Website}</p>
          <h2 style={{ color: "#222d78", fontWeight: "bold", marginTop: "10px" }}>Staff Details</h2>
        </Header>

        <PhotoContainer>
          <Photo src={`${baseURL}/uploads/${staff?.Documents?.Photo}`} alt="Staff" />
        </PhotoContainer>

        <Section1>
          <LeftColumn>
            <Label>Employee ID:</Label>
            <Value><BsArrowReturnRight style={{ color: "black" }} /> {staff?.EmployeeId}</Value>
            <Label>Name:</Label>
            <Value><BsArrowReturnRight style={{ color: "black" }} /> {staff?.Name}</Value>
            <Label>Date of Birth:</Label>
            <Value><BsArrowReturnRight style={{ color: "black" }} /> {staff?.DOB}</Value>
            <Label>Gender:</Label>
            <Value><BsArrowReturnRight style={{ color: "black" }} /> {staff?.Gender}</Value>
            <Label>Role:</Label>
            <Value><BsArrowReturnRight style={{ color: "black" }} /> {staff?.Role}</Value>
            <Label>Department:</Label>
            <Value><BsArrowReturnRight style={{ color: "black" }} /> {staff?.Department}</Value>
            <Label>Email:</Label>
            <Value><BsArrowReturnRight style={{ color: "black" }} /> {staff?.Email}</Value>
            <Label>Mobile No:</Label>
            <Value><BsArrowReturnRight style={{ color: "black" }} /> {staff?.MobileNo}</Value>
            <Label>Address:</Label>
            <Value><BsArrowReturnRight style={{ color: "black" }} /> {staff?.Address}</Value>
          </LeftColumn>

          <LeftColumn>
            <Label>Qualification:</Label>
            <Value><BsArrowReturnRight style={{ color: "black" }} /> {staff?.Documents?.Qualification}</Value>
            <Label>Experience:</Label>
            <Value><BsArrowReturnRight style={{ color: "black" }} /> {staff?.Experience}</Value>
            <Label>Salary:</Label>
            <Value><BsArrowReturnRight style={{ color: "black" }} /> {staff?.Salary}</Value>
            <Label>Blood Group:</Label>
            <Value><BsArrowReturnRight style={{ color: "black" }} /> {staff?.BloodGroup}</Value>
            <Label>Marital Status:</Label>
            <Value><BsArrowReturnRight style={{ color: "black" }} /> {staff?.MaritalStatus}</Value>
            <Label>Language Known:</Label>
            <Value><BsArrowReturnRight style={{ color: "black" }} /> {staff?.LanguageKnown.join(", ")}</Value>
          </LeftColumn>

          <LeftColumn>
            <Label>Emergency Contact Name:</Label>
            <Value><BsArrowReturnRight style={{ color: "black" }} /> {staff?.EmergencyContact?.Name}</Value>
            <Label>Emergency Contact Mobile:</Label>
            <Value><BsArrowReturnRight style={{ color: "black" }} /> {staff?.EmergencyContact?.MobileNo}</Value>
            <Label>Last School:</Label>
            <Value><BsArrowReturnRight style={{ color: "black" }} /> {staff?.LastSchool}</Value>
            <Label>Referred By:</Label>
            <Value><BsArrowReturnRight style={{ color: "black" }} /> {staff?.ReferredName}</Value>
            <Label>Referred Contact:</Label>
            <Value><BsArrowReturnRight style={{ color: "black" }} /> {staff?.ReferredContact}</Value>
          </LeftColumn>
        </Section1>
      </AdmissionLetterContainer>
    </Container>
  );
};

export default ViewStaff;