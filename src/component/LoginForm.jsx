import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import styled from 'styled-components';

// Styled-components

const MainDashboard = styled.div`
  flex: 1;
  height: calc(100vh - 100px);
  overflow-y: auto;
  background-color: #f9f9f9;
  padding: 20px;
  @media (max-width: 480px) {
    padding: 10px;
  }
`;
const Form = styled.form`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;
const Main = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;
const FormInput = styled.input`
  width: 88%;
  padding: 15px 20px;
  border: 2px solid #7d3cff;
  border-radius: 30px;
  font-size: 16px;
  color: #7a7a7a;
  background-color: #f4f6fc;
  font-weight: bold;
  outline: none;
  @media (max-width: 480px) {
    height: 10px;
    width: 80%;
    font-size: 12px;
    padding: 12px 18px;
  }
`;


const InputContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 20px;
  @media (max-width: 480px) {
    margin-bottom: 12px;
  }
`;

const Label = styled.span`
  position: absolute;
  top: -10px;
  left: 20px;
  background: linear-gradient(270deg, #222d78 0%, #7130e4 100%);
  color: white;
  padding: 2px 10px;
  border-radius: 20px;
  font-size: 12px;
`;


const SubmitButton = styled.button`
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

  @media (max-width: 768px) {
    width: 100%;
    font-size: 12px;
    padding: 5px;
  }
`;

const FormContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const Title = styled.h2`
  color: #0d47a1;
  text-align: center;
  font-weight: bold;
  margin-bottom: 2rem;
`;
const TableContainer = styled.div`
  margin-top: 40px;
  padding: 10px;
  max-width: 900px;
  height: 550px;
  overflow-y: auto;
  margin-left: auto;
  margin-right: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  font-size: 14px;
`;

const TableHeader = styled.th`
  padding: 12px;
  text-align: left;
  background-color: #f1f1f1;
  border: 1px solid #ddd;
`;

const TableCell = styled.td`
  padding: 8px;
  border: 1px solid #ddd;
`;

const TableRow = styled.tr`
  background-color: #fff;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const EditButton = styled.button`
  background-color: #ffa500;
  color: white;
  border: none;
  padding: 5px;
  cursor: pointer;
  &:hover {
    background-color: #ff8c00;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 15px 20px;
  border: 2px solid #7d3cff;
  border-radius: 30px;
  font-size: 16px;
  color: #7a7a7a;
  background-color: #f4f6fc;
  font-weight: bold;
  @media (max-width: 480px) {
    height: 38px;
    width: 94%;
    font-size: 12px;
    padding: 10px 12px;
  }
`;

const DeleteButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 5px;
  cursor: pointer;
  &:hover {
    background-color: #c0392b;
  }
`;

const LoginForm = () => {
    const [formData, setFormData] = useState({
        Id: '',
        Password: '',
        Role: '',
        DesignationName: ''
    });

    const [logins, setLogins] = useState([]);
    const [editing, setEditing] = useState(null); // Track if we're editing an existing login

    // Fetch logins from the backend
    useEffect(() => {
        fetchLogins();
    }, []);

    // Fetch logins function
    const fetchLogins = async () => {
        try {
            const response = await axios.get('https://api.edspride.in/user/all');
            var filData =  response.data.filter(val => val.Role === 'Student' || val.Role === 'Teacher' || val.Role === 'FrontOffice' || val.Role === 'Accountant' || val.Role === 'Librarian' || val.Role === 'SecurityGuard' || val.Role === 'Admin' || val.Role === 'Superadmin');
            setLogins(filData);
            // console.log(filData);
        } catch (error) {
            toast.error('Error fetching logins');
        }
    };

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Submit form (add or update)
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editing) {
                // Update login
                await axios.put(`https://api.edspride.in/user/update/${editing._id}`, formData);
                toast.success('Login updated successfully');
            } else {
                // Add new login
                await axios.post('https://api.edspride.in/user/add', formData);
                toast.success('Login created successfully');
            }

            setFormData({ Id: '', Password: '', Role: '', DesignationName: '' });
            setEditing(null); // Reset editing mode
            fetchLogins(); // Refresh the login list
        } catch (error) {
            toast.error('Error submitting form');
        }
    };

    // Handle edit
    const handleEdit = (login) => {
        setEditing(login);
        setFormData({
            Id: login.Id,
            Password: login.Password,
            Role: login.Role,
            DesignationName: login.DesignationName
        });
    };

    // Handle delete
    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://api.edspride.in/user/delete/${id}`);
            toast.success('Login deleted successfully');
            fetchLogins(); // Refresh the login list
        } catch (error) {
            toast.error('Error deleting login');
        }
    };

    return (
        <MainDashboard >
            <FormContainer>
                <ToastContainer />
                <Title>{editing ? 'Edit Login' : 'Create New Login'}</Title>
                <Form onSubmit={handleSubmit}>
                    <Main>
                        <InputContainer>
                            <Label>Enter Id</Label>
                            <FormInput
                                type="text"
                                name="Id"
                                value={formData.Id}
                                onChange={handleInputChange}
                                placeholder="ID"
                                required
                            />
                        </InputContainer>

                        <InputContainer>
                            <Label>Enter Password</Label>
                            <FormInput
                                type="text"
                                name="Password"
                                value={formData.Password}
                                onChange={handleInputChange}
                                placeholder="Password"
                                required
                            />
                        </InputContainer>

                        <InputContainer>
                            <Label>Enter Role</Label>
                            <Select name="Role" value={formData.Role} onChange={handleInputChange}>
                                <option value="">Select Role</option>
                                <option value="FrontOffice">FrontOffice</option>
                                <option value="Accountant">Accountant</option>
                                <option value="Librarian">Librarian</option>
                                <option value="SecurityGuard">SecurityGuard</option>
                                <option value="Admin">Admin</option>
                            </Select>
                        </InputContainer>
                        {/* <FormInput
                        type="text"
                        name="Role"
                        value={formData.Role}
                        onChange={handleInputChange}
                        placeholder="Role"
                        required
                    /> */}
                        {/* <FormInput
                        type="text"
                        name="DesignationName"
                        value={formData.DesignationName}
                        onChange={handleInputChange}
                        placeholder="Designation"
                    /> */}
                        <SubmitButton type="submit">{editing ? 'Update Login' : 'Create Login'}</SubmitButton>
                    </Main>
                </Form>
            </FormContainer>
            {/* Table Section */}
            <TableContainer>
                <h2>Login List</h2>
                {logins.length === 0 ? (
                    <p>No logins available</p>
                ) : (
                    <Table>
                        <thead>
                            <tr>
                                <TableHeader>ID</TableHeader>
                                <TableHeader>Role</TableHeader>
                                <TableHeader>Password</TableHeader>
                                <TableHeader>Actions</TableHeader>
                            </tr>
                        </thead>
                        <tbody>
                            {logins.map((login) => (
                                <TableRow key={login._id}>
                                    <TableCell>{login.Id}</TableCell>
                                    <TableCell>{login.Role}</TableCell>
                                    <TableCell>{login.Password || 'N/A'}</TableCell>
                                    <TableCell>
                                        <ButtonGroup>
                                            <EditButton onClick={() => handleEdit(login)}>Edit</EditButton>
                                            <DeleteButton onClick={() => handleDelete(login._id)}>Delete</DeleteButton>
                                        </ButtonGroup>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </tbody>
                    </Table>
                )}
            </TableContainer>
        </MainDashboard >
    );
};

export default LoginForm;
