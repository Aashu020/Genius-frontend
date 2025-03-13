import styled from "styled-components";

// Add new TableWrapper component
export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  margin-top: 30px;

  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f4f4f4;
  

  @media (max-width: 768px) {
    flex-direction: column;
   
  }
`;
export const Parent = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;

export const MainDashboard = styled.div`
 display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  height: calc(100vh - 100px);
  overflow-y: auto;
  background-color: #f9f9f9;
  width: 100%;

  @media (max-width: 768px) {
    padding: 15px;
    height: auto;
    width: 100%;
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

  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }
  @media (max-width: 320px) {
    font-size: 1.25rem;
  }
`;

export const Form = styled.form`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

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
  text-align: center;

  @media (max-width: 768px) {
    width: 50%;
  }
  @media (max-width: 480px) {
    width: 70%;
    height: 35px;
    margin-bottom: 30px;
    
    
  }
`;

export const Main = styled.div`
  display: grid;
  grid-template-columns: ${({ columns }) => 
    columns === 2 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'};
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

export const FormContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  width:  90%;
  @media (max-width: 480px) {
    padding: 15px;
  }
  @media (max-width: 320px) {
    padding: 10px;
  }
`;

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 20px;

  @media (max-width: 480px) {
    margin-bottom: 15px;
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

  @media (max-width: 480px) {
    left: 15px;
    font-size: 11px;
  }
  @media (max-width: 320px) {
    left: 10px;
    padding: 2px 8px;
  }
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

  @media (max-width: 480px) {
    left: 15px;
    font-size: 11px;
  }
  @media (max-width: 320px) {
    left: 10px;
    padding: 2px 8px;
  }
`;

export const Input = styled.input`
  width: 85%;
  padding: 15px 20px;
  border: 2px solid #7d3cff;
  border-radius: 30px;
  font-size: 16px;
  color: #7a7a7a;
  background-color: #f4f6fc;
  font-weight: bold;
  outline: none;

  @media (max-width: 768px) {
    width: 85%;
    padding: 12px 15px;
  }
  @media (max-width: 480px) {
    width: 90%;
    font-size: 14px;
  }
  @media (max-width: 320px) {
    padding: 10px 12px;
    width: 90%;
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

  @media (max-width: 480px) {
    padding: 12px 15px;
    font-size: 14px;
  }
  @media (max-width: 320px) {
    padding: 10px 12px;
  }
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

  @media (max-width: 768px) {
    width: ${({ width }) => width || '250px'};
  }
  @media (max-width: 480px) {
    width: ${({ width }) => width || '100%'};
    padding: 10px 15px;
    font-size: 14px;
  }
`;

export const Table = styled.table`
  width: 100%;
  min-width: 600px;
  border-collapse: collapse;

  @media (max-width: 768px) {
    min-width: 500px;
  }
  @media (max-width: 480px) {
    min-width: 400px;
  }
`;

export const Th = styled.th`
  background-color: #f2f2f2;
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  font-weight: 400;
  white-space: nowrap;

  @media (max-width: 480px) {
    padding: 8px;
    font-size: 14px;
  }
`;

export const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  white-space: nowrap;

  @media (max-width: 480px) {
    padding: 8px;
    font-size: 14px;
  }
`;

export const Td1 = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  display: flex;
  gap: 1rem;
  white-space: nowrap;

  @media (max-width: 480px) {
    padding: 8px;
    gap: 0.5rem;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 480px) {
    gap: 5px;
  }
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

  @media (max-width: 480px) {
    padding: 4px 8px;
    font-size: 12px;
  }
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

  @media (max-width: 480px) {
    padding: 4px 8px;
    font-size: 12px;
  }
`;

export const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 5px;

  @media (max-width: 480px) {
    font-size: 11px;
  }
`;

export const SchoolHeader = styled.div`
  text-align: center;
  margin: 20px 0;
  font-size: 14px;

  @media (max-width: 480px) {
    font-size: 12px;
    margin: 15px 0;
  }
`;

export const TableContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 2px solid #ccc;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
  overflow-x: auto;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const TotalRow = styled.tr`
  font-weight: bold;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const ProfitContainer = styled.div`
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;

  @media (max-width: 480px) {
    font-size: 14px;
    margin-bottom: 15px;
  }
`;

export const PrintButton = styled.button`
  display: block;
  margin: 0 auto;
  padding: 8px 16px;

  @media (max-width: 480px) {
    padding: 6px 12px;
    font-size: 14px;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }
`;

export const DateRange = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 10px;
  }
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

  @media (max-width: 480px) {
    padding: 6px 12px;
    margin-left: 0;
    width: 100%;
  }
`;