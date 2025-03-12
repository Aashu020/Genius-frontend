import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Eye } from 'lucide-react';
import bg from "../assets/Images/birthdaybg.jpeg"; // Your background image
import axios from 'axios';

const BirthdayWishesTable = () => {
    const [wishes, setWishes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [receiverId, setReceiverId] = useState("");
    const [error, setError] = useState(null);
    const [school, setSchool] = useState(null);

    useEffect(() => {
        var id = localStorage.getItem("Id");
        id && setReceiverId(id);
    }, []);

    useEffect(() => {
        axios
            .get("http://localhost:8007/schoolsetup/all")
            .then((response) => {
                if (response.data.length > 0) {
                    setSchool(response.data[0]); // Assuming only one school is returned
                }
            })
            .catch((error) => {
                console.error("Error fetching school data:", error);
            });
    }, []);

    useEffect(() => {
        const fetchWishes = async () => {
            try {
                var id = localStorage.getItem("Id");

                const response = await fetch(`http://localhost:8007/birthday/wishes/${id}`);
                const data = await response.json();
                if (response.ok) {
                    setWishes(data.data);
                } else {
                    setError(data.message);
                }
            } catch (err) {
                setError('Failed to fetch birthday wishes.');
            } finally {
                setLoading(false);
            }
        };

        fetchWishes();
    }, [receiverId]);

    const handleDownload = (senderName, senderRole, school) => {
        const img = new Image();
        img.src = bg;
        const name = JSON.parse(localStorage.getItem('EmployeeData'))?.Name || JSON.parse(localStorage.getItem('StudentData'))?.StudentName || senderRole;

        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            // Set text properties for the receiver's name (larger font size)
            ctx.font = '700 50px Arial';  // Larger font size for the receiver's name
            ctx.fillStyle = '#b93165'; // Color for the receiver's name
            ctx.textAlign = 'center';
            ctx.fillText(name, canvas.width / 2, 650);  // Receiver's name

            // Set text properties for the sender's name (medium font size)
            ctx.font = '30px Arial';  // Medium font size for sender's name
            ctx.fillStyle = '#b93165'; // Color for the sender's name
            ctx.textAlign = 'center';
            ctx.fillText(senderName, canvas.width / 2, 1100);  // Sender's name

            // Set text properties for the sender's role (smaller font size)
            ctx.font = '20px Arial';  // Smaller font size for sender's role
            ctx.fillStyle = '#b93165'; // Color for the sender's role
            ctx.textAlign = 'center';
            ctx.fillText(senderRole, canvas.width / 2, 1130);  // Sender's role

            // Load the school logo with cross-origin
            const logo = new Image();
            logo.crossOrigin = 'anonymous';  // Enable cross-origin request
            logo.src = `http://localhost:8007/uploads/${school?.SchoolLogo.replace(/^uploads\//, '')}`;

            logo.onload = () => {
                const logoWidth = 150;
                const logoHeight = 150;

                // Calculate the combined width of the logo and the text
                const textWidthSchoolName = ctx.measureText(school?.SchoolName || "School Name").width;
                const textWidthSchoolAddress = ctx.measureText(school?.Address || "School Address").width;

                // Total width for logo + text
                const totalWidth = logoWidth + 20 + Math.max(textWidthSchoolName, textWidthSchoolAddress);

                // Center the combined block of logo and text on the canvas
                const logoTextX = (canvas.width - totalWidth - 200) / 2;  // Position the whole block in the center

                const logoY = 50; // Place logo 50px from the top

                // Draw the logo onto the canvas
                ctx.drawImage(logo, logoTextX, logoY, logoWidth, logoHeight);

                // Define the starting point for the text (beside the logo)
                const textX = logoTextX + logoWidth + 20; // 20px to the right of the logo
                const textY = logoY + logoHeight / 2; // Vertically centered with the logo

                // Set text properties for School Name (larger font size)
                ctx.font = '700 50px Arial';  // Larger font for School Name
                ctx.fillStyle = '#fff';  // White color for the school name
                ctx.textAlign = 'left';  // Align text to the left (next to the logo)
                ctx.fillText(school?.SchoolName || "School Name", textX, textY);

                // Set text properties for School Address (smaller font size)
                ctx.font = '30px Arial';  // Smaller font for School Address
                ctx.fillStyle = '#fff';  // White color for the school address
                ctx.fillText(school?.Address || "School Address", textX, textY + 40); // 40px below the School Name

                // Trigger download
                const a = document.createElement('a');
                a.href = canvas.toDataURL('image/png');
                a.download = `${senderName}_birthday_wish.png`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            };
        };
    };



    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <TableContainer>
            <h2>Birthday Wishes</h2>
            {wishes.length === 0 ? (
                <p>No birthday wishes found.</p>
            ) : (
                <Table>
                    <thead>
                        <TableRow>
                            <TableHeader>Sender</TableHeader>
                            <TableHeader>Role</TableHeader>
                            <TableHeader>View</TableHeader>
                        </TableRow>
                    </thead>
                    <tbody>
                        {wishes.map((wish) => (
                            <TableRow key={wish._id}>
                                <TableData>{wish.SenderName}</TableData>
                                <TableData>{wish.SenderRole}</TableData>
                                <TableData>
                                    <Eye
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => handleDownload(wish.SenderName, wish.SenderRole, school)} // Pass sender's name and role
                                    />
                                </TableData>
                            </TableRow>
                        ))}
                    </tbody>
                </Table>
            )}
        </TableContainer>
    );
};

import { TableContainer, Table, TableRow, TableHeader, TableData } from './Outerstyle';

export default BirthdayWishesTable;
