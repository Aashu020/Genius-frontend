import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-around;
  width: 98%;
  margin: 20px auto;
  @media (max-width: 468px) {
    display: block;
  }
`;

export const LeftSection = styled.div`
  width: 50%;
  @media (max-width: 468px) {
    width: 100%;
  }
`;

export const RightSection = styled.div`
  width: 40%;
  @media (max-width: 468px) {
    width: 100%;
    display: flex;
    justify-content: center;
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

  @media (max-width: 468px) {
    padding: 5px 10px;
    font-size: 12px;
    margin: 5px 0;
    height: 30px;
    width: 45%;
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
`;

export const ProgressBar = styled.div`
  margin-bottom: 20px;
`;

export const SubjectName = styled.div`
  font-size: 16px;
  color: #1a237e;
  margin-bottom: 5px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const Progress = styled.div`
  background-color: #e3f2fd;
  border-radius: 10px;
  overflow: hidden;
  height: 8px;
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
  @media (max-width: 468px) {
    width: 87%;
    margin-top: 20px;
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const Section = styled.div`
  @media (max-width: 468px) {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
`;

export const Select = styled.select`
  padding: 10px;
  border-radius: 5px;
  margin: 10px;
  width: 45%;
`;

export const Option = styled.option``;