import "core-js/core";
import "regenerator-runtime/runtime";
const circle = document.querySelector(".circle");
const switchBtn = document.getElementById("mode");
const keyboard = document.getElementById("keyboard");
let getMode = localStorage.getItem("mode")
if (getMode == "LIGHT") {
    circle.classList.remove("show")
}

export const switchTheme = () => {
    const result = document.getElementById("result__container")
    let mode
    circle.classList.toggle("show")
    if (circle.classList.contains("show")) {
        document.body.style.backgroundColor = "#fff"
        if (keyboard.classList.contains("theme--dark")) {
            keyboard.classList.remove("theme--dark")
            if (result)
                result.classList.remove("theme--dark")
        }
        mode = localStorage.setItem("mode", "LIGHT")
    } else {
        document.body.style.backgroundColor = "#000"
        keyboard.classList.add("theme--dark")
        if (result)
            result.classList.add("theme--dark")
        mode = localStorage.setItem("mode", "DARK")
    }
}

switchBtn.addEventListener("click", switchTheme)
