import React, { Component } from "react";
import Head from "next/head";
import ControlesVariables from "componentes/MovimientoAmortiguado/ControlesVariables";
import VelocidadAnimacion from "componentes/VelocidadAnimacion";
import ControlesAnimacion from "componentes/ControlesSimulacion";
import Formulas from "componentes/MovimientoAmortiguado/Formulas";
import FormulaMatematica from "componentes/FormulaMatematica";
import ValoresPredefinidos from "componentes/MovimientoAmortiguado/ValoresPredefinidos";
import ValoresCalculados from "componentes/MovimientoAmortiguado/ValoresCalculados";

import { PI2 } from "constantes";

/**
 *  Este es un valor abritrario para simular
 *  que una oscilación con omega en 6.28 dura un segundo.
 *
 */
const VALOR_INCREMEMENTO = 0.035;

/**
 * Amplitud mínima de oscilación.
 *
 */
const AMPLITUD_MINIMA = -600;

/**
 * Amplitud máxima de oscilación.
 *
 */
const AMPLITUD_MAXIMA = 600;

/**
 * Este es el estado inicial que describe la simulación
 * en el instante t = 0.
 *
 */
const estadoInicial = {
  t: 0,
  dimensionBloque: 100,
  velocidadAnimacion: 1,
  amplitud: 0,
  masa: 1,
  K: 1,
  b: 0,
  reproduccionEnCurso: false,
  incremento: VALOR_INCREMEMENTO,

  frecuencia: 0,
  periodo: 0,
  posicion: 0,
  velocidad: 0,
  fuerza: 0,
  frecuenciaAngular: 1,
  energiaCinetica: 0,
  energiaCineticaMax: 0,
  energiaPotencial: 0,
  energiaPotencialMax: 0,
  energiaMecanica: 0,
  tipo: "",
  lambda: null,
};

class MovimientoSobreamortiguado extends Component {
  state = {
    ...estadoInicial,
  };

  componentDidMount() {
    this.canvasPrincipal = document.getElementById("canvasprincipal");
    this.contextPrincipal = this.canvasPrincipal.getContext("2d");

    this.canvasSecundario = document.getElementById("canvassecundario");
    this.contextSecundario = this.canvasSecundario.getContext("2d");

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
    const { velocidadAnimacion } = this.state;
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
        this.setState({ masa: valor }, () => this.actualizarFrecuenciaAngular());
        break;
      case "coeficiente_viscocidad":
        this.setState({ b: valor }, () => this.actualizarFrecuenciaAngular());
        break;
      case "K":
        if (valor <= 0) {
          this.setState({ K: 0 });
          return;
        }
        this.setState({ K: valor }, () => this.actualizarFrecuenciaAngular());
        break;
      case "tipo_amortiguamiento":
        switch (value) {
          case "sin_amortiguamiento":
            this.reestablecerValores();
            this.setState({ amplitud: 100, masa: 1, K: 1, b: 0 });
            break;
          case "subamortiguado":
            this.reestablecerValores();
            this.setState({ amplitud: 100, masa: 1, K: 1, b: 1 });
            break;
          case "criticamente_amortiguado":
            this.reestablecerValores();
            this.setState({ amplitud: 100, masa: 1, K: 1, b: 2 });
            break;
          case "sobreamortiguado":
            this.reestablecerValores();
            this.setState({ amplitud: 100, masa: 1, K: 1, b: 3 });
            break;
        }
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
    const { t, amplitud, frecuenciaAngular, masa, b, dimensionBloque } = this.state;
    const exponente = -b / (2 * masa);

    return amplitud * Math.exp(exponente * t) * Math.cos(frecuenciaAngular * t) + anchoCanvas / 2 - dimensionBloque / 2;
  };

  calcularPosicionReal = () => {
    const { t, frecuenciaAngular, amplitud, masa, b } = this.state;
    const exponente = -b / (2 * masa);

    const posicion = amplitud * Math.exp(exponente * t) * Math.cos(frecuenciaAngular * t);

    return parseFloat(posicion.toFixed(1));
  };

  calcularVelocidad = () => {
    const { t, b, frecuenciaAngular, masa, amplitud } = this.state;

    const lambda = b / masa;
    const seno = Math.sin(frecuenciaAngular * t);
    const coseno = Math.cos(frecuenciaAngular * t);

    const velocidad = -amplitud * Math.exp(-(lambda / 2) * t) * (frecuenciaAngular * seno + (lambda / 2) * coseno);

    return parseFloat(velocidad.toFixed(1));
  };

  calcularFuerza = () => {
    const { K, b } = this.state;
    const fuerza = -K * this.calcularPosicionReal() - b * this.calcularVelocidad();
    return parseFloat(fuerza.toFixed(1));
  };

  actualizarValoresCalculados = () => {
    const { frecuenciaAngular, amplitud, b, masa, K, t } = this.state;

    const frecuencia = frecuenciaAngular / PI2;
    const periodo = 1 / frecuencia;

    const posicion = this.calcularPosicionReal();
    const velocidad = this.calcularVelocidad();
    const fuerza = this.calcularFuerza();

    const energiaPotencial =
      0.5 *
      K *
      Math.pow(amplitud, 2) *
      Math.exp(-(b / masa) * t) *
      (Math.cos(frecuenciaAngular * t) * Math.cos(frecuenciaAngular * t));

    const energiaPotencialMax = 0.5 * K * Math.pow(amplitud, 2) * Math.exp(0) * (Math.cos(0) * Math.cos(0));

    const energiaCinetica =
      0.5 *
      K *
      Math.pow(amplitud, 2) *
      Math.exp(-(b / masa) * t) *
      (Math.sin(frecuenciaAngular * t) * Math.sin(frecuenciaAngular * t));

    const energiaCineticaMax = energiaPotencialMax;

    const energiaMecanica = energiaCinetica + energiaPotencial;

    this.setState({
      periodo,
      frecuencia,
      posicion,
      velocidad,
      fuerza,
      energiaCinetica: parseFloat(energiaCinetica.toFixed(1)),
      energiaCineticaMax: parseFloat(energiaCineticaMax.toFixed(1)),
      energiaPotencial: parseFloat(energiaPotencial.toFixed(1)),
      energiaPotencialMax: parseFloat(energiaPotencialMax.toFixed(1)),
      energiaMecanica: parseFloat(energiaMecanica.toFixed(1)),
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

  actualizarFrecuenciaAngular = () => {
    const { masa, K, b } = this.state;
    const kSobreMasa = K / masa;
    const bSobreMasaAlCuadrado = Math.pow(b / (2 * masa), 2);

    if (kSobreMasa - bSobreMasaAlCuadrado < 0) {
      this.setState({ frecuenciaAngular: 0 });
      return;
    }

    const frecuenciaAngular = Math.sqrt(kSobreMasa - bSobreMasaAlCuadrado);

    this.setState({ frecuenciaAngular });
  };

  dibujarResorte = () => {
    const { height: altoCanvas } = this;

    let xInicial = 1;
    let yInicial = altoCanvas / 2 - 50; // 50 es la mitdad el ancho del bloque
    let posicionXActual = this.state.x;
    const picos = 20;
    const altoPicos = 20;
    const relleno = 10;
    const colorDeAtras = "rgba(0, 0, 0, 0.9)";
    const colorDelFrente = "gray";
    const especorLinea = 10;

    const pasos = 1 / picos;

    const { contextPrincipal } = this;

    contextPrincipal.strokeStyle = colorDeAtras;
    contextPrincipal.lineWidth = especorLinea;
    contextPrincipal.lineJoin = "bevel";
    contextPrincipal.lineCap = "square";
    contextPrincipal.beginPath();
    contextPrincipal.moveTo(xInicial, yInicial);

    xInicial += relleno;
    posicionXActual -= relleno;
    let x = posicionXActual - xInicial;
    let finalCaminoY = 0;

    for (let i = 0; i <= 1 - pasos; i += pasos) {
      for (let j = 0; j < 1; j += pasos) {
        let xx = xInicial + x * (i + j * pasos);
        let yy = yInicial;
        xx -= Math.sin(j * PI2);
        yy += Math.sin(j * PI2) * altoPicos;
        contextPrincipal.lineTo(xx, yy);
      }
    }

    contextPrincipal.lineTo(posicionXActual, yInicial);
    contextPrincipal.lineTo(posicionXActual + relleno, yInicial);
    contextPrincipal.stroke();

    contextPrincipal.strokeStyle = colorDelFrente;
    contextPrincipal.lineWidth = especorLinea - 5;
    contextPrincipal.lineJoin = "round";
    contextPrincipal.lineCap = "round";
    contextPrincipal.beginPath();

    contextPrincipal.moveTo(xInicial - relleno, yInicial);
    contextPrincipal.lineTo(xInicial, yInicial);

    contextPrincipal.moveTo(posicionXActual, yInicial);
    contextPrincipal.lineTo(posicionXActual + relleno, yInicial);

    for (let i = 0; i <= 1 - pasos; i += pasos) {
      for (let j = 0.25; j <= 0.76; j += 0.01) {
        let xx = xInicial + x * (i + j * pasos);
        let yy = yInicial + finalCaminoY * (i + j * pasos);
        xx -= Math.sin(j * PI2);
        yy += Math.sin(j * PI2) * altoPicos;
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

  calcularTipoOscilacion = () => {
    const { b, masa, K } = this.state;
    return Math.pow(b, 2) - 4 * K * masa;
  };

  dibujarTipo = () => {
    const { b } = this.state;
    const calculo = this.calcularTipoOscilacion();

    if (calculo > 0) {
      return "Oscilador Sobreamortiguado";
    } else if (calculo === 0) {
      return "Oscilador Críticamente Amortiguado";
    } else if (calculo < 0 && b !== 0) {
      return "Osicaldor Subamortiguado";
    } else {
      return "Sin Amortiguamiento";
    }
  };

  dibujarComparaciónTipoOscilacion = () => {
    const { b } = this.state;
    const calculo = this.calcularTipoOscilacion();

    if (calculo > 0) {
      return <FormulaMatematica texto="\lambda^2-\omega^2>0" className="ml-10 has-text-danger text-xl" />;
    } else if (calculo === 0) {
      return <FormulaMatematica texto="\lambda^2-\omega^2=0" className="ml-10 has-text-danger text-xl" />;
    } else if (calculo < 0 && b !== 0) {
      return <FormulaMatematica texto="\lambda^2-\omega^2<0" className="ml-10 has-text-danger text-xl" />;
    }
  };

  dibujarGraficas = () => {
    const { b } = this.state;
    const calculo = this.calcularTipoOscilacion();
    let src = "";

    if (calculo > 0) {
      src = "/sobreamortiguado.png";
    } else if (calculo === 0) {
      src = "/criticamente-amortiguado.png";
    } else if (calculo < 0 && b !== 0) {
      src = "/subamortiguado.png";
    }

    return <img className="h-56" src={src} />;
  };

  render() {
    const { velocidadAnimacion, b } = this.state;

    return (
      <>
        <Head>
          <title>Movimiento Amortiguado</title>
        </Head>

        <div className="" style={{ width: "1000px" }}>
          <h4 className="title is-4 text-center">Movimiento Amortiguado</h4>

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

          <section className="flex items-start justify-between">
            <div>
              <label className="label">Tipo Oscilación</label>
              <h3 className="text-xl">{this.dibujarTipo()}</h3>
              <span className="flex items-center">
                {b > 0 && this.dibujarGraficas()}
                {this.dibujarComparaciónTipoOscilacion()}
              </span>
            </div>
            <div>
              <ValoresPredefinidos estado={this.state} controlarSimulacion={this.controlarSimulacion} />
            </div>
          </section>

          <section className="section p-0">
            <div className="container is-fluid is-paddingless">
              <Formulas />

              <ValoresCalculados estado={this.state} />

              <ControlesVariables
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

export default MovimientoSobreamortiguado;
