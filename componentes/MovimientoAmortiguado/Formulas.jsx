import React from "react";
import FormulaMatematica from "componentes/FormulaMatematica";

const Formulas = () => (
  <div className="columns Formulas mt-5" style={{marginBottom: '0'}}>
    <div className="column">
      <FormulaMatematica texto="\boldsymbol{x(t)}= {A} {e^{\lambda {t}}} \ {cos}(\omega t + \phi)" className="mb-2 flex flex" />
      <div className="columns mt-2">
        <div className="column mb-2">
          <FormulaMatematica texto="\boldsymbol{E_{p}}={\frac {1}{2}}kx^{2}" className="mb-2 flex" />
          <FormulaMatematica texto="{\boldsymbol{ E_{c}}={\frac {1}{2}}mv^{2}}" className="mb-2 flex" />
        </div>
        <div className="column">
          <FormulaMatematica texto="\boldsymbol{E_{m}}=E_{p}+E_{c}" className="mb-2 flex" />
        </div>
      </div>
    </div>
    <div className="column">
      <div className="columns">
        <div className="column flex flex-col justify-center">
        <FormulaMatematica texto="\boldsymbol{\lambda}=\frac {-b}{2m}" className="mb-2 flex" />
          <FormulaMatematica texto="\boldsymbol{f}=\frac {\omega }{2\pi}" className="mb-2 flex" />
          <FormulaMatematica texto="\boldsymbol{F}= -Kx -bv" className="mb-2 flex" />
        </div>
        <div className="column flex flex-col justify-center">
          <FormulaMatematica texto="\boldsymbol{T}=\frac{1}{f}=\frac {2\pi}{\omega}" className="mb-2 flex" />
          <FormulaMatematica texto="\boldsymbol\omega={\sqrt {{\frac{K}{m}} - {\frac{-b^2}{4m^2}}} }" className="mb-2 flex" />
        </div>
      </div>
    </div>
    <div className="column">
      <FormulaMatematica texto="\boldsymbol{A} \text{ es la amplitud del movimiento.}" className="flex mb-2" />
      <FormulaMatematica texto="\boldsymbol\omega \text{ es la frecuencia angular.}" className="flex mb-2" />
      <FormulaMatematica texto="\boldsymbol{t} \text{ es el tiempo.}" className="flex mb-2" />
      <FormulaMatematica texto="\boldsymbol{f} \text{ es la frecuencia de oscilación.}" className="flex mb-2" />
      <FormulaMatematica texto="\boldsymbol{T} \text{ es el período de oscilación.}" className="flex mb-2" />
      <FormulaMatematica texto="\boldsymbol{K} \text{ es la constante del resorte.}" className="flex" />
    </div>
  </div>
);

export default Formulas;
