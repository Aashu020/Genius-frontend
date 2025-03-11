import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Eye, Edit, Trash2 } from "lucide-react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Styled Components
const Container = styled.div`
  display: flex;
  background-color: #f4f4f4;
`;

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

const Main = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(3, 1fr);
  @media (max-width: 480px) {
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
  width: 88%;
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
  width: 100%;
  padding: 15px 20px;
  border: 2px solid #7d3cff;
  border-radius: 30px;
  font-size: 16px;
  color: #7a7a7a;
  background-color: #f4f6fc;
  font-weight: bold;
`;

const SubmitButton = styled.button`
  width: 50%;
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

const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 5px;
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
  font-weight: 400;
`;

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const Td1 = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  display: flex;
  gap: 1rem;
`;

const EditButton = styled.div`
  background-color: #209a16bf;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DeleteButton = styled.div`
  background-color: red;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  display: flex;
  justify-content: center;
`;

const ConfirmationModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
`;

const ConfirmButton = styled.button`
  padding: 10px 15px;
  margin: 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &.yes {
    background-color: #4caf50;
    color: white;
  }
  &.no {
    background-color: #f44336;
    color: white;
  }
`;

const DetailModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: left;
  width: 50%;
`;

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
      const response = await axios.get("https://api.edspride.in/class/all");
      setClassList(response.data);
    } catch (error) {
      console.error("Error fetching classes:", error);
      toast.error("Error fetching class list.");
    }
  };

  const fetchFeeHeaders = async () => {
    try {
      const response = await axios.get("https://api.edspride.in/feeHeader/all");
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
      const response = await axios.get("https://api.edspride.in/feeslab/all");
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
        await axios.put(`https://api.edspride.in/feeslab/update/${editingClassId}`, payload);
        toast.success("Fee slab updated successfully.");
      } else {
        await axios.post("https://api.edspride.in/feeslab/add", payload);
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
      await axios.delete(`https://api.edspride.in/feeslab/delete/${id}`);
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
