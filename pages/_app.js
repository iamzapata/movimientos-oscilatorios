import React from "react";
import Head from "next/head";

import "bulma";
import "pages/styles.css";
import "katex/dist/katex.min.css";
import "tailwindcss/dist/tailwind.min.css";
import "font-awesome/css/font-awesome.min.css";
import "normalize.css";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
