function calc() {
    var currentYear = 2023;
    var birthYear = prompt("태어난 연도를 입력하세요","YYYY");
    var age = 0; 
        age = (currentYear - birthYear) + 1;
    if (30 <= age && age < 60) {
            document.querySelector("#result").innerHTML="먼저, 당신의 나이는" + age + "세 입니다!! Good";
        } else if (age < 30) {
            document.querySelector("#result").innerHTML="먼저, 당신의 나이는" + age + "세 입니다!! Perfect!!";
        } else if (age >= 60) {
            document.querySelector("#result").innerHTML="반갑습니다 !! 나이는 향년 " + age + "세 이십니다. Wonderful!";
        } else if (age = 'string') {
            document.querySelector("#result").innerHTML="태어난 연도(숫자)를 입력하세요!!";
    }
}
// if (age > 30) {
//     document.innerHTML="나이가 좀 있으시군요..??";
// } else {
//     document.innerHTML="어리시네요!!";
// }