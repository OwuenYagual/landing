const databaseURL = 'https://landing-9bcd0-default-rtdb.firebaseio.com/collection.json'

let sendData = () => {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries())

    data['saved'] = new Date().toLocaleString('es-CO', { timeZone: 'America/Guayaquil' })

    fetch(databaseURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
            }
            return response.json(); // Procesa la respuesta como JSON
        })
        .then(result => {
            alert('Agradeciendo tu preferencia, nos mantenemos actualizados y enfocados en atenderte como mereces'); // Maneja la respuesta con un mensaje
            form.reset()
        })
        .catch(error => {
            alert('Hemos experimentado un error. ¡Vuelve pronto!'); // Maneja el error con un mensaje
        });
}

let ready = () => {
    console.log('DOM esta listo')
    //debugger
}

let loaded = () => {
    let myform = document.getElementById('form')
    //debugger
    myform.addEventListener('submit', (eventSubmit) => {
        eventSubmit.preventDefault();
        //debugger
        let emailElement = document.querySelector('.form-control-lg')
        let emailText = emailElement.value

        if (emailText.length == 0) {
            emailElement.focus()
            emailElement.animate([
                { transform: "translateX(0)" },
                { transform: "translateX(25px)" },
                { transform: "translateX(-25px)" },
                { transform: "translateX(0)" },
                { transform: "translateX(25px)" },
                { transform: "translateX(-25px)" },
                { transform: "translateX(0)" }
            ], {
                duration: 400,
                easing: "linear"
            })
            return;
        }

        sendData();
    })
}

window.addEventListener("DOMContentLoaded", ready)
window.addEventListener("load", loaded)



