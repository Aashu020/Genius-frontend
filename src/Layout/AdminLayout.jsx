import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar';
import AdminSidebar from '../component/Sidebars/AdminSidebar';
import axios from 'axios';

const Container = styled.div`
  display: flex;
  background-color: #f4f4f4;
`;



const AdminLayout = () => {
    const navigate = useNavigate();
    useEffect(() => {
        axios
            .get("https://api.edspride.in/schoolsetup/all")
            .then((response) => {
                // console.log(response.data);
                if(response.data.length === 0){
                    navigate('/initial-setup')
                }
    
            })
            .catch((error) => {
                console.error(error);
            })
    }, [])


    return (
        <>
            <Navbar />
            <Container>
                <AdminSidebar />
                <Outlet />
            </Container>
        </>
    )
}

export default AdminLayout
