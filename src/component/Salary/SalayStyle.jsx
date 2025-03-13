import styled from "styled-components";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

export const Container = styled.div`
  display: flex;
  background-color: #f4f4f4;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const MainDashboard = styled.div`
  flex: 1;
  height: calc(100vh - 100px);
  overflow-y: auto;
  padding: 20px;
  border-radius: 10px;
  background-color: ${(props) => (props.bgColor ? props.bgColor : "#f4f4f4")};
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
  display: flex;
  flex-direction: column;
  align-items: center;
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

export const InputContainer = styled.div`
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
    width: 90%;
    font-size: 12px;
    padding: 12px 18px;
  }
`;

export const Select = styled.select`
  width: ${(props) => (props.fullWidth ? "96%" : "88%")};
  padding: 15px 20px;
  border: 2px solid #7d3cff;
  border-radius: 30px;
  font-size: 16px;
  color: #7a7a7a;
  background-color: #f4f6fc;
  font-weight: bold;
  outline: none;
  @media (max-width: 768px) {
    width: 100%;
  }
  @media (max-width: 480px) {
    height: 38px;
    width: 100%;
    font-size: 12px;
    padding: 10px 12px;
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
    width: 70%;
    font-size: 12px;
    padding: 10px 30px;
  }
`;

export const TableWrapper = styled.div`
  width: 100%;
  margin: 20px 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  background-color: white;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHeader = styled.thead``;

export const HeaderRow = styled.tr``;

export const HeaderCell = styled.th`
  padding: 12px;
  text-align: left;
  font-weight: 600;
  color: #666;
`;

export const TableBody = styled.tbody``;

export const BodyRow = styled.tr`
  &:nth-child(odd) {
    background-color: #f9f9f9;
  }
`;

export const BodyCell = styled.td`
  padding: 12px;
  text-align: left;
  font-size: 14px;
`;

export const ActionButton = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  padding: 5px 10px;
  margin-right: 5px;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  border-radius: 4px;
  background-color: ${(props) => (props.edit ? "#4caf50" : "#f44336")};
  color: #fff;

  &:hover {
    opacity: 0.9;
  }

  svg {
    margin-right: 5px;
  }

  @media (max-width: 480px) {
    span {
      display: none; /* Hide text on small screens */
    }
    margin: 0;
    margin-bottom: 5px;
    padding: 5px;
    
    svg {
      margin-right: 0; /* Remove margin to keep the icon centered */
    }
  }
`;


export const EditIcon = styled(FaEdit)`
  color: #fff;
`;

export const DeleteIcon = styled(FaTrashAlt)`
  color: #fff;
`;

export const ErrorMessage = styled.span`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

export const ConfirmationModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
`;

export const ConfirmButton = styled.button`
  padding: 10px 15px;
  margin: 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &.yes {
    background-color: #4caf50;
    color: white;
  }
  &.no {
    background-color: #f44336;
    color: white;
  }
`;

export const Main = styled.div`
  display: grid;
  grid-template-columns: ${(props) => (props.columns ? props.columns : "repeat(3, 1fr)")};
  gap: 20px;
  
  @media (max-width: 480px) {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`;

export const Heading = styled.div`
  width: 96%;
  background: linear-gradient(270deg, #222d78 0%, #7130e4 100%);
  color: white;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  font-weight: bold;
  @media (max-width: 480px) {
    font-size: 12px;
    height: 30px;
    width: 50%;
    margin-bottom: 30px;
    margin-top: 20px;
  }
`;

export const Section = styled.div`
  width: 98%;
  background: linear-gradient(270deg, #222d78 0%, #7130e4 100%);
  color: white;
  border-radius: 10px;
  height: 70px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
  font-size: 14px;
  padding: 10px;
  align-items: center;
`;

export const EmployeeName = styled.div`
  display: flex;
  gap: 0.5rem;
  img {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    background-color: aliceblue;
  }
`;

export const EmployeeID = styled.div``;