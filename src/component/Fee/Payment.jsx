import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const MainDashboard = styled.div`
  flex: 1;
  height: calc(100vh - 100px);
  overflow-y: auto;
  padding: 20px;
  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const FeeCollectionWrapper = styled.div`
  max-width: 600px;
  width: 85%;
  margin: 40px auto;
  padding: 20px;
  background-color: #f3f4f6;
  border-radius: 8px;
  font-family: Arial, sans-serif;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: #2b2d7b;
  margin-bottom: 20px;
`;

const Section = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 30px;
`;

const InputContainer = styled.div`
  position: relative;
  width: 45%;
  margin-bottom: 20px;
  @media (max-width: 480px) {
    margin-bottom: 12px;
  }
`;

const Label = styled.span`
  position: absolute;
  top: -10px;
  left: 20px;
  background: linear-gradient(270deg, #222d78 0%, #7130e4 100%);
  color: white;
  padding: 2px 10px;
  border-radius: 20px;
  font-size: 12px;
`;

const DropdownHeader = styled.div`
  width: 85%;
  padding: 10px 18px;
  border: 2px solid #7d3cff;
  border-radius: 30px;
  font-size: 16px;
  color: #7a7a7a;
  background-color: #f4f6fc;
  font-weight: bold;
  cursor: pointer;
`;

const DropdownList = styled.div`
  position: absolute;
  border: 1px solid #ccc;
  background-color: #fff;
  z-index: 1;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
`;

const CheckboxLabel = styled.label`
  display: block;
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const CheckboxInput = styled.input`
  margin-right: 10px;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 20px;
  @media (max-width: 468px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  width: 100%;

  & > label {
    margin-bottom: 5px;
    color: #666;
    @media (max-width: 480px) {
      font-size: 12px;
    }
  }

  & > input {
    padding: 6px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    @media (max-width: 480px) {
      width: 85%;
      font-size: 12px;
    }
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;

  th,
  td {
    border: 1px solid #ccc;
    padding: 10px;
    text-align: center;
    font-size: 14px;
    @media (max-width: 480px) {
      font-size: 12px;
    }
  }

  th {
    background-color: #f0f0f0;
    color: #555;
    font-weight: bold;
  }

  tfoot td {
    font-weight: bold;
  }
`;

const SubmitButton = styled.button`
  display: block;
  width: 150px;
  margin: 0 auto;
  padding: 10px;
  background: linear-gradient(270deg, #222d78 0%, #7130e4 100%);
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: linear-gradient(90deg, #8269ff, #624de3);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 15px 20px;
  border: 2px solid #7d3cff;
  border-radius: 30px;
  font-size: 16px;
  color: #7a7a7a;
  background-color: #f4f6fc;
  font-weight: bold;
`;

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [isFeeDropdownOpen, setIsFeeDropdownOpen] = useState(false);
  const [selectedFees, setSelectedFees] = useState([]);
  const [feeMode, setFeeMode] = useState("");
  const [feeData, setFeeData] = useState(null);
  const [fees, setFees] = useState([]);
  const [student, setStudent] = useState(null);
  const [academic, setAcademic] = useState(null);
  const [deposit, setDeposit] = useState(0);
  const [months, setMonths] = useState([]);
  const [individualTotals, setIndividualTotals] = useState([]);
  const [feeModePayment, setFeeModePayment] = useState("");
  const [revenueStatus, setRevenueStatus] = useState(false);
  const [past, setPast] = useState(false);
  const [grandTotal, setGrandTotal] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [totalPaid, setTotalPaid] = useState(null);
  const [finalAmount, SetFinalAmount] = useState(0);
  const [pastBalance, SetPastBalance] = useState(0);
  const [concession, setConcession] = useState(0);
  const [remark, setRemark] = useState('');
  const [late, setLate] = useState(0)


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch student data
        const studentResponse = await axios.get(`https://api.edspride.in/student/get/${location.state.student}`);
        console.log(studentResponse.data.AdmissionInClass);
        setStudent(studentResponse.data);

        // Fetch fee data
        const feeResponse = await axios.get("https://api.edspride.in/feeSlab/all");
        console.log(feeResponse.data)
        const filData = feeResponse?.data.find(data => {
          // console.log(data.ClassId.trim(), studentResponse.data.AdmissionInClass)
          return data.ClassId.trim() === studentResponse.data.AdmissionInClass
        });
        setFees(filData?.Fees);
        setGrandTotal(filData?.TotalFee);


        // Fetch academic year info
        const academicResponse = await axios.get("https://api.edspride.in/academic-year-info/active");
        const academicData = academicResponse.data;
        setAcademic(academicData);

        // Generate months
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

        // Fetch existing fee data
        const existingFeeResponse = await axios.get(`https://api.edspride.in/fee-data/get/${studentResponse.data.StudentId}`);
        const existingData = existingFeeResponse.data;
        // console.log(existingData)
        if (existingData.Payments.length > 0) {
          setPast(true)
        }
        SetPastBalance(existingData.Balance)
        setFeeData(existingData)
        setRemaining(existingData.RemainingFee);
        if (existingData && existingData.Payments) {
          const totalFees = existingData.Payments.reduce((acc, entry) => {
            entry.Fee.forEach(fee => {
              acc[fee.Name] = (acc[fee.Name] || 0) + fee.Amount;
            });
            return acc;
          }, {});

          setTotalPaid(totalFees);
          console.log(totalFees);
          const existingMonths = existingData.Payments.flatMap(payment => payment.Months);
          // Filter out months that are already in existingMonths
          const filteredMonths = generatedMonths.filter(month => !existingMonths.includes(month.value));
          setMonths(filteredMonths);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [location.state.student]);


  useEffect(() => {
    const calculateIndividualTotals = () => {
      const feesObject = fees?.reduce((acc, fee) => {
        if (fee.Name.trim().toLowerCase() === "tuition fee") {
          acc[fee.Name] = (fee.Amount - (fee.Amount * ((Number(student?.FeeDiscount) ? Number(student?.FeeDiscount) : 0) / 100))) * fee.Times;
        } else {
          acc[fee.Name] = fee.Amount * fee.Times;
        }
        return acc;
      }, {});

      console.log(feesObject);
      console.log(totalPaid);

      const resultObject = {};

      for (const key in feesObject) {
        if (feesObject.hasOwnProperty(key) && totalPaid?.hasOwnProperty(key)) {
          resultObject[key] = feesObject[key] - totalPaid[key];
        }
      }

      console.log(resultObject);

      const totals = selectedFees?.map(feeName => {
        const fee = fees.find(f => f.Name === feeName);
        const applicableMonths = Math.min(selectedMonths.length, fee.Times);
        if (feeName.trim().toLowerCase() === "tuition fee") {
          return {
            name: feeName,
            amount: fee ? (fee.Amount - (fee.Amount * ((Number(student?.FeeDiscount) ? Number(student?.FeeDiscount) : 0) / 100))) * applicableMonths : 0,
          };
        } else {
          return {
            name: feeName,
            amount: fee ? fee.Amount * applicableMonths : 0,
          };
        }
      });
      const feesTotalObject = totals?.reduce((acc, fee) => {
        acc[fee.name] = fee.amount;
        return acc;
      }, {});
      console.log(feesTotalObject);

      const resultTableObject = {};
      var ifTrue = Object.values(feesTotalObject);
      console.log(student);
      if (past) {
        for (const key in resultObject) {
          if (resultObject.hasOwnProperty(key) && feesTotalObject.hasOwnProperty(key)) {
            if (resultObject[key] === 0) {
              resultTableObject[key] = 0;
            } else {
              resultTableObject[key] = Math.min(resultObject[key], feesTotalObject[key]);
            }
          }
        }
        const feesArray = Object.entries(resultTableObject).map(([name, amount]) => ({ name, amount }));
        console.log(feesArray);
        const totalAmount = feesArray.reduce((total, fee) => total + fee.amount, 0);
        SetFinalAmount(totalAmount)
        console.log(resultTableObject);
        setIndividualTotals(feesArray);
      } else {
        for (const key in feesTotalObject) {
          if (feesTotalObject.hasOwnProperty(key) && feesTotalObject.hasOwnProperty(key)) {
            if (feesTotalObject[key] === 0) {
              feesTotalObject[key] = 0;
            } else {
              feesTotalObject[key] = Math.min(feesTotalObject[key], feesTotalObject[key]);
            }
          }
          const feesArray = Object.entries(feesTotalObject).map(([name, amount]) => ({ name, amount }));
          console.log(feesArray);
          const totalAmount = feesArray.reduce((total, fee) => total + fee.amount, 0);
          SetFinalAmount(totalAmount)
          console.log(resultTableObject);
          setIndividualTotals(feesArray);
        }
      }

      // const feesArray = Object.entries(resultTableObject).map(([name, amount]) => ({ name, amount }));
      // console.log(feesArray);
      // const totalAmount = feesArray.reduce((total, fee) => total + fee.amount, 0);
      // SetFinalAmount(totalAmount)
      // console.log(resultTableObject);
      // setIndividualTotals(feesArray);
    };
    // console.log(selectedFees)

    calculateIndividualTotals();
  }, [selectedFees, selectedMonths, totalPaid, fees]);


  const toggleMonthDropdown = () => {
    setIsMonthDropdownOpen(prev => !prev);
  };

  const toggleFeeDropdown = () => {
    setIsFeeDropdownOpen(prev => !prev);
  };

  const handleMonthCheckboxChange = (event) => {
    const value = event.target.value;
    setSelectedMonths(prevSelected =>
      prevSelected.includes(value)
        ? prevSelected.filter(month => month !== value)
        : [...prevSelected, value]
    );
    setDeposit(0);
    setConcession(0);
    setLate(0);
  };

  const handleFeeCheckboxChange = (event) => {
    const value = event.target.value;

    if (value === "All") {
      setSelectedFees(event.target.checked ? fees?.map(fee => fee.Name) : []);
    } else {
      setSelectedFees(prevSelected =>
        prevSelected.includes(value)
          ? prevSelected.filter(fee => fee !== value)
          : [...prevSelected, value]
      );
    }

    setDeposit(0);
    setConcession(0);
    setLate(0);
  };

  const handelFeePaymentMode = (e) => {
    setFeeModePayment(e.target.value);
  };


  const handleFeeModeChange = (e) => {
    const selectedMode = e.target.value;
    setFeeMode(selectedMode);

    let monthsToSelect = [];
    if (selectedMode === "One Time") {
      monthsToSelect = months.map(month => month.value); // Select all months
    } else if (selectedMode === "Half Yearly") {
      monthsToSelect = months.slice(0, 6).map(month => month.value); // First six months
    } else if (selectedMode === "Quarterly") {
      monthsToSelect = months.slice(0, 3).map(month => month.value); // First three months
    } else if (selectedMode === "Monthly") {
      monthsToSelect = []; // No months selected
    }

    setSelectedMonths(monthsToSelect);
    setDeposit(0);
    setConcession(0);
    setLate(0);
  };

  const totalAmount = selectedFees?.reduce((total, feeName) => {
    const fee = fees.find(f => f.Name === feeName);
    if (fee) {
      // Use the lesser of selectedMonths.length or fee.Times to calculate total
      const applicableMonths = Math.min(selectedMonths.length, fee.Times);
      return total + (fee.Amount * applicableMonths);
    }
    return total;
  }, 0);


  useEffect(() => {
    if ((Number(finalAmount) - Number(deposit) + Number(pastBalance) - Number(concession) + Number(late) < 0)) {
      toast.warn("Please  enter valid amount");
      setDeposit(0);
      setConcession(0);
      setLate(0);
    }
  }, [deposit, concession, late])



  const filteredFees = fees?.filter(fee => selectedFees.includes(fee.Name));

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(Number(deposit))
    if (selectedMonths.length === 0) {
      toast.error("Please Select Month!!");
    } else if (individualTotals.length === 0) {
      toast.error("Please Select Fee!!");
    } else if (Number(deposit) === 0) {
      toast.error("Please Enter Deposit!!");
    } else if (feeModePayment === "") {
      toast.error("Please Select Mode!!");
    } else if (remark === "") {
      toast.error("Please Enter Remark!!");
    } else {
      console.log("Total Amount before submit:", finalAmount);

      const paymentData = {
        StudentId: student.StudentId,
        Payments: {
          Date: new Date().toISOString().split('T')[0],
          Months: selectedMonths,
          Fee: individualTotals.map(fee => ({
            Name: fee.name,
            Amount: fee.amount,
          })),
          Mode: feeMode,
          LateFee: late,
          Revenue: revenueStatus,
          Concession: concession,
          PaidAmount: deposit,
          Remark: remark,
          PaymentMode: feeModePayment,
          Remain: Number(remaining) - Number(deposit) - Number(concession)
        },
        Balance: Number(finalAmount) - Number(deposit) + Number(pastBalance) - Number(concession) + Number(late),
        // TotalFee: grandTotal,
        RemainingFee: Number(remaining) - Number(deposit) - Number(concession),
        enrollClass: student?.ClassName,
        stuName: student?.StudentName,
        section: student?.Section
      };

      console.log(paymentData); // Log to see what you're sending

      // Uncomment and ensure this works
      try {
        await axios.post("https://api.edspride.in/fee-data/add", paymentData);
        toast.success("Payment successful!");
        const role = localStorage.getItem("Role")
        if (role.trim().toLowerCase() === "superadmin" || role.trim().toLowerCase() === "admin") {
          navigate(`/admin/allfees`, { state: paymentData });
        } else {
          navigate(`/employee/allfees`, { state: paymentData });
        }
      } catch (error) {
        console.error("Error saving payment data:", error);
        toast.error("Failed to save payment data.");
      }
    }

  };


  const timesToName = (time) => {
    switch (time) {
      case 1:
        return "One Time";
      case 2:
        return "Half Yearly";
      case 4:
        return "Quarterly";
      case 12:
        return "Monthly";
    }
  }

  return (
    <MainDashboard>
      <ToastContainer />
      <FeeCollectionWrapper>
        <Title>Fee Collection</Title>

        <Section>
          <InputContainer>
            <Label>Fee Mode</Label>
            <Select value={feeMode} onChange={handleFeeModeChange}>
              <option value="">Select Fee Mode</option>
              <option value="One Time">One Time</option>
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Half Yearly">Half Yearly</option>
            </Select>
          </InputContainer>

          {/* <InputContainer>
            <Label>Deposit Amount</Label>
            <input
              type="number"
              value={deposit}
              onChange={(e) => setDeposit(Number(e.target.value))}
            />
          </InputContainer> */}
        </Section>

        <Section>
          <InputContainer>
            <DropdownHeader onClick={toggleMonthDropdown}>
              Select Months ({selectedMonths.length})
            </DropdownHeader>
            {isMonthDropdownOpen && (
              <DropdownList>
                {months.map((month) => (
                  <CheckboxLabel key={month.value}>
                    <CheckboxInput
                      type="checkbox"
                      value={month.value}
                      checked={selectedMonths.includes(month.value)}
                      onChange={handleMonthCheckboxChange}
                    />
                    {month.label}
                  </CheckboxLabel>
                ))}
              </DropdownList>
            )}
          </InputContainer>

          <InputContainer>
            <DropdownHeader onClick={toggleFeeDropdown}>
              Select Fees ({selectedFees?.length})
            </DropdownHeader>
            {isFeeDropdownOpen && (
              <DropdownList>
                <CheckboxLabel>
                  <CheckboxInput
                    type="checkbox"
                    value="All"
                    checked={selectedFees?.length === fees?.length}
                    onChange={handleFeeCheckboxChange}
                  />
                  All
                </CheckboxLabel>
                {fees?.map((fee) => (
                  <CheckboxLabel key={fee.Name}>
                    <CheckboxInput
                      type="checkbox"
                      value={fee.Name}
                      checked={selectedFees.includes(fee.Name)}
                      onChange={handleFeeCheckboxChange}
                    />
                    {fee.Name} ({timesToName(Number(fee.Times))})
                  </CheckboxLabel>
                ))}
              </DropdownList>
            )}
          </InputContainer>
        </Section>

        <InfoGrid>
          <InfoItem>
            <label>Reg. No</label>
            <input type="text" value={student?.StudentId} readOnly />
          </InfoItem>
          <InfoItem>
            <label>Name</label>
            <input type="text" value={student?.StudentName} readOnly />
          </InfoItem>
          <InfoItem>
            <label>Father Name</label>
            <input type="text" value={student?.FatherDetail?.Name} readOnly />
          </InfoItem>
          <InfoItem>
            <label>Class</label>
            <input type="text" value={student?.ClassName + " - " + student?.Section} readOnly />
          </InfoItem>
          <InfoItem>
            <label>Date</label>
            <input type="date" value={new Date().toISOString().split('T')[0]} readOnly />
          </InfoItem>
          <InfoItem>
            <label>Discount</label>
            <input type="text" value={Number(student?.FeeDiscount) ? Number(student?.FeeDiscount) : 0} readOnly />
          </InfoItem>
          <InfoItem>
            <label>Total Fee</label>
            <input type="text" value={feeData?.TotalFee} readOnly />
          </InfoItem>
          <InfoItem>
            <label>Pending Fee</label>
            <input type="text" value={feeData?.RemainingFee} readOnly />
          </InfoItem>
        </InfoGrid>

        <Table>
          <thead>
            <tr>
              <th>SR. NO.</th>
              <th>PARTICULARS</th>
              <th>AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            {individualTotals.map((total, index) => (
              <tr key={total.name}>
                <td>{index + 1}</td>
                <td>{total.name}</td>
                <td>{total.amount}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="2">PREVIOUS BALANCE</td>
              <td>{pastBalance}</td>
            </tr>
            <tr>
              <td colSpan="2">LATE FEE (+)</td>
              <td>
                <input
                  type="number"
                  value={late}
                  onChange={(e) => setLate(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td colSpan="2">TOTAL</td>
              <td>{Number(finalAmount) + Number(pastBalance) + Number(late)}</td>
            </tr>
            <tr>
              <td colSpan="2">DEPOSIT</td>
              <td>
                <input
                  type="number"
                  value={deposit}
                  onChange={(e) => setDeposit(e.target.value)}
                />
              </td>
            </tr>



            {/* <tr>
              <td colSpan="2">CONCESSION</td>
              <td>
                <input
                  type="number"
                  value={concession}
                  onChange={(e) => setConcession(e.target.value)}
                />
              </td>
            </tr> */}
            <tr>
              <td colSpan="2">BALANCE</td>
              <td>{Number(finalAmount) - Number(deposit) + Number(pastBalance) - Number(concession) + Number(late)}</td>

            </tr>
          </tfoot>
        </Table>

        <InputContainer>
          <Label>FEE MODE</Label>
          <Select value={feeModePayment} onChange={handelFeePaymentMode}>
            <option value="">Select Payment Mode</option>
            <option value="Cash">CASH</option>
            <option value="Online">ONLINE</option>
            <option value="Check">CHECK</option>
            {/* Add more options as needed */}
          </Select>
        </InputContainer>

        <InfoItem>
          <label>Remark</label>
          <input type="text" value={remark} onChange={(e) => setRemark(e.target.value)} />
        </InfoItem>

        <InputContainer>
          <CheckboxLabel>
            <CheckboxInput
              type="checkbox"
              checked={revenueStatus}
              onChange={() => setRevenueStatus(prev => !prev)}
            />
            Revenue Recorded
          </CheckboxLabel>
        </InputContainer>

        <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
      </FeeCollectionWrapper>
    </MainDashboard>
  );
};

export default Payment;