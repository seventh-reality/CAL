import { ServerStyleSheets } from '@material-ui/core/styles'
import React from 'react'
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'

import theme from '../src/theme'

interface Props {
  locale: string;
  lang: string;
  nonce: string;
}

class MyDocument extends Document<Props> {
  static async getInitialProps(ctx: DocumentContext) {
    const { req } = ctx
    const locale = (req as any).locale

    // Render app and page and get the context of the page with collected side effects.
    const sheets = new ServerStyleSheets()
    const originalRenderPage = ctx.renderPage

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: App => props => sheets.collect(<App {...props} />),
      })

    const initialProps = await Document.getInitialProps(ctx)

    return {
      ...initialProps,
      locale,
      lang: locale ? locale.split('-')[0] : undefined,
      nonce: (req as any).nonce,
      // Styles fragment is rendered after the app and page rendering finish.
      styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
    }
  }

  render() {
    let scriptEl;
    if (this.props.locale) {
      scriptEl = (
        <script
          nonce={this.props.nonce}
          dangerouslySetInnerHTML={{
            __html: `window.LOCALE="${this.props.locale}"`,
          }}
        ></script>
      );
    }

    return (
      <Html lang={this.props.lang}>
        <Head>
          {/* PWA primary color */}
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
        </Head>
        <body>
          {scriptEl}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument
