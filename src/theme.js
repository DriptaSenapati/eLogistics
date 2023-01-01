import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { alpha } from '@mui/material/styles';
import { ToastStyle } from '../styles/toast';
import { GLOBAL_BORDER_RADIUS,GLOBAL_BOX_SHADOW } from './helpers/constants';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#7fbe63',
      light: "#a6ff80",
      dark: "#334c28"
    },
    secondary: {
      main: '#bf6363',
      light: "#ff8080",
      dark: "#4c2828"
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fdfffc"
    }
  },
  typography: {
    fontFamily: `'Poppins', 'sans-serif'`
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        ::-webkit-scrollbar {
          width: 5px;
          cursor: pointer;
        }

        ::-webkit-scrollbar-track {
          background: ${alpha("#fdfffc", 0.01)};
        }

        ::-webkit-scrollbar-thumb {
          background: ${alpha("#334c28", 0.4)};
          border-radius: 10px;
          cursor: pointer;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #7fbe63;
        }

        a{
          text-decoration: none;
          color: unset;
        }

        ${ToastStyle}
      `
    },
    MuiMenuItem: {
      styleOverrides: {
        root: ({ theme }) => ({
          '&:hover': {
            backgroundColor: alpha(theme.palette.primary.light, 0.2),
            color: theme.palette.primary.dark
          },
          '&.Mui-selected': {
            backgroundColor: alpha(theme.palette.primary.light, 0.2),
            color: theme.palette.primary.dark
          }
        })
      }
    },
    MuiButton: {
      styleOverrides: {
        root: ({theme}) => ({
          borderRadius: `${GLOBAL_BORDER_RADIUS}px`,
          '&.MuiButton-containedPrimary:hover': {
            backgroundColor: theme.palette.secondary.main,
            color: "white"
          }
        })
      }
    }
  }
});

export default theme;