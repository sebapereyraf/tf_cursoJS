$(document).ready(function(){
    const dataUsuarioGuardado = JSON.parse(localStorage.getItem("dataUsuario"));
    if (dataUsuarioGuardado) {
        $('#bienvenida').hide();
        $('#txtUsuarioRegistrado').show();
        $('#divBotones').show();
        $('#usuarioRegistrado').text(dataUsuarioGuardado.usuario);
        $('#usuarioRegistrado').append('<div id="cerrarSesion">X</div>');
        
    } else {
        $('#bienvenida').show();
        $('#txtUsuarioRegistrado').hide();
        $('#divBotones').hide();
        $('#usuarioRegistrado').text('Regístrese');
        $('#usuarioRegistrado').click(function(){
        $(location).attr('href', './tfForm1.html');
    });
    }

    //Links para juego adivinanza
    $('#adivinanzasBoton').click(function(){
        $(location).attr('href', './gh_adivinanza1.html');
    });

    //Link para juego Preguntas y Respuestas
    $('#preguntasRespuestasBoton').click(function(){
        $(location).attr('href', './gh_pregunta_respuesta.html');
    });

    // Evento clic para cerrar sesión
    $('#cerrarSesion').click(function() {
        localStorage.removeItem("dataUsuario")
        alert('Sesión cerrada');
        $(location).attr('href', './tf_inicio.html'); // que se redireccione a la pagina inicial
    });

    if (dataUsuarioGuardado) {
        $('#cerrarSesion').show();
    } else {
        $('#cerrarSesion').hide();
    }


});