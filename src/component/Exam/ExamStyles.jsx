// src/styles.js
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  background-color: #f4f4f4;
  width: 90%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;

  }
`;

export const MainDashboard = styled.div`
  flex: 1;
  padding: 20px;
  height: calc(100vh - 100px);
  overflow-y: auto;
  background-color: #f9f9f9;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    padding: 15px;
    height: auto;
    min-height: calc(100vh - 80px);
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

export const Title = styled.h2`
  color: #0d47a1;
  text-align: center;
  margin-bottom: 30px;
  font-weight: bold;
  font-size: 2rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }

  @media (max-width: 480px) {
    font-size: 1.25rem;
    margin-bottom: 15px;
  }
`;

export const Form = styled.form`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const Heading = styled.div`
  width: 30%;
  background: linear-gradient(270deg, #222d78 0%, #7130e4 100%);
  color: white;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  margin-bottom: 40px;
  font-size: 1rem;

  @media (max-width: 768px) {
    width: 40%;
    height: 35px;
    font-size: 0.9rem;
    margin-bottom: 30px;
  }

  @media (max-width: 480px) {
    width: 50%;
    height: 30px;
    font-size: 0.75rem;
    margin-bottom: 20px;
    margin-top: 10px;
  }
`;

export const Section = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
`;

export const Main = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  @media (max-width: 480px) {
    gap: 10px;
  }
`;

export const FormContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 93%;


  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
    border-radius: 8px;
  }
`;

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 20px;

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
  z-index: 1;

  @media (max-width: 768px) {
    font-size: 11px;
    left: 15px;
    padding: 2px 8px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
    left: 10px;
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

  @media (max-width: 768px) {
    width: 90%;
    padding: 12px 15px;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    width: 92%;
    padding: 10px 12px;
    font-size: 12px;
    border-radius: 25px;
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
  outline: none;

  @media (max-width: 768px) {
    width: 95%;
    padding: 12px 15px;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 10px 12px;
    font-size: 12px;
    border-radius: 25px;
  }
`;

export const SubmitButton = styled.button`
  width: ${(props) => (props.fullWidth ? "100%" : "320px")};
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

  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 10px;
    font-size: 14px;
    margin-top: 15px;
  }

  @media (max-width: 480px) {
    padding: 8px;
    font-size: 12px;
    border-radius: 25px;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 30px;

  @media (max-width: 768px) {
    margin-top: 20px;
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }

  @media (max-width: 480px) {
    margin-top: 15px;
  }
`;

export const Th = styled.th`
  background-color: #f2f2f2;
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  font-weight: 400;
  font-size: 1rem;

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    padding: 6px;
    font-size: 0.75rem;
  }
`;

export const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  font-size: 1rem;

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    padding: 6px;
    font-size: 0.75rem;
  }
`;

export const Td1 = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: 768px) {
    padding: 8px;
    gap: 0.75rem;
  }

  @media (max-width: 480px) {
    padding: 6px;
    gap: 0.5rem;
    flex-wrap: wrap;
  }
`;

export const Status = styled.button`
  background-color: #209a16bf;
  border: none;
  padding: 8px 20px;
  border-radius: 5px;
  color: white;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;

  @media (max-width: 768px) {
    width: 60%;
    padding: 6px 15px;
    font-size: 0.8rem;
  }

  @media (max-width: 480px) {
    width: 70%;
    padding: 5px 10px;
    font-size: 0.7rem;
  }
`;

export const Button = styled.button`
  background-color: #209a16bf;
  border: none;
  padding: 8px 10px;
  border-radius: 5px;
  color: white;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;

  @media (max-width: 768px) {
    width: 60%;
    padding: 6px 8px;
    font-size: 0.8rem;
  }

  @media (max-width: 480px) {
    width: 70%;
    padding: 5px 6px;
    font-size: 0.7rem;
  }
`;
export const DeleteButton = styled.button`
  background-color: #ff0000; /* Explicit red for clarity */
  border: none;
  padding: 8px 12px; /* Increased base padding for better touch target */
  border-radius: 5px;
  color: white;
  font-size: 14px; /* Base font size for readability */
  font-weight: 500; /* Medium weight for balance */
  width: auto; /* Default to content width instead of fixed percentage */
  min-width: 60px; /* Minimum width for consistency */
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer; /* Indicate interactivity */
  transition: background-color 0.3s ease, transform 0.2s ease; /* Smooth transitions */

  &:hover {
    background-color: #cc0000; /* Darker red on hover */
    transform: translateY(-2px); /* Subtle lift effect */
  }

  &:disabled {
    background-color: #ff6666; /* Lighter red when disabled */
    cursor: not-allowed;
    transform: none;
  }

  /* Tablet and below */
  @media (max-width: 768px) {
    padding: 6px 10px; /* Slightly smaller padding */
    font-size: 13px; /* Adjusted font size */
    min-width: 50px; /* Slightly smaller minimum width */
  }

  /* Small mobile */
  @media (max-width: 480px) {
    padding: 5px 8px; /* Compact padding */
    font-size: 12px; /* Smaller font for fit */
    min-width: 45px; /* Adjusted for small screens */
    width: auto; /* Let content dictate width, avoid fixed 70% */
  }

  /* Extra-small mobile */
  @media (max-width: 320px) {
    
    padding: 2px;
  }
`;