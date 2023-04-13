window.onload = function() {
    const calcButtons = document.querySelectorAll(".calc-button");
    for (let i = 0; i < calcButtons.length; i++) {
        calcButtons[i].setAttribute("onclick", "calcButton(this.innerHTML)");
    }
}