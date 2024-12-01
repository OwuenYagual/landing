const databaseURL = "https://landing-9bcd0-default-rtdb.firebaseio.com/collection.json"

const eventTypeMap = {
    1: "Quinceañera",
    2: "Recepción de boda",
    3: "Graduación",
    4: "Competición",
    5: "Cumpleaños"
};

let sendData = () => {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const eventTypeValue = data.event_type;
    data.event_type = eventTypeMap[eventTypeValue];
    console.log(data)

    

    //data['saved'] = new Date().toLocaleString('es-CO', { timeZone: 'America/Guayaquil' })

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
            getData()
        })
        .catch(error => {
            alert('Hemos experimentado un error666. ¡Vuelve pronto!'); // Maneja el error con un mensaje
        });
}

let getData = async () => {
    try {
        const response = await fetch(databaseURL)

        if (!response.ok) {
            alert('Hemos experimentado un error. ¡Vuelve pronto!');
        }

        const data = await response.json()

        if (data != null) {
            let reservas = []

            if (Object.keys(data).length > 0) {
                for (let key in data) {
                    reservas.push(data[key])
                }
            }

            if (reservas.length > 0) {
                subscribers.innerHTML = ''

                reservas.forEach((reserva, index) => {
                    let { date, email, event_type, name} = reserva;
                    let rowTemplate = `
                             <tr>
                                 <th scope="row">${index +1}</th>
                                 <td>${event_type}</td>
                                 <td>${date}</td>
                             </tr>`
                    subscribers.innerHTML += rowTemplate
                    
                });
    
            }
        }

    
    } catch (error) {
        console.error('Error en la solicitud:', error);
        alert('Hemos experimentado un error8. ¡Vuelve pronto!');
    }
}

let ready = () => {
    console.log('DOM esta listo')
    getData();
}

let loaded = () => {
    let myform = document.getElementById('form')
    myform.addEventListener('submit', (eventSubmit) => {
        eventSubmit.preventDefault();
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



