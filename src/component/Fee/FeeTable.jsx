import axios from "axios";
import { Scroll } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { TableWrapper } from "../Outerstyle2";
import  baseURL from '../utils/Url'; 
// Styled components
const Container = styled.div`
  width: 100%;
  margin: 50px auto;
  background-color: #f9f9f9;
`;

export const Table = styled.table`
  width: 100%; /* ✅ 100% width le, taaki scroll properly aaye */
  min-width: 600px; /* ✅ Avoid shrinking */
  border-collapse: collapse;
  /* margin-top: 30px; */
  
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

export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto; /* ✅ Ensure scrolling works */
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width:768px){
    justify-content: flex-start;
  }
`;


const FeeTable = () => {
    const navigate = useNavigate();
    const [feeData, setFeeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedFee, setSelectedFee] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`${baseURL}/fee-receipt/all`)
            .then((response) => {
                // console.log(response.data)
                setFeeData(response.data.reverse());
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const handleView = (fee) => {
        setSelectedFee(fee);
    };

    const handleCloseModal = () => {
        setSelectedFee(null);
    };

    const goToReceipt = (data) => {
        // console.log(data.StudentId, data.ReceiptId)
        const role = localStorage.getItem("Role")
        if (role.trim().toLowerCase() == "superadmin" || role.trim().toLowerCase() == "admin") {
            navigate(`/admin/fee-receipt`, {
                state: {
                    StudentId: data.StudentId,
                    ReceiptId: data.ReceiptId,
                    Name: data.StudentName,
                    Pending: data.PendingFee,
                    PaymentMode: data.PaymentMode,
                    Class: data.Class,
                    Section: data.Section
                }
            })
        } else {
            navigate(`/employee/fee-receipt`, {
                state: {
                    StudentId: data.StudentId,
                    ReceiptId: data.ReceiptId,
                    Name: data.StudentName,
                    Pending: data.PendingFee,
                    PaymentMode: data.PaymentMode,
                    Class: data.Class,
                    Section: data.Section
                }
            })
        }
    }

    return (
        <Container>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableHeader>Receipt ID</TableHeader>
                                <TableHeader>Date</TableHeader>
                                <TableHeader>Class</TableHeader>
                                <TableHeader>Section</TableHeader>
                                <TableHeader>Name</TableHeader>
                                <TableHeader>Months</TableHeader>
                                <TableHeader>Amount</TableHeader>
                                <TableHeader>View</TableHeader>

                            </TableRow>
                        </TableHead>
                        <tbody>
                            {feeData.length > 0 ? (
                                feeData.map((item) => (
                                    <TableRow key={item._id}>
                                        <TableData>{item.ReceiptId}</TableData>
                                        <TableData>{item.Date}</TableData>
                                        <TableData>{item.Class}</TableData>
                                        <TableData>{item.Section}</TableData>
                                        <TableData>{item.StudentName}</TableData>
                                        <TableData>{item.Months.toString()}</TableData>
                                        <TableData>{item.Amount}</TableData>
                                        <TableData>
                                            <ActionButton onClick={() => goToReceipt(item)}>
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

                    {selectedFee && (
                        <ModalBackground>
                            <ModalContainer>
                                <ModalHeader>Fee Details</ModalHeader>
                                <p><strong>Fee ID:</strong> {selectedFee.FeeID}</p>
                                <p><strong>Student ID:</strong> {selectedFee.StudentId}</p>
                                <p><strong>Total Fee:</strong> {selectedFee.TotalFee}</p>
                                <p><strong>Remaining Fee:</strong> {selectedFee.RemainingFee}</p>
                                <p><strong>Balance:</strong> {selectedFee.Balance}</p>
                                <p><strong>Payments:</strong></p>
                                <ul>
                                    {selectedFee.Payments.map((payment) => (
                                        <li key={payment._id}>
                                            <strong>Date:</strong> {payment.Date} <br />
                                            <strong>Months:</strong> {payment.Months.join(", ")} <br />
                                            <strong>Mode:</strong> {payment.Mode} <br />
                                            <strong>Fee Details:</strong>
                                            <ul>
                                                {payment.Fee.map((fee) => (
                                                    <li key={fee._id}>
                                                        {fee.Name}: {fee.Amount}
                                                    </li>
                                                ))}
                                            </ul>
                                            {payment.Remark && <p><strong>Remark:</strong> {payment.Remark}</p>}
                                        </li>
                                    ))}
                                </ul>
                                <CloseButton onClick={handleCloseModal}>Close</CloseButton>
                            </ModalContainer>
                        </ModalBackground>
                    )}
                    </TableContainer>
                </>
            )}
        </Container>
    );
};


export default FeeTable;
