import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
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
    secondary: {
      main: "#234361",
    },
    text: {
      primary: "#0F001A",
    },
  },
});
function MyApp({ Component, pageProps }: AppProps) {
  const styles = useStyles();
  const router = useRouter();
  let path = router.asPath;
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Navbar />
        <div className={styles.content}>
          <Component {...pageProps} path={path} />
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
