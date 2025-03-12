import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  height: calc(100vh - 100px);
  overflow-y: auto;
  margin: 0 auto;
`;

const AdmissionLetterContainer = styled.div`
  width: 1000px;
  padding: 20px;
  border: 1px solid #ccc;
  font-family: Arial, sans-serif;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const Logo = styled.img`
  height: 60px;
`;

const Title = styled.h2`
  color: #4a4a4a;
`;

const Section2 = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Section1 = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-bottom: 20px;
  gap: 1rem;
`;

const LeftColumn = styled.div`
  width: 100%;
`;

const Label = styled.p`
  margin: 0;
  font-size: 14px;
  color: #555;
  font-weight: bold;
  border-bottom: 0.5px solid black;
  width: 60%;
`;

const Value = styled.p`
  margin: 0;
  font-size: 14px;
  color: black;
  font-weight: bold;
  margin-bottom: 10px;
`;

const PhotoContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const Photo = styled.img`
  width: 115px;
  height: 110px;
  background-color: gray;
  border-radius: 50%;
`;

const QRCodesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const QRCode = styled.img`
  width: 80px;
  height: 80px;
  margin: 5px 0;
`;

const Left = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
`;


export {
    Container,
    AdmissionLetterContainer,
    Header,
    Logo,
    Title,
    Section1,
    Section2,
    LeftColumn,
    Label,
    Value,
    PhotoContainer,
    Photo,
    QRCodesContainer,
    QRCode,
    Left,
  };