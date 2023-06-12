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
    });


    adivinanzaObjeto.forEach(function(adivinanza, i) {
        
        var contenedorPreguntas = $('#contenedorPreguntas');
        //var preguntaID = 'pregunta' + index;
        var pregunta = adivinanzaObjeto[i].pregunta;
        var opciones = adivinanzaObjeto[i].opciones;
        
        
        var preguntaElemento = $('<label>').text(pregunta);
        contenedorPreguntas.append(preguntaElemento);

        //console.log(adivinanza.pregunta);

        opciones.forEach(function(opcion) {
            var radioElemento = $('<input>').attr({
                type: 'radio',
                name: 'pregunta'+ i,
                value: opcion,
                required: true,
            });

            var labelElement = $('<label>').text(opcion).prepend(radioElemento);

            //contenedorPreguntas.append(labelElement, $('<br>'));
            contenedorPreguntas.append(labelElement);

            //console.log(opcion);        

        });
        
    });

    console.log($('#contenedorPreguntas input'));

    // Evento de envío del formulario
    $('#adivinanza1Form').submit(function(event) {
        event.preventDefault();

        var nombreJugador = $('#nombreJugador').val();

        var respuestas   = [];

        var usuarioRespuestas = $('input[type="radio"]:checked');

        usuarioRespuestas.each(function() {
        var opcionSeleccionada = $(this).val();
        respuestas.push(opcionSeleccionada);
        });

        console.log(respuestas)

        //var respuestasCorrectas = 0;

        
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


        var mensajeResultado= dataUsuarioGuardado.usuario+", Usted a dado "+ respuestasCorrectas + " respuestas correctas de un total de " + respuestas.length + " preguntas";

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
        $('#botonReiniciar').hide();
    });
    //Funcion para volver a la pagina principal con boton paginaInicio
    $('#paginaInicio').click(function(){
        $(location).attr('href', './tf_inicio.html');
    });
});