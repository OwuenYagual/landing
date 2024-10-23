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

        if(emailText.length == 0){
            emailElement.focus()
            emailElement.animate([
                {transform: "translateX(0)"},
                {transform: "translateX(50px)" },
                {transform: "translateX(-50px)" },
                {transform: "translateX(0)" },
                {transform: "translateX(0)"},
                {transform: "translateX(50px)" },
                {transform: "translateX(-50px)" },
                {transform: "translateX(0)" }
            ],{
                duration: 400,
                easing: "linear"
            })
            
        }
    })
}

window.addEventListener("DOMContentLoaded", ready)
window.addEventListener("load", loaded)



