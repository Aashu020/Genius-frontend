import styled from "styled-components";
import { Link } from "react-router-dom";



const Container = styled.div`
  display: flex;
  background-color: #f4f4f4;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const MainDashboard = styled.div`
  flex: 1;
  height: calc(100vh - 100px);
  overflow-y: auto;
  background-color: #f9f9f9;
  padding: 20px;
  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const Title = styled.h2`
  color: #0d47a1;
  text-align: center;
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
  font-weight: bold;

  @media (max-width: 480px) {
    font-size: 12px;
    height: 30px;
    width: 50%;
    margin-bottom: 30px;
    margin-top: 20px;
  }
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


const Section = styled.div`
  display: flex;
  justify-content: space-between;
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

const Label2 = styled.span`
  position: absolute;
  top: -10px;
  left: 20px;
  background: linear-gradient(270deg, #6c6c6c 0%, #525252 100%);

  color: white;
  padding: 2px 10px;
  border-radius: 20px;
  font-size: 12px;
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

const SubmitButton1 = styled.button`
  display: block;
  width: 200px;
  margin-left: auto;
  margin-right: auto;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #45a049;
  }
`;

const StepIndicatorContainer = styled.div`
  display: flex;
  justify-content: center;

  gap: 1rem;
  background-color: #f0f0f0;
  padding: 10px;
  margin-bottom: 30px;

  @media (max-width: 480px) {
    gap: 0.1rem;
  }
`;

const Step = styled(Link)`
  background-color: ${(props) => (props.active ? "#8a2be2" : "#4a0e8f")};
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 14px;
  text-decoration: none; /* Remove underline */

  @media (max-width: 480px) {
    font-size: 10px;
    padding: 7px;
    width: 40%;
  }
`;

const StepContent = styled.span`
  margin-left: 5px;
`;

const InputContainer1 = styled.div`
  position: relative;
  width: 35%;

  margin-bottom: 20px;
  datalist {
    background-color: blue;
  }
  @media (max-width: 480px) {
    margin-bottom: 12px;
  }
`;

const StyledInput = styled.input`
  width: 88%;
  padding: 12px 15px;
  border: 2px solid #7d3cff;
  border-radius: 30px;
  font-size: 16px;
  color: #7a7a7a;
  background-color: #f4f6fc;
  font-weight: bold;
`;

const SuggestionsList = styled.ul`
  position: absolute;
  z-index: 999; /* Ensure it appears above other UI elements */
  background-color: white;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); /* Adds a subtle shadow */
  border-radius: 4px; /* Rounded corners */
  margin-top: 5px; /* A little gap between the input and the dropdown */
  padding: 0; /* Remove padding to prevent unwanted spacing */
  list-style-type: none; /* Remove list bullet points */
`;

const SuggestionItem = styled.li`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f4f4f4; /* Hover effect to highlight the item */
  }
  &:active {
    background-color: #e0e0e0; /* Active state to indicate selection */
  }
`;

const SidebarContainer = styled.div`
  width: 250px;
  border-right: 1px solid #e0e0e0;
  @media (max-width: 768px) {
    display: ${(props) =>
      props.isVisible ? "block" : "none"}; /* Conditionally show/hide sidebar */
    position: ${(props) => (props.isVisible ? "absolute" : "none")};
    z-index: 10;
  }
`;
const SidebarContainer1 = styled.div`
  background-color: #fff;
  border-right: 1px solid #e0e0e0;
  padding: 10px;

  a {
    color: #fff;

    text-decoration: none;
  }
`;

const DropdownIcon = styled.span`
  margin-left: 5px;
  cursor: pointer; /* Make it clickable */
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  @media (min-width: 769px) {
    display: none;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;
const SidebarMenuTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 20px;
  text-align: left;
  padding-left: 10px;
  font-weight: 600;
  color: #2a2a2a;
`;

const MenuItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  font-size: 16px;
  font-weight: 500;
  color: ${(props) => (props.active ? "black" : "white")};
  background-color: ${(props) => (props.active ? "#fff" : "#222D78")};
  box-shadow: -1.53px 1.53px 3.07px 0px #5088ff4d inset;

  border-radius: 8px;
  margin: 5px 0;
  cursor: pointer;

  &:hover {
    background-color: #e6f0ff;
    color: black;
  }
`;

const MenuLabel = styled.div`
  display: flex;
  align-items: center;
`;

const MenuIcon = styled.div`
  font-size: 20px;
  margin-right: 10px;
`;

const PlusIcon = styled.div`
  font-size: 16px;
`;



const TableContainer = styled.div`
  margin-top: 40px;
  overflow-x: auto;
`;

const TableContainer1 = styled.div`
  font-family: Arial, sans-serif;
  margin: 20px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
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
`;

const TableHeader = styled.th`
  padding: 10px;
  background-color: #f2f2f2;
  border: 1px solid #ddd;
`;


const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
`;

const TableRow = styled.tr`
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
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
const AdmitCardContainer = styled.div`
  width: 800px;
  border: 2px solid #00bfff;
  padding: 20px;
  margin: auto;
  background-color: #ffffff;
  font-family: Arial, sans-serif;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const DownloadButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;

  &:hover {
    background-color: #45a049;
  }
`;

const Logo = styled.img`
  height: 60px;
`;

const Title1 = styled.h2`
  color: #4a4a4a;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
`;

const SchoolLogo = styled.img`
  /* width: 120px; */
  height: 120px;
  margin-right: 15px;
`;

const SchoolInfo = styled.div`
  flex: 1;
  text-align: center;
  font-size: 22px;
  color: #333;
  font-weight: bold;
  line-height: 1.2;
`;

const ContactInfo = styled.div`
  font-size: 14px;
  color: #ff4500;
  margin-top: 5px;
`;

const InfoSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #ddd;
`;

const InfoColumn = styled.div`
  width: 50%;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  font-size: 14px;
`;

const Value = styled.div`
  width: 60%;
  text-align: left;
`;

const PhotoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PhotoContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const Photo = styled.img`
  width: 115px;
  background-color: gray;
`;

const PlaceholderImage = styled.div`
  width: 80px;
  height: 80px;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888;
  font-size: 12px;
  margin-top: 10px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-around;
  padding-top: 20px;
`;

const FooterText = styled.div`
  font-size: 12px;
  color: #555;
  margin-top: 100px;
`;

const TdAction = styled.td`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  margin-bottom: 20px;
  justify-content: space-between;
`;
const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
`;

const OpenButton = styled(Button)`
  background-color: #688af6;
`;

const Table1 = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
`;
const Th = styled.th`
  background-color: #f2f2f2;
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  font-weight: 400;
`;

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const Photo1 = styled.img`
  width: 115px;
  height: 110px;
  background-color: gray;
  border-radius: 50%;
`;
const ActionButton = styled.button`
  background-color: ${(props) => props.color};
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  margin-right: 5px;
`;
const ImageCell = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
`;
const PaginationContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 10px 20px;
  border-top: 1px solid #e0e0e0;
  background-color: #fff;
`;
const PaginationInfo = styled.div`
  display: flex;
  align-items: center;
  color: #888;
`;
const PaginationButton = styled.button`
  background-color: #fff;
  color: ${(props) => (props.disabled ? "#ccc" : "#000")};
  border: none;
  padding: 5px 15px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  font-size: 14px;

  &:hover {
    background-color: ${(props) => (props.disabled ? "#fff" : "#f0f0f0")};
  }
`;

const RowsPerPageDropdown = styled.select`
  margin: 0 10px;
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  font-size: 14px;
  cursor: pointer;
`;
const SearchContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 10px 0;
`;
const ButtonSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  gap: 0.5px;
  button {
    border: none;
    background: transparent;
    font-size: 25px;
    padding: 5px;
  }
`;
const SearchInput = styled.input`
  margin: 8px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 200px;
`;

const FileInput = styled.input`
  margin-bottom: 20px;
  display: block;
  width: 200px;
  margin-left: auto;
  margin-right: auto;
`;
const CellContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const ResponseContainer = styled.div`
  margin-top: 20px;
  text-align: center;
`;
const AdmissionLetterContainer = styled.div`
  width: 1000px;
  padding: 20px;
  border: 1px solid #ccc;
  font-family: Arial, sans-serif;
`;

const Section2 = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;
const Section1 = styled.div`
  /* display: flex;
  justify-content: space-between; */
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-bottom: 20px;
  gap: 1rem;
`;
const Left = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
`;

const LeftColumn = styled.div`
  width: 100%;
`;

const RightColumn = styled.div`
  width: 48%;
`;
const Labelviewstud = styled.p`
  margin: 0;
  font-size: 14px;
  color: #555;
  font-weight: bold;

  border-bottom: 0.5px solid black;
  width: 60%;
`;
const Valuevs= styled.p`
  margin: 0;
  font-size: 14px;
  color: black;
  font-weight: bold;
  margin-bottom: 10px;
`;
const QRCodesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const QRCode = styled.img`
  width: 80px;
  height: 80px;
  margin: 5px 0;
`;
export{
  Container,ButtonGroup,Button,OpenButton,Table1,Th,Td,
  StyledInput,Photo1,PaginationContainer,PaginationInfo,
  SuggestionsList,PaginationButton,RowsPerPageDropdown,
  SuggestionItem,SearchContainer,ButtonSection,SearchInput,
  MainDashboard,ActionButton,FileInput,SubmitButton1,
  SubmitButton,ImageCell,CellContent,ResponseContainer,
  StepContent,AdmissionLetterContainer,Section1,Section2,
  Section,RightColumn,Left,LeftColumn,Labelviewstud,
  InputContainer1,Valuevs,QRCodesContainer,QRCode,
  Step,
  StepIndicatorContainer,
  Select,
  Title,
  Form,
  Heading,
  Main,
  FormContainer,
  InputContainer,
  Label,
  Input,
  Label2,
  PlusIcon,
  MenuIcon,
  MenuLabel,
  MenuItem,
  SidebarMenuTitle,
  DropdownIcon,
  SidebarContainer1,
  SidebarContainer,TableContainer,Table,TableHeader,TableCell,
  TableRow,SmallButton,AdmitCardContainer,DownloadButton,Logo,
  Title1,Header,SchoolLogo,SchoolInfo,ContactInfo,InfoSection,
  InfoColumn,InfoRow,Value,PhotoSection,PhotoContainer,Photo,
  PlaceholderImage,Footer,FooterText,TdAction,TableContainer1,
};