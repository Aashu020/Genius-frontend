import React, { useState, useEffect } from 'react';

const CLASSES_API_URL = 'https://api.edspride.in/class/all';
const HOMEWORK_API_URL = 'https://api.edspride.in/homework/all';

const App = () => {
  const [classesData, setClassesData] = useState([]);
  const [homeworkData, setHomeworkData] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [progress, setProgress] = useState({});

  // Fetching classes and subjects data
  useEffect(() => {
    const fetchClassesData = async () => {
      try {
        const response = await fetch(CLASSES_API_URL);
        const data = await response.json();
        setClassesData(data); // Set the classes data
      } catch (error) {
        console.error('Error fetching classes data:', error);
      }
    };

    fetchClassesData();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Fetching homework data
  useEffect(() => {
    const fetchHomeworkData = async () => {
      try {
        const response = await fetch(HOMEWORK_API_URL);
        const data = await response.json();
        setHomeworkData(data); // Set the homework data
      } catch (error) {
        console.error('Error fetching homework data:', error);
      }
    };

    fetchHomeworkData();
  }, []); // Fetch homework data on component mount

  // Handle class selection change
  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
    setSelectedSection(''); // Reset section when class changes
  };

  // Handle section selection change
  const handleSectionChange = (e) => {
    setSelectedSection(e.target.value);
  };

  // Calculate progress based on homework and syllabus length (chapters)
  const calculateProgress = (classId, section) => {
    const classData = classesData.find((cls) => cls.ClassId === classId);
    if (!classData) return {};

    const assignedHomework = homeworkData.filter(
      (homework) => homework.Class === classId && homework.Section === section
    );

    let progressData = {};

    classData.Subjects.forEach((subject) => {
      const subjectProgress = { total: 0, completed: 0 };

      // Calculate total chapters in the syllabus for each subject
      subject.Syllabus.forEach((chapter) => {
        subjectProgress.total += 1; // Increment for each chapter

        // Check if homework is assigned for this chapter
        assignedHomework.forEach((homework) => {
          if (homework.Chapter === chapter.Title) {
            subjectProgress.completed += 1; // Increment if homework is assigned for the chapter
          }
        });
      });

      // Calculate progress as percentage
      if (subjectProgress.total > 0) {
        progressData[subject.Subject] = (subjectProgress.completed / subjectProgress.total) * 100;
      } else {
        progressData[subject.Subject] = 0;
      }
    });

    setProgress(progressData);
  };

  // Generate class dropdown options
  const classOptions = classesData.map((cls) => (
    <option key={cls.ClassId} value={cls.ClassId}>
      {cls.Class}
    </option>
  ));

  // Generate section dropdown options for the selected class
  const sectionOptions =
    selectedClass &&
    classesData
      .find((cls) => cls.ClassId === selectedClass)
      ?.Section.map((sec) => (
        <option key={sec} value={sec}>
          {sec}
        </option>
      ));

  // Recalculate progress when class or section changes
  useEffect(() => {
    if (selectedClass && selectedSection) {
      calculateProgress(selectedClass, selectedSection);
    }
  }, [selectedClass, selectedSection]);

  return (
    <div>
      <h1>Homework Progress Tracker</h1>

      {/* Class Dropdown */}
      <select onChange={handleClassChange} value={selectedClass}>
        <option value="">Select Class</option>
        {classOptions}
      </select>

      {/* Section Dropdown */}
      {selectedClass && (
        <select onChange={handleSectionChange} value={selectedSection}>
          <option value="">Select Section</option>
          {sectionOptions}
        </select>
      )}

      {/* Progress Bars */}
      {selectedClass && selectedSection && (
        <div>
          <h2>Progress for {selectedClass} - {selectedSection}</h2>
          {classesData
            .find((cls) => cls.ClassId === selectedClass)
            ?.Subjects.map((subject) => {
              const progressPercentage = progress[subject.Subject] || 0;
              return (
                <div key={subject.Subject} style={{ marginBottom: '20px' }}>
                  <h3>{subject.Subject}</h3>
                  <div
                    style={{
                      width: '100%',
                      backgroundColor: '#e0e0e0',
                      borderRadius: '5px',
                      height: '20px',
                    }}
                  >
                    <div
                      style={{
                        width: `${progressPercentage}%`,
                        backgroundColor: '#4caf50',
                        height: '100%',
                        borderRadius: '5px',
                      }}
                    ></div>
                  </div>
                  <p>{progressPercentage.toFixed(2)}% completed</p>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default App;
