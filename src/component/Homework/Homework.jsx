import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Edit, Trash2 } from "lucide-react";
import { 
  MainDashboard1,Title,Form,Heading,Section,Main,InputContainer,Label,Input ,Select,SubmitButton,HomeworkListContainer, HomeworkListTitle, Table, Th, Td, Td1, EditButton, DeleteButton, ViewButton, ConfirmationModal,  ModalContent, ConfirmButton, DetailModalContent 
} from "./HomeworkStyle.jsx";

const HomeworkTypeDropdown = ({ formData, handleChange, errors }) => {
  const [homeworkTypes, setHomeworkTypes] = useState([]);

  useEffect(() => {
    const fetchHomeworkTypes = async () => {
      try {
        const response = await axios.get('https://api.edspride.in/homeworktype/all');
        setHomeworkTypes(response.data);
      } catch (error) {
        console.error('Error fetching homework types:', error);
      }
    };

    fetchHomeworkTypes();
  }, []);

  return (
    <InputContainer>
      <Label>Homework Type</Label>
      <Select
        name="Type"
        value={formData.Type}
        onChange={handleChange}
      >
        <option value="">Select Type</option>
        {homeworkTypes.map((type) => (
          <option key={type.id} value={type.id}>{type.HomeworkTypeTitle}</option>
        ))}
      </Select>
      {errors.Type && (
        <div style={{ color: "red", marginTop: "5px" }}>
          {errors.Type}
        </div>
      )}
    </InputContainer>
  );
};

// const HomeworkList = ({ homeworkList, onEdit, onDelete }) => {
//   return (
//     <HomeworkListContainer>
//       <HomeworkListTitle>Homework List</HomeworkListTitle>
//       {homeworkList.length > 0 ? (
//         <Table>
//           <thead>
//             <tr>
//               <Th>Title</Th>
//               <Th>Details</Th>
//               <Th>Due Date</Th>
//               <Th>Class</Th>
//               <Th>Section</Th>
//               <Th>Subject</Th>
//               <Th>Status</Th>
//               <Th>Actions</Th>
//             </tr>
//           </thead>
//           <tbody>
//             {homeworkList.map((homework) => (
//               <tr key={homework._id}>
//                 <Td>{homework.Title}</Td>
//                 <Td>{homework.Details}</Td>
//                 <Td>{homework.Date}</Td>
//                 <Td>{homework.Class}</Td>
//                 <Td>{homework.Section}</Td>
//                 <Td>{homework.Subject}</Td>
//                 <Td>{homework.Status}</Td>
//                 <Td1>
//                   <DeleteButton onClick={() => onDelete(homework._id)}><Trash2 size={18} /></DeleteButton>
//                 </Td1>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       ) : (
//         <NoHomeworkMessage>No homework found for this class and section.</NoHomeworkMessage>
//       )}
//     </HomeworkListContainer>
//   );
// };

const Homework = () => {
  const [formData, setFormData] = useState({
    Type: "",
    Date: "",
    Class: "",
    Section: "",
    Subject: "",
    Chapter: "",
    Title: "",
    Details: "",
    image: null,
  });
  const [errors, setErrors] = useState({});
  const [classId, setClassId] = useState({});
  const [chapters, setChapters] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [homeworkList, setHomeworkList] = useState([]);
  const [homeworkTypes, setHomeworkTypes] = useState([]);

  useEffect(() => {
    // Fetch homework types
    const fetchHomeworkTypes = async () => {
      try {
        const response = await axios.get('https://api.edspride.in/homeworktype/all');
        setHomeworkTypes(response.data);
      } catch (error) {
        console.error('Error fetching homework types:', error);
      }
    };

    // Fetch available classes
    const fetchClasses = async () => {
      try {
        const response = await axios.get('https://api.edspride.in/class/all');
        setClasses(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };

    fetchHomeworkTypes();
    fetchClasses();
  }, []);

  useEffect(() => {
    const fetchSections = async () => {
      if (formData.Class) {
        try {
          const response = await axios.get(`https://api.edspride.in/class/get/${classId}`);
          setSections(response.data.Section || []);
          setSubjects(response.data.Subjects)
        } catch (error) {
          console.error('Error fetching sections:', error);
        }
      }
    };

    fetchSections();
  }, [classId]);

  // useEffect(() => {
  //   const fetchSubjects = async () => {
  //     if (formData.Class && formData.Section) {
  //       try {
  //         const response = await axios.get(`https://api.edspride.in/subjects/get/${formData.Class}-${formData.Section}`);
  //         setSubjects(response.data);
  //       } catch (error) {
  //         console.error('Error fetching subjects:', error);
  //       }
  //     }
  //   };

  //   fetchSubjects();
  // }, [formData.Class, formData.Section]);

  // useEffect(() => {
  //   const fetchChapters = async () => {
  //     if (formData.Subject) {
  //       try {
  //         const response = await axios.get(`https://api.edspride.in/chapters/${formData.Subject}`);
  //         setChapters(response.data);
  //       } catch (error) {
  //         console.error('Error fetching chapters:', error);
  //       }
  //     }
  //   };

  //   fetchChapters();
  // }, [formData.Subject]);

  const fetchHomework = async () => {
    if (formData.Class && formData.Section && formData.Subject) {
      try {
        const response = await axios.get(`https://api.edspride.in/homework/get/${formData.Class}-${formData.Section}`);
        const homeworkList = response.data;
        console.log(homeworkList)

        const assignedChapters = homeworkList
          .filter(homework => homework.Subject === formData.Subject)
          .map(homework => homework.Chapter);

        const availableChapters = chapters.filter(chapter => !assignedChapters.includes(chapter.Title));

        setChapters(availableChapters);
        setHomeworkList(homeworkList);
      } catch (error) {
        console.error("Error fetching homework:", error);
      }
    }
  };

  useEffect(() => {
    if (formData.Class && formData.Section && formData.Subject) {
      fetchHomework();
    }
  }, [formData.Class, formData.Section, formData.Subject]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      // Handle file input change
      setFormData({ ...formData, image: files[0] });  // Save file to state
    } else {
      setFormData({ ...formData, [name]: value });
    }

    // For Class select, update classId
    if (name === "Class") {
      const classItem = classes.find((val) => val.Class === value);
      setClassId(classItem.ClassId);
    }

    // Handle other dependent dropdowns
    if (name === "Subject") {
      const selectedSubject = subjects.find(subject => subject.Subject === value);
      if (selectedSubject && selectedSubject.Syllabus.length > 0) {
        setChapters(selectedSubject.Syllabus);
      } else {
        setChapters([]);
      }
    }
  };

  const handleSubmit = async (e, status) => {
    e.preventDefault();
    const homeworkData = new FormData();

    // Append all form fields to FormData
    Object.keys(formData).forEach(key => {
      if (key === 'image' && formData.image) {
        homeworkData.append('image', formData.image);
      } else {
        homeworkData.append(key, formData[key]);
      }
    });

    homeworkData.append('Status', status);

    try {
      await axios.post("https://api.edspride.in/homework/add", homeworkData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      console.log("Homework submitted successfully");
      toast.success("Homework submitted successfully");

      // Reset form fields after successful submission
      setFormData({
        Type: "",
        Date: "",
        Class: "",
        Section: "",
        Subject: "",
        Chapter: "",
        Title: "",
        Details: "",
        image: null,  // Clear image as well
      });

      // Optionally clear dependent fields like chapters or sections
      setChapters([]);
      setClassId({});
      setSections([]);
      setSubjects([]);
    } catch (error) {
      console.error("Error submitting homework:", error);
      toast.error("Error submitting homework");
    }
  };

  const handleDeleteHomework = async (homeworkId) => {
    try {
      await axios.delete(`https://api.edspride.in/homework/delete/${homeworkId}`);
      toast.success("Homework deleted successfully!");
      fetchHomework(); // Refresh homework list
    } catch (error) {
      toast.error("Error deleting homework");
    }
  };

  return (
    <MainDashboard1>
      <Title>Homework Management</Title>
      <Form onSubmit={handleSubmit}>
        <Heading>Create New Homework</Heading>
        {/* <Section> */}
        <Main>
          <InputContainer>
            <Label>Date</Label>
            <Input
              type="date"
              name="Date"
              value={formData.Date}
              onChange={handleChange}
              required
            />
            {errors.Date && (
              <div style={{ color: "red", marginTop: "5px" }}>
                {errors.Date}
              </div>
            )}
          </InputContainer>
          <InputContainer>
            <Label>Class</Label>
            <Select
              name="Class"
              value={formData.Class}
              onChange={handleChange}
            >
              <option value="">Select Class</option>
              {classes.map((classItem) => (
                <option key={classItem._id} value={classItem.Class}>
                  {classItem.Class}
                </option>
              ))}
            </Select>
          </InputContainer>

          <InputContainer>
            <Label>Section</Label>
            <Select
              name="Section"
              value={formData.Section}
              onChange={handleChange}
            >
              <option value="">Select Section</option>
              {sections.map((section) => (
                <option key={section._id} value={section}>
                  {section}
                </option>
              ))}
            </Select>
          </InputContainer>

          <InputContainer>
            <Label>Subject</Label>
            <Select
              name="Subject"
              value={formData.Subject}
              onChange={handleChange}
            >
              <option value="">Select Subject</option>
              {subjects.map((subject) => (
                <option key={subject._id} value={subject.Subject}>
                  {subject.Subject}
                </option>
              ))}
            </Select>
          </InputContainer>
          <InputContainer>
            <Label>Upload Image</Label>
            <Input
              type="file"
              name="image" // Make sure to set the name for the file input
              // accept="image/*" // Optional: restrict to image types
              onChange={handleChange}
            />
            {errors.Title && (
              <div style={{ color: "red", marginTop: "5px" }}>
                {errors.Title}
              </div>
            )}
          </InputContainer>
        </Main>
        {/* </Section> */}
        <Main>
          <HomeworkTypeDropdown formData={formData} handleChange={handleChange} errors={errors} />

          <InputContainer>
            <Label>Chapter</Label>
            <Select
              name="Chapter"
              value={formData.Chapter}
              onChange={handleChange}
              required
            >
              <option value="">Select Chapter</option>
              {chapters.map((chapter) => (
                <option key={chapter._id} value={chapter.Title}>
                  {chapter.Title}
                </option>
              ))}
            </Select>
          </InputContainer>

          <InputContainer>
            <Label>Homework Title</Label>
            <Input
              type="text"
              name="Title"
              value={formData.Title}
              onChange={handleChange}
              required
            />
          </InputContainer>

          <InputContainer>
            <Label>Details</Label>
            <Input
              type="text"
              name="Details"
              value={formData.Details}
              onChange={handleChange}
              required
            />
          </InputContainer>
        </Main>

        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          <SubmitButton type="button" onClick={(e) => handleSubmit(e, "Publish")}>Publish</SubmitButton>
          <SubmitButton type="button" onClick={(e) => handleSubmit(e, "Draft")}>Save AS Draft</SubmitButton>
        </div>
      </Form>

      {/* <HomeworkList
        homeworkList={homeworkList}
        onEdit={() => { }}
        onDelete={handleDeleteHomework}
      /> */}

      <ToastContainer />
    </MainDashboard1>
  );
};

export default Homework;
