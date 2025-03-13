import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: calc(100vh - 35px);
  background-color: #f4f4f4;

  @media (max-width: 1024px) {
    height: calc(100vh - 30px); /* Slightly adjust height */
  }

  @media (max-width: 480px) {
    flex-direction: column; /* Stack vertically only on mobile */
    height: auto;
  }
`;

export const MainDashboard = styled.div`
  flex: 1;
  /* overflow-y: auto; */ /* Commented out in original, left as is */
  background-color: #f9f9f9;
  padding: 20px;

  @media (max-width: 1024px) {
    padding: 15px; /* Slightly reduced padding for tablets */
  }

  @media (max-width: 480px) {
    padding: 10px; /* Match original mobile */
  }
`;

export const Title = styled.h2`
  color: #0d47a1;
  text-align: center;
  margin-bottom: 30px;
  font-weight: bold;

  @media (max-width: 1024px) {
    font-size: 24px; /* Slightly smaller for tablets */
    margin-bottom: 25px;
  }

  @media (max-width: 480px) {
    font-size: 18px; /* Mobile */
    margin-bottom: 15px;
  }
`;

export const Form = styled.form`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    max-width: 900px; /* Reduced width for tablets */
  }

  @media (max-width: 480px) {
    max-width: 100%; /* Full width on mobile */
  }
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
  font-weight: bold;

  @media (max-width: 1024px) {
    width: 35%; /* Slightly wider for tablets */
    height: 38px;
    margin-bottom: 35px;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px; /* Match original mobile */
    height: 30px;
    width: 50%;
    margin-bottom: 30px;
    margin-top: 20px;
  }
`;

export const Main = styled.div`
  display: grid;
  /* grid-template-columns: repeat(3, 1fr); */ /* Commented out in original */
  grid-template-columns: repeat(2, 1fr); /* Keep 2 columns for tablets */
  gap: 20px;

  @media (max-width: 1024px) {
    gap: 15px; /* Slightly reduced gap for tablets */
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr; /* Single column only on mobile */
    gap: 10px;
  }

  br {
    @media (max-width: 480px) {
      display: none; /* Match original mobile */
    }
  }
`;

export const FormContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 1024px) {
    padding: 15px; /* Slightly reduced padding for tablets */
  }

  @media (max-width: 480px) {
    padding: 10px; /* Match original mobile */
  }
`;

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 20px;

  @media (max-width: 1024px) {
    margin-bottom: 18px; /* Slightly reduced for tablets */
  }

  @media (max-width: 480px) {
    margin-bottom: 12px; /* Match original mobile */
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

  @media (max-width: 1024px) {
    left: 15px; /* Slightly adjusted for tablets */
    font-size: 11px;
  }

  @media (max-width: 480px) {
    left: 10px; /* Mobile */
    padding: 1px 6px;
    font-size: 9px;
    top: -8px;
  }
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

  @media (max-width: 1024px) {
    padding: 12px 18px; /* Slightly reduced for tablets */
    font-size: 14px;
    width: 90%;
  }

  @media (max-width: 480px) {
    height: 10px; /* Match original mobile */
    width: 80%;
    font-size: 12px;
    padding: 12px 18px;
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

  @media (max-width: 1024px) {
    padding: 12px 18px; /* Slightly reduced for tablets */
    font-size: 14px;
    width: 98%;
  }

  @media (max-width: 480px) {
    height: 38px; /* Match original mobile */
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

  @media (max-width: 1024px) {
    width: 280px; /* Slightly reduced for tablets */
    padding: 10px;
    font-size: 15px;
    margin-top: 15px;
  }

  @media (max-width: 480px) {
    width: 100%; /* Match original mobile */
    font-size: 12px;
    padding: 5px;
    margin-top: 10px;
  }
`;

export const StepIndicatorContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  background-color: #f0f0f0;
  padding: 10px;
  margin-bottom: 30px;

  @media (max-width: 1024px) {
    gap: 0.8rem; /* Slightly reduced for tablets */
    padding: 8px;
    margin-bottom: 25px;
  }

  @media (max-width: 480px) {
    gap: 0.1rem; /* Match original mobile */
    padding: 5px;
    margin-bottom: 15px;
  }
`;

export const Step = styled.div`
  background-color: ${(props) => (props.active ? "#8a2be2" : "#4a0e8f")};
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 14px;

  @media (max-width: 1024px) {
    padding: 7px 14px; /* Slightly reduced for tablets */
    font-size: 13px;
  }

  @media (max-width: 480px) {
    font-size: 10px; /* Match original mobile */
    padding: 7px;
    width: 40%;
  }
`;

export const StepContent = styled.span`
  margin-left: 5px;

  @media (max-width: 1024px) {
    margin-left: 4px; /* Slightly reduced for tablets */
  }

  @media (max-width: 480px) {
    margin-left: 3px; /* Mobile */
  }
`;