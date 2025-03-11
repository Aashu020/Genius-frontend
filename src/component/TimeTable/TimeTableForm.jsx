import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  flex: 1;
  height: calc(100vh - 100px);
  overflow-y: auto;
  padding: 20px;
`;

const Title = styled.h2`
    text-align: center;
`;

const Input = styled.input`
    display: block;
    width: 80%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const Select = styled.select`
    display: block;
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const Button = styled.button`
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    background-color: #28a745;
    color: white;
    cursor: pointer;
    width: 100%;
    margin-top: 10px;

    &:hover {
        background-color: #218838;
    }
`;

const TimeTable = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 10px;
    margin-top: 20px;
`;

const TimeTableHeader = styled.div`
    font-weight: bold;
    background-color: #f2f2f2;
    text-align: center;
    padding: 10px;
    border: 1px solid #ddd;
`;

const TimeTableCell = styled.div`
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
    display: flex;
    flex-direction: column;
`;

const SubjectInput = styled(Input)`
    margin: 5px 0;
`;

const TimeTableForm = () => {
    const [classID, setClassID] = useState('');
    const [className, setClassName] = useState('');
    const [section, setSection] = useState('');
    const [classes, setClasses] = useState([]);
    const [sections, setSections] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [teachers, setTeachers] = useState([]);  // All teacher data
    const [filteredTeachers, setFilteredTeachers] = useState([]);  // Teachers filtered by class, section, and subject
    const [teacherDetails, setTeacherDetails] = useState({});
    const timetableDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const [periods, setPeriods] = useState([]); // Period data

    useEffect(() => {
        const fetchData = async () => {
            try {
                const classResponse = await fetch('https://api.edspride.in/class/all');
                const classData = await classResponse.json();
                setClasses(classData);

                const periodResponse = await fetch('https://api.edspride.in/period/all');
                const periodData = await periodResponse.json();
                setPeriods(periodData);

                const teacherResponse = await fetch('https://api.edspride.in/staff/all');
                const teacherData = await teacherResponse.json();
                setTeachers(teacherData); // Store all teacher data
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        // Filter teachers based on Class, Section, and Subject
        const filtered = teachers?.filter(teacher => {
            // Check if the teacher is assigned to the selected subject
            const hasSubject = teacher?.Assign?.some(assign => assign?.Subject?.trim() === selectedSubject?.trim());

            // Check if the teacher is assigned to the selected class and section
            const hasClassAndSection = teacher?.Assign?.some(assign =>
                assign.Class === className && assign.Section === section
            );

            return hasSubject && hasClassAndSection;  // Only include teachers that match both class/section and subject
        });

        setFilteredTeachers(filtered);  // Store filtered teachers in state
    }, [selectedSubject, className, section, teachers]);  // This effect runs when any of these change


    const handleClassChange = async (e) => {
        const selectedClass = classes.find(c => c.ClassId === e.target.value);
        setClassID(selectedClass.ClassId);
        setClassName(selectedClass.Class);
        setSections(selectedClass.Section);
        setSection('');
        setSubjects([]); // Reset subjects
        setSelectedSubject(''); // Reset selected subject

        try {
            const subjectResponse = await fetch(`https://api.edspride.in/class/get/${selectedClass.ClassId}`);
            const subjectData = await subjectResponse.json();
            setSubjects(subjectData.Subjects); // Set subjects for the selected class
        } catch (error) {
            console.error('Error fetching subjects:', error);
        }
    };

    const handleSectionChange = (e) => {
        setSection(e.target.value);
    };

    const handleSubjectChange = (period, day, e) => {
        const subject = e.target.value.trim(); // Trim subject selection value
        setSelectedSubject(subject);
    
        setTeacherDetails(prev => {
            const updatedDay = { ...prev[day] };
            if (!updatedDay[period]) {
                updatedDay[period] = { subject: '', teacherId: '', teacherName: '' }; // Initialize period if not present
            }
            updatedDay[period].subject = subject;
    
            return { ...prev, [day]: updatedDay };
        });
    };
    
    const handleTeacherIdChange = (period, day, value) => {
        const selectedTeacher = filteredTeachers.find(teacher => teacher.EmployeeId === value);
    
        setTeacherDetails(prev => {
            const updatedDay = { ...prev[day] };
            if (!updatedDay[period]) {
                updatedDay[period] = { subject: '', teacherId: '', teacherName: '' }; // Initialize period if not present
            }
            updatedDay[period].teacherId = value;
            updatedDay[period].teacherName = selectedTeacher ? selectedTeacher.Name : '';
    
            return { ...prev, [day]: updatedDay };
        });
    };
    

    // Handler when Teacher Name is selected (This is optional since we already capture this in the Teacher ID selection)
    const handleTeacherNameChange = (period, day, value) => {
        setTeacherDetails(prev => {
            const updatedDay = { ...prev[day] };
            if (updatedDay[period]) {
                updatedDay[period].teacherName = value;
            }
            return { ...prev, [day]: updatedDay };
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Check if classID, section, or subject is selected, if not alert the user
        if (!classID || !section || !selectedSubject) {
            alert('Please select a class, section, and subject.');
            return;
        }
    
        const timetableEntry = {
            ClassId: classID,
            Class: className,
            Section: section,
            Days: []
        };
    
        const groupedDays = {};
    
        // Loop over all days of the week (Monday to Saturday)
        timetableDays.forEach(day => {
            const lectures = periods.map(period => {
                const periodTitle = period.Title;
    
                // Initialize the default values for subject, teacherId, and teacherName
                let subject = "";
                let teacherId = "";
                let teacherName = "";

                console.log(teacherDetails)
                console.log(teacherDetails[day])
                console.log(periodTitle)
    
                // Check if we have teacherDetails for this day and period
                const periodData = teacherDetails[day]?.[periodTitle];
    
                // If periodData is available, update subject, teacherId, and teacherName
                if (periodData) {
                    subject = periodData.subject || "";
                    teacherId = periodData.teacherId || "";
                    teacherName = periodData.teacherName || "";
                }
    
                // Return the data for the period (subject and teacher info, even if empty)
                return {
                    Period: periodTitle,
                    Subject: subject,
                    TeacherId: teacherId,
                    TeacherName: teacherName
                };
            });
    
            // Save the lectures for this day (Monday, Tuesday, etc.)
            groupedDays[day] = { Day: day, Lectures: lectures };
        });
    
        // Add all days data to timetableEntry
        timetableEntry.Days = Object.values(groupedDays);
    
        console.log("Timetable Entry:", timetableEntry);  // Log the data to check the format
    
        try {
            // Send the timetable data to the backend
            const response = await fetch('https://api.edspride.in/timetable/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(timetableEntry)
            });
    
            // Check the response and alert accordingly
            if (response.ok) {
                alert('Timetable saved successfully!');
            } else {
                alert('Failed to save timetable.');
            }
        } catch (error) {
            console.error('Error saving timetable:', error);
            alert('An error occurred while saving the timetable.');
        }
    
        // Reset form state after submission
        setClassID('');
        setClassName('');
        setSection('');
        setTeacherDetails({});
    };

    return (
        <Container>
            <Title>Create Time Table</Title>
            <form onSubmit={handleSubmit}>
                <Select value={classID} onChange={handleClassChange}>
                    <option value="">Select Class</option>
                    {classes.map(c => (
                        <option key={c.ClassId} value={c.ClassId}>{c.Class}</option>
                    ))}
                </Select>

                <Select value={section} onChange={handleSectionChange}>
                    <option value="">Select Section</option>
                    {sections.map(s => (
                        <option key={s} value={s}>{s}</option>
                    ))}
                </Select>

                <Button type="submit">Submit Time Table</Button>
            </form>

            <Title>Current Timetable</Title>
            <TimeTable>
                <TimeTableHeader key="empty-header" />
                {timetableDays.map(day => (
                    <TimeTableHeader key={`day-${day}`}>{day}</TimeTableHeader>
                ))}
                {periods.map((period, index) => (
                    <React.Fragment key={`period-${index}`}>
                        <TimeTableHeader>
                            <Input
                                type="text"
                                value={period.Title.trim()}
                                placeholder="Period Name"
                                readOnly
                            />
                        </TimeTableHeader>
                        {timetableDays.map(day => (
                            <TimeTableCell key={`${day}-${index}`}>
                                {period.Title.trim().includes('Period') ? (
                                    <>
                                        <Select
                                            value={teacherDetails[day]?.[period.Title]?.subject || ''}
                                            onChange={(e) => handleSubjectChange(period.Title, day, e)}
                                        >
                                            <option value="">Select Subject</option>
                                            {subjects.map((subject) => (
                                                <option key={subject._id} value={subject.Subject.trim()}>
                                                    {subject.Subject.trim()}
                                                </option>
                                            ))}
                                        </Select>

                                        <Select
                                            value={teacherDetails[day]?.[period.Title]?.teacherId || ''}
                                            onChange={(e) => handleTeacherIdChange(period.Title, day, e.target.value)}
                                        >
                                            <option value="">Select Teacher</option>
                                            {filteredTeachers.map((teacher) => (
                                                <option key={teacher.EmployeeId} value={teacher.EmployeeId}>
                                                    {teacher.Name}
                                                </option>
                                            ))}
                                        </Select>

                                        {/* <SubjectInput
                                            type="text"
                                            placeholder="Teacher ID"
                                            value={teacherDetails[day]?.[period.Title]?.teacherId || ''}
                                            onChange={(e) => handleTeacherIdChange(period.Title, day, e.target.value)}
                                        />
                                        <SubjectInput
                                            type="text"
                                            placeholder="Teacher Name"
                                            value={teacherDetails[day]?.[period.Title]?.teacherName || ''}
                                            onChange={(e) => handleTeacherNameChange(period.Title, day, e.target.value)}
                                        /> */}
                                    </>
                                ) : (
                                    <div>{period.Title}</div>
                                )}
                            </TimeTableCell>
                        ))}
                    </React.Fragment>
                ))}
            </TimeTable>
        </Container>
    );
};

export default TimeTableForm;
