import React from "react";
import FormulaMatematica from "components/FormulaMatematica";

const ValoresCalculados = () => (
  <div className="columns">
    <div className="column FrecuenciaPeriodo">
      <p>
        <FormulaMatematica texto="f=" />
        <span className="has-text-grey" id="frecuencia_oscilacion">
          0
        </span>
        <FormulaMatematica texto="Hz" />
      </p>
      <p>
        <FormulaMatematica texto="T=" />
        <span className="has-text-grey" id="periodo_oscilacion">
          0
        </span>
        <FormulaMatematica texto="s" />
      </p>
    </div>
    <div className="column TiempoPosicionVelocidadAceleracion">
      <p>
        <FormulaMatematica texto="t=" />

        <span className="has-text-grey" id="tiempo_oscilacion">
          0
        </span>

        <FormulaMatematica texto="s" />
      </p>
      <p>
        <FormulaMatematica texto="x(t)=" />
        <span className="has-text-grey" id="posicion_oscilacion">
          0
        </span>
        <FormulaMatematica texto="m" />
      </p>
      <p>
        <FormulaMatematica texto="v(t)=" />

        <span className="has-text-grey" id="velocidad_oscilacion">
          0
        </span>

        <FormulaMatematica texto="m/s" />
      </p>
      <p>
        <FormulaMatematica texto="a(t)=" />

        <span className="has-text-grey" id="aceleracion_oscilacion">
          0
        </span>
        <FormulaMatematica texto="m/s^2" />
      </p>
      <p>
        <FormulaMatematica texto="F=" />

        <span className="has-text-grey" id="fuerza_oscilacion">
          0
        </span>
        <FormulaMatematica texto="N" />
      </p>
    </div>
    <div className="column Energia">
      <p>
        <FormulaMatematica texto="E_m=" />

        <span className="has-text-grey" id="energia_mecanica">
          0
        </span>
        <FormulaMatematica texto="J" />

        <progress
          className="progress is-primary"
          id="energia_mecanica_barra"
          value="0"
          max="100"
        >
          0
        </progress>
      </p>
      <p>
        <FormulaMatematica texto="E_c=" />

        <span className="has-text-grey" id="energia_cinetica">
          0
        </span>
        <FormulaMatematica texto="J" />
        <progress
          className="progress is-link"
          id="energia_cinetica_barra"
          value="0"
          max="100"
        >
          0
        </progress>
      </p>
      <p>
        <FormulaMatematica texto="E_p" />

        <span className="has-text-grey" id="energia_potencial">
          0
        </span>
        <FormulaMatematica texto="J" />
        <progress
          className="progress is-info"
          id="energia_potencial_barra"
          value="0"
          max="100"
        >
          0
        </progress>
      </p>
    </div>
  </div>
);

export default ValoresCalculados;
