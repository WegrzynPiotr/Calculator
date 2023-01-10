import "core-js/core";
import "regenerator-runtime/runtime";
import { switchTheme } from "/theme.js";
import { historyAdd, box } from "./history.js";
const keyboard = document.querySelectorAll("#keyboard >*");
const mathOperations = document.getElementById("values");
const result = document.getElementById("result");
const equal = document.getElementById("equal");
const plusMinusBtn = document.getElementById("plus_minus");
let dotsList = [];
const numbers = document.querySelectorAll(".number");
const functions = document.querySelectorAll(".function");
let values = []
let res;
let pos;
let line
let allValue
let a, b, currentOperation;
let dotAdded = false;
let final
switchTheme()
function operation(symbol, curVal) {
    curVal.reduce((prev, next) => {
        if (symbol === "ADD") {
            final = prev + next
        }
        if (symbol === "SUBTRACT") {
            final = prev - next
        }
        if (symbol === "MULTIPLY") {
            final = prev * next
        }
        if (symbol === "DIVIDE") {
            final = prev / next
        }
        if (symbol === "PERCENT") {
            final = next * prev / 100
        }
    }
    )
    if (isNaN(final) || !isFinite(final)) {
        final = "error"
        setTimeout(clear, 2000)
    }
    mathOperations.textContent = final;
    if (!result.textContent) {
        line = document.createElement("hr")
        result.insertAdjacentElement("beforebegin", line)
    }
    result.textContent = final
    historyAdd()

    pos.length = 0;
    pos[0] = final
}



function operators(curVal) {
    switch (currentOperation) {
        case "+":
            operation("ADD", curVal)
            break;
        case "-":
            operation("SUBTRACT", curVal)
            break;

        case "X":
            operation("MULTIPLY", curVal)
            break;

        case "/":
            operation("DIVIDE", curVal)
            break;
        case "%":
            operation("PERCENT", curVal)
            break;

    }
}



function currentlyOperation(e) {
    if (currentOperation) return
    currentOperation = this.textContent || e


    if (currentOperation !== "AC") {
        mathOperations.textContent += currentOperation
    } else {
        mathOperations.textContent = ""
        result.textContent = ""
        currentOperation = ""
        if (line)
            line.remove()

    }
    if (mathOperations.textContent == currentOperation) {
        mathOperations.textContent = ""
        pos = []
    }
}


let plusMinusAdded = false;
let currentPos = 0;


function plusMinusToggle() {
    if (pos[0] && !pos[1]) {
        pos[0] = Number(-pos[0])
        mathOperations.textContent = mathOperations.textContent.indexOf(currentOperation) > -1 ? pos[0] + currentOperation : pos[0]
    }

    if (pos[1]) {
        pos[1] = Number(-pos[1])
    }


    if (mathOperations.textContent.indexOf(currentOperation) > -1 && pos[0] && pos[1]) {
        mathOperations.textContent = `${pos[0]}${currentOperation}${pos[1] < 0 ? "(" + pos[1] + ")" : pos[1]}`

    }

}

const numberKeys = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const operationKeys = ["+", "-", "*", "/", "%"]


function signCurrentValue(e) {
    mathOperations.textContent += this.textContent || numberKeys.filter(key => key == e.key)
    if (e.key == "Backspace" && result.textContent.length && !mathOperations.textContent.length) {
        clear()
    }


    if (e.key == "Backspace") {
        mathOperations.textContent = mathOperations.textContent.substring(0, mathOperations.textContent.length - 1)
        return
    }

    if (e.key == "Enter") {
        checkResult()
        return;
    }

    if (operationKeys.includes(e.key)) {
        currentlyOperation(e.key)
        return;
    }

    if (!mathOperations.textContent.includes(currentOperation)) {
        currentOperation = ""
    }

    a = mathOperations.textContent
    pos = [...a.split(currentOperation)]

    if (mathOperations.textContent.indexOf(".") > -1) {
        console.log("zawiera kropke")
        dot.removeEventListener("click", dotAdd)
    }

    if (!pos.every(el => el.includes("."))) {
        dot.addEventListener("click", dotAdd, { once: true })
        dotAdded = false;
    }
    if (pos[0])
        if (pos[0].includes(".")) {
            dotAdded = false;
        } else if (pos[1]) {
            if (pos[1].includes("."))
                dotAdded = true;

        }
    if (dotAdded) {
        dot.removeEventListener("click", dotAdd)
        dotAdded = false
    }


}

function dotAdd() {
    mathOperations.textContent += "."
}

function checkResult() {

    if (mathOperations.textContent.includes(currentOperation)) {
        let curVal = pos.map(el => parseFloat(el))
        operators(curVal)
        currentOperation = ""
    }
}


function clear() {
    mathOperations.textContent = ""
    currentOperation = ""
    result.textContent = ""
    pos[0] = null
    pos[1] = null
    line.remove()
}

numbers.forEach(number => number.addEventListener("click", signCurrentValue))
equal.addEventListener("click", checkResult)
plusMinusBtn.addEventListener("click", plusMinusToggle)

numbers.forEach(number => window.addEventListener("keydown", signCurrentValue))

if (!currentOperation) {

    functions.forEach(option => option.addEventListener("click", currentlyOperation))

}