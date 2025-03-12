import styled from "styled-components";

const Main = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
`;
const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Main1 = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr;
  margin-top: 50px;
`;
const Table = styled.table`
  width: 60%;
  border-collapse: collapse;
  margin-top: 30px;
`;
const Td1 = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  display: flex;
  gap: 1rem;
`;
const EditButton = styled.div`
  background-color: #209a16bf;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  width: fit-content;
  display: flex;
  justify-content: center;
  cursor: pointer;
`;
const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;

const DeleteButton = styled.div`
  background-color: red;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  width: 10%;
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

const ViewButton = styled.div`
  background-color: #2c3e50;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProgressContainer = styled.div`
  width: 50%;
  margin-bottom: 20px;
  margin-top: 30px;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  h2 {
    margin-bottom: 15px;
    font-size: 20px;
    color: #0d47a1;
  }
`;

const ProgressBar = styled.div`
  margin-bottom: 20px;
`;

const SubjectName = styled.div`
  font-size: 16px;
  color: #1a237e;
  margin-bottom: 5px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Progress = styled.div`
  background-color: #e3f2fd;
  border-radius: 10px;
  overflow: hidden;
  height: 8px;
`;

const ProgressInner = styled.div`
  height: 100%;
  width: ${(props) => props.width}%;
  background-color: #0d47a1;
`;
const SelectContainer = styled.div`
  width: 88%;
  cursor: pointer;
`;
const Dropdown = styled.div`
  width: 100%;
  padding: 15px 20px;
  border: 2px solid #7d3cff;
  border-radius: 30px;
  font-size: 16px;
  background-color: #f4f6fc;
  font-weight: bold;
  color: #7a7a7a;
`;

const CheckboxContainer = styled.div`
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
`;

const Checkbox = styled.label`
  display: block;
  margin-bottom: 10px;
  font-size: 16px;
`;

const ClearButton = styled.button`
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
  z-index: 1;
`;
const Button = styled.button`
  background: linear-gradient(270deg, #222d78 0%, #7130e4 100%);
  padding: 12px 20px;
  margin: 10px;
  color: white;
  font-size: 20px;
  border: none;
  border-radius: 50%;
  margin-left: 20px;
`;
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f3f3f3;
`;
const Frame = styled.iframe`
  width: 80%;
  height: 90vh;
  border: none;
`;
const TimetableWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
`;
const Td = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
`;
const Th = styled.th`
  background-color: #0073e6;
  color: white;
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
  font-weight: bold;
`;
const Heading1 = styled.h2`
  text-align: center;
  margin-top: 20px;
`;
const ModalOverlay = styled.div`
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
`;
const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
`;
const YesButton = styled.button`
  margin: 5px;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: green;
  color: white;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;
const NoButton = styled.button`
  margin: 5px;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: red;
  color: white;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const TableItem = styled.div`
  background-color: #e0e0e0;
  padding: 10px;
  text-align: center;
  border-radius: 5px;
  font-size: 12px;
  font-weight: bold;
  @media (max-width: 480px) {
    font-size: 8px;
    padding: 5px;
  }
`;

const TableItem1 = styled.div`
  background-color: #64b5f6;
  padding: 10px;
  text-align: center;
  border-radius: 5px;
  font-size: 10px;
  font-weight: bold;
  color: white;
  @media (max-width: 480px) {
    font-size: 8px;
    padding: 5px;
  }
`;
const TableWrapper = styled.div`
  width: 100%;
  margin: auto;
  margin-top: 20px;
  @media (max-width: 480px) {
    width: 100%;
    margin: 0;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  h2 {
    font-size: 20px;
    margin-right: 20px;
  }
`;
const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
const DropdownWrapper = styled.div`
  display: flex;
  gap: 10px;

  select {
    padding: 4px;
    font-size: 16px;
    border-radius: 10px;
  }

  @media (max-width: 480px) {
    margin-top: 10px;
    select {
      font-size: 10px;
    }
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
const Table1 = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background-color: #fff;
  grid-gap: 2px;
  justify-content: center;
  align-items: center;
  width: 100%;
  @media (max-width: 480px) {
    grid-template-columns: repeat(7, 1fr);
    font-size: 6px;
  }
`;
const TableHeader = styled.div`
  background-color: #64b5f6;
  text-align: center;
  padding: 10px;
  font-weight: bold;
  border-radius: 5px;
  color: white;
font-size: 12px;
  @media (max-width: 480px) {
    padding: 5px;
  }
`;
const TimetableContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.numColumns}, 1fr);
  gap: 1px;
  border: 1px solid #ccc;
  background-color: #e0e0e0;
  width: 80%;
  margin: 2rem 0;
`;
const Header = styled.div`
  grid-column: span ${props => props.numColumns};
  background-color: #6da8e5;
  color: white;
  font-weight: bold;
  text-align: center;
  padding: 10px;
  font-size: 1.2em;
`;
const RowHeader = styled.div`
  background-color: #d1d1d1;
  color: black;
  font-weight: bold;
  text-align: center;
  padding: 8px;
`;

const SubjectCell = styled.div`
  text-align: center;
  padding: 8px;
  color: black;
  font-weight: bold;
`;

const PeriodCell = styled.div`
  text-align: center;
  padding: 8px;
  font-weight: ${props => (props.bold ? 'bold' : 'normal')};
`;
const ConfirmationModal = styled.div`
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
`;
const ConfirmButton = styled.button`
  margin: 0 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &.yes {
    background-color: green;
    color: white;
  }
  &.no {
    background-color: red;
    color: white;
  }
`;
const Table100 = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 30px;
`;
const Title = styled.h2`
    text-align: center;
`;
const Input = styled.input`
    display: block;
    width: 80%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
`;
const Select = styled.select`
    display: block;
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
`;
const Buttonbg = styled.button`
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    background-color: #28a745;
    color: white;
    cursor: pointer;
    width: 100%;
    margin-top: 10px;

    &:hover {
        background-color: #218838;
    }
`;
const TimeTable = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 10px;
    margin-top: 20px;
`;
const TimeTableHeader = styled.div`
    font-weight: bold;
    background-color: #f2f2f2;
    text-align: center;
    padding: 10px;
    border: 1px solid #ddd;
`;
const TimeTableCell = styled.div`
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
    display: flex;
    flex-direction: column;
`;
const SubjectInput = styled(Input)`
    margin: 5px 0;
`;
export{
    Main,TableContainer,ConfirmationModal,Table,Td1,EditButton,ErrorMessage,DeleteButton,
    ProgressContainer,ProgressBar,SubjectName,Progress,ProgressInner,
    SelectContainer,ClearButton,Checkbox,CheckboxContainer,Dropdown,Main1,
    Label,Button,Container,Frame,TimetableWrapper,Td,Th,Heading1,ViewButton,
    ModalOverlay,ModalContent,YesButton,NoButton,TableWrapper,HeaderWrapper,
    DropdownWrapper,InputContainer,Table1,TableHeader,TimetableContainer,Table100,
    Header,RowHeader,SubjectCell,PeriodCell,Title,TableItem,TableItem1,
    ConfirmButton,Input,Select,Buttonbg,TimeTable,TimeTableHeader,TimeTableCell,
    SubjectInput,
}