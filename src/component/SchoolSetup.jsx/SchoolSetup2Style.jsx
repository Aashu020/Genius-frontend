import styled from "styled-components";

// Common Styled Components Across Files
export const Container = styled.div`
  display: flex; /* From AddSection, Setup */
  background-color: #f4f4f4; /* From AddSection, Setup */
  /* SubjectWise uses different styles: padding: 20px; background-color: #f5f5f5; min-height: 100vh; margin-top: 60px; */
`;

export const MainDashboard = styled.div`
  flex: 1;
  padding: 20px;
  height: calc(100vh - 100px); /* From AddSection, DateSheet */
  overflow-y: auto; /* From AddSection, DateSheet */
  background-color: #f9f9f9;
  /* Setup omits height/overflow but keeps background */
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

export const Section = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const FormContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  height: 88vh; /* From Setup */
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
  width: 88%; /* Adjusted from SubjectWise, Setup */
  padding: 15px 20px;
  border: 2px solid #7d3cff;
  border-radius: 30px;
  font-size: 16px;
  color: #7a7a7a;
  background-color: #f4f6fc;
  font-weight: bold;
  outline: none;
  @media (max-width: 1024px) {
    width: 80%; /* From DateSheet 1 */
  }
  @media (max-width: 480px) {
    height: 10px;
    width: 80%;
    font-size: 12px;
    padding: 12px 18px;
  }
`;

export const Input2 = styled.input`
  width: 80%;
  padding: 8px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: center;
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
    height: 38px;
    width: 94%;
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
  @media (max-width: 768px) {
    width: 100%;
    font-size: 12px;
    padding: 5px;
  }
`;

export const TableContainer = styled.div`
  display: flex; /* From AddSection */
  flex-direction: column; /* From AddSection */
  justify-content: center; /* From AddSection */
  align-items: center; /* From AddSection */
  overflow-x: auto; /* From SubjectWise */
`;

export const Table = styled.table`
  width: 100%; /* Adjusted from SubjectWise, DateSheet 2 */
  border-collapse: collapse;
  margin-top: 30px; /* From AddSection */
  background-color: #fff; /* From SubjectWise */
  text-align: center; /* From SubjectWise, DateSheet 2 */
`;

export const Th = styled.th`
  padding: 12px;
  text-align: left; /* From AddSection */
  border-bottom: 1px solid #ccc; /* From SubjectWise */
  background-color: #f0f0f0; /* From SubjectWise */
  text-align: center; /* From SubjectWise */
`;

export const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ccc; /* From SubjectWise */
  text-align: center; /* From SubjectWise */
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
  width: 40%; /* From AddSection, overridden in DateSheet 1 as 18% */
`;

export const DeleteButton = styled.div`
  background-color: red;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  display: flex;
  justify-content: center;
  width: 10%; /* From SubjectWise, differs from AddSection (20%) and DateSheet 1 (18%) */
  cursor: pointer;
`;

export const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 5px;
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
  grid-template-columns: repeat(3, 1fr); /* From DateSheet 1, SubjectWise, Setup */
  gap: 20px;
  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr); /* From DateSheet 1, Setup */
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr; /* From DateSheet 1, Setup, AddSection */
  }
`;

// AddSection Specific Styles
// (Already included: Container, Main)

// DateSheet (First Version) Specific Styles
export const HomeworkTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 40px;
`;

export const Td1 = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  display: flex;
  gap: 1rem;
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

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
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
`;

// DateSheet (Second Version) Specific Styles
export const Wrapper = styled.div`
  background-color: white;
  padding: 20px;
  margin-top: 50px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const Header = styled.h1`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const SubHeader = styled.h2`
  text-align: center;
  color: red;
  font-size: 20px;
  margin-bottom: 20px;
`;

export const TableHeader = styled.th`
  background-color: #ffeb3b;
  font-weight: bold;
  padding: 8px;
  border: 1px solid #000;
`;

export const TableRow = styled.tr`
  border: 1px solid #000;
`;

export const TableData = styled.td`
  padding: 8px;
  border: 1px solid #000;
`;

export const FooterNote = styled.div`
  font-size: 12px;
  margin-top: 20px;
  text-align: left;
`;

export const PrincipalSign = styled.div`
  margin-top: 30px;
  font-size: 14px;
  text-align: right;
`;

export const Dropdown = styled.select`
  padding: 10px;
  margin: 20px auto;
  display: block;
  border-radius: 5px;
  font-size: 16px;
  width: 200px;
`;

// SubjectWise Specific Styles
export const Title2 = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #2c2c6c;
  margin-bottom: 20px;
`;

export const HeaderItem = styled.div`
  margin-right: 20px;
  & span {
    font-weight: bold;
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
`;