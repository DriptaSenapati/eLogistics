import { Box } from '@mui/material'
import React from 'react'
import ProfileForm from '../src/ProfileForm'
import ProfileSideBar from '../src/ProfileSideBar'

const Profile = () => {
  return (
    <Box>
        <ProfileSideBar/>
        <ProfileForm/>
    </Box>
  )
}

export default Profile