import React from "react";

const TextoAyuda = () => (
  <div className="columns">
    <div className="column">
      <div className="Texto-Ayuda text-right">
        <div className="tooltip">
          <span className="has-text-danger">?</span>
          <span className="tooltiptext">
            <ul className="p-3">
              <li className="has-text-grey has-text-weight-light text-left">
                Usar <strong>.</strong> en vez de <strong>,</strong> como separador decimal.
              </li>
            </ul>
          </span>
        </div>
      </div>
    </div>
  </div>
);

export default TextoAyuda;
