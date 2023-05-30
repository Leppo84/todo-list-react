import { createTheme } from '@mui/material/styles';
import { cyan, green, grey } from '@mui/material/colors';

export const myFirstTheme = createTheme({
  palette: {
    primary: {
      main: cyan[300],
    },
    secondary: {
      main: grey[200],
    },
  },
});
