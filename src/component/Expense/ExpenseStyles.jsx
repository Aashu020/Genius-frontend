import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  background-color: #f4f4f4;
`;

export const MainDashboard = styled.div`
  flex: 1;
  padding: 20px;
  height: calc(100vh - 100px);
  overflow-y: auto;
  background-color: #f9f9f9;
`;

export const Title = styled.h2`
  color: #0d47a1;
  text-align: center;
  margin-bottom: 30px;
  font-weight: bold;
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
`;

export const Main = styled.div`
  display: grid;
  grid-template-columns: ${({ columns }) => 
    columns === 2 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'};
  gap: 20px;
`;

export const FormContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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

export const Label2 = styled.span`
  position: absolute;
  top: -10px;
  left: 20px;
  background: linear-gradient(270deg, #6c6c6c 0%, #525252 100%);
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

export const SubmitButton = styled.button`
  width: ${({ width }) => width || '320px'};
  padding: 12px ${props => props.width ? '20px' : ''};
  background: linear-gradient(270deg, #222d78 0%, #7130e4 100%);
  border: none;
  border-radius: 30px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  font-weight: bold;
  margin-top: ${({ marginTop }) => marginTop || '0'};

  &:hover {
    background: linear-gradient(270deg, #1c2563 0%, #662acc 100%);
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 30px;
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

export const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;

export const EditButton = styled.div`
  background-color: ${({ bg }) => bg || '#209a16bf'};
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  width: ${({ width }) => width || 'auto'};
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

export const DeleteButton = styled.div`
  background-color: red;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  width: ${({ width }) => width || 'auto'};
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

export const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;
export const SchoolHeader = styled.div`
  text-align: center;
  margin: 20px 0;
  font-size: 14px;
`;

export const TableContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 2px solid #ccc;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
`;

export const TotalRow = styled.tr`
  font-weight: bold;
`;

export const ProfitContainer = styled.div`
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const PrintButton = styled.button`
  display: block;
  margin: 0 auto;
`;
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const DateRange = styled.div`
  display: flex;
  align-items: center;
`;

export const Button = styled.button`
  padding: 8px 16px;
  background-color: teal;
  color: white;
  border: none;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: darkslategray;
  }
`;