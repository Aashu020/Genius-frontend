import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Edit, Trash2, PlusCircle } from "lucide-react";
import {
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
  HomeworkTable,
  Th,
  Td,
  Td1,
  EditButton,
  DeleteButton,
  ConfirmationModal,
  ModalContent,
  ConfirmButton,
  Overlay,
  ConfirmDialog,
} from "./SchoolSetup2Style";

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
        const response = await axios.get("https://api.edspride.in/exam/all");
        setExams(response.data);
      } catch (error) {
        console.error("Error fetching exams:", error);
        toast.error("Error fetching exams. Please try again.");
      }
    };

    const fetchClasses = async () => {
      try {
        const response = await axios.get("https://api.edspride.in/class/all");
        setClasses(response.data);
      } catch (error) {
        console.error("Error fetching classes:", error);
        toast.error("Error fetching classes. Please try again.");
      }
    };

    const fetchDateSheet = async () => {
      try {
        const response = await axios.get("https://api.edspride.in/datesheet/all");
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
      const selectedClass = classes.find((cls) => cls.Class === value);
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
        await axios.put(`https://api.edspride.in/datesheet/update/${editingId}`, formData);
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
        await axios.post("https://api.edspride.in/datesheet/add", formData);
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

  const fetchDateSheet = async () => {
    try {
      const response = await axios.get("https://api.edspride.in/datesheet/all");
      setDatesheetData(response.data);
    } catch (error) {
      console.error("Error fetching date sheet:", error);
    }
  };

  const handleDelete = async () => {
    if (currentIdToDelete) {
      try {
        await axios.delete(`https://api.edspride.in/datesheet/delete/${currentIdToDelete}`);
        setDatesheetData(datesheetData.filter((datesheet) => datesheet._id !== currentIdToDelete));
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
    const selectedData = datesheetData.find((datesheet) => datesheet._id === id);
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
                  <EditButton onClick={() => handleEdit(datesheet._id)}>
                    <Edit size={18} />
                  </EditButton>
                  <DeleteButton onClick={() => handleDeleteConfirm(datesheet._id)}>
                    <Trash2 size={18} />
                  </DeleteButton>
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
              <ConfirmButton className="yes" onClick={handleDelete}>
                Yes
              </ConfirmButton>
              <ConfirmButton className="no" onClick={() => setShowConfirm(false)}>
                No
              </ConfirmButton>
            </ModalContent>
          </ConfirmationModal>
        </>
      )}

      <ToastContainer />
    </>
  );
};

export default DateSheet;