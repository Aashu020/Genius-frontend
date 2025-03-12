import styled from "styled-components";

export const SidebarContainer = styled.div`
  width: 250px;
  height: calc(100vh - 60px);
  overflow-y: auto;
  border-right: 1px solid #e0e0e0;

  &::-webkit-scrollbar {
    width: 8px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #cecece;
    border-radius: 10px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #b3b3b3;
  }

  @media (max-width: 768px) {
    display: ${(props) => (props.isVisible ? "block" : "none")};
    position: ${(props) => (props.isVisible ? "absolute" : "none")};
    z-index: 10;
  }
`;

export const SidebarContainer1 = styled.div`
  background-color: #fff;
  border-right: 1px solid #e0e0e0;
  padding: 10px;

  a {
    color: #fff;
    text-decoration: none;
  }
`;

export const DropdownIcon = styled.span`
  margin-left: 5px;
  cursor: pointer;
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

export const SidebarMenuTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 20px;
  text-align: left;
  padding-left: 10px;
  font-weight: 600;
  color: #2a2a2a;
`;

export const MenuItem = styled.div`
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

export const MenuLabel = styled.div`
  display: flex;
  align-items: center;
`;

export const MenuIcon = styled.div`
  font-size: 20px;
  margin-right: 10px;
`;

export const PlusIcon = styled.div`
  font-size: 16px;
`;

export const SubMenuItem = styled.div`
  margin: 5px 0px;
  color: white;
  background-color: ${(props) => (props.active ? "#fff" : "#222D78")};
  box-shadow: -1.53px 1.53px 3.07px 0px #5088ff4d inset;
  padding: 6px;
  font-size: 16px;
  font-weight: 500;
  margin-left: 20px;
  border-radius: 8px;

  &:hover {
    background-color: #e6f0ff;
    color: black;
  }
`;

export const IconImg = styled.img`
  width: 22px;
`;