import React from "react";

const ValoresPredefinidos = ({ estado, controlarSimulacion }) => (
  <div className="ValoresPredefinidos">
    <label htmlFor="id" className="label">Estados Predeterminados</label>
    <select
      className="select text-xl"
      name="tipo_amortiguamiento"
      id="valores_predeterminados"
      onChange={controlarSimulacion}
    >
      <option value="sin_amortiguamiento">Sin Amortiguamiento</option>
      <option value="subamortiguado">Subamortiguado</option>
      <option value="criticamente_amortiguado">Criticamente Amortiguado</option>
      <option value="sobreamortiguado">Sobreamortiguado</option>
    </select>
  </div>
);

export default ValoresPredefinidos;
