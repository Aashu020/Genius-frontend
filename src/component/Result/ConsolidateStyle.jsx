import styled from "styled-components";
import { Link } from "react-router-dom";

const MainDashboard = styled.div`
  flex: 1;
  padding: 20px;
  height: calc(100vh - 100px);
  overflow-y: auto;
  background-color: #f9f9f9;
`;

const Title = styled.h2`
  color: #0d47a1;
  text-align: center;
  margin-bottom: 30px;
  font-weight: bold;
`;

const Form = styled.form`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const Heading = styled.div`
  width: 30%;
  background: linear-gradient(270deg, #222d78 0%, #7130e4 100%);
  color: white;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  margin-bottom: 40px;
  @media (max-width: 480px) {
    font-size: 12px;
    height: 30px;
    width: 50%;
    margin-bottom: 30px;
    margin-top: 20px;
  }
`;

const Section = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Main = styled.div`
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

const FormContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 20px;
  @media (max-width: 480px) {
    margin-bottom: 12px;
  }
`;

const Label = styled.span`
  position: absolute;
  top: -10px;
  left: 20px;
  background: linear-gradient(270deg, #222d78 0%, #7130e4 100%);
  color: white;
  padding: 2px 10px;
  border-radius: 20px;
  font-size: 12px;
`;

const Select = styled.select`
  width: 100%;
  padding: 15px 20px;
  border: 2px solid #7d3cff;
  border-radius: 30px;
  font-size: 16px;
  color: #7a7a7a;
  background-color: #f4f6fc;
  font-weight: bold;
  @media (max-width: 480px) {
    height: 38px;
    width: 94%;
    font-size: 12px;
    padding: 10px 12px;
  }
`;

const Input = styled.input`
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

const SubmitButton = styled.button`
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

  @media (max-width: 768px) {
    width: 100%;
    font-size: 12px;
    padding: 5px;
  }
`;

// Table Section
const TableContainer = styled.div`
  margin-top: 40px;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  font-size: 16px;
  text-align: left;

  th,
  td {
    padding: 12px;
    border: 1px solid #ddd;
  }

  th {
    background-color: #f4f6fc;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const TdAction = styled.td`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SmallButton = styled.button`
  background: #ef5350;
  border: none;
  padding: 5px 10px;
  color: white;
  border-radius: 5px;
  font-size: 12px;
  cursor: pointer;
  margin-left: 5px;

  &:hover {
    background: #d32f2f;
  }
`;

// ------------------------------------------------
// Result


const Container = styled.div`
  width: 90%;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  font-family: Arial, sans-serif;
`;

const Header = styled.h2`
  color: #1d1d8f;
  font-size: 1.5rem;
  border-bottom: 2px solid #ddd;
  padding-bottom: 10px;
`;

const InfoSection = styled.div`
  margin: 10px 0;
  font-size: 1rem;
  span {
    font-weight: bold;
  }
`;

const Input1 = styled.input`
  width: 50px;
  padding: 5px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  background-color: #1d1d8f;
  color: white;
  padding: 5px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #3333cc;
  }
`;

const DetailsSection = styled.div`
  margin-top: 20px;
  font-size: 0.9rem;
  color: #333;

  .optional {
    font-style: italic;
    color: #777;
  }
`;

const DetailsTable = styled(Table)`
  margin-top: 5px;
  td, th {
    padding: 6px;
    font-size: 0.9rem;
  }
  input {
    width: 95%;
  }
`;

const SubmitButton1 = styled(Button)`
  background-color: #3f3fbf;
  padding: 10px 20px;
  font-size: 1rem;
  width: 100px;
`;



export {
    MainDashboard,
    Title,
    Form,
    Heading,
    Section,
    Main,
    FormContainer,
    InputContainer,
    Label,
    Select,
    Input,
    SubmitButton,
    TableContainer,
    Table,
    TdAction,
    SmallButton,
    Container,
    Header,
    InfoSection,
    Input1,
    Button,
    DetailsSection,
    DetailsTable,
    SubmitButton1
  };
  