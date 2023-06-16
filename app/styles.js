const theme = document.querySelector(".bg-img");
const textBG = document.querySelector(".description");
const changeTimer5Btn = document.getElementById("timer5");
const changeTimer15Btn = document.getElementById("timer15");
const changeTimer25Btn = document.getElementById("timer25");

let currentBackground = 1;
let currentText = "Time to focus";

changeTimer5Btn.addEventListener("click", () => changeOptions(2, "Let’s take a break"));
changeTimer15Btn.addEventListener("click", () => changeOptions(3, "Let’s take a big break"));
changeTimer25Btn.addEventListener("click", () => changeOptions(1, "Time to focus"));

function changeOptions(backgroundNumber, backgroundText) {
    changeBackground(backgroundNumber);
    changeText(backgroundText);
    toggleActiveClass(backgroundNumber);
}

function changeBackground(backgroundNumber) {
    theme.classList.remove(`bg-img${currentBackground}`);
    theme.classList.add(`bg-img${backgroundNumber}`);
    currentBackground = backgroundNumber;
}

function changeText(backgroundText) {
    textBG.textContent = backgroundText;
    currentText = backgroundText;
}

function toggleActiveClass(activeButton) {
    changeTimer5Btn.classList.toggle("active", activeButton === 2);
    changeTimer15Btn.classList.toggle("active", activeButton === 3);
    changeTimer25Btn.classList.toggle("active", activeButton === 1);
}

function changeImg(src) {
    const addButtonImage = document.getElementById('addButtonImg');
    addButtonImage.src = src;
}