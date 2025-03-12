import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { Edit, Trash2 } from "lucide-react";
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
  Select,
  SubmitButton,
  TableContainer,
  Table,
  Th,
  Td,
  EditButton,
  DeleteButton,
  ErrorMessage,
} from "./SchoolSetup2Style";

const AddSection = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [sections, setSections] = useState([]);
  const [newSectionsArray, setNewSectionsArray] = useState([]);
  const [selectClassError, setSelectClassError] = useState("");

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
      const selectedClassData = classes.find((cls) => cls.ClassId === selectedClass);
      setSections(selectedClassData ? selectedClassData.Section : []);
      setNewSectionsArray(selectedClassData ? selectedClassData.Section : []);
      setSelectClassError("");
    } else {
      setSections([]);
      setNewSectionsArray([]);
    }
  }, [selectedClass, classes]);

  const handleAddSection = () => {
    setNewSectionsArray((prev) => [...prev, ""]);
  };

  const handleInputChange = (index, value) => {
    const newInputs = [...newSectionsArray];
    newInputs[index] = value;
    setNewSectionsArray(newInputs);
  };

  const handleEditSection = (cls) => {
    setSelectedClass(cls.ClassId);
    setNewSectionsArray(cls.Section);
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
      setSelectedClass("");
      setSections([]);
      setNewSectionsArray([]);
      fetchClasses();
    } catch (error) {
      console.error("Error updating sections:", error);
    }
  };

  return (
    <Container>
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
                    key={index}
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
                      <div style={{ display: "flex", gap: "0.5rem" }}>
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
    </Container>
  );
};

export default AddSection;