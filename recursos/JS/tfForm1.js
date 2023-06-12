$(document).ready(function() {
    $("#form1").submit(function(event) {
        event.preventDefault(); // Evitar envío del formulario
        
        let formularioValido = true;
        
       let msjError="Es necesario completar este dato"

        if ($("#nombre").val()==="") {
            $("#nombreError").text(msjError)            //("Es necesario completar este dato");
            $("#nombreError").show  //.addClass("visible");
            $("#nombre").addClass("input-vacio");
            formularioValido = false;
        } else {
            $("#nombreError").text("");
            $("#nombreError").hide  //removeClass("visible");
            $("#nombre").removeClass("input-vacio");
        }

        if ($("#apellido").val()==="") {
            $("#apellidoError").text(msjError)            //("Es necesario completar este dato");
            $("#apellidoError").hide  //.addClass("visible");
            $("#apellido").addClass("input-vacio");
            formularioValido = false;

        } else {
            $("#apellidoError").text("");
            $("#apellidoError").show  //removeClass("visible");
            $("#apellido").removeClass("input-vacio");
        }

        if ($("#email").val()==="") {
            $("#emailError").text(msjError)            //("Es necesario completar este dato");
            $("#emailError").hide  //.addClass("visible");
            $("#email").addClass("input-vacio");
            formularioValido = false;

        } else {
            $("#emailError").text("");
            $("#emailError").show  //removeClass("visible");
            $("#email").removeClass("input-vacio");
        }

        if ($("#usuario").val()==="") {
            $("#usuarioError").text(msjError)            //("Es necesario completar este dato");
            $("#usuarioError").hide  //.addClass("visible");
            $("#usuario").addClass("input-vacio");
            formularioValido = false;

        } else {
            $("#usuarioError").text("");
            $("#usuarioError").show  //removeClass("visible");
            $("#usuario").removeClass("input-vacio");
        }

        if ($("#password").val()==="") {
            $("#passwordError").text(msjError)            //("Es necesario completar este dato");
            $("#passwordError").hide  //.addClass("visible");
            $("#password").addClass("input-vacio");
            formularioValido = false;

        } else {
            $("#passwordError").text("");
            $("#passwordError").show  //removeClass("visible");
            $("#password").removeClass("input-vacio");
        }

        if ($("#password2").val()==="") {
            $("#password2Error").text(msjError)            //("Es necesario completar este dato");
            $("#password2Error").hide  //.addClass("visible");
            $("#password2").addClass("input-vacio");
            formularioValido = false;

        } else {
            $("#password2Error").text("");
            $("#password2Error").show  //removeClass("visible");
            $("#password2").removeClass("input-vacio");
        }
     
        let expresionEmail = /^\S+@\S+\.\S+$/;
        if (!expresionEmail.test($("#email").val())) {
            $("#emailError2").text("Se requiere un email válido");
            $("#emailError2").show();
            $("#email").addClass("input-vacio");
            formularioValido = false;
        } else {
            $("#emailError2").text("");
            $("#emailError2").hide();
            $("#email").removeClass("input-vacio");
        }

        if ($("#password").val() !== $("#password2").val()) {
            $("#password2Error2").text("Las contraseñas no coinciden");
            $("#password2Error2").show();
            $("#password2").addClass("input-vacio");
            formularioValido = false;
        } else {
            $("#password2Error2").text("");
            $("#password2Error2").hide();
            $("#password2").removeClass("input-vacio");
        }

        if (formularioValido) {
        const dataUsuario ={
            nombre: $("#nombre").val(),
            apellido: $("#apellido").val(),
            usuario: $("#usuario").val(),
        } 
        localStorage.setItem("dataUsuario", JSON.stringify(dataUsuario));
        const dataUsuarioGuardado=JSON.parse(localStorage.getItem("dataUsuario"));
        console.log(dataUsuarioGuardado.usuario); 

        $(location).attr('href', './tf_inicio.html'); // que se redireccione a la pagina inicial
        }
        
    });

    $.ajax({
        url: "https://apis.datos.gob.ar/georef/api/provincias",
        method: "GET",
        datatype: "json",
        success: function(data){
            $("#provinciaError").hide();

            for (var i=0; i<data.provincias.length; i++){
                let nombreProvincia=data.provincias[i].nombre;
                let valorProvincia=data.provincias[i].id;
                let opcionSelect=$("<option>").text(nombreProvincia).val(valorProvincia);
                $("#provincia").append(opcionSelect);
                
            }

        },
        error: function(){
            $("#provinciaError").text("Error al mostra provincias. Intentelo mas tarde");
            $("#provinciaError").show();

        }
    })

    $.ajax({
        url: "https://restcountries.com/v3.1/all",
        method: "GET",
        datatype: "json",
        success: function(data){
            $("#paisesError").hide();

            for (var i=0; i<data.length; i++){
                let nombrePais=data[i].name.common;
                let opcionSelect=$("<option>").text(nombrePais).val(nombrePais);
                $("#paises").append(opcionSelect);
            }

        },
        error: function(){
            $("#paisesError").text("Error al mostrar paises. Intentelo mas tarde");
            $("#paisesError").show();

        }
    })
    $('#paginaInicio').click(function(){
        $(location).attr('href', './tf_inicio.html');
    });
});


/*

$(document).ready(function(){
$("#form1").submit(function(event){
    event.preventDefault(); // Evita que el formulario se envie

    if ($("#nombre").val()===""){
    $("#nombreError").textContent=$("#nombre").label + " es obligatorio"
    $("#nombreError").classList.add("visible")
} else{
    $("#nombreError").textContent= ""
    $("#nombreError").classList.remove("visible")
}
            
});
}); 

*/



