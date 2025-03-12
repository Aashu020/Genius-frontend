import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logoimgage from "../../assets/Images/EDSP3.jpg";
import bg from "../../assets/Images/loginBG.jpg";
import mile from "../../assets/Images/MileLogo.jpg";

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      // Send login request
      const response = await fetch("http://localhost:8007/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Id: id, Password: password }),
      });
  
      const data = await response.json();
      console.log("Login response data:", data); // Log response data
  
      if (response.ok) {
        // Check the data before setting localStorage
        console.log("Storing data:", data.Data.Id, data.role, data.DesignationName);
  
        // Store user data in localStorage
        localStorage.setItem("Id", data.Data.Id); // Store user ID
        localStorage.setItem("Role", data.role.trim()); // Store user role
        localStorage.setItem("DesignationName", data.DesignationName); // Store user designation
  
        // Fetch and store additional data for students and employees
        if (data.role === "Student") {
          const studentId = localStorage.getItem("Id");
          const studentResponse = await fetch(`http://localhost:8007/student/get/${studentId}`);
          const studentData = await studentResponse.json();
          console.log("Student data:", studentData); // Log student data
  
          if (studentResponse.ok) {
            localStorage.setItem("StudentData", JSON.stringify(studentData)); // Store student data
          } else {
            console.error('Failed to fetch student data');
          }
        } else {
          const employeeId = data.Data.Id;
          const employeeResponse = await fetch(`http://localhost:8007/staff/get/${employeeId}`);
          const employeeData = await employeeResponse.json();
          console.log("Employee data:", employeeData); // Log employee data
  
          if (employeeResponse.ok) {
            localStorage.setItem("EmployeeData", JSON.stringify(employeeData)); // Store employee data
          } else {
            console.error('Failed to fetch employee data');
          }
        }
  
        // Navigate based on role
        switch (data.role.trim()) {
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
      console.error("Login failed", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  
  

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin(e); // Trigger login when Enter is pressed
    }
  };

  return (
    <LoginContainer>
      <LoginBox>
        <LoginLeft>
          <img src={Logoimgage} alt="Logo" />
        </LoginLeft>
        <LoginRight>
          <Top>
            <div>
              Hello<br />
              <b>Welcome!</b>
            </div>

            <img src={mile} height="100px" alt="" />
          </Top>
          <h2>Login</h2>
          <p>Please enter your credentials to log in</p>

          <FormContainer>
            <InputGroup2>
              <StyledLabel>
                ID
                <StyledInput
                  type="text"
                  placeholder="ID"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  onKeyDown={handleKeyDown} // Add onKeyDown event
                  required
                />
              </StyledLabel>
            </InputGroup2>
            <InputGroup2>
              <StyledLabel>
                Password
                <StyledInput
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown} // Add onKeyDown event
                  required
                />
              </StyledLabel>
            </InputGroup2>
          </FormContainer>

          <LoginButton onClick={handleLogin} disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </LoginButton>
        </LoginRight>
      </LoginBox>
    </LoginContainer>
  );
};

// Styled components (unchanged)
const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url(${bg});
  background-size: cover;
`;

const LoginBox = styled.div`
  display: flex;
  width: 70%;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 90%;
  }
`;

const LoginLeft = styled.div`
  background: linear-gradient(234deg, #222d78 6%, #7130e4 50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 80vh;

  h2 {
    color: #fff;
    font-size: 4rem;
    text-align: center;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 20vh;

    h2 {
      font-size: 2.5rem;
    }
  }
`;

const LoginRight = styled.div`
  background-color: #fff;
  padding: 40px;
  display: flex;
  flex-direction: column;
  width: 50%;
  justify-content: center;
  align-items: center;

  h2 {
    margin-bottom: 10px;
  }

  p {
    margin-bottom: 20px;
    color: #888;
  }

  @media (max-width: 768px) {
    width: auto;
    padding: 20px;
  }
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 60px;
  font-size: 40px;
  color: #222d78;
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 0.5rem;
  background-color: #7130e4;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;

  @media (max-width: 768px) {
    width: 80%;
  }
`;

const InputGroup2 = styled.div`
  margin-bottom: 20px;
  position: relative;
`;

const StyledLabel = styled.label`
  font-size: 1rem;
  color: #333;
  margin-bottom: 5px;
  display: block;
`;

const StyledInput = styled.input`
  border: none;
  border-bottom: 1px solid #222d78;
  padding: 10px 0;
  width: 100%;
  font-size: 1rem;
  color: #333;

  &:focus {
    outline: none;
    border-bottom: 2px solid #7130e4;
  }

  &::placeholder {
    color: #999;
  }
`;

export default Login;
