import "../styles/globals.css";
import "react-phone-number-input/style.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { SWRConfig } from "swr";
import { createTheme, ThemeProvider, CssBaseline } from "@material-ui/core";
import { Provider } from "react-redux";
import store from "@store/store";
import axiosInstance from "@apiHelpers/axios";
import { useEffect } from "react";
import { axiosErrorHandler } from "@apiHelpers/apiUtils";
import Head from "next/head";
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
    background: {
      default: "#fff",
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
        <SWRConfig
          value={{
            fetcher: (...args: [any]) =>
              axiosInstance(...args)
                .then((res) => res.data)
                .catch((err) => {
                  throw axiosErrorHandler(err);
                }),
          }}
        >
          <Head>
            <link rel="icon" href="/loop-fav.png" />
            <title>
              Loopreceipt | The power of connecting your deliveries with smarter
              workflow
            </title>
            <meta
              name="description"
              content="Loopreceipt is delivery management made easy. Create your own account in minutes. A little smarter and faster to help you and your team stay in the loop for shipping and delivery communication."
            ></meta>
          </Head>
          <Component {...pageProps} path={path} />
          {/* // path variable is available to all pages */}
        </SWRConfig>
      </ThemeProvider>
    </Provider>
  );
}
export default MyApp;
