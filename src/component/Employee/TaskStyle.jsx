import styled from "styled-components";

export const Wrapper = styled.div`
  width: 90%;
  margin: 20px auto;
  padding: 10px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: "Arial", sans-serif;
  @media (max-width: 468px) {
    width: 100%;
    padding: 0;
  }
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  @media (max-width: 468px) {
    width: 95%;
    margin: 0px auto;
  }
`;

export const TableHeader = styled.thead`
  color: black;
  font-weight: bolder;
`;

export const HeaderCell = styled.th`
  padding: 12px;
  text-align: left;
  font-size: 14px;
  color: #666;
  font-weight: bold;
  border-bottom: 1px solid #e0e0e0;
  @media (max-width: 468px) {
    padding: 5px;
    font-size: 10px;
  }
`;

export const TableBody = styled.tbody`
  color: black;
`;

export const BodyCell = styled.td`
  padding: 12px;
  font-size: 14px;
  color: #333;
  border-bottom: 1px solid #e0e0e0;
  @media (max-width: 468px) {
    padding: 5px;
    font-size: 10px;
  }
`;

export const StatusBadge = styled.span`
  background-color: #e0e0e0;
  padding: 5px 10px;
  border-radius: 15px;
  color: #666;
  font-size: 12px;
  @media (max-width: 468px) {
    padding: 5px;
    font-size: 8px;
  }
`;

export const EditButton = styled.div`
  background-color: #209a16bf;
  padding: 5px 10px;
  font-size: 14px;
  border-radius: 5px;
  color: white;
  width: 40%;
  display: flex;
  justify-content: center;
`;

export const DeleteButton = styled.div`
  background-color: red;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  width: 12%;
  display: flex;
  justify-content: center;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 600px;
  position: relative;
  @media (max-width: 468px) {
    width: 90%;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  font-size: 14px;
  color: #666;
  @media (max-width: 468px) {
    font-size: 12px;
    padding: 5px 10px;
    margin: 10px 0;
  }
`;