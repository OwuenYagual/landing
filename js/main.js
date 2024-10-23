let ready = () => {
    console.log('DOM esta listo')
    //debugger
}

let loaded = () => {
    let myform = document.getElementById('form')
    //debugger
    myform.addEventListener('submit',(eventSubmit) => {
        eventSubmit.preventDefault();
        //debugger
        let emailElement = document.querySelector('.form-control-lg')
        let emailText = emailElement.value

        if(emailText.length == 0){emailElement.focus()}
    })
}

window.addEventListener("DOMContentLoaded", ready)
window.addEventListener("load", loaded)



