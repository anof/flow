/**
 * the following page has been taken from example code,
 * check tutorial in the link below:
 * https://developerhandbook.com/react/how-to-set-up-nextjs-material-ui/
 */

import React from 'react';
import Document, {Head, Html, Main, NextScript} from 'next/document';
import {ServerStyleSheets} from '@mui/styles';
import theme from '../styles/theme';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8"/>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          />
          <meta name="theme-color" content={theme.palette.primary.main}/>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:400,700|Material+Icons"
          />
          <style jsx global>
            {`
              html{
              height: 100%;
              width: 100%;
              }
              body {
                min-height: 100%;
                width: 100%;
              }
              *,
              *:after,
              *:before {
                box-sizing: border-box;
              }
              body {
                font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
                font-size: 1rem;
                margin: 0;
              }
            `}
          </style>
        </Head>
        <body>
        <Main/>
        <NextScript/>
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async ctx => {
  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props => sheets.collect(<App {...props} />)
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      <React.Fragment key="styles">
        {initialProps.styles}
        {sheets.getStyleElement()}
      </React.Fragment>
    ]
  };
};

export default MyDocument;