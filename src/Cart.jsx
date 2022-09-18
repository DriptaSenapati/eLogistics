import { Badge, Box, Tooltip } from '@mui/material'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Cart = ({ styles }) => {

    const { data: session, status } = useSession();

    const [cartCount, setcartCount] = useState(0)

    if (status === "loading") {
        return (
            <Box>
                <CircularProgress size={20}/>
            </Box>
        )
    }

    return (
        <Box sx={styles}>
            <Tooltip title="See Cart" arrow>
                <Badge badgeContent={4} color="primary" sx={{ cursor: "pointer" }}>
                    <ShoppingCartIcon color="secondary" />
                </Badge>
            </Tooltip>
        </Box>
    )
}

export default Cart