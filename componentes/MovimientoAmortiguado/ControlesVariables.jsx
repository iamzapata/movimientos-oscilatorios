import React from "react";

const ControlesVariables = ({
  AMPLITUD_MAXIMA,
  AMPLITUD_MINIMA,
  controlarSimulacion,
  estado: { amplitud, c, masa, K},
}) => (
  <div className="columns" style={{ marginBottom: "0" }}>
    <div className="column">
      <div className="field is-vertical">
        <div className="field-label is-normal is-marginless text-center">
          <label className="label text-center">Amplitud</label>
        </div>
        <div className="field-body">
          <div className="field">
            <input
              className="input"
              type="number"
              name="amplitud_input"
              value={amplitud}
              placeholder="Amplitud"
              onChange={controlarSimulacion}
            />
          </div>
        </div>
        <div className="field-body">
          <div className="field">
            <input
              name="amplitud_range"
              placeholder="Desplazamiento Inicial"
              type="range"
              min={AMPLITUD_MINIMA}
              max={AMPLITUD_MAXIMA}
              value={amplitud}
              className="slider w-full"
              onChange={controlarSimulacion}
            />
          </div>
        </div>
      </div>
    </div>
    <div className="column">
      <div className="field is-vertical">
        <div className="field-label is-normal is-marginless text-center">
          <label className="label text-center">m</label>
        </div>
        <div className="field-body">
          <div className="field">
            <input
              className="input"
              type="number"
              name="masa"
              placeholder="masa"
              value={masa}
              onChange={controlarSimulacion}
            />
          </div>
        </div>
      </div>
    </div>
    <div className="column">
      <div className="field is-vertical">
        <div className="field-label is-normal is-marginless text-center">
          <label className="label text-center">K</label>
        </div>
        <div className="field-body">
          <div className="field">
            <input
              className="input"
              type="number"
              name="K"
              placeholder="Constante Resorte"
              value={K}
              onChange={controlarSimulacion}
            />
          </div>
        </div>
      </div>
    </div>
    <div className="column">
      <div className="field is-vertical">
        <div className="field-label is-normal is-marginless text-center">
          <label className="label text-center">c</label>
        </div>
        <div className="field-body">
          <div className="field flex">
            <input
              className="input"
              type="number"
              name="coeficiente_viscocidad"
              placeholder="Coeficiente de Viscosidad"
              value={c}
              onChange={controlarSimulacion}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ControlesVariables;
