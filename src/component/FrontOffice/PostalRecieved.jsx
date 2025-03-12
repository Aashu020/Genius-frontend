import React, { useState } from "react";
import axios from "axios";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import PostalRecievedTable from "./PostalRecievedTable";
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

const PostalRecieved = () => {
  const [formData, setFormData] = useState({
    Category: "Recieved",
    Name: "",
    Date: "",
    Item: "",
    UnitNo: "",
    ReferenceNo: "",
    Address: "",
    FromWhom: "",
    Remark: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "Name") {
      if (!/^[a-zA-Z\s]*$/.test(value)) {
        setFormErrors((prev) => ({
          ...prev,
          Name: "Name can only contain letters.",
        }));
        return;
      } else {
        setFormErrors((prev) => ({ ...prev, Name: "" }));
      }
    }

    if (name === "UnitNo") {
      if (!/^\d*$/.test(value)) {
        setFormErrors((prev) => ({
          ...prev,
          UnitNo: "Unit number can only contain digits.",
        }));
        return;
      } else {
        setFormErrors((prev) => ({ ...prev, UnitNo: "" }));
      }
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors = {};

    if (!/^[a-zA-Z\s]*$/.test(formData.Name) && formData.Name) {
      errors.Name = "Name can only contain letters.";
    }
    if (!/^\d+$/.test(formData.UnitNo) && formData.UnitNo) {
      errors.UnitNo = "Unit number can only contain digits.";
    }

    const requiredFields = [
      "Name",
      "Item",
      "Date",
      "UnitNo",
      "ReferenceNo",
      "Address",
      "FromWhom",
      "Remark",
    ];
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        errors[field] = `${field} is required.`;
      }
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post(
        "https://api.edspride.in/postal/add",
        formData
      );
      alert("Form Submitted Successfully!");
      console.log(response.data);
      setFormData({
        Category: "Recieved",
        Name: "",
        Date: "",
        Item: "",
        UnitNo: "",
        ReferenceNo: "",
        Address: "",
        FromWhom: "",
        Remark: "",
      });
      setFormErrors({});
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
          <Title>Postal Recieved</Title>

          <Form onSubmit={handleSubmit}>
            <Heading>Parcel Details</Heading>
            <Main>
              <InputContainer>
                <Label>Name of Receiver</Label>
                <Input
                  type="text"
                  name="Name"
                  value={formData.Name}
                  onChange={handleChange}
                  placeholder="Enter Name"
                />
                {formErrors.Name && <div style={{ color: "red" }}>{formErrors.Name}</div>}
              </InputContainer>

              <InputContainer>
                <Label>Date</Label>
                <Input
                  type="date"
                  name="Date"
                  value={formData.Date}
                  onChange={handleChange}
                />
                {formErrors.Date && <div style={{ color: "red" }}>{formErrors.Date}</div>}
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
                {formErrors.Item && <ErrorMessage>{formErrors.Item}</ErrorMessage>}
              </InputContainer>
              <InputContainer>
                <Label>Unit No</Label>
                <Input
                  type="text"
                  name="UnitNo"
                  value={formData.UnitNo}
                  onChange={handleChange}
                  placeholder="Enter Unit No"
                />
                {formErrors.UnitNo && <div style={{ color: "red" }}>{formErrors.UnitNo}</div>}
              </InputContainer>

              <InputContainer>
                <Label>Reference No</Label>
                <Input
                  type="text"
                  name="ReferenceNo"
                  value={formData.ReferenceNo}
                  onChange={handleChange}
                  placeholder="Enter Reference No"
                />
                {formErrors.ReferenceNo && <div style={{ color: "red" }}>{formErrors.ReferenceNo}</div>}
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
                {formErrors.Address && <div style={{ color: "red" }}>{formErrors.Address}</div>}
              </InputContainer>

              <InputContainer>
                <Label>Name of Sender</Label>
                <Input
                  type="text"
                  name="FromWhom"
                  value={formData.FromWhom}
                  onChange={handleChange}
                  placeholder="Enter From Whom"
                />
                {formErrors.FromWhom && <div style={{ color: "red" }}>{formErrors.FromWhom}</div>}
              </InputContainer>

              <InputContainer>
                <Label>Remark</Label>
                <Input
                  type="text"
                  name="Remark"
                  value={formData.Remark}
                  onChange={handleChange}
                  placeholder="Enter Remark"
                />
                {formErrors.Remark && <div style={{ color: "red" }}>{formErrors.Remark}</div>}
              </InputContainer>
            </Main>
            <div
              style={{ display: "flex", gap: "10px", justifyContent: "center" }}
            >
              <SubmitButton type="submit">Submit</SubmitButton>
            </div>
          </Form>
          <PostalRecievedTable />
        </FormContainer>
      </MainDashboard>
    </>
  );
};

export default PostalRecieved;