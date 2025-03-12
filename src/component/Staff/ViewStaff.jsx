import { useState, useEffect } from "react";
import styled from "styled-components";
import logo from "../../assets/Images/EDSP3.jpg";
import { BsArrowReturnRight } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import axios from "axios";

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

const Section2 = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
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
  width: 115px;
  height: 110px;
  background-color: gray;
  border-radius: 50%;
`;

const QRCodesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const QRCode = styled.img`
  width: 80px;
  height: 80px;
  margin: 5px 0;
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
          const response = await fetch(`http://localhost:8007/staff/get/${location.state.Id}`);
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
      .get("http://localhost:8007/schoolsetup/all")
      .then((response) => {
        // console.log(response.data);
        if (response.data.length > 0) {
          setSchool(response.data[0])
        }
      })
      .catch((error) => {
        console.error(error);
      })
  }, [])

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
      const response = await axios.put(`http://localhost:8007/student/update/${location.state.Id}`, staff);
      if (response.status === 200) {
        alert('Staff data updated successfully!');
      }
    } catch (error) {
      console.error('Error updating staff data:', error);
      setError('Failed to update staff data.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
          <Logo style={{height:"80px"}} src={`http://localhost:8007/uploads/${school?.SchoolLogo.replace(/^uploads\//, '')}`} alt="School Logo" />
          <Title>{school?.SchoolName}</Title>
          <p>{school?.EmailId} | {school?.PhoneNo} </p>
          <p>{school?.Website}</p>
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
            <Value><BsArrowReturnRight style={{ color: "black" }} />&nbsp;{staff?.Documents?.Qualification}</Value>
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

        {/* <QRCodesContainer>
                    <Label>Scan QR Code to Access Portal</Label>
                    <QRCode src="/path/to/qr1.png" alt="QR Code 1" />
                    <QRCode src="/path/to/qr2.png" alt="QR Code 2" />
                    <QRCode src="/path/to/qr3.png" alt="QR Code 3" />
                </QRCodesContainer> */}
      </AdmissionLetterContainer>
    </Container>
  );
};

export default ViewStaff;
