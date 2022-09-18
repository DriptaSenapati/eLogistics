import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CircularProgress from '@mui/material/CircularProgress';
import { useSession } from 'next-auth/react';

const NavAddress = ({ styles }) => {

    const { data: session, status } = useSession();

    if (status === "loading") {
        return (
            <Box sx={{ ...styles }}>
                <CircularProgress size={20}/>
            </Box>
        )
    }

    return (
        <Box sx={{ ...styles }}>
            <Box sx={{ display: "flex", flexDirection: { xs: "row", md: "column" },paddingLeft: "10px",gap: {xs: "10px",md: "0px"} }}>
                <Typography variant='span'>
                    {
                        session ? `Delivery To,${session.user.name.split(" ")[0]}` : "Hello"
                    }
                </Typography>
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={1}
                >
                    <LocationOnIcon /> Select Your Address
                </Stack>
            </Box>
        </Box>
    )
}

export default NavAddress