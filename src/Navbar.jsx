import { AppBar, Avatar, Box, Button, IconButton, Menu, MenuItem, Stack, Toolbar, Tooltip, Typography } from '@mui/material'
import { styled, alpha } from '@mui/material/styles';
import React from 'react';
import Image from 'next/image';
import profilePic from './../assets/img/logo.png'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CategoryIcon from '@mui/icons-material/Category';
import HomeIcon from '@mui/icons-material/Home';
import Link from 'next/link';
import { useSession, signOut } from "next-auth/react";
import { useRouter } from 'next/router';
import Search from './Search';
import Cart from './Cart';
import NavAddress from './NavAddress';


const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    '&:hover': {
        backgroundColor: alpha(theme.palette.primary.light, 0.2),
        color: theme.palette.primary.dark
    }
}))

const Navbar = () => {
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const { data: session } = useSession();
    const router = useRouter()

    const callBackUrl = router.asPath;

    if (session && !session.user.image) {
        session.user.image = "./broken-image.jpg"
    }



    

    const handleOpenUserMenu = (event) => {
        console.log(event.currentTarget)
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };




    const settings = session ? ["Profile", "Sign Out"] : ["Sign In"];



    return (
        <>
            <AppBar position="sticky" sx={{ backgroundColor: "#fdfffc" }}>
                <Toolbar
                    sx={{}}
                >
                    <Box sx={{ flexGrow: { xs: 1, md: 0 } }}>
                        <Image
                            src={profilePic}
                            alt="logo"
                            height={40}
                            width={120}
                        />
                    </Box>
                    <NavAddress styles={{
                        textAlign: "center",
                        flexGrow: 1,
                        display: { xs: "none", md: "block" },
                        fontSize: "0.9em"
                    }} />
                    <Search styles={{ width: "50%", display: { xs: "none", md: "block" }, flexGrow: 1 }} />
                    <Box sx={{ width: "200px", flexGrow: 1 }}>
                        <Stack direction="row"
                            justifyContent="flex-end"
                            alignItems="center"
                            spacing={3}
                        >
                            <Cart styles={{
                                margin: "0px 5px"
                            }} />

                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, marginRight: { xs: "10px !important", md: "30px !important" } }}>
                                    <Avatar alt={session && session.user.name} src={session && session.user.image} />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    setting === "Sign Out" ?
                                        <StyledMenuItem onClick={handleCloseUserMenu} key={setting}>
                                            <Typography textAlign="center" onClick={signOut}>{setting}</Typography>
                                        </StyledMenuItem>
                                        :
                                        <Link
                                            href={setting === "Sign In" ?
                                                `/${setting.replace(" ", "").toLowerCase()}?callBackUrl=${callBackUrl}` :
                                                `/${setting.replace(" ", "").toLowerCase()}`}
                                            key={setting}
                                        >
                                            <StyledMenuItem onClick={handleCloseUserMenu}>
                                                <Typography textAlign="center">{setting}</Typography>
                                            </StyledMenuItem>
                                        </Link>
                                ))}
                            </Menu>
                        </Stack>
                    </Box>
                </Toolbar>
                <Search styles={{ display: { xs: "block", md: "none" }, width: { xs: "95%", md: "90%" }, m: "2px auto", mb: 1 }} />
                <NavAddress styles={{
                    display: { xs: "block", md: "none" },
                    width: "fit-content",
                    textAlign: "center",
                    m: "2px 0px", mb: 1,
                    fontSize: "0.9em"
                }} />
            </AppBar>
            {/* <AppBar
                position="fixed"
                sx={{ display: { xs: "block", sm: "none" }, top: 'auto', bottom: 0, backgroundColor: "#fdfffc" }}
            >
                <Stack direction="row"
                    justifyContent="space-around"
                    alignItems="center"
                    spacing={0}>
                    {
                        ["Home", "Category", "User"].map((name) => (
                            <Box onClick={handleBottomAppbarClick(name)} key={name}>
                                <IconButton
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column"
                                    }}
                                    color={name === bottomName ? "primary" : "default"}>
                                    {name === "Home" && (
                                        <Link href="/">
                                            <HomeIcon fontSize='medium' />
                                        </Link>
                                    )}
                                    {name === "Category" && (
                                        <Link href={`/${name.toLowerCase()}`}>
                                            <CategoryIcon fontSize='medium' />
                                        </Link>
                                    )}
                                    {name === "User" && (
                                        <Avatar alt={session && session.user.name} src={session && session.user.image}
                                            sx={{ height: '25px', width: '25px', fontSize: '13px' }} />
                                    )}
                                    <Typography variant='p' sx={{ fontSize: 14 }}>
                                        {name}
                                    </Typography>
                                </IconButton>
                            </Box>
                        ))
                    }
                    <Menu sx={{ display: { xs: "block", sm: "none" } }}
                        id="menu-bottom-appbar"
                        anchorEl={bottomAnchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(bottomAnchorElUser)}
                        onClose={handleCloseBottomUserMenu}
                    >
                        {settings.map((setting) => (
                                setting === "Sign Out" ?
                                    <StyledMenuItem onClick={handleCloseBottomUserMenu} key={setting}>
                                        <Typography textAlign="center" onClick={signOut}>{setting}</Typography>
                                    </StyledMenuItem>
                                    :
                                    <Link
                                        href={setting === "Sign In" ?
                                            `/${setting.replace(" ", "").toLowerCase()}?callBackUrl=${callBackUrl}` :
                                             `/${setting.replace(" ", "").toLowerCase()}`}
                                        key={setting}
                                    >
                                        <StyledMenuItem onClick={handleCloseBottomUserMenu}>
                                            <Typography textAlign="center">{setting}</Typography>
                                        </StyledMenuItem>
                                    </Link>
                            ))}
                    </Menu>

                </Stack>
            </AppBar> */}
        </>
    )
}

export default Navbar