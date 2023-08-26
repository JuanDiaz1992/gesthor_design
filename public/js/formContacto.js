const formulario = document.getElementById('formContacto');


formulario.addEventListener('submit', (e) => {

    e.preventDefault(); 
    let boton = document.getElementById("formContacto--buttom");

    boton.removeAttribute("Type");
    boton.classList.add("buttonFomrInactive")
    boton.value = "Enviando";


    let nombre = document.getElementById("formnombre").value;
    let empresa = document.getElementById("empresa").value;
    let presupuesto = document.getElementById("presupuesto").value;
    let correo = document.getElementById("correo").value;
    let observaciones = document.getElementById("observaciones").value
    let encontraste = ""
    if (!presupuesto){
        presupuesto = 0
    }
    try{
        encontraste = document.querySelector('input[name="encontraste[]"]:checked').value;
    }catch(error){
        encontraste = "No seleccionado"
    }
    let suscribirse = document.getElementById("newsletter").checked; 
    let form = {
        "nombre":nombre,
        "empresa":empresa,
        "presupuesto":presupuesto,
        "correo":correo,
        "observaciones":observaciones,
        "encontraste":encontraste,
        "suscribirse":suscribirse
    }
    const url = "https://apispruebas.pythonanywhere.com/"
    //const url = "http://127.0.0.1:8000/"
    fetch(`${url}formContacto/`, {
        method: 'POST',
        body: JSON.stringify(form),
        headers: {
            "X-CSRFToken": getCookie('csrftoken'),
            "X-Requested-With": "XMLHttpRequest",
        }
    })
    .then(response => response.json())
    .then(function(data){
        if (data.status){
            console.log(data);
            formulario.classList.add("desaparecer")
            let formContainer = document.getElementById("formContacto--container")
            let div = document.createElement("div")
            let h3 = document.createElement("h3")
            h3.textContent = "Hemos recibido tu mensaje, pronto estaremos en contacto."
            div.appendChild(h3)
            formContainer.appendChild(div)
            formContainer.style.height="200px"
        }
        else{
            Swal.fire({
                title: "Error al envíar el formulario",
                text: `Ha ocurrido un error al enviar el formulario, por favor revisa los datos y envíalo de nuevo`,
                icon: 'error',
                confirmButtonText: 'Aceptar',
                willClose: function() {
                    location.reload();
                  }
            })
        }


    })
    .catch(error => {
        console.error(error);
        // Manejar el error
    });
});
