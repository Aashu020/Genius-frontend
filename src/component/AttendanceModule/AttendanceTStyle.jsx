import styled from "styled-components";

export const MainDashboard = styled.div`
  flex: 1;
  height: calc(100vh - 100px);
  overflow-y: auto;
  background-color: #f9f9f9;
  padding: 20px;
  align-items: center;

  @media (max-width: 1024px) {
    padding: 15px; /* Slightly reduced for tablets */
    height: calc(100vh - 80px); /* Adjusted height */
  }

  @media (max-width: 768px) {
    padding: 12px;
  }

  @media (max-width: 480px) {
    padding: 10px;
    height: auto; /* Mobile adjustment */
  }
`;

export const Title = styled.h2`
  color: #0d47a1;
  text-align: center;
  font-weight: bold;

  @media (max-width: 1024px) {
    font-size: 24px; /* Slightly smaller for tablets */
  }

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

export const Form = styled.form`
  width: 80%;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    width: 85%; /* Slightly wider for tablets */
    max-width: 900px; /* Reduced max-width */
  }

  @media (max-width: 768px) {
    width: 90%;
    max-width: 700px;
  }

  @media (max-width: 480px) {
    width: 95%;
    max-width: 100%;
  }
`;

export const Main = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Keep 2 columns for tablets */
  gap: 20px;
  margin-top: 20px;

  @media (max-width: 1024px) {
    gap: 15px; /* Slightly reduced for tablets */
    margin-top: 15px;
  }

  @media (max-width: 768px) {
    gap: 12px;
    margin-top: 12px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr; /* Single column only on mobile */
    gap: 10px;
    margin-top: 10px;
  }
`;

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 20px;

  @media (max-width: 1024px) {
    margin-bottom: 18px; /* Slightly reduced for tablets */
  }

  @media (max-width: 768px) {
    margin-bottom: 15px;
  }

  @media (max-width: 480px) {
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

  @media (max-width: 1024px) {
    left: 15px; /* Slightly adjusted for tablets */
    font-size: 11px;
  }

  @media (max-width: 768px) {
    left: 12px;
    padding: 2px 8px;
    font-size: 10px;
  }

  @media (max-width: 480px) {
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

  @media (max-width: 1024px) {
    padding: 12px 18px; /* Slightly reduced for tablets */
    font-size: 14px;
    width: 90%;
  }

  @media (max-width: 768px) {
    padding: 10px 15px;
    font-size: 13px;
    width: 92%;
  }

  @media (max-width: 480px) {
    padding: 8px 12px;
    font-size: 12px;
    width: 94%;
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

  @media (max-width: 1024px) {
    padding: 12px 18px; /* Slightly reduced for tablets */
    font-size: 14px;
    width: 98%;
  }

  @media (max-width: 768px) {
    padding: 10px 15px;
    font-size: 13px;
    width: 96%;
  }

  @media (max-width: 480px) {
    padding: 8px 12px;
    font-size: 12px;
    width: 94%;
  }
`;

export const Wrapper = styled.div`
  width: 80%;
  margin: 20px auto;
  padding: 10px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 1024px) {
    width: 85%; /* Slightly wider for tablets */
    margin: 15px auto;
    padding: 8px;
  }

  @media (max-width: 768px) {
    width: 90%;
    margin: 12px auto;
    padding: 6px;
  }

  @media (max-width: 480px) {
    width: 95%;
    margin: 10px auto;
    padding: 5px;
  }
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  @media (max-width: 1024px) {
    font-size: 14px; /* Keep readable for tablets */
  }

  @media (max-width: 768px) {
    font-size: 13px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
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

  @media (max-width: 1024px) {
    padding: 10px; /* Slightly reduced for tablets */
    font-size: 13px;
  }

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 12px;
  }

  @media (max-width: 480px) {
    padding: 6px;
    font-size: 11px;
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

  @media (max-width: 1024px) {
    padding: 10px; /* Slightly reduced for tablets */
    font-size: 13px;
  }

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 12px;
  }

  @media (max-width: 480px) {
    padding: 6px;
    font-size: 11px;
  }
`;

export const StatusContainer = styled.div`
  display: flex;
  gap: 8px;

  @media (max-width: 1024px) {
    gap: 6px; /* Slightly reduced for tablets */
  }

  @media (max-width: 768px) {
    gap: 5px;
  }

  @media (max-width: 480px) {
    gap: 4px;
  }
`;

export const StatusButtonP = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 55%;
  padding: 5px 10px;
  cursor: pointer;
  margin-right: 5px;

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: 1024px) {
    padding: 4px 8px; /* Slightly reduced for tablets */
  }

  @media (max-width: 768px) {
    padding: 3px 6px;
    margin-right: 4px;
  }

  @media (max-width: 480px) {
    padding: 2px 5px;
    margin-right: 3px;
  }
`;

export const StatusButtonA = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 55%;
  padding: 5px 10px;
  cursor: pointer;
  margin-right: 5px;

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: 1024px) {
    padding: 4px 8px; /* Slightly reduced for tablets */
  }

  @media (max-width: 768px) {
    padding: 3px 6px;
    margin-right: 4px;
  }

  @media (max-width: 480px) {
    padding: 2px 5px;
    margin-right: 3px;
  }
`;

export const StatusButtonL = styled.button`
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 55%;
  padding: 5px 10px;
  cursor: pointer;
  margin-right: 5px;

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: 1024px) {
    padding: 4px 8px; /* Slightly reduced for tablets */
  }

  @media (max-width: 768px) {
    padding: 3px 6px;
    margin-right: 4px;
  }

  @media (max-width: 480px) {
    padding: 2px 5px;
    margin-right: 3px;
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

  @media (max-width: 1024px) {
    width: 280px; /* Slightly reduced for tablets */
    padding: 10px;
    font-size: 15px;
    margin-top: 15px;
  }

  @media (max-width: 768px) {
    width: 240px;
    padding: 8px;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    width: 100%; /* Match original mobile */
    font-size: 12px;
    padding: 5px;
    margin-top: 10px;
  }
`;