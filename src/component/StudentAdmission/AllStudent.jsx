import { useState, useEffect } from "react";
// import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Eye, Edit } from "lucide-react";
import { SiMicrosoftexcel } from "react-icons/si";
import { IoMdPrint } from "react-icons/io";
import * as XLSX from "xlsx";
import axios from "axios";
import{ Input,Th,Td,SearchContainer,SearchInput,ButtonSection,ActionButton,RowsPerPageDropdown,PaginationButton,PaginationInfo,PaginationContainer,Photo1,OpenButton,Table1, MainDashboard, TableContainer1,ButtonGroup,Button} from "./StudentAdmission"

const AllStudent = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemPerPage] = useState(8);

  // Search state variables
  const [searchName, setSearchName] = useState("");
  const [searchSection, setSearchSection] = useState("");
  const [searchFee, setSearchFee] = useState("");
  const [searchGender, setSearchGender] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [searchStream, setSearchStream] = useState("");
  const [searchHouse, setSearchHouse] = useState("");
  const [searchTransport, setSearchTransport] = useState("");
  const [searchClassName, setSearchClassName] = useState("");
  const [searchDOB, setSearchDOB] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch("http://localhost:8007/student/all");
        const data = await response.json();
        setStudent(data.reverse());
        console.log(data)
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudent();
  }, []);

  const openEditPage = (student) => {
    const role = localStorage.getItem("Role");
    if(role=="Superadmin" || role=="Admin"){
      navigate("/admin/editstudent", { state: { student } });
    } else{
      navigate("/employee/editstudent", { state: { student } });
    }
  };

  const totalPages = Math.ceil(student.length / itemsPerPage);
  const currentData = student.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(student);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
    XLSX.writeFile(workbook, "students_data.xlsx");
  };

  const printTable = () => {
    const printContent = document.getElementById("student-table").outerHTML;
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>All Student Data</title>
          <style>
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid black; padding: 8px; text-align: left; }
          </style>
        </head>
        <body>${printContent}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
  };

  const toggleModal = (student) => {
    const role = localStorage.getItem("Role");
    if(role=="Superadmin" || role=="Admin"){
      navigate("/admin/editstudent", { state: { Id: student.StudentId } });
    } else{
      navigate("/employee/editstudent", { state: { Id: student.StudentId } });
    }
  };

  const filteredData = student.filter((studentMember) => {
    return (
      (studentMember.StudentName?.toLowerCase().includes(searchName.toLowerCase()) || !searchName) &&
      (studentMember.Section?.toLowerCase().includes(searchSection.toLowerCase()) || !searchSection) &&
      (studentMember.Fee?.toString().includes(searchFee) || !searchFee) &&
      (studentMember.Gender?.toLowerCase().includes(searchGender.toLowerCase()) || !searchGender) &&
      (studentMember.Category?.toLowerCase().includes(searchCategory.toLowerCase()) || !searchCategory) &&
      (studentMember.Stream?.toLowerCase().includes(searchStream.toLowerCase()) || !searchStream) &&
      (studentMember.House?.toLowerCase().includes(searchHouse.toLowerCase()) || !searchHouse) &&
      (studentMember.Transport?.toLowerCase().includes(searchTransport.toLowerCase()) || !searchTransport) &&
      (studentMember.ClassName?.toLowerCase().includes(searchClassName.toLowerCase()) || !searchClassName) &&
      (studentMember.DOB ? new Date(studentMember.DOB).toLocaleDateString().includes(searchDOB) : !searchDOB)
    );
  });

  const toggleModalview = (student) => {
    console.log(student.StudentId)
    const role = localStorage.getItem("Role");
    if(role=="Superadmin" || role=="Admin"){
      navigate("/admin/viewstudent", { state: { Id: student.StudentId } });
    } else{
      navigate("/employee/viewstudent", { state: { Id: student.StudentId } });
    }
  };

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };
  

  // The handleUpload function to parse the file and send it to the API
  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first.');
      return;
    }
  
    // Validate Excel file format
    if (file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      alert('Please upload a valid Excel file (.xlsx).');
      return;
    }
  
    if (file.size === 0) {
      alert('The selected file is empty. Please upload a valid file.');
      return;
    }
  
    setLoading(true); // Show loading spinner or indicator
  
    const formData = new FormData();
    formData.append('file', file); // Attach the file
  
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const binaryStr = e.target.result;
        const wb = XLSX.read(binaryStr, { type: 'binary' });
        const sheetName = wb.SheetNames[0];
        const sheet = wb.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
  
        console.log('Parsed Excel data:', jsonData);
  
        // Format data according to the Student schema
        const formattedData = jsonData.map((item) => ({
          StudentName: item["StudentName"],
          StudentId: item["StudentId"],
          DOB: item["DOB"],
          Gender: item["Gender"],
          Religion: item["Religion"] || '',
          BloodGroup: item["BloodGroup"] || '',
          Category: item["Category"] || '',
          Height: item["Height"] || '',
          Weight: item["Weight"] || '',
          AadharNumber: item["AadharNumber"] || '',
          MobileNo: item["MobileNo"],
          House: item["House"] || '',
          Email: item["Email"] || '',
          Address: item["Address"] || '',
          City: item["City"] || '',
          Area: item["Area"] || '',
          Pincode: item["Pincode"] || '',
          AdmissionDate: item["AdmissionDate"] || '',
          Stream: item["Stream"] || '',
          AdmissionInClass: item["AdmissionInClass"],
          ClassName: item["ClassName"] || '',
          Section: item["Section"] || '',
          FeeCategory: item["FeeCategory"],
          RollNo: item["RollNo"] || '',
          LastSchoolAttended: item["LastSchoolAttended"] || '',
          IdentificationMark: item["IdentificationMark"] || '',
          SourceOfAdmission: item["SourceOfAdmission"] || '',
          TransportNeeded: item["TransportNeeded"] === 'true',  // Convert 'true'/'false' to boolean
          Route: item["Route"] || '',
          FeeDiscount: item["FeeDiscount"] || '',
          BankName: item["BankName"] || '',
          BankAccountNumber: item["BankAccountNumber"] || '',
          IFSC: item["IFSC"] || '',
          Disability: item["Disability"] === 'true',  // Convert 'true'/'false' to boolean
          DisabilityName: item["DisabilityName"] || '',
          Discount: item["Discount"] || '',
          Orphan: item["Orphan"] === 'true',  // Convert 'true'/'false' to boolean
          Subject: item["Subject"] ? item["Subject"].split(", ") : [],  // Convert comma-separated list to array
          EmergencyContact: {
            Name: item["EmergencyContact"] || '',
            Relation: item["EmergencyContactRelation"] || '',  // Ensure EmergencyContactRelation is handled
            MobileNo: item["EmergencyContactMobileNo"] || ''
          },
          // Handle FatherDetail and MotherDetails as nested objects
          FatherDetail: {
            Name: item["FatherDetail Name"] || '',
            Qualification: item["FatherDetail Qualification"] || '',
            Occupation: item["FatherDetail Occupation"] || '',
            AnnualIncome: item["FatherDetail AnnualIncome"] || '',
            AadharNumber: item["FatherDetail AadharNumber"] || '',
            MobileNo: item["FatherDetail MobileNo"] || '',
            EmailId: item["FatherDetail EmailId"] || ''
          },
          MotherDetails: {
            Name: item["MotherDetails Name"] || '',
            Qualification: item["MotherDetails Qualification"] || '',
            Occupation: item["MotherDetails Occupation"] || '',
            AnnualIncome: item["MotherDetails AnnualIncome"] || '',
            AadharNumber: item["MotherDetails AadharNumber"] || '',
            MobileNo: item["MotherDetails MobileNo"] || '',
            EmailId: item["MotherDetails EmailId"] || ''
          },
          Document: {
            StudentPhoto: '',  // Assuming no URL for photo in the Excel, adjust as needed
            Birth: '',  // Same as above, adjust if required
            Leaving: '',  // Same as above, adjust if required
            FatherPhoto: '',
            MotherPhoto: ''
          }
        }));
  
        console.log("Formatted Data to Send to API:", formattedData);
  
        // Send the formatted data to the API
        try {
          const response = await axios.post("http://localhost:8007/student/bulk-upload", formattedData, {
            headers: { 'Content-Type': 'application/json' },
          });
  
          console.log("Upload Response:", response.data);
          alert("Student data uploaded and saved successfully!");
        } catch (uploadError) {
          console.error("Error uploading data:", uploadError);
          alert(`Error uploading student data: ${uploadError.response ? uploadError.response.data : uploadError.message}`);
        }
  
        setLoading(false);
      };
  
      reader.readAsBinaryString(file);
    } catch (error) {
      setLoading(false);
      console.error('Error during file upload or parsing:', error);
      alert(`Error: ${error.message}`);
    }
  };
  
  

  return (
    <MainDashboard>
      <TableContainer1>
        <ButtonGroup>
          <OpenButton>All Students</OpenButton>
        </ButtonGroup>

        <SearchContainer>
          <SearchInput placeholder="Search by Name" value={searchName} onChange={(e) => setSearchName(e.target.value)} />
          <SearchInput placeholder="Search by Section" value={searchSection} onChange={(e) => setSearchSection(e.target.value)} />
          <SearchInput placeholder="Search by Fee" value={searchFee} onChange={(e) => setSearchFee(e.target.value)} />
          <SearchInput placeholder="Search by Gender" value={searchGender} onChange={(e) => setSearchGender(e.target.value)} />
          <SearchInput placeholder="Search by Category" value={searchCategory} onChange={(e) => setSearchCategory(e.target.value)} />
          <SearchInput placeholder="Search by Stream" value={searchStream} onChange={(e) => setSearchStream(e.target.value)} />
          <SearchInput placeholder="Search by House" value={searchHouse} onChange={(e) => setSearchHouse(e.target.value)} />
          <SearchInput placeholder="Search by Transport" value={searchTransport} onChange={(e) => setSearchTransport(e.target.value)} />
          <SearchInput placeholder="Search by Class Name" value={searchClassName} onChange={(e) => setSearchClassName(e.target.value)} />
          <SearchInput placeholder="Search by DOB" value={searchDOB} onChange={(e) => setSearchDOB(e.target.value)} />
        </SearchContainer>

        <ButtonSection>
          <button onClick={exportToExcel} style={{ color: "green" }}>
            <SiMicrosoftexcel />
          </button>
          <button onClick={printTable} style={{ color: "#1c3eae" }}>
            <IoMdPrint />
          </button>
        </ButtonSection>

        <div id="student-table">
          <Table1>
            <thead>
              <tr>
                <Th>Student Photo</Th>
                <Th>Student ID</Th>
                <Th>Student Name</Th>
                <Th>Mobile No</Th>
                <Th>Father Name</Th>
                <Th>Mother Name</Th>
                <Th>Class</Th>
                <Th>Section</Th>
                <Th>Action</Th>
              </tr>
            </thead>
            <tbody>
              {filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((studentMember) => (
                <tr key={studentMember._id}>
                  <Td><Photo1 src={`http://localhost:8007/uploads/${studentMember?.Document?.StudentPhoto}`} alt="Student" /></Td>
                  <Td>{studentMember.StudentId}</Td>
                  <Td>{studentMember.StudentName}</Td>
                  <Td>{studentMember.MobileNo}</Td>
                  {console.log(studentMember)}
                  <Td>{studentMember.FatherDetail?.Name}</Td>
                  <Td>{studentMember.MotherDetails?.Name}</Td>
                  <Td>{studentMember.ClassName}</Td>
                  <Td>{studentMember.Section}</Td>
                  <Td>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <Eye onClick={() => toggleModalview(studentMember)} />
                      <ActionButton onClick={() => toggleModal(studentMember)} color="#28a745">
                        Edit
                      </ActionButton>
                    </div>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table1>
        </div>

        <PaginationContainer>
          <PaginationInfo>
            Rows per page:
            <RowsPerPageDropdown value={itemsPerPage} onChange={(e) => setItemPerPage(Number(e.target.value))}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </RowsPerPageDropdown>
            {` ${currentPage}-${Math.min(currentPage * itemsPerPage, filteredData.length)} of ${filteredData.length}`}
          </PaginationInfo>

          <div>
            <PaginationButton
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              Prev
            </PaginationButton>
            <PaginationButton
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            >
              Next
            </PaginationButton>
          </div>
        </PaginationContainer>
      </TableContainer1>
    </MainDashboard>
  );
};

export default AllStudent;