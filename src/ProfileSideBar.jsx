import { Box } from '@mui/material';
import React from 'react';
import { styled } from '@mui/material/styles';


const StyledSideBar = styled(Box)(({theme}) => ({
    backgroundColor: "transparent",
    width: "30vw",
    position: "fixed",
    height: "100%",
    left: 0,
    border: "1px solid black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
}))


const ProfileSideBar = () => {
  return (
    <StyledSideBar>
        sidebar
    </StyledSideBar>
  )
}

export default ProfileSideBar