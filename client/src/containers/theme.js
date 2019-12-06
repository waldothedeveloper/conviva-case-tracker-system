import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
// import convCeraPRO from "../fonts/CeraPRO-Regular.ttf";

// const ceraPRO = {
//   fontFamily: "CeraPRO-Regular",
//   fontStyle: "regular",
//   fontWeight: 400,
//   src: `
//     local('CeraPRO-Regular'),
//     url(${convCeraPRO}) format('ttf')
//   `
// };

// A custom theme for this app
let theme = createMuiTheme({
  typography: {
    fontSize: 16
  },
  overrides: {
    // MuiCssBaseline: {
    //   "@global": {
    //     "@font-face": [ceraPRO]
    //   }
    // },
    MuiCardContent: {
      root: {
        padding: "16px 16px"
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
