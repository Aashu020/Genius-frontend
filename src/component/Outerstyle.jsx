import styled from 'styled-components';

// AbsentStaffList Styles
export const StaffWrapper = styled.div`
  width: 90%;
  margin: auto;
  margin-top: 20px;
  @media (max-width: 480px) {
    width: 100%;
    margin: 0;
    margin-bottom: 20px;
  }
`;

export const HeaderTitle = styled.h2`
  font-size: 20px;
  color: #1a237e;
  margin-bottom: 20px;
  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

export const TableHead = styled.thead`
  background-color: #f0f0f0;
`;

export const HeadCell = styled.th`
  padding: 12px 15px;
  text-align: left;
  color: #666;
  font-weight: bold;
  @media (max-width: 480px) {
    font-size: 10px;
    padding: 8px 8px;
  }
`;

export const TableBody = styled.tbody`
  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

export const BodyCell = styled.td`
  padding: 12px 15px;
  text-align: left;
  font-size: 16px;
  color: #333;
  @media (max-width: 480px) {
    font-size: 10px;
    padding: 8px 8px;
  }
`;

export const Photo = styled.img`
  width: 115px;
  height: 110px;
  background-color: gray;
  border-radius: 50%;
`;

export const DeleteButton = styled.div`
  background-color: red;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  width: 20%;
  display: flex;
  justify-content: center;
`;

export const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  @media (max-width: 480px) {
    height: 2rem;
    width: 2rem;
    padding: 1px 0;
  }
`;

// DynamicSlider Styles
export const Container = styled.div`
  width: 40%;
  font-family: "Arial", sans-serif;
  @media (max-width: 480px) {
    width: 100%;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 20px;
  color: #1a237e;
  margin-bottom: 20px;
`;

export const Card = styled.div`
  background-color: #fff;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const ProfileInfo = styled.div`
  margin-left: 15px;
`;

export const Name = styled.h3`
  margin: 0;
  font-size: 18px;
  color: #333;
`;

export const Role = styled.p`
  margin: 5px 0;
  font-size: 14px;
  color: #666;
`;

export const Message = styled.p`
  margin: 0;
  font-size: 14px;
  color: #666;
`;

export const SendWishesButton = styled.button`
  color: #1a237e;
  width: 10rem;
  margin-top: 20px;
  background-color: transparent;
  font-size: 14px;
  display: flex;
  align-items: center;
  cursor: pointer;
  border: none;
  &:hover {
    color: #673ab7;
    border-color: #673ab7;
  }
`;

export const DotsContainer = styled.div`
  text-align: center;
  margin: 20px 0;
`;

export const Dot = styled.span`
  height: 10px;
  width: 10px;
  margin: 0 5px;
  background-color: ${({ active }) => (active ? "#673ab7" : "#bbb")};
  border-radius: 50%;
  display: inline-block;
  cursor: pointer;
`;

export const EventCard = styled(Card)`
  flex-direction: column;
  align-items: flex-start;
`;

export const EventTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  color: #333;
`;

export const EventDetails = styled.p`
  font-size: 14px;
  color: #666;
  margin: 5px 0;
  list-style-type: none;
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

export const DetailModalContent = styled.div`
  background: white;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  border-radius: 10px;
  text-align: left;
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

// BirthdayWishesTable Styles
export const TableContainer = styled.div`
  margin: 20px;
  padding: 20px;
  width: 100%;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  h2 {
    text-align: center;
    margin-bottom: 20px;
    font-size: 1.5rem;
    color: #333;
  }

  p {
    text-align: center;
    font-size: 1.1rem;
    color: #555;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

export const TableRow = styled.tr`
  background-color: #fff;
  &:nth-child(even) {
    background-color: #f4f4f4;
  }
  &:hover {
    background-color: #e8e8e8;
  }
`;

export const TableHeader = styled.th`
  padding: 12px 15px;
  text-align: left;
  background-color: #4caf50;
  color: white;
  font-weight: bold;
`;

export const TableData = styled.td`
  padding: 12px 15px;
  border: 1px solid #ddd;
`;