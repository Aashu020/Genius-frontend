import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import Navbar from '../component/Navbar';
import StudentSidebar from '../component/Sidebars/StudentSidebar';

const Container = styled.div`
  display: flex;
  background-color: #f4f4f4;
`;


const StudentLayout = () => {
    return (
        <>
            <Navbar />
            <Container>
                <StudentSidebar />
                <Outlet />
            </Container>
        </>
    )
}

export default StudentLayout
