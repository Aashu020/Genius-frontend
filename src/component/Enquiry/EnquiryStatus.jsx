import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Navbar from "../Navbar";
import EnquirySidebar from "../Enquiry/EnquirySidebar";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { utils, writeFile } from "xlsx";
import { Eye, Edit, Trash2 } from "lucide-react";





const MainDashboard = styled.div`
  flex: 1;
  background-color: #f9f9f9;
  height: calc(100vh - 100px);
  overflow-y: auto;
`;

Chart.register(ArcElement, Tooltip, Legend);

// Styled Components
const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 15px;
  background-color: #fff;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  width: calc(100vw - 300px);
  max-width: 900px;

  @media (max-width: 600px) {
    width: 90%;
    padding: 10px;
  }
`;

const ChartTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Section = styled.div`
  display: flex;
  gap: 5px;
  button {
    border-radius: 5px;
    border: 0.5px solid;
    background-color: transparent;
    padding: 2px 8px;
    color: black;
  }
`;

const Inline = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #888;
  margin-bottom: 20px;
`;

const TableContainer = styled.div`
  font-family: Arial, sans-serif;
  margin: 20px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const ButtonGroup = styled.div`
  display: flex;
  margin-bottom: 20px;
  justify-content: space-between;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  width: 32%;
`;

const OpenButton = styled(Button)`
  background-color: #7b68ee;
`;

const FollowUpButton = styled(Button)`
  background-color: #191970;
`;

const HotButton = styled(Button)`
  background-color: #fc858f;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  background-color: #f2f2f2;
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  font-weight: 400;
`;

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const StatusButton = styled.button`
  background-color: #ebedeb;
  color: black;
  border: none;
  padding: 5px 10px;
  border-radius: 15px;
`;
const MarkButton = styled.button`
  background-color: #209a16bf;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 15px;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 10px 20px;
  border-top: 1px solid #e0e0e0;
  background-color: #fff;
`;

const PaginationInfo = styled.div`
  display: flex;
  align-items: center;
  color: #888;
`;

const PaginationButton = styled.button`
  background-color: #fff;
  color: ${(props) => (props.disabled ? "#ccc" : "#000")};
  border: none;
  padding: 5px 15px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  font-size: 14px;

  &:hover {
    background-color: ${(props) => (props.disabled ? "#fff" : "#f0f0f0")};
  }
`;

const RowsPerPageDropdown = styled.select`
  margin: 0 10px;
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  font-size: 14px;
  cursor: pointer;
`;

//modal

const ModalWrapper = styled.div`
  position: fixed;
  display: ${(prop) => (prop.show ? "block" : "none")};
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: fixed;
  background: white;
  width: 500px;
  padding: 20px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  h3 {
    font-weight: bold;
    margin-bottom: 10px;
  }
  p {
    margin-bottom: 5px;
    font-size: 18px;
  }
  strong {
    font-weight: bold;
  }
`;
const CloseButton = styled.button`
  background-color: red;
  color: white;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  position: absolute;
  top: 10px;
  right: 10px;
`;

// Chart data
const data = {
  labels: ["Open", "Hot", "Follow Up"],
  datasets: [
    {
      label: "Enquiry Status",
      data: [30, 40, 30], // Dynamically change data here
      backgroundColor: ["#a4c7ff", "#ff8c94", "#003f91"],
      borderWidth: 1,
    },
  ],
};

// Chart options
const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        color: "#000",
      },
    },
  },
};

const EnquiryStatus = () => {
  const [enquiryData, setData] = useState([]);
  const [activeTable, setActiveTable] = useState("open");

  useEffect(() => {
    axios
      .get("http://localhost:8007/enquiry/all")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(enquiryData.length / itemsPerPage);
  const currentData = enquiryData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  // Helper functions for downloads
  const downloadPDF = (chartTitle, columns, rows) => {
    const doc = new jsPDF();
    doc.text(chartTitle, 10, 10);
    doc.autoTable({
      head: [columns],
      body: rows,
    });
    doc.save(`${chartTitle}.pdf`);
  };

  const downloadCSV = (data, fileName) => {
    const worksheet = utils.aoa_to_sheet(data);
    const csvOutput = utils.sheet_to_csv(worksheet);
    const blob = new Blob([csvOutput], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${fileName}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadExcel = (data, fileName) => {
    const worksheet = utils.aoa_to_sheet(data);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Sheet1");
    writeFile(workbook, `${fileName}.xlsx`);
  };

  const markAsFollowUp = (registration) => {
    var dataToSend = { ...registration, Status: "Follow up" };
    // console.log(dataToSend)
    axios
      .put(
        `http://localhost:8007/enquiry/update/${registration.RegistrationNo}`,
        dataToSend
      )
      .then((response) => {
        setData((prevData) =>
          prevData.map((item) =>
            item.RegistrationNo === registration.RegistrationNo
              ? { ...item, Status: "Follow up" }
              : item
          )
        );
      })
      .catch((error) => {
        console.error("Error updating status", error);
      });
  };

  const markAsHot = (registration) => {
    var dataToSend = { ...registration, Status: "Hot" };
    // console.log(dataToSend)
    axios
      .put(
        `http://localhost:8007/enquiry/update/${registration.RegistrationNo}`,
        dataToSend
      )
      .then((response) => {
        setData((prevData) =>
          prevData.map((item) =>
            item.RegistrationNo === registration.RegistrationNo
              ? { ...item, Status: "Hot" }
              : item
          )
        );
      })
      .catch((error) => {
        console.error("Error updating status", error);
      });
  };

  const filteredData = (status) => {
    return enquiryData.filter((enquiry) => enquiry.Status === status);
  };

  const OpenTable = () => (
    <Table>
      <thead>
        <tr>
          <Th>Registration No</Th>
          <Th>Student Name</Th>
          <Th>Admission Class</Th>
          <Th>Parent Details</Th>
          <Th>Contact No</Th>
          <Th>View</Th>
          <Th style={{ fontWeight: "bold" }}>Status</Th>
          <Th style={{ fontWeight: "bold" }}>Action</Th>
        </tr>
      </thead>
      <tbody>
        {filteredData("Open").map((student, index) => (
          <tr key={index}>
            <Td>{student.RegistrationNo}</Td>
            <Td>{student.StudentName}</Td>
            <Td>{student.AdmissionClass}</Td>
            <Td>{student.FatherName}</Td>
            <Td>{student.MobileNo}</Td>
            <Td>
              <Eye onClick={() => toggleModal(student)} size={18} />
            </Td>
            <Td>
            <StatusButton>{student.Status}</StatusButton>
            </Td>

            <Td>
              <MarkButton onClick={() => markAsFollowUp(student)}>
                MARK DONE
              </MarkButton>
            </Td>
          </tr>
        ))}
      </tbody>
    </Table>
  );

  const FollowupTable = () => (
    <Table>
      <thead>
        <tr>
          <Th>Registration No</Th>
          <Th>Student Name</Th>
          <Th>Admission Class</Th>
          <Th>Parent Details</Th>
          <Th>Contact No</Th>
          <Th>View</Th>
          <Th style={{ fontWeight: "bold" }}>Status</Th>
          <Th style={{ fontWeight: "bold" }}>Action</Th>
        </tr>
      </thead>
      <tbody>
        {filteredData("Follow up").map((student, index) => (
          <tr key={index}>
            <Td>{student.RegistrationNo}</Td>
            <Td>{student.StudentName}</Td>
            <Td>{student.AdmissionClass}</Td>
            <Td>{student.FatherName}</Td>
            <Td>{student.MobileNo}</Td>
            <Td>
              <Eye onClick={() => toggleModal(student)} size={18} />
            </Td>
            <Td>
              <StatusButton>{student.Status}</StatusButton>
            </Td>

            <Td>
              <MarkButton onClick={() => markAsHot(student)}>
                MARK DONE
              </MarkButton>
            </Td>
          </tr>
        ))}
      </tbody>
    </Table>
  );

  const HotTable = () => (
    <Table>
      <thead>
        <tr>
          <Th>Registration No</Th>
          <Th>Student Name</Th>
          <Th>Admission Class</Th>
          <Th>Parent Details</Th>
          <Th>Contact No</Th>
          <Th>View</Th>
        </tr>
      </thead>
      <tbody>
        {filteredData("Hot").map((student, index) => (
          <tr key={index}>
            <Td>{student.RegistrationNo}</Td>
            <Td>{student.StudentName}</Td>
            <Td>{student.AdmissionClass}</Td>
            <Td>{student.FatherName}</Td>
            <Td>{student.MobileNo}</Td>
            <Td>
              <Eye onClick={() => toggleModal(student)} size={18} />
            </Td>
          </tr>
        ))}
      </tbody>
    </Table>
  );

  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const toggleModal = (student) => {
    setSelectedStudent(student);
    setShowModal(!showModal);
  };

  const countOpen = enquiryData.filter((enquiry) => enquiry.Status === "Open").length;
  const countFollowUp = enquiryData.filter((enquiry) => enquiry.Status === "Follow up").length;
  const countHot = enquiryData.filter((enquiry) => enquiry.Status === "Hot").length;

  return (
    <>

      <MainDashboard>
        <CardContainer>
          <Inline>
            <ChartTitle>Enquiry</ChartTitle>
            <Section>
              <button
                onClick={() =>
                  downloadPDF(
                    "Enquiry Chart",
                    ["Status", "Count"],
                    [
                      ["Open", countOpen],
                      ["Hot", countHot],
                      ["Follow Up", countFollowUp],
                    ]
                  )
                }
              >
                PDF
              </button>
              <button
                onClick={() =>
                  downloadCSV(
                    [
                      ["Status", "Count"],
                      ["Open", countOpen],
                      ["Hot", countHot],
                      ["Follow Up", countFollowUp],
                    ],
                    "Enquiry_Chart"
                  )
                }
              >
                CSV
              </button>
              <button
                onClick={() =>
                  downloadExcel(
                    [
                      ["Status", "Count"],
                      ["Open", countOpen],
                      ["Hot", countHot],
                      ["Follow Up", countFollowUp],
                    ],
                    "Enquiry_Chart"
                  )
                }
              >
                Excel
              </button>
            </Section>
          </Inline>
          <Subtitle>Count of different enquiry status</Subtitle>
          <div style={{ height: "200px" }}>
            <Doughnut
              data={{
                labels: ["Open", "Hot", "Follow Up"],
                datasets: [
                  {
                    label: "Enquiry Status",
                    data: [countOpen, countHot, countFollowUp],
                    backgroundColor: ["#a4c7ff", "#ff8c94", "#003f91"],
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "bottom",
                    labels: {
                      color: "#000",
                    },
                  },
                },
              }}
            />
          </div>
        </CardContainer>

        <TableContainer>
          <ButtonGroup>
            <OpenButton onClick={() => setActiveTable("open")}>
              Open
            </OpenButton>
            <FollowUpButton onClick={() => setActiveTable("followup")}>
              Follow Up
            </FollowUpButton>
            <HotButton onClick={() => setActiveTable("hot")}>Hot</HotButton>
          </ButtonGroup>
          {activeTable === "open" && <OpenTable />}
          {activeTable === "followup" && <FollowupTable />}
          {activeTable === "hot" && <HotTable />}

          {showModal && selectedStudent && (
            <ModalWrapper show={showModal}>
              <ModalContent>
                <CloseButton onClick={toggleModal}>X</CloseButton>

                <h3>
                  Student Registration no: {selectedStudent.RegistrationNo}
                </h3>
                <p>
                  <strong>Student Name:</strong> {selectedStudent.StudentName}
                </p>
                <p>
                  <strong>Date Of Birth:</strong> {selectedStudent.DOB}
                </p>
                <p>
                  <strong>Gender:</strong> {selectedStudent.Gender}
                </p>
                <p>
                  <strong>Contact No:</strong> {selectedStudent.MobileNo}
                </p>
                <p>
                  <strong>Admission In Class:</strong>{" "}
                  {selectedStudent.AdmissionClass}
                </p>
                <p>
                  <strong>Father Name:</strong> {selectedStudent.FatherName}
                </p>
                <p>
                  <strong>Mother Name:</strong> {selectedStudent.MotherName}
                </p>
                <p>
                  <strong>Address:</strong> {selectedStudent.Address}
                </p>
                <p>
                  <strong>Referred By:</strong> {selectedStudent.Refer}
                </p>
                <p>
                  <strong>Requirement:</strong> {selectedStudent.Requirement}
                </p>
                <p>
                  <strong>How you got to know About This school:</strong>{" "}
                  {selectedStudent.Message}
                </p>
              </ModalContent>
            </ModalWrapper>
          )}

          <PaginationContainer>
            <PaginationInfo>
              Rows per page:
              <RowsPerPageDropdown>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </RowsPerPageDropdown>
              1-{totalPages} of 10
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

export default EnquiryStatus;


