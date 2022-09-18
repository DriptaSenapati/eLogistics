import { Avatar, Box, CircularProgress, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemSecondaryAction, ListItemText, Typography } from '@mui/material'
import React from 'react'
import { styled } from '@mui/material/styles';
import NorthWestIcon from '@mui/icons-material/NorthWest';
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';
import RestoreIcon from '@mui/icons-material/Restore';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import _ from 'underscore';

const StyledSearchHistory = styled(Box)(({ theme }) => ({
    position: "absolute",
    top: "110%",
    width: "70%",
    outline: "none",
    left: 0,
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.shape.borderRadius,
    [theme.breakpoints.down('md')]: {
        width: "100%"
    }
}))

const StyledHintTypography = styled(Typography)(({ theme }) => ({
    paddingLeft: "20px",
    paddingTop: "5px",
    fontSize: "small"
}))


const SearchHistory = ({ historyOpen, suggestions, setQuery, localSVal, setLocalVal }) => {
    console.log("localSVal1",localSVal)

    const modifyQuery = item => e => {
        e.preventDefault();
        setQuery(item)
    }

    const historyHandle = item => e => {
        e.preventDefault();
        var localnew = localSVal.filter((itemVal) => !_.isEqual(itemVal, item))
        setLocalVal(localnew);
    }


    return (
        <StyledSearchHistory sx={{ display: historyOpen ? "block" : "none" }}>
            {
                suggestions.length > 0 ?
                    <List dense>
                        {
                            localSVal && (
                                localSVal.map((val,ix) => (
                                    <ListItem key={ix}
                                    >
                                        <ListItemIcon>
                                            <RestoreIcon color='secondary'/>
                                        </ListItemIcon>
                                        <Link href={`/${val.ql}`}>
                                            <a>
                                                <ListItemText
                                                    primary={val.ql}
                                                    secondary={
                                                        <>
                                                            in &nbsp;
                                                            <Typography component="span" color='secondary' sx={{fontSize: "0.9em"}}>
                                                                {val.fl} category
                                                            </Typography>
                                                        </>
                                                    }
                                                />
                                            </a>

                                        </Link>

                                        <ListItemSecondaryAction>
                                            <IconButton edge="end" aria-label="delete" onClick={historyHandle(val)}>
                                                <HighlightOffIcon color='secondary'/>
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))
                                
                            )
                        }
                        { localSVal && localSVal.length > 0 && < Divider /> }
                        { localSVal && localSVal.length > 0 && (
                            <StyledHintTypography component="p">
                                Explore Trendings
                            </StyledHintTypography>
                        ) }
                        {
                            suggestions.map((item, idx) => (

                                <ListItem key = {item}
                                sx={{mt: 1}}
                                >
                                    <ListItemIcon>
                                        <SearchIcon color='secondary'/>
                                    </ListItemIcon>
                                    <Link href={`/${item}`}>
                                        <a>
                                            <ListItemText
                                                primary={item}
                                                secondary={null}
                                            />
                                        </a>

                                    </Link>

                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="delete" onClick={modifyQuery(item)}>
                                            <NorthWestIcon color='secondary'/>
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>

                            ))
                        }
                    </List> :
                    <CircularProgress variant="indeterminate" />
            }

        </StyledSearchHistory>
    )
}

export default SearchHistory