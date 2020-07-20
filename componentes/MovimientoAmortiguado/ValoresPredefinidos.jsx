import React from "react";

const ValoresPredefinidos = ({ controlarSimulacion }) => (
  <div className="ValoresPredefinidos">
    <label htmlFor="id" className="label text-right">Estados Predeterminados</label>
    <select
      className="select text-xl"
      name="tipo_amortiguamiento"
      id="valores_predeterminados"
      onChange={controlarSimulacion}
    >
      <option value="sin_amortiguamiento">Sin Amortiguamiento</option>
      <option value="subamortiguado">Subamortiguamiento</option>
      <option value="criticamente_amortiguado">Amortiguamiento Crítico</option>
      <option value="sobreamortiguado">Sobreamortiguamiento</option>
    </select>
  </div>
);

export default ValoresPredefinidos;
