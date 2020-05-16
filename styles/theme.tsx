import {createMuiTheme} from "@material-ui/core/styles";

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#20d8da",
            contrastText: "#ffffff"
        },
        secondary: {
            main: "#ffffff",
        },
        background:{
            default: "#111111"
        }
    }
});

export default theme