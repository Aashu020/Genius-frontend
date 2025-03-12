import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
// import Sidebar from "./Sidebar";
import TimeTable from "./TimeTable";
import AbsentStudentList from "./AbsentStudent";
import DynamicSlider from "./Birthday";
import AbsentStaffList from "./AbsentStaff";
import NewAdmissions from "./NewAdmission";
import DynamicCharts from "./Chart";
import Navbar from "./Navbar";
import Calender from "./Calender";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import axios from "axios";
import FeePaymentsChart from "./FeePaymentsChart";

// Registering necessary chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

// Main content area (dashboard)
const MainDashboard = styled.div`
  flex: 1;
  padding: 20px;
  height: calc(100vh - 100px);
  overflow-y: auto;
  background-color: #f9f9f9;
`;

// Statistics container holding boxes
const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  gap: 5px;
  @media (max-width: 480px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    justify-items: center;
  }
`;

const StatTitle = styled.h4`
  margin-bottom: 10px;
  font-size: 16px;
  color: white;
`;

const StatValue = styled.p`
  font-size: 22px;
  font-weight: bold;
  color: white;
`;

// Chart section for displaying charts
const ChartSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  /* height: 0vh; */
  justify-content: space-between;
  margin-bottom: 20px;
`;


// Calendar and birthday boxes

const CalendarContainer = styled.div`
  display: flex;
  background-color: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
  justify-content: space-between;
  @media (max-width: 480px) {
    display: block;
  }
`;

// Birthday Box and Academic Events

const Box = styled.div`
  display: flex;
  @media (max-width: 768px) {
    display: block;
  }
`;
const Left = styled.div`
  width: 60%;
  @media (max-width: 480px) {
    width: 100%;
  }
`;
const Right = styled.div`
  width: 40%;
  @media (max-width: 480px) {
    width: 100%;
  }
`;

const StyledLink = styled(Link)`
  width: 15%;
  padding: 20px;
  background-color: #fff;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  background-color: ${(props) => props.backgroundColor || "#ddd"};
  text-decoration: none;
  color: white; // Ensure text is white
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 480px) {
    width: 70%;
  }
`;

const Dashboard = () => {
  // Sample data for the calendar
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
  const events = {
    1: [{ name: "Birthday", color: "#1E90FF" }],
    5: [{ name: "Event", color: "#32CD32" }],
    12: [{ name: "Conference", color: "#FF6347" }],
    18: [{ name: "Holiday", color: "#FF4500" }],
    22: [{ name: "Meeting", color: "#FFD700" }],

  };

  const [totalStudents, setTotalStudents] = useState(0);
  const [totalStaff, setTotalStaff] = useState(0);
  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState('');
  const [totalFee, setTotalFee] = useState(0);
  const [remainingFee, setRemainingFee] = useState(0);

  useEffect(() => {
    const create = async () => {
      try {
        // Call the API only if 'update' is not set to "Yes"
        if (update !== "Yes") {
          await axios.post("https://api.edspride.in/student/create-fee-data-for-all-students");
          setUpdate("Yes");  // Set update to "Yes" to prevent further calls
        }
      } catch (error) {
        console.error(error);
      }
    };

    // Run this effect once when the component mounts
    create();
  }, []); // Empty dependency array to ensure the effect runs only once on mount

  useEffect(() => {
    // Fetch the fee data from the API
    const fetchFeeData = async () => {
      try {
        const response = await axios.get("https://api.edspride.in/fee-data/all");
        // setStudents(response.data); // Assuming the response is an array of student fee data

        // Calculate totalFee and remainingFee by iterating over the response data
        const total = response.data.reduce((sum, student) => sum + student.TotalFee, 0);
        const remaining = response.data.reduce((sum, student) => sum + student.RemainingFee, 0);

        const calculateTotalPaidFee = (data) => {
          return data.reduce((total, student) => {
            const paidAmount = student?.Payments?.reduce((sum, payment) => sum + (payment.PaidAmount || 0), 0) || 0;
            return total + paidAmount;
          }, 0);
        };
        // **First**: Filter out students with zero total paid amount
        const filtered = response.data.filter(student => {
          const totalPaid = student?.Payments?.reduce((sum, payment) => sum + (payment.PaidAmount || 0), 0) || 0;
          return totalPaid > 0;
        });
        var totalPaid = (calculateTotalPaidFee(filtered))
        console.log(totalPaid)
        setTotalFee(totalPaid);
        setRemainingFee(remaining);

        // Log the calculated total and remaining fees
        // console.log("Total Fee:", total);
        // console.log("Remaining Fee:", remaining);
      } catch (error) {
        console.error("Error fetching fee data:", error);
      }
    };

    fetchFeeData();
  }, [update]);

  useEffect(() => {
    const fetchTotalStudents = async () => {
      try {
        const response = await fetch('https://api.edspride.in/student/all');
        const data = await response.json();

        // Assuming the API returns an array of students
        if (Array.isArray(data)) {
          setTotalStudents(data.length);
        } else {
          console.error('Unexpected response format', data);
        }
      } catch (error) {
        console.error('Error fetching student data:', error);
      } finally {
        setLoading(false);
      }
    };
    const fetchTotalStaff = async () => {
      try {
        const response = await fetch('https://api.edspride.in/staff/all');
        const data = await response.json();

        // Assuming the API returns an array of staff members
        if (Array.isArray(data)) {
          setTotalStaff(data.length);
        } else {
          console.error('Unexpected response format', data);
        }
      } catch (error) {
        console.error('Error fetching staff data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalStaff();
    fetchTotalStudents();
  }, []);
  return (
    <>
      <MainDashboard>
        <StatsContainer>
          <StyledLink to="/admin/allstudent" backgroundColor="#7130E4"> {/* Link for Total Students */}
            <StatTitle>Total Students</StatTitle>
            <StatValue>{loading ? 'Loading...' : totalStudents}</StatValue>
          </StyledLink>
          <StyledLink to="/admin/allstaff" backgroundColor="#688AF6"> {/* Link for Total Staff */}
            <StatTitle>Total Staff</StatTitle>
            <StatValue>{loading ? 'Loading...' : totalStaff}</StatValue>
          </StyledLink>
          <StyledLink to="/admin/fee-paid" backgroundColor="#FC858F">
            <StatTitle>Total Fee Received</StatTitle>
            <StatValue>{totalFee}</StatValue>
          </StyledLink>
          <StyledLink to="/admin/fee-remaining" backgroundColor="#688AF6">
            <StatTitle>Total Remaining</StatTitle>
            <StatValue>{remainingFee}</StatValue>
          </StyledLink>
          <StyledLink to="/admin/EOD" backgroundColor="#FC858F">
            <StatTitle>Download EOD</StatTitle>
            {/* <StatValue>0</StatValue> */}
          </StyledLink>
        </StatsContainer>

        <ChartSection>
          <DynamicCharts />
          <FeePaymentsChart />
        </ChartSection>

        <CalendarContainer>
          <Calender />
          <DynamicSlider />
        </CalendarContainer>

        <Box>
          <Left>
            <AbsentStaffList />
            <AbsentStudentList />
            <TimeTable />
          </Left>
          <Right>
            <NewAdmissions />
          </Right>
        </Box>
      </MainDashboard>
    </>
  );
};

export default Dashboard;