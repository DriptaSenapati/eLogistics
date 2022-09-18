import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { alpha } from '@mui/material/styles';

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
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        ::-webkit-scrollbar {
          width: 5px;
          cursor: pointer;
        }

        ::-webkit-scrollbar-track {
          background: ${alpha("#fdfffc",0.01)};
        }

        ::-webkit-scrollbar-thumb {
          background: ${alpha("#a6ff80",0.4)};
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
      `
    }
  }
});

export default theme;