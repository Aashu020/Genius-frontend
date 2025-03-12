import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  MainDashboard,
  Title,
  Form,
  Heading,
  Main,
  FormContainer,
  InputContainer,
  Label,
  Input,
  Select,
  SubmitButton,
  StepIndicatorContainer,
  Step,
  StepContent,
} from "../Admin/FeeParticularStyle";
import Navbar from "../Navbar";
import AdminSidebar from "./AdminSidebar";
import Sidebar from "../Sidebar";

const FeeParticular = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form Submitted!");
  };

  return (
    <>
      <MainDashboard>
        <FormContainer>
          <Title>Fee Particular</Title>

          <Form onSubmit={handleSubmit}>
            <Main>
              <InputContainer>
                <Label>Fee Particular For</Label>
                <Input type="text" placeholder="Enter Name" />
              </InputContainer>
              <br></br>

              <InputContainer>
                <Label>Particular Label</Label>
                <Input type="text" />
              </InputContainer>

              <InputContainer>
                <Label>Prefix Amount</Label>
                <Input type="number" />
              </InputContainer>

              <InputContainer>
                <Label>Particular Label</Label>
                <Input type="text" />
              </InputContainer>

              <InputContainer>
                <Label>Prefix Amount</Label>
                <Input type="number" />
              </InputContainer>

              <InputContainer>
                <Label>Particular Label</Label>
                <Input type="text" />
              </InputContainer>

              <InputContainer>
                <Label>Prefix Amount</Label>
                <Input type="number" />
              </InputContainer>

              <InputContainer>
                <Label>Particular Label</Label>
                <Input type="text" />
              </InputContainer>

              <InputContainer>
                <Label>Prefix Amount</Label>
                <Input type="number" />
              </InputContainer>

              <InputContainer>
                <Label>Particular Label</Label>
                <Input type="text" />
              </InputContainer>

              <InputContainer>
                <Label>Prefix Amount</Label>
                <Input type="number" />
              </InputContainer>
            </Main>

            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "center",
              }}
            >
              <SubmitButton type="submit">Submit</SubmitButton>
            </div>
          </Form>
        </FormContainer>
      </MainDashboard>
    </>
  );
};

export default FeeParticular;