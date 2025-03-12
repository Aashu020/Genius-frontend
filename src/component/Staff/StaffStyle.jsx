// StyledComponents.js
import styled from "styled-components";
import Card from "../../assets/Images/IdCard.png"; // Import the image for IdCard

// Main content area (merged from multiple files)
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

// Container for layout (merged from StaffBulkUpload, AddStaff, ViewStaff)
export const Container = styled.div`
  height: calc(100vh - 100px); /* From ViewStaff */
  overflow-y: auto;
  padding: 20px; /* From StaffBulkUpload */
  max-width: 1200px; /* From StaffBulkUpload */
  margin: 0 auto;
  display: flex; /* From AddStaff */
  background-color: #f4f4f4; /* From AddStaff */
  @media (max-width: 768px) {
    flex-direction: column; /* From AddStaff */
  }
`;

// Flex column wrapper for page content (from IdCard/OfferLetter)
export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

// Header for page titles (from IdCard/OfferLetter/ViewStaff)
export const Header = styled.div` 
  color: #222d78; /* From IdCard/OfferLetter */
  font-weight: bold;
  font-size: 24px; /* From IdCard/OfferLetter */
  margin-bottom: 20px;
  text-align: center; /* From ViewStaff */
`;

// Page title (from multiple files)
export const Title = styled.h2`
  color: #0d47a1; /* From multiple files */
  text-align: center;
  font-weight: bold;
`;

// Alternative title for ViewStaff
export const ViewTitle = styled.h2`
  color: #4a4a4a; /* From ViewStaff */
`;

// Alternative title for StaffBulkUpload
export const BulkTitle = styled.h1`
  text-align: center; /* From StaffBulkUpload */
`;

// Search bar input (from IdCard/OfferLetter)
export const SearchBar = styled.input`
  width: 50%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 25px;
  margin-bottom: 20px;
  font-size: 16px;
  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

// Generic button with gradient (from IdCard/OfferLetter)
export const GradientButton = styled.button`
  background: ${props => props.background || "linear-gradient(270deg, #222d78 0%, #7130e4 100%)"};
  width: ${props => props.width || "30%"};
  color: #fff;
  padding: ${props => props.padding || "12px 24px"};
  border: none;
  border-radius: 30px;
  font-size: 16px;
  margin: ${props => props.margin || "10px"};
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s;
  display: block;
  margin-left: auto;
  margin-right: auto;
  &:hover {
    background: ${props => props.hoverBackground || "linear-gradient(270deg, #1c2563 0%, #662acc 100%)"};
  }
  @media (max-width: 480px) {
    width: ${props => props.mobileWidth || "50%"};
    padding: 10px 6px;
    font-size: 12px;
  }
`;

// Container for buttons (from IdCard/OfferLetter)
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  width: 90%;
`;

// Wrapper for IdCard image (specific to IdCard.jsx)
export const IdCardWrapper = styled.img`
  background-color: #fff;
  width: 600px;
  height: 500px;
  background-image: url(${Card});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 30px;
  @media (max-width: 480px) {
    width: 245px;
    background-size: cover;
    border-radius: 0px;
    height: 165px;
  }
`;

// Wrapper for OfferLetter content (specific to OfferLetter.jsx)
export const OfferLetterWrapper = styled.div`
  background-color: #fff;
  padding: 30px;
  width: 80%;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 30px;
`;

// Header section for OfferLetter (from OfferLetter.jsx)
export const OfferLetterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

// Section title for OfferLetter (from OfferLetter.jsx)
export const SectionTitle = styled.h2`
  color: #624ef2;
  font-size: 20px;
  margin-bottom: 20px;
`;

// Paragraph text for OfferLetter (from OfferLetter.jsx)
export const ContentText = styled.p`
  color: #333;
  font-size: 16px;
  line-height: 1.6;
  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

// Form container with shadow and padding (from multiple files)
export const FormContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  @media (max-width: 480px) {
    padding: 10px;
  }
`;

// Form styling (from multiple files)
export const Form = styled.form`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

// Section heading with gradient background (from multiple files)
export const Heading = styled.div`
  width: 30%;
  background: linear-gradient(270deg, #222d78 0%, #7130e4 100%);
  color: white;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  margin-bottom: ${props => props.marginBottom || "40px"};
  font-weight: bold;
  @media (max-width: 768px) {
    width: 35%;
  }
  @media (max-width: 480px) {
    font-size: 12px;
    height: 30px;
    width: 50%;
    margin-bottom: 30px;
    margin-top: 20px;
  }
`;

// Grid layout for form sections (from multiple files)
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

// Container for input fields (from multiple files)
export const InputContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 20px;
  @media (max-width: 480px) {
    margin-bottom: 12px;
  }
`;

// Alternative input container with specific width (from EditStaff)
export const InputContainer1 = styled.div`
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

// Primary label with gradient background (from multiple files)
export const Label = styled.p` 
  position: absolute; /* From multiple files */
  top: -10px; /* From multiple files */
  left: 20px; /* From multiple files */
  background: linear-gradient(270deg, #222d78 0%, #7130e4 100%); /* From multiple files */
  color: white; /* From multiple files */
  padding: 2px 10px; /* From multiple files */
  border-radius: 20px; /* From multiple files */
  font-size: 12px; /* From multiple files */
  margin: 0; /* From ViewStaff */
  font-weight: bold; /* From ViewStaff */
  border-bottom: ${props => props.borderBottom || "none"}; /* Added for ViewStaff */
  width: ${props => props.width || "auto"}; /* Added for ViewStaff */
`;

// Secondary label with different gradient (from multiple files)
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

// Text input field (from multiple files)
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

// Styled input variant (from EditStaff)
export const StyledInput = styled.input`
  width: 88%;
  padding: 12px 15px;
  border: 2px solid #7d3cff;
  border-radius: 30px;
  font-size: 16px;
  color: #7a7a7a;
  background-color: #f4f6fc;
  font-weight: bold;
`;

// File input field (from StaffBulkUpload)
export const FileInput = styled.input`
  margin-bottom: 20px;
  display: block;
  width: 200px;
  margin-left: auto;
  margin-right: auto;
`;

// Dropdown select field (from multiple files)
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

// Submit button (from multiple files including StaffBulkUpload)
export const SubmitButton = styled.button`
  width: ${props => props.width || "320px"}; /* Default from multiple files */
  padding: ${props => props.padding || "12px"}; /* Default from multiple files */
  background: ${props => props.background || "linear-gradient(270deg, #222d78 0%, #7130e4 100%)"}; /* Default from multiple files */
  border: none;
  border-radius: 30px; /* From multiple files */
  color: white;
  font-size: 16px; /* From multiple files */
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s; /* From multiple files */
  margin-top: 20px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  &:hover {
    background: ${props => props.hoverBackground || "linear-gradient(270deg, #1c2563 0%, #662acc 100%)"}; /* From multiple files */
  }
  @media (max-width: 768px) {
    width: 100%;
    font-size: 12px;
    padding: 5px;
  }
`;

// Step indicator container (from multiple files)
export const StepIndicatorContainer = styled.div`
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

// Individual step indicator (merged from AddStaff/EditStaff/StaffDocument)
export const Step = styled.div`
  background-color: ${(props) => (props.active ? "#8a2be2" : "#4a0e8f")};
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 14px;
  text-decoration: none; /* From EditStaff where it was a Link */
  @media (max-width: 480px) {
    font-size: 10px;
    padding: 7px;
    width: 40%;
  }
`;

// Step text content (from multiple files)
export const StepContent = styled.span`
  margin-left: 5px;
`;

// Suggestions list for autocomplete (from EditStaff)
export const SuggestionsList = styled.ul`
  position: absolute;
  z-index: 999;
  background-color: white;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
`;

// Suggestion item (from EditStaff)
export const SuggestionItem = styled.li`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f4f4f4;
  }
`;

// Section container (from EditStaff)
export const Section = styled.div`
  display: flex;
  justify-content: space-between;
`;

// Checkbox container (from StaffDocument)
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

// Checkbox label (from StaffDocument)
export const Checkbox = styled.label`
  display: block;
  margin-bottom: 10px;
  font-size: 16px;
`;

// Clear button (from StaffDocument)
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

// Admission letter container (from ViewStaff)
export const AdmissionLetterContainer = styled.div`
  width: 1000px;
  padding: 20px;
  border: 1px solid #ccc;
  font-family: Arial, sans-serif;
`;

// Section 1 grid (from ViewStaff)
export const Section1 = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-bottom: 20px;
  gap: 1rem;
`;

// Section 2 flex (from ViewStaff)
export const Section2 = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

// Left column (from ViewStaff)
export const LeftColumn = styled.div`
  width: 100%;
`;

// Value text (from ViewStaff)
export const Value = styled.p`
  margin: 0;
  font-size: 14px;
  color: black;
  font-weight: bold;
  margin-bottom: 10px;
`;

// Photo container (from ViewStaff)
export const PhotoContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

// Photo (merged from AllStaff/ViewStaff)
export const Photo = styled.img`
  width: 115px;
  height: 110px;
  background-color: gray;
  border-radius: 50%;
`;

// QR codes container (from ViewStaff)
export const QRCodesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

// QR code image (from ViewStaff)
export const QRCode = styled.img`
  width: 80px;
  height: 80px;
  margin: 5px 0;
`;

// Logo image (from ViewStaff)
export const Logo = styled.img`
  height: 60px;
`;

// Table container with scroll (from StaffBulkUpload/AllStaff)
export const TableContainer = styled.div`
  max-height: 500px;
  overflow-y: auto;
  font-family: Arial, sans-serif; /* From AllStaff */
  margin: 20px; /* From AllStaff */
  background-color: #fff; /* From AllStaff */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* From AllStaff */
  border-radius: 10px; /* From AllStaff */
`;

// Table for data display (from StaffBulkUpload/AllStaff)
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 13px; /* From AllStaff */
`;

// Table header (from StaffBulkUpload/AllStaff)
export const Th = styled.th`
  padding: 10px;
  text-align: left;
  background-color: #f2f2f2; /* From AllStaff */
  border-bottom: 1px solid #ddd; /* From AllStaff */
  border: 1px solid #ddd; /* From StaffBulkUpload */
`;

// Table cell (from StaffBulkUpload/AllStaff)
export const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd; /* From AllStaff */
  border: 1px solid #ddd; /* From StaffBulkUpload */
`;

// Secondary table cell (from AllStaff)
export const Td1 = styled.td`
  padding: 5px;
  border-bottom: 1px solid #ddd;
  margin: 0.5rem;
`;

// Response container (from StaffBulkUpload)
export const ResponseContainer = styled.div`
  margin-top: 20px;
  text-align: center;
`;

// Cell content for nested data (from StaffBulkUpload)
export const CellContent = styled.div`
  display: flex;
  flex-direction: column;
`;

// Button group (from AllStaff)
export const ButtonGroup = styled.div`
  display: flex;
  margin: 20px;
  justify-content: space-between;
`;

// Generic button (from AllStaff)
export const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  width: 20%;
`;

// Open button (specific style from AllStaff)
export const OpenButton = styled(Button)`
  background-color: #688af6;
`;

// Edit button (from AllStaff)
export const EditButton = styled.div`
  background-color: #209a16bf;
  padding: 5px 10px;
  font-size: 14px;
  border-radius: 5px;
  color: white;
  width: 40%;
  display: flex;
  justify-content: center;
  margin: 0.5rem;
`;

// Delete button (from AllStaff)
export const DeleteButton = styled.div`
  background-color: red;
  padding: 5px 10px;
  font-size: 14px;
  border-radius: 5px;
  color: white;
  width: 40%;
  display: flex;
  justify-content: center;
  margin: 0.5rem;
`;

// Status button (from AllStaff)
export const StatusButton = styled.button`
  background-color: #ebedeb;
  color: black;
  border: none;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 10px;
`;

// Action button (from AllStaff)
export const ActionButton = styled.button`
  background-color: ${(props) => props.color};
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  margin-right: 5px;
`;

// Pagination container (from AllStaff)
export const PaginationContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 10px 20px;
  border-top: 1px solid #e0e0e0;
  background-color: #fff;
`;

// Pagination info (from AllStaff)
export const PaginationInfo = styled.div`
  display: flex;
  align-items: center;
  color: #888;
`;

// Pagination button (from AllStaff)
export const PaginationButton = styled.button`
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

// Rows per page dropdown (from AllStaff)
export const RowsPerPageDropdown = styled.select`
  margin: 0 10px;
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  font-size: 14px;
  cursor: pointer;
`;

// Search container (from AllStaff)
export const SearchContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 10px 0;
`;

// Button section (from AllStaff)
export const ButtonSection = styled.div`
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

// Search input (from AllStaff)
export const SearchInput = styled.input`
  margin: 10px;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 200px;
`;