import React from "react";
import Head from "next/head";
import Navbar from "components/Navbar";
import "pages/styles.scss";

const AppFisica = ({ Component, pageProps, isProduction, NEXT_PUBLIC_ANALYTICS_ID }) => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {isProduction && (
        <>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${NEXT_PUBLIC_ANALYTICS_ID}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${NEXT_PUBLIC_ANALYTICS_ID}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </>
      )}
    </Head>
    <Navbar />
    <div className="container h-screen">
      <Component {...pageProps} />
    </div>
    <footer className="footer">
      <div className="content has-text-centered">
        <p>
          <a href="https://github.com/iamzapata/movimientos-oscilatorios" target="_blank">
            <span className="icon">
              <i className="fa fa-github-square" aria-hidden="true" />
            </span>
          </a>
        </p>
      </div>
    </footer>
  </>
);

AppFisica.getInitialProps = async () => {
  const NODE_ENV = process.env.NODE_ENV;
  const NEXT_PUBLIC_ANALYTICS_ID = process.env.NEXT_PUBLIC_ANALYTICS_ID;
  const isProduction = NODE_ENV === "production";
  return { isProduction, NEXT_PUBLIC_ANALYTICS_ID };
};

export default AppFisica;
