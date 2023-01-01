import { styled, alpha, emphasize } from '@mui/material/styles';
import { Card, Chip, ListItemButton, OutlinedInput, Select } from '@mui/material';
import { GLOBAL_BOX_SHADOW, GLOBAL_BORDER_RADIUS } from './helpers/constants';
import { green } from '@mui/material/colors';

export const MCard = styled(Card)(({ theme }) => ({
    borderRadius: `${GLOBAL_BORDER_RADIUS * 2}px`,
    '&.MuiPaper-elevation': {
        boxShadow: `${GLOBAL_BOX_SHADOW}`
    }
}))

export const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
    borderRadius: "15px",
    '&.Mui-selected': {
        color: theme.palette.primary.dark
    },
    [`&.Mui-selected:hover, &:hover`]: {
        backgroundColor: alpha(theme.palette.primary.light, 0.2),
        color: theme.palette.primary.dark
    }
}))

export const MOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
    borderRadius: "8px"
}))

export const MSelect = ({ children, ...others }) => {
    return (
        <Select
            {...others}
            MenuProps={{
                sx: {
                    '& .MuiMenu-paper': {
                        maxHeight: 100 * 4.5,
                        maxWidth: '20ch'
                    }
                }
            }}
        >
            {children}
        </Select>
    )
}


export const MBreadcrumb = styled(Chip)(({ theme }) => ({
    backgroundColor: alpha(theme.palette.primary.light,0.05),
    height: theme.spacing(3),
    color: green[800],
    cursor: "pointer",
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
        backgroundColor: emphasize(alpha(theme.palette.primary.light,0.2), 0.08),
        textDecoration: "underline"
    },
    '&:active': {
        boxShadow: theme.shadows[1],
        backgroundColor: emphasize(alpha(theme.palette.primary.light,0.2), 0.12),
    }
}));