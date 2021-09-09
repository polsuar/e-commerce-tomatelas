import { createTheme } from "@material-ui/core/styles";
import { grey, indigo } from "@material-ui/core/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: indigo[500],
    },
    secondary: {
      main: grey[900],
    },
  },
});

export default theme;
