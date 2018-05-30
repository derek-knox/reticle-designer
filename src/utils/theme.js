import { createMuiTheme } from 'material-ui/styles';

export default function Theme() {
    return createMuiTheme({
      palette: {
        primary: {
            light: "#cdff67",
            main: "#99cc33",
            dark: "#669b00",
            contrastText: "#fff"
        },
        secondary: {
            light: "#ff7fff",
            main: "#ff44ff",
            dark: "#c800cb",
            contrastText: "#000"
        }
      },
      props: {
        MuiButtonBase: {
          disableRipple: true
        }
      },
      typography: {
        // Use the system font over Roboto.
        fontFamily: 'Orbitron,"Helvetica Neue",Arial,sans-serif'
      }
    });
}