import { cyan, teal } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export const myFirstTheme = createTheme({
    palette: {
      primary: {
        main: cyan [200],
      },
      secondary: {
        main: teal [700],
      },
    },
    typography: {
      fontSize: 14,
      title: {
        fontSize: 40,
        color: 'white',
      },
      h3: {
        fontWeight:500,
      },
    },
    components: {
      MuiTypography: {
        defaultProps: {
          variantMapping: {
            title: 'h1',
          }
        }
      }
    },
});
