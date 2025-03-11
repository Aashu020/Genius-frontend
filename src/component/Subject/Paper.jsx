import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f3f3f3;
`;

const Frame = styled.iframe`
  width: 80%;
  height: 90vh;
  border: none;
`;

const Paper = () => {
  // Manually defined JSON data
  const data = {
    class: "Class A",
    subject: "Hindi",
    chapters: [
      {
        chapterNumber: "Chapter 1",
        chapterTitle: "Chapter Name",
        subChapters: [
          "1.1: Chapter Name",
          "1.2: Chapter Name",
          "1.3: Chapter Name"
        ]
      },
      {
        chapterNumber: "Chapter 2",
        chapterTitle: "Chapter Name",
        subChapters: [
          "2.1: Chapter Name",
          "2.2: Chapter Name",
          "2.3: Chapter Name",
          "2.4: Chapter Name"
        ]
      },
      {
        chapterNumber: "Chapter 3",
        chapterTitle: "Chapter Name",
        subChapters: [
          "3.1: Chapter Name",
          "3.2: Chapter Name",
          "3.3: Chapter Name",
          "3.4: Chapter Name"
        ]
      }
    ]
  };

  return (
    <Container>
      <Frame srcDoc={`
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                padding: 0;
                background-color: #f3f3f3;
              }
              .content {
                width: 80%;
                border: 1px solid #ccc;
                background: white;
                padding: 20px;
                box-sizing: border-box;
              }
              h1 {
                text-align: center;
              }
              h2, h3 {
                margin: 0;
              }
              p {
                margin-left: 20px;
              }
            </style>
          </head>
          <body>
            <div class="content">
              <h1>${data.class}</h1>
              <h2>${data.subject}</h2>
              ${data.chapters
                .map(
                  (chapter) => `
                    <h3>${chapter.chapterNumber} : ${chapter.chapterTitle}</h3>
                    ${chapter.subChapters
                      .map(
                        (subChapter) => `<p>${subChapter}</p>`
                      )
                      .join("")}
                  `
                )
                .join("")}
            </div>
          </body>
        </html>
      `} />
    </Container>
  );
};

export default Paper;
