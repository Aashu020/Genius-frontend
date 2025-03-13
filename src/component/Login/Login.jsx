import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LogoImage from "../../assets/Images/geniuslogo.jpg";
import BackgroundImage from "../../assets/Images/loginBG.jpg";

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle login submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8007/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Id: id, Password: password }),
      });

      const data = await response.json();
      console.log("Login response data:", data);

      if (response.ok) {
        console.log("Storing data:", data.Data.Id, data.role, data.DesignationName);
        localStorage.setItem("Id", data.Data.Id);
        localStorage.setItem("Role", data.role.trim());
        localStorage.setItem("DesignationName", data.DesignationName);

        if (data.role.trim() === "Student") {
          const studentId = localStorage.getItem("Id");
          const studentResponse = await fetch(`http://localhost:8007/student/get/${studentId}`);
          const studentData = await studentResponse.json();
          console.log("Student data:", studentData);
          if (studentResponse.ok) localStorage.setItem("StudentData", JSON.stringify(studentData));
          else console.error("Failed to fetch student data");
        } else {
          const employeeId = data.Data.Id;
          const employeeResponse = await fetch(`http://localhost:8007/staff/get/${employeeId}`);
          const employeeData = await employeeResponse.json();
          console.log("Employee data:", employeeData);
          if (employeeResponse.ok) localStorage.setItem("EmployeeData", JSON.stringify(employeeData));
          else console.error("Failed to fetch employee data");
        }

        const role = data.role.trim();
        switch (role) {
          case "Student":
            navigate("/student/dashboard");
            break;
          case "FrontOffice":
          case "Accountant":
          case "Librarian":
          case "SecurityGuard":
          case "Teacher":
            navigate("/employee/dashboard");
            break;
          case "Admin":
          case "Superadmin":
            navigate("/admin/dashboard");
            break;
          default:
            alert("Role not recognized");
        }
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin(e);
  };

  return (
    <LoginContainer>
      <LoginBox>
        <LoginLeft>
          <Logo src={LogoImage} alt="Genius Logo" />
        </LoginLeft>
        <LoginRight>
          <TopSection>
            <Greeting>With New Activity Planner</Greeting>
          </TopSection>
          <Title>Login</Title>
          <Subtitle>Please enter your credentials to log in</Subtitle>
          <FormContainer onSubmit={handleLogin}>
            <InputGroup>
              <StyledLabel htmlFor="id">ID</StyledLabel>
              <StyledInput
                id="id"
                type="text"
                placeholder="Enter your ID"
                value={id}
                onChange={(e) => setId(e.target.value)}
                onKeyDown={handleKeyDown}
                required
                aria-label="User ID"
              />
            </InputGroup>
            <InputGroup>
              <StyledLabel htmlFor="password">Password</StyledLabel>
              <StyledInput
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                required
                aria-label="Password"
              />
            </InputGroup>
            <LoginButton type="submit" disabled={loading}>
              {loading ? "Loading..." : "Login"}
            </LoginButton>
          </FormContainer>
        </LoginRight>
      </LoginBox>
    </LoginContainer>
  );
};

// Styled Components
// Layout Components
const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: url(${BackgroundImage});
  background-size: cover;
  background-position: center;
  padding: 10px;
`;

const LoginBox = styled.div`
  display: flex;
  width: 70%;
  max-width: 900px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
  background-color: #fff;

  @media (max-width: 480px) {
    flex-direction: column;
    width: 90%;
  }

  @media (max-width: 320px) {
    width: 95%;
    border-radius: 5px;
  }
`;

const LoginLeft = styled.div`
  background: linear-gradient(234deg, #222d78 6%, #7130e4 50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  min-height: 500px;

  @media (max-width: 480px) {
    width: 100%;
    min-height: 150px;
  }

  @media (max-width: 320px) {
    min-height: 120px;
  }
`;

const LoginRight = styled.div`
  padding: 40px;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 480px) {
    width: 90%;
    padding: 20px;
  }

  @media (max-width: 320px) {
    padding: 15px;
    width: 90%;
  }
`;

// Content Components
const Logo = styled.img`
  width: 80%;
  max-width: 300px;
  height: auto;

  @media (max-width: 480px) {
    width: 60%;
    max-width: 180px;
  }

  @media (max-width: 320px) {
    width: 50%;
    max-width: 140px;
  }
`;

const TopSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 30px;

  @media (max-width: 480px) {
    margin-bottom: 20px;
  }

  @media (max-width: 320px) {
    margin-bottom: 15px;
  }
`;

const Greeting = styled.div`
  font-size: 2rem;
  color: #222d78;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 1.25rem;
  }

  @media (max-width: 320px) {
    font-size: 1rem;
  }
`;

const Title = styled.h2`
  font-size: 1.75rem;
  color: #222d78;
  text-align: center;
  margin-bottom: 10px;

  @media (max-width: 480px) {
    font-size: 1.25rem;
  }

  @media (max-width: 320px) {
    font-size: 1rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: #888;
  text-align: center;
  margin-bottom: 20px;

  @media (max-width: 480px) {
    font-size: 0.875rem;
    margin-bottom: 15px;
  }

  @media (max-width: 320px) {
    font-size: 0.75rem;
    margin-bottom: 10px;
  }
`;

// Form Components
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 300px;

  @media (max-width: 480px) {
    max-width: 100%;
  }
`;

const InputGroup = styled.div`
  width: 100%;
  margin-bottom: 20px;

  @media (max-width: 480px) {
    margin-bottom: 15px;
  }

  @media (max-width: 320px) {
    margin-bottom: 10px;
  }
`;

const StyledLabel = styled.label`
  font-size: 1rem;
  color: #333;
  display: block;
  margin-bottom: 5px;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 0.875rem;
  }

  @media (max-width: 320px) {
    font-size: 0.75rem;
    margin-bottom: 3px;
  }
`;

const StyledInput = styled.input`
  border: none;
  border-bottom: 1px solid #222d78;
  padding: 10px 0;
  width: 100%;
  font-size: 1rem;
  color: #333;
  background: transparent;
  text-align: center;

  &:focus {
    outline: none;
    border-bottom: 2px solid #7130e4;
  }

  &::placeholder {
    color: #999;
    text-align: center;
  }

  @media (max-width: 480px) {
    font-size: 0.875rem;
    padding: 8px 0;
  }

  @media (max-width: 320px) {
    font-size: 0.75rem;
    padding: 6px 0;
  }
`;

const LoginButton = styled.button`
  width: 100%;
  max-width: 200px;
  padding: 12px 20px;
  background-color: #7130e4;
  color: white;
  border: none;
  border-radius: 25px; /* Rounded for modern look */
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover:not(:disabled) {
    background-color: #5b25c3;
    transform: translateY(-2px); /* Lift effect on hover */
  }

  &:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    max-width: 180px;
    padding: 10px 18px;
    font-size: 0.875rem;
  }

  @media (max-width: 320px) {
    max-width: 160px;
    padding: 8px 16px;
    font-size: 0.75rem;
  }
`;

export default Login;