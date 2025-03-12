import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// Styled components
const Container = styled.div`
  width: 80%;
  margin: 50px auto;
  background-color: #f9f9f9;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background-color: #f4f4f4;
`;

const TableRow = styled.tr`
  background-color: #fff;
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableHeader = styled.th`
  padding: 15px;
  text-align: left;
  font-size: 14px;
  color: #666;
`;

const TableData = styled.td`
  padding: 15px;
  text-align: left;
  font-size: 14px;
  color: #333;
`;

const ActionButton = styled.button`
  padding: 8px 20px;
  border-radius: 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 500px;
`;

const ModalHeader = styled.h2`
  margin: 0 0 10px;
`;

const CloseButton = styled.button`
  margin-top: 20px;
  padding: 8px 20px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #d32f2f;
  }
`;

const PayrollTable = () => {
  const navigate = useNavigate();

  const [payrollData, setPayrollData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8007/pay-slip/all")
      .then((response) => {
        console.log(response.data)
        setPayrollData(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleView = (payment) => {

    const role = localStorage.getItem("Role");
    if (role == "Superadmin" || role == "Admin") {
      navigate(`/admin/salary-slip`, { state: { EmployeeId: payment.EmployeeId, SlipId: payment.SlipId } });
    } else {
      navigate(`/employee/salary-slip`, { state: { EmployeeId: payment.EmployeeId, SlipId: payment.SlipId } });
    }
  };

  const handleCloseModal = () => {
    setSelectedPayment(null);
  };

  return (
    <Container>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Payroll ID</TableHeader>
                <TableHeader>Employee ID</TableHeader>
                <TableHeader>Date</TableHeader>
                <TableHeader>Total Salary</TableHeader>
                {/* <TableHeader>Remarks</TableHeader> */}
                <TableHeader>Actions</TableHeader>
              </TableRow>
            </TableHead>
            <tbody>
              {payrollData.length > 0 ? (
                payrollData.map((item) => (
                  <TableRow key={item._id}>
                    <TableData>{item.SlipId}</TableData>
                    <TableData>{item.EmployeeId}</TableData>
                    <TableData>{item.Date}</TableData>
                    <TableData>{item.Amount}</TableData>
                    {/* <TableData>{item.Remark}</TableData> */}
                    <TableData>
                      <ActionButton onClick={() => handleView(item)}>
                        View
                      </ActionButton>
                    </TableData>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableData colSpan="6">No data available</TableData>
                </TableRow>
              )}
            </tbody>
          </Table>

          {selectedPayment && (
            <ModalBackground>
              <ModalContainer>
                <ModalHeader>Payment Details</ModalHeader>
                <p><strong>Payroll ID:</strong> {selectedPayment.PayrollID}</p>
                <p><strong>Employee ID:</strong> {selectedPayment.EmployeeId}</p>
                <p><strong>Date:</strong> {selectedPayment.Date}</p>
                <p><strong>Total Salary:</strong> {selectedPayment.TotalSalary}</p>
                <p><strong>Remarks:</strong> {selectedPayment.Remark}</p>
                <p><strong>Salary Details:</strong></p>
                <ul>
                  <li>Absent: {selectedPayment.Salary.Absent}</li>
                  <li>Leave: {selectedPayment.Salary.Leave}</li>
                  <li>Half: {selectedPayment.Salary.Half}</li>
                  <li>Late: {selectedPayment.Salary.Late}</li>
                  <li>Base Salary: {selectedPayment.Salary.BaseSalary}</li>
                  <li>Per Day Salary: {selectedPayment.Salary.PerDaySalary}</li>
                </ul>
                <CloseButton onClick={handleCloseModal}>Close</CloseButton>
              </ModalContainer>
            </ModalBackground>
          )}
        </>
      )}
    </Container>
  );
};

export default PayrollTable;
