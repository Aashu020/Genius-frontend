import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Edit, Trash2, PlusCircle } from "lucide-react";

const ConfirmDialog = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
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

  @media (max-width: 480px) {
    font-size: 12px;
    height: 30px;
    width: 50%;
    margin-bottom: 30px;
    margin-top: 20px;
  }
`;

const Section = styled.div`
  display: flex;
  justify-content: space-between;
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

  @media (max-width: 1024px) {
    width: 80%;
  }

  @media (max-width: 480px) {
    height: 10px;
    width: 80%;
    font-size: 12px;
    padding: 12px 18px;
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

  @media (max-width: 767px) {
    width: 100%;
    font-size: 12px;
    padding: 5px;
  }
`;

const HomeworkTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 40px;
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
  width: 18%;
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

const DeleteButton = styled.div`
  background-color: red;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  width: 18%;
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

const DateSheet = () => {
  const [formData, setFormData] = useState({
    Exam: "",
    Date: "",
    Class: "",
    Subject: "",
    TypeOfExam: "",
  });

  const [exams, setExams] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [datesheetData, setDatesheetData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [currentIdToDelete, setCurrentIdToDelete] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get('https://api.edspride.in/exam/all');
        setExams(response.data);
      } catch (error) {
        console.error("Error fetching exams:", error);
        toast.error("Error fetching exams. Please try again.");
      }
    };

    const fetchClasses = async () => {
      try {
        const response = await axios.get('https://api.edspride.in/class/all');
        setClasses(response.data);
      } catch (error) {
        console.error("Error fetching classes:", error);
        toast.error("Error fetching classes. Please try again.");
      }
    };

    const fetchDateSheet = async () => {
      try {
        const response = await axios.get('https://api.edspride.in/datesheet/all');
        setDatesheetData(response.data);
      } catch (error) {
        console.error("Error fetching date sheet data:", error);
        toast.error("Error fetching date sheet data. Please try again.");
      }
    };

    fetchExams();
    fetchClasses();
    fetchDateSheet();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "Class") {
      const selectedClass = classes.find(cls => cls.Class === value);
      if (selectedClass) {
        setSubjects(selectedClass.Subjects);
      } else {
        setSubjects([]);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      try {
        const response = await axios.put(`https://api.edspride.in/datesheet/update/${editingId}`, formData);
        toast.success("Date sheet updated successfully!");
        setEditingId(null);
        setFormData({
          Exam: "",
          Date: "",
          Class: "",
          Subject: "",
          TypeOfExam: "",
        });
        fetchDateSheet();
      } catch (error) {
        console.error("Error updating date sheet:", error);
        toast.error("Error updating date sheet. Please try again.");
      }
    } else {
      try {
        const response = await axios.post('https://api.edspride.in/datesheet/add', formData);
        toast.success("Date sheet saved successfully!");
        setFormData({
          Exam: "",
          Date: "",
          Class: "",
          Subject: "",
          TypeOfExam: "",
        });
        fetchDateSheet();
      } catch (error) {
        console.error("Error saving date sheet:", error);
        toast.error("Error saving date sheet. Please try again.");
      }
    }
  };

  const handleDelete = async () => {
    if (currentIdToDelete) {
      try {
        await axios.delete(`https://api.edspride.in/datesheet/delete/${currentIdToDelete}`);
        setDatesheetData(datesheetData.filter(datesheet => datesheet._id !== currentIdToDelete));
        toast.success("Date sheet deleted successfully!");
        setShowConfirm(false);
        setCurrentIdToDelete(null);
      } catch (error) {
        console.error("Error deleting date sheet:", error);
        toast.error("Error deleting date sheet. Please try again.");
      }
    }
  };

  const handleEdit = (id) => {
    const selectedData = datesheetData.find(datesheet => datesheet._id === id);
    if (selectedData) {
      setFormData({
        Exam: selectedData.Exam,
        Date: selectedData.Date,
        Class: selectedData.Class,
        Subject: selectedData.Subject,
        TypeOfExam: selectedData.TypeOfExam,
      });
      setEditingId(id);
    }
  };

  const handleDeleteConfirm = (id) => {
    setShowConfirm(true);
    setCurrentIdToDelete(id);
  };

  return (
    <>
      <MainDashboard>
        <FormContainer>
          <Title>{editingId ? "Edit Date Sheet" : "Add Date Sheet"}</Title>
          <Form onSubmit={handleSubmit}>
            <Section>
              <Heading>Details</Heading>
            </Section>
            <Main>
              <InputContainer>
                <Label>Select Exam</Label>
                <Select name="Exam" value={formData.Exam} onChange={handleChange} required>
                  <option value="">Select Exam</option>
                  {exams.map((exam) => (
                    <option key={exam._id} value={exam.ExamName}>
                      {exam.ExamName}
                    </option>
                  ))}
                </Select>
              </InputContainer>

              <InputContainer>
                <Label>Date</Label>
                <Input type="date" name="Date" value={formData.Date} onChange={handleChange} required />
              </InputContainer>

              <InputContainer>
                <Label>Class</Label>
                <Select name="Class" value={formData.Class} onChange={handleChange} required>
                  <option value="">Select Class</option>
                  {classes.map((cls) => (
                    <option key={cls._id} value={cls.Class}>
                      {cls.Class}
                    </option>
                  ))}
                </Select>
              </InputContainer>

              <InputContainer>
                <Label>Subject</Label>
                <Select name="Subject" value={formData.Subject} onChange={handleChange} required>
                  <option value="">Select Subject</option>
                  {subjects.map((subject) => (
                    <option key={subject._id} value={subject.Subject}>
                      {subject.Subject}
                    </option>
                  ))}
                </Select>
              </InputContainer>

              <InputContainer>
                <Label>Written/Oral</Label>
                <Select name="TypeOfExam" value={formData.TypeOfExam} onChange={handleChange} required>
                  <option value="">Select</option>
                  <option value="Written">Written</option>
                  <option value="Oral">Oral</option>
                  <option value="Written/Oral">Written/Oral</option>
                </Select>
              </InputContainer>
            </Main>
            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
              <SubmitButton type="submit">{editingId ? "Update" : "Save"}</SubmitButton>
            </div>
          </Form>
        </FormContainer>

        {/* Date Sheet Table */}
        <HomeworkTable>
          <thead>
            <tr>
              <Th>Exam</Th>
              <Th>Date</Th>
              <Th>Class</Th>
              <Th>Subject</Th>
              <Th>Type of Exam</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {datesheetData.map((datesheet) => (
              <tr key={datesheet._id}>
                <Td>{datesheet.Exam}</Td>
                <Td>{datesheet.Date.split("-").reverse().join("-")}</Td>
                <Td>{datesheet.Class}</Td>
                <Td>{datesheet.Subject}</Td>
                <Td>{datesheet.TypeOfExam}</Td>
                <Td1>
                  <EditButton onClick={() => handleEdit(datesheet._id)}>< Edit size={18}/></EditButton>
                  <DeleteButton onClick={() => handleDeleteConfirm(datesheet._id)}><Trash2 size={18} /></DeleteButton>
                </Td1>
              </tr>
            ))}
          </tbody>
        </HomeworkTable>
      </MainDashboard>

      {showConfirm && (
        <>
          <Overlay onClick={() => setShowConfirm(false)} />
          
          <ConfirmationModal>
            <ModalContent>
              <h3>Are you sure you want to delete this date sheet?</h3>
              <ConfirmButton className="yes" onClick={handleDelete}>Yes</ConfirmButton>
              <ConfirmButton className="no" onClick={() => setShowConfirm(false)}>No</ConfirmButton>
            </ModalContent>
          </ConfirmationModal>
        </>
      )}

      <ToastContainer />
    </>
  );
};

export default DateSheet;