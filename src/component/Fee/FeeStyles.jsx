import styled from "styled-components";
import DatePicker from 'react-datepicker'; // Correct import for DatePicker

// import { useNavigate } from "react-router-dom";
export const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

export const MainDashboard = styled.div`
  flex: 1;
  height: calc(100vh - 100px);
  overflow-y: auto;
  background-color: #f9f9f9;
  padding: 20px;
  @media (max-width: 480px) {
    padding: 10px;
  }
`;
export const Title = styled.h2`
  color: #0d47a1;
  text-align: center;
  font-weight: bold;

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;
export const Form = styled.form`
width: 100%;
max-width: 1200px;
margin: 0 auto;
margin-top: 30px;
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
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;
export const FormContainer = styled.div`
padding: 20px;
border-radius: 10px;
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
    height: 10px;
    width: 80%;
    font-size: 12px;
    padding: 12px 18px;
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

  @media (max-width: 480px) {
    width: 100%;
    font-size: 12px;
    padding: 5px;
  }
`;
// export const Container = styled.div`
  
   
//   }
// `;
export const Container = styled.div`
 
 display: flex;
 justify-content: center;
  background-color: #f4f4f4;
  /* width: ${`({ isSidebarOpen }) => (isSidebarOpen ? "calc(100vw - 250px)" : "100vw")`};
   */
  width: 100%;
  @media (max-width: 768px) {
    flex-direction: column;
  /* Large Screens (Desktops) */
  @media (max-width: 1200px) {
    padding: 15px;
    justify-content:center
  }
  }


  /* Tablets */
  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 10px;
  }

  /* Mobile Devices */
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 8px;
  }

  /* Small Phones */
  @media (max-width: 480px) {
    flex-direction: column;
    padding: 5px;
    
  }
`;
export const Section = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom:15px;
  @media(max-width:768px){
flex-direction: column;
  }
`;
// export const TableContainer = styled.div`
// display: flex;
// flex-direction: column;
// justify-content: center;
// align-items: center;
// `;
// export const Table = styled.table`
//   width: 70%;
//   border-collapse: collapse;
//   margin-top: 30px;
// `;
export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto; /* ✅ Ensure scrolling works */
  display: flex;
  justify-content: center;
  align-items: center;
  
`;

export const Table = styled.table`
  width: 100%; /* ✅ 100% width le, taaki scroll properly aaye */
  min-width: 600px; /* ✅ Avoid shrinking */
  border-collapse: collapse;
  margin-top: 30px;
  /* white-space: nowrap; ✅ Prevent text wrapping */
  @media (max-width:1023px){
    margin-left: 14rem;
  }
  @media (max-width:320px){
    margin-left: 34rem;
  }
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
export const EditButton = styled.div`
  background-color: #209a16bf;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const DeleteButton = styled.div`
  background-color: red;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  width: 10%;
  display: flex;
  justify-content: center;
`;
export const ConfirmationModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
`;
export const ConfirmButton = styled.button`
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  font-weight: bold;

  &.yes {
    background-color: green;
  }

  &.no {
    background-color: red;
  }
`;
export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border-bottom: 2px solid #ccc;
  padding-bottom: 10px;
`;

export const SchoolLogo = styled.img`
  height: 50px;
`;

export const SchoolName = styled.h1`
  color: #b55700;
  font-size: 18px;
  font-weight: bold;
  margin: 5px 0;
`;

export const Address = styled.p`
  font-size: 14px;
  color: #444;
  margin: 0;
`;

export const SubHeader = styled.h2`
  font-size: 14px;
  font-weight: bold;
  margin-top: 20px;
  color: #444;
  text-align: center;
`;

export const FeeDetails = styled.div`
  font-size: 14px;
  margin: 20px 0;
`;

export const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
`;

export const DetailLabel = styled.span`
  font-weight: bold;
  color: #333;
`;

export const TableHeader = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  background-color: #f9f9f9;
  text-align: left;
  font-weight: bold;
`;

export const TableData = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
`;

export const TotalRow = styled.tr`
  font-weight: bold;
  background-color: #f2f2f2;
`;

export const Signature = styled.div`
  text-align: right;
  font-weight: bold;
  color: #333;
  margin-top: 50px;
`;

export const PrintButton = styled.button`
  padding: 10px 20px;
  background-color: #00a9ce;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  align-self: center;
  margin-top: 20px;
`;

export const StyledSelect = styled.select`
  width: 100%;
  padding: 15px 20px;
  border: 2px solid #7d3cff;
  border-radius: 30px;
  font-size: 16px;
  color: #7a7a7a;
  background-color: #f4f6fc;
  font-weight: bold;
`;


export const TableRow = styled.tr`
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
`;

export const SmallButton = styled.button`
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
export const ModalContent = styled.div`
background: white;
padding: 20px;
border-radius: 10px;
text-align: center;
`;
export const Container1 = styled.div`
flex: 1;
height: calc(100vh - 100px);
overflow-y: auto;
padding: 20px;
`;
export const Button = styled.button`
  padding: 10px 20px;
  margin-right: 10px;
  background-color: ${props => (props.primary ? "#4CAF50" : "#2196F3")};
  color: white;
  border: none;
  cursor: pointer;
  font-size: 14px;
  border-radius: 5px;
  
  &:hover {
    opacity: 0.8;
  }

  &:last-child {
    margin-right: 0;
  }
`;
export const ButtonWrapper = styled.div`
text-align: center;
margin: 20px 0;
`;
export const DateInput = styled(DatePicker)`
width: 150px;
padding: 8px;
font-size: 14px;
border-radius: 5px;
border: 1px solid #ddd;
background-color: #fff;
`;
export const DatePickerWrapper = styled.div`
display: flex;
gap: 10px;
align-items: center;
`;
export const DateRangeWrapper = styled.div`
margin-top: 10px;
`;
export const TotalPaidFee = styled.div`
text-align: center;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 18px;
`;
export const DropdownContainer = styled.div`
flex: 1;
min-width: 200px;
`;
export const DropdownWrapper = styled.div`
margin-bottom: 20px;
display: flex;
gap: 10px;
flex-wrap: wrap;
`;
export const FilterWrapper = styled.div`
margin-bottom: 20px;
`;
//Fee Receipt style 
export const AmountRow = styled.tr`
font-weight: bold;
background-color: #f5f5f5;
`;
export const AuthSign = styled.div`
  text-align: right;
  font-size: 11px;
  font-weight: bold;
`;
export const CopyLabel = styled.div`
position: absolute;
top: 5px;
right: 15px;
font-size: 13px;
font-weight: bold;
padding: 3px 8px;
border-radius: 3px;
`;
export const DetailsText = styled.div`
font-size: 11px;
`;
export const LabelDiv = styled.div`
  font-weight: bold;
  width: 50%;
  text-align: end;
`;
export const ValueDiv = styled.div`
font-weight: normal;
width: 50%;
text-align: start; 
`;
export const InfoSection = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
max-width: 300px;
margin: 0 auto;
`;
export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  font-size: 11px;
`;
export const Receipt = styled.div`
width: 400px;
border: 1px solid #2d68b1;
padding: 20px;
background-color: white;
font-family: Arial, sans-serif;
position: relative;
 @media(max-width:480px){
  width: 100%;
 }
`;
export const ReceiptWrapper = styled.div`
display: flex;
gap: 3rem;
margin: 10px 0; // Add vertical margin for spacing between receipt pairs
@media(max-width:1023px){
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  max-width: 100vw;
}
@media(max-width:480px){
  width: 84%;
}
`;
export const Row = styled.div`
display: flex;
justify-content: flex-start;
width: 100%;
margin-bottom: 0.5rem;
gap: 1.5rem;
`;
export const SectionTitle = styled.h2`
font-size: 14px;
font-weight: bold;
text-decoration: underline;
margin: 10px 0 15px;
`;
export const SubTitle = styled.p`
  margin: 0;
  font-size: 11px;
  color: #333;
`;
export const Value = styled.span`
font-weight: normal;
text-align: start;
`;
// FeeReconciliation style
export const Checkbox = styled.label`
  display: block;
  margin-bottom: 10px;
  font-size: 16px;
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
export const SelectContainer = styled.div`
width: 88%;
cursor: pointer;
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
//Fee Remaining 
export const TableData1 = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
  color: #555;
`;
export const TableRow1 = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  &:hover {
    background-color: #f1f1f1;
  }
`;
export const Table1 = styled.table`
width: 100%;
border-collapse: collapse;
margin-bottom: 20px;
border: 1px solid #ddd;
background-color: #fff;
`;
export const H2 = styled.h2`
font-size: 24px;
color: #333;
text-align: center;
`;
// Fee Slab
export const DetailModalContent = styled.div`
background: white;
padding: 20px;
border-radius: 10px;
text-align: left;
width: 50%;
`;
// Fee slip
export const FeeSlipWrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
padding: 30px;
background-color: #f4f6f9;
min-height: 100vh;
font-family: Arial, sans-serif;
`;
export const SlipContainer = styled.div`
width: 90%;
max-width: 800px;
background-color: white;
padding: 20px;
border: 1px solid #d4d4d4;
box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;
export const Head = styled.div`
text-align: center;
margin-bottom: 20px;
`;
export const Logo = styled.img`
width: 100px;
`;
export const SchoolName1 = styled.h1`
font-size: 28px;
margin: 10px 0 5px 0;
@media (max-width: 480px) {
  font-size: 10px;
}
`;
export const Subtext = styled.p`
font-size: 14px;
color: #777;
@media (max-width: 480px) {
  font-size: 10px;
}
`;
export const Title1 = styled.h2`
  font-size: 22px;
  color: #db2a2a;
  margin-top: 10px;
  @media (max-width: 480px) {
    font-size: 10px;
  }
`;
export const InfoRow = styled.div`
display: flex;
justify-content: space-between;
flex-wrap: wrap;
margin-bottom: 10px;
`;
export const InfoBlock = styled.div`
flex: 0 0 48%;
font-size: 14px;
margin-bottom: 10px;
`;
export const InfoLabel = styled.p`
  font-weight: bold;
  display: inline-block;
  margin-right: 5px;
  @media (max-width: 480px) {
    font-size: 9px;
  }
`;
export const InfoValue = styled.span`
font-weight: normal;
@media (max-width: 480px) {
  font-size: 8px;
}
`;
export const TableHeader1 = styled.th`
border: 1px solid #d4d4d4;
padding: 10px;
text-align: center;
background-color: #f9f9f9;
font-size: 14px;
font-weight: bold;
@media (max-width: 480px) {
  font-size: 6px;
}
`;
export const TotalAmount = styled.div`
text-align: right;
font-weight: bold;
margin-top: 10px;
font-size: 16px;
`;
export const Note = styled.p`
font-size: 14px;
text-align: center;
margin-top: 20px;
color: #db2a2a;
font-style: italic;
@media (max-width: 480px) {
  font-size: 10px;
}
`;
export const FeeCollectionWrapper = styled.div`
max-width: 600px;
width: 85%;
margin: 40px auto;
padding: 20px;
background-color: #f3f4f6;
border-radius: 8px;
font-family: Arial, sans-serif;
`;
export const DropdownHeader = styled.div`
width: 85%;
padding: 10px 18px;
border: 2px solid #7d3cff;
border-radius: 30px;
font-size: 16px;
color: #7a7a7a;
background-color: #f4f6fc;
font-weight: bold;
cursor: pointer;
`;
export const DropdownList = styled.div`
position: absolute;
border: 1px solid #ccc;
background-color: #fff;
z-index: 1;
width: 100%;
max-height: 200px;
overflow-y: auto;
`;
export const CheckboxLabel = styled.label`
display: block;
padding: 8px;
cursor: pointer;
&:hover {
  background-color: #f0f0f0;
}
`;
export const CheckboxInput = styled.input`
margin-right: 10px;
`;
export const InfoGrid = styled.div`
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 10px;
margin-bottom: 20px;
@media (max-width: 468px) {
  grid-template-columns: repeat(2, 1fr);
}
`;
export const InfoItem = styled.div`
display: flex;
flex-direction: column;
font-size: 14px;
width: 100%;

& > label {
  margin-bottom: 5px;
  color: #666;
  @media (max-width: 480px) {
    font-size: 12px;
  }
}

& > input {
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  @media (max-width: 480px) {
    width: 85%;
    font-size: 12px;
  }
}
`;
export const TableDetail = styled.table`
width: 100%;
border-collapse: collapse;
margin-bottom: 20px;

th,
td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
  font-size: 14px;
  @media (max-width: 480px) {
    font-size: 12px;
  }
}

th {
  background-color: #f0f0f0;
  color: #555;
  font-weight: bold;
}

tfoot td {
  font-weight: bold;
}
`;