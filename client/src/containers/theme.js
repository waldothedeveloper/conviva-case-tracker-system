import { red } from "@material-ui/core/colors";
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
    }
  },
  palette: {
    type: "dark",
    primary: {
      main: "#00465E"
    },
    secondary: {
      light: "#EBF4F4",
      main: "#CEE3E4",
      dark: "#BAD8D9"
    },
    error: {
      main: red.A400
    },
    background: {
      main: "#3A3A3A"
    },
    text: {
      primary: "#FFF",
      secondary: "#FB7B56",
      disabled: "#DFDCD4"
    }
  }
});

theme = responsiveFontSizes(theme);
export default theme;
