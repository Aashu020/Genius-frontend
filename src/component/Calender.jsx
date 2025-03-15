import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import  baseURL from './utils/Url';  
const CalendarWrapper = styled.div`
  flex: 2;
  padding-right: 20px;
  @media (max-width: 480px) {
    padding-right: 0px;
  }
`;

const CalendarTitle = styled.h3`
  font-size: 18px;
  color: #333;
  margin-bottom: 10px;
`;

const localizer = momentLocalizer(moment);

const Calender = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${baseURL}/academic-year-plan/all`);
        const formattedEvents = response.data.map(event => ({
          title: event.Title,
          start: new Date(event.StartDate),
          end: new Date(event.EndDate),
          color: event.Color,
        }));
        setEvents(formattedEvents);
        console.log(formattedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <CalendarWrapper>
      <CalendarTitle>Upcoming Events</CalendarTitle>
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: event.color,
            color: '#fff',
            borderRadius: '5px',
          },
        })}
      />
    </CalendarWrapper>
  );
};

export default Calender;
