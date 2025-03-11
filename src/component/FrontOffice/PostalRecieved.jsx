import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import PostalRecievedTable from "./PostalRecievedTable";

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

  @media (max-width: 768px) {
    width: 100%;
    font-size: 12px;
    padding: 5px;
  }
`;
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

    // Handle validation for Name
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
      // Allow only numbers
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

    // Update form data
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors = {};

    // Validate Name
    if (!/^[a-zA-Z\s]*$/.test(formData.Name) && formData.Name) {
      errors.Name = "Name can only contain letters.";
    }
    if (!/^\d+$/.test(formData.UnitNo) && formData.UnitNo) {
      errors.UnitNo = "Unit number can only contain digits.";
    }


    // Validate other required fields
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

    setFormErrors(errors); // Set the error messages
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Validate before submission

    try {
      const response = await axios.post(
        "https://api.edspride.in/postal/add",
        formData
      );
      alert("Form Submitted Successfully!");
      console.log(response.data);
      // Reset the form after successful submission
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
      setFormErrors({}); // Clear errors
      window.location.reload(false)

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
                {formErrors.Name && <div style={{ color: 'red' }}>{formErrors.Name}</div>}
              </InputContainer>

              <InputContainer>
                <Label>Date</Label>
                <Input
                  type="date"
                  name="Date"
                  value={formData.Date}
                  onChange={handleChange}

                />
                {formErrors.Date && <div style={{ color: 'red' }}>{formErrors.Date}</div>}
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
                {formErrors.UnitNo && <div style={{ color: 'red' }}>{formErrors.UnitNo}</div>}
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
                {formErrors.ReferenceNo && <div style={{ color: 'red' }}>{formErrors.ReferenceNo}</div>}
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
                {formErrors.Address && <div style={{ color: 'red' }}>{formErrors.Address}</div>}
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
                {formErrors.FromWhom && <div style={{ color: 'red' }}>{formErrors.FromWhom}</div>}
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
                {formErrors.Remark && <div style={{ color: 'red' }}>{formErrors.Remark}</div>}
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
