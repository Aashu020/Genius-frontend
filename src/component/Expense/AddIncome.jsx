import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import styled from "styled-components";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { Eye, Edit, Trash2 } from "lucide-react";

const Container = styled.div`
  display: flex;
  background-color: #f4f4f4;
`;

const MainDashboard = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #f9f9f9;
  height: calc(100vh - 100px);
  overflow-y: auto;
`;

const Title = styled.h2`
  color: #0d47a1;
  text-align: center;
  margin-bottom: 30px;
  font-weight: bold;
`;

const Form = styled.form`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const Heading = styled.div`
  width: 30%;
  background: linear-gradient(270deg, #222d78 0%, #7130e4 100%);
  color: white;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  margin-bottom: 40px;
`;

const Main = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

const FormContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 20px;
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

const Input = styled.input`
  width: 88%;
  padding: 15px 20px;
  border: 2px solid #7d3cff;
  border-radius: 30px;
  font-size: 16px;
  color: #7a7a7a;
  background-color: #f4f6fc;
`;

const Select = styled.select`
  width: 100%;
  padding: 15px 20px;
  border: 2px solid #7d3cff;
  border-radius: 30px;
  font-size: 16px;
  color: #7a7a7a;
  background-color: #f4f6fc;
`;

const SubmitButton = styled.button`
  width: 320px;
  padding: 12px;
  background: linear-gradient(270deg, #222d78 0%, #7130e4 100%);
  border: none;
  border-radius: 30px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 30px;
`;

const Th = styled.th`
  background-color: #f2f2f2;
  padding: 10px;
  text-align: left;
`;

const Td = styled.td`
  padding: 10px;
`;

const Td1 = styled.td`
  padding: 10px;
  display: flex;
  gap: 1rem;
`;

const EditButton = styled.div`
  background-color: #209a16bf;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  width: 40%;
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

const DeleteButton = styled.div`
  background-color: red;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  width: 15%;
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;


const AddIncome = () => {
  const [incomeHeads, setIncomeHeads] = useState([]);
  const [selectedIncomeHead, setSelectedIncomeHead] = useState("");
  const [incomeDate, setIncomeDate] = useState("");
  const [incomeName, setIncomeName] = useState("");
  const [amount, setAmount] = useState("");
  const [vendor, setVendor] = useState("");
  const [vendors, setVendors] = useState([]);
  const [paymentMode, setPaymentMode] = useState("");
  const [incomeDetail, setIncomeDetail] = useState("");
  const [incomeList, setIncomeList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentIncomeId, setCurrentIncomeId] = useState(null);

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};
    if (!incomeDate) formErrors.incomeDate = "Income Date is required";
    if (!selectedIncomeHead) formErrors.selectedIncomeHead = "Please Select Income Head head.";
    if (!incomeName) formErrors.incomeName = "Income Name is required";
    if (!amount) formErrors.amount = "Amount is required";
    if (!vendor) formErrors.vendor = "Vendor is required";
    if (!paymentMode) formErrors.paymentMode = "Payment mode is required";
    if (!incomeDetail) formErrors.incomeDetail = "incomeDetail is required";
    return formErrors;
  };



  // Fetch income heads
  useEffect(() => {
    const fetchIncomeHeads = async () => {
      try {
        const response = await axios.get(
          "https://api.edspride.in/expense-header/all"
        );
        setIncomeHeads(response.data);
      } catch (error) {
        console.error("Error fetching expense heads:", error);
      }
    };

    fetchIncomeHeads();
  }, []);

  // Fetch vendors
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get(
          "https://api.edspride.in/vendor/all"
        );
        setVendors(response.data);
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    };

    fetchVendors();
  }, []);

  // Fetch existing income data
  useEffect(() => {
    const fetchIncomeList = async () => {
      try {
        const response = await axios.get(
          "https://api.edspride.in/revenue/all"
        );
        setIncomeList(response.data);
      } catch (error) {
        console.error("Error fetching income data:", error);
      }
    };

    fetchIncomeList();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    setErrors({});
    const newIncome = {
      Date: incomeDate,
      Label: selectedIncomeHead,
      Name: incomeName,
      Amount: amount,
      Vendor: vendor,
      PaymentMode: paymentMode,
      Detail: incomeDetail,
      Type: "Income",
    };

    try {
      if (isEditing) {
        // Update existing income
        await axios.put(`https://api.edspride.in/revenue/update/${currentIncomeId}`, newIncome);
        setIncomeList(incomeList.map((income) => (income._id === currentIncomeId ? { ...income, ...newIncome } : income)));
        alert("Income updated successfully!"); // Alert for update
        setIsEditing(false);
        setCurrentIncomeId(null);
      } else {
        // Add new income
        const response = await axios.post(
          "https://api.edspride.in/revenue/add",
          newIncome
        );
        setIncomeList([...incomeList, response.data]);
        alert("Income added successfully!"); // Alert for add
      }
      // Reset form fields
      setIncomeDate("");
      setSelectedIncomeHead("");
      setIncomeName("");
      setAmount("");
      setVendor("");
      setPaymentMode("");
      setIncomeDetail("");
    } catch (error) {
      console.error("Error saving income data:", error);
      alert("There was an error saving the income data. Please try again."); // Alert for error
    }
  };


  const handleEdit = (income) => {
    setIncomeDate(income.Date);
    setSelectedIncomeHead(income.Label);
    setIncomeName(income.Name);
    setAmount(income.Amount);
    setVendor(income.Vendor);
    setPaymentMode(income.PaymentMode);
    setIncomeDetail(income.Detail);
    setCurrentIncomeId(income._id);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this income?");
    if (confirmDelete) {
      try {
        await axios.delete(`https://api.edspride.in/revenue/delete/${id}`);
        setIncomeList(incomeList.filter((income) => income._id !== id));
      } catch (error) {
        console.error("Error deleting income:", error);
      }
    }
  };


  const today = new Date().toISOString().split('T')[0];
  return (
    <>

      <MainDashboard>
        <FormContainer>
          <Title>Add Income</Title>
          <Form onSubmit={handleSubmit}>
            <Heading>Details</Heading>

            <Main>
              <InputContainer>
                <Label>Income Date</Label>
                <Input
                  type="date"
                  placeholder="Enter Date"
                  value={incomeDate}
                  onChange={(e) => setIncomeDate(e.target.value)}
                  // min={today}
                />
                {errors.incomeDate && <ErrorMessage>{errors.incomeDate}</ErrorMessage>}

              </InputContainer>
              <InputContainer>
                <Label>Income Head</Label>
                <Select
                  value={selectedIncomeHead}
                  onChange={(e) => setSelectedIncomeHead(e.target.value)}
                >
                  <option value="">Select</option>
                  {incomeHeads
                    .filter((head) => head.Type === "Income")
                    .map((head) => (
                      <option key={head.id} value={head.id}>
                        {head.Title}
                      </option>
                    ))}
                </Select>
                {errors.selectedIncomeHead && <ErrorMessage>{errors.selectedIncomeHead}</ErrorMessage>}

              </InputContainer>

              <InputContainer>
                <Label>Income Name</Label>
                <Input
                  type="text"
                  placeholder="Enter Name"
                  value={incomeName}
                  onChange={(e) => setIncomeName(e.target.value)}
                />
                {errors.incomeName && <ErrorMessage>{errors.incomeName}</ErrorMessage>}

              </InputContainer>

              <InputContainer>
                <Label>Amount</Label>
                <Input
                  type="number"
                  placeholder="Enter Amount"

                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                {errors.amount && <ErrorMessage>{errors.amount}</ErrorMessage>}

              </InputContainer>

              <InputContainer>
                <Label>Name of Person</Label>
                <Input
                  type="text"
                  placeholder="Enter vendor"

                  value={vendor}
                  onChange={(e) => setVendor(e.target.value)}
                />
                {errors.vendor && <ErrorMessage>{errors.vendor}</ErrorMessage>}
              </InputContainer>

              <InputContainer>
                <Label>Payment Mode</Label>
                <Select
                  value={paymentMode}
                  onChange={(e) => setPaymentMode(e.target.value)}
                >
                  <option value="">Select Payment Mode</option>
                  <option value="GPay">GPay</option>
                  <option value="Phone Pay">Phone Pay</option>
                  <option value="UPI">UPI</option>
                  <option value="Cash">Cash</option>

                </Select>
                {errors.paymentMode && <ErrorMessage>{errors.paymentMode}</ErrorMessage>}

              </InputContainer>

              <InputContainer>
                <Label>Income Detail</Label>
                <Input
                  type="text"
                  placeholder="Enter Income Detail"
                  value={incomeDetail}
                  onChange={(e) => setIncomeDetail(e.target.value)}
                />
                {errors.incomeDetail && <ErrorMessage>{errors.incomeDetail}</ErrorMessage>}

              </InputContainer>
            </Main>
            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "center",
              }}
            >
              <SubmitButton type="submit">{isEditing ? "Update" : "Save"}</SubmitButton>
              {/* <SubmitButton type="button">Save & Update</SubmitButton> */}
            </div>
          </Form>

          <Table>
            <thead>
              <tr>
                <Th>Sr. No</Th>
                <Th>Name</Th>
                <Th>Date</Th>
                <Th>Income Head</Th>
                <Th>Name of Person</Th>
                <Th>Amount</Th>
                <Th>Detail</Th>
                <Th>Type</Th>
                <Th>Action</Th>
              </tr>
            </thead>
            <tbody>
              {incomeList
                .filter((expense) => expense.Type === "Income")
                .map((income, index) => (
                  <tr key={income._id}>
                    <Td>{index + 1}</Td>
                    <Td>{income.Name}</Td>
                    <Td>{income.Date.split("-").reverse().join("-")}</Td>
                    <Td>{income.Label}</Td>
                    <Td>{income.Vendor}</Td>
                    <Td>{income.Amount}</Td>
                    <Td>{income.Detail}</Td>
                    <Td>{income.Type}</Td>
                    <Td1>
                      <EditButton onClick={() => handleEdit(income)}>
                        Edit <Edit size={18} />
                      </EditButton>
                      <DeleteButton onClick={() => handleDelete(income._id)}>
                        <Trash2 size={18} />
                      </DeleteButton>
                    </Td1>
                  </tr>
                ))}
            </tbody>
          </Table>
        </FormContainer>
      </MainDashboard>

    </>
  );
};

export default AddIncome;
