import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../Navbar";
import FrontOfficeSidebar from "./FrontOfficeSidebar";
import EntryExitTable from "./EntryExitTable";
import Sidebar from "../Sidebar";
import axios from "axios";

const Container = styled.div`
  display: flex;
  background-color: #f4f4f4;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const MainDashboard = styled.div`
  flex: 1;
  background-color: #f9f9f9;
  padding: 20px;
  height: calc(100vh - 100px);
  overflow-y: auto;
  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const Title = styled.h2`
  color: #0d47a1;
  text-align: center;
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
  font-weight: bold;

  @media (max-width: 480px) {
    font-size: 12px;
    height: 30px;
    width: 50%;
    margin-bottom: 30px;
    margin-top: 20px;
  }
`;

const Main = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const FormContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
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

const Input = styled.input`
  width: 88%;
  padding: 15px 20px;
  border: 2px solid #7d3cff;
  border-radius: 30px;
  font-size: 16px;
  color: #7a7a7a;
  background-color: #f4f6fc;
  font-weight: bold;
  outline: none;
  @media (max-width: 480px) {
    height: 10px;
    width: 80%;
    font-size: 12px;
    padding: 12px 18px;
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
  @media (max-width: 480px) {
    height: 38px;
    width: 94%;
    font-size: 12px;
    padding: 10px 12px;
  }
`;

const PlusButton = styled.button`
  width: 35px;
  padding: 12px;
  background: linear-gradient(270deg, #222d78 0%, #7130e4 100%);
  border: none;
  border-radius: 30px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s;
  margin-left: 10px;

  &:hover {
    background: linear-gradient(270deg, #1c2563 0%, #662acc 100%);
  }
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
  font-weight: bold;
  transition: background 0.3s;
  margin-top: 20px;

  &:hover {
    background: linear-gradient(270deg, #1c2563 0%, #662acc 100%);
  }

  @media (max-width: 480px) {
    width: 100%;
    font-size: 12px;
    padding: 5px;
  }
`;



// Styled components...
const Container1 = styled.div`
  width: 100%;
  margin: 50px auto;
  background-color: #f9f9f9;
`;


const Tabs = styled.div`
  display: flex;
  justify-content: center;
`;


const Tab = styled.button`
  background-color: ${(props) => (props.active ? "#688AF6" : "#222D78")};
  color: white;
  border: none;
  border-radius: 8px;
  width: -webkit-fill-available;
  padding: 10px 30px;
  font-size: 16px;
  cursor: pointer;
  margin: 0 5px;


  &:hover {
    background-color: #6c8cf1;
  }
  @media (max-width: 480px) {
    font-size: 12px;
    padding: 8px 10px;
  }
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
  @media (max-width: 480px) {
    font-size: 10px;
    padding: 5px;
  }
  @media (max-width: 376px) {
    font-size: 8px;
    padding: 2px;
  }
`;


const TableData = styled.td`
  padding: 15px;
  text-align: left;
  font-size: 14px;
  color: #333;
  @media (max-width: 480px) {
    font-size: 10px;
    padding: 5px;
  }
  @media (max-width: 376px) {
    font-size: 8px;
    padding: 2px;
  }
`;


const StatusButton = styled.button`
  padding: 5px 15px;
  border-radius: 20px;
  background-color: ${(props) =>
    props.status === "CHECKED IN"
      ? "#e0e7ff"
      : props.status === "WAITING"
        ? "#f8d7da"
        : "#e2e3e5"};
  color: ${(props) =>
    props.status === "CHECKED IN"
      ? "#1e40af"
      : props.status === "WAITING"
        ? "#a94442"
        : "#737373"};
  border: none;
  font-weight: bold;
  font-size: 12px;
  @media (max-width: 480px) {
    font-size: 9px;
    padding: 5px;
  }
  @media (max-width: 376px) {
    font-size: 8px;
    padding: 2px;
  }
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
  @media (max-width: 480px) {
    font-size: 9px;
    padding: 5px;
    width: 46px;
  }
  @media (max-width: 376px) {
    font-size: 8px;
    padding: 2px;
  }
`;


const PaginationContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 10px 20px;
  border-top: 1px solid #e0e0e0;
  background-color: #fff;
  @media (max-width: 480px) {
    font-size: 10px;
    padding: 5px;
  }
  @media (max-width: 376px) {
    font-size: 8px;
    padding: 2px;
  }
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
  @media (max-width: 480px) {
    font-size: 10px;
    padding: 5px;
  }
  @media (max-width: 376px) {
    font-size: 8px;
    padding: 2px;
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
  @media (max-width: 480px) {
    font-size: 10px;
  }
  @media (max-width: 376px) {
    font-size: 8px;
    padding: 2px;
  }
`;


const VisitorEntry = () => {
  const [formData, setFormData] = useState({
    Name: "",
    TotalVisitorNo: "",
    Purpose: "",
    MobileNo: "",
    OTP: "",
    verifIedVisitorId: "",
    Category: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "Name" && !/^[a-zA-Z\s]*$/.test(value)) {
      setErrors((prev) => ({
        ...prev,
        Name: "Name can only contain letters.",
      }));
      return;
    } else {
      setErrors((prev) => ({ ...prev, Name: "" }));
    }

    if (name === "MobileNo") {
      if (!/^\d*$/.test(value)) {
        setErrors((prev) => ({
          ...prev,
          MobileNo: "Mobile number can only contain numbers.",
        }));
        return;
      } else if (value.length > 10) {
        setErrors((prev) => ({
          ...prev,
          MobileNo: "Mobile number must be 10 digits long.",
        }));
        return;
      } else {
        setErrors((prev) => ({ ...prev, MobileNo: "" }));
      }
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.Name) newErrors.Name = "Name is required.";
    if (!formData.TotalVisitorNo) newErrors.TotalVisitorNo = "Total number of visitors is required.";
    if (!formData.Purpose) newErrors.Purpose = "Purpose is required.";
    if (!formData.MobileNo) newErrors.MobileNo = "Mobile number is required.";
    // if (!formData.OTP) newErrors.OTP = "OTP is required.";
    if (!formData.verifIedVisitorId) newErrors.verifIedVisitorId = "Verified visitor ID is required.";
    if (!formData.Category) newErrors.Category = "Category is required.";



    // Validate Name and MobileNo again during submit
    if (!/^[a-zA-Z\s]*$/.test(formData.Name) && formData.Name) {
      newErrors.Name = "Name can only contain letters.";
    }

    if (!/^\d*$/.test(formData.MobileNo) && formData.MobileNo) {
      newErrors.MobileNo = "Mobile number can only contain numbers.";
    } else if (formData.MobileNo.length > 10) {
      newErrors.MobileNo = "Mobile number must be 10 digits long.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    try {
      const response = await axios.post(
        "http://localhost:8007/visitor/add",
        formData
      );
      console.log(response.data);
      alert("Visitor Added Successfully");

      // Reset form data after successful submission
      setFormData({
        Name: "",
        TotalVisitorNo: "",
        Purpose: "",
        MobileNo: "",
        OTP: "",
        verifIedVisitorId: "",
        Category: "",
      });
    } catch (error) {
      console.error(error);
      alert("Error submitting the form");
    }
  };
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  const [activeTab, setActiveTab] = useState("entry");
  const [visitorData, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const fetchData = () => {
    axios
      .get("http://localhost:8007/visitor/all")
      .then((response) => {
        setData(response.data.reverse());

      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    fetchData()
  }, []);

  const totalPages = Math.ceil(visitorData.length / itemsPerPage);
  const currentData = visitorData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleMarkOut = async (id) => {
    try {
      const response = await axios.put(`http://localhost:8007/visitor/${id}/outtime`);
      // Update the local state with the new data
      // setData((prevData) =>
      //   prevData.map((item) =>
      //     item._id === id
      //       ? { ...item, outTime: response.data.visitor.OutTime, status: "COMPLETED" }
      //       : item
      //   )
      // );
      fetchData()
      alert("Out Successfully");
    } catch (error) {
      console.error("Error updating out time:", error);
    }
  };
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const handleRowsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const formatDateToIndian = (dateString) => {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'Asia/Kolkata'
    };
    return new Date(dateString).toLocaleString('en-IN', options).replace(',', '');
  };


  const [showInput, setShowInput] = useState(false);
  const [newPurpose, setNewPurpose] = useState("");
  const [selectedPurpose, setSelectedPurpose] = useState(""); // For the dropdown
  const [purposes, setPurposes] = useState([]);
  useEffect(() => {
    const fetchPurposes = async () => {
      try {
        const response = await axios.get("http://localhost:8007/purpose/all");
        setPurposes(response.data);
      } catch (error) {
        console.error("Error fetching purposes:", error);
      }
    };

    fetchPurposes();
  }, []);

  const handleAddPurpose = async () => {
    if (!newPurpose) {
      alert("Please enter a purpose to add.");
      return;
    }

    try {
      await axios.post("http://localhost:8007/purpose/add", { PurposeTitle: newPurpose });
      setPurposes([...purposes, { PurposeTitle: newPurpose }]); // Update local state
      setNewPurpose(""); // Clear the input field
      alert("Purpose added successfully!");
    } catch (error) {
      console.error("Error adding purpose:", error);
      alert("Error adding purpose.");
    }
  };

  return (
    <>

      <MainDashboard>
        <FormContainer>
          <Title>Take Entry</Title>

          <Form onSubmit={handleSubmit}>
            <Heading>Visitor</Heading>

            <Main>
              <InputContainer>
                <Label>Name</Label>
                <Input
                  type="text"
                  placeholder="Enter Name"
                  name="Name"
                  value={formData.Name}
                  onChange={handleChange}
                />
                {errors.Name && <span style={{ color: "red" }}>{errors.Name}</span>}
              </InputContainer>

              <InputContainer>
                <Label>Category</Label>
                <Select name="Category" value={formData.Category} onChange={handleChange} >
                  <option value="">Select Category</option>
                  <option value="Associate">Associate</option>
                  <option value="External">External</option>
                  <option value="Internal">Internal</option>
                </Select>
                {errors.Category && <span style={{ color: "red" }}>{errors.Category}</span>}
              </InputContainer>

              <InputContainer>
                <Label>Total Visitor No.</Label>
                <Input
                  type="number"
                  placeholder="Total Visitor No."
                  name="TotalVisitorNo"
                  value={formData.TotalVisitorNo}
                  onChange={handleChange}
                />
                {errors.TotalVisitorNo && <span style={{ color: "red" }}>{errors.TotalVisitorNo}</span>}
              </InputContainer>

              <InputContainer>
                <Label>Purpose</Label>
                <Select
                  name="Purpose"
                  value={selectedPurpose}
                  onChange={(e) => {
                    setSelectedPurpose(e.target.value);
                    setFormData({ ...formData, Purpose: e.target.value }); // Update formData
                  }}
                >
                  <option value="" disabled>Select Purpose</option>
                  {purposes.map((purpose) => (
                    <option key={purpose._id} value={purpose.PurposeTitle}>
                      {purpose.PurposeTitle}
                    </option>
                  ))}
                </Select>
                <PlusButton type="button" onClick={() => setShowInput(!showInput)}>
                  +
                </PlusButton>
                {errors.Purpose && <ErrorMessage>{errors.Purpose}</ErrorMessage>}
              </InputContainer>

              {showInput && (
                <InputContainer>
                  <Label>Add New Purpose</Label>
                  <Input
                    type="text"
                    placeholder="Enter New Purpose"
                    value={newPurpose}
                    onChange={(e) => setNewPurpose(e.target.value)}
                  />
                  <SubmitButton type="button" onClick={handleAddPurpose}>
                    Submit
                  </SubmitButton>
                  {errors.Purpose && <ErrorMessage>{errors.Purpose}</ErrorMessage>}
                </InputContainer>
              )}
              <InputContainer>
                <Label>Enter mobile no.</Label>
                <Input
                  type="text"
                  placeholder="Enter Mobile Number"
                  name="MobileNo"
                  value={formData.MobileNo}
                  onChange={handleChange}
                  maxLength={10}
                />
                {errors.MobileNo && <span style={{ color: "red" }}>{errors.MobileNo}</span>}
              </InputContainer>

              <InputContainer>
                <Label>Verified Visitor Id</Label>
                <Input
                  type="text"
                  placeholder="Enter Visitor Id"
                  name="verifIedVisitorId"
                  value={formData.verifIedVisitorId}
                  onChange={handleChange}
                />
                {errors.verifIedVisitorId && <span style={{ color: "red" }}>{errors.verifIedVisitorId}</span>}
              </InputContainer>
            </Main>

            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "center",
              }}
            >
              <SubmitButton type="button">Save</SubmitButton>
              <SubmitButton type="submit">Submit</SubmitButton>
            </div>
          </Form>
          {/* <EntryExitTable /> */}

          <Container1>
            <Tabs>
              <Tab active={activeTab === "entry"} onClick={() => setActiveTab("entry")}>
                Entry List
              </Tab>
              <Tab active={activeTab === "exit"} onClick={() => setActiveTab("exit")}>
                Exit List
              </Tab>
            </Tabs>

            {activeTab === "entry" && (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeader>Name</TableHeader>
                    <TableHeader>No of Visitor</TableHeader>
                    <TableHeader>Purpose</TableHeader>
                    <TableHeader>Contact Details</TableHeader>
                    <TableHeader>Date</TableHeader>
                    <TableHeader>In Time</TableHeader>
                    <TableHeader>Out Time</TableHeader>
                    <TableHeader>Action</TableHeader>
                  </TableRow>
                </TableHead>
                <tbody>
                  {visitorData.map((item) => {
                    if (item.OutTime ==="-") {
                      return (
                        <TableRow key={item._id}>
                          <TableData>{item.Name}</TableData>
                          <TableData>{item.TotalVisitorNo}</TableData>
                          <TableData>{item.Purpose}</TableData>
                          <TableData>{item.MobileNo}</TableData>
                          <TableData>{item.Date}</TableData>
                          <TableData>{item.InTime}</TableData>
                          <TableData>{item.OutTime}</TableData>
                          <TableData>
                            {item.OutTime === "-" ? <ActionButton onClick={() => handleMarkOut(item._id)}>
                              MARK OUT ✅
                            </ActionButton> : "Out"}
                          </TableData>
                        </TableRow>
                      )
                    }
                  })}
                </tbody>
              </Table>
            )}

            {activeTab === "exit" && (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeader>Name</TableHeader>
                    <TableHeader>No of Visitor</TableHeader>
                    <TableHeader>Purpose</TableHeader>
                    <TableHeader>Contact Details</TableHeader>
                    <TableHeader>Date</TableHeader>
                    <TableHeader>IN time</TableHeader>
                    <TableHeader>OUT time</TableHeader>
                    <TableHeader>Status</TableHeader>
                  </TableRow>
                </TableHead>
                <tbody>
                {visitorData.map((item) => {
                    if (item.OutTime !=="-") {
                      return (
                        <TableRow key={item._id}>
                          <TableData>{item.Name}</TableData>
                          <TableData>{item.TotalVisitorNo}</TableData>
                          <TableData>{item.Purpose}</TableData>
                          <TableData>{item.MobileNo}</TableData>
                          <TableData>{item.Date}</TableData>
                          <TableData>{item.InTime}</TableData>
                          <TableData>{item.OutTime}</TableData>
                          <TableData>
                            {item.OutTime === "-" ? <ActionButton onClick={() => handleMarkOut(item._id)}>
                              MARK OUT ✅
                            </ActionButton> : "Out"}
                          </TableData>
                        </TableRow>
                      )
                    }
                  })}
                </tbody>
              </Table>
            )}


            <PaginationContainer>
              <PaginationInfo>
                Rows per page:
                <RowsPerPageDropdown onChange={handleRowsPerPageChange} value={itemsPerPage}>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                </RowsPerPageDropdown>
                {currentPage} of {totalPages}
              </PaginationInfo>

              <div>
                <PaginationButton onClick={handlePrevPage} disabled={currentPage === 1}>
                  Previous
                </PaginationButton>
                <PaginationButton onClick={handleNextPage} disabled={currentPage === totalPages}>
                  Next
                </PaginationButton>
              </div>
            </PaginationContainer>
          </Container1>
        </FormContainer>
      </MainDashboard>

    </>
  );
};

export default VisitorEntry;
