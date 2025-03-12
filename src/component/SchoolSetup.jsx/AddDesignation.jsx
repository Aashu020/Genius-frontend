import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Edit, Trash2, PlusCircle } from "lucide-react";
import {
  MainDashboard,
  Title,
  Form,
  InputContainer,
  Label,
  Input,
  AddDesignationSelect,
  SubmitButton,
  TableContainer,
  Table,
  Th,
  Td,
  ActionButton,
  ErrorMessage,
} from "./SchoolSetupStyle";

const AddDesignation = () => {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [designationFields, setDesignationFields] = useState([{ DesignationName: "", Description: "" }]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get("https://api.edspride.in/department/all");
      setDepartments(response.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const handleDepartmentChange = (e) => {
    const departmentId = e.target.value;
    setSelectedDepartment(departmentId);
    const selectedDept = departments.find((dept) => dept._id === departmentId);
    if (selectedDept) {
      setDesignationFields(selectedDept.Designation || [{ DesignationName: "", Description: "" }]);
    } else {
      setDesignationFields([{ DesignationName: "", Description: "" }]);
    }
  };

  const handleInputChange = (index, field) => (e) => {
    const values = [...designationFields];
    values[index][field] = e.target.value;
    setDesignationFields(values);
  };

  const handleAddDesignation = () => {
    setDesignationFields([...designationFields, { DesignationName: "", Description: "" }]);
  };

  const handleRemoveDesignation = (index) => {
    const values = [...designationFields];
    values.splice(index, 1);
    setDesignationFields(values);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!selectedDepartment) newErrors.department = "Department is required.";
    if (designationFields.some((field) => !field.DesignationName || !field.Description)) {
      newErrors.designation = "All designations and descriptions are required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const payload = { Designation: designationFields };
      await axios.put(`https://api.edspride.in/department/update/${selectedDepartment}`, payload);
      toast.success("Designations added successfully!");
      resetForm();
      fetchDepartments();
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  const resetForm = () => {
    setDesignationFields([{ DesignationName: "", Description: "" }]);
    setSelectedDepartment("");
    setErrors({});
  };

  return (
    <MainDashboard>
      <Title>Add Designation</Title>
      <Form onSubmit={handleSubmit}>
        <InputContainer>
          <Label>Department</Label>
          <AddDesignationSelect value={selectedDepartment} onChange={handleDepartmentChange}>
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept._id} value={dept._id}>
                {dept.DepartmentName}
              </option>
            ))}
          </AddDesignationSelect>
          {errors.department && <ErrorMessage>{errors.department}</ErrorMessage>}
        </InputContainer>

        {designationFields.map((field, index) => (
          <div key={index} style={{ marginBottom: "30px" }}>
            <InputContainer>
              <Label>Designation Name</Label>
              <Input
                type="text"
                value={field.DesignationName}
                onChange={handleInputChange(index, "DesignationName")}
                placeholder="Enter Designation Name"
              />
            </InputContainer>

            <InputContainer>
              <Label>Description</Label>
              <Input
                type="text"
                value={field.Description}
                onChange={handleInputChange(index, "Description")}
                placeholder="Enter Description"
              />
            </InputContainer>

            <button
              type="button"
              onClick={() => handleRemoveDesignation(index)}
              style={{
                padding: "8px 12px",
                border: "none",
                background: "#f44336",
                color: "white",
                borderRadius: "50px",
                cursor: "pointer",
                fontWeight: "bold",
                marginTop: "5px",
              }}
            >
              Remove
            </button>
          </div>
        ))}

        {errors.designation && <ErrorMessage>{errors.designation}</ErrorMessage>}

        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          <SubmitButton type="submit">Save</SubmitButton>
          <SubmitButton type="button" onClick={handleAddDesignation}>
            <PlusCircle size={18} />
            Add More
          </SubmitButton>
        </div>
      </Form>

      <TableContainer>
        <Table>
          <thead>
            <tr>
              <Th>Department</Th>
              <Th>Designation Name</Th>
              <Th>Description</Th>
              <Th>Action</Th>
            </tr>
          </thead>
          <tbody>
            {departments.length > 0 &&
              departments.map((dept) =>
                dept?.Designation?.map((item) => (
                  <tr key={item._id}>
                    <Td>{dept.DepartmentName}</Td>
                    <Td>{item.DesignationName}</Td>
                    <Td>{item.Description}</Td>
                    <Td>
                      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                        <ActionButton color="#209a16">
                          Edit <Edit size={18} />
                        </ActionButton>
                        <ActionButton color="red">
                          <Trash2 size={18} />
                        </ActionButton>
                      </div>
                    </Td>
                  </tr>
                ))
              )}
          </tbody>
        </Table>
      </TableContainer>

      <ToastContainer />
    </MainDashboard>
  );
};

export default AddDesignation;