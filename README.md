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
<a href="#components" title="components">components</a>
   |-- <a href="#controlessimulacion" title="ControlesSimulacion">ControlesSimulacion</a>
   |   |-- index.jsx
   |-- <a href="#formulamatematica" title="FormulaMatematica">FormulaMatematica</a>
   |   |-- index.jsx
   |-- <a href="#velocidadanimacion" title="VelocidadAnimacion">VelocidadAnimacion</a>
   |   |-- index.jsx
   |-- <a href="#navbar" title="Navbar">Navbar</a>
   |   |-- index.jsx
   |-- <a href="#movimientoarmonicosimple" title="MovimientoArmonicoSimple">MovimientoArmonicoSimple</a>
   |   |-- ControlesVariables.jsx
   |   |-- Formulas.jsx
   |   |-- TextoAyuda.jsx
   |   |-- ValoresCalculados.jsx
   |   |-- index.jsx
   |-- <a href="#movimientosobreamortiguado" title="MovimientoSobreAmortiguado">MovimientoSobreAmortiguado</a>
   |   |-- index.jsx
<a href="#constantes" title="constantes">constantes</a>
   |-- index.js
<a href="#imagenes" title="imagenes">imagenes</a>
   |-- clonardescargar.png
   |-- controlessimulacion.png
   |-- controlesvelocidad.png
   |-- proyecto.png
<a href="#lib" title="lib">lib</a>
   |-- gtag.js
<a href="#pages" title="pages">pages</a>
   |-- 404.jsx
   |-- _app.js
   |-- index.js
   |-- movimiento-armonico-simple
   |   |-- index.jsx
   |-- movimiento-sobre-amortiguado
   |   |-- index.jsx
   |-- styles.scss
<a href="#public" title="public">public</a>
   |-- favicon.ico
   |-- iconoresorte.png
<a href="#packagejson" title="packagejson">package.json</a>
<a href="#readmemd" title="readmemd">README.md</a>
</pre>

## Documentación

### components

#### ControlesSimulacion

#### FormulaMatematica

#### VelocidadAnimacion

#### Navbar

#### MovimientoArmonicoSimple

#### MovimientoSobreAmortiguado

### constantes

### imagenes

### lib

### pages

En este directorio se declaran las rutas que tiene la aplicación web. Si se crea un archivo o directorio con un nombre separado por `-`, los usuarios podrán navegar a esta ubicación añadiendo este texto a la url del sitio `https://fisica.app/`. Dentro de este directorio tenemos varios elementos: 

```bash
|-- 404.jsx
|-- _app.js
|-- index.js
|-- movimiento-armonico-simple
|   |-- index.jsx
|-- movimiento-sobre-amortiguado
|   |-- index.jsx
|-- styles.scss
```

#### 404.jsx

Si el usuario navega a una ruta que no existe, se mostrará el contenido de este archivo por defecto. 

<img src='/imagenes/paginanoexiste.png' height='200px' width='auto'/>


#### \_app.js

En este archivo se incorpara el modulo de google analitycs y archivos de estilos css.

#### index.js
Contiene la declaración de los components que permite que el usuario pueda visitar los diferentes simuladores.

<img src='/imagenes/listadomodules.png' height='200px' width='auto'/>

#### movimiento-armonico-simple

Es la ruta declarada para el simulador de movimiento armónico simple. Con esto el usuario puede visitar https://fisica.app/movimiento-armonico-simple. 

#### movimiento-sobre-amortiguado

Aplica lo mismo dicho arriba.

#### styles.scss

Contiene las librerias de CSS y declaraciones personalizadas que modifican la presentación de la aplicación, sin esto no se vería tan "bonita".

<img src='/imagenes/sincss.png' height='200px' width='auto'/>

### public

Contiene los archivos (imagenes y otros) que se quieren hacer públicos.

### package.json

Contiena una lista de las librerias necesarias para ejecutar este proyecto.

### README.md

Contiene este mismo texto que se está leyendo. [Github Markdown Language](https://github.github.com/gfm/)

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
[listado-modules]: imagenes/listadomodules.png
[pagina-no-existe]: imagenes/paginanoexiste.png
[sin-css]: imagenes/sincss.png

