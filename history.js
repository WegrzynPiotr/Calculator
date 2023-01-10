import "core-js/core";
import "regenerator-runtime/runtime";
let historyBox
export let box
let container
let removeHistoryBtn
const display = document.getElementById("display")
const result = document.getElementById("result")
const values = document.getElementById("values")
let resultList = JSON.parse(localStorage.getItem("result")) || []

if (resultList.length > 0) {
    renderElements()
    boxOverlay()
}


function renderElements() {
    if (historyBox) { return }
    historyBox = document.createElement("div");
    historyBox.id = "history__box"
    historyBox.className = "hidden"
    historyBox.title = "Math history"
    setTimeout(() => historyBox.classList.remove("hidden"), 400)
    for (let i = 0; i < 3; i++) {
        let bar = document.createElement("div")
        bar.className = "bar"
        historyBox.appendChild(bar)
    }
}

export function boxOverlay() {
    if (box) { return }
    box = document.createElement("div");
    box.id = "result__container"
    container = document.createElement("div")
    container.id = "history"
    container.append(historyBox, box)
    display.insertAdjacentElement("afterbegin", container)
    box.className = "hidden";
    let removeHistoryBtn
    box.style.opacity = "1"
    box.style.height = "fit-content"
    removeHistoryBtn = document.createElement("span");
    removeHistoryBtn.id = "remove__history"
    removeHistoryBtn.className = "fa fa-trash"
    historyBox.addEventListener("click", () => {
        box.innerHTML = `<ul>${resultList.map(el => "<li>" + el + "</li>").join(" ")}</ul>`
        box.classList.toggle("hidden")
        box.appendChild(removeHistoryBtn)
        if (!box.classList.contains("hidden")) {
            historyBox.style.position = "relative"
            removeHistoryBtn.addEventListener("click", function () {
                box.classList.add("hidden")
                historyBox.classList.add("hidden")
                setTimeout(() => {
                    localStorage.removeItem("result")
                    resultList.length = 0
                    box.innerHTML = ""
                }, 900)
            })
        }

        if (!box.classList.contains("hidden")) {

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (box.getBoundingClientRect().height <= display.getBoundingClientRect().height) {
                        box.style.minHeight = "100%"
                        console.log("wysokosc 100%")
                        !entry.isIntersecting ? box.style.height = (result.getBoundingClientRect().height + values.getBoundingClientRect().height) + 30 + "px" : box.style.height = "100%"

                    } else {
                        observer.disconnect()
                    }
                })
            }, { root: display, rootMargin: -(result.getBoundingClientRect().height) + "px" })
            observer.observe(result)
        }
    })
}

export function historyAdd() {
    resultList.push(result.textContent)
    resultList = resultList.filter(element => element !== "error" ? element : console.log("error"))
    localStorage.setItem("result", JSON.stringify(resultList))

    if (resultList.length != 0)
        if (historyBox)
            historyBox.classList.remove("hidden")
    renderElements()
    boxOverlay()

}

