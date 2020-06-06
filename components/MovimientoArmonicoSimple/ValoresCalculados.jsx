import React from "react";
import FormulaMatematica from "components/FormulaMatematica";

const ValoresCalculados = ({
  estado: {
    t,
    frecuencia,
    periodo,
    posicion,
    velocidad,
    aceleracion,
    fuerza,
    frecuenciaAngular,
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
          <FormulaMatematica texto="f=" className="inline-block" />
          <span className="has-text-grey">{formatearADosDecimales(frecuencia)}</span>
          <FormulaMatematica texto="Hz" className="inline-block" />
        </p>
        <p>
          <FormulaMatematica texto="T=" className="inline-block" />
          <span className="has-text-grey">{formatearADosDecimales(periodo)}</span>
          <FormulaMatematica texto="s" className="inline-block" />
        </p>
      </div>
      <div className="column TiempoPosicionVelocidadAceleracion">
        <p>
          <FormulaMatematica texto="t=" className="inline-block" />
          <span className="has-text-grey">{formatearADosDecimales(t)}</span>
          <FormulaMatematica texto="s" className="inline-block" />
        </p>
        <p>
          <FormulaMatematica texto="x(t)=" className="inline-block" />
          <span className="has-text-grey">{formatearADosDecimales(posicion)}</span>
          <FormulaMatematica texto="m" className="inline-block" />
        </p>
        <p>
          <FormulaMatematica texto="v(t)=" className="inline-block" />
          <span className="has-text-grey">{formatearADosDecimales(velocidad)}</span>
          <FormulaMatematica texto="m/s" className="inline-block" />
        </p>
        <p>
          <FormulaMatematica texto="a(t)=" className="inline-block" />
          <span className="has-text-grey">{formatearADosDecimales(aceleracion)}</span>
          <FormulaMatematica texto="m/s^2" className="inline-block" />
        </p>
        <p>
          <FormulaMatematica texto="F=" className="inline-block" />
          <span className="has-text-grey">{formatearADosDecimales(fuerza)}</span>
          <FormulaMatematica texto="N" className="inline-block" />
        </p>
        <p>
          <FormulaMatematica texto="\omega=" className="inline-block" />
          <span className="has-text-grey">{formatearADosDecimales(frecuenciaAngular)}</span>
          <FormulaMatematica texto="rad/s" className="inline-block" />
        </p>
      </div>
      <div className="column Energia">
        <p>
          <FormulaMatematica texto="E_m=" className="inline-block" />
          <span className="has-text-grey">{formatearADosDecimales(energiaMecanica)}</span>
          <FormulaMatematica texto="J" className="inline-block" />
          <progress
            className="progress is-primary rounded-none"
            value={energiaMecanica}
            max={energiaMecanica}
          >
            {energiaMecanica}
          </progress>
        </p>
        <p>
          <FormulaMatematica texto="E_c=" className="inline-block" />
          <span className="has-text-grey">{formatearADosDecimales(energiaCinetica)}</span>
          <FormulaMatematica texto="J" className="inline-block" />
          <progress className="progress is-link rounded-none" value={energiaCinetica} max={energiaCineticaMax}>
            {energiaCinetica}
          </progress>
        </p>
        <p>
          <FormulaMatematica texto="E_p=" className="inline-block" />
          <span className="has-text-grey">{formatearADosDecimales(energiaPotencial)}</span>
          <FormulaMatematica texto="J" className="inline-block" />
          <progress className="progress is-info rounded-none" value={energiaPotencial} max={energiaPotencialMax}>
            {energiaPotencialMax}
          </progress>
        </p>
      </div>
    </div>
  );
};
export default ValoresCalculados;
