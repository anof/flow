import {createMuiTheme} from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#CCCCCC',
      light: '#EEEEEE',
      contrastText: '#000000'
    },
    secondary: {
      main: '#20d8da',
      contrastText: '#FFFFFF'
    },
    background: {
      default: '#CCCCCC'
    },

  }
});

export default theme;