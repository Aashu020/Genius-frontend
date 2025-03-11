import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Styled components
const TimetableWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const Th = styled.th`
  background-color: #0073e6;
  color: white;
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
  font-weight: bold;
`;

const Td = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
`;

const Heading = styled.h2`
  text-align: center;
  margin-top: 20px;
`;

// Timetable component
const Timetable = () => {
  const [timetableData, setTimetableData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch timetable data based on classId when component mounts
  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const response = await axios.get(`https://api.edspride.in/timetable/get/${classId}`); // Replace with your API endpoint
        setTimetableData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTimetable();
  }, [classId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Helper function to find the maximum number of periods across all days
  const findMaxPeriods = (days) => {
    return Math.max(...days.map(day => day.Lectures.length));
  };

  const maxPeriods = findMaxPeriods(timetableData.Days);

  return (
    <TimetableWrapper>
      <Heading>Class Timetable for {timetableData.Class} - Section {timetableData.Section}</Heading>
      <Table>
        <thead>
          <tr>
            <Th>Period</Th>
            {timetableData.Days.map((day, idx) => (
              <Th key={idx}>{day.Day}</Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Loop to render all possible periods (from 1 to maxPeriods) */}
          {[...Array(maxPeriods).keys()].map((periodIdx) => (
            <tr key={periodIdx}>
              <Td>{`Period ${periodIdx + 1}`}</Td>
              {timetableData.Days.map((day, dayIdx) => (
                <Td key={dayIdx}>
                  {day.Lectures[periodIdx] ? (
                    <>
                      <div><strong>Subject:</strong> {day.Lectures[periodIdx].Subject}</div>
                      <div><strong>Teacher:</strong> {day.Lectures[periodIdx].TeacherName}</div>
                    </>
                  ) : (
                    <div>No Lecture</div> // Show a message if no lecture exists for that period
                  )}
                </Td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </TimetableWrapper>
  );
};

export default Timetable;
