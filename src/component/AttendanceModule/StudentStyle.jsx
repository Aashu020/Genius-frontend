import styled from "styled-components";

export const MainDashboard = styled.div`
  flex: 1;
  height: calc(100vh - 100px);
  overflow-y: auto;
  background-color: #f9f9f9;
  padding: 20px;
`;

export const Title = styled.h2`
  color: #0d47a1;
  text-align: center;
  font-weight: bold;
`;

export const Form = styled.form`
  width: 80%;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Main = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 20px;
`;

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 20px;
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
`;

export const Wrapper = styled.div`
  width: 97%;
  margin: 20px auto;
  padding: 10px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
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
`;

export const StatusContainer = styled.div`
  display: flex;
  gap: 8px;
`;

export const StatusButtonP = styled.button.attrs({ type: "button" })`
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
`;

export const StatusButtonA = styled.button.attrs({ type: "button" })`
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
`;

export const StatusButtonL = styled.button.attrs({ type: "button" })`
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

  @media (max-width: 480px) {
    width: 100%;
    font-size: 12px;
    padding: 5px;
  }
`;