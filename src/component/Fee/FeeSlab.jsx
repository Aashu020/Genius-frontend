import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Eye, Edit, Trash2 } from "lucide-react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, MainDashboard, Title, Form, Main, FormContainer, InputContainer, Label, Input, Select, SubmitButton, ErrorMessage,  Th, Td, Td1, EditButton, DeleteButton, ConfirmationModal, ModalContent, ConfirmButton, DetailModalContent } from "./FeeStyles";
const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto; /* ✅ Ensure scrolling works */
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width:1023px){
    justify-content: flex-start;
  }
  
`;
 const Table = styled.table`
  width: 100%; /* ✅ 100% width le, taaki scroll properly aaye */
  min-width: 600px; /* ✅ Avoid shrinking */
  border-collapse: collapse;
  margin-top: 30px;
  /* white-space: nowrap; ✅ Prevent text wrapping */
  
  
`;import  baseURL from '../utils/Url'; 
const FeeSlab = () => {
  const [classList, setClassList] = useState([]);
  const [feeSlabList, setFeeSlabList] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [classValue, setClassValue] = useState("");
  const [classValueTable, setClassValueTable] = useState("");
  const [feeHeaders, setFeeHeaders] = useState([]);
  const [feeValues, setFeeValues] = useState({});
  const [feeValuesTable, setFeeValuesTable] = useState({});
  const [errors, setErrors] = useState({});
  const [editingClassId, setEditingClassId] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);


  useEffect(() => {
    fetchClasses();
    fetchFeeHeaders();
    fetchFeeSlabs();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await axios.get(`${baseURL}/class/all`);
      setClassList(response.data);
    } catch (error) {
      console.error("Error fetching classes:", error);
      toast.error("Error fetching class list.");
    }
  };

  const fetchFeeHeaders = async () => {
    try {
      const response = await axios.get(`${baseURL}/feeHeader/all`);
      const arr = response.data.map(feeHeader => ({
        Name: feeHeader.Name,
        FeeMode: feeHeader.FeeMode,
        Amount: 0,
      }));
      setFeeHeaders(arr);
    } catch (error) {
      console.error("Error fetching fee headers:", error);
    }
  };

  const fetchFeeSlabs = async () => {
    try {
      const response = await axios.get(`${baseURL}/feeslab/all`);
      setFeeSlabList(response.data);
    } catch (error) {
      console.error("Error fetching fee slabs:", error);
      toast.error("Error fetching fee slabs.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFeeValues(prev => ({ ...prev, [name]: value }));
  };

  const handleClassChange = (e) => {
    const selectedClassId = e.target.value;
    setSelectedClassId(selectedClassId);

    const selectedClass = classList.find(cls => cls.ClassId === selectedClassId);
    setClassValue(selectedClass ? selectedClass.Class : "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!selectedClassId) {
      newErrors.classValue = "Class is required";
    }

    feeHeaders.forEach(header => {
      if (!feeValues[header.Name]) {
        newErrors[header.Name] = `${header.Name} is required`;
      }
    });

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const payload = {
      Class: classValue,
      ClassId: selectedClassId,
      Fees: feeHeaders.map(header => ({
        Name: header.Name,
        Amount: feeValues[header.Name] || 0,
        Times: getMultiplier(header.FeeMode)
      })),
      TotalFee: feeHeaders.reduce((acc, curr) =>
        acc + (Number(feeValues[curr.Name]) || 0) * getMultiplier(curr.FeeMode), 0
      ),
    };

    console.log(payload);

    try {
      if (editingClassId) {
        await axios.put(`${baseURL}/feeslab/update/${editingClassId}`, payload);
        toast.success("Fee slab updated successfully.");
      } else {
        await axios.post(`${baseURL}/feeslab/add`, payload);
        toast.success("Fee slab added successfully.");
      }
      resetForm();
      fetchFeeSlabs();
    } catch (error) {
      toast.error("Error submitting the form.");
      console.error("Error submitting the form:", error);
    }
  };

  const handleEdit = (feeSlab) => {
    setEditingClassId(feeSlab._id);
    setSelectedClassId(feeSlab.ClassId);
    setClassValue(feeSlab.Class);
    const feeValuesMap = feeSlab.Fees.reduce((acc, fee) => {
      acc[fee.Name] = fee.Amount;
      return acc;
    }, {});
    setFeeValues(feeValuesMap);
  };

  const openModel = (feeSlab) => {
    setSelectedClass(feeSlab.ClassId);
    setShowDetailModal(true)
    setClassValueTable(feeSlab.Class);
    const feeValuesMap = feeSlab.Fees.reduce((acc, fee) => {
      acc[fee.Name] = fee.Amount;
      return acc;
    }, {});
    setFeeValuesTable(feeValuesMap);
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseURL}/feeslab/delete/${id}`);
      toast.success("Fee slab deleted successfully.");
      fetchFeeSlabs();
    } catch (error) {
      toast.error("Error deleting fee slab.");
      console.error("Error deleting fee slab:", error);
    }
  };

  const resetForm = () => {
    setSelectedClassId("");
    setClassValue("");
    setFeeValues({});
    setEditingClassId(null);
  };

  const getMultiplier = (feeMode) => {
    switch (feeMode) {
      case "One Time":
        return 1;
      case "Half Yearly":
        return 2;
      case "Quarterly":
        return 4;
      case "Monthly":
        return 12;
      default:
        return 1; // Default case
    }
  };

  return (
    <MainDashboard>
      <ToastContainer />
      <FormContainer>
        <Title>Fee Slab</Title>
        <Form onSubmit={handleSubmit}>
          <Main>
            <InputContainer>
              <Label>Select Class</Label>
              <Select value={selectedClassId} onChange={handleClassChange}>
                <option value="">Select Class</option>
                {classList.map((cls) => (
                  <option key={cls.ClassId} value={cls.ClassId}>
                    {cls.Class}
                  </option>
                ))}
              </Select>
              {errors.classValue && <ErrorMessage>{errors.classValue}</ErrorMessage>}
            </InputContainer>

            {feeHeaders.map((header) => (
              <InputContainer key={header.Name}>
                <Label>{header.Name}</Label>
                <Input
                  type="number"
                  name={header.Name}
                  value={feeValues[header.Name] || ''}
                  onChange={handleInputChange}
                />
                {errors[header.Name] && <ErrorMessage>{errors[header.Name]}</ErrorMessage>}
              </InputContainer>
            ))}
          </Main>
          {classValue ? <TableContainer>
            <Table>
              <thead>
                <tr>
                  <Th>Field</Th>
                  <Th>Times</Th>
                  <Th>Value</Th>
                </tr>
              </thead>
              <tbody>
                {selectedClassId && (
                  <>
                    <tr>
                      <Td>Class</Td>
                      <Td></Td>
                      <Td>{classValue}</Td>
                    </tr>
                    {feeHeaders.map(header => (
                      <tr key={header.Name}>
                        <Td>{header.Name} ({header.FeeMode})</Td>
                        <Td>{getMultiplier(header.FeeMode)}</Td>
                        <Td>
                          {feeValues[header.Name] || 0}
                        </Td>
                      </tr>
                    ))}
                    <tr>
                      <Td>Total Fee</Td>
                      <Td></Td>
                      <Td>
                        {feeHeaders.reduce((acc, curr) =>
                          acc + (Number(feeValues[curr.Name]) || 0) * getMultiplier(curr.FeeMode), 0
                        )}
                      </Td>
                    </tr>
                  </>
                )}
              </tbody>
            </Table>
          </TableContainer> : null}


          <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
            <SubmitButton type="submit">
              {editingClassId ? "Update Fee Slab" : "Submit"}
            </SubmitButton>
          </div>
        </Form>


        <TableContainer>
          <Table>
            <thead>
              <tr>
                <Th>Sr No.</Th>
                <Th>Class</Th>
                <Th>Total Fee</Th>
                <Th>View</Th>
                <Th>Action</Th>
              </tr>
            </thead>
            <tbody>
              {feeSlabList.map((feeSlab, index) => (
                <tr key={feeSlab._id}>
                  <Td>{index + 1}</Td>
                  <Td>{feeSlab.Class}</Td>
                  <Td>{feeSlab.TotalFee || 'N/A'}</Td>
                  <Td><Eye onClick={() => openModel(feeSlab)} /></Td>
                  <Td1>
                    <EditButton onClick={() => handleEdit(feeSlab)}>
                      <p>Edit</p>
                      <Edit size={18} />
                    </EditButton>
                    <DeleteButton onClick={() => handleDelete(feeSlab._id)}>
                      <Trash2 size={18} />
                    </DeleteButton>
                  </Td1>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      </FormContainer>
      {showDetailModal && selectedClass && (
        <ConfirmationModal>
          <DetailModalContent>
            <ConfirmButton className="no" onClick={() => setShowDetailModal(false)}>
              Close
            </ConfirmButton>
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <Th>Field</Th>
                    <Th>Times</Th>
                    <Th>Value</Th>
                  </tr>
                </thead>
                <tbody>
                  {selectedClass&& (
                    <>
                      <tr>
                        <Td>Class</Td>
                        <Td></Td>
                        <Td>{classValueTable}</Td>
                      </tr>
                      {feeHeaders.map(header => (
                        <tr key={header.Name}>
                          <Td>{header.Name} ({header.FeeMode})</Td>
                          <Td>{getMultiplier(header.FeeMode)}</Td>
                          <Td>
                            {feeValuesTable[header.Name] || 0}
                          </Td>
                        </tr>
                      ))}
                      <tr>
                        <Td>Total Fee</Td>
                        <Td></Td>
                        <Td>
                          {feeHeaders.reduce((acc, curr) =>
                            acc + (Number(feeValuesTable[curr.Name]) || 0) * getMultiplier(curr.FeeMode), 0
                          )}
                        </Td>
                      </tr>
                    </>
                  )}
                </tbody>
              </Table>
            </TableContainer>
          </DetailModalContent>
        </ConfirmationModal>
      )}
    </MainDashboard>
  );
};

export default FeeSlab;
