import styled from "styled-components";

// Common breakpoints
const breakpoints = {
  mobile: '468px',
  tablet: '768px',
  desktop: '1024px',
  largeDesktop: '1200px'
};

export const Wrapper = styled.div`
  width: 90%;
  margin: 20px auto;
  padding: 10px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: "Arial", sans-serif;

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    padding: 0;
    margin: 10px auto;
  }
  @media (min-width: ${breakpoints.mobile}) and (max-width: ${breakpoints.tablet}) {
    width: 95%;
    padding: 8px;
  }
  @media (min-width: ${breakpoints.tablet}) and (max-width: ${breakpoints.desktop}) {
    width: 92%;
  }
  @media (min-width: ${breakpoints.largeDesktop}) {
    width: 85%;
    padding: 15px;
  }
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  @media (max-width: ${breakpoints.mobile}) {
    width: 95%;
    margin: 0px auto;
  }
  @media (min-width: ${breakpoints.mobile}) and (max-width: ${breakpoints.tablet}) {
    width: 98%;
  }
  @media (min-width: ${breakpoints.largeDesktop}) {
    width: 100%;
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

  @media (max-width: ${breakpoints.mobile}) {
    padding: 5px;
    font-size: 10px;
  }
  @media (min-width: ${breakpoints.mobile}) and (max-width: ${breakpoints.tablet}) {
    padding: 8px;
    font-size: 12px;
  }
  @media (min-width: ${breakpoints.tablet}) and (max-width: ${breakpoints.desktop}) {
    padding: 10px;
    font-size: 13px;
  }
  @media (min-width: ${breakpoints.largeDesktop}) {
    padding: 14px;
    font-size: 16px;
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

  @media (max-width: ${breakpoints.mobile}) {
    padding: 5px;
    font-size: 10px;
  }
  @media (min-width: ${breakpoints.mobile}) and (max-width: ${breakpoints.tablet}) {
    padding: 8px;
    font-size: 12px;
  }
  @media (min-width: ${breakpoints.tablet}) and (max-width: ${breakpoints.desktop}) {
    padding: 10px;
    font-size: 13px;
  }
  @media (min-width: ${breakpoints.largeDesktop}) {
    padding: 14px;
    font-size: 16px;
  }
`;

export const StatusBadge = styled.span`
  background-color: #e0e0e0;
  padding: 5px 10px;
  border-radius: 15px;
  color: #666;
  font-size: 12px;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 3px 6px;
    font-size: 8px;
  }
  @media (min-width: ${breakpoints.mobile}) and (max-width: ${breakpoints.tablet}) {
    padding: 4px 8px;
    font-size: 10px;
  }
  @media (min-width: ${breakpoints.tablet}) and (max-width: ${breakpoints.desktop}) {
    padding: 5px 9px;
    font-size: 11px;
  }
  @media (min-width: ${breakpoints.largeDesktop}) {
    padding: 6px 12px;
    font-size: 13px;
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

  @media (max-width: ${breakpoints.mobile}) {
    padding: 4px 8px;
    font-size: 10px;
    width: 50%;
  }
  @media (min-width: ${breakpoints.mobile}) and (max-width: ${breakpoints.tablet}) {
    padding: 5px 9px;
    font-size: 12px;
    width: 45%;
  }
  @media (min-width: ${breakpoints.largeDesktop}) {
    padding: 6px 12px;
    font-size: 16px;
    width: 35%;
  }
`;

export const DeleteButton = styled.div`
  background-color: red;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  width: 12%;
  display: flex;
  justify-content: center;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 4px 8px;
    width: 20%;
    font-size: 10px;
  }
  @media (min-width: ${breakpoints.mobile}) and (max-width: ${breakpoints.tablet}) {
    padding: 5px 9px;
    width: 15%;
    font-size: 12px;
  }
  @media (min-width: ${breakpoints.largeDesktop}) {
    padding: 6px 12px;
    width: 10%;
    font-size: 16px;
  }
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

  @media (max-width: ${breakpoints.mobile}) {
    padding: 10px;
  }
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 600px;
  position: relative;

  @media (max-width: ${breakpoints.mobile}) {
    width: 90%;
    padding: 15px;
  }
  @media (min-width: ${breakpoints.mobile}) and (max-width: ${breakpoints.tablet}) {
    width: 85%;
    padding: 18px;
  }
  @media (min-width: ${breakpoints.tablet}) and (max-width: ${breakpoints.desktop}) {
    width: 75%;
  }
  @media (min-width: ${breakpoints.largeDesktop}) {
    padding: 25px;
    max-width: 700px;
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

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 14px;
    top: 5px;
    right: 5px;
  }
  @media (min-width: ${breakpoints.mobile}) and (max-width: ${breakpoints.tablet}) {
    font-size: 16px;
  }
  @media (min-width: ${breakpoints.largeDesktop}) {
    font-size: 20px;
    top: 15px;
    right: 15px;
  }
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  font-size: 14px;
  color: #666;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 12px;
    padding: 5px 10px;
    margin: 10px 0;
  }
  @media (min-width: ${breakpoints.mobile}) and (max-width: ${breakpoints.tablet}) {
    font-size: 13px;
    margin: 15px 0;
  }
  @media (min-width: ${breakpoints.tablet}) and (max-width: ${breakpoints.desktop}) {
    padding: 0 5px;
  }
  @media (min-width: ${breakpoints.largeDesktop}) {
    font-size: 16px;
    margin: 25px 0;
  }
`;