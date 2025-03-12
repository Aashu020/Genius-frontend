import { useState, useEffect } from "react";
import styled from "styled-components";
import { Eye, Edit, Trash2 } from "lucide-react";
import { SiMicrosoftexcel } from "react-icons/si";
import { IoMdPrint } from "react-icons/io";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  MainDashboard,
  TableContainer,
  ButtonGroup,
  OpenButton,
  Input,
  Table,
  Th,
  Td,
  Td1,
  EditButton,
  DeleteButton,
  StatusButton,
  ActionButton,
  PaginationContainer,
  PaginationInfo,
  PaginationButton,
  RowsPerPageDropdown,
  SearchContainer,
  ButtonSection,
  SearchInput,
  Photo,
} from "./StaffStyle";

const AllStaff = () => {
  const [staff, setStaff] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Search state variables
  const [searchGender, setSearchGender] = useState("");
  const [searchSalary, setSearchSalary] = useState("");
  const [searchDepartment, setSearchDepartment] = useState("");
  const [searchRole, setSearchRole] = useState("");
  const [searchJobGrade, setSearchJobGrade] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchDOB, setSearchDOB] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await fetch(
          "http://localhost:8007/staff/all"
        );
        const data = await response.json();
        setStaff(data);
      } catch (error) {
        console.error("Error fetching staff data:", error);
      }
    };

    fetchStaff();
  }, []);

  const totalPages = Math.ceil(staff.length / itemsPerPage);
  const currentData = staff
    .filter(
      (member) =>
        member.Gender.toLowerCase().includes(searchGender.toLowerCase()) &&
        member.Salary.toLowerCase().includes(searchSalary.toLowerCase()) &&
        member.Department.toLowerCase().includes(
          searchDepartment.toLowerCase()
        ) &&
        member.Role.toLowerCase().includes(searchRole.toLowerCase()) &&
        member.JobGrade.toLowerCase().includes(searchJobGrade.toLowerCase()) &&
        member.Name.toLowerCase().includes(searchName.toLowerCase()) &&
        member.DOB.toLowerCase().includes(searchDOB.toLowerCase())
    )
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  // Function to export staff data to Excel
  const exportToExcel = () => {
    const flattenedData = flattenStaffData(staff);
    const worksheet = XLSX.utils.json_to_sheet(flattenedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Staff");
    XLSX.writeFile(workbook, "staff_data.xlsx");
  };

  // Function to flatten the staff data for Excel export
  const flattenStaffData = (staffData) => {
    return staffData.map((staffMember) => ({
      "Employee ID": staffMember.EmployeeId,
      "Name": staffMember.Name,
      "Role": staffMember.Role,
      "Department": staffMember.Department,
      "Date of Birth": staffMember.DOB,
      "Date of Joining": staffMember.DOJ,
      "Gender": staffMember.Gender,
      "Category": staffMember.Category,
      "Languages Known": staffMember.LanguageKnown.join(", "),
      "Nationality": staffMember.Nationality,
      "Mobile No": staffMember.MobileNo,
      "Email": staffMember.Email,
      "Salary": staffMember.Salary,
      "Blood Group": staffMember.BloodGroup,
      "Job Grade": staffMember.JobGrade,
      "Experience": staffMember.Experience,
      "Last School": staffMember.LastSchool,
      "Referred Name": staffMember.ReferredName,
      "Referred Contact": staffMember.ReferredContact,
      "Transport": staffMember.Transport ? "Yes" : "No",
      "Route": staffMember.Route,
      "Address": staffMember.Address,
      "City": staffMember.City,
      "Area": staffMember.Area,
      "Pincode": staffMember.Pincode,
      "Religion": staffMember.Religion,
      "Marital Status": staffMember.MaritalStatus,
      "Teaching Subjects": staffMember.TeachingSubject.join(", "),
      "Aadhar No": staffMember.AadharNo,
      "PAN No": staffMember.PanNo,
      "PF No": staffMember.PFNo,
      "Bank Name": staffMember.BankName,
      "Account Number": staffMember.AccountNumber,
      "IFSC Code": staffMember.IFSCCode,
      "Home Work Publish": staffMember.HomeWorkPublish ? "Yes" : "No",
      "Class Teacher": staffMember.ClassTeacher ? "Yes" : "No",
      "Class": staffMember.Class.join(", "),
      "Status": staffMember.Status,
      "Family Middle Name": staffMember.FamilyDetail?.MiddleName || "",
      "Family Mobile No": staffMember.FamilyDetail?.MobileNo || "",
      "Family Email": staffMember.FamilyDetail?.EmailId || "",
      "Emergency Contact Name": staffMember.EmergencyContact?.Name || "",
      "Emergency Contact Mobile No": staffMember.EmergencyContact?.MobileNo || "",
      "Assigned Classes": staffMember.Assign.map((a) => `${a.Class} (${a.Subject})`).join(", ")
    }));
  };

  // Function to print the staff table
  const printTable = () => {
    const printContent = document.getElementById("staff-table").outerHTML;
    const originalContent = document.body.innerHTML;

    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
    <html>
      <head>
        <title>All Staff Data</title>
        <style>
          @media print {
            img {
              width: 50px;
              height: auto;
            }
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid black;
              padding: 8px;
              text-align: left;
            }
            .action-column {
              display: none; /* Hide the Action column when printing */
            }
          }
        </style>
      </head>
      <body>${printContent}</body>
    </html>
  `);
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
  };


  const toggleModal = (staff) => {
    console.log(staff.EmployeeId)
    const role = localStorage.getItem("Role");
    if(role=="Superadmin" || role=="Admin"){
      navigate(`/admin/viewstaff`, { state: { Id: staff.EmployeeId } });
    } else{
      navigate(`/employee/viewstaff`, { state: { Id: staff.EmployeeId } });
    }

  }

  const toggleModalEdit = (staff) => {
    console.log(staff.EmployeeId)
    const role = localStorage.getItem("Role");
    if(role=="Superadmin" || role=="Admin"){
      navigate(`/admin/editstaff`, { state: { Id: staff.EmployeeId } });
    } else{
      navigate(`/employee/editstaff`, { state: { Id: staff.EmployeeId } });
    }

  }

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async (staffId) => {
    if (!window.confirm("Are you sure you want to delete this staff member?")) {
      return; // User cancelled
    }

    try {
      const response = await axios.delete(`http://localhost:8007/staff/delete/${staffId}`);

      if (response.status === 204) {
        alert('Staff member deleted successfully!');
        // Remove the deleted staff member from the state
        setStaff((prevStaff) => prevStaff.filter(member => member.EmployeeId !== staffId));
      } else {
        throw new Error('Unexpected response status: ' + response.status);
      }
    } catch (error) {
      console.error('Error deleting staff member:', error);
      alert(`Failed to delete staff member: ${error.response?.data?.message || error.message}`);
    }
  };

  const [file, setFile] = useState(null);


  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };


  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first.');
      return;
    }
  
    console.log('Selected file:', file);
  
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
  
        const formattedData = jsonData.map((item) => ({
          EmployeeId: item["Employee ID"],
          Role: item["Role"],
          Department: item["Department"] || '',
          Name: item["Name"],
          DOB: item["DOB"],
          DOJ: item["DOJ"],
          Gender: item["Gender"],
          Category: item["Category"] || '',
          LanguageKnown: item["LanguageKnown"] ? item["LanguageKnown"].split(", ") : [],
          Nationality: item["Nationality"] || '',
          MobileNo: item["MobileNo"],
          Email: item["Email"],
          Salary: item["Salary"],
          BloodGroup: item["BloodGroup"],
          JobGrade: item["JobGrade"],
          Experience: item["Experience"] || '',
          LastSchool: item["LastSchool"] || '',
          ReferredName: item["ReferredName"] || '',
          ReferredContact: item["ReferredContact"] || '',
          Transport: item["Transport"] === 'true',
          Route: item["Route"] || '',
          Address: item["Address"] || '',
          City: item["City"] || '',
          Area: item["Area"] || '',
          Pincode: item["Pincode"] || '',
          Religion: item["Religion"] || '',
          MaritalStatus: item["MaritalStatus"],
          TeachingSubject: item["TeachingSubject"] ? item["TeachingSubject"].split(", ") : [],
          AadharNo: item["AadharNo"],
          PanNo: item["PanNo"],
          PFNo: item["PFNo"] || '',
          BankName: item["BankName"] || '',
          AccountNumber: item["AccountNumber"] || '',
          IFSCCode: item["IFSCCode"] || '',
          HomeWorkPublish: item["HomeWorkPublish"] === 'true',
          ClassTeacher: item["ClassTeacher"] === 'true',
          Class: item["Class"] ? item["Class"].split(", ") : [],
          Status: item["Status"] || "Active",
          FamilyDetail: {
            MiddleName: item["Family Middle Name"] || '',
            MobileNo: item["Family Mobile No"] || '',
            EmailId: item["Family Email"] || '',
          },
          EmergencyContact: {
            Name: item["Emergency Contact Name"] || '',
            MobileNo: item["Emergency Contact Mobile No"] || '',
          },
          Documents: {
            Photo: '',
            QualificationCertificate: '',
            ExperienceLetter: '',
          },
          Assign: item["Assign"] ? item["Assign"].split(", ").map(assign => ({
            Class: assign,
            ClassId: '',
            Section: '',
            Subject: '',
          })) : [],
        }));
  
        console.log("Formatted Data to Send to API:", formattedData);
  
        try {
          const response = await axios.post("http://localhost:8007/staff/bulk-upload", formattedData, {
            headers: { 'Content-Type': 'application/json' },
          });
  
          console.log("Upload Response:", response.data);
          alert("File uploaded and data saved successfully!");
        } catch (uploadError) {
          console.error("Error uploading data:", uploadError);
          alert(`Error uploading data: ${uploadError.response ? uploadError.response.data : uploadError.message}`);
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
    <>
      <MainDashboard>
        <TableContainer>
          <ButtonGroup>
            <OpenButton>All Staff</OpenButton>
          </ButtonGroup>


          {/* Search Inputs Container */}
          <SearchContainer>
            <SearchInput
              placeholder="Search by Staff Gender"
              value={searchGender}
              onChange={(e) => setSearchGender(e.target.value)}
            />
            <SearchInput
              placeholder="Search by Staff Salary"
              value={searchSalary}
              onChange={(e) => setSearchSalary(e.target.value)}
            />
            <SearchInput
              placeholder="Search by Department"
              value={searchDepartment}
              onChange={(e) => setSearchDepartment(e.target.value)}
            />
            <SearchInput
              placeholder="Search by Role"
              value={searchRole}
              onChange={(e) => setSearchRole(e.target.value)}
            />
            <SearchInput
              placeholder="Search by Staff Job Grade"
              value={searchJobGrade}
              onChange={(e) => setSearchJobGrade(e.target.value)}
            />
            <SearchInput
              placeholder="Search by Staff Name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
            <SearchInput
              placeholder="Search by Staff DOB"
              value={searchDOB}
              onChange={(e) => setSearchDOB(e.target.value)}
            />
          </SearchContainer>
          <ButtonSection>
            <button onClick={exportToExcel} style={{ color: "green" }}>
              <SiMicrosoftexcel />
            </button>
            <button onClick={printTable} style={{ color: "#1c3eae" }}>
              <IoMdPrint />
            </button>
          </ButtonSection>
          <div id="staff-table">

            <Table>
              <thead>
                <tr>
                  <Th>Staff Photo</Th>
                  <Th>Staff Id</Th>
                  <Th>Staff Name</Th>
                  <Th>Department</Th>
                  <Th>Employee Role</Th>
                  <Th>Job Grade</Th>
                  <Th>Monthly Salary</Th>
                  <Th>Gender</Th>
                  <Th>DOB</Th>
                  <Th>Status</Th>
                  <Th>Class Teacher</Th>
                  <Th>Transport</Th>
                  <Th>Referred By</Th>
                  <Th className="action-column">View</Th>
                  <Th className="action-column" style={{ fontWeight: "bold" }}>Action</Th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((staffMember) => (
                  <tr key={staffMember._id}>
                    <Td><Photo src={`http://localhost:8007/uploads/${staffMember?.Documents?.Photo}`} alt="Staff" /></Td>
                    <Td>{staffMember.EmployeeId}</Td>
                    <Td>{staffMember.Name}</Td>
                    <Td>{staffMember.Department}</Td>
                    <Td>{staffMember.Role}</Td>
                    <Td>{staffMember.JobGrade}</Td>
                    <Td>{staffMember.Salary}</Td>
                    <Td>{staffMember.Gender}</Td>
                    <Td>{staffMember.DOB}</Td>
                    <Td>
                      <StatusButton>{staffMember.Status}</StatusButton>
                    </Td>
                    <Td>
                      <StatusButton>
                        {staffMember.ClassTeacher ? "Yes" : "No"}
                      </StatusButton>
                    </Td>
                    <Td>
                      <StatusButton>
                        {staffMember.Transport ? "Yes" : "No"}
                      </StatusButton>
                    </Td>
                    <Td>{staffMember.ReferredName}</Td>
                    <Td style={{ gap: "0.5rem" }} className="action-column">
                      <Eye onClick={() => toggleModal(staffMember)} />

                    </Td>
                    <Td1 className="action-column">
                      <EditButton onClick={() => toggleModalEdit(staffMember)}>
                        <Edit size={18} />
                      </EditButton>
                      <DeleteButton onClick={() => handleDelete(staffMember.EmployeeId)}>
                        <Trash2 size={16} />
                      </DeleteButton>
                    </Td1>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <PaginationContainer>
            <PaginationInfo>
              Rows per page:
              <RowsPerPageDropdown>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </RowsPerPageDropdown>
              1-{totalPages} of {staff.length}
            </PaginationInfo>

            <div>
              <PaginationButton
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                Previous
              </PaginationButton>
              <PaginationButton
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </PaginationButton>
            </div>
          </PaginationContainer>
        </TableContainer>
      </MainDashboard>
    </>
  );
};
export default AllStaff;