import styled from "styled-components";

// Breakpoints for consistent responsiveness
const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
  largeDesktop: '1200px',
};

// Common Styled Components
export const Container = styled.div`
  display: flex;
  background-color: #f4f4f4;
  width: 100%;
  min-height: 100vh;

  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
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
    overflow-x: hidden;
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

  @media (max-width: ${breakpoints.desktop}) {
    padding: 15px;
  }
  @media (max-width: ${breakpoints.tablet}) {
    padding: 12px;
  }
  @media (max-width: ${breakpoints.mobile}) {
    padding: 10px;
    border-radius: 8px;
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
  width: 93%;
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
    width: 80%;
    padding: 8px 12px;
    font-size: 12px;
    border-radius: 20px;
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
    width: 40%;
    padding: 5px;
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
  /* overflow-x: auto; */
  width: 100%;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 0 30px;
    width: 90%;
  }
`;

export const Table = styled.table`
  width: 70%;
  border-collapse: collapse;
  margin-top: 30px;

  @media (max-width: ${breakpoints.desktop}) {
    width: 80%;
  }
  @media (max-width: ${breakpoints.tablet}) {
    width: 90%;
  }
  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    display: block;
    align-content: center;
    overflow-x: auto;
    white-space: nowrap;
    margin-top: 20px;
  }
`;

export const Th = styled.th`
  background-color: #f2f2f2;
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  font-size: 14px;

  @media (max-width: ${breakpoints.desktop}) {
    padding: 8px;
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

export const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  font-size: 14px;

  @media (max-width: ${breakpoints.desktop}) {
    padding: 8px;
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

export const AcademicYearTable = styled.table`
  width: 70%;
  border-collapse: collapse;
  margin-top: 30px;

  th, td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: left;
    font-size: 14px;
  }

  th {
    background-color: #f2f2f2;
  }

  @media (max-width: ${breakpoints.desktop}) {
    width: 80%;
    th, td { padding: 8px; font-size: 13px; }
  }
  @media (max-width: ${breakpoints.tablet}) {
    width: 90%;
    th, td { padding: 6px; font-size: 12px; }
  }
  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    display: block;
    overflow-x: auto;
    white-space: nowrap;
    margin-top: 20px;
    th, td { padding: 5px; font-size: 10px; }
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
  font-size: 14px;

  @media (max-width: ${breakpoints.desktop}) {
    padding: 4px 8px;
    font-size: 13px;
  }
  @media (max-width: ${breakpoints.tablet}) {
    padding: 3px 6px;
    font-size: 12px;
  }
  @media (max-width: ${breakpoints.mobile}) {
    padding: 3px 5px;
    font-size: 10px;
  }
`;

export const DeleteButton = styled.div`
  background-color: red;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 14px;

  @media (max-width: ${breakpoints.desktop}) {
    padding: 4px 8px;
    font-size: 13px;
  }
  @media (max-width: ${breakpoints.tablet}) {
    padding: 3px 6px;
    font-size: 12px;
  }
  @media (max-width: ${breakpoints.mobile}) {
    padding: 3px 5px;
    font-size: 10px;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 10px;
  }
`;

export const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
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
  }
`;

export const YesButton = styled.button`
  margin: 5px;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: green;
  color: white;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    opacity: 0.8;
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
  }
`;

export const NoButton = styled.button`
  margin: 5px;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: red;
  color: white;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    opacity: 0.8;
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
  }
`;

export const ErrorText = styled.p`
  color: red;
  font-size: 12px;
  margin-top: 5px;

  @media (max-width: ${breakpoints.desktop}) {
    font-size: 11px;
  }
  @media (max-width: ${breakpoints.tablet}) {
    font-size: 10px;
  }
  @media (max-width: ${breakpoints.mobile}) {
    font-size: 9px;
    margin-top: 3px;
  }
`;

// Previous File Specific Components
export const AcademicPlanMain = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(3, 1fr);

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

export const AcademicPlanInput = styled.input`
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
    width: 90%;
    padding: 8px 12px;
    font-size: 12px;
    border-radius: 20px;
    height: auto;
  }
`;

export const AcademicPlanInput1 = styled.input`
  width: 100%;
  padding: 8px 60px;
  border: 2px solid #7d3cff;
  border-radius: 30px;
  font-size: 16px;
  color: #7a7a7a;
  background-color: #f4f6fc;
  font-weight: bold;
  outline: none;
  height: 55px;

  @media (max-width: ${breakpoints.desktop}) {
    padding: 8px 50px;
    font-size: 14px;
  }
  @media (max-width: ${breakpoints.tablet}) {
    padding: 6px 40px;
    font-size: 13px;
    height: 45px;
  }
  @media (max-width: ${breakpoints.mobile}) {
    padding: 6px 20px;
    font-size: 12px;
    height: 40px;
    border-radius: 20px;
  }
`;

export const AcademicPlanHeading = styled.div`
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

export const TableWrapper = styled.div`
  flex: 2;
  padding: 20px;

  @media (max-width: ${breakpoints.desktop}) {
    padding: 15px;
  }
  @media (max-width: ${breakpoints.tablet}) {
    padding: 12px;
  }
  @media (max-width: ${breakpoints.mobile}) {
    padding: 10px;
  }
`;

export const AcademicPlanTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
    font-size: 14px;
  }

  th {
    background-color: #f2f2f2;
  }

  @media (max-width: ${breakpoints.desktop}) {
    th, td { padding: 6px; font-size: 13px; }
  }
  @media (max-width: ${breakpoints.tablet}) {
    th, td { padding: 5px; font-size: 12px; }
  }
  @media (max-width: ${breakpoints.mobile}) {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
    th, td { padding: 4px; font-size: 10px; }
  }
`;

export const AcademicYearMain = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(3, 1fr);

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

export const AcademicYearInput = styled.input`
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
    width: 90%;
    padding: 8px 12px;
    font-size: 12px;
    border-radius: 20px;
  }
`;

export const AcademicYearSelect = styled.select`
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
    width: 100%;
    padding: 8px 12px;
    font-size: 12px;
    border-radius: 20px;
  }
`;

export const AcademicYearSubmitButton = styled.button`
  width: 320px;
  padding: 12px;
  background: #222d78;
  border: none;
  border-radius: 30px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s;
  margin-top: 20px;

  &:hover {
    background: #1c2563;
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
    width: 100%;
    padding: 10px;
    font-size: 13px;
    border-radius: 20px;
    margin-top: 12px;
  }
`;

export const AddAcademicEventMain = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(3, 1fr);

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

export const AddAcademicEventInput = styled.input`
  width: 93%;
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
    width: 90%;
    padding: 8px 12px;
    font-size: 12px;
    border-radius: 20px;
  }
`;

export const AddAcademicEventHeading = styled.div`
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
  }
`;

export const AddAcademicEventTable = styled.table`
  width: 70%;
  border-collapse: collapse;
  margin-top: 30px;

  @media (max-width: ${breakpoints.desktop}) {
    width: 80%;
  }
  @media (max-width: ${breakpoints.tablet}) {
    width: 90%;
  }
  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    display: block;
    overflow-x: auto;
    white-space: nowrap;
    margin-top: 20px;
  }
`;

export const AddAcademicEventTd1 = styled.td`
  padding: 15.8px 12px;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 14px;

  @media (max-width: ${breakpoints.desktop}) {
    padding: 12px 10px;
    font-size: 13px;
  }
  @media (max-width: ${breakpoints.tablet}) {
    padding: 10px 8px;
    gap: 0.8rem;
    font-size: 12px;
  }
  @media (max-width: ${breakpoints.mobile}) {
    padding: 8px 6px;
    gap: 0.5rem;
    font-size: 10px;
  }
`;

export const AddAcademicEventEditButton = styled.div`
  background-color: #209a16bf;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;

  @media (max-width: ${breakpoints.desktop}) {
    padding: 4px 8px;
    font-size: 13px;
  }
  @media (max-width: ${breakpoints.tablet}) {
    padding: 3px 6px;
    font-size: 12px;
  }
  @media (max-width: ${breakpoints.mobile}) {
    padding: 3px 5px;
    font-size: 10px;
  }
`;

export const AddClassMain = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  @media (max-width: ${breakpoints.desktop}) {
    gap: 15px;
  }
  @media (max-width: ${breakpoints.tablet}) {
    gap: 12px;
  }
  @media (max-width: ${breakpoints.mobile}) {
    gap: 10px;
  }
`;

export const AddClassInput = styled.input`
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
    width: 90%;
    padding: 8px 12px;
    font-size: 12px;
    border-radius: 20px;
  }
`;

export const SelectContainer = styled.div`
  width: 88%;
  cursor: pointer;

  @media (max-width: ${breakpoints.desktop}) {
    width: 90%;
  }
  @media (max-width: ${breakpoints.tablet}) {
    width: 92%;
  }
  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
  }
`;

export const Dropdown = styled.div`
  width: 100%;
  padding: 15px 20px;
  border: 2px solid #7d3cff;
  border-radius: 30px;
  font-size: 16px;
  background-color: #f4f6fc;
  font-weight: bold;
  color: #7a7a7a;

  @media (max-width: ${breakpoints.desktop}) {
    padding: 12px 18px;
    font-size: 14px;
  }
  @media (max-width: ${breakpoints.tablet}) {
    padding: 10px 15px;
    font-size: 13px;
    
  }
  @media (max-width: ${breakpoints.mobile}) {
    padding: 8px 12px;
    font-size: 12px;
    border-radius: 20px;
    width: 90%;
  }
`;

export const CheckboxContainer = styled.div`
  position: absolute;
  top: 50px;
  left: 0;
  width: 100%;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
  padding: 10px;

  @media (max-width: ${breakpoints.desktop}) {
    top: 45px;
    padding: 8px;
  }
  @media (max-width: ${breakpoints.tablet}) {
    top: 40px;
    max-height: 180px;
    padding: 6px;
  }
  @media (max-width: ${breakpoints.mobile}) {
    top: 35px;
    max-height: 150px;
    padding: 5px;
    border-radius: 8px;
  }
`;

export const Checkbox = styled.label`
  display: block;
  margin-bottom: 10px;
  font-size: 16px;

  @media (max-width: ${breakpoints.desktop}) {
    font-size: 14px;
    margin-bottom: 8px;
  }
  @media (max-width: ${breakpoints.tablet}) {
    font-size: 13px;
    margin-bottom: 6px;
  }
  @media (max-width: ${breakpoints.mobile}) {
    font-size: 12px;
    margin-bottom: 5px;
  }
`;

export const ClearButton = styled.button`
  width: 100px;
  padding: 5px;
  background-color: red;
  border: none;
  border-radius: 20px;
  color: white;
  font-size: 14px;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: darkred;
  }

  @media (max-width: ${breakpoints.desktop}) {
    width: 90px;
    font-size: 13px;
    padding: 4px;
  }
  @media (max-width: ${breakpoints.tablet}) {
    width: 80px;
    font-size: 12px;
    margin-left: 8px;
  }
  @media (max-width: ${breakpoints.mobile}) {
    width: 70px;
    padding: 3px;
    font-size: 11px;
    margin-left: 5px;
    border-radius: 15px;
  }
`;

export const AddClassEditButton = styled.div`
  background-color: #209a16bf;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  width: 20%;
  display: flex;
  justify-content: center;
  cursor: pointer;
  font-size: 14px;

  @media (max-width: ${breakpoints.desktop}) {
    padding: 4px 8px;
    font-size: 13px;
    width: 25%;
  }
  @media (max-width: ${breakpoints.tablet}) {
    padding: 3px 6px;
    font-size: 12px;
    width: 30%;
  }
  @media (max-width: ${breakpoints.mobile}) {
    padding: 3px 5px;
    font-size: 10px;
    width: 35%;
  }
`;

export const AddClassDeleteButton = styled.div`
  background-color: red;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  width: 10%;
  display: flex;
  justify-content: center;
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

export const AddDepartmentMain = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  @media (max-width: ${breakpoints.desktop}) {
    gap: 15px;
  }
  @media (max-width: ${breakpoints.tablet}) {
    gap: 12px;
  }
  @media (max-width: ${breakpoints.mobile}) {
    gap: 10px;
  }
`;

export const AddDesignationSelect = styled.select`
  width: 97%;
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
    width: 95%;
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
  }
`;

export const ActionButton = styled.div`
  background-color: ${({ color }) => color || "gray"};
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 14px;

  @media (max-width: ${breakpoints.desktop}) {
    padding: 4px 8px;
    font-size: 13px;
  }
  @media (max-width: ${breakpoints.tablet}) {
    padding: 3px 6px;
    font-size: 12px;
  }
  @media (max-width: ${breakpoints.mobile}) {
    padding: 3px 5px;
    font-size: 10px;
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

export const AddGradeMain = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  @media (max-width: ${breakpoints.desktop}) {
    gap: 15px;
  }
  @media (max-width: ${breakpoints.tablet}) {
    gap: 12px;
  }
  @media (max-width: ${breakpoints.mobile}) {
    gap: 10px;
  }
`;

// New File Specific Components
export const AddHouseMain = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: ${breakpoints.desktop}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

export const AddHouseInput1 = styled.input`
  width: 100%;
  padding: 8px 60px;
  border: 2px solid #7d3cff;
  border-radius: 30px;
  font-size: 16px;
  color: #7a7a7a;
  background-color: #f4f6fc;
  font-weight: bold;
  outline: none;
  height: 55px;

  @media (max-width: ${breakpoints.desktop}) {
    padding: 8px 50px;
    font-size: 14px;
  }
  @media (max-width: ${breakpoints.tablet}) {
    padding: 6px 40px;
    font-size: 13px;
    height: 45px;
  }
  @media (max-width: ${breakpoints.mobile}) {
    padding: 6px 20px;
    font-size: 12px;
    height: 40px;
    border-radius: 20px;
    width: 90%;
  }
`;

export const AddNoticeBoxMain = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(3, 1fr);

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

export const AddNoticeBoxTd1 = styled.td`
  padding: 15.8px 12px;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 14px;

  @media (max-width: ${breakpoints.desktop}) {
    padding: 12px 10px;
    font-size: 13px;
  }
  @media (max-width: ${breakpoints.tablet}) {
    padding: 10px 8px;
    gap: 0.8rem;
    font-size: 12px;
  }
  @media (max-width: ${breakpoints.mobile}) {
    padding: 8px 6px;
    gap: 0.5rem;
    font-size: 10px;
  }
`;

export const AddRoleMain = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  @media (max-width: ${breakpoints.desktop}) {
    gap: 15px;
  }
  @media (max-width: ${breakpoints.tablet}) {
    gap: 12px;
  }
  @media (max-width: ${breakpoints.mobile}) {
    gap: 10px;
  }
`;

export const AddRouteMain = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  @media (max-width: ${breakpoints.desktop}) {
    gap: 15px;
  }
  @media (max-width: ${breakpoints.tablet}) {
    gap: 12px;
  }
  @media (max-width: ${breakpoints.mobile}) {
    gap: 10px;
  }
`;