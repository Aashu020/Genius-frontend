import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import {
  Container,
  MainDashboard,
  Title,
  Form,
  Heading,
  Section,
  Main,
  FormContainer,
  InputContainer,
  Label,
  Input,
  SubmitButton,
  Select,
} from "./SchoolSetup2Style";

const Setup = () => {
  const navigate = useNavigate();
  const [present, setPresent] = useState(false);
  const [id, setId] = useState("");
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    SchoolName: "",
    Address: "",
    PhoneNo: "",
    Website: "",
    SchoolLogo: null,
    EmailId: "",
    StartTime: "",
    EndTime: "",
    SchoolStamp: null,
    SalaryDate: "",
    WeeklyOff: "",
    PrincipleSign: null,
    SchoolSign: null,
    AffiliationNo: "",
    UDISECode: "",
  });

  const fetchData = () => {
    axios
      .get("https://api.edspride.in/schoolsetup/all")
      .then((response) => {
        if (response.data.length > 0) {
          setPresent(true);
          setFormData(response.data[0]);
          setId(response.data[0]._id);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "PhoneNo") {
      if (!/^\d*$/.test(value)) {
        setErrors((prev) => ({
          ...prev,
          PhoneNo: "Phone can only contain numbers.",
        }));
        return;
      } else if (value.length > 10) {
        setErrors((prev) => ({
          ...prev,
          PhoneNo: "PhoneNo must be 10 digits long.",
        }));
        return;
      } else {
        setErrors((prev) => ({ ...prev, PhoneNo: "" }));
      }
    }
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });

    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.SchoolName) newErrors.SchoolName = "School Name is required";
    if (!formData.Address) newErrors.Address = "Address is required";
    if (!formData.PhoneNo) newErrors.PhoneNo = "PhoneNo is required";
    if (!formData.Website) newErrors.Website = "Website is required";
    if (!formData.SchoolLogo) newErrors.SchoolLogo = "School Logo is required";
    if (!formData.EmailId) newErrors.EmailId = "Email Id is required";
    if (!formData.StartTime) newErrors.StartTime = "Start Time is required";
    if (!formData.EndTime) newErrors.EndTime = "End Time is required";
    if (!formData.SchoolStamp) newErrors.SchoolStamp = "School Stamp is required";
    if (!formData.SalaryDate) newErrors.SalaryDate = "Salary Date is required";
    if (!formData.WeeklyOff) newErrors.WeeklyOff = "Weekly Off is required";
    if (!formData.PrincipleSign) newErrors.PrincipleSign = "Principle Sign is required";
    if (!formData.SchoolSign) newErrors.SchoolSign = "School Sign is required";
    if (!formData.AffiliationNo) newErrors.AffiliationNo = "Affiliation No is required";
    if (!formData.UDISECode) newErrors.UDISECode = "UDISECode is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formToSubmit = new FormData();
    Object.keys(formData).forEach((key) => {
      formToSubmit.append(key, formData[key]);
    });

    try {
      const url = present
        ? `https://api.edspride.in/schoolsetup/update/${id}`
        : "https://api.edspride.in/schoolsetup/add";
      const response = await axios.post(url, formToSubmit, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(present ? "School setup updated successfully!" : "School setup created successfully!");
      fetchData();
      setFormData({
        SchoolName: "",
        Address: "",
        PhoneNo: "",
        Website: "",
        SchoolLogo: null,
        EmailId: "",
        StartTime: "",
        EndTime: "",
        SchoolStamp: null,
        SalaryDate: "",
        WeeklyOff: "",
        PrincipleSign: null,
        SchoolSign: null,
        AffiliationNo: "",
        UDISECode: "",
      });

      document.querySelector('input[name="SchoolLogo"]').value = "";
      document.querySelector('input[name="SchoolStamp"]').value = "";
      document.querySelector('input[name="PrincipleSign"]').value = "";
      document.querySelector('input[name="SchoolSign"]').value = "";

      if (!present) {
        navigate("/admin/academicyearinfo");
      }
    } catch (error) {
      console.error("Error saving school setup:", error);
      toast.error("Error saving school setup. Please try again.");
    }
  };

  return (
    <>
      <MainDashboard>
        <FormContainer>
          <Form onSubmit={handleSubmit}>
            <Section>
              <Heading>{present ? "Update School Details" : "Add School Details"}</Heading>
            </Section>
            <Main>
              <InputContainer>
                <Label>School Name</Label>
                <Input
                  type="text"
                  name="SchoolName"
                  value={formData.SchoolName}
                  onChange={handleChange}
                />
                {errors.SchoolName && <span style={{ color: "red" }}>{errors.SchoolName}</span>}
              </InputContainer>
              <InputContainer>
                <Label>Address</Label>
                <Input
                  type="text"
                  name="Address"
                  value={formData.Address}
                  onChange={handleChange}
                />
                {errors.Address && <span style={{ color: "red" }}>{errors.Address}</span>}
              </InputContainer>
              <InputContainer>
                <Label>Phone No</Label>
                <Input
                  type="text"
                  name="PhoneNo"
                  value={formData.PhoneNo}
                  onChange={handleChange}
                />
                {errors.PhoneNo && <span style={{ color: "red" }}>{errors.PhoneNo}</span>}
              </InputContainer>
              <InputContainer>
                <Label>Website</Label>
                <Input
                  type="text"
                  name="Website"
                  value={formData.Website}
                  onChange={handleChange}
                />
                {errors.Website && <span style={{ color: "red" }}>{errors.Website}</span>}
              </InputContainer>
              <InputContainer>
                <Label>School Logo</Label>
                <Input
                  type="file"
                  name="SchoolLogo"
                  onChange={handleChange}
                />
                {errors.SchoolLogo && <span style={{ color: "red" }}>{errors.SchoolLogo}</span>}
              </InputContainer>
              <InputContainer>
                <Label>Email Id</Label>
                <Input
                  type="email"
                  name="EmailId"
                  value={formData.EmailId}
                  onChange={handleChange}
                />
                {errors.EmailId && <span style={{ color: "red" }}>{errors.EmailId}</span>}
              </InputContainer>
              <InputContainer>
                <Label>Start Time</Label>
                <Input
                  type="time"
                  name="StartTime"
                  value={formData.StartTime}
                  onChange={handleChange}
                />
                {errors.StartTime && <span style={{ color: "red" }}>{errors.StartTime}</span>}
              </InputContainer>
              <InputContainer>
                <Label>End Time</Label>
                <Input
                  type="time"
                  name="EndTime"
                  value={formData.EndTime}
                  onChange={handleChange}
                />
                {errors.EndTime && <span style={{ color: "red" }}>{errors.EndTime}</span>}
              </InputContainer>
              <InputContainer>
                <Label>School Stamp</Label>
                <Input
                  type="file"
                  name="SchoolStamp"
                  onChange={handleChange}
                />
                {errors.SchoolStamp && <span style={{ color: "red" }}>{errors.SchoolStamp}</span>}
              </InputContainer>
              <InputContainer>
                <Label>Salary Date</Label>
                <Input
                  type="text"
                  name="SalaryDate"
                  value={formData.SalaryDate}
                  onChange={handleChange}
                />
                {errors.SalaryDate && <span style={{ color: "red" }}>{errors.SalaryDate}</span>}
              </InputContainer>
              <InputContainer>
                <Label>Weekly Off</Label>
                <Select
                  name="WeeklyOff"
                  value={formData.WeeklyOff}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="Sunday">Sunday</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                </Select>
                {errors.WeeklyOff && <span style={{ color: "red" }}>{errors.WeeklyOff}</span>}
              </InputContainer>
              <InputContainer>
                <Label>Principle Sign</Label>
                <Input
                  type="file"
                  name="PrincipleSign"
                  onChange={handleChange}
                />
                {errors.PrincipleSign && <span style={{ color: "red" }}>{errors.PrincipleSign}</span>}
              </InputContainer>
              <InputContainer>
                <Label>School Sign</Label>
                <Input
                  type="file"
                  name="SchoolSign"
                  onChange={handleChange}
                />
                {errors.SchoolSign && <span style={{ color: "red" }}>{errors.SchoolSign}</span>}
              </InputContainer>
              <InputContainer>
                <Label>Affiliation No</Label>
                <Input
                  type="text"
                  name="AffiliationNo"
                  value={formData.AffiliationNo}
                  onChange={handleChange}
                />
                {errors.AffiliationNo && <span style={{ color: "red" }}>{errors.AffiliationNo}</span>}
              </InputContainer>
              <InputContainer>
                <Label>UDISE Code</Label>
                <Input
                  type="text"
                  name="UDISECode"
                  value={formData.UDISECode}
                  onChange={handleChange}
                />
                {errors.UDISECode && <span style={{ color: "red" }}>{errors.UDISECode}</span>}
              </InputContainer>
            </Main>
            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "center",
              }}
            >
              {present ? (
                <SubmitButton type="submit">Update</SubmitButton>
              ) : (
                <SubmitButton type="submit">Save</SubmitButton>
              )}
            </div>
          </Form>
        </FormContainer>
        <ToastContainer />
      </MainDashboard>
    </>
  );
};

export default Setup;