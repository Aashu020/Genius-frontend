import { useState, useEffect } from "react";
import styled from "styled-components";
import logo from "../../assets/Images/EDSP3.jpg";
import { BsArrowReturnRight } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import axios from "axios";

// ------------------------------------------------
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
  /* display: flex;
  justify-content: space-between; */
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-bottom: 20px;
  gap: 1rem;
`;

const Left = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
`;

const LeftColumn = styled.div`
  width: 100%;
`;

const RightColumn = styled.div`
  width: 48%;
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
  background-color: gray;
`;

const Photo1 = styled.img`
  width: 60px;
  height: 50px;
  background-color: gray;
  /* border-radius: 50%; */
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
// ----------------------------------------------------

const ViewStudent = () => {
  const location = useLocation();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const [school, setSchool] = useState(null);

  useEffect(() => {
    axios
      .get("https://api.edspride.in/schoolsetup/all")
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


  useEffect(() => {
    console.log("Location state:", location.state); // Debugging log
    if (location.state && location.state.Id) {
      const fetchStudent = async () => {
        try {
          const response = await fetch(
            `https://api.edspride.in/student/get/${location.state.Id}`
          );
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          console.log("Fetched student data:", data);
          setStudent(data);
          console.log(data.Document.StudentPhoto)
        } catch (error) {
          console.error("Error fetching student data:", error);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchStudent();
    } else {
      console.error("Student ID not provided.");
      setError("Student ID not provided.");
      setLoading(false);
    }
  }, [location.state]);


  if (loading) {
    return <p>Loading student details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Container>
      <AdmissionLetterContainer>
        <Header>
          <Logo style={{height:"80px"}} src={`https://api.edspride.in/uploads/${school?.SchoolLogo.replace(/^uploads\//, '')}`} alt="School Logo" />
          <Title>{school?.SchoolName}</Title>
          <p>{school?.EmailId} | {school?.PhoneNo} </p>
          <p>{school?.Website}</p>
          <h2 style={{ color: "#222d78", fontWeight: "bold", marginTop: "10px" }}>Student Details</h2>
        </Header>

        <PhotoContainer>
          <Photo src={`https://api.edspride.in/uploads/${student?.Document?.StudentPhoto}`} alt="Student" />
        </PhotoContainer>
        <Section1>
          <LeftColumn>
            <Label>Student Registration no:</Label>

            <Value>
              {" "}
              <BsArrowReturnRight style={{ color: "black" }} />
              &nbsp;
              {student?.StudentId}
            </Value>
            <Label>Student Name:</Label>
            <Value>
              {" "}
              <BsArrowReturnRight style={{ color: "black" }} />
              &nbsp;{student?.StudentName}
            </Value>
            <Label>Date Of Birth:</Label>
            <Value>
              {" "}
              <BsArrowReturnRight style={{ color: "black" }} />
              &nbsp;{student?.DOB}
            </Value>

            <Label>Gender:</Label>
            <Value>
              {" "}
              <BsArrowReturnRight style={{ color: "black" }} />
              &nbsp; {student?.Gender}
            </Value>
            <Label>Religion:</Label>
            <Value>
              {" "}
              <BsArrowReturnRight style={{ color: "black" }} />
              &nbsp;{student?.Religion}
            </Value>
            <Label>Blood Group:</Label>
            <Value>
              {" "}
              <BsArrowReturnRight style={{ color: "black" }} />
              &nbsp;{student?.BloodGroup}
            </Value>
            <Label>Category:</Label>
            <Value>
              {" "}
              <BsArrowReturnRight style={{ color: "black" }} />
              &nbsp;{student?.Category}
            </Value>
            <Label>Height:</Label>
            <Value>
              {" "}
              <BsArrowReturnRight style={{ color: "black" }} />
              &nbsp;{student?.Height}
            </Value>

            <Label>Weight:</Label>
            <Value>
              {" "}
              <BsArrowReturnRight style={{ color: "black" }} />
              &nbsp;{student?.Weight}
            </Value>
            <Label>Aadhar Number:</Label>
            <Value>
              {" "}
              <BsArrowReturnRight style={{ color: "black" }} />
              &nbsp;{student?.AadharNumber}
            </Value>
            <Label>Address:</Label>
            <Value>
              {" "}
              <BsArrowReturnRight style={{ color: "black" }} />
              &nbsp; {student?.Address}
            </Value>
          </LeftColumn>
          <LeftColumn>
            <Label>Contact No:</Label>
            <Value>
              {" "}
              <BsArrowReturnRight style={{ color: "black" }} />
              &nbsp;{student?.MobileNo}
            </Value>
            <Label>Email:</Label>
            <Value>
              {" "}
              <BsArrowReturnRight style={{ color: "black" }} />
              &nbsp;{student?.Email}
            </Value>
            <Label>City:</Label>
            <Value>
              {" "}
              <BsArrowReturnRight style={{ color: "black" }} />
              &nbsp; {student?.City}
            </Value>
            <Label>Area:</Label>
            <Value>
              {" "}
              <BsArrowReturnRight style={{ color: "black" }} />
              &nbsp;{student?.Area}
            </Value>
            <Label>Pincode:</Label>
            <Value>
              {" "}
              <BsArrowReturnRight style={{ color: "black" }} />
              &nbsp; {student?.Pincode}
            </Value>
            <Label>Admission Date:</Label>
            <Value>
              {" "}
              <BsArrowReturnRight style={{ color: "black" }} />
              &nbsp; {student?.AdmissionDate}
            </Value>
            <Label>Stream:</Label>
            <Value>
              {" "}
              <BsArrowReturnRight style={{ color: "black" }} />
              &nbsp;{student?.Stream}
            </Value>

            <Label>Admission In Class:</Label>
            <Value>
              {" "}
              <BsArrowReturnRight style={{ color: "black" }} />
              &nbsp;{student?.ClassName}
            </Value>

            <Label>House:</Label>
            <Value>
              {" "}
              <BsArrowReturnRight style={{ color: "black" }} />
              &nbsp;{student?.House}
            </Value>
            <Label>Fee Category:</Label>
            <Value>
              {" "}
              <BsArrowReturnRight style={{ color: "black" }} />
              &nbsp;{student?.FeeCategory}
            </Value>

            <Label>RollNo:</Label>
            <Value>
              {" "}
              <BsArrowReturnRight style={{ color: "black" }} />
              &nbsp;{student?.RollNo}
            </Value>

            <Label>Last School Attended:</Label>
            <Value>
              {" "}
              <BsArrowReturnRight style={{ color: "black" }} />
              &nbsp;{student?.LastSchoolAttended}
            </Value>

            <Label>Identification Mark:</Label>
            <Value>
              {" "}
              <BsArrowReturnRight style={{ color: "black" }} />
              &nbsp;{student?.IdentificationMark}
            </Value>
          </LeftColumn>
          <LeftColumn>
            <Label>Source Of Admission:</Label>
            <Value>
              {" "}
              <BsArrowReturnRight style={{ color: "black" }} />
              &nbsp;{student?.SourceOfAdmission}
            </Value>
            <Label>Transport Needed:</Label>
            <Value>
              {" "}
              <BsArrowReturnRight style={{ color: "black" }} />
              &nbsp;{student?.TransportNeeded || 'N/A'}
            </Value>

            <Label>Route:</Label>
            <Value>
              {" "}
              <BsArrowReturnRight style={{ color: "black" }} />
              &nbsp;{student?.Route || 'N/A'}
            </Value>

            <Label>Fee Discount:</Label>
            <Value>
              {" "}
              <BsArrowReturnRight style={{ color: "black" }} />
              &nbsp;{student?.FeeDiscount}
            </Value>

            <Label>Bank Name:</Label>
            <Value>
              {" "}
              <BsArrowReturnRight style={{ color: "black" }} />
              &nbsp;{student?.BankName}
            </Value>

            <Label>Bank Account Number:</Label>
            <Value>
              {" "}
              <BsArrowReturnRight style={{ color: "black" }} />
              &nbsp;{student?.BankAccountNumber}
            </Value>

            <Label>IFSC:</Label>
            <Value>
              {" "}
              <BsArrowReturnRight style={{ color: "black" }} />
              &nbsp;{student?.IFSC}
            </Value>

            <Label>Disability:</Label>
            <Value>
              {" "}
              <BsArrowReturnRight style={{ color: "black" }} />
              &nbsp;{student?.Disability || 'N/A'}
            </Value>

            <Label>Disability Name:</Label>
            <Value>
              {" "}
              <BsArrowReturnRight style={{ color: "black" }} />
              &nbsp;{student?.DisabilityName || 'N/A'}
            </Value>

            <Label>Orphan:</Label>
            <Value>
              {" "}
              <BsArrowReturnRight style={{ color: "black" }} />
              &nbsp;{student?.Orphan || 'N/A'}
            </Value>


          </LeftColumn>
        </Section1>
        <hr></hr>
        <Section2>
          <Left style={{ flexDirection: 'row' }}>
            <LeftColumn style={{ flex: 1 }}>
              <Label>Father Name:</Label>
              <Value>
                <BsArrowReturnRight style={{ color: "black" }} />
                &nbsp;{student?.FatherDetail.Name}
              </Value>
              <Label>Qualification:</Label>
              <Value>
                <BsArrowReturnRight style={{ color: "black" }} />
                &nbsp;{student?.FatherDetail.Qualification}
              </Value>
              <Label>Occupation:</Label>
              <Value>
                <BsArrowReturnRight style={{ color: "black" }} />
                &nbsp;{student?.FatherDetail.Occupation}
              </Value>
              <Label>Annual Income:</Label>
              <Value>
                <BsArrowReturnRight style={{ color: "black" }} />
                &nbsp;{student?.FatherDetail.AnnualIncome}
              </Value>
            </LeftColumn>

            <LeftColumn style={{ flex: 1 }}>
              <Label>Father Aadhar Number:</Label>
              <Value>
                <BsArrowReturnRight style={{ color: "black" }} />
                &nbsp;{student?.FatherDetail.AadharNumber}
              </Value>
              <Label>Father Mobile No:</Label>
              <Value>
                <BsArrowReturnRight style={{ color: "black" }} />
                &nbsp;{student?.FatherDetail.MobileNo}
              </Value>
              <Label>Father Email Id:</Label>
              <Value>
                <BsArrowReturnRight style={{ color: "black" }} />
                &nbsp;{student?.FatherDetail.EmailId}
              </Value>
            </LeftColumn>


          </Left>

          <Left style={{ flexDirection: 'row' }}>
            <LeftColumn style={{ flex: 1 }}>
              <Label>Mother Name:</Label>
              <Value>
                <BsArrowReturnRight style={{ color: "black" }} />
                &nbsp;{student?.MotherDetails.Name}
              </Value>
              <Label>Qualification:</Label>
              <Value>
                <BsArrowReturnRight style={{ color: "black" }} />
                &nbsp;{student?.MotherDetails.Qualification}
              </Value>
              <Label>Occupation:</Label>
              <Value>
                <BsArrowReturnRight style={{ color: "black" }} />
                &nbsp;{student?.MotherDetails.Occupation}
              </Value>
              <Label>Annual Income:</Label>
              <Value>
                <BsArrowReturnRight style={{ color: "black" }} />
                &nbsp;{student?.MotherDetails.AnnualIncome}
              </Value>
            </LeftColumn>

            <LeftColumn style={{ flex: 1 }}>
              <Label>Mother Aadhar Number:</Label>
              <Value>
                <BsArrowReturnRight style={{ color: "black" }} />
                &nbsp;{student?.MotherDetails.AadharNumber}
              </Value>
              <Label>Mother Mobile No:</Label>
              <Value>
                <BsArrowReturnRight style={{ color: "black" }} />
                &nbsp;{student?.MotherDetails.MobileNo}
              </Value>
              <Label>Mother Email Id:</Label>
              <Value>
                <BsArrowReturnRight style={{ color: "black" }} />
                &nbsp;{student?.MotherDetails.EmailId}
              </Value>
            </LeftColumn>
          </Left>
        </Section2>

      </AdmissionLetterContainer>
    </Container>
  );
};

export default ViewStudent;
