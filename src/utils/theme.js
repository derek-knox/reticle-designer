import { createMuiTheme } from 'material-ui/styles';

export default function Theme() {
    return createMuiTheme({
        typography: {
            // Use the system font over Roboto.
            fontFamily: 'Orbitron,"Helvetica Neue",Arial,sans-serif',
        },
        props: {
            MuiButtonBase: {
                disableRipple: true
            },
        }
    });
}