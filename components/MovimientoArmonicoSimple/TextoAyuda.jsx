import React from "react";

const TextoAyuda = () => (
  <div className="columns Texto-Ayuda">
    <div className="tooltip">
      <span className="has-text-danger">?</span>
      <span className="tooltiptext">
        <ul className="Texto-Ayuda-UL">
          <li className="has-text-grey has-text-weight-light">
            Usar <strong>.</strong> en vez de <strong>,</strong> como separador
            decimal.
          </li>
          <li className="has-text-grey has-text-weight-light">
            El peso de la masa es de
            <strong>
              10 <span>\[kg\]</span>
            </strong>
            .
          </li>
          <li className="has-text-grey has-text-weight-light">
            La constante del resorte es de
            <strong>
              10 <span>\[N/m\]</span>
            </strong>
            .
          </li>
        </ul>
      </span>
    </div>
  </div>
);

export default TextoAyuda;
