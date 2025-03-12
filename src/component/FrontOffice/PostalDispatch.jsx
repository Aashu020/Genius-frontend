import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import PostalDispatchTable from "./PostalDispatchTable";

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

const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 5px;
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
      // Allow only numbers
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

    // Remove error message when the field is filled
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
                {errors.UnitNo && (
                  <ErrorMessage>{errors.UnitNo}</ErrorMessage>
                )}
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
                {errors.ReferenceNo && (
                  <ErrorMessage>{errors.ReferenceNo}</ErrorMessage>
                )}
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
                {errors.Address && (
                  <ErrorMessage>{errors.Address}</ErrorMessage>
                )}
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
                {errors.FromWhom && (
                  <ErrorMessage>{errors.FromWhom}</ErrorMessage>
                )}
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

