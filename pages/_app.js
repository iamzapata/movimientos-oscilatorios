import React from "react";
import Head from "next/head";
import Navbar from "components/Navbar";

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
      <Navbar />
      <div className="container h-screen">
        <Component {...pageProps} />
      </div>
      <footer class="footer">
        <div class="content has-text-centered">
          <p>
            <a href="https://github.com/iamzapata/movimientoarmonicosimple" target="_blank">
              <span className="icon">
                <i class="fa fa-github-square" aria-hidden="true" />
              </span>
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
