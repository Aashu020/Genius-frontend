import React, { useState } from "react";
import axios from "axios";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import PostalDispatchTable from "./PostalDispatchTable";
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
  SubmitButton,
  ErrorMessage,
} from "./FrontOfficeStyle1";

const PostalDispatch = () => {
  const [formData, setFormData] = useState({
    Category: "Dispatch",
    Name: "",
    Date: "",
    Item: "",
    UnitNo: "",
    ReferenceNo: "",
    Address: "",
    FromWhom: "",
    Remark: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "UnitNo") {
      if (!/^\d*$/.test(value)) {
        setErrors((prev) => ({
          ...prev,
          UnitNo: "Unit number can only contain digits.",
        }));
        return;
      } else {
        setErrors((prev) => ({ ...prev, UnitNo: "" }));
      }
    }
    if (name === "Name") {
      if (!/^[a-zA-Z\s]*$/.test(value)) {
        setErrors((prev) => ({
          ...prev,
          Name: "Name can only contain letters.",
        }));
        return;
      } else {
        setErrors((prev) => ({ ...prev, Name: "" }));
      }
    }
    setFormData({ ...formData, [name]: value });

    if (value.trim() !== "") {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.Name.trim()) {
      newErrors.Name = "Name is required";
    } else if (!/^[A-Za-z\s]+$/.test(formData.Name)) {
      newErrors.Name = "Name should only contain letters";
    }

    if (!formData.Date.trim()) {
      newErrors.Date = "Date is required";
    }

    if (!formData.Item) {
      newErrors.Item = "Please select an item";
    }

    if (!formData.UnitNo.trim()) {
      newErrors.UnitNo = "Number of units is required";
    } else if (!/^\d+$/.test(formData.UnitNo) && formData.UnitNo) {
      newErrors.UnitNo = "Unit number can only contain digits.";
    }

    if (!formData.ReferenceNo.trim()) {
      newErrors.ReferenceNo = "Reference number is required";
    }

    if (!formData.Address.trim()) {
      newErrors.Address = "Address is required";
    }

    if (!formData.FromWhom.trim()) {
      newErrors.FromWhom = "For whom is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8007/postal/add",
        formData
      );
      alert("Form Submitted Successfully!");
      console.log(response.data);
      setFormData({
        Category: "Dispatch",
        Name: "",
        Date: "",
        Item: "",
        UnitNo: "",
        ReferenceNo: "",
        Address: "",
        FromWhom: "",
        Remark: "",
      });
      setErrors({});
      window.location.reload(false);
    } catch (error) {
      alert("Error submitting form: " + error.response.data.message);
      console.error(error);
    }
  };

  return (
    <>
      <MainDashboard>
        <FormContainer>
          <Title>Postal Dispatched</Title>
          <Form onSubmit={handleSubmit}>
            <Heading>Parcel Details</Heading>
            <Main>
              <InputContainer>
                <Label>Name of sender</Label>
                <Input
                  type="text"
                  name="Name"
                  value={formData.Name}
                  onChange={handleChange}
                  placeholder="Enter Name"
                />
                {errors.Name && <ErrorMessage>{errors.Name}</ErrorMessage>}
              </InputContainer>

              <InputContainer>
                <Label>Date</Label>
                <Input
                  type="date"
                  name="Date"
                  value={formData.Date}
                  onChange={handleChange}
                />
                {errors.Date && <ErrorMessage>{errors.Date}</ErrorMessage>}
              </InputContainer>

              <InputContainer>
                <Label>Item (Document/Parcel)</Label>
                <Select
                  name="Item"
                  value={formData.Item}
                  onChange={handleChange}
                >
                  <option value="">Select Item</option>
                  <option value="document">Document</option>
                  <option value="parcel">Parcel</option>
                </Select>
                {errors.Item && <ErrorMessage>{errors.Item}</ErrorMessage>}
              </InputContainer>

              <InputContainer>
                <Label>No of Unit</Label>
                <Input
                  type="text"
                  name="UnitNo"
                  value={formData.UnitNo}
                  onChange={handleChange}
                  placeholder="Enter Number of Units"
                />
                {errors.UnitNo && <ErrorMessage>{errors.UnitNo}</ErrorMessage>}
              </InputContainer>

              <InputContainer>
                <Label>Reference no.</Label>
                <Input
                  type="text"
                  name="ReferenceNo"
                  value={formData.ReferenceNo}
                  onChange={handleChange}
                  placeholder="Enter Reference no."
                />
                {errors.ReferenceNo && <ErrorMessage>{errors.ReferenceNo}</ErrorMessage>}
              </InputContainer>

              <InputContainer>
                <Label>Address</Label>
                <Input
                  type="text"
                  name="Address"
                  value={formData.Address}
                  onChange={handleChange}
                  placeholder="Enter Address"
                />
                {errors.Address && <ErrorMessage>{errors.Address}</ErrorMessage>}
              </InputContainer>

              <InputContainer>
                <Label>Name of Receiver</Label>
                <Input
                  type="text"
                  name="FromWhom"
                  value={formData.FromWhom}
                  onChange={handleChange}
                  placeholder="Enter Name"
                />
                {errors.FromWhom && <ErrorMessage>{errors.FromWhom}</ErrorMessage>}
              </InputContainer>

              <InputContainer>
                <Label>Remark</Label>
                <Input
                  type="text"
                  name="Remark"
                  value={formData.Remark}
                  onChange={handleChange}
                  placeholder="Enter remark"
                />
              </InputContainer>
            </Main>

            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "center",
              }}
            >
              <SubmitButton type="submit">Save</SubmitButton>
            </div>
          </Form>
          <PostalDispatchTable />
        </FormContainer>
      </MainDashboard>
    </>
  );
};

export default PostalDispatch;