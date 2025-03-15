import styled from "styled-components";

// Breakpoints for consistent responsiveness
const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
  largeDesktop: '1200px',
};

// Common Styled Components Across Files
export const Container = styled.div`
  display: flex;
  background-color: #f4f4f4;
  width: 100%;
  min-height: 100vh;

  @media (max-width: ${breakpoints.desktop}) {
    padding: 15px;
  }
  @media (max-width: ${breakpoints.tablet}) {
    padding: 10px;
    flex-direction: column;
    width: 100%;
  }
  @media (max-width: ${breakpoints.mobile}) {
    padding: 5px;
    width: 95%;
  }
`;

export const MainDashboard = styled.div`
  flex: 1;
  padding: 20px;
  height: calc(100vh - 100px);
  overflow-y: auto;
  background-color: #f9f9f9;

  @media (max-width: ${breakpoints.desktop}) {
    padding: 15px;
    height: calc(100vh - 80px);
  }
  @media (max-width: ${breakpoints.tablet}) {
    padding: 12px;
  }
  @media (max-width: ${breakpoints.mobile}) {
    padding: 10px;
    height: auto;
    min-height: 100vh;
    overflow-y: auto;
  }
`;

export const Title = styled.h2`
  color: #0d47a1;
  text-align: center;
  margin-bottom: 30px;
  font-weight: bold;
  font-size: 28px;

  @media (max-width: ${breakpoints.desktop}) {
    font-size: 24px;
    margin-bottom: 25px;
  }
  @media (max-width: ${breakpoints.tablet}) {
    font-size: 20px;
    margin-bottom: 20px;
  }
  @media (max-width: ${breakpoints.mobile}) {
    font-size: 18px;
    margin-bottom: 15px;
  }
`;

export const Form = styled.form`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: ${breakpoints.desktop}) {
    max-width: 900px;
  }
  @media (max-width: ${breakpoints.tablet}) {
    max-width: 700px;
  }
  @media (max-width: ${breakpoints.mobile}) {
    max-width: 100%;
    padding: 0 5px;
  }
`;

export const Section = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
    gap: 10px;
  }
`;

export const FormContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  height: 88vh;

  @media (max-width: ${breakpoints.desktop}) {
    padding: 15px;
    height: calc(88vh - 20px);
  }
  @media (max-width: ${breakpoints.tablet}) {
    padding: 12px;
    height: auto;
  }
  @media (max-width: ${breakpoints.mobile}) {
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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

export const Label2 = styled.span`
  position: absolute;
  top: -10px;
  left: 20px;
  background: linear-gradient(270deg, #6c6c6c 0%, #525252 100%);
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
  margin-bottom: 10px;

  @media (max-width: ${breakpoints.desktop}) {
    padding: 12px 18px;
    font-size: 14px;
    width: 90%;
  }
  @media (max-width: ${breakpoints.tablet}) {
    padding: 10px 15px;
    font-size: 13px;
    width: 80%;
  }
  @media (max-width: ${breakpoints.mobile}) {
    width: 80%;
    padding: 8px 12px;
    font-size: 12px;
    border-radius: 20px;
    height: auto;
  }
`;

export const Input2 = styled.input`
  width: 80%;
  padding: 8px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: center;

  @media (max-width: ${breakpoints.desktop}) {
    width: 85%;
    padding: 7px;
    font-size: 0.95rem;
  }
  @media (max-width: ${breakpoints.tablet}) {
    width: 90%;
    padding: 6px;
    font-size: 0.9rem;
  }
  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    padding: 5px;
    font-size: 0.85rem;
    border-radius: 3px;
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
    width: 90%;
    padding: 8px 12px;
    font-size: 12px;
    border-radius: 20px;
    height: auto;
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
    width: 90%;
    padding: 10px;
    font-size: 13px;
    border-radius: 20px;
    margin-top: 12px;
  }
`;

export const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-x: auto;
  width: 100%;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 0 5px;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 30px;
  background-color: #fff;
  text-align: center;

  @media (max-width: ${breakpoints.desktop}) {
    margin-top: 25px;
  }
  @media (max-width: ${breakpoints.tablet}) {
    margin-top: 20px;
    width: 90%;
  }
  @media (max-width: ${breakpoints.mobile}) {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
    margin-top: 15px;
    width: 90%;
  }
`;

export const Th = styled.th`
  padding: 12px;
  text-align: center;
  border-bottom: 1px solid #ccc;
  background-color: #f0f0f0;
  font-size: 14px;

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
    font-size: 10px;
  }
`;

export const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ccc;
  text-align: center;
  font-size: 14px;

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
    font-size: 10px;
  }
`;

export const EditButton = styled.div`
  background-color: #209a16bf;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 40%;
  font-size: 14px;

  @media (max-width: ${breakpoints.desktop}) {
    padding: 4px 8px;
    font-size: 13px;
    width: 35%;
  }
  @media (max-width: ${breakpoints.tablet}) {
    padding: 3px 6px;
    font-size: 12px;
    width: 30%;
  }
  @media (max-width: ${breakpoints.mobile}) {
    padding: 3px 5px;
    font-size: 10px;
    width: 50%;
  }
`;

export const DeleteButton = styled.div`
  background-color: red;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  display: flex;
  justify-content: center;
  width: 10%;
  cursor: pointer;
  font-size: 14px;

  @media (max-width: ${breakpoints.desktop}) {
    padding: 4px 8px;
    font-size: 13px;
    width: 15%;
  }
  @media (max-width: ${breakpoints.tablet}) {
    padding: 3px 6px;
    font-size: 12px;
    width: 20%;
  }
  @media (max-width: ${breakpoints.mobile}) {
    padding: 3px 5px;
    font-size: 10px;
    width: 25%;
  }
`;

export const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 5px;

  @media (max-width: ${breakpoints.desktop}) {
    font-size: 13px;
  }
  @media (max-width: ${breakpoints.tablet}) {
    font-size: 12px;
  }
  @media (max-width: ${breakpoints.mobile}) {
    font-size: 11px;
    margin-top: 3px;
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
  font-size: 16px;

  @media (max-width: ${breakpoints.desktop}) {
    width: 35%;
    font-size: 14px;
    margin-bottom: 30px;
  }
  @media (max-width: ${breakpoints.tablet}) {
    width: 40%;
    height: 35px;
    font-size: 13px;
  }
  @media (max-width: ${breakpoints.mobile}) {
    width: 50%;
    height: 30px;
    font-size: 12px;
    margin-bottom: 20px;
    margin-top: 15px;
  }
`;

export const Main = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: ${breakpoints.desktop}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

// AddSection Specific Styles
// (Already included: Container, Main)

// DateSheet (First Version) Specific Styles
export const HomeworkTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 40px;

  @media (max-width: ${breakpoints.desktop}) {
    margin-top: 35px;
  }
  @media (max-width: ${breakpoints.tablet}) {
    margin-top: 30px;
  }
  @media (max-width: ${breakpoints.mobile}) {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
    margin-top: 20px;
  }
`;

export const Td1 = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  display: flex;
  gap: 1rem;
  font-size: 14px;

  @media (max-width: ${breakpoints.desktop}) {
    padding: 8px;
    font-size: 13px;
  }
  @media (max-width: ${breakpoints.tablet}) {
    padding: 6px;
    gap: 0.8rem;
    font-size: 12px;
  }
  @media (max-width: ${breakpoints.mobile}) {
    padding: 5px;
    gap: 0.5rem;
    font-size: 10px;
  }
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

  @media (max-width: ${breakpoints.mobile}) {
    padding: 10px;
  }
`;

export const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  width: 80%;
  max-width: 500px;

  @media (max-width: ${breakpoints.desktop}) {
    padding: 15px;
    width: 85%;
  }
  @media (max-width: ${breakpoints.tablet}) {
    padding: 12px;
    width: 90%;
  }
  @media (max-width: ${breakpoints.mobile}) {
    padding: 10px;
    width: 95%;
    max-width: 100%;
    border-radius: 8px;
  }
`;

export const ConfirmButton = styled.button`
  padding: 10px 15px;
  margin: 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;

  &.yes {
    background-color: #4caf50;
    color: white;
  }
  &.no {
    background-color: #f44336;
    color: white;
  }

  @media (max-width: ${breakpoints.desktop}) {
    padding: 8px 12px;
    font-size: 13px;
  }
  @media (max-width: ${breakpoints.tablet}) {
    padding: 6px 10px;
    font-size: 12px;
  }
  @media (max-width: ${breakpoints.mobile}) {
    padding: 5px 8px;
    font-size: 11px;
    border-radius: 4px;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 5px;
  }
`;

export const ConfirmDialog = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  width: 80%;
  max-width: 400px;

  @media (max-width: ${breakpoints.desktop}) {
    padding: 15px;
    width: 85%;
  }
  @media (max-width: ${breakpoints.tablet}) {
    padding: 12px;
    width: 90%;
  }
  @media (max-width: ${breakpoints.mobile}) {
    padding: 10px;
    width: 95%;
    max-width: 100%;
  }
`;

// DateSheet (Second Version) Specific Styles
export const Wrapper = styled.div`
  background-color: white;
  padding: 20px;
  margin-top: 50px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: ${breakpoints.desktop}) {
    padding: 15px;
    margin-top: 40px;
  }
  @media (max-width: ${breakpoints.tablet}) {
    padding: 12px;
    margin-top: 30px;
  }
  @media (max-width: ${breakpoints.mobile}) {
    padding: 10px;
    margin-top: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

export const Header = styled.h1`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;

  @media (max-width: ${breakpoints.desktop}) {
    font-size: 22px;
    margin-bottom: 8px;
  }
  @media (max-width: ${breakpoints.tablet}) {
    font-size: 20px;
    margin-bottom: 6px;
  }
  @media (max-width: ${breakpoints.mobile}) {
    font-size: 18px;
    margin-bottom: 5px;
  }
`;

export const SubHeader = styled.h2`
  text-align: center;
  color: red;
  font-size: 20px;
  margin-bottom: 20px;

  @media (max-width: ${breakpoints.desktop}) {
    font-size: 18px;
    margin-bottom: 15px;
  }
  @media (max-width: ${breakpoints.tablet}) {
    font-size: 16px;
    margin-bottom: 12px;
  }
  @media (max-width: ${breakpoints.mobile}) {
    font-size: 14px;
    margin-bottom: 10px;
  }
`;

export const TableHeader = styled.th`
  background-color: #ffeb3b;
  font-weight: bold;
  padding: 8px;
  border: 1px solid #000;
  font-size: 14px;

  @media (max-width: ${breakpoints.desktop}) {
    padding: 7px;
    font-size: 13px;
  }
  @media (max-width: ${breakpoints.tablet}) {
    padding: 6px;
    font-size: 12px;
  }
  @media (max-width: ${breakpoints.mobile}) {
    padding: 5px;
    font-size: 10px;
  }
`;

export const TableRow = styled.tr`
  border: 1px solid #000;
`;

export const TableData = styled.td`
  padding: 8px;
  border: 1px solid #000;
  font-size: 14px;

  @media (max-width: ${breakpoints.desktop}) {
    padding: 7px;
    font-size: 13px;
  }
  @media (max-width: ${breakpoints.tablet}) {
    padding: 6px;
    font-size: 12px;
  }
  @media (max-width: ${breakpoints.mobile}) {
    padding: 5px;
    font-size: 10px;
  }
`;

export const FooterNote = styled.div`
  font-size: 12px;
  margin-top: 20px;
  text-align: left;

  @media (max-width: ${breakpoints.desktop}) {
    font-size: 11px;
    margin-top: 15px;
  }
  @media (max-width: ${breakpoints.tablet}) {
    font-size: 10px;
    margin-top: 12px;
  }
  @media (max-width: ${breakpoints.mobile}) {
    font-size: 9px;
    margin-top: 10px;
  }
`;

export const PrincipalSign = styled.div`
  margin-top: 30px;
  font-size: 14px;
  text-align: right;

  @media (max-width: ${breakpoints.desktop}) {
    font-size: 13px;
    margin-top: 25px;
  }
  @media (max-width: ${breakpoints.tablet}) {
    font-size: 12px;
    margin-top: 20px;
  }
  @media (max-width: ${breakpoints.mobile}) {
    font-size: 11px;
    margin-top: 15px;
  }
`;

export const Dropdown = styled.select`
  padding: 10px;
  margin: 20px auto;
  display: block;
  border-radius: 5px;
  font-size: 16px;
  width: 200px;

  @media (max-width: ${breakpoints.desktop}) {
    padding: 8px;
    font-size: 14px;
    width: 180px;
    margin: 15px auto;
  }
  @media (max-width: ${breakpoints.tablet}) {
    padding: 7px;
    font-size: 13px;
    width: 160px;
  }
  @media (max-width: ${breakpoints.mobile}) {
    padding: 6px;
    font-size: 12px;
    width: 140px;
    border-radius: 4px;
    margin: 10px auto;
  }
`;

// SubjectWise Specific Styles
export const Title2 = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #2c2c6c;
  margin-bottom: 20px;

  @media (max-width: ${breakpoints.desktop}) {
    font-size: 22px;
    margin-bottom: 15px;
  }
  @media (max-width: ${breakpoints.tablet}) {
    font-size: 20px;
    margin-bottom: 12px;
  }
  @media (max-width: ${breakpoints.mobile}) {
    font-size: 18px;
    margin-bottom: 10px;
  }
`;

export const HeaderItem = styled.div`
  margin-right: 20px;

  & span {
    font-weight: bold;
  }

  @media (max-width: ${breakpoints.desktop}) {
    margin-right: 15px;
  }
  @media (max-width: ${breakpoints.tablet}) {
    margin-right: 10px;
    font-size: 14px;
  }
  @media (max-width: ${breakpoints.mobile}) {
    margin-right: 5px;
    font-size: 12px;
  }
`;

export const Button = styled.button`
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
    padding: 10px;
    font-size: 15px;
    margin-top: 15px;
  }
  @media (max-width: ${breakpoints.tablet}) {
    padding: 8px;
    font-size: 14px;
  }
  @media (max-width: ${breakpoints.mobile}) {
    padding: 10px;
    font-size: 13px;
    border-radius: 20px;
    width: 100%;
    margin-top: 12px;
  }
`;