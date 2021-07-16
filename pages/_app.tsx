import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Head from "next/head";

import { createTheme, ThemeProvider, CssBaseline } from "@material-ui/core";
import { Provider } from "react-redux";
import store from "@store/store";

import { useEffect } from "react";
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
  const router = useRouter();
  let path = router.asPath;
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      // console.log(jssStyles);
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} path={path} />
      </ThemeProvider>
    </Provider>
  );
}
export default MyApp;
