<!-- LOGO DEL PROYECTO -->
<br />
<p align="center">
  <a href="https://fisica.app">
    <img src="https://fisica.app/iconoresorte.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Movimientos Oscilatorios</h3>
  <p align="center">
     Simulaciones de varios fenómenos oscilatorios. 
    <br />
    <a href="https://github.com/iamzapata/movimientos-oscilatorios#user-content-construido-con"><strong>Explorar la documentación »</strong></a>
    <br />
    <br />
    <a href="https://fisica.app/">Ver Aplicación</a>
    ·
    <a href="https://github.com/iamzapata/movimientos-oscilatorios/issues/new?assignees=&labels=&template=informe-de-error.md&title=%5BError%5D">Reportar Error</a>
    ·
    <a href="https://github.com/iamzapata/movimientos-oscilatorios/issues/new?assignees=&labels=&template=solicitud-de-funcionalidad.md&title=%5BMejora%5D">Sugerir Funcionalidad</a>
  </p>
</p>

<!-- TABLA DE CONTENIDOS -->
## Tabla de Contenidos

* [Acerca del Proyecto](#acerca-del-proyecto)
* [Construido Con](#construido-con)
* [Arrancando](#arrancando)
  * [Prerrequisitos](#prerrequisitos)
  * [Instalación](#instalación)
* [Estructura del Proyecto](#estructura-del-proyecto)
* [Documentación](#documentación)
* [Roadmap](#roadmap)
* [Contribuir](#contribuir)
* [Aprender Más](#aprender-mas)
* [Licencia](#licencia)
* [Contacto](#contacto)

## Acerca del Proyecto

Este proyecto intenta facilitar el aprendizaje de algunos temas de la física ondulatoria. Con el se espera que los estudiantes del curso tengan una herramienta útil para complementar sus estudios.

[![Captura del Producto][captura-proyecto]](https://fisica.app)

## Construido Con
Este proyecto hace uso de numerosas librerias open source (codigo fuente libre/abierto), especializadas para entornos Web/JavaScript. 

* [NextJS](https://nextjs.org)
Es un Framework encima de ReactJS que permite crear páginas y aplicacioens web de una manera ágil y estandarizada, y no requiere de mucha configuración.
* [ReactJS](https://es.reactjs.org)
Es la librería JavaScript más popular para constuir interfaces de usuarios. Fue creada por un equipo de desarrolladores en facebook y su código fue liberado en el 2013. Es la librería que usan gigantes de la tecnología como Facebook, Twitter, Instagram, Netflix, Whatsapp Web, Dropbox y Tesla para sus sitios web.
* [JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript)
Es unos de los lenguajes de programación más popoulares de los últimos años, se emplea para crear aplicaciones y sitios web, servidores web como [expressjs](https://expressjs.com/), bases de datos como [mongodb](https://www.mongodb.com/) y otras tecnolgoías.
* [HTML](https://developer.mozilla.org/es/docs/Web/HTML)
Es un lenguaje markup que se usa para crear componentes básicos en la web. Como lo es un enlace: `<a href='http://google.com/'>google</a>`
* [CSS](https://developer.mozilla.org/es/docs/Web/CSS)
Es un lenguaje que permite describir la presentación visual de documentos HTML. Agregar color, tipos, tamaños y estilos de fuentes y animaciones son cosas que se pueden cambiar con CSS.
* [Canvas API](https://developer.mozilla.org/es/docs/Web/HTML/Canvas)
Es un elemento de HTML5 que permite dibujar gráficos en un navegador web.
* [TailwindCSS](https://tailwindcss.com)
Es una libreria de utilidades CSS.
* [Bulma](https://bulma.io)
Es una librería de componnentes CSS/HTML.

## Arrancando

Primero, debemos obtener una copia del repositorio. Lo podemos clonar o descargar. Para ello, debemos hacer click en el botón verde que dice "Clone or download". La opción más fácil es "Download ZIP", pero muchos beneficios se obtinenen al clonar el repositorio usando <a href="https://rogerdudler.github.io/git-guide/index.es.html" target="_blank">GIT</a>. Para mas información acerca de **git** y como clonar un repositorio ir al siguiente <a href="https://desarrolloweb.com/articulos/git-clone-clonar-repositorio.html" target="_blank">enlace</a>. 

### Prerrequisitos

Dedebos descargar e instalar [nodejs](https://nodejs.org/es/download/) y [npm](https://www.npmjs.com/get-npm) en nuestro computador. Para ver un tutorial de como instalar estas dos herramientas ver este [enlace](https://tutobasico.com/instalar-nodejs-y-npm/). NodeJS es un un entorno de JavaScript que no necesita un navegador para ejecutarse. Es usado para crear servidors web y herramientas de desarrollo que hacen más fácil la creación de software usando JavaScript. Npm (Node Package Manager) por su parte es un administrador de librerias hechas en nodejs y se usa para instalar dependencias en proyectos de JavaScript. 

### Instalación

Una vez estén instalados nodejs y npm, se podrá continuar con la instalación de las dependencias del proyecto y posteriormente su ejecución localmente. Para esto podemos ir a la raíz del proyecto, donde se encuentre el archivo `package.json`, y estando en este directorio, en una terminal, ejecutar `npm install`. Este comando instalará las dependencias del proyecto. Una vez haya completado la instlación, podemos arrancar el proyecto:

```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador para ver los resultados.

Se puede comenzar a editar los archivos del proyecto. La aplicación se actualizará con los cambios a medida que se editen los archivos.

## Estructura Del Proyecto

<pre>
components
   |-- <a href="#controles-simulacion" title="ControlesSimulacion">ControlesSimulacion</a>
   |   |-- index.jsx
   |-- FormulaMatematica
   |   |-- index.jsx
   |-- MovimientoArmonicoSimple
   |   |-- ControlesVariables.jsx
   |   |-- Formulas.jsx
   |   |-- TextoAyuda.jsx
   |   |-- ValoresCalculados.jsx
   |   |-- index.jsx
   |-- MovimientoSobreAmortiguado
   |   |-- index.jsx
   |-- Navbar
   |   |-- index.jsx
   |-- VelocidadAnimacion
   |   |-- index.jsx
constants
   |-- index.js
imagenes
   |-- clonardescargar.png
   |-- controlessimulacion.png
   |-- controlesvelocidad.png
   |-- proyecto.png
lib
   |-- gtag.js
pages
   |-- 404.jsx
   |-- _app.js
   |-- index.js
   |-- movimiento-armonico-simple
   |   |-- index.jsx
   |-- movimiento-sobre-amortiguado
   |   |-- index.jsx
   |-- styles.scss
public
   |-- favicon.ico
   |-- iconoresorte.png
yarn.lock
package.json
jsconfig.json
.gitignore
.prettierrc
README.md
</pre>

## Documentación

### Controles Animación

## Roadmap

## Aprender Más

Para aprender más acerca de desarrollo web y las tecnologías usadas en este proyecto, visitar los siguientes enlaces: 



## Licencia

## Contacto

<!-- ENLACES / IMAGENES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[captura-proyecto]: imagenes/proyecto.png
[clonar-descargar]: imagenes/clonardescargar.png
[controles-velocidad]: imagenes/controlesvelocidad.png
[controles-simulacion]: imagenes/controlessimulacion.png
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members

