import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import theme from '../src/theme';
import createEmotionCache from '../src/createEmotionCache';
// import './../styles/globals.css'
import Navbar from "../src/Navbar";
import { SessionProvider } from "next-auth/react"
import { ToastContainer } from 'react-toastify';
import Auth from '../src/Auth';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps: { session, ...pageProps } } = props;

  React.useEffect(() => {
    const { innerWidth: width, innerHeight: height } = window;

    setTimeout(function () {
      let viewheight = height;
      let viewwidth = width;
      let viewport = document.querySelector("meta[name=viewport]");
      viewport.setAttribute("content", "height=" + viewheight + "px, width=" + viewwidth + "px, initial-scale=1.0");
    }, 300);
  }, [])


  return (

    <CacheProvider value={emotionCache}>

      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width, minimum-scale=1, maximum-scale=1" />
        <title>E-Logistics</title>
      </Head>
      <SessionProvider session={session}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Navbar/>
          {
            Boolean(Component.auth) ?
              <Auth componentProps={Component.auth}>
                <Component {...pageProps} />
              </Auth> :
              <Component {...pageProps} />
          }

          <ToastContainer />
        </ThemeProvider>
      </SessionProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};