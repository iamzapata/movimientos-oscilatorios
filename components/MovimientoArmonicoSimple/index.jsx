import React, { Component } from "react";
import Head from "next/head";
import TextoAyuda from "components/MovimientoArmonicoSimple/TextoAyuda";
import Formulas from "components/MovimientoArmonicoSimple/Formulas";
import ValoresCalculados from "components/MovimientoArmonicoSimple/ValoresCalculados";
import ControlesVariables from "components/MovimientoArmonicoSimple/ControlesVariables";
import VelocidadAnimacion from "components/VelocidadAnimacion";
import ControlesAnimacion from "components/ControlesAnimacion";

import { PI, PI2 } from "constants";

// Este es un valor abritrario pra simular
// que una oscilación con omega en 6.28 dura un segundo
const VALOR_INCREMEMENTO = 0.035;

const AMPLITUD_MINIMA = -600;
const AMPLITUD_MAXIMA = 600;

const estadoInicial = {
  t: 0,
  dimensionBloque: 100,
  velocidadAnimacion: 1,
  amplitud: 0,
  masa: 1,
  K: 1,
  faseInicial: 0,
  faseInicialInput: 0,
  unidadesFaseInicial: "grados",
  reproduccionEnCurso: false,
  incremento: VALOR_INCREMEMENTO,

  frecuencia: 0,
  periodo: 0,
  posicion: 0,
  velocidad: 0,
  aceleracion: 0,
  fuerza: 0,
  frecuenciaAngular: 1,
  energiaCinetica: 0,
  energiaCineticaMax: 0,
  energiaPotencial: 0,
  energiaPotencialMax: 0,
  energiaMecanica: 0,
};

class MovimientoArmonicoSimple extends Component {
  state = {
    ...estadoInicial,
  };

  componentDidMount() {
    this.canvasPrincipal = document.getElementById("canvasprincipal");
    this.contextPrincipal = this.canvasPrincipal.getContext("2d");

    this.canvasSecundario = document.getElementById("canvassecundario");
    this.contextSecundario = this.canvasSecundario.getContext("2d");

    this.canvasFaseInicial = document.getElementById("canvasfaseinicial");
    this.contextFaseInicial = this.canvasFaseInicial.getContext("2d");

    this.canvasVectores = document.getElementById("canvasvectores");
    this.contextVectores = this.canvasVectores.getContext("2d");

    this.establecerResolucionCanvas(this.canvasPrincipal);
    this.establecerResolucionCanvas(this.canvasSecundario);
    this.establecerResolucionCanvas(this.canvasVectores);

    this.dibujarCanvas();
  }

  establecerResolucionCanvas = (canvas) => {
    const dpr = window.devicePixelRatio;

    canvas.width = 1000 * dpr;
    canvas.height = 400 * dpr;

    const { width, height } = canvas;

    this.width = width;
    this.height = height;

    canvas.style.width = `${width / dpr}px`;
    canvas.style.height = `${height / dpr}px`;
  };

  controlarSimulacion = (evento) => {
    const { velocidadAnimacion, faseInicialInput } = this.state;
    let { name, value } = evento.currentTarget;

    const valor = parseFloat(value);

    switch (name) {
      case "amplitud_range":
        this.actualizarAmplitudRange(valor);
        break;
      case "amplitud_input":
        this.actualizarAmplitudInput(valor ? valor : 0);
        break;
      case "frecuencia_angular":
        if (valor < 0) {
          this.setState({ frecuenciaAngular: 0 });
          return;
        }
        this.setState({ frecuenciaAngular: valor ? valor : 0 });
        break;
      case "masa":
        if (valor < 0) {
          this.setState({ masa: 0 });
          return;
        }
        this.setState({ masa: value }, () => this.actualizarFrecuenciaAngular());
        break;
      case "K":
        if (valor < 0) {
          this.setState({ K: 0 });
          return;
        }
        this.setState({ K: value }, () => this.actualizarFrecuenciaAngular());
        break;
      case "fase_inicial":
        this.actualizarFaseInicial(valor);
        break;
      case "unidades_fase_inicial":
        this.setState({ unidadesFaseInicial: evento.target.value }, () => this.actualizarFaseInicial(faseInicialInput));
        break;
      case "iniciar":
        this.setState({ reproduccionEnCurso: true });
        break;
      case "pausar":
        this.setState({ reproduccionEnCurso: false });
        break;
      case "parar":
        this.reestablecerValores();
        this.limpiarAmplitudes();
        break;
      case "velocidad_animacion":
        this.actualizarVelocidadAnimacion(valor);
        break;
      case "mas_rapido":
        this.actualizarVelocidadAnimacion(Number(velocidadAnimacion) + 0.25);
        break;
      case "mas_lento":
        this.actualizarVelocidadAnimacion(Number(velocidadAnimacion) - 0.25);
        break;
      default:
        null;
    }
  };

  deshabilitarParar = () => {
    const { reproduccionEnCurso, amplitud } = this.state;

    return amplitud === 0 || !reproduccionEnCurso;
  };
  deshabilitarPausar = () => {
    const { reproduccionEnCurso, amplitud } = this.state;

    return amplitud === 0 || !reproduccionEnCurso;
  };
  deshabilitarIniciar = () => {
    const { amplitud } = this.state;
    return amplitud === 0;
  };
  reestablecerValores = () => {
    this.setState({
      ...estadoInicial,
    });
  };

  calcularPosicionEnCanvas = () => {
    const { width: anchoCanvas } = this;
    const { t, amplitud, frecuenciaAngular, faseInicial, dimensionBloque } = this.state;

    return amplitud * Math.cos(frecuenciaAngular * t + faseInicial) + anchoCanvas / 2 - dimensionBloque / 2;
  };

  calcularPosicionReal = () => {
    const { t, frecuenciaAngular, faseInicial, amplitud } = this.state;

    return amplitud * Math.cos(frecuenciaAngular * t + faseInicial);
  };

  calcularVelocidad = () => {
    const { t, frecuenciaAngular, faseInicial, amplitud } = this.state;

    return -amplitud * Math.sin(frecuenciaAngular * t + faseInicial);
  };

  calcularAceleracion = () => {
    const { frecuenciaAngular, amplitud, t, faseInicial } = this.state;

    return -amplitud * Math.pow(frecuenciaAngular, 2) * Math.cos(frecuenciaAngular * t + faseInicial);
  };

  calcularFuerza = () => {
    const { K } = this.state;
    return -K * this.calcularPosicionReal();
  };

  actualizarValoresCalculados = () => {
    const { frecuenciaAngular, amplitud, masa, K } = this.state;

    const frecuencia = frecuenciaAngular / PI2;
    const periodo = 1 / frecuencia;

    const posicion = this.calcularPosicionReal();
    const velocidad = this.calcularVelocidad();
    const aceleracion = this.calcularAceleracion();
    const fuerza = this.calcularFuerza();

    const energiaCinetica = 0.5 * masa * Math.pow(velocidad, 2);
    const energiaCineticaMax = 0.5 * masa * Math.pow(frecuenciaAngular, 2) * Math.pow(amplitud, 2);

    const energiaPotencial = 0.5 * K * Math.pow(posicion, 2);
    const energiaPotencialMax = 0.5 * K * Math.pow(amplitud, 2);

    const energiaMecanica = energiaCinetica + energiaPotencial;

    this.setState({
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
    });
  };

  actualizarVelocidadAnimacion = (valor) => {
    if (valor < 0.25 || valor > 2.25) {
      return;
    }
    this.setState({ velocidadAnimacion: valor, incremento: VALOR_INCREMEMENTO * valor });
  };

  actualizarAmplitudInput = (valor) => {
    if (valor > AMPLITUD_MAXIMA || valor < AMPLITUD_MINIMA) {
      const valorLimite = AMPLITUD_MAXIMA * Math.sign(valor);

      this.setState({ amplitud: valorLimite });
      this.limpiarAmplitudes();

      return;
    }

    this.limpiarAmplitudes();
    this.setState({ amplitud: valor });
  };

  actualizarAmplitudRange = (valor) => {
    if (valor > AMPLITUD_MAXIMA || valor < AMPLITUD_MINIMA) {
      const valorLimite = AMPLITUD_MAXIMA * Math.sign(valor);
      inputAmplitud.value = valorLimite;
      this.setState({ amplitud: valorLimite });
      this.limpiarAmplitudes();
      return;
    }

    this.setState({ amplitud: valor });
    this.limpiarAmplitudes();
  };

  obtenerValorFaseInicial = (unidadesFaseInicial) => {
    const { faseInicial } = this.state;

    let valorFaseInicial = faseInicial;

    if (unidadesFaseInicial === "grados") {
      valorFaseInicial = faseInicial * (180 / PI);
    }

    return valorFaseInicial;
  };

  actualizarFaseInicial = (valor) => {
    const { unidadesFaseInicial } = this.state;

    if (!valor) return;

    if (unidadesFaseInicial === "grados") {
      this.setState({ faseInicial: valor * (PI / 180), faseInicialInput: valor });
      return;
    }

    if (unidadesFaseInicial === "radianes") {
      this.setState({ faseInicial: valor, faseInicialInput: valor });
      return;
    }
  };

  actualizarFrecuenciaAngular = () => {
    const { masa, K } = this.state;
    const frecuenciaAngular = Math.sqrt(K / masa);
    this.setState({ frecuenciaAngular });
  };

  dibujarResorte = () => {
    const { height: altoCanvas } = this;

    let xInicial = 1;
    let yInicial = altoCanvas / 2 - 50; // 50 es la mitdad el ancho del bloque
    let posicionXActual = this.state.x;
    const windings = 20;
    const windingHeight = 15;
    const offsetPadding = 0;
    const backSideColor = "rgba(0, 0, 0, 0.9)";
    const frontSideColor = "gray";
    const lineWidth = 9;

    // step size has to be inversely proportionate to the windings
    const step = 1 / windings;

    const { contextPrincipal } = this;

    contextPrincipal.strokeStyle = backSideColor;
    contextPrincipal.lineWidth = lineWidth;
    contextPrincipal.lineJoin = "bevel";
    contextPrincipal.lineCap = "square";
    contextPrincipal.beginPath();
    contextPrincipal.moveTo(xInicial, yInicial);

    xInicial += offsetPadding;
    posicionXActual -= offsetPadding;
    let x = posicionXActual - xInicial;
    let yPathEnd = 0; //yInicial - yInicial

    for (let i = 0; i <= 1 - step; i += step) {
      // for each winding
      for (let j = 0; j < 1; j += step) {
        let xx = xInicial + x * (i + j * step);
        let yy = yInicial;
        xx -= Math.sin(j * PI2);
        yy += Math.sin(j * PI2) * windingHeight;
        contextPrincipal.lineTo(xx, yy);
      }
    }

    // finishes off backside dibujarCanvasing, including black -line
    contextPrincipal.lineTo(posicionXActual, yInicial);
    contextPrincipal.lineTo(posicionXActual + offsetPadding, yInicial);
    contextPrincipal.stroke();

    contextPrincipal.strokeStyle = frontSideColor;
    contextPrincipal.lineWidth = lineWidth - 4;
    contextPrincipal.lineJoin = "round";
    contextPrincipal.lineCap = "round";
    contextPrincipal.beginPath();

    // left horizontal bar
    contextPrincipal.moveTo(xInicial - offsetPadding, yInicial);
    contextPrincipal.lineTo(xInicial, yInicial);

    // right horizontal bar
    contextPrincipal.moveTo(posicionXActual, yInicial);
    contextPrincipal.lineTo(posicionXActual + offsetPadding, yInicial);

    for (let i = 0; i <= 1 - step; i += step) {
      // for each winding
      for (let j = 0.25; j <= 0.76; j += 0.01) {
        let xx = xInicial + x * (i + j * step);
        let yy = yInicial + yPathEnd * (i + j * step);
        xx -= Math.sin(j * PI2);
        yy += Math.sin(j * PI2) * windingHeight;
        if (j === 0.25) {
          contextPrincipal.moveTo(xx, yy);
        } else {
          contextPrincipal.lineTo(xx, yy);
        }
      }
    }
    contextPrincipal.stroke();
  };

  dibujarMasa = () => {
    const yInitial = 0;
    const { x, dimensionBloque } = this.state;
    const { height: altoCanvas, contextPrincipal } = this;
    const y = yInitial + altoCanvas / 2 - dimensionBloque;

    contextPrincipal.save();
    contextPrincipal.fillStyle = "rgba(255, 0, 0, 1)";
    contextPrincipal.lineWidth = 1;
    contextPrincipal.fillStyle = "rgba(0, 0, 0, 0.3)";
    contextPrincipal.strokeRect(x, y, dimensionBloque, dimensionBloque);
    contextPrincipal.fillRect(x, y, dimensionBloque, dimensionBloque);
    contextPrincipal.restore();
  };

  dibujarPiso = (contextPrincipal, altoCanvas, anchoCanvas) => {
    contextPrincipal.save();
    contextPrincipal.beginPath();
    contextPrincipal.strokeStyle = "black";
    contextPrincipal.moveTo(0, altoCanvas / 2);
    contextPrincipal.lineTo(anchoCanvas, altoCanvas / 2);
    contextPrincipal.stroke();
    contextPrincipal.closePath();
    contextPrincipal.restore();
  };

  dibujarPared = (contextPrincipal, altoCanvas) => {
    contextPrincipal.save();
    contextPrincipal.lineWidth = 5;
    contextPrincipal.strokeStyle = "black";
    contextPrincipal.beginPath();
    contextPrincipal.moveTo(0, 0);
    contextPrincipal.lineTo(0, altoCanvas / 2);
    contextPrincipal.stroke();
    contextPrincipal.closePath();
    contextPrincipal.restore();
  };

  dibujarPuntoEquilibrio = () => {
    const { width: anchoCanvas, height: altoCanvas, contextSecundario: context } = this;

    context.save();
    context.lineWidth = 1;
    context.strokeStyle = "rgba(0, 0, 0, 0.5)";

    context.beginPath();
    context.setLineDash([10, 10]);
    context.moveTo(anchoCanvas / 2, 100);
    context.lineTo(anchoCanvas / 2, altoCanvas - 150);
    context.stroke();
    context.restore();
  };

  dibujarAnguloFaseInicial = () => {
    const { faseInicial } = this.state;
    const { canvasFaseInicial: canvas, contextFaseInicial: context } = this;
    const dpr = window.devicePixelRatio;
    const dimension = 70;

    canvas.width = dimension * dpr;
    canvas.height = dimension * dpr;

    const { width, height } = canvas;

    const centro = width / 2;

    canvas.style.width = `${width / dpr}px`;
    canvas.style.height = `${height / dpr}px`;

    const contrarioAlReloj = Math.sign(faseInicial) === 1;

    // Circunferencia
    context.save();
    context.beginPath();
    context.strokeStyle = "#7a7a7a";
    context.arc(centro, centro, 50, 0, PI2);
    context.stroke();
    context.restore();

    context.save();
    context.beginPath();
    context.fillStyle = `rgba(0, 255, 0, 0.5)`;
    context.moveTo(centro, centro);

    if (contrarioAlReloj) {
      context.arc(centro, centro, 50, 0, -faseInicial, true);
    } else {
      context.arc(centro, centro, 50, -faseInicial, 0, true);
    }

    context.lineTo(centro, centro);
    context.stroke();
    context.strokeStyle = "rgb(0, 255, 0)";
    context.fill();
    context.restore();
  };

  dibujarAmplitudes = () => {
    const { amplitud } = this.state;
    const { width: anchoCanvas, height: altoCanvas, contextSecundario: context } = this;

    if (amplitud === 0) return;

    const amplitudMasX = anchoCanvas / 2 + amplitud * Math.sign(amplitud);

    const amplitudMenosX = anchoCanvas / 2 - amplitud * Math.sign(amplitud);

    context.save();
    context.lineWidth = 0.5;
    context.strokeStyle = "rgba(0, 255, 0, 0.5)";

    context.beginPath();
    context.moveTo(amplitudMasX, 0);
    context.lineTo(amplitudMasX, altoCanvas - 100);
    context.stroke();
    context.closePath();

    context.beginPath();
    context.moveTo(amplitudMenosX, 0);
    context.lineTo(amplitudMenosX, altoCanvas - 100);
    context.stroke();
    context.closePath();

    context.restore();
  };

  dibujarVectorVelocidad = () => {
    const { amplitud, dimensionBloque } = this.state;
    const { width: anchoCanvas, contextVectores: context } = this;

    if (amplitud === 0) return;

    const posicionEnCanvas = this.calcularPosicionEnCanvas();

    const vectorVelocidad = this.calcularVelocidad();
    const posicionVectorVelocidadCola = posicionEnCanvas + dimensionBloque / 2;
    const posicionVectorVelocidadCabeza = posicionVectorVelocidadCola + vectorVelocidad;

    context.save();
    context.lineWidth = 4;
    context.strokeStyle = "red";
    context.beginPath();
    context.moveTo(posicionVectorVelocidadCola, 20);
    context.lineTo(posicionVectorVelocidadCabeza, 20);
    context.stroke();
    context.closePath();

    context.fillStyle = "red";
    context.font = "42px serif";
    context.fillText("v", anchoCanvas - 20, 30);

    context.beginPath();
    context.fillStyle = "red";
    context.moveTo(posicionVectorVelocidadCola + vectorVelocidad, 10);
    context.lineTo(posicionVectorVelocidadCola + vectorVelocidad, 30);
    context.lineTo(posicionVectorVelocidadCola + vectorVelocidad + Math.sign(vectorVelocidad) * 30, 20);
    context.fill();
    context.restore();
  };

  dibujarVectorAceleracion = () => {
    const { amplitud, dimensionBloque } = this.state;
    const { width: anchoCanvas, contextVectores: context } = this;

    if (amplitud === 0) return;

    const posicionEnCanvas = this.calcularPosicionEnCanvas();

    const posicionReal = this.calcularPosicionReal();
    const VectorAceleracion = this.calcularAceleracion(posicionReal);
    const posicionVectorAceleracionCola = posicionEnCanvas + dimensionBloque / 2;
    const posicionVectorAceleracionCabeza = posicionVectorAceleracionCola + VectorAceleracion;

    context.save();
    context.lineWidth = 4;
    context.strokeStyle = "blue";
    context.beginPath();
    context.moveTo(posicionVectorAceleracionCola, 60);
    context.lineTo(posicionVectorAceleracionCabeza, 60);
    context.stroke();
    context.closePath();

    context.fillStyle = "blue";
    context.font = "42px serif";
    context.fillText("a", anchoCanvas - 20, 60);

    context.beginPath();
    context.fillStyle = "blue";
    context.moveTo(posicionVectorAceleracionCola + VectorAceleracion, 50);
    context.lineTo(posicionVectorAceleracionCola + VectorAceleracion, 70);
    context.lineTo(posicionVectorAceleracionCola + VectorAceleracion + Math.sign(VectorAceleracion) * 30, 60);
    context.fill();
    context.restore();
  };

  dibujarVectorFuerza = () => {
    const { amplitud, dimensionBloque } = this.state;
    const { width: anchoCanvas, contextVectores: context } = this;

    if (amplitud === 0) return;

    const posicionEnCanvas = this.calcularPosicionEnCanvas();

    const posicionReal = this.calcularPosicionReal();
    const VectorFuerza = this.calcularFuerza(posicionReal);
    const posicionVectorFuerzaCola = posicionEnCanvas + dimensionBloque / 2;
    const posicionVectorFuerzaCabeza = posicionVectorFuerzaCola + VectorFuerza;

    context.save();
    context.lineWidth = 4;
    context.strokeStyle = "green";
    context.beginPath();
    context.moveTo(posicionVectorFuerzaCola, 100);
    context.lineTo(posicionVectorFuerzaCabeza, 100);
    context.stroke();
    context.closePath();

    context.fillStyle = "green";
    context.font = "42px serif";
    context.fillText("F", anchoCanvas - 25, 100);

    context.beginPath();
    context.fillStyle = "green";
    context.moveTo(posicionVectorFuerzaCola + VectorFuerza, 90);
    context.lineTo(posicionVectorFuerzaCola + VectorFuerza, 110);
    context.lineTo(posicionVectorFuerzaCola + VectorFuerza + Math.sign(VectorFuerza) * 30, 100);
    context.fill();
    context.restore();
  };

  dibujarVectores = () => {
    const { amplitud } = this.state;
    this.limpiarVectores();

    if (amplitud === 0) return;

    this.dibujarVectorVelocidad();
    this.dibujarVectorAceleracion();
    this.dibujarVectorFuerza();
  };

  dibujarCanvas = () => {
    const { width: anchoCanvas, height: altoCanvas, contextPrincipal } = this;
    const { t, reproduccionEnCurso, incremento } = this.state;

    const tiempoActual = t;

    this.dibujarPared(contextPrincipal, altoCanvas);
    this.dibujarPiso(contextPrincipal, altoCanvas, anchoCanvas);

    this.setState({ x: this.calcularPosicionEnCanvas() });

    this.limpiarTrayectoriaMasa();
    this.dibujarMasa();
    this.dibujarResorte();
    this.dibujarPuntoEquilibrio();
    this.dibujarAmplitudes();
    this.dibujarAnguloFaseInicial();
    this.dibujarVectores();
    this.actualizarValoresCalculados();

    contextPrincipal.restore();
    requestAnimationFrame(this.dibujarCanvas);

    if (reproduccionEnCurso) {
      this.setState({ t: t + incremento });
    } else {
      this.setState({ t: tiempoActual });
    }
  };

  limpiarAmplitudes = () => {
    const { width: anchoCanvas, height: altoCanvas, contextSecundario: context } = this;
    context.clearRect(0, 0, anchoCanvas, altoCanvas);
  };

  limpiarVectores = () => {
    const { width: anchoCanvas, height: altoCanvas, contextVectores: context } = this;
    context.clearRect(0, 0, anchoCanvas, altoCanvas);
  };

  limpiarTrayectoriaMasa = () => {
    const { dimensionBloque } = this.state;
    const { width: anchoCanvas, height: altoCanvas, contextPrincipal: context } = this;
    context.clearRect(5, altoCanvas / 2 - dimensionBloque - 10, anchoCanvas, dimensionBloque + 10);
  };

  render() {
    const { velocidadAnimacion } = this.state;
    const valorGrados = this.obtenerValorFaseInicial("grados").toFixed(0);
    const valorRadianes = this.obtenerValorFaseInicial("radianes").toFixed(2);

    return (
      <>
        <Head>
          <title>M.A.S</title>
        </Head>

        <div className="my-5" style={{ width: "1000px" }}>
          <h4 className="title is-4 text-center">Movimiento Armónico Simple</h4>

          <div id="ventanagrafica">
            <canvas id="canvassecundario"></canvas>
            <canvas id="canvasprincipal"></canvas>
            <canvas id="canvasvectores"></canvas>

            <div className="columns">
              <div className="column">
                <VelocidadAnimacion
                  controlarSimulacion={this.controlarSimulacion}
                  velocidadAnimacion={velocidadAnimacion}
                />
              </div>
              <div className="column">
                <ControlesAnimacion
                  estado={this.state}
                  controlarSimulacion={this.controlarSimulacion}
                  deshabilitarParar={this.deshabilitarParar()}
                  deshabilitarPausar={this.deshabilitarPausar()}
                  deshabilitarIniciar={this.deshabilitarIniciar()}
                />
              </div>
            </div>
          </div>

          <hr className="w-full" />

          <section className="section p-0">
            <div className="container is-fluid is-paddingless">
              <Formulas />

              <TextoAyuda />

              <ValoresCalculados estado={this.state} />

              <ControlesVariables
                valorGrados={valorGrados}
                valorRadianes={valorRadianes}
                AMPLITUD_MAXIMA={AMPLITUD_MAXIMA}
                AMPLITUD_MINIMA={AMPLITUD_MINIMA}
                estado={this.state}
                controlarSimulacion={this.controlarSimulacion}
              />
            </div>
          </section>
        </div>
      </>
    );
  }
}

export default MovimientoArmonicoSimple;
