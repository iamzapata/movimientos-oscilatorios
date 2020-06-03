import React from "react";
import FormulaMatematica from "components/FormulaMatematica";

const ValoresCalculados = ({
  valoresCalculados: {
    t,
    frecuencia,
    periodo,
    posicion,
    velocidad,
    aceleracion,
    fuerza,
    energiaCinetica,
    energiaCineticaMax,
    energiaPotencial,
    energiaPotencialMax,
    energiaMecanica,
  },
}) => {
  const formatearADosDecimales = (numero) => " " + numero.toFixed(2) + " ";

  return (
    <div className="columns">
      <div className="column FrecuenciaPeriodo">
        <p>
          <FormulaMatematica texto="f=" />
          <span className="has-text-grey">{formatearADosDecimales(frecuencia)}</span>
          <FormulaMatematica texto="Hz" />
        </p>
        <p>
          <FormulaMatematica texto="T=" />
          <span className="has-text-grey">{formatearADosDecimales(periodo)}</span>
          <FormulaMatematica texto="s" />
        </p>
      </div>
      <div className="column TiempoPosicionVelocidadAceleracion">
        <p>
          <FormulaMatematica texto="t=" />
          <span className="has-text-grey">{formatearADosDecimales(t)}</span>
          <FormulaMatematica texto="s" />
        </p>
        <p>
          <FormulaMatematica texto="x(t)=" />
          <span className="has-text-grey">{formatearADosDecimales(posicion)}</span>
          <FormulaMatematica texto="m" />
        </p>
        <p>
          <FormulaMatematica texto="v(t)=" />
          <span className="has-text-grey">{formatearADosDecimales(velocidad)}</span>
          <FormulaMatematica texto="m/s" />
        </p>
        <p>
          <FormulaMatematica texto="a(t)=" />
          <span className="has-text-grey">{formatearADosDecimales(aceleracion)}</span>
          <FormulaMatematica texto="m/s^2" />
        </p>
        <p>
          <FormulaMatematica texto="F=" />
          <span className="has-text-grey">{formatearADosDecimales(fuerza)}</span>
          <FormulaMatematica texto="N" />
        </p>
      </div>
      <div className="column Energia">
        <p>
          <FormulaMatematica texto="E_m=" />
          <span className="has-text-grey">{formatearADosDecimales(energiaMecanica)}</span>
          <FormulaMatematica texto="J" />
          <progress className="progress is-primary" value={energiaMecanica} max={energiaPotencialMax}>
            {energiaMecanica}
          </progress>
        </p>
        <p>
          <FormulaMatematica texto="E_c=" />
          <span className="has-text-grey">{formatearADosDecimales(energiaCinetica)}</span>
          <FormulaMatematica texto="J" />
          <progress className="progress is-link" value={energiaCinetica} max={energiaCineticaMax}>
            {energiaCinetica}
          </progress>
        </p>
        <p>
          <FormulaMatematica texto="E_p" />
          <span className="has-text-grey">{formatearADosDecimales(energiaPotencial)}</span>
          <FormulaMatematica texto="J" />
          <progress className="progress is-info" value={energiaPotencial} max={energiaPotencialMax}>
            {energiaPotencialMax}
          </progress>
        </p>
      </div>
    </div>
  );
};
export default ValoresCalculados;
