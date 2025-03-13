import styled from "styled-components";

export const Main = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
`;

export const Main1 = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr;
  margin-top: 50px;
`;

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f3f3f3;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Container2 = styled.div`
  display: flex;
  background-color: #f4f4f4;
  width: calc(100vw - 250px);
`;

export const MainDashboard = styled.div`
  flex: 1;
  padding: 50px;
  height: calc(100vh - 100px);
  background-color: #f9f9f9;
`;

export const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-height: 500px;
  overflow-y: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 30px;
  @media (max-width:480px){
  margin-top:80px
  }
`;

export const Table100 = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 30px;
`;

export const Td = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
`;

export const Td1 = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  display: flex;
  gap: 1rem;
`;

export const Th = styled.th`
  padding: 10px;
  text-align: left;
  background-color: #f4f4f4;
  border: 1px solid #ddd;
`;

export const EditButton = styled.div`
  background-color: #209a16bf;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  width: fit-content;
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

export const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 5px;
  text-align: center; /* Merged from SyllabusStudent.jsx */
`;

export const DeleteButton = styled.div`
  background-color: red;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  width: 10%;
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

export const ViewButton = styled.div`
  background-color: #2c3e50;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ProgressContainer = styled.div`
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

export const ProgressBar = styled.div`
  margin-bottom: 20px;
`;

export const SubjectName = styled.div`
  font-size: 16px;
  color: #1a237e;
  margin-bottom: 5px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const Progress = styled.div`
  background-color: #e3f2fd;
  border-radius: 10px;
  overflow: hidden;
  height: 8px;
`;

export const ProgressInner = styled.div`
  height: 100%;
  width: ${(props) => props.width}%;
  background-color: #0d47a1;
`;

export const SelectContainer = styled.div`
  width: 88%;
  cursor: pointer;
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
`;

export const Checkbox = styled.label`
  display: block;
  margin-bottom: 10px;
  font-size: 16px;
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
  z-index: 1;
`;

export const Button = styled.button`
  background: linear-gradient(270deg, #222d78 0%, #7130e4 100%);
  padding: 12px 20px;
  margin: 10px;
  color: white;
  font-size: 20px;
  border: none;
  border-radius: 50%;
  margin-left: 20px;
  @media (max-width:480px){
  height:1.5rem;
  width:fit-content;
  padding:0.5rem;
  font-size:13px;
  display:flex;
  justify-content:center;
  align-items:center;
  }
`;

export const Frame = styled.iframe`
  width: 80%;
  height: 90vh;
  border: none;
`;

export const TimetableWrapper = styled.div`
  width: 100%;
  // margin: 0 auto;
  @media (max-width:480px){
    width:90%;
    padding:1rem;

  }
`;

export const Heading1 = styled.h2`
  text-align: center;
  margin-top: 20px;
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
`;

export const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

export const YesButton = styled.button`
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

export const NoButton = styled.button`
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

export const TableItem = styled.div`
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

export const TableItem1 = styled.div`
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

export const TableWrapper = styled.div`
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

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const DropdownWrapper = styled.div`
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

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 20px;

  @media (max-width: 480px) {
    margin-bottom: 12px;
  }
`;

export const Table1 = styled.div`
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
    margin-top:10rem;
  }
     @media (min-width: 481px) {
    grid-template-columns: repeat(7, 1fr);
    font-size: 6px;
    margin-top:20rem;
  }
`;

export const TableHeader = styled.div`
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

export const TimetableContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.numColumns}, 1fr);
  gap: 1px;
  border: 1px solid #ccc;
  background-color: #e0e0e0;
  width: 80%;
  margin: 2rem 0;
  @media (max-width:480px){
    margin:1rem 0 ;
    width:100%;
  }
`;

export const Header = styled.div`
  grid-column: span ${(props) => props.numColumns};
  background-color: #6da8e5;
  color: white;
  font-weight: bold;
  text-align: center;
  padding: 10px;
  font-size: 1.2em;
`;

export const RowHeader = styled.div`
  background-color: #d1d1d1;
  color: black;
  font-weight: bold;
  text-align: center;
  padding: 9px;
`;

export const SubjectCell = styled.div`
  text-align: center;
  padding: 8px;
  color: black;
  font-weight: bold;
`;

export const PeriodCell = styled.div`
  text-align: center;
  padding: 8px;
  font-weight: ${(props) => (props.bold ? "bold" : "normal")};
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
  z-index: 1000;
`;

export const ConfirmButton = styled.button`
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

export const Title = styled.h2`
  text-align: center;
  color: #1f1f1f; /* From SyllabusStudent.jsx */
  font-size: 24px; /* From SyllabusStudent.jsx */
  font-weight: 600; /* From SyllabusStudent.jsx */
  margin-bottom: 20px; /* From SyllabusStudent.jsx */
`;

export const Input = styled.input`
  display: block;
  width: 80%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  @media (max-width:480px){
    width:fit-content;
    padding: 0.4rem 0;
  }
`;

export const Select = styled.select`
  display: block;
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  @media (max-width:480px){
    width:fit-content;
  }
  @media (min-width:481px){
    width:fit-content;
  }
`;

export const Buttonbg = styled.button`
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

export const TimeTable = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
  margin-top: 20px;
`;

export const TimeTableHeader = styled.div`
  font-weight: bold;
  background-color: #f2f2f2;
  text-align: center;
  padding: 10px;
  border: 1px solid #ddd;
  @media (max-width:480px){
    width:100%;
  }
`;

export const TimeTableCell = styled.div`
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  @media (max-width:480px){
    width:90%;
    padding:10px;
  }
`;

export const SubjectInput = styled(Input)`
  margin: 5px 0;
`;

// New components from SyllabusStudent.jsx
export const ClassDetails = styled.div`
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  height:70vh;
  overflow-y:auto;
  scrollbar-width: none;
   @media (max-width: 480px) {
    width: 100%;
    margin-left:-2rem;
     height:60vh;
  } 
     @media (min-width: 767px) {
    width: 100%;
    margin-left:-2rem;
     height:65vh;
  } 
     @media (min-width: 1024px) {
    width: 100%;
    margin-left:-2rem;
     height:75vh;
  } 
`;

export const Section = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #3e3e3e;
`;

export const SubjectList = styled.div`
  margin-top: 40px;
`;

export const SubjectItem = styled.div`
  margin-bottom: 30px;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const SubjectTitle = styled.h4`
  color: #5a3eff;
  font-size: 22px;
  margin-bottom: 15px;
  font-weight: 600;
`;

export const SyllabusList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export const SyllabusItem = styled.li`
  margin-bottom: 15px;
`;

export const SyllabusTitle = styled.p`
  font-weight: bold;
  color: #333;
  font-size: 18px;
  margin-bottom: 10px;
`;

export const TopicList = styled.ul`
  list-style-type: none;
  padding-left: 20px;
`;

export const TopicItem = styled.li`
  color: #666;
  font-size: 16px;
  margin-bottom: 5px;
`;

export const LoadingMessage = styled.div`
  text-align: center;
  font-size: 18px;
  color: #333;
  margin-top: 20px;
`;