import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import ceraPRO from "../fonts/CeraPRO-Medium.ttf";

const ceraPROfont = {
  fontFamily: "Cera PRO",
  fontStyle: "normal",
  fontDisplay: "swap",
  fontWeight: 700,
  src: `local('CeraPRO-Regular'),
    local('CeraPRO-Medium'),
    local('CeraPRO-Light'),
    local('CeraPRO-Thin'),
    url(${ceraPRO} format('ttf'))
  `,
  unicodeRange:
    "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF"
};

// A custom theme for this app
let theme = createMuiTheme({
  typography: {
    fontFamily: "Cera PRO",
    fontSize: 17
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": [ceraPROfont]
      }
    },
    MuiCardContent: {
      root: {
        padding: "4px 16px"
      }
    },
    MuiInputBase: {
      input: {
        // Conviva Light Gray
        backgroundColor: "#F3F1ED",
        color: "#000"
      }
    },
    MuiCircularProgress: {
      colorPrimary: {
        color: "#FFF"
      }
    }
  },
  palette: {
    type: "dark",
    primary: {
      // Conviva Dark Blue
      main: "#00465E"
    },
    secondary: {
      // Conviva Light Blue
      main: "#9DC8C9"
    },
    error: {
      // Conviva Orange
      main: "#FB7B56"
    },
    background: {
      // Conviva Dark Blue
      paper: "#00465E",
      // Conviva Dark Gray
      main: "#16293A"
    },
    text: {
      primary: "#FFF",
      // Conviva Light Blue 20%
      secondary: "#EBF4F4",
      disabled: "#DFDCD4"
    },
    action: {
      // Conviva Orange
      active: "#FB7B56",
      // Conviva Light Blue 20%
      hover: "#FB7B56",
      // Conviva Light Blue 50%
      selected: "#CEE3E4",
      // Conviva Light Gray
      disabled: "#F3F1ED",
      // Conviva Medium Gray
      disabledBackground: "#DFDCD4"
    }
  }
});

theme = responsiveFontSizes(theme);
export default theme;
