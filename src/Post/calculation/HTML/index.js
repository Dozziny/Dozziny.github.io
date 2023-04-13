window.onload = function() {
    const link = document.querySelector('a[href$="calc.html"]');
    link.setAttribute('href', 'https://dozziny.github.io/src/post/calculation/HTML/calc.html');
    link.setAttribute('target', '_blank');
    const calcButtons = document.querySelectorAll(".calc-button");
    for (let i = 0; i < calcButtons.length; i++) {
        calcButtons[i].setAttribute("onclick", "calcButton(this.innerHTML)");
    }
}