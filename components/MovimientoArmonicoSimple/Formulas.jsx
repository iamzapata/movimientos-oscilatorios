import React from "react";
import FormulaMatematica from "components/FormulaMatematica";

const Formulas = () => (
  <div className="columns Formulas mt-5">
    <div className="column">
      <FormulaMatematica texto="\boldsymbol{x(t)}= Asin(\omega t + \phi)" className="mb-3" />
      <FormulaMatematica texto="\boldsymbol{v(t)}={\frac {dx}{dt}}=-\omega A\ {sen}(\omega t+\phi)" className="mb-3" />
      <FormulaMatematica
        texto="\boldsymbol{a(t)}={\frac {dv(t)}{dt}}=-\omega ^{2}A\,\cos(\omega t+\phi )=-\omega ^{2}x(t)"
        className="mb-3"
      />
      <div className="columns mt-2">
        <div className="column mb-2">
          <FormulaMatematica texto="\boldsymbol{E_{p}}={\frac {1}{2}}kx^{2}" className="mb-3" />
          <FormulaMatematica texto="{\boldsymbol{ E_{c}}={\frac {1}{2}}m,v^{2}}" className="mb-3" />
        </div>
        <div className="column">
          <FormulaMatematica texto="\boldsymbol{E_{m}}=E_{p}+E_{c}" className="mb-2" />
        </div>
      </div>
    </div>
    <div className="column">
      <div className="columns">
        <div className="column flex flex-col justify-center">
          <FormulaMatematica texto="\boldsymbol{f}=\frac {\omega }{2\pi}" className="mb-3" />
          <FormulaMatematica texto="\boldsymbol{F}= -Kx" className="mb-3" />
        </div>
        <div className="column flex flex-col justify-center">
          <FormulaMatematica texto="\boldsymbol{T}=\frac{1}{f}=\frac {2\pi}{\omega}" className="mb-3" />
          <FormulaMatematica texto="\boldsymbol\omega={\sqrt \frac{k}{m}}" className="mb-3" />
        </div>
      </div>
    </div>
    <div className="column">
      <FormulaMatematica texto="\boldsymbol{A} \text{ es la amplitud del movimiento.}" />
      <FormulaMatematica texto="\boldsymbol\omega \text{ es la frecuencia angular.}" />
      <FormulaMatematica texto="\boldsymbol\omega \text{ es la frecuencia angular.}" />
      <FormulaMatematica texto="\boldsymbol\omega\boldsymbol{t} + \boldsymbol\phi \text{ es la fase de oscilación.}" />
      <FormulaMatematica texto="\boldsymbol\phi \text{ es la fase inicial y describe}" />
      <FormulaMatematica texto="\text{el estado de osilación en el instante }\boldsymbol{t}" />
      <FormulaMatematica texto="\boldsymbol{f} \text{ es la frecuencia de oscilación.}" />
      <FormulaMatematica texto="\boldsymbol{T} \text{ es el período de oscilación.}" />
    </div>
  </div>
);

export default Formulas;
