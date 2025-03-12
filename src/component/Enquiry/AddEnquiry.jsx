import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  Title,
  Form,
  Heading,
  FormContainer,
  Main,
  InputContainer,
  Label,
  Label2,
  Input,
  Select,
  SubmitButton,
  ErrorMessage,
  ErrorText,
} from "./EnquiryStyles";


// Validation functions
const isValidMobileNumber = (number) => /^\d{10}$/.test(number);
const isValidName = (name) => /^[A-Za-z\s]+$/.test(name);

const AddEnquiryForm = () => {
  const [formData, setFormData] = useState({
    StudentName: "",
    DOB: "",
    Gender: "",
    AdmissionClass: "",
    AdmissionInClass:"",
    FatherName: "",
    MobileNo: "",
    MotherName: "",
    Address: "",
    Refer: "",
    Requirement: "",
    Message: "",
  });

  const [errors, setErrors] = useState({});
  const [classes, setClasses] = useState([]);

  const handleClassChange = async (e) => {
    const selectedClass = e.target.value;
    console.log(selectedClass);
    console.log(classes[0])
    var output = classes.find(value => value.ClassId === selectedClass);
    console.log(output.Class);

    setFormData((prevFormData) => ({
      ...prevFormData,
      AdmissionInClass: selectedClass,
      AdmissionClass: output.Class,
    }));


    // Fetch sections based on the selected class
    if (selectedClass) {
      try {
        const response = await axios.get(`https://api.edspride.in/class/get/${selectedClass}`);
        setSections(response.data.Section || []);
      } catch (error) {
        console.error("Error fetching sections:", error);
      }
    } else {
      setSections([]); // Reset sections if no class is selected
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;


    if (name === "StudentName" && !/^[a-zA-Z\s]*$/.test(value)) {
      setErrors((prev) => ({
        ...prev,
        StudentName: "Name can only contain letters.",
      }));
      return;
    } else {
      setErrors((prev) => ({ ...prev, Name: "" }));
    }

    if (name === "FatherName" && !/^[a-zA-Z\s]*$/.test(value)) {
      setErrors((prev) => ({
        ...prev,
        FatherName: "Name can only contain letters.",
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

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch('https://api.edspride.in/class/all');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setClasses(data);
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };

    fetchClasses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();


    const newErrors = {};
    if (!formData.StudentName) newErrors.StudentName = "Name is required.";
    if (!formData.DOB) newErrors.DOB = "Date Of Birth is required.";
    if (!formData.Gender) newErrors.Gender = "Select Gender .";
    if (!formData.MobileNo) newErrors.MobileNo = "Mobile number is required.";
    // if (!formData.OTP) newErrors.OTP = "OTP is required.";
    if (!formData.AdmissionClass) newErrors.AdmissionClass = "Admission in Class is required.";
    if (!formData.FatherName) newErrors.FatherName = "FatherName is required.";


    // Validate Name and MobileNo again during submit
    if (!/^[a-zA-Z\s]*$/.test(formData.Name) && formData.Name) {
      newErrors.StudentName = "Name can only contain letters.";
    }

    if (!/^[a-zA-Z\s]*$/.test(formData.Name) && formData.Name) {
      newErrors.FatherName = "Name can only contain letters.";
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
        "https://api.edspride.in/enquiry/add",
        formData
      );
      console.log(response.data);
      alert("Form submitted successfully!");

      // Clear the form data after successful submission
      setFormData({
        StudentName: "",
        DOB: "",
        Gender: "",
        AdmissionClass: "",
        FatherName: "",
        MobileNo: "",
        MotherName: "",
        Address: "",
        Refer: "",
        Requirement: "",
        Message: "",
      });

      // Clear the errors as well
      setErrors({});
    } catch (error) {
      console.error(error.response.data.message);
      alert("Error submitting the form");
    }
  };

  

  return (
    <FormContainer>
      <Title>Add Enquiry</Title>
      <Form onSubmit={handleSubmit}>
        <Main>

          <InputContainer>
            <Label>Student Name</Label>
            <Input
              type="text"
              name="StudentName"
              placeholder="Enter Name"
              value={formData.StudentName}
              onChange={handleChange}
            // required
            />
            <ErrorMessage message="Please enter your name" />
            {errors.StudentName && <ErrorText>{errors.StudentName}</ErrorText>}
          </InputContainer>
          <InputContainer>
            <Label>DOB</Label>
            <Input
              type="date"
              name="DOB"
              placeholder="Enter Date of Birth (DDMMYYYY)"
              value={formData.DOB}
              onChange={handleChange}
            />
            {errors.DOB && <ErrorText>{errors.DOB}</ErrorText>}
          </InputContainer>
          <InputContainer>
            <Label>Gender</Label>
            <Select
              name="Gender"
              value={formData.Gender}
              onChange={handleChange}
            // required
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Select>
            {errors.Gender && <ErrorText>{errors.Gender}</ErrorText>}
          </InputContainer>
          <InputContainer>
            <Label>Admission in Class</Label>
            <Select
              name="AdmissionClass"
              value={formData.AdmissionInClass}
              onChange={handleClassChange}
            >
              <option value="" disabled>
                Select class
              </option>
              {classes.map((classItem) => (
                <option key={classItem.id} value={classItem.ClassId}>
                  {classItem.Class}
                </option>
              ))}
            </Select>
            {errors.AdmissionClass && <ErrorText>{errors.AdmissionClass}</ErrorText>}
          </InputContainer>
          <InputContainer>
            <Label>Father Name</Label>
            <Input
              type="text"
              name="FatherName"
              placeholder="Enter Name"
              value={formData.FatherName}
              onChange={handleChange}
            // required
            />
            {errors.FatherName && <ErrorText>{errors.FatherName}</ErrorText>}
          </InputContainer>
          <InputContainer>
            <Label>Contact No</Label>
            <Input
              type="text"
              name="MobileNo"
              placeholder="Enter Contact NO."
              value={formData.MobileNo}
              onChange={handleChange}
            // required
            />
            {errors.MobileNo && <ErrorText>{errors.MobileNo}</ErrorText>}
          </InputContainer>
          <InputContainer>
            <Label2>Mother Name</Label2>
            <Input
              type="text"
              name="MotherName"
              placeholder="Enter Name"
              value={formData.MotherName}
              onChange={handleChange}
            />
          </InputContainer>
          <InputContainer>
            <Label2>Address</Label2>
            <Input
              type="text"
              name="Address"
              placeholder="Enter Address"
              value={formData.Address}
              onChange={handleChange}
            />
          </InputContainer>
          <InputContainer>
            <Label2>Referred By</Label2>
            <Input
              type="text"
              name="Refer"
              placeholder="Enter Name"
              value={formData.Refer}
              onChange={handleChange}
            />
          </InputContainer>
          <InputContainer>
            <Label2>Special Requirements</Label2>
            <Input
              type="text"
              name="Requirement"
              placeholder="Enter Your Requirement"
              value={formData.Requirement}
              onChange={handleChange}
            />
          </InputContainer>
          <InputContainer>
            <Label2>How You Got To Know About The School</Label2>
            <Input
              type="text"
              name="Message"
              placeholder="Enter Text"
              value={formData.Message}
              onChange={handleChange}
            />
          </InputContainer>
        </Main>
        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          <SubmitButton type="submit">Submit</SubmitButton>
        </div>
      </Form>
    </FormContainer>
  );
};

export default AddEnquiryForm;
