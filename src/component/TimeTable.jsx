import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import  baseURL from './utils/Url'; 
import {
  TableWrapper, HeaderWrapper, InputContainer, Select, TimeTableGrid, TableHeader,
  TableItem, TableItem1
} from './Outerstyle2';

// TimeTable Component
const TimeTable = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [timetable, setTimetable] = useState(null);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [periods, setPeriods] = useState([]);

  // Fetch classes on initial load
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(`${baseURL}/class/all`);
        console.log('Classes Response:', response.data);
        setClasses(response.data);
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
        const response = await axios.get(`${baseURL}/period/all`);
        setPeriods(response.data);
      } catch (err) {
        console.error("Error fetching periods:", err);
      }
    };
    fetchPeriods();
  }, []);

  // Fetch sections based on selected class
  useEffect(() => {
    const fetchSections = async () => {
      if (selectedClass) {
        try {
          const response = await axios.get(
            `${baseURL}/class/get/${selectedClass}`
          );
          console.log('Sections Response:', response.data);
          setSections(response.data.Section || []);
        } catch (error) {
          console.error("Error fetching sections:", error);
        }
      } else {
        setSections([]);
      }
    };
    fetchSections();
  }, [selectedClass]);

  // Fetch timetable when class or section is selected
  useEffect(() => {
    const fetchTimetable = async () => {
      if (selectedClass && selectedSection) {
        try {
          const classId = selectedClass + selectedSection; // Combine classId and section
          const response = await axios.get(
            `${baseURL}/timetable/get/${selectedClass}/${selectedSection}`
          );
          console.log('Timetable Response:', response.data);
          setTimetable(response.data);
        } catch (error) {
          console.error("Error fetching timetable:", error);
        }
      }
    };
    fetchTimetable();
  }, [selectedClass, selectedSection]);

  return (
    <TableWrapper>
      <HeaderWrapper>
        <h2>Time Table</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <InputContainer>
            <Select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
              <option value="">Select Class</option>
              {classes.map((cls) => (
                <option key={cls.ClassId} value={cls.ClassId}>
                  {cls.Class}
                </option>
              ))}
            </Select>
          </InputContainer>
          <InputContainer>
            <Select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              disabled={!selectedClass}
            >
              <option value="">Select Section</option>
              {sections.map((section, index) => (
                <option key={index} value={section}>
                  {section}
                </option>
              ))}
            </Select>
          </InputContainer>
        </div>
      </HeaderWrapper>
      {timetable && (
        <TimeTableGrid>
          <div style={{ gridColumn: 'span 7', textAlign: 'center', fontWeight: 'bold', padding: '10px', backgroundColor: '#e0e0e0' }}>
            Periods
          </div>
          {timetable.Days?.[0]?.Lectures?.map((lecture, periodIndex) => (
            <div key={periodIndex} style={{ display: 'contents' }}>
              {!lecture.Period.toLowerCase().includes('period') && lecture.Period.trim() !== "" ? (
                <TableItem1 style={{ gridColumn: 'span 7' }}>
                  {lecture.Period.trim()}<p>{(periods.find(val => val.Title.trim() === lecture.Period.trim()))?.StartTime} - {(periods.find(val => val.Title.trim() === lecture.Period.trim()))?.EndTime}</p>
                </TableItem1>
              ) : (
                <>
                  <TableHeader>{lecture.Period}<p>{(periods.find(val => val.Title.trim() === lecture.Period.trim()))?.StartTime} - {(periods.find(val => val.Title.trim() === lecture.Period.trim()))?.EndTime}</p></TableHeader>
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
        </TimeTableGrid>
      )}
    </TableWrapper>
  );
};


export default TimeTable;