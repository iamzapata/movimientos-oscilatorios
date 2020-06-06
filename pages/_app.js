import React, { Component } from "react";
import Head from "next/head";
import ReactGA from "react-ga";
import Navbar from "components/Navbar";

import "pages/styles.scss";

// This default export is required in a new `pages/_app.js` file.
export default class MyApp extends Component {
  componentDidMount() {
    ReactGA.initialize('UA-168753949-1');
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
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
  }
}
