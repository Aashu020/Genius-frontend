import React from 'react'
import styled from "styled-components";

const Box = styled.span`

  background: linear-gradient(270deg, #222d78 0%, #7130e4 100%);
  color: white;
  padding: 10px 5.5px;
    border-radius: 56px;
    font-size: 1px;
    padding-bottom: 0px;
`;
const Box1 = styled.span`

background: linear-gradient(270deg, #6c6c6c 0%, #525252 100%);
color: white;
padding: 10px 5.5px;
    border-radius: 56px;
    font-size: 1px;
    padding-bottom: 0px;
`;
const Info = styled.div`
margin-bottom: 10px;
`
const RequireSymbol = () => {
  return (
    <Info>
    <Box></Box>&nbsp;Required &nbsp;&nbsp;
    <Box1></Box1>&nbsp;Optional
  </Info>
  )
}

export default RequireSymbol
