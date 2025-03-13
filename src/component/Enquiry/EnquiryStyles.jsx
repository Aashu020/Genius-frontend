import styled from "styled-components";

export const Title = styled.h2`
  color: #0d47a1;
  text-align: center;
  margin-bottom: 30px;
  font-weight: bold;
  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 20px;
  }
  @media (max-width: 480px) {
    font-size: 20px;
    margin-bottom: 15px;
  }
`;

export const Form = styled.form`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
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
  @media (max-width: 768px) {
    width: 40%;
  }
  @media (max-width: 480px) {
    font-size: 12px;
    height: 30px;
    width: 50%;
    margin-bottom: 25px;
    margin-top: 15px;
  }
`;

export const Main = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

export const FormContainer = styled.div`
  height: calc(-100px + 100vh);
  overflow-y: auto;
  background-color: rgb(249, 249, 249);
  flex: 1 1 0%;
  padding: 20px;
  @media (max-width: 768px) {
    padding: 15px;
    height: auto;
  }
  @media (max-width: 480px) {
    padding: 10px;
  }
`;

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    margin-bottom: 15px;
  }
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
  @media (max-width: 480px) {
    left: 15px;
    font-size: 10px;
    padding: 2px 8px;
  }
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
  @media (max-width: 480px) {
    left: 15px;
    font-size: 10px;
    padding: 2px 8px;
  }
`;

export const Input = styled.input`
  width: 90%;
  padding: 15px 20px;
  border: 2px solid #7d3cff;
  border-radius: 30px;
  font-size: 16px;
  color: #7a7a7a;
  background-color: #f4f6fc;
  font-weight: bold;
  outline: none;
  @media (max-width: 768px) {
    width: 100%;
    padding: 12px 15px;
    font-size: 14px;
  }
  @media (max-width: 480px) {
    width: 90%;
    font-size: 12px;
    padding: 10px 12px;
    height: auto;
  }
`;

export const InputAlternate = styled.input`
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border-radius: 4px;
  border: 1px solid #ddd;
  @media (max-width: 480px) {
    padding: 6px;
    font-size: 12px;
  }
`;

export const Select = styled.select`
  width: 102%;
  padding: 15px 20px;
  border: 2px solid #7d3cff;
  border-radius: 30px;
  font-size: 16px;
  color: #7a7a7a;
  background-color: #f4f6fc;
  font-weight: bold;
  @media (max-width: 768px) {
    width: 105%;
    padding: 12px 15px;
    font-size: 14px;
  }
  @media (max-width: 480px) {
    width: 98%;
    font-size: 12px;
    padding: 10px 12px;
    height: auto;
  }
  @media (max-width: 320px) {
    width: 100%;
    font-size: 12px;
    padding: 10px 12px;
    height: auto;
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
    padding: 10px;
    font-size: 14px;
  }
  @media (max-width: 480px) {
    margin-top: 15px;
    font-size: 12px;
  }
`;

export const ErrorMessage = styled.span`
  color: #15ff00;
  font-size: 12px;
  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

export const ErrorText = styled.span`
  color: red;
  font-size: 12px;
  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

export const Container = styled.div`
  display: flex;
  background-color: #f4f4f4;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const MainDashboard = styled.div`
  flex: 1;
  background-color: #f9f9f9;
  height: calc(100vh - 100px);
  overflow-y: auto;
  @media (max-width: 768px) {
    height: auto;
  }
`;

export const TableContainer = styled.div`
  font-family: Arial, sans-serif;
  margin: 20px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  @media (max-width: 768px) {
    margin: 15px;
  }
  @media (max-width: 480px) {
    margin: 10px;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  margin-bottom: 20px;
  justify-content: space-between;
  padding: 0 20px;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
    padding: 0 15px;
  }
`;

export const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  width: 32%;
  @media (max-width: 768px) {
    width: 100%;
    padding: 8px 15px;
  }
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
  @media (max-width: 768px) {
    display: block;
    overflow-x: auto;
  }
`;

export const Th = styled.th`
  background-color: #f2f2f2;
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  font-weight: 400;
  @media (max-width: 480px) {
    padding: 8px;
    font-size: 12px;
  }
`;

export const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  @media (max-width: 480px) {
    padding: 8px;
    font-size: 12px;
  }
`;

export const StatusButton = styled.button`
  background-color: #ebedeb;
  color: black;
  border: none;
  padding: 5px 10px;
  border-radius: 15px;
  @media (max-width: 480px) {
    padding: 4px 8px;
    font-size: 10px;
  }
`;

export const ActionButton = styled.button`
  background-color: ${(props) => props.color};
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  margin-right: 5px;
  @media (max-width: 480px) {
    padding: 4px 8px;
    font-size: 10px;
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 10px 20px;
  border-top: 1px solid #e0e0e0;
  background-color: #fff;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
    padding: 10px 15px;
  }
`;

export const PaginationInfo = styled.div`
  display: flex;
  align-items: center;
  color: #888;
  @media (max-width: 480px) {
    font-size: 12px;
  }
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
  @media (max-width: 480px) {
    padding: 4px 12px;
    font-size: 12px;
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
  @media (max-width: 480px) {
    padding: 4px;
    font-size: 12px;
    margin: 0 5px;
  }
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
  @media (max-width: 768px) {
    width: 90%;
    max-width: 350px;
  }
  @media (max-width: 480px) {
    padding: 15px;
    height: 80vh;
  }
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
  @media (max-width: 768px) {
    width: 90%;
    max-width: 400px;
  }
  @media (max-width: 480px) {
    padding: 15px;
  }
`;

export const CloseButton = styled.button`
  background-color: #ff4500;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  @media (max-width: 480px) {
    padding: 4px 8px;
    font-size: 12px;
  }
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
  @media (max-width: 480px) {
    padding: 4px 8px;
    font-size: 12px;
  }
`;

export const DetailRow = styled.div`
  margin-bottom: 10px;
  @media (max-width: 480px) {
    margin-bottom: 8px;
  }
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
  @media (max-width: 1024px) {
    width: 92%;
  }
  @media (max-width: 768px) {
    width: 90%;
    padding: 15px;
  }
  @media (max-width: 480px) {
    padding: 10px;
  }
`;

export const ChartTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
  @media (max-width: 480px) {
    font-size: 16px;
  }
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
  @media (max-width: 480px) {
    gap: 3px;
    button {
      padding: 2px 6px;
      font-size: 12px;
    }
  }
`;

export const Inline = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

export const Subtitle = styled.p`
  font-size: 14px;
  color: #888;
  margin-bottom: 20px;
  @media (max-width: 480px) {
    font-size: 12px;
    margin-bottom: 15px;
  }
`;

export const MarkButton = styled.button`
  background-color: #209a16bf;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 15px;
  @media (max-width: 480px) {
    padding: 4px 8px;
    font-size: 12px;
  }
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