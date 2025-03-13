import styled from "styled-components";
export const HomeworkListContainer = styled.div`
  height: calc(100vh - 100px);
  overflow-y: auto;
  padding: 20px; 
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  width: 100%;
  @media (max-width:1023px){
  font-size: 12px;
}
`;

export const HomeworkListTitle = styled.h3`
  color: #0d47a1;
  font-size: 28px;
  text-align: center;
  font-weight: 600;
`;
export const TableWrapper1=styled.div`
   width: 100%;
   overflow-x: auto; /* ✅ Ensure table scrolls */
`
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 30px;
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
  @media (max-width:480px){
    flex-direction: column;

  }
`;

export const EditButton = styled.div`
  background-color: #209a16bf;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  width: 100%;
  display: flex;
  justify-content: center;
  cursor: pointer;
  @media (max-width:480px){
    padding: 9px 20px;
  }
`;


export const DeleteButton = styled.div`
  background-color: red;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  width: 18%;
  display: flex;
  justify-content: center;
  cursor: pointer;
  @media (max-width:480px){
    padding: 9px 20px;
  }
`;

export const ViewButton = styled.div`
  background-color: #ff9900;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  width: 18%;
  display: flex;
  justify-content: center;
  cursor: pointer;
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

export const DetailModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: left;
  width: 50%;
`;

export const MainDashboard = styled.div`
  flex: 1;
  padding: 20px;
  height: calc(100vh - 100px);
  overflow-y: auto;
  background-color: #f9f9f9;
  @media (max-width:1023px){
  font-size: 12px;
}
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

export const Section = styled.div`
  display: flex;
  justify-content: space-between;
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

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 20px;

  @media (max-width: 480px) {
    margin-bottom: 12px;
  }
  @media (max-width:1023px){
  font-size: 12px;
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
  @media (max-width:1023px){
  font-size: 12px;
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

  @media (max-width: 768px) {
    width: 100%;
    font-size: 12px;
    padding: 5px;
  }
`;

export const NoHomeworkMessage = styled.p`
  color: #777;
`;
export const MainDashboard1 = styled.div`
flex: 1;
padding: 20px;
height: calc(100vh - 100px);
overflow-y: auto;
background-color: #f9f9f9;
@media (max-width:1023px){
  font-size: 12px;
}
`;

export const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width:480px){
    /* overflow-x: auto; */
    font-size: 12px;
    /* min-width:100%; */
    margin-left: 3rem;
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
`;

export const YesButton = styled.button`
  background: green;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    background: darkgreen;
  }
`;

export const NoButton = styled.button`
  background: red;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: darkred;
  }
`;



