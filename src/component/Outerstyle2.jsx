import styled from 'styled-components';
import DatePicker from 'react-datepicker';

// Common Styles
export const Container = styled.div`
  width: 100%;
  font-family: Arial, sans-serif;
  padding: 20px;
  background-color: #f4f6f9;
  @media (max-width: 480px) {
    padding: 10px;
  }
`;

export const Heading = styled.h2`
  font-size: 24px;
  color: #333;
  text-align: center;
  font-weight: bold;
  margin-bottom: 2rem;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  border: 1px solid #ddd;
  background-color: #fff;
`;

export const TableHeader = styled.th`
  padding: 10px;
  text-align: left;
  background-color: #f2f2f2;
  color: #333;
  border: 1px solid #ddd;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
  &:hover {
    background-color: #f1f1f1;
  }
`;

export const TableData = styled.td`
  padding: 8px;
  border: 1px solid #ddd;
  color: #555;
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

// LoginForm Styles
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

export const Form = styled.form`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
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

export const FormInput = styled.input`
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

export const FormContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  @media (max-width: 480px) {
    padding: 10px;
  }
`;

export const TableContainer = styled.div`
  margin-top: 40px;
  padding: 10px;
  max-width: 900px;
  height: 550px;
  overflow-y: auto;
  margin-left: auto;
  margin-right: auto;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

export const EditButton = styled.button`
  background-color: #ffa500;
  color: white;
  border: none;
  padding: 5px;
  cursor: pointer;
  &:hover {
    background-color: #ff8c00;
  }
`;

export const DeleteButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 5px;
  cursor: pointer;
  &:hover {
    background-color: #c0392b;
  }
`;

// Navbar Styles
export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #64b5f6;
  padding: 10px 20px;
  height: 60px;
  box-sizing: border-box;
`;

export const Logo = styled.div`
  height: 50px;
  width: 130px;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  gap: 15px;
  position: relative;
`;

export const SearchBox = styled.div`
  display: flex;
  align-items: center;
  background-color: #f0f0f5;
  border-radius: 30px;
  padding: 5px 15px;
  width: 100%;
`;

export const SearchInput = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  padding: 8px;
  font-size: 14px;
  width: 100%;
  ::placeholder {
    color: #666;
  }
`;

export const SearchIcon = styled.span`
  margin-left: 10px;
  font-size: 16px;
`;

export const MenuIcon = styled.span`
  margin-right: 10px;
  font-size: 16px;
  color: black;
`;

export const InstituteSection = styled.div`
  display: flex;
  align-items: center;
`;

export const InstituteName = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #fff;
`;

export const DropdownList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  border: 1px solid #ccc;
  max-height: 200px;
  overflow-y: auto;
  position: absolute;
  background-color: white;
  z-index: 10;
  width: 100%;
`;

export const DropdownItem = styled.li`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

// Pagination Styles
export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
`;

export const RowsPerPage = styled.div`
  display: flex;
  align-items: center;
  select {
    margin-left: 5px;
  }
`;

export const PageNavigation = styled.div`
  display: flex;
  align-items: center;
`;

export const ArrowButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => (props.disabled ? '#ccc' : '#000')};
  font-size: 16px;
  margin: 0 5px;
  &:hover {
    color: ${props => (props.disabled ? '#ccc' : '#000')};
  }
  &:disabled {
    cursor: not-allowed;
  }
`;

export const PaginationInfo = styled.span`
  margin-right: 10px;
`;

// StudentFeeTable Styles
export const FilterWrapper = styled.div`
  margin-bottom: 20px;
`;

export const TotalPaidFee = styled.div`
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 18px;
`;

export const DateRangeWrapper = styled.div`
  margin-top: 10px;
`;

export const DatePickerWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const DateInput = styled(DatePicker)`
  width: 150px;
  padding: 8px;
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid #ddd;
  background-color: #fff;
`;

export const DropdownWrapper = styled.div`
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

export const DropdownContainer = styled.div`
  flex: 1;
  min-width: 200px;
`;

// TimeTable Styles
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

export const TimeTableGrid = styled.div`
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