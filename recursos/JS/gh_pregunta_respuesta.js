 // Arreglo de objetos para definir cada adivinanza, con opciones a motrar y la respuesta correcta
 var adivinanzaObjeto = [
    {
        pregunta: '¿Cuánto es 2 + 2?',
        opciones: ['2', '4', '0'],
        respuesta: '4'
    },
    {
        pregunta: '¿Cuánto es 2 * 3?',
        opciones: ['2', '3', '6'],
        respuesta: '6'
    },
    {
        pregunta: '¿De qué color era el caballo blanco de San Martín?',
        opciones: ['Negro', 'Blanco', 'Bayo'],
        respuesta: 'Blanco'
    }
];

/*Pendientes: desarrollar funcion para que el usuario disponga cuantas preguntas quiere responder y generar un nuevo arreglo de objetos que
// contenga tantos objetos como preguntas seleccionadas por el usuario, pero que las obtenga aleatoriamiente de un gran arreglo. */


// Funcion para crear las preguntas y las opciones

$(document).ready(function() {
    
    const dataUsuarioGuardado = JSON.parse(localStorage.getItem("dataUsuario"));
    $('#usuarioRegistrado').text(dataUsuarioGuardado.usuario);
    $('#usuarioRegistrado').append('<div id="cerrarSesion">X</div>');

    // Evento clic para cerrar sesión
    $('#cerrarSesion').click(function() {
        localStorage.removeItem("dataUsuario")
        alert('Sesión cerrada');
        $(location).attr('href', './tf_inicio.html'); // que se redireccione a la pagina inicial
    })

    
    //const dataUsuarioGuardado=JSON.parse(localStorage.getItem("dataUsuario"));
    if (dataUsuarioGuardado) {
        $('#nombreJugador').val(dataUsuarioGuardado.nombre);
    }

    

    var contenedorPreguntas = $('#contenedorPreguntas');
    var indicePregunta = 0;
    var respuestasGuardadas = [];

    function mostrarSiguiente() {
        contenedorPreguntas.empty();

        if (indicePregunta < adivinanzaObjeto.length) {
            var pregunta = adivinanzaObjeto[indicePregunta].pregunta;
            var opciones = adivinanzaObjeto[indicePregunta].opciones;

            var preguntaElemento = $('<label>').text(pregunta);
            contenedorPreguntas.append(preguntaElemento);

            opciones.forEach(function(opcion) {
                var radioElemento = $('<input>').attr({
                    type: 'radio',
                    name: 'pregunta' + indicePregunta,
                    value: opcion,
                    required: true,
                });

                var labelElement = $('<label>').text(opcion).prepend(radioElemento);

                contenedorPreguntas.append(labelElement, $('<br>'));

                radioElemento.change(function() {
                var preguntaIndex = indicePregunta - 1;    
                respuestasGuardadas[preguntaIndex] = $(this).val();
                // cuando la pagina se carga por 1ra vez ya el indicePregunta cambia de 0 a 1,
                //y la funcion change me va a detectar cual de los inputs radio modifico su condicion,
                //guardando el valor de ese input que se modifico en la posicion indicePregunta-1,
                // es decir por ej, cuando la pagina se cargo por primera vez sera en la posicion cero.
                // De esta manera el input elegido queda guardado en la misma posicion que la pregunta 
                // que comparare con la funcion comparar respuesta (los array quedan alineados!)
                 });
            });

            indicePregunta++;
            if (indicePregunta === adivinanzaObjeto.length) {
            $('#botonSiguiente').hide();
            }
        }
    }

    mostrarSiguiente();
    

    $('#botonSiguiente').click(function(event) {
        event.preventDefault();
        var valorSeleccionado = $('input[name="pregunta' + (indicePregunta - 1) + '"]:checked').val();

        if (valorSeleccionado) {
         mostrarSiguiente();
        } else {
        alert('Por favor, selecciona una opción antes de continuar.');
        }
    });
        
    

    console.log($('#contenedorPreguntas input'));

    // Evento de envío del formulario
    $('#adivinanza1Form').submit(function(event) {
        event.preventDefault();

        var nombreJugador = $('#nombreJugador').val();

        //var respuestas   = [];

        //var usuarioRespuestas = $('input[type="radio"]:checked');

        //usuarioRespuestas.each(function() {
        //var opcionSeleccionada = $(this).val();
        //respuestas.push(opcionSeleccionada);
        //});

        console.log(respuestas)

        //var respuestasCorrectas = 0;

        var respuestas=respuestasGuardadas
        
        function compararRespuestas(respuestas) {
            var respuestasCorrectas = 0;
            for (var i = 0; i < respuestas.length; i++) {
                var respuestaCorrecta = adivinanzaObjeto[i].respuesta;
                if (respuestas[i] === respuestaCorrecta) {
                respuestasCorrectas++;
                }
            }
            return respuestasCorrectas;
        }

var respuestasCorrectas = compararRespuestas(respuestas);


        var mensajeResultado= dataUsuarioGuardado.usuario + ", Usted a dado "+ respuestasCorrectas + " respuestas correctas de un total de " + respuestas.length + " preguntas";

        $('#resultado').text(mensajeResultado);
        $('#adivinanza1Form').hide();
        $('#instruccionesJuego').hide();
        $('#resultado').show();
        $('#botonReiniciar').show();
    });

    // Reinicia el juego al hacer clic en el botón "Jugar de nuevo"
    $('#botonReiniciar').click(function() {
        $('#adivinanza1Form')[0].reset();
        $('#instruccionesJuego').show();
        $('#adivinanza1Form').show();
        $('#resultado').hide();
        //$('#botonReiniciar').hide();
        indicePregunta = 0;
        $('#botonSiguiente').show();
        mostrarSiguiente();
    });
    //Funcion para volver a la pagina principal con boton paginaInicio
    $('#paginaInicio').click(function(){
        $(location).attr('href', './tf_inicio.html');
    });
    
});
