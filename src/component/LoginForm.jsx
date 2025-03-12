import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import {
  MainDashboard, FormContainer, Form, Main, InputContainer, Label, FormInput, Select,
  SubmitButton, TableContainer, Table, TableHeader, TableRow, TableData, ButtonGroup,
  EditButton, DeleteButton, Heading
} from './Outerstyle2';

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
      <MainDashboard>
        <FormContainer>
          <ToastContainer />
          <Heading>{editing ? 'Edit Login' : 'Create New Login'}</Heading>
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
              <SubmitButton type="submit">{editing ? 'Update Login' : 'Create Login'}</SubmitButton>
            </Main>
          </Form>
        </FormContainer>
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
                    <TableData>{login.Id}</TableData>
                    <TableData>{login.Role}</TableData>
                    <TableData>{login.Password || 'N/A'}</TableData>
                    <TableData>
                      <ButtonGroup>
                        <EditButton onClick={() => handleEdit(login)}>Edit</EditButton>
                        <DeleteButton onClick={() => handleDelete(login._id)}>Delete</DeleteButton>
                      </ButtonGroup>
                    </TableData>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          )}
        </TableContainer>
      </MainDashboard>
    );
};

export default LoginForm;
