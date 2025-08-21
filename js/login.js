/* Modified by PowerChord25, todos los asientos reservados */

const loginForm = document.getElementById("section-login");     // Creo una constante para manejar la info del div del login (para el click del botón)

const emailInput = document.getElementById("email");            // Convierto el correo en un objeto
const passwordInput = document.getElementById("password");      // Convierto la contraseña en un objeto


loginForm.addEventListener("submit", function(event) {          // Le digo al DOM que esté a la escucha de que el botón envíe el evento "submit" (está en el login.html)
    event.preventDefault();                                     // Según leí, esto previene que se recargue la página cuando se envíe el formulario

    const email = emailInput.value;                             // Del objeto emailImput, saco el valor
    const password = passwordInput.value;                       // Lo mismo para la contraseña

    if (email === '' || password === '') {                      // Esto revisa si el email o la contraseña están vacíos
        alert("Debes poner tu correo y contraseña");            // Y le alerta al usuario que tiene que completar
    } else {

        localStorage.setItem("inicioSesion", "true");           // En caso que los campos no estén vacíos, guardo en localStorage la info de inicio de sesión, para que así no se borre si cierran la pestaña
        window.location.href = "index.html";                    // Y ahora si movemos al usuario de vuelta al index.html
    }
});