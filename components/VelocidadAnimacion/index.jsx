import React from "react";

const VelocidadAnimacion = ({ controlarSimulacion, velocidadAnimacion }) => (
  <div className="columns flex flex-col absolute left-0" style={{bottom: '5px'}}>
    <div className="column flex justify-center pb-0">
      <span id="velocida_animacion" className="is-size-7 has-text-weight-semibold">
        1
      </span>
      <span className="is-size-7 has-text-weight-semibold">x</span>
    </div>
    <div className="column flex justify-center pt-0">
      <div className="control">
        <button name="mas_lento" type="button" className="button mx-5 is-small" onClick={controlarSimulacion}>
          <span className="icon" style={{ fontSize: "0.5rem" }}>
            <i className="fa fa-fast-backward"></i>
          </span>
        </button>
      </div>
      <input
        type="range"
        name="velocidad_animacion"
        min="0.25"
        value={velocidadAnimacion}
        max="2.25"
        step="0.25"
        onChange={controlarSimulacion}
      />
      <div className="control">
        <button name="mas_rapido" type="button" className="button mx-5 is-small" onClick={controlarSimulacion}>
          <span className="icon" style={{ fontSize: "0.5rem" }}>
            <i className="fa fa-fast-forward"></i>
          </span>
        </button>
      </div>
    </div>
  </div>
);

export default VelocidadAnimacion;
