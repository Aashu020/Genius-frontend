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
import  baseURL from '../utils/Url'; 


import {
  Container,
  MainDashboard,
  CardContainer,
  ChartTitle,
  Subtitle,
  Inline,
  Section,
  TableContainer,
  ButtonGroup,
  OpenButton,
  FollowUpButton,
  HotButton,
  Table,
  Th,
  Td,
  StatusButton,
  MarkButton,
  PaginationContainer,
  PaginationInfo,
  PaginationButton,
  RowsPerPageDropdown,
  ModalWrapper,
  ModalContent,
  CloseButton,
  ModalContentAlternate,
  CloseButtonAlternate,
} from "./EnquiryStyles";


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
      .get(`${baseURL}/enquiry/all`)
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
        `${baseURL}/enquiry/update/${registration.RegistrationNo}`,
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
        `${baseURL}/enquiry/update/${registration.RegistrationNo}`,
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


