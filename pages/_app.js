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
import './../styles/nprogress.css'
import NProgress from 'nprogress'
import { useRouter } from 'next/router'
import 'react-toastify/dist/ReactToastify.css';
import { ToastCloseButton } from '../src/helpers/utils';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps: { session, ...pageProps } } = props;

  const router = useRouter()

  React.useEffect(() => {
    const handleStart = () => {
      NProgress.start()
    }

    const handleStop = () => {
      NProgress.done()
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])


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
          <Navbar />
          {
            Boolean(Component.auth) ?
              <Auth componentProps={Component.auth}>
                <Component {...pageProps} />
              </Auth> :
              <Component {...pageProps} />
          }

          <ToastContainer closeButton={ToastCloseButton}/>
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