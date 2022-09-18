import { Backdrop, CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import React from "react"

export const SignInLoader = (props) => {

    const [open, setOpen] = React.useState(true);


    return (

        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={() => setOpen(!open)}
        >
            <Box sx={{ display: "flex", height: '100vh', width: "100vw", justifyContent: "center", alignItems: "center" }}>
                <CircularProgress color="inherit" />
            </Box>
        </Backdrop>

    )
}


