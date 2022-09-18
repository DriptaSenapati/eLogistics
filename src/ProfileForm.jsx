import { Box } from '@mui/material'
import React from 'react';
import { styled } from '@mui/material/styles';

const StyledProfileForm = styled(Box)(({theme}) => ({
    position: "relative",
    right: "-35vw",
    width: "60vw",
    border: "1px solid black"
}))

const ProfileForm = () => {
  return (
    <StyledProfileForm sx={{height: "1000px"}}>
        prfile
    </StyledProfileForm>
  )
}

export default ProfileForm