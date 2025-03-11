import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { Edit, Trash2 } from "lucide-react";

// Styled components...
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
`;

const Section = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Main = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
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
  font-weight: 400;
`;

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const EditButton = styled.div`
  background-color: #209a16bf;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;
const DeleteButton = styled.div`
  background-color: red;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  width: 20%;
  display: flex;
  justify-content: center;
`;
const AddSection = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [sections, setSections] = useState([]);
  const [newSectionsArray, setNewSectionsArray] = useState([]);
  const [selectClassError, setSelectClassError] = useState(""); // State to track error

  const fetchClasses = async () => {
    try {
      const response = await axios.get("https://api.edspride.in/class/all");
      setClasses(response.data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  useEffect(() => {
    if (selectedClass) {
      const selectedClassData = classes.find(cls => cls.ClassId === selectedClass);
      setSections(selectedClassData ? selectedClassData.Section : []);
      setNewSectionsArray(selectedClassData ? selectedClassData.Section : []);
      setSelectClassError(""); // Clear error when a class is selected
    } else {
      setSections([]);
      setNewSectionsArray([]);
    }
  }, [selectedClass, classes]);

  const handleAddSection = () => {
    setNewSectionsArray((prev) => [...prev, '']);
  };

  const handleInputChange = (index, value) => {
    const newInputs = [...newSectionsArray];
    newInputs[index] = value;
    setNewSectionsArray(newInputs);
  };

  const handleEditSection = (cls) => {
    setSelectedClass(cls.ClassId)
    setNewSectionsArray(cls.Section)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedClass) {
      setSelectClassError("Please select a class.");
      return;
    }

    const updatedSections = [...newSectionsArray];
    const newSectionData = { Section: updatedSections };

    try {
      await axios.put(`https://api.edspride.in/class/update/${selectedClass}`, newSectionData);

      // Reset state
      setSelectedClass("");
      setSections([]);
      setNewSectionsArray([]);
      fetchClasses();
    } catch (error) {
      console.error("Error updating sections:", error);
    }
  };

  return (
    <>

      <MainDashboard>
        <FormContainer>
          <Title>Add Section</Title>
          <Form onSubmit={handleSubmit}>
            <Section>
              <Heading>Details</Heading>
            </Section>
            <Main>
              <InputContainer>
                <Label>Select Class</Label>
                <Select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                >
                  <option value="">Select Class</option>
                  {classes.map((cls) => (
                    <option key={cls.ClassId} value={cls.ClassId}>
                      {cls.Class}
                    </option>
                  ))}
                </Select>
                {selectClassError && <ErrorMessage>{selectClassError}</ErrorMessage>}
              </InputContainer>

              <InputContainer>
                <Label>Add Section</Label>
                {newSectionsArray.map((input, index) => (
                  <Input
                    type="text"
                    value={input}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                  />
                ))}
                <SubmitButton type="button" onClick={handleAddSection}>
                  Add Section
                </SubmitButton>
              </InputContainer>
            </Main>
            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
              <SubmitButton type="submit">Save Sections</SubmitButton>
            </div>
          </Form>
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <Th>Class Id</Th>
                  <Th>Class Name</Th>
                  <Th>Sections</Th>
                  <Th>Action</Th>
                </tr>
              </thead>
              <tbody>
                {classes.map((cls) => (
                  <tr key={cls.ClassId}>
                    <Td>{cls.ClassId}</Td>
                    <Td>{cls.Class}</Td>
                    <Td>{cls.Section.join(", ") || "N/A"}</Td>
                    <Td>
                      <div style={{display:"flex", gap:"0.5rem"}}>
                      <EditButton onClick={() => handleEditSection(cls)}>
                        Edit
                        <Edit size={18} />
                      </EditButton>
                      <DeleteButton>
                        <Trash2 size={18} />
                      </DeleteButton>
                      </div>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableContainer>
        </FormContainer>
      </MainDashboard>

    </>
  );
};

export default AddSection;
