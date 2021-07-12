import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  makeStyles,
} from "@material-ui/core";
import Navbar from "@components/Navbar";
import { Provider } from "react-redux";
import store from "@store/store";
const theme = createTheme({
  palette: {
    primary: {
      main: "#21F9AE",
    },
  },
});
function MyApp({ Component, pageProps }: AppProps) {
  const styles = useStyles();
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Navbar />
        <div className={styles.content}>
          <Component {...pageProps} />
        </div>
        <CssBaseline />
        {/* this sets up the base styles for the app
      like fontFamilty: 'Roboto' * { boxSizing: 'border-box'} */}
      </ThemeProvider>
    </Provider>
  );
}
export default MyApp;
const useStyles = makeStyles((theme) => ({
  content: {
    // border: "1px solid blue",
    marginTop: 70, // 70px is navbar height
  },
}));
