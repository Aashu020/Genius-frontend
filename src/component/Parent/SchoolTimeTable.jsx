import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// Styled Components (no changes here) (no changes here)
const TableWrapper = styled.div`
  width: 100%;
  margin: auto;
  margin-top: 20px;
  @media (max-width: 480px) {
    width: 100%;
    margin: 0;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  h2 {
    font-size: 20px;
    margin-right: 20px;
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const DropdownWrapper = styled.div`
  display: flex;
  gap: 10px;

  select {
    padding: 4px;
    font-size: 16px;
    border-radius: 10px;
  }

  @media (max-width: 480px) {
    margin-top: 10px;
    select {
      font-size: 10px;
    }
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

const Table = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background-color: #fff;
  grid-gap: 2px;
  justify-content: center;
  align-items: center;
  width: 100%;
  @media (max-width: 480px) {
    grid-template-columns: repeat(7, 1fr);
    font-size: 6px;
  }
`;

const TableHeader = styled.div`
  background-color: #64b5f6;
  text-align: center;
  padding: 10px;
  font-weight: bold;
  border-radius: 5px;
  color: white;
font-size: 12px;
  @media (max-width: 480px) {
    padding: 5px;
  }
`;

const TableItem = styled.div`
  background-color: #e0e0e0;
  padding: 10px;
  text-align: center;
  border-radius: 5px;
  font-size: 12px;
  font-weight: bold;
  @media (max-width: 480px) {
    font-size: 8px;
    padding: 5px;
  }
`;

const TableItem1 = styled.div`
  background-color: #64b5f6;
  padding: 10px;
  text-align: center;
  border-radius: 5px;
  font-size: 10px;
  font-weight: bold;
  color: white;
  @media (max-width: 480px) {
    font-size: 8px;
    padding: 5px;
  }
`;

// TimeTable Component
const TimeTable = () => {
    const [selectedClass, setSelectedClass] = useState("");
    const [selectedSection, setSelectedSection] = useState("");
    const [timetable, setTimetable] = useState(null);
    const [student, setStudent] = useState(null);
    const [sections, setSections] = useState([]);
    const [periods, setPeriods] = useState([]);

    // Fetch classes on initial load
    useEffect(() => {
        const fetchClasses = async () => {
            try {
                var studentId = localStorage.getItem("Id")
                const response = await axios.get(`http://localhost:8007/student/get/${studentId}`);
                console.log('Classes Response:', response.data);
                setStudent(response.data);
            } catch (error) {
                console.error("Error fetching classes:", error);
            }
        };
        fetchClasses();
    }, []);

    useEffect(() => {
        // Fetch existing periods
        const fetchPeriods = async () => {
            try {
                const response = await axios.get("http://localhost:8007/period/all");
                setPeriods(response.data);
            } catch (err) {
                console.error("Error fetching periods:", err);
            }
        };
        fetchPeriods();
    }, []);
    
    useEffect(() => {
        const fetchTimetable = async () => {
            if (student) {
                try {
                    const classId = selectedClass + selectedSection; // Combine classId and section
                    const response = await axios.get(
                        `http://localhost:8007/timetable/get/${student.AdmissionInClass}/${student.Section}`
                    );
                    console.log('Timetable Response:', response.data);
                    setTimetable(response.data);
                } catch (error) {
                    console.error("Error fetching timetable:", error);
                }
            }
        };
        fetchTimetable();
    }, [student]);

    return (
        <TableWrapper>
            <HeaderWrapper>
                <h2>Time Table</h2>
            </HeaderWrapper>

            {timetable && (
                <Table>
                    <div style={{ gridColumn: 'span 7', textAlign: 'center', fontWeight: 'bold', padding: '10px', backgroundColor: '#e0e0e0' }}>
                        Periods
                    </div>
                    {timetable.Days?.[0]?.Lectures?.map((lecture, periodIndex) => (
                        <div key={periodIndex} style={{ display: 'contents' }}>
                            {!lecture.Period.includes('Period') && lecture.Period.trim() !== "" ? (
                                <TableItem1 style={{ gridColumn: 'span 7' }}>
                                    {lecture.Period.trim()}<p>{(periods.find(val => val.Title.trim() === lecture.Period.trim())).StartTime} - {(periods.find(val => val.Title.trim() === lecture.Period.trim())).EndTime}</p>
                                </TableItem1>
                            ) : (
                                <>
                                    <TableHeader>{lecture.Period}<p>{(periods.find(val => val.Title.trim() === lecture.Period.trim())).StartTime} - {(periods.find(val => val.Title.trim() === lecture.Period.trim())).EndTime}</p></TableHeader>
                                    {timetable.Days.map((dayData, dayIndex) => {
                                        const currentLecture = dayData.Lectures[periodIndex] || {};
                                        return (
                                            <TableItem key={dayIndex}>
                                                <div>{currentLecture.Subject || 'N/A'}</div>
                                                <div>{currentLecture.TeacherName || 'N/A'}</div>
                                            </TableItem>
                                        );
                                    })}
                                </>
                            )}
                        </div>
                    ))}
                </Table>
            )}
        </TableWrapper>
    );
};


export default TimeTable;