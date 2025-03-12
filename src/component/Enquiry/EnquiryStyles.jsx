import styled from "styled-components";

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
  height: calc(-100px + 100vh);
  overflow-y: auto;
  background-color: rgb(249, 249, 249);
  flex: 1 1 0%;
  padding: 20px;
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

export const InputAlternate = styled.input`
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border-radius: 4px;
  border: 1px solid #ddd;
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

export const ErrorMessage = styled.span`
  color: #15ff00;
  font-size: 12px;
`;

export const ErrorText = styled.span`
  color: red;
  font-size: 12px;
`;

export const Container = styled.div`
  display: flex;
  background-color: #f4f4f4;
`;

export const MainDashboard = styled.div`
  flex: 1;
  background-color: #f9f9f9;
  height: calc(100vh - 100px);
  overflow-y: auto;
`;

export const TableContainer = styled.div`
  font-family: Arial, sans-serif;
  margin: 20px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  margin-bottom: 20px;
  justify-content: space-between;
`;

export const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  width: 32%;
`;

export const OpenButton = styled(Button)`
  background-color: #7b68ee;
`;

export const FollowUpButton = styled(Button)`
  background-color: #191970;
`;

export const HotButton = styled(Button)`
  background-color: #fc858f;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
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

export const StatusButton = styled.button`
  background-color: #ebedeb;
  color: black;
  border: none;
  padding: 5px 10px;
  border-radius: 15px;
`;

export const ActionButton = styled.button`
  background-color: ${(props) => props.color};
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  margin-right: 5px;
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 10px 20px;
  border-top: 1px solid #e0e0e0;
  background-color: #fff;
`;

export const PaginationInfo = styled.div`
  display: flex;
  align-items: center;
  color: #888;
`;

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

export const RowsPerPageDropdown = styled.select`
  margin: 0 10px;
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  font-size: 14px;
  cursor: pointer;
`;

export const ModalContainer = styled.div`
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
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  height: 400px;
  overflow: scroll;
`;

export const ModalContentAlternate = styled.div`
  position: fixed;
  background: white;
  width: 500px;
  padding: 20px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

export const CloseButton = styled.button`
  background-color: #ff4500;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
`;

export const CloseButtonAlternate = styled.button`
  background-color: red;
  color: white;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  position: absolute;
  top: 10px;
  right: 10px;
`;

export const DetailRow = styled.div`
  margin-bottom: 10px;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 15px;
  background-color: #fff;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  width: calc(100vw - 300px);
  max-width: 900px;
  @media (max-width: 600px) {
    width: 90%;
    padding: 10px;
  }
`;

export const ChartTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
`;

export const Section = styled.div`
  display: flex;
  gap: 5px;
  button {
    border-radius: 5px;
    border: 0.5px solid;
    background-color: transparent;
    padding: 2px 8px;
    color: black;
  }
`;

export const Inline = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Subtitle = styled.p`
  font-size: 14px;
  color: #888;
  margin-bottom: 20px;
`;

export const MarkButton = styled.button`
  background-color: #209a16bf;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 15px;
`;

export const ModalWrapper = styled.div`
  position: fixed;
  display: ${(prop) => (prop.show ? "block" : "none")};
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;