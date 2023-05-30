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
      // In Chinese and Japanese the characters are usually larger,
      // so a smaller fontsize may be appropriate.
      fontSize: 14,
      title: {
        fontSize: 40,
        color: 'white',
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
