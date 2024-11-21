const databaseURL = "https://landing-9bcd0-default-rtdb.firebaseio.com/collection.json"

let sendData = () => {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log(data)

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
            getData()
        })
        .catch(error => {
            alert('Hemos experimentado un error. ¡Vuelve pronto!'); // Maneja el error con un mensaje
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
            let countSuscribers = new Map()

            if (Object.keys(data).length > 0) {
                for (let key in data) {
                    let { email, saved } = data[key]
                    let date = saved.split(",")[0]
                    let count = countSuscribers.get(date) || 0;
                    countSuscribers.set(date, count + 1)
                }
            }

            if (countSuscribers.size > 0) {
                subscribers.innerHTML = ''
    
                for (let [date, count] of countSuscribers) {
                    let rowTemplate = `
                             <tr>
                                 <th scope="row">1</th>
                                 <td>${date}</td>
                                 <td>${count}</td>
                             </tr>`
                    subscribers.innerHTML += rowTemplate
                }
            }
        }

    
    } catch (error) {
        console.error('Error en la solicitud:', error);
        alert('Hemos experimentado un error 69. ¡Vuelve pronto!');
    }
}

let ready = () => {
    console.log('DOM esta listo')
    //debugger
    getData();
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



