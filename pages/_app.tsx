import React, { useEffect } from 'react'
import { IntlProvider } from 'react-intl'
import PropTypes from 'prop-types'
import App, { AppProps } from 'next/app'
import Head from 'next/head'
import { DefaultSeo } from 'next-seo'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import { polyfill } from '../polyfills';
import theme from '../src/theme'

import SEO from '../next-seo.config'

interface Props extends AppProps {
  locale: string,
  messages: Record<string, string>
}

function MyApp({ Component, locale, messages, pageProps }: Props) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles)
    }
  }, []);

  return (
    <>
      <DefaultSeo {...SEO} />
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <title>Calculators</title>

        <link rel="manifest" href="/manifest.json" />
        <link
          href="/favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
        <meta name="theme-color" content="#317EFB" />
      </Head>

      <IntlProvider locale={locale} defaultLocale="en" messages={messages}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </IntlProvider>
    </>
  );
}

/**
 * Get the messages and also do locale negotiation. A multi-lingual user
 * can specify locale prefs like ['ja', 'en-GB', 'en'] which is interpreted as
 * Japanese, then British English, then English
 * @param locales list of requested locales
 * @returns {[string, Promise]} A tuple containing the negotiated locale
 * and the promise of fetching the translated messages
 */
function getMessages(locales: string | string[] = ['en']) {
  if (!Array.isArray(locales)) {
    locales = [locales]
  }

  let langBundle
  let locale
  for (let i = 0; i < locales.length && !locale; i++) {
    locale = locales[i];
    switch (locale) {
      case 'fr':
        langBundle = import('../compiled-lang/fr.json')
        break;
      default:
        break;
    }
  }

  if (!langBundle) {
    return ['en', import('../compiled-lang/en.json')]
  }

  return [locale, langBundle]
}

const getInitialProps: typeof App.getInitialProps = async appContext => {
  const {
    ctx: { req },
  } = appContext
  const requestedLocales: string | string[] =
    (req as any)?.locale ||
    (typeof navigator !== 'undefined' && navigator.languages) ||
    // IE11
    (typeof navigator !== 'undefined' && (navigator as any).userLanguage) ||
    (typeof window !== 'undefined' && (window as any).LOCALE) ||
    'en'

  const [supportedLocale, messagePromise] = getMessages(requestedLocales);

  const [, messages, appProps] = await Promise.all([
    polyfill(supportedLocale as string),
    messagePromise as Promise<{ default: {} }>,
    App.getInitialProps(appContext),
  ])

  return {
    ...(appProps as any),
    locale: supportedLocale,
    messages: messages.default,
  }
}

MyApp.getInitialProps = getInitialProps;

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp
