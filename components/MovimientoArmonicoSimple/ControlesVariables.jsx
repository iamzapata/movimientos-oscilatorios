import React from "react";

const ControlesVariables = ({
  AMPLITUD_MAXIMA,
  AMPLITUD_MINIMA,
  valorGrados,
  valorRadianes,
  controlarSimulacion,
  estado: { amplitud, frecuenciaAngular, faseInicialInput, unidadesFaseInicial },
}) => (
  <div className="columns" style={{ marginBottom: "0" }}>
    <div className="column">
      <div className="field is-vertical">
        <div className="field-label is-normal is-marginless text-center">
          <label className="label">Amplitud</label>
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
          <label className="label">Frequencia Angular</label>
        </div>
        <div className="field-body">
          <div className="field">
            <input
              className="input"
              type="number"
              name="frecuencia_angular"
              placeholder="Frecuencia Angular"
              value={frecuenciaAngular}
              onChange={controlarSimulacion}
            />
          </div>
        </div>
      </div>
    </div>
    <div className="column">
      <div className="field is-vertical">
        <div className="field-label is-normal is-marginless text-center">
          <label className="label">Fase Inicial</label>
        </div>
        <div className="field-body">
          <div className="field flex">
            <input
              className="input"
              type="number"
              name="fase_inicial"
              placeholder="Fase Inicial"
              value={faseInicialInput}
              onChange={controlarSimulacion}
            />
            <div className="field flex flex-col items-start ml-3 relative" style={{ top: "-5px" }}>
              <label className="has-text-grey flex items-center" htmlFor="grados">
                <input
                  id="grados"
                  type="radio"
                  name="unidades_fase_inicial"
                  value="grados"
                  checked={unidadesFaseInicial === "grados"}
                  onChange={controlarSimulacion}
                />
                <span className="ml-1">°</span>
              </label>
              <label className="has-text-grey flex items-center" htmlFor="radianes">
                <input
                  id="radianes"
                  type="radio"
                  name="unidades_fase_inicial"
                  value="radianes"
                  checked={unidadesFaseInicial === "radianes"}
                  onChange={controlarSimulacion}
                />
                <span className="ml-1">rad</span>
              </label>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <canvas id="canvasfaseinicial"></canvas>
          <div className="">
            <p>
              <span>{valorGrados}</span>
              <span className="has-text-grey"> °</span>
            </p>
            <p>
              <span>{valorRadianes}</span>
              <span className="has-text-grey"> rad</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ControlesVariables;
