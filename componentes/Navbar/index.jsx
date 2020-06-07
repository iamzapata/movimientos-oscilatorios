import React from "react";
import Link from "next/link";

const Navbar = () => (
  <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <Link href="/">
        <a className="navbar-item">
          <img src="/iconoresorte.png" />
        </a>
      </Link>

      <a
        role="button"
        className="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" className="navbar-menu">
      <div className="navbar-start">
        {/* <Link href="documentacion">
          <a className="navbar-item">Documentación</a>
        </Link> */}
      </div>

      {/* <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            <a className="button is-secondary">
              <span className="icon">
                <i className="fa fa-question-circle"></i>
              </span>
            </a>
          </div>
        </div>
      </div> */}
    </div>
  </nav>
);

export default Navbar;
