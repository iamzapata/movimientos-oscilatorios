import React from "react";

const VelocidadAnimacion = () => (
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
        id="velocidad_animacion_range"
        name="velocidad_animacion"
        min="0.25"
        value="1.25"
        max="2.25"
        step="0.25"
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
