/* ProteBros - Carrusel de imágenes con rotación automática */
document.querySelectorAll('.carrusel').forEach(function (carrusel) {
  var pista = carrusel.querySelector('.carrusel-pista');
  var diapositivas = carrusel.querySelectorAll('.diapositiva');
  var puntos = carrusel.querySelector('.carrusel-puntos');
  var anterior = carrusel.querySelector('.carrusel-anterior');
  var siguiente = carrusel.querySelector('.carrusel-siguiente');
  var actual = 0;
  var intervalo = 4000; // milisegundos entre cada imagen
  var temporizador = null;

  // Crear un punto (indicador) por cada imagen
  diapositivas.forEach(function (_, i) {
    var punto = document.createElement('button');
    punto.type = 'button';
    punto.setAttribute('aria-label', 'Ver imagen ' + (i + 1));
    punto.addEventListener('click', function () { mostrar(i); reiniciar(); });
    puntos.appendChild(punto);
  });

  function mostrar(indice) {
    actual = (indice + diapositivas.length) % diapositivas.length;
    pista.style.transform = 'translateX(-' + (actual * 100) + '%)';
    puntos.querySelectorAll('button').forEach(function (p, i) {
      p.classList.toggle('activo', i === actual);
    });
  }

  function iniciar() { temporizador = setInterval(function () { mostrar(actual + 1); }, intervalo); }
  function detener() { clearInterval(temporizador); }
  function reiniciar() { detener(); iniciar(); }

  anterior.addEventListener('click', function () { mostrar(actual - 1); reiniciar(); });
  siguiente.addEventListener('click', function () { mostrar(actual + 1); reiniciar(); });

  // Pausa mientras el mouse está encima
  carrusel.addEventListener('mouseenter', detener);
  carrusel.addEventListener('mouseleave', iniciar);

  mostrar(0);
  iniciar();
});

