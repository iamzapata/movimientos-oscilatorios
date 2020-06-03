import React from "react";

const VelocidadAnimacion = ({controlarSimulacion, velocidadAnimacion}) => (
  <div className="columns VelocidadAnimacion">
    <div className="column">
      <span
        id="velocida_animacion"
        className="is-size-7 has-text-weight-semibold"
      >
        1
      </span>
      <span className="is-size-7 has-text-weight-semibold">x</span>
    </div>
    <div className="column">
      <button name="mas_lento" type="button" className="button">
        <span className="icon is-small">
          <i className="fa fa-fast-backward"></i>
        </span>
      </button>
      <input
        type="range"
        name="velocidad_animacion"
        min="0.25"
        value={velocidadAnimacion}
        max="2.25"
        step="0.25"
        onChange={controlarSimulacion}
      />
      <button name="mas_rapido" type="button" className="button">
        <span className="icon is-small">
          <i className="fa fa-fast-forward"></i>
        </span>
      </button>
    </div>
  </div>
);

export default VelocidadAnimacion;
