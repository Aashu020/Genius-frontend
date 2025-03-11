import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import Navbar from '../component/Navbar';
import EmployeeSidebar from '../component/Sidebars/EmployeeSidebar';

const Container = styled.div`
  display: flex;
  background-color: #f4f4f4;
`;


const EmployeeLayout = () => {
    return (
        <>
            <Navbar />
            <Container>
                <EmployeeSidebar />
                <Outlet />
            </Container>
        </>
    )
}

export default EmployeeLayout
