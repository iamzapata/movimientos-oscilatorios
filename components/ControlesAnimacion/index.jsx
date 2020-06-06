import React from "react";

const ControlesAnimacion = ({ controlarSimulacion, deshabilitarParar, deshabilitarPausar, deshabilitarIniciar }) => (
  <div className="columns flex flex-col absolute right-0" style={{ bottom: "5px" }}>
    <div className="column flex items-center justify-center pt-0">
      <div className="control px-1">
        <button
          name="parar"
          type="button"
          className="button"
          onClick={controlarSimulacion}
          disabled={deshabilitarParar}
        >
          <span className="icon is-small">
            <i className="fa fa-stop-circle"></i>
          </span>
        </button>
      </div>

      <div className="control px-1">
        <button
          name="pausar"
          type="button"
          className="button"
          onClick={controlarSimulacion}
          disabled={deshabilitarPausar}
        >
          <span className="icon is-small">
            <i className="fa fa-pause-circle"></i>
          </span>
        </button>
      </div>

      <div className="control px-1">
        <button
          name="iniciar"
          type="button"
          className="button"
          onClick={controlarSimulacion}
          disabled={deshabilitarIniciar}
        >
          <span className="icon is-small">
            <i className="fa fa-play-circle"></i>
          </span>
        </button>
      </div>
    </div>
  </div>
);

export default ControlesAnimacion;
