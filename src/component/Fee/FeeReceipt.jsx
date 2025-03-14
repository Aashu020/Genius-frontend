import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
// import styled from 'styled-components';
import { jsPDF } from "jspdf"; // Import jsPDF
import axios from 'axios';
import { 
    Container, ReceiptWrapper, Receipt, CopyLabel, Header, Title, SubTitle, SectionTitle, InfoSection, Row, 
    LabelDiv, ValueDiv, Label, Value, Table,TableContainer, TableHeader, TableData, AmountRow, Footer, DetailsText, 
    AuthSign, PrintButton 
  } from "./FeeStyles";
  import  baseURL from '../utils/Url'; 

const FeeReceipt = () => {
    const location = useLocation();
    const [feeData, setFeeData] = useState(null);
    const [session, setSession] = useState(0);
    const [totalAmount, setTotalAmount] = useState("");
    const [payments, setPayments] = useState(null);
    const [school, setSchool] = useState(null);
    const receiptRef = useRef(); // Ref for ReceiptWrapper

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${baseURL}/fee-data/get/${location.state.StudentId}`);
                const data = await response.json();
                var filData = data.Payments.filter(val => val.ReceiptId === location.state.ReceiptId);
                // console.log(filData.Fee)
                var total = filData[0].Fee.reduce((acc,val)=>{ return acc+ val.Amount},0)
                setTotalAmount(total)
                setFeeData(data);
                let last8Digits = data.FeeID.slice(-8);
                let formatted = last8Digits.slice(0, 4) + '-' + last8Digits.slice(4);
                setSession(formatted);
                setPayments(filData);
                console.log(data);
            } catch (error) {
                console.error("Error fetching fee data:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        axios
            .get(`${baseURL}/schoolsetup/all`)
            .then((response) => {
                if (response.data.length > 0) {
                    setSchool(response.data[0])
                }
            })
            .catch((error) => {
                console.error(error);
            })
    }, []);

    if (!feeData) {
        return <p>Loading...</p>;
    }

    const totalFee = feeData.TotalFee || 0;
    const remainingFee = feeData.RemainingFee || 0;
    // const paidFee = feeData.P
    const balance = feeData.Balance || 0;

    const renderPaymentRows = (payment) => {
        console.log(payment)
        return payment.Fee.map((feeItem, index) => (
            <tr key={feeItem._id}>
                <TableData style={{ textAlign: 'center' }}>{index + 1}</TableData>
                <TableData style={{ textAlign: 'left' }}>{feeItem.Name}</TableData>
                <TableData>{feeItem.Amount.toFixed(2)}</TableData>
            </tr>
        ));
    };

    // Generate the PDF for only the ReceiptWrapper
    const generatePDF = () => {
        const doc = new jsPDF('p', 'mm', 'a4');
        const content = receiptRef.current;

        const scaleFactor = 0.2; // Set the scale factor (20% of original size)

        const tempElement = content.cloneNode(true);
        tempElement.style.transform = scale(`${scaleFactor}`);
        tempElement.style.transformOrigin = 'top left';
        tempElement.style.width = `${content.offsetWidth}px`;
        tempElement.style.height = `${content.offsetHeight * scaleFactor}px`;

        const body = document.body;
        body.appendChild(tempElement);

        doc.html(tempElement, {
            callback: (doc) => {
                body.removeChild(tempElement);

                // Calculate content height after scaling
                const scaledContentHeight = content.offsetHeight * scaleFactor;
                const contentHeight = doc.internal.pageSize.height;

                // Check if the content will fit on a single page
                if (scaledContentHeight > contentHeight) {
                    // Split the content across multiple pages
                    const pageCount = Math.ceil(scaledContentHeight / contentHeight);
                    for (let i = 1; i < pageCount; i++) {
                        doc.addPage();
                    }
                }

                doc.save(`fee_receipt${payments[0].ReceiptId}.pdf`);
            },
            margin: [0, 0, 0, 0],
            x: 10,
            y: 10
        });
    };


    return (
        <Container>
            {/* Button to download PDF */}
            <PrintButton onClick={generatePDF}>Download PDF</PrintButton>

            {/* ReceiptWrapper content wrapped inside ref */}
            <div ref={receiptRef}>
                {payments.map((payment, idx) => (
                    <ReceiptWrapper key={payment._id}>
                        <Receipt>
                            <CopyLabel>Student Copy</CopyLabel>
                            <Header>
                                <Title>{school?.SchoolName}</Title>
                                <SubTitle>{school?.EmailId} | {school?.PhoneNo}</SubTitle>
                                <SubTitle>{school?.Website}</SubTitle>
                                <SectionTitle>Fee Receipt</SectionTitle>
                                <InfoSection>
                                    <Row>
                                        <LabelDiv>Receipt No.</LabelDiv>
                                        <ValueDiv>{payment.ReceiptId}</ValueDiv>
                                    </Row>
                                    <Row>
                                        <LabelDiv>Date</LabelDiv>
                                        <ValueDiv>{payment.Date.split("-").reverse().join("-")}</ValueDiv>
                                    </Row>
                                    <Row>
                                        <LabelDiv>Session</LabelDiv>
                                        <ValueDiv>{session}</ValueDiv>
                                    </Row>
                                    <Row>
                                        <LabelDiv>Admission No.</LabelDiv>
                                        <ValueDiv>{feeData.StudentId}</ValueDiv>
                                    </Row>
                                    <Row>
                                        <LabelDiv>Student Name</LabelDiv>
                                        <ValueDiv>{location?.state?.Name}</ValueDiv>
                                    </Row>
                                    <Row>
                                        <LabelDiv>Class / Section</LabelDiv>
                                        <ValueDiv>{location?.state?.Class} / {location?.state?.Section}</ValueDiv>
                                    </Row>
                                    <Row>
                                        <LabelDiv>Fee for the Month(s)</LabelDiv>
                                        <ValueDiv>{payment.Months.join(", ")}</ValueDiv>
                                    </Row>
                                    
                                </InfoSection>
                            </Header>
                           <TableContainer>
                           <Table>
                                <thead>
                                    <tr>
                                        <TableHeader style={{ textAlign: 'center' }}>S. No.</TableHeader>
                                        <TableHeader style={{ textAlign: 'left' }}>Particulars</TableHeader>
                                        <TableHeader style={{textAlign:"right"}}>Amount</TableHeader>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderPaymentRows(payment)}
                                    <AmountRow>
                                        <TableData></TableData>
                                        <TableData style={{ textAlign: 'left' }}>Total Amount</TableData>
                                        <TableData>{totalFee.toFixed(2)}</TableData>
                                    </AmountRow>
                                    {payment.LateFee ? (
                                        <tr>
                                            <TableData></TableData>
                                            <TableData style={{ textAlign: 'left' }}>(+) Late Fee</TableData>
                                            <TableData>{payment.LateFee.toFixed(2)}</TableData>
                                        </tr>
                                    ) : null}
                                    {payment.Concession ? (
                                        <tr>
                                            <TableData></TableData>
                                            <TableData style={{ textAlign: 'left' }}>(-) Concession</TableData>
                                            <TableData>{payment.Concession.toFixed(2)}</TableData>
                                        </tr>
                                    ) : null}
                                    <AmountRow>
                                        <TableData></TableData>
                                        <TableData style={{ textAlign: 'left' }}>Grand Total</TableData>
                                        <TableData>{(totalAmount - (payment.Concession || 0) + (payment.LateFee || 0)).toFixed(2)}</TableData>
                                    </AmountRow>
                                    <AmountRow>
                                        <TableData></TableData>
                                        <TableData style={{ textAlign: 'left' }}>Received Amount</TableData>
                                        <TableData>{payment.PaidAmount.toFixed(2)}</TableData>
                                    </AmountRow>
                                    <AmountRow>
                                        <TableData></TableData>
                                        <TableData style={{ textAlign: 'left' }}>Balance</TableData>
                                        <TableData>{balance.toFixed(2)}</TableData>
                                    </AmountRow>
                                    <AmountRow>
                                        <TableData></TableData>
                                        <TableData style={{ textAlign: 'left' }}>Total Fee</TableData>
                                        <TableData>{totalFee.toFixed(2)}</TableData>
                                    </AmountRow>
                                    <AmountRow>
                                        <TableData></TableData>
                                        <TableData style={{ textAlign: 'left' }}>Pending Fee</TableData>
                                        <TableData>{location.state.Pending.toFixed(2)}</TableData>
                                    </AmountRow>
                                </tbody>
                            </Table>
                           </TableContainer>
                            

                            <Footer>
                                <DetailsText>Details: {location.state.PaymentMode} / {payment.Remark}</DetailsText>
                                <AuthSign>Auth. Sign.</AuthSign>
                            </Footer>
                        </Receipt>

                        {/* School Copy */}
                        < Receipt >
                            <CopyLabel>School Copy</CopyLabel>
                            <Header>
                                <Title>{school?.SchoolName}</Title>
                                <SubTitle>{school?.EmailId} | {school?.PhoneNo}</SubTitle>
                                <SubTitle>{school?.Website}</SubTitle>
                                <SectionTitle>Fee Receipt</SectionTitle>
                                <InfoSection>
                                    <Row>
                                        <LabelDiv>Receipt No.</LabelDiv>
                                        <ValueDiv>{payment.ReceiptId}</ValueDiv>
                                    </Row>
                                    <Row>
                                        <LabelDiv>Date</LabelDiv>
                                        <ValueDiv>{payment.Date.split("-").reverse().join("-")}</ValueDiv>
                                    </Row>
                                    <Row>
                                        <LabelDiv>Session</LabelDiv>
                                        <ValueDiv>{session}</ValueDiv>
                                    </Row>
                                    <Row>
                                        <LabelDiv>Admission No.</LabelDiv>
                                        <ValueDiv>{feeData.StudentId}</ValueDiv>
                                    </Row>
                                    <Row>
                                        <LabelDiv>Student Name</LabelDiv>
                                        <ValueDiv>{location?.state?.Name}</ValueDiv>
                                    </Row>
                                    <Row>
                                        <LabelDiv>Class / Section</LabelDiv>
                                        <ValueDiv>{location?.state?.Class} / {location?.state?.Section}</ValueDiv>
                                    </Row>
                                    <Row>
                                        <LabelDiv>Fee for the Month(s)</LabelDiv>
                                        <ValueDiv>{payment.Months.join(", ")}</ValueDiv>
                                    </Row>
                                    
                                </InfoSection>
                            </Header>
                          <TableContainer>
                          <Table>
                                <thead>
                                    <tr>
                                        <TableHeader style={{ textAlign: 'center' }}>S. No.</TableHeader>
                                        <TableHeader style={{ textAlign: 'left' }}>Particulars</TableHeader>
                                        <TableHeader style={{textAlign:"right"}}>Amount</TableHeader>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderPaymentRows(payment)}
                                    <AmountRow>
                                        <TableData></TableData>
                                        <TableData style={{ textAlign: 'left' }}>Total Amount</TableData>
                                        <TableData>{totalFee.toFixed(2)}</TableData>
                                    </AmountRow>
                                    {payment.LateFee ? (
                                        <tr>
                                            <TableData></TableData>
                                            <TableData style={{ textAlign: 'left' }}>(+) Late Fee</TableData>
                                            <TableData>{payment.LateFee.toFixed(2)}</TableData>
                                        </tr>
                                    ) : null}
                                    {payment.Concession ? (
                                        <tr>
                                            <TableData></TableData>
                                            <TableData style={{ textAlign: 'left' }}>(-) Concession</TableData>
                                            <TableData>{payment.Concession.toFixed(2)}</TableData>
                                        </tr>
                                    ) : null}
                                    <AmountRow>
                                        <TableData></TableData>
                                        <TableData style={{ textAlign: 'left' }}>Grand Total</TableData>
                                        <TableData>{(totalAmount - (payment.Concession || 0) + (payment.LateFee || 0)).toFixed(2)}</TableData>
                                    </AmountRow>
                                    <AmountRow>
                                        <TableData></TableData>
                                        <TableData style={{ textAlign: 'left' }}>Received Amount</TableData>
                                        <TableData>{payment.PaidAmount.toFixed(2)}</TableData>
                                    </AmountRow>
                                    <AmountRow>
                                        <TableData></TableData>
                                        <TableData style={{ textAlign: 'left' }}>Balance</TableData>
                                        <TableData>{balance.toFixed(2)}</TableData>
                                    </AmountRow>
                                    <AmountRow>
                                        <TableData></TableData>
                                        <TableData style={{ textAlign: 'left' }}>Total Fee</TableData>
                                        <TableData>{totalFee.toFixed(2)}</TableData>
                                    </AmountRow>
                                    <AmountRow>
                                        <TableData></TableData>
                                        <TableData style={{ textAlign: 'left' }}>Pending Fee</TableData>
                                        <TableData>{location.state.Pending.toFixed(2)}</TableData>
                                    </AmountRow>
                                </tbody>
                            </Table>
                          </TableContainer>
                           

                            <Footer>
                                <DetailsText>Details: {location.state.PaymentMode} / {payment.Remark}</DetailsText>
                                <AuthSign>Auth. Sign.</AuthSign>
                            </Footer>
                        </Receipt>
                    </ReceiptWrapper>
                ))
                }
            </div >
        </Container >
    );
};

export default FeeReceipt;