import { useState, useEffect } from "react";
import styled from "styled-components";
import logo from "../../assets/Images/EDSP3.jpg";
import { BsArrowReturnRight } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {AdmissionLetterContainer,Photo,PhotoContainer,Valuevs,Labelviewstud,Logo,Title1,Left,LeftColumn,RightColumn,Section1,Section2} from "./StudentAdmission"

// ------------------------------------------------
const Container = styled.div`
height: calc(100vh - 100px);
overflow-y: auto;
margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 20px;
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


  useEffect(() => {
    console.log("Location state:", location.state); // Debugging log
    if (location.state && location.state.Id) {
      const fetchStudent = async () => {
        try {
          const response = await fetch(
            `http://localhost:8007/student/get/${location.state.Id}`
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
          <Logo style={{height:"80px"}} src={`http://localhost:8007/uploads/${school?.SchoolLogo.replace(/^uploads\//, '')}`} alt="School Logo" />
          <Title1>{school?.SchoolName}</Title1>
          <p>{school?.EmailId} | {school?.PhoneNo} </p>
          <p>{school?.Website}</p>
          <h2 style={{ color: "#222d78", fontWeight: "bold", marginTop: "10px" }}>Student Details</h2>
        </Header>

        <PhotoContainer>
          <Photo src={`http://localhost:8007/uploads/${student?.Document?.StudentPhoto}`} alt="Student" />
        </PhotoContainer>
        <Section1>
          <LeftColumn>
            <Labelviewstud>Student Registration no:</Labelviewstud>

            <Valuevs>
              {" "}
              <BsArrowReturnRight style={{ color: "black" }} />
              &nbsp;
              {student?.StudentId}
            </Valuevs>
            <Labelviewstud>Student Name:</Labelviewstud>
            <Valuevs>
              {" "}
              <BsArrowReturnRight style={{ color: "black" }} />
              &nbsp;{student?.StudentName}
            </Valuevs>
            <Labelviewstud>Date Of Birth:</Labelviewstud>
            <Valuevs>
              {" "}
              <BsArrowReturnRight style={{ color: "black" }} />
              &nbsp;{student?.DOB}
            </Valuevs>

            <Labelviewstud>Gender:</Labelviewstud>
            <Valuevs>
              {" "}
              <BsArrowReturnRight style={{ color: "black" }} />
              &nbsp; {student?.Gender}
            </Valuevs>
            <Labelviewstud>Religion:</Labelviewstud>
            <Valuevs>
              {" "}
              <BsArrowReturnRight style={{ color: "black" }} />
              &nbsp;{student?.Religion}
            </Valuevs>
            <Labelviewstud>Blood Group:</Labelviewstud>
            <Valuevs>
              {" "}
              <BsArrowReturnRight style={{ color: "black" }} />
              &nbsp;{student?.BloodGroup}
            </Valuevs>
            <Labelviewstud>Category:</Labelviewstud>
            <Valuevs>
              {" "}
              <BsArrowReturnRight style={{ color: "black" }} />
              &nbsp;{student?.Category}
            </Valuevs>
            <Labelviewstud>Height:</Labelviewstud>
            <Valuevs>
              {" "}
              <BsArrowReturnRight style={{ color: "black" }} />
              &nbsp;{student?.Height}
            </Valuevs>

            <Labelviewstud>Weight:</Labelviewstud>
            <Valuevs>
              {" "}
              <BsArrowReturnRight style={{ color: "black" }} />
              &nbsp;{student?.Weight}
            </Valuevs>
            <Labelviewstud>Aadhar Number:</Labelviewstud>
            <Valuevs>
              {" "}
              <BsArrowReturnRight style={{ color: "black" }} />
              &nbsp;{student?.AadharNumber}
            </Valuevs>
            <Labelviewstud>Address:</Labelviewstud>
            <Valuevs>
              {" "}
              <BsArrowReturnRight style={{ color: "black" }} />
              &nbsp; {student?.Address}
            </Valuevs>
          </LeftColumn>
          <LeftColumn>
            <Labelviewstud>Contact No:</Labelviewstud>
            <Valuevs>
              {" "}
              <BsArrowReturnRight style={{ color: "black" }} />
              &nbsp;{student?.MobileNo}
            </Valuevs>
            <Labelviewstud>Email:</Labelviewstud>
            <Valuevs>
              {" "}
              <BsArrowReturnRight style={{ color: "black" }} />
              &nbsp;{student?.Email}
            </Valuevs>
            <Labelviewstud>Medium:</Labelviewstud>
            <Valuevs>
              {" "}
              <BsArrowReturnRight style={{ color: "black" }} />
              &nbsp;{student?.Medium}
            </Valuevs>
            <Labelviewstud>City:</Labelviewstud>
            <Valuevs>
              {" "}
              <BsArrowReturnRight style={{ color: "black" }} />
              &nbsp; {student?.City}
            </Valuevs>
            <Labelviewstud>Area:</Labelviewstud>
            <Valuevs>
              {" "}
              <BsArrowReturnRight style={{ color: "black" }} />
              &nbsp;{student?.Area}
            </Valuevs>
            <Labelviewstud>Pincode:</Labelviewstud>
            <Valuevs>
              {" "}
              <BsArrowReturnRight style={{ color: "black" }} />
              &nbsp; {student?.Pincode}
            </Valuevs>
            <Labelviewstud>Admission Date:</Labelviewstud>
            <Valuevs>
              {" "}
              <BsArrowReturnRight style={{ color: "black" }} />
              &nbsp; {student?.AdmissionDate}
            </Valuevs>
            <Labelviewstud>Stream:</Labelviewstud>
            <Valuevs>
              {" "}
              <BsArrowReturnRight style={{ color: "black" }} />
              &nbsp;{student?.Stream}
            </Valuevs>

            <Labelviewstud>Admission In Class:</Labelviewstud>
            <Valuevs>
              {" "}
              <BsArrowReturnRight style={{ color: "black" }} />
              &nbsp;{student?.ClassName}
            </Valuevs>

            <Labelviewstud>House:</Labelviewstud>
            <Valuevs>
              {" "}
              <BsArrowReturnRight style={{ color: "black" }} />
              &nbsp;{student?.House}
            </Valuevs>
            <Labelviewstud>Fee Category:</Labelviewstud>
            <Valuevs>
              {" "}
              <BsArrowReturnRight style={{ color: "black" }} />
              &nbsp;{student?.FeeCategory}
            </Valuevs>

            <Labelviewstud>RollNo:</Labelviewstud>
            <Valuevs>
              {" "}
              <BsArrowReturnRight style={{ color: "black" }} />
              &nbsp;{student?.RollNo}
            </Valuevs>

            <Labelviewstud>Last School Attended:</Labelviewstud>
            <Valuevs>
              {" "}
              <BsArrowReturnRight style={{ color: "black" }} />
              &nbsp;{student?.LastSchoolAttended}
            </Valuevs>

            <Labelviewstud>Identification Mark:</Labelviewstud>
            <Valuevs>
              {" "}
              <BsArrowReturnRight style={{ color: "black" }} />
              &nbsp;{student?.IdentificationMark}
            </Valuevs>
          </LeftColumn>
          <LeftColumn>
            <Labelviewstud>Source Of Admission:</Labelviewstud>
            <Valuevs>
              {" "}
              <BsArrowReturnRight style={{ color: "black" }} />
              &nbsp;{student?.SourceOfAdmission}
            </Valuevs>
            <Labelviewstud>Transport Needed:</Labelviewstud>
            <Valuevs>
              {" "}
              <BsArrowReturnRight style={{ color: "black" }} />
              &nbsp;{student?.TransportNeeded || 'N/A'}
            </Valuevs>

            <Labelviewstud>Route:</Labelviewstud>
            <Valuevs>
              {" "}
              <BsArrowReturnRight style={{ color: "black" }} />
              &nbsp;{student?.Route || 'N/A'}
            </Valuevs>

            <Labelviewstud>Fee Discount:</Labelviewstud>
            <Valuevs>
              {" "}
              <BsArrowReturnRight style={{ color: "black" }} />
              &nbsp;{student?.FeeDiscount}
            </Valuevs>

            <Labelviewstud>Bank Name:</Labelviewstud>
            <Valuevs>
              {" "}
              <BsArrowReturnRight style={{ color: "black" }} />
              &nbsp;{student?.BankName}
            </Valuevs>

            <Labelviewstud>Bank Account Number:</Labelviewstud>
            <Valuevs>
              {" "}
              <BsArrowReturnRight style={{ color: "black" }} />
              &nbsp;{student?.BankAccountNumber}
            </Valuevs>

            <Labelviewstud>IFSC:</Labelviewstud>
            <Valuevs>
              {" "}
              <BsArrowReturnRight style={{ color: "black" }} />
              &nbsp;{student?.IFSC}
            </Valuevs>

            <Labelviewstud>Disability:</Labelviewstud>
            <Valuevs>
              {" "}
              <BsArrowReturnRight style={{ color: "black" }} />
              &nbsp;{student?.Disability || 'N/A'}
            </Valuevs>

            <Labelviewstud>Disability Name:</Labelviewstud>
            <Valuevs>
              {" "}
              <BsArrowReturnRight style={{ color: "black" }} />
              &nbsp;{student?.DisabilityName || 'N/A'}
            </Valuevs>

            <Labelviewstud>Orphan:</Labelviewstud>
            <Valuevs>
              {" "}
              <BsArrowReturnRight style={{ color: "black" }} />
              &nbsp;{student?.Orphan || 'N/A'}
            </Valuevs>


          </LeftColumn>
        </Section1>
        <hr></hr>
        <Section2>
          <Left style={{ flexDirection: 'row' }}>
            <LeftColumn style={{ flex: 1 }}>
              <Labelviewstud>Father Name:</Labelviewstud>
              <Valuevs>
                <BsArrowReturnRight style={{ color: "black" }} />
                &nbsp;{student?.FatherDetail.Name}
              </Valuevs>
              <Labelviewstud>Qualification:</Labelviewstud>
              <Valuevs>
                <BsArrowReturnRight style={{ color: "black" }} />
                &nbsp;{student?.FatherDetail.Qualification}
              </Valuevs>
              <Labelviewstud>Occupation:</Labelviewstud>
              <Valuevs>
                <BsArrowReturnRight style={{ color: "black" }} />
                &nbsp;{student?.FatherDetail.Occupation}
              </Valuevs>
              <Labelviewstud>Annual Income:</Labelviewstud>
              <Valuevs>
                <BsArrowReturnRight style={{ color: "black" }} />
                &nbsp;{student?.FatherDetail.AnnualIncome}
              </Valuevs>
            </LeftColumn>

            <LeftColumn style={{ flex: 1 }}>
              <Labelviewstud>Father Aadhar Number:</Labelviewstud>
              <Valuevs>
                <BsArrowReturnRight style={{ color: "black" }} />
                &nbsp;{student?.FatherDetail.AadharNumber}
              </Valuevs>
              <Labelviewstud>Father Mobile No:</Labelviewstud>
              <Valuevs>
                <BsArrowReturnRight style={{ color: "black" }} />
                &nbsp;{student?.FatherDetail.MobileNo}
              </Valuevs>
              <Labelviewstud>Father Email Id:</Labelviewstud>
              <Valuevs>
                <BsArrowReturnRight style={{ color: "black" }} />
                &nbsp;{student?.FatherDetail.EmailId}
              </Valuevs>
            </LeftColumn>


          </Left>

          <Left style={{ flexDirection: 'row' }}>
            <LeftColumn style={{ flex: 1 }}>
              <Labelviewstud>Mother Name:</Labelviewstud>
              <Valuevs>
                <BsArrowReturnRight style={{ color: "black" }} />
                &nbsp;{student?.MotherDetails.Name}
              </Valuevs>
              <Labelviewstud>Qualification:</Labelviewstud>
              <Valuevs>
                <BsArrowReturnRight style={{ color: "black" }} />
                &nbsp;{student?.MotherDetails.Qualification}
              </Valuevs>
              <Labelviewstud>Occupation:</Labelviewstud>
              <Valuevs>
                <BsArrowReturnRight style={{ color: "black" }} />
                &nbsp;{student?.MotherDetails.Occupation}
              </Valuevs>
              <Labelviewstud>Annual Income:</Labelviewstud>
              <Valuevs>
                <BsArrowReturnRight style={{ color: "black" }} />
                &nbsp;{student?.MotherDetails.AnnualIncome}
              </Valuevs>
            </LeftColumn>

            <LeftColumn style={{ flex: 1 }}>
              <Labelviewstud>Mother Aadhar Number:</Labelviewstud>
              <Valuevs>
                <BsArrowReturnRight style={{ color: "black" }} />
                &nbsp;{student?.MotherDetails.AadharNumber}
              </Valuevs>
              <Labelviewstud>Mother Mobile No:</Labelviewstud>
              <Valuevs>
                <BsArrowReturnRight style={{ color: "black" }} />
                &nbsp;{student?.MotherDetails.MobileNo}
              </Valuevs>
              <Labelviewstud>Mother Email Id:</Labelviewstud>
              <Valuevs>
                <BsArrowReturnRight style={{ color: "black" }} />
                &nbsp;{student?.MotherDetails.EmailId}
              </Valuevs>
            </LeftColumn>
          </Left>
        </Section2>

      </AdmissionLetterContainer>
    </Container>
  );
};

export default ViewStudent;
