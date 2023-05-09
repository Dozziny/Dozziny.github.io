let slides = document.querySelectorAll("#container > img"); // 이미지들을 저장한 배열
let prev = document.querySelector("#prev"); //이전 버튼
let next = document.querySelector("#next"); //다음 버튼
let current = 0;

showSlide(current); // showSlide() 함수를 실행해 current 위치에 있는 이미지를 표시하는 함수
prev.onclick = prevSlide; //  prev를 클릭하면 prevSlide 함수를 호출
next.onclick = nextSlide; //  next를 클릭하면 nextSlide 함수를 호출

function showSlide(n) {
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"
    }
    slides[n].style.display = "block";
}

function prevSlide() {
    if (current > 0) {
        current -= 1; // 현재 이미지가 첫 번째가 아닐 경우 -1의 위치로 보내기 위함
    } else {
        current = slides.length - 1; //현재 이미지가 첫 번째가 아니라면 마지막으로 보냄
    }
    showSlide(current);
}

function nextSlide() {
    if (current < slides.length - 1) {
        current += 1;
    } else {
        current = 0;
    }
    showSlide(current);
}