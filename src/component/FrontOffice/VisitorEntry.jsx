import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar";
import FrontOfficeSidebar from "./FrontOfficeSidebar";
import EntryExitTable from "./EntryExitTable";
import Sidebar from "../Sidebar";
import  baseURL from '../utils/Url'; 
import {
  Container,
  MainDashboard,
  Title,
  Form,
  Heading,
  Main,
  FormContainer,
  InputContainer,
  Label,
  Input,
  Select,
  PlusButton,
  SubmitButton,
  ErrorMessage,
  Container1,
  Tabs,
  Tab,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableData,
  StatusButton,
  ActionButton,
  PaginationContainer,
  PaginationInfo,
  PaginationButton,
  RowsPerPageDropdown,
} from "./FrontOfficeStyle1";

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
    if (!formData.verifIedVisitorId) newErrors.verifIedVisitorId = "Verified visitor ID is required.";
    if (!formData.Category) newErrors.Category = "Category is required.";

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
        `${baseURL}/visitor/add`,
        formData
      );
      console.log(response.data);
      alert("Visitor Added Successfully");

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

  const [activeTab, setActiveTab] = useState("entry");
  const [visitorData, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const fetchData = () => {
    axios
      .get(`${baseURL}/visitor/all`)
      .then((response) => {
        setData(response.data.reverse());
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchData();
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
      const response = await axios.put(`${baseURL}/visitor/${id}/outtime`);
      fetchData();
      alert("Out Successfully");
    } catch (error) {
      console.error("Error updating out time:", error);
    }
  };

  const handleRowsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const [showInput, setShowInput] = useState(false);
  const [newPurpose, setNewPurpose] = useState("");
  const [selectedPurpose, setSelectedPurpose] = useState("");
  const [purposes, setPurposes] = useState([]);
  useEffect(() => {
    const fetchPurposes = async () => {
      try {
        const response = await axios.get(`${baseURL}/purpose/all`);
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
      await axios.post(`${baseURL}/purpose/add`, { PurposeTitle: newPurpose });
      setPurposes([...purposes, { PurposeTitle: newPurpose }]);
      setNewPurpose("");
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
                <Select name="Category" value={formData.Category} onChange={handleChange}>
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
                    setFormData({ ...formData, Purpose: e.target.value });
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
                    if (item.OutTime === "-") {
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
                            {item.OutTime === "-" ? (
                              <ActionButton onClick={() => handleMarkOut(item._id)}>
                                MARK OUT ✅
                              </ActionButton>
                            ) : (
                              "Out"
                            )}
                          </TableData>
                        </TableRow>
                      );
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
                    if (item.OutTime !== "-") {
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
                            {item.OutTime === "-" ? (
                              <ActionButton onClick={() => handleMarkOut(item._id)}>
                                MARK OUT ✅
                              </ActionButton>
                            ) : (
                              "Out"
                            )}
                          </TableData>
                        </TableRow>
                      );
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