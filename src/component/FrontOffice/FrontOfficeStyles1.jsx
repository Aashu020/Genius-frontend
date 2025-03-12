import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  background-color: #f4f4f4;
`;

export const Container2 = styled.div`
  display: flex;
  height: calc(100vh - 35px);
  background-color: #f4f4f4;
`;

export const Container3 = styled.div`
  width: 100%;
  margin: 50px auto;
  background-color: #f9f9f9;
`;

export const Container4 = styled.div`
  width: 100%;
  margin: 50px auto;
  background-color: #f9f9f9;
  /* From new LeavingStudentTable.jsx - identical to Container3 */
`;

export const MainDashboard = styled.div`
  flex: 1;
  padding: 20px;
  height: calc(100vh - 100px);
  overflow-y: auto;
  background-color: #f9f9f9;
  @media (max-width: 480px) {
    padding: 10px;
  }
`;

export const Title = styled.h2`
  color: #0d47a1;
  text-align: center;
  font-weight: bold;
  margin-bottom: 30px;
`;

export const Form = styled.form`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
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
  font-weight: bold;
  cursor: pointer;
  @media (max-width: 480px) {
    font-size: 12px;
    height: 30px;
    width: 50%;
    margin-bottom: 30px;
    margin-top: 20px;
  }
`;

export const Main = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const FormContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  @media (max-width: 480px) {
    padding: 10px;
  }
`;

export const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 20px;
  @media (max-width: 480px) {
    margin-bottom: 12px;
  }
`;

export const InputContainer1 = styled.div`
  display: ${(props) => (props.show ? "flex" : "none")};
  transition: visibility 0.3s, opacity 0.3s ease-in-out;
  position: relative;
  width: 100%;
  margin-bottom: 20px;
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
  @media (max-width: 480px) {
    height: 10px;
    width: 80%;
    font-size: 12px;
    padding: 12px 18px;
  }
`;

export const Select = styled.select`
  width: 88%;
  padding: 15px 20px;
  border: 2px solid #7d3cff;
  border-radius: 30px;
  font-size: 16px;
  color: #7a7a7a;
  background-color: #f4f6fc;
  font-weight: bold;
  outline: none;
  @media (max-width: 480px) {
    height: 38px;
    width: 94%;
    font-size: 12px;
    padding: 10px 12px;
  }
`;

export const PlusButton = styled.button`
  width: 35px;
  padding: 12px;
  background: linear-gradient(270deg, #222d78 0%, #7130e4 100%);
  border: none;
  border-radius: 30px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s;
  margin-left: 10px;
  &:hover {
    background: linear-gradient(270deg, #1c2563 0%, #662acc 100%);
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

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 30px;
`;

export const Table2 = styled.table`
  width: 100%;
  border-collapse: collapse;
  @media (max-width: 468px) {
    width: 95%;
    margin: 0px auto;
  }
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  @media (max-width: 468px) {
    width: 95%;
    margin: 0px auto;
  }
`;

export const Th = styled.th`
  background-color: #f2f2f2;
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  font-weight: 400;
`;

export const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

export const Td1 = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  display: flex;
  gap: 1rem;
`;

export const StatusButton = styled.button`
  background-color: #ebedeb;
  color: black;
  border: none;
  padding: 5px 10px;
  border-radius: 15px;
  background-color: ${(props) =>
    props.status === "CHECKED IN"
      ? "#e0e7ff"
      : props.status === "WAITING"
      ? "#f8d7da"
      : "#e2e3e5"};
  color: ${(props) =>
    props.status === "CHECKED IN"
      ? "#1e40af"
      : props.status === "WAITING"
      ? "#a94442"
      : "#737373"};
  font-weight: bold;
  font-size: 12px;
  @media (max-width: 480px) {
    font-size: 9px;
    padding: 5px;
  }
  @media (max-width: 376px) {
    font-size: 8px;
    padding: 2px;
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 10px 20px;
  border-top: 1px solid #e0e0e0;
  background-color: #fff;
  @media (max-width: 480px) {
    font-size: 10px;
    padding: 5px;
  }
  @media (max-width: 376px) {
    font-size: 8px;
    padding: 2px;
  }
`;

export const PaginationInfo = styled.div`
  display: flex;
  align-items: center;
  color: #888;
`;

export const PaginationButton = styled.button`
  background-color: #fff;
  color: ${(props) => (props.disabled ? "#ccc" : "#000")};
  border: none;
  padding: 5px 15px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  font-size: 14px;
  &:hover {
    background-color: ${(props) => (props.disabled ? "#fff" : "#f0f0f0")};
  }
  @media (max-width: 480px) {
    font-size: 10px;
    padding: 5px;
  }
  @media (max-width: 376px) {
    font-size: 8px;
    padding: 2px;
  }
`;

export const RowsPerPageDropdown = styled.select`
  margin: 0 10px;
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  font-size: 14px;
  cursor: pointer;
  @media (max-width: 480px) {
    font-size: 10px;
  }
  @media (max-width: 376px) {
    font-size: 8px;
    padding: 2px;
  }
`;

export const EditButton = styled.div`
  cursor: pointer;
  background-color: #209a16bf;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  display: flex;
  justify-content: center;
`;

export const DeleteButton = styled.div`
  background-color: red;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  display: flex;
  justify-content: center;
`;

export const Section = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px;
  @media (max-width: 480px) {
    margin: 0;
  }
`;

export const Tabs = styled.div`
  display: flex;
  justify-content: center;
`;

export const Tab = styled.button`
  background-color: ${(props) => (props.active ? "#688AF6" : "#222D78")};
  color: white;
  border: none;
  border-radius: 8px;
  width: -webkit-fill-available;
  padding: 10px 30px;
  font-size: 16px;
  cursor: pointer;
  margin: 0 5px;
  &:hover {
    background-color: #6c8cf1;
  }
  @media (max-width: 480px) {
    font-size: 12px;
    padding: 8px 10px;
  }
`;

export const TableHead = styled.thead`
  background-color: #f4f4f4;
`;

export const TableHeader = styled.th`
  padding: 15px;
  text-align: left;
  font-size: 14px;
  color: #666;
  @media (max-width: 480px) {
    font-size: 10px;
    padding: 5px;
  }
  @media (max-width: 376px) {
    font-size: 8px;
    padding: 2px;
  }
`;

export const TableRow = styled.tr`
  background-color: #fff;
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

export const HeaderCell = styled.th`
  padding: 12px;
  text-align: left;
  font-size: 14px;
  color: #666;
  font-weight: bold;
  border-bottom: 1px solid #e0e0e0;
  @media (max-width: 468px) {
    padding: 5px;
    font-size: 10px;
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
  @media (max-width: 468px) {
    padding: 5px;
    font-size: 10px;
  }
`;

export const TableData = styled.td`
  padding: 15px;
  text-align: left;
  font-size: 14px;
  color: #333;
  @media (max-width: 480px) {
    font-size: 10px;
    padding: 5px;
  }
  @media (max-width: 376px) {
    font-size: 8px;
    padding: 2px;
  }
`;

export const ActionButton = styled.button`
  padding: 8px 20px;
  border-radius: 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
  @media (max-width: 480px) {
    font-size: 9px;
    padding: 5px;
    width: 46px;
  }
  @media (max-width: 376px) {
    font-size: 8px;
    padding: 2px;
  }
`;

export const Wrapper = styled.div`
  width: 90%;
  margin: 20px auto;
  padding: 10px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: "Arial", sans-serif;
  @media (max-width: 468px) {
    width: 100%;
    padding: 0;
  }
`;