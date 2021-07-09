import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createTheme, ThemeProvider, CssBaseline } from "@material-ui/core";
const theme = createTheme({
  palette: {
    primary: {
      main: "#21F9AE",
    },
  },
});
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
      <CssBaseline />
      {/* this sets up the base styles for the app
      like fontFamilty: 'Roboto' * { boxSizing: 'border-box'} */}
    </ThemeProvider>
  );
}
export default MyApp;
