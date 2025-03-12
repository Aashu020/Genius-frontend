import React, { useState, useEffect } from "react";
// import styled from "styled-components";
import axios from "axios";
import Select from 'react-dropdown-select';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { 
  Container,Heading,MainDashboard,Title,Form,Main,InputContainer,Label,TableContainer,Table,Header, SchoolLogo, SchoolName, Address, SubHeader, FeeDetails, DetailRow,
   DetailLabel, TableHeader, TableData, TotalRow, Signature, PrintButton, StyledSelect,  SubmitButton, TableRow, SmallButton 
} from "./FeeStyles";

const FeeDemandFormat = ({ admitCardData, selectedMonth, feeData, feeSlab, selectedFees, school }) => {
  const { student } = admitCardData;

  const indiAmount = (fee) => {
    const data = feeSlab.find(val => val.Name === fee);
    return data.Amount * Math.min(Number(data.Times), Number(selectedMonth.length));
  }

  const filteredFeeData = selectedFees.filter(fee => selectedFees.includes(fee));
  const totalAmount = filteredFeeData.reduce((total, fee) => total + indiAmount(fee), feeData[0]?.Balance || 0);

  return (
    <Container style={{ padding: '20px', width: '90%', height: 'auto', background: '#fff' }}>
      <Header style={{ textAlign: 'center', marginBottom: '20px' }}>
        <SchoolLogo src={`https://api.edspride.in/uploads/${school?.SchoolLogo.replace(/^uploads\//, '')}`} alt="School Logo" />
        <SchoolName>{school?.SchoolName}</SchoolName>
        <Address>{school?.EmailId} | {school?.PhoneNo}</Address>
        <Address>{school?.Website}</Address>
        <SubHeader>Fee Demand Bill for {selectedMonth.join(", ")}</SubHeader>
      </Header>

      <FeeDetails>
        <DetailRow><DetailLabel>Admission No.:</DetailLabel><span>{student.StudentId}</span></DetailRow>
        <DetailRow><DetailLabel>Student Name:</DetailLabel><span>{student.StudentName}</span></DetailRow>
        <DetailRow><DetailLabel>Father's Name:</DetailLabel><span>{student.FatherDetail.Name}</span></DetailRow>
        <DetailRow><DetailLabel>Class / Sec:</DetailLabel><span>{student.ClassName} / {student.Section}</span></DetailRow>
        <DetailRow><DetailLabel>Adm/Fee Cat.:</DetailLabel><span>{student.FeeCategory}</span></DetailRow>
        <DetailRow><DetailLabel>Issue Date:</DetailLabel><span>{new Date().toISOString().split("T")[0].split("-").reverse().join("-")}</span></DetailRow>
      </FeeDetails>

      <Table>
        <thead>
          <tr>
            <TableHeader>Fee Particular</TableHeader>
            <TableHeader>Amount (₹)</TableHeader>
          </tr>
        </thead>
        <tbody>
          <tr><TableData>Old Balance</TableData><TableData>{feeData[0]?.Balance || 0}</TableData></tr>
          {filteredFeeData.map((fee) => (
            <tr key={fee._id}><TableData>{fee}</TableData><TableData>{indiAmount(fee)}</TableData></tr>
          ))}
          <TotalRow><TableData colSpan={1}>Total Amount</TableData><TableData>{totalAmount}</TableData></TotalRow>
        </tbody>
      </Table>

      <Signature>{school?.SchoolName}</Signature>
    </Container>
  );
};


const FeeDemand = () => {
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [admitCardData, setAdmitCardData] = useState(null);
  const [months, setMonths] = useState([]);
  // const [selectedMonth, setSelectedMonth] = useState([]);
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [feeSlab, setFeeSlab] = useState([]);
  const [selectedFees, setSelectedFees] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [showFeeDemand, setShowFeeDemand] = useState(false);
  const [feeData, setFeeData] = useState([]);
  const [school, setSchool] = useState(null);


  useEffect(() => {
    const fetchFeeData = async () => {
      try {
        const response = await axios.get("https://api.edspride.in/fee-data/all");
        setFeeData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };
    fetchFeeData();
  }, []);

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
    const fetchData = async () => {
      try {
        const academicResponse = await axios.get("https://api.edspride.in/academic-year-info/active");
        const academicData = academicResponse.data;

        const startYear = academicData.StartYear;
        const startMonthIndex = academicData.StartMonthNumber;
        const endYear = academicData.EndYear;
        const endMonthIndex = academicData.EndMonthNumber;

        const monthNames = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];

        const generatedMonths = [];
        for (let year = startYear; year <= endYear; year++) {
          const startMonth = year === startYear ? startMonthIndex : 1;
          const endMonth = year === endYear ? endMonthIndex : 12;

          for (let month = startMonth; month <= endMonth; month++) {
            generatedMonths.push({ value: `${monthNames[month - 1]} ${year}`, label: `${monthNames[month - 1]} ${year}` });
          }
        }

        setMonths(generatedMonths);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get("https://api.edspride.in/class/all");
        setClasses(response.data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };
    fetchClasses();
  }, []);

  useEffect(() => {
    const fetchSections = async () => {
      if (selectedClass) {
        try {
          const response = await axios.get(`https://api.edspride.in/class/get/${selectedClass}`);
          setSections(response.data.Section || []);
        } catch (error) {
          console.error("Error fetching sections:", error);
        }
      } else {
        setSections([]);
      }
    };
    fetchSections();
  }, [selectedClass]);

  useEffect(() => {
    const fetchStudents = async () => {
      if (selectedClass && selectedSection) {
        try {
          const response = await axios.get("https://api.edspride.in/student/all");
          const filteredStudents = response.data.filter(
            (student) =>
              student.AdmissionInClass === selectedClass && student.Section === selectedSection
          );
          setStudents(filteredStudents);
        } catch (error) {
          console.error("Error fetching students:", error);
        }
      } else {
        setStudents([]);
      }
    };
    fetchStudents();
  }, [selectedClass, selectedSection]);

  useEffect(() => {
    const fetchFeeSlab = async () => {
      if (selectedClass) {
        try {
          const response = await axios.get("https://api.edspride.in/feeSlab/all");
          const feeData = response.data.find(fee => fee.ClassId === selectedClass);
          setFeeSlab(feeData ? feeData.Fees : []);
          // console.log(feeData ? feeData.Fees : []);
        } catch (error) {
          console.error("Error fetching fee slab:", error);
        }
      } else {
        setFeeSlab([]);
      }
    };
    fetchFeeSlab();
  }, [selectedClass]);

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
    setAdmitCardData({ student });
  };

  // Function to download all fee demands in one PDF
 const downloadPDF = () => {
  const pdf = new jsPDF();

  selectedStudents.forEach((student, index) => {
    const feeDemandContent = document.getElementById(`fee-demand-${student}`);

    // Ensure the element exists before capturing it
    if (feeDemandContent) {
      // Capture the fee demand using html2canvas
      html2canvas(feeDemandContent, {
        scale: 2, // Increase scale for better image quality
        useCORS: true, // Ensure images from external URLs are captured
        backgroundColor: '#ffffff', // Set background color if needed
        logging: true, // Enable logging for debugging purposes
      }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");

        // Dynamically calculate image size based on the content
        const pageWidth = 210; // A4 page width in mm
        const pageHeight = 297; // A4 page height in mm

        const imgWidth = pageWidth; // Scale image to fit the page width
        const imgHeight = (canvas.height * imgWidth) / canvas.width; // Calculate proportional image height

        // Set initial yOffset for the first image
        let yOffset = 0; // First image at the top of the page

        // Add the first image (top half of the page)
        pdf.addImage(imgData, "PNG", 0, yOffset, imgWidth, imgHeight);

        // Check if we have another fee demand for the same page (second image)
        if (index + 1 < selectedStudents.length) {
          // Prepare for the second fee demand on the bottom half of the page
          const nextStudent = selectedStudents[index + 1];
          const nextFeeDemandContent = document.getElementById(`fee-demand-${nextStudent}`);

          if (nextFeeDemandContent) {
            html2canvas(nextFeeDemandContent, {
              scale: 2, // Increase scale for better image quality
              useCORS: true,
              backgroundColor: '#ffffff',
            }).then((nextCanvas) => {
              const nextImgData = nextCanvas.toDataURL("image/png");
              let nextImgHeight = (nextCanvas.height * imgWidth) / nextCanvas.width;

              // Adjust yOffset for the second image (bottom half of the page)
              let nextYOffset = imgHeight + 5; // 5mm padding between the two images

              // Add the second image (bottom half of the page)
              pdf.addImage(nextImgData, "PNG", 0, nextYOffset, imgWidth, nextImgHeight);

              // Add a new page only if both fee demands are added
              if (index === selectedStudents.length - 1 || (index + 1 === selectedStudents.length - 1)) {
                pdf.save("Fee_Demands.pdf"); // Save the PDF once all pages are added
              }
            }).catch((err) => {
              console.error("Error rendering next canvas:", err);
            });
          } else {
            console.error(`Next element for student ${nextStudent} not found`);
          }
        } else {
          // If no next fee demand, save the PDF
          if (index === selectedStudents.length - 1) {
            pdf.save("Fee_Demands.pdf");
          }
        }
      }).catch((err) => {
        console.error("Error rendering canvas:", err); // Catch any errors from html2canvas
      });
    } else {
      console.error(`Element with id fee-demand-${student} not found`);
    }
  });
};

  

  const handleCheckboxChange = (studentId) => {
    setSelectedStudents((prevSelected) =>
      prevSelected.includes(studentId)
        ? prevSelected.filter((id) => id !== studentId)
        : [...prevSelected, studentId]
    );
  };

  const handleGenerateFeeDemand = (e) => {
    e.preventDefault();
    // Only show the fee demand list after clicking "Generate Fee Demand"
    setShowFeeDemand(true);
  };

  return (
    <MainDashboard>
      <Title>Fee Demand Generation</Title>
      <Form>
        <Main>
          <InputContainer>
            <Label>Select Class</Label>
            <StyledSelect value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
              <option value="">Select Class</option>
              {classes.map((cls) => (
                <option key={cls._id} value={cls.ClassId}>
                  {cls.Class}
                </option>
              ))}
            </StyledSelect>
          </InputContainer>

          <InputContainer>
            <Label>Select Section</Label>
            <StyledSelect
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              disabled={!selectedClass}
            >
              <option value="">Select Section</option>
              {sections.map((section) => (
                <option key={section} value={section}>
                  {section}
                </option>
              ))}
            </StyledSelect>
          </InputContainer>

          <InputContainer>
            <Label>Select Month</Label>
            <Select
              options={months} // Your months array
              onChange={(values) => setSelectedMonths(values.map(item => item.value))} // Set selected months as an array
              labelField="label"
              valueField="value"
              placeholder="Select Month"
              style={{
                width: '100%',
                padding: '10px 20px',
                border: '2px solid #7d3cff',
                borderRadius: '30px',
                fontSize: '16px',
                color: '#7a7a7a',
                fontWeight: 'bold',
                backgroundColor: '#f4f6fc'
              }}
              multi
            />
          </InputContainer>


          <InputContainer>
            <Label>Select Fees</Label>
            <Select
              options={feeSlab.map(fee => ({ label: fee.Name, value: fee.Name }))}
              onChange={(values) => setSelectedFees(values.map(fee => fee.value))}
              labelField="label"
              valueField="value"
              placeholder="Select Fees"
              style={{
                width: '100%',
                padding: '10px 20px',
                border: '2px solid #7d3cff',
                borderRadius: '30px',
                fontSize: '16px',
                color: '#7a7a7a',
                fontWeight: 'bold',
                backgroundColor: '#f4f6fc'
              }}
              multi
            />
          </InputContainer>

          <SubmitButton onClick={handleGenerateFeeDemand}>
            Generate Fee Demand
          </SubmitButton>
        </Main>
      </Form>

      {students.length > 0 && (
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <TableHeader>Select</TableHeader>
                <TableHeader>Roll No</TableHeader>
                <TableHeader>Student Name</TableHeader>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <TableRow key={student._id}>
                  <TableData>
                    <input
                      type="checkbox"
                      checked={selectedStudents.includes(student._id)}
                      onChange={() => handleCheckboxChange(student._id)}
                    />
                  </TableData>
                  <TableData>{student.RollNo}</TableData>
                  <TableData>{student.StudentName}</TableData>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      )}

      {showFeeDemand && selectedStudents.length > 0 && (
        <div>
          {students
            .filter((student) => selectedStudents.includes(student._id))
            .map((student) => {
              // Filter fee data based on student.StudentId
              const studentFeeData = feeData.filter(fee => fee.StudentId === student.StudentId);
              return (
                <div id={`fee-demand-${student._id}`} key={student._id}>
                  <FeeDemandFormat
                    admitCardData={{ student }}
                    selectedMonth={selectedMonths}
                    feeData={studentFeeData}
                    feeSlab={feeSlab}
                    selectedFees={selectedFees}
                    school={school}
                  />
                </div>
              );
            })}
          <div>
            <SubmitButton onClick={downloadPDF}>Download All Fee Demands as PDF</SubmitButton>
          </div>
        </div>
      )}
    </MainDashboard>
  );
};

export default FeeDemand;
