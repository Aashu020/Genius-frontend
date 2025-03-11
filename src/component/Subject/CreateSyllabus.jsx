import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

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

const Main = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(2, 1fr);
`;

const Main1 = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr;
  margin-top: 50px;
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
  z-index: 1;
`;

const Button = styled.button`
  background: linear-gradient(270deg, #222d78 0%, #7130e4 100%);
  padding: 12px 20px;
  margin: 10px;
  color: white;
  font-size: 20px;
  border: none;
  border-radius: 50%;
  margin-left: 20px;
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
  margin-bottom: 10px;
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

const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;




const Paper = ({ selectedClass, selectedSubject, chapters }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedClass && selectedSubject) {
        try {
          const response = await axios.get(`https://api.edspride.in/class/get/${selectedClass}`);
          setData(response.data); // Set the fetched data
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [selectedClass, selectedSubject]); // Re-fetch data when class or subject changes

  if (loading) {
    return <div></div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  const subject = data.Subjects.find(sub => sub.Subject === selectedSubject);

  if (!subject) {
    return <div>Selected subject not found.</div>; // Handle case where subject is not found
  }

  // Generate the HTML content for the iframe
  const iframeContent = `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            width: 90vw;
            margin: 0;
            padding: 0;
            background-color: #f3f3f3;
          }
          .content {
            width: 80%;
            border: 1px solid #ccc;
            background: white;
            padding: 20px;
            box-sizing: border-box;
          }
          h1 {
            text-align: center;
          }
          h2, h3 {
            margin: 0;
          }
          p {
            margin-left: 20px;
          }
        </style>
      </head>
      <body>
        <div class="content">
          <h1>${data.Class}</h1>
          <h2>${subject.Subject}</h2>
          ${chapters
            .map(
              (chapter) => `
                <h3>${chapter.chapterName}</h3>
                ${chapter.topics
                  .map((topic) => `<p>${topic}</p>`)
                  .join("")}
              `
            )
            .join("")}
        </div>
      </body>
    </html>
  `;

  return (
    <div>
      <iframe
        style={{ width: "100%", height: "500px" }}
        srcDoc={iframeContent}
      />
    </div>
  );
};


const CreateSyllabus = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [chapters, setChapters] = useState([{ chapterName: "", topics: [""] }]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get("https://api.edspride.in/class/all");
        setClasses(response.data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };
    fetchClasses();
  }, []);

  useEffect(() => {
    const fetchSubjects = async () => {
      if (selectedClass) {
        try {
          const response = await axios.get(`https://api.edspride.in/class/get/${selectedClass}`);
          const selectedClassData = response.data;
          setSubjects(selectedClassData.Subjects || []);
        } catch (error) {
          console.error("Error fetching subjects:", error);
        }
      } else {
        setSubjects([]);
      }
    };
    fetchSubjects();
  }, [selectedClass]);

  useEffect(() => {
    const fetchExistingSyllabus = async () => {
      if (selectedClass && selectedSubject) {
        try {
          const response = await axios.get(`https://api.edspride.in/class/get/${selectedClass}`);
          const selectedClassData = response.data;
          const subject = selectedClassData.Subjects.find(sub => sub.Subject === selectedSubject);
          
          if (subject) {
            setChapters(subject.Syllabus.map(chapter => ({
              chapterName: chapter.Title,
              topics: chapter.Topics || [""],
            })));
          }
        } catch (error) {
          console.error("Error fetching syllabus:", error);
        }
      }
    };
    fetchExistingSyllabus();
  }, [selectedClass, selectedSubject]);

  const handleClassChange = (value) => {
    setSelectedClass(value);
    setSelectedSubject("");  // Reset subject when class changes
    setChapters([{ chapterName: "", topics: [""] }]);  // Reset chapters
    setErrors({});
  };

  const handleSubjectChange = (value) => {
    setSelectedSubject(value);
    setErrors({});
  };

  const handleTopicChange = (chapterIndex, topicIndex, value) => {
    const updatedChapters = [...chapters];
    updatedChapters[chapterIndex].topics[topicIndex] = value;
    setChapters(updatedChapters);
  };

  const addTopicInput = (chapterIndex) => {
    const updatedChapters = [...chapters];
    updatedChapters[chapterIndex].topics.push(""); // Add a new empty topic
    setChapters(updatedChapters);
  };

  const handleChapterChange = (index, value) => {
    const updatedChapters = [...chapters];
    updatedChapters[index].chapterName = value;
    setChapters(updatedChapters);
  };

  const addChapterField = () => {
    setChapters([...chapters, { chapterName: "", topics: [""] }]);
  };

  const removeChapter = (index) => {
    const updatedChapters = chapters.filter((_, chapterIndex) => chapterIndex !== index);
    setChapters(updatedChapters);
  };

  const removeTopic = (chapterIndex, topicIndex) => {
    const updatedChapters = [...chapters];
    updatedChapters[chapterIndex].topics = updatedChapters[chapterIndex].topics.filter(
      (_, tIndex) => tIndex !== topicIndex
    );
    setChapters(updatedChapters);
  };

  const addChapter = async () => {
    const subjectToUpdate = subjects.find((subject) => subject.Subject === selectedSubject);
    
    if (subjectToUpdate) {
      const updatedSyllabus = chapters.map((chapter) => ({
        Title: chapter.chapterName,
        Topics: chapter.topics.filter((topic) => topic), // Only keep non-empty topics
      }));

      try {
        await axios.put(`https://api.edspride.in/class/update/${selectedClass}`, {
          Subjects: subjects.map((subject) =>
            subject.Subject === selectedSubject ? { ...subject, Syllabus: updatedSyllabus } : subject
          ),
        });

        alert("Chapters updated successfully!");
        setChapters([{ chapterName: "", topics: [""] }]); // Reset chapters after update
        setErrors({});
      } catch (error) {
        console.error("Error updating syllabus:", error);
        alert("Error updating syllabus. Please try again.");
      }
    } else {
      alert("Selected subject not found.");
    }
  };

  return (
    <>
      <MainDashboard>
        <FormContainer>
          <Title>Create Syllabus</Title>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              addChapter();
            }}
          >
            <Main>
              <InputContainer>
                <Label>Select Class</Label>
                <Select
                  value={selectedClass}
                  onChange={(e) => handleClassChange(e.target.value)}
                >
                  <option value="">Select Class</option>
                  {classes.map((cls) => (
                    <option key={cls.ClassId} value={cls.ClassId}>
                      {cls.Class}
                    </option>
                  ))}
                </Select>
              </InputContainer>

              <InputContainer>
                <Label>Select Subject</Label>
                <Select
                  value={selectedSubject}
                  onChange={(e) => handleSubjectChange(e.target.value)}
                  disabled={!selectedClass}
                >
                  <option value="">Select Subject</option>
                  {subjects.map((subject) => (
                    <option key={subject.SubjectId} value={subject.Subject}>
                      {subject.Subject}
                    </option>
                  ))}
                </Select>
              </InputContainer>
            </Main>

            <Main1>
              {chapters.map((chapter, chapterIndex) => (
                <InputContainer key={chapterIndex}>
                  <Label>Chapter Name</Label>
                  <Input
                    type="text"
                    value={chapter.chapterName}
                    onChange={(e) => handleChapterChange(chapterIndex, e.target.value)}
                  />

                  {chapter.topics.map((topic, topicIndex) => (
                    <InputContainer style={{ display: "flex" }} key={topicIndex}>
                      <Label>Topic</Label>
                      <Input
                        type="text"
                        value={topic}
                        onChange={(e) => handleTopicChange(chapterIndex, topicIndex, e.target.value)}
                      />
                      <Button type="button" onClick={() => removeTopic(chapterIndex, topicIndex)}>
                        X
                      </Button>
                    </InputContainer>
                  ))}

                  <Button style={{ borderRadius: "30px" }} type="button" onClick={() => addTopicInput(chapterIndex)}>
                    Add Topic
                  </Button>
                  <Button style={{ borderRadius: "30px" }} type="button" onClick={() => removeChapter(chapterIndex)}>
                    Remove Chapter
                  </Button>
                </InputContainer>
              ))}
              <Button style={{ borderRadius: "30px" }} type="button" onClick={addChapterField}>
                Add Chapter
              </Button>
            </Main1>

            <SubmitButton type="submit">Save</SubmitButton>
          </Form>

          {/* Paper Component is used here to display live changes */}
          <Paper selectedClass={selectedClass} selectedSubject={selectedSubject} chapters={chapters} />
        </FormContainer>
      </MainDashboard>
    </>
  );
};

export default CreateSyllabus;