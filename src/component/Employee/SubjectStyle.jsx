import styled from "styled-components";

// Common breakpoints
const breakpoints = {
  mobile: '468px',
  tablet: '768px',
  desktop: '1024px',
  largeDesktop: '1200px'
};

export const Container = styled.div`
  display: flex;
  justify-content: space-around;
  width: 98%;
  margin: 20px auto;

  @media (max-width: ${breakpoints.mobile}) {
    display: block;
    margin: 10px auto;
  }
  @media (min-width: ${breakpoints.mobile}) and (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
    width: 95%;
  }
  @media (min-width: ${breakpoints.tablet}) and (max-width: ${breakpoints.desktop}) {
    width: 96%;
  }
`;

export const LeftSection = styled.div`
  width: 50%;

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
  }
  @media (min-width: ${breakpoints.mobile}) and (max-width: ${breakpoints.tablet}) {
    width: 100%;
    margin-bottom: 20px;
  }
  @media (min-width: ${breakpoints.tablet}) and (max-width: ${breakpoints.desktop}) {
    width: 55%;
  }
`;

export const RightSection = styled.div`
  width: 40%;

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  @media (min-width: ${breakpoints.mobile}) and (max-width: ${breakpoints.tablet}) {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  @media (min-width: ${breakpoints.tablet}) and (max-width: ${breakpoints.desktop}) {
    width: 40%;
  }
`;

export const Button = styled.button`
  background-color: transparent;
  color: ${(props) => (props.color === "red" ? "#d32f2f" : "#388e3c")};
  border: 1px solid ${(props) => (props.color === "red" ? "#d32f2f" : "#388e3c")};
  padding: 8px 16px;
  font-size: 14px;
  margin-right: 10px;
  border-radius: 6px;
  cursor: pointer;
  box-shadow: none;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: ${(props) => (props.color === "red" ? "#d32f2f" : "#388e3c")};
    color: white;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 5px 10px;
    font-size: 12px;
    margin: 5px 0;
    height: 30px;
    width: 45%;
  }
  @media (min-width: ${breakpoints.mobile}) and (max-width: ${breakpoints.tablet}) {
    padding: 2px 5px;
    font-size: 10px;
    width: 20%;
  }
  @media (min-width: ${breakpoints.tablet}) and (max-width: ${breakpoints.desktop}) {
    padding: 3px 14px;
    
  }
`;

export const ProgressContainer = styled.div`
  margin-top: 30px;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  h2 {
    margin-bottom: 15px;
    font-size: 20px;
    color: #0d47a1;
  }

  @media (max-width: ${breakpoints.mobile}) {
    margin-top: 15px;
    padding: 15px;
    h2 { font-size: 18px; }
  }
  @media (min-width: ${breakpoints.mobile}) and (max-width: ${breakpoints.tablet}) {
    margin-top: 20px;
    padding: 18px;
  }
  @media (min-width: ${breakpoints.largeDesktop}) {
    padding: 25px;
    h2 { font-size: 22px; }
  }
`;

export const ProgressBar = styled.div`
  margin-bottom: 20px;

  @media (max-width: ${breakpoints.mobile}) {
    margin-bottom: 15px;
  }
`;

export const SubjectName = styled.div`
  font-size: 16px;
  color: #1a237e;
  margin-bottom: 5px;
  width: 100%;
  display: flex;
  justify-content: space-between;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 14px;
  }
  @media (min-width: ${breakpoints.tablet}) and (max-width: ${breakpoints.desktop}) {
    font-size: 15px;
  }
`;

export const Progress = styled.div`
  background-color: #e3f2fd;
  border-radius: 10px;
  overflow: hidden;
  height: 8px;

  @media (max-width: ${breakpoints.mobile}) {
    height: 6px;
  }
  @media (min-width: ${breakpoints.largeDesktop}) {
    height: 10px;
  }
`;

export const ProgressInner = styled.div`
  height: 100%;
  width: ${(props) => props.width}%;
  background-color: #0d47a1;
`;

export const ChartContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 90%;

  @media (max-width: ${breakpoints.mobile}) {
    width: 87%;
    margin-top: 20px;
    padding: 15px;
  }
  @media (min-width: ${breakpoints.mobile}) and (max-width: ${breakpoints.tablet}) {
    width: 92%;
    padding: 18px;
  }
  @media (min-width: ${breakpoints.tablet}) and (max-width: ${breakpoints.desktop}) {
    width: 88%;
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  @media (max-width: ${breakpoints.mobile}) {
    margin-bottom: 8px;
  }
`;

export const Section = styled.div`
  @media (max-width: ${breakpoints.mobile}) {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  @media (min-width: ${breakpoints.mobile}) and (max-width: ${breakpoints.tablet}) {
    padding: 10px;
  }
`;

export const Select = styled.select`
  padding: 10px;
  border-radius: 5px;
  margin: 10px;
  width: 45%;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 8px;
    margin: 5px;
    width: 48%;
  }
  @media (min-width: ${breakpoints.mobile}) and (max-width: ${breakpoints.tablet}) {
    width: 40%;
  }
  @media (min-width: ${breakpoints.largeDesktop}) {
    padding: 12px;
    width: 35%;
  }
`;

export const Option = styled.option`
  @media (max-width: ${breakpoints.mobile}) {
    font-size: 14px;
  }
`;