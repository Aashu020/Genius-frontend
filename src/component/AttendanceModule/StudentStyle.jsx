import styled from "styled-components";

// Breakpoints for consistency
const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
  largeDesktop: '1200px',
};

export const MainDashboard = styled.div`
  flex: 1;
  height: calc(100vh - 100px);
  overflow-y: auto;
  background-color: #f9f9f9;
  padding: 20px;

  @media (max-width: ${breakpoints.desktop}) {
    padding: 15px;
    height: calc(100vh - 80px);
  }

  @media (max-width: ${breakpoints.tablet}) {
    padding: 12px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 0px;
    height: auto; // Already correct, allows content to flow naturally
    min-height: 100vh; // Ensures it takes full viewport height if content is short
  }
`;

export const Title = styled.h2`
  color: #0d47a1;
  text-align: center;
  font-weight: bold;

  @media (max-width: ${breakpoints.desktop}) {
    font-size: 24px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 20px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 16px; // Slightly smaller for mobile readability
    margin: 10px 0; // Adds spacing for better separation
  }
`;

export const Form = styled.form`
  width: 80%;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: ${breakpoints.desktop}) {
    width: 85%;
    max-width: 900px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    width: 90%;
    max-width: 700px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 90%; // Full width for mobile
    max-width: none; // Remove max-width constraint
    padding: 0 5px; // Minimal padding for edge spacing
  }
`;

export const Main = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 20px;

  @media (max-width: ${breakpoints.desktop}) {
    gap: 15px;
    margin-top: 15px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    margin-top: 12px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: 1fr; // Single column, already correct
    gap: 10px;
    margin-top: 10px;
    padding: 0; // Remove extra padding to maximize space
  }
`;

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 20px;

  @media (max-width: ${breakpoints.desktop}) {
    margin-bottom: 18px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    margin-bottom: 15px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    margin-bottom: 12px;
  }
`;

export const Label = styled.span`
  position: absolute;
  top: -10px;
  left: 20px;
  background: linear-gradient(270deg, #222d78 0%, #7130e4 100%);
  color: white;
  padding: 2px 10px;
  border-radius: 20px;
  font-size: 12px;

  @media (max-width: ${breakpoints.desktop}) {
    left: 15px;
    font-size: 11px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    left: 12px;
    padding: 2px 8px;
    font-size: 10px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    left: 10px;
    padding: 1px 6px;
    font-size: 9px;
    top: -8px;
  }
`;

export const Input = styled.input`
  width: 88%;
  padding: 15px 20px;
  border: 2px solid #7d3cff;
  border-radius: 30px;
  font-size: 16px;
  color: #7a7a7a;
  background-color: #f4f6fc;
  font-weight: bold;
  outline: none;

  @media (max-width: ${breakpoints.desktop}) {
    padding: 12px 18px;
    font-size: 14px;
    width: 90%;
  }

  @media (max-width: ${breakpoints.tablet}) {
    padding: 10px 15px;
    font-size: 13px;
    width: 92%;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 90%; // Full width for better usability
    padding: 8px 10px; // Reduced padding for compactness
    font-size: 12px;
    border-radius: 20px; // Slightly smaller radius for mobile
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 15px 20px;
  border: 2px solid #7d3cff;
  border-radius: 30px;
  font-size: 16px;
  color: #7a7a7a;
  background-color: #f4f6fc;
  font-weight: bold;

  @media (max-width: ${breakpoints.desktop}) {
    padding: 12px 18px;
    font-size: 14px;
    width: 98%;
  }

  @media (max-width: ${breakpoints.tablet}) {
    padding: 10px 15px;
    font-size: 13px;
    width: 96%;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 96%; // Full width for mobile
    padding: 8px 10px; // Reduced padding
    font-size: 12px;
    border-radius: 20px; // Smaller radius
  }
`;

export const Wrapper = styled.div`
  width: 97%;
  margin: 20px auto;
  padding: 10px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: ${breakpoints.desktop}) {
    width: 95%;
    margin: 15px auto;
    padding: 8px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    width: 92%;
    margin: 12px auto;
    padding: 6px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 95%; // Full width for mobile
    margin: 10px 0; // Adjusted margin for mobile
    padding: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); // Lighter shadow
  }
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  @media (max-width: ${breakpoints.desktop}) {
    font-size: 14px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 13px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 12px;
    display: block; // Enable table scrolling on mobile
    overflow-x: auto; // Horizontal scroll for tables
    white-space: nowrap; // Prevent text wrapping
  }
`;

export const TableHeader = styled.thead`
  background-color: #fff;
`;

export const HeaderCell = styled.th`
  padding: 12px;
  text-align: left;
  font-size: 14px;
  color: #666;
  font-weight: bold;
  border-bottom: 1px solid #e0e0e0;

  @media (max-width: ${breakpoints.desktop}) {
    padding: 10px;
    font-size: 13px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    padding: 8px;
    font-size: 12px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 6px;
    font-size: 10px; // Smaller font for mobile
  }
`;

export const TableBody = styled.tbody`
  color: black;
`;

export const BodyCell = styled.td`
  padding: 12px;
  text-align: left;
  font-size: 14px;
  color: #333;
  border-bottom: 1px solid #e0e0e0;
  vertical-align: middle;

  @media (max-width: ${breakpoints.desktop}) {
    padding: 10px;
    font-size: 13px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    padding: 8px;
    font-size: 12px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 6px;
    font-size: 10px; // Smaller font for mobile
  }
`;

export const StatusContainer = styled.div`
  display: flex;
  gap: 8px;

  @media (max-width: ${breakpoints.desktop}) {
    gap: 6px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    gap: 5px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    gap: 3px; // Tighter gap for mobile
    flex-wrap: wrap; // Allow wrapping if needed
  }
`;

export const StatusButtonP = styled.button.attrs({ type: "button" })`
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 50%; // Slightly adjusted from 55% for consistency
  padding: 5px 10px;
  cursor: pointer;
  margin-right: 5px;

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: ${breakpoints.desktop}) {
    padding: 4px 8px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    padding: 3px 6px;
    margin-right: 4px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 3px 5px; // Smaller padding for mobile
    margin-right: 2px;
    font-size: 10px; // Add font-size for text inside button
  }
`;

export const StatusButtonA = styled.button.attrs({ type: "button" })`
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 50%;
  padding: 5px 10px;
  cursor: pointer;
  margin-right: 5px;

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: ${breakpoints.desktop}) {
    padding: 4px 8px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    padding: 3px 6px;
    margin-right: 4px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 3px 5px;
    margin-right: 2px;
    font-size: 10px;
  }
`;

export const StatusButtonL = styled.button.attrs({ type: "button" })`
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 50%;
  padding: 5px 10px;
  cursor: pointer;
  margin-right: 5px;

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: ${breakpoints.desktop}) {
    padding: 4px 8px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    padding: 3px 6px;
    margin-right: 4px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 3px 5px;
    margin-right: 2px;
    font-size: 10px;
  }
`;

export const SubmitButton = styled.button`
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

  @media (max-width: ${breakpoints.desktop}) {
    width: 280px;
    padding: 10px;
    font-size: 15px;
    margin-top: 15px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    width: 240px;
    padding: 8px;
    font-size: 14px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 90%; // Full width for mobile
    padding: 10px; // Slightly increased for better touch area
    font-size: 13px; // Slightly larger for readability
    margin-top: 15px;
    border-radius: 20px; // Smaller radius for mobile
  }
`;