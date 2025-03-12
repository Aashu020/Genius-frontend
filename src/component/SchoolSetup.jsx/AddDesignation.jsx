import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Edit, Trash2, PlusCircle } from "lucide-react";

// Styled components
const MainDashboard = styled.div`
  flex: 1;
  padding: 20px;
  height: calc(100vh - 100px);
  overflow-y: auto;
  background-color: #f9f9f9;
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
  width: 93%;
  padding: 15px 20px;
  border: 2px solid #7d3cff;
  border-radius: 30px;
  font-size: 16px;
  color: #7a7a7a;
  background-color: #f4f6fc;
  font-weight: bold;
  outline: none;
`;

const Select = styled.select`
  width: 97%;
  padding: 15px 20px;
  border: 2px solid #7d3cff;
  border-radius: 30px;
  font-size: 16px;
  color: #7a7a7a;
  background-color: #f4f6fc;
  font-weight: bold;
  outline: none;
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
`;

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Table = styled.table`
  width: 70%;
  border-collapse: collapse;
  margin-top: 30px;
`;

const Th = styled.th`
  background-color: #f2f2f2;
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
`;

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const ActionButton = styled.div`
  background-color: ${({ color }) => color || "gray"};
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;

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
      const response = await axios.get("http://localhost:8007/department/all");
      setDepartments(response.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const handleDepartmentChange = (e) => {
    const departmentId = e.target.value;
    setSelectedDepartment(departmentId);
    
    const selectedDept = departments.find(dept => dept._id === departmentId);
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
    if (designationFields.some(field => !field.DesignationName || !field.Description)) {
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
      await axios.put(`http://localhost:8007/department/update/${selectedDepartment}`, payload);
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
          <Select value={selectedDepartment} onChange={handleDepartmentChange}>
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept._id} value={dept._id}>
                {dept.DepartmentName}
              </option>
            ))}
          </Select>
          {errors.department && <ErrorMessage>{errors.department}</ErrorMessage>}
        </InputContainer>

        {designationFields.map((field, index) => (
          <div key={index} style={{marginBottom:"30px"}}>
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
                padding: '8px 12px',
                border:'none',
                background: '#f44336',
                color: 'white',
                borderRadius: '50px',
                cursor: 'pointer',
                fontWeight: 'bold',
                marginTop: '5px',
              }}
            >
              Remove
            </button>
          </div>
        ))}

        {errors.designation && <ErrorMessage>{errors.designation}</ErrorMessage>}

        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          <SubmitButton type="submit">Save</SubmitButton>
          <SubmitButton
            type="button"
            onClick={handleAddDesignation}
          >
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
                      <div style={{display:"flex", justifyContent:"space-evenly"}}>
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