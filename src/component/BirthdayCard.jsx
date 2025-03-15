import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import bg from "../assets/Images/birthdaybg.jpeg";
import html2canvas from "html2canvas"; // Import html2canvas
import  baseURL from './utils/Url'; 
// const BASE_URL = "`${baseURL}/"; // Base URL for logo and assets

const BirthdayCard = () => {
    const [school, setSchool] = useState(null); // State to store school data
    const iframeRef = useRef(null); // Reference to the iframe to capture content

    // Static names for birthday and sender
    const birthdayPerson = "John Doe"; // Replace with the actual name
    const senderName = "Jane Smith"; // Replace with the actual sender's name
    const senderClassSection = "10A"; // Replace with the actual sender's class-section

    useEffect(() => {
        axios
            .get(`${baseURL}/schoolsetup/all`)
            .then((response) => {
                if (response.data.length > 0) {
                    setSchool(response.data[0]); // Assuming only one school is returned
                }
            })
            .catch((error) => {
                console.error("Error fetching school data:", error);
            });
    }, []);

    // Function to capture the content and trigger download
    const handleDownload = () => {
        if (iframeRef.current) {
            // Ensure that the image in the iframe is loaded before capturing
            const iframeDocument = iframeRef.current.contentDocument;

            // Capture iframe content using html2canvas with CORS enabled
            html2canvas(iframeDocument.body, {
                useCORS: true, // Enable CORS to handle cross-origin images
                allowTaint: true, // Allow images from other origins to be captured
            }).then((canvas) => {
                // Convert canvas to image
                const imgData = canvas.toDataURL("image/png");

                // Create an anchor element to trigger the download
                const link = document.createElement("a");
                link.href = imgData;
                link.download = "birthday_card.png";
                link.click();
            });
        }
    };

    return (
        <div style={wrapperStyle}>
            <iframe
                ref={iframeRef}
                title="Birthday Card"
                style={iframeStyle}
                srcDoc={`<!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>
                body {
                  margin: 0;
                  padding: 0;
                  height: 100vh;
                  display: flex;
                  flex-direction: column;
                  justify-content: space-between; /* Space out elements */
                  align-items: center;
                  background-image: url(${bg});
                  background-size: cover;
                  background-position: center;
                  color: white;
                  text-align: center;
                  font-family: Arial, sans-serif;
                }
                .header {
                  position: absolute;
                  top: 10px;
                  width: 100%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  gap: 10px;
                }
                .header img {
                  height: 60px;
                }
                .header .info {
                  text-align: left;
                }
                .header span {
                  font-size: 18px;
                  font-weight: bold;
                }
                .header p {
                  margin: 0;
                  font-size: 14px;
                }
                h1 {
                  font-size: 36px;
                  margin-top: 21rem;
                  font-style:italic;
                  color: #b93165;
                }
                .sender-info {
                  font-size: 22px;
                  font-weight: bold;
                  color: #b93165;
                   font-style:italic;
                  margin-bottom: 15rem; /* Add space from the bottom */
                }
              </style>
            </head>
            <body>
              <div class="header">
                ${school?.SchoolLogo
                        ? `<img src="${baseURL}uploads/${school?.SchoolLogo.replace(/^uploads\//, '')}" alt="School Logo" />`
                        : "<p>Loading...</p>"
                    }
                <div class="info">
                  <span>${school?.SchoolName || "School Name"}</span>
                  <p>${school?.Address || "School Address"}</p>
                </div>
              </div>

              <h1>${birthdayPerson}</h1>
              
              <div class="sender-info">
                <p>${senderName} ${senderClassSection}</strong></p>
              </div>
            </body>
          </html>
        `}
            ></iframe>

            {/* Download button */}
            <button onClick={handleDownload} style={downloadButtonStyle}>
                Download as Image
            </button>
        </div>
    );
};

// Inline styles for the container, iframe, and download button
const wrapperStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    flex: "1",
    height: "auto",
    backgroundColor: "#f2f2f2",
};

const iframeStyle = {
    width: "700px",
    height: "100vh",
    border: "none",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
};

const downloadButtonStyle = {
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
};

export default BirthdayCard;
