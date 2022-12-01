import type { AppProps } from "next/app";
import Router from "next/router";
import { ChakraProvider } from "@chakra-ui/react";
import NProgress from "nprogress";
import "../styles/NProgress.css";

import Layout from "../components/Layout";
import AuthProvider from "../context/UserContext";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <ChakraProvider>
        <AuthProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthProvider>
      </ChakraProvider>
  );
}

export default MyApp;
