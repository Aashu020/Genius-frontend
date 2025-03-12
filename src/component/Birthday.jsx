import React, { useState, useEffect } from "react";
import axios from "axios";  // Import axios for making HTTP requests
import styled from "styled-components";
import image from "./../assets/Images/SchoolName.png"
import { ToastContainer, toast } from 'react-toastify';
import {
  Container, SectionTitle, Card, ProfileContainer, ProfileImage, ProfileInfo, Name, Role, Message,
  SendWishesButton, DotsContainer, Dot, EventCard, EventTitle, EventDetails, ConfirmationModal,
  DetailModalContent, ConfirmButton
} from './Outerstyle';

// Custom Hook for handling the slider logic
const useSlider = (data) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === data.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval); // Clear interval on component unmount
  }, [data]);

  // Handle manual dot click
  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return { currentIndex, handleDotClick };
};

const DynamicSlider = () => {
  const [events, setEvents] = useState([]);  // State to hold fetched events
  const [notices, setNotices] = useState([]);  // State to hold fetched notices
  const [birthdayData, setBirthdayData] = useState([]);  // State to hold birthday data
  const [loading, setLoading] = useState(true);  // Loading state to show spinner
  const [isWishing, setIsWishing] = useState(false);
  const [birthdayModel, setBirthdayModel] = useState(false);
  const [selectedBirthday, setSelectedBirthday] = useState(null);

  // Use the custom hook for birthday data
  const { currentIndex: currentBirthdayIndex, handleDotClick: handleBirthdayDotClick } = useSlider(birthdayData);

  // Use the custom hook for academic events
  const { currentIndex: currentEventIndex, handleDotClick: handleEventDotClick } = useSlider(events);

  // Use the custom hook for notices
  const { currentIndex: currentNoticeIndex, handleDotClick: handleNoticeDotClick } = useSlider(notices);

  // Fetch academic events data from the API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("https://api.edspride.in/academicevents/all");
        // Filter events with status 'Publish' and only upcoming events based on StartDate
        const today = new Date();
        const filteredEvents = response.data
          .filter((event) => event.Status === "Publish" && new Date(event.StartDate) > today)
          .sort((a, b) => new Date(a.StartDate) - new Date(b.StartDate)); // Sort events by StartDate in ascending order
        setEvents(filteredEvents);
        setLoading(false);  // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);  // Stop loading if error occurs
      }
    };

    fetchEvents();
  }, []);

  // Fetch notices data from the API
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get("https://api.edspride.in/noticebox/all");
        // Filter notices with status 'Publish'
        const filteredNotices = response.data.filter((notice) => notice.Status === "Publish");
        setNotices(filteredNotices);
      } catch (error) {
        console.error("Error fetching notices:", error);
      }
    };

    fetchNotices();
  }, []);

  // Helper function to format date to DD-MM (to match your input format)
  const formatToDDMM = (dateString) => {
    const [day, month, year] = dateString.split("-");
    return `${day}-${month}`;
  };

  // Fetch birthday data from the API and filter students and staff with today's birthday
  useEffect(() => {
    const fetchBirthdays = async () => {
      try {
        // Fetch students' birthdays
        const studentsResponse = await axios.get("https://api.edspride.in/student/all");
        const staffResponse = await axios.get("https://api.edspride.in/staff/all");

        // Log the responses to check if data is being fetched
        // console.log("Students:", studentsResponse.data);
        // console.log("Staff:", staffResponse.data);

        const today = new Date();
        const todayDDMM = formatToDDMM(today.toISOString().split("T")[0].split("-").reverse().join("-")); // Get today's date in DD-MM format

        console.log("Today's Date in DD-MM:", todayDDMM); // Debug log for today's date

        // Filter students and staff based on DOB
        const filteredBirthdays = [
          ...studentsResponse.data.filter((student) => {
            // console.log("Student DOB:", student.DOB, "Formatted:", formatToDDMM(student.DOB));
            return formatToDDMM(student.DOB) === todayDDMM;
          }),
          ...staffResponse.data.filter((staff) => {
            // console.log("Staff DOB:", staff.DOB, "Formatted:", formatToDDMM(staff.DOB));
            return formatToDDMM(staff.DOB) === todayDDMM;
          })
        ];

        console.log("Filtered Birthdays:", filteredBirthdays); // Debug log for filtered data

        setBirthdayData(filteredBirthdays);
      } catch (error) {
        console.error("Error fetching birthdays:", error);
      }
    };

    fetchBirthdays();
  }, []);// Empty dependency array to run this effect only once


  const handleSendWishes = async (data) => {
    setBirthdayModel(false)
    // Fetch the SenderId and SenderRole from localStorage
    const senderId = localStorage.getItem('Id');  // Fetch the Sender ID from localStorage
    const senderRole = localStorage.getItem('Role');  // Fetch the Sender Role from localStorage

    // Check if the necessary values are available in localStorage
    if (!senderId || !senderRole) {
      console.error('SenderId or SenderRole not found in localStorage');
      return;  // Exit if either SenderId or SenderRole is missing
    }

    // Fetch the SenderName from localStorage, if available
    const senderName = JSON.parse(localStorage.getItem('EmployeeData'))?.Name || JSON.parse(localStorage.getItem('StudentData'))?.StudentName || senderRole   // If SenderName is not in localStorage, use SenderRole

    // Get the Receiver's ID and Name from the current birthday data
    const receiverId = data?.StudentId || data?.EmployeeId;  // Get Receiver ID from your data
    const receiverName = data?.StudentName || data?.Name;  // Get Receiver Name from your data

    // Prepare the data to send in the POST request
    const wishData = {
      SenderId: senderId,
      SenderName: senderName,
      SenderRole: senderRole,
      ReceiverId: receiverId,
      ReceiverName: receiverName,
    };

    try {
      // Make a POST request to the backend API to send the birthday wish
      const response = await axios.post('https://api.edspride.in/birthday/send-birthday-wish', wishData);

      // Handle the success response
      console.log(response.data.message); // Show success message
      toast.success(response.data.message)
      setIsWishing(true); // Optionally, you can show a confirmation message that the wish was sent
    } catch (error) {
      // Handle the error response
      console.error('Error sending birthday wish:', error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || error.message)
    }
  };

  const openModel = (id) => {
    setBirthdayModel(true);
    console.log(id);
    var filData = birthdayData.find(val => val.StudentId === id || val.EmployeeId === id)
    setSelectedBirthday(filData);
  }



  return (
    <Container>
      <ToastContainer />
      <SectionTitle>Birthday Box</SectionTitle>
      {/* Show only the currently active birthday */}
      <Card>
        {birthdayData.length > 0 ? (
          <ProfileContainer>
            <ProfileImage
              src={birthdayData[currentBirthdayIndex]?.Documents?.Photo && `https://api.edspride.in/uploads/${birthdayData[currentBirthdayIndex]?.Documents?.Photo}` || birthdayData[currentBirthdayIndex]?.Document?.StudentPhoto && `https://api.edspride.in/uploads/${birthdayData[currentBirthdayIndex]?.Document?.StudentPhoto}` || "https://via.placeholder.com/60"}
              alt="Profile"
            />
            <ProfileInfo>
              <Name>
                {birthdayData[currentBirthdayIndex]?.StudentName || birthdayData[currentBirthdayIndex]?.Name}
              </Name>
              <Role>
                {birthdayData[currentBirthdayIndex]?.Role || "Student"}
              </Role>
              <Message>
                {`Happy birthday ${birthdayData[currentBirthdayIndex]?.StudentName || birthdayData[currentBirthdayIndex]?.Name}`}
              </Message>
              { (
                <SendWishesButton onClick={() => openModel(birthdayData[currentBirthdayIndex]?.StudentId || birthdayData[currentBirthdayIndex]?.EmployeeId)}>
                  Send Wishes
                </SendWishesButton>
              )}
            </ProfileInfo>

          </ProfileContainer>

        ) : (
          <p>No birthdays today!</p>
        )}

      </Card>

      <DotsContainer>
        {birthdayData.map((_, index) => (
          <Dot
            key={index}
            active={currentBirthdayIndex === index}
            onClick={() => handleBirthdayDotClick(index)}
          />
        ))}
      </DotsContainer>

      <SectionTitle>Academic Events</SectionTitle>

      {/* Show a loading message while events are being fetched */}
      {loading ? (
        <Card>
          <p>Loading events...</p>
        </Card>
      ) : (
        // Show only the currently active event
        <EventCard>
          <EventTitle>{events[currentEventIndex]?.Title}</EventTitle>
          <EventDetails>
            <strong>Event Date:</strong>
            <ul>
              <li>Date: {events[currentEventIndex]?.StartDate.split("-").reverse().join("-")} &nbsp;to {events[currentEventIndex]?.EndDate.split("-").reverse().join("-")}</li>
              <li>Time: {events[currentEventIndex]?.Time}</li>
              <li>Venue: {events[currentEventIndex]?.Venue}</li>
            </ul>
            {events[currentEventIndex]?.Description}
          </EventDetails>
        </EventCard>
      )}

      <DotsContainer>
        {events.map((_, index) => (
          <Dot
            key={index}
            active={currentEventIndex === index}
            onClick={() => handleEventDotClick(index)}
          />
        ))}
      </DotsContainer>

      <SectionTitle>Notice Box</SectionTitle>

      {/* Render each notice dynamically */}
      {notices.length > 0 && (
        <Card>
          <EventTitle>{notices[currentNoticeIndex]?.Title}</EventTitle>
          <EventDetails>
            <strong>Date:</strong> {notices[currentNoticeIndex]?.Date.split("-").reverse().join("-")}
            <ul>
              {notices[currentNoticeIndex]?.Time && (
                <li>Time: {notices[currentNoticeIndex]?.Time}</li>
              )}
            </ul>
            {notices[currentNoticeIndex]?.Description}
          </EventDetails>
        </Card>
      )}

      <DotsContainer>
        {notices.map((_, index) => (
          <Dot
            key={index}
            active={currentNoticeIndex === index}
            onClick={() => handleNoticeDotClick(index)}
          />
        ))}
      </DotsContainer>
      {birthdayModel && (
        <ConfirmationModal>
          <DetailModalContent>
            <img height="700px" src={image} alt="BirthDay Card" />
            <br />
            <ConfirmButton className="no" onClick={() => handleSendWishes(selectedBirthday)}>
              send
            </ConfirmButton>
          </DetailModalContent>
        </ConfirmationModal>
      )}
    </Container>
  );
};

export default DynamicSlider;
