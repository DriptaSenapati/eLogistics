import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import _ from 'underscore';
import { styled, alpha, useTheme } from '@mui/material/styles';
import { Backdrop, Button, ClickAwayListener, Dialog, FormControl, IconButton, InputBase, MenuItem, Box, Select } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchHistory from './SearchHistory';
import { useLocalStorage } from 'react-use';
import { object_in_array, index_object_array } from './helpers/utils';
import { v4 as uuidv4 } from 'uuid';
// import { Box } from '@mui/system';


const ITEM_HEIGHT = 45;

const options = [
    "All",
    "Electronics",
    "Kitchen",
    "Toys",
    "Dress",
    "Kurtas",
    "Sun Glass",
    "Foot Wear",
    "Utencils",
    "T-Shirts"
]

const StyledSearch = styled('form')(({ theme }) => ({
    // position: 'relative',
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.default,
    position: "relative",
    '&:hover': {
        // backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    width: '100%',
    height: '40px',
    border: `1px solid ${theme.palette.secondary.main}`,
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
    padding: 2
}));

// const StylesSearchIcon = styled(SearchIcon)(({ theme }) => ({
//     color: theme.palette.primary.dark
// }))

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//     // padding: theme.spacing(0, 2),
//     background: theme.palette.secondary.light,
//     color: theme.palette.background.default,
//     height: '99%',
//     width: '30px',
//     // position: 'absolute',
//     cursor: 'pointer',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     flex: 1,
//     borderRadius: theme.shape.borderRadius
//     // right: 0
// }));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    flex: 13,

    '& .MuiInputBase-input': {
        // padding: theme.spacing(1, 1, 1, 0),
        borderRadius: theme.shape.borderRadius,
        paddingLeft: `calc(1em + ${theme.spacing(1)})`,
        // border: `1px solid ${theme.palette.primary.dark}`,
        transition: theme.transitions.create('width'),
        '&::placeholder': {
            color: theme.palette.secondary.light,
            [theme.breakpoints.down('md')]: {
                fontSize: theme.typography.fontSize
            }
        },
        // width: '100%',
        // [theme.breakpoints.up('md')]: {
        //     width: '20ch'
        // },
        // [theme.breakpoints.up('lg')]: {
        //     width: '20ch',
        //     '&:focus': {
        //         width: '40ch',
        //     }
        // },
    },
}));




const StyledSelect = styled(Select)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    flex: 1,
    color: theme.palette.background.default,
    backgroundColor: theme.palette.secondary.main,
    '& .MuiSelect-icon': {
        color: theme.palette.background.default
    },
    '& .MuiSelect-select': {
        padding: 0,
        height: '100%',
        marginLeft: theme.spacing(1),
        paddingRight: "40px !important",

    },
    '& .MuiOutlinedInput-notchedOutline': {
        border: 'none'
    }
    // left: 0
}))



const Search = ({ styles }) => {
    // const [searchFormVal, setSearchFormVal] = useState({
    //     filter: "All",
    //     searchVal: ""
    // })
    const [value, setValue] = useLocalStorage('qry');
    const [searchFilter, setSearchFilter] = useState("All");
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const [historyOpen, setHistoryOpen] = useState(false);

    const theme = useTheme();



    const handleChange = (e) => {
        setSearchFilter(e.target.value)
    }

    const handleFocus = async () => {
        await fetch("/api/autosuggestions").
            then(res => res.json()).then((result) => {
                setSuggestions(result);
            })
        setHistoryOpen(true);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.filter.value);
        console.log(e.target.query.value);
        console.log(value);
        if (e.target.query.value.length > 0) {
            const shid = uuidv4()
            var setval = {
                fl: e.target.filter.value,
                ql: e.target.query.value
            }
            
            setValue(() => {
                if (value) {
                    const [isIn,Ob] = object_in_array(setval,value);
                    if (isIn) {
                        // value.splice(0,0,value.splice(index_object_array(value,"id",Ob.id),1)[0]);
                        value.unshift(value.splice(index_object_array(value,"id",Ob.id), 1)[0]);
                    }else{
                        value.unshift({
                            id: shid,
                            ...setval
                        })
                    }
                    
                    return value;
                } else {
                    return (
                        [
                            {
                                id: shid,
                                ...setval
                            }
                        ]
                    )
                }
            })
        }

    }

    return (

        <Box sx={{ ...styles }}>
            <Backdrop open={historyOpen} onClick={() => setHistoryOpen(false)} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} />
            <StyledSearch onSubmit={handleSubmit} sx={{ zIndex: (theme) => historyOpen && theme.zIndex.drawer + 2 }}>
                {/* <Box sx={{ height: '100%',  }}> */}
                <FormControl sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <StyledSelect
                        color='secondary'
                        defaultValue={searchFilter}
                        onChange={handleChange}
                        displayEmpty
                        IconComponent={FilterListIcon}
                        inputProps={{
                            'aria-label': 'Without label',
                            name: "filter"
                        }}
                        id="filter_select"
                        MenuProps={{
                            // PaperProps: {
                            //     style: {
                            //         maxHeight: ITEM_HEIGHT * 4.5,
                            //         maxWidth: '20ch',
                            //     },
                            // }
                            sx: {
                                '& .MuiMenu-paper': {
                                    maxHeight: ITEM_HEIGHT * 4.5,
                                    maxWidth: '20ch',
                                    [theme.breakpoints.down('md')]: {
                                        position: 'absolute !important',
                                        maxWidth: "none",
                                        width: "70%",
                                        top: '25% !important',
                                        left: '50% !important',
                                        transform: 'translate(-50%) !important',
                                        maxHeight: ITEM_HEIGHT * 5.5
                                    }
                                },
                                '& .MuiMenu-list': {
                                    '& .MuiMenuItem-root': {
                                        '&:hover': {
                                            color: theme.palette.secondary.main,
                                        }
                                    }
                                }
                            }
                        }}
                    >
                        {
                            options.map(option => (
                                <MenuItem value={option} key={option}>{option}</MenuItem>
                            ))
                        }
                    </StyledSelect>
                </FormControl>

                {/* </Box> */}
                <StyledInputBase
                    autoComplete="off"
                    placeholder={searchFilter === "All" ? "Search.." : `Search in ${searchFilter}...`}
                    inputProps={{ 'aria-label': 'search', color: "secondary", name: "query" }}
                    onFocus={handleFocus}
                    key="search"
                    type='text'
                    // onBlur={() => setHistoryOpen(false)}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}

                />
                <IconButton type='submit' color='secondary' size='large'>
                    <SearchIcon fontSize='14px' />
                </IconButton>
                <SearchHistory historyOpen={historyOpen} suggestions={suggestions} setQuery={setQuery}
                    localSVal={value} setLocalVal={setValue} />
            </StyledSearch>
        </Box>
    )
}

function areEqual(prevProps, nextProps) {
    if (_.isEqual(prevProps.styles, nextProps.styles)) {
        return true
    }
    return false
}


export default React.memo(Search, areEqual);