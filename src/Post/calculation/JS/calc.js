//return 문은 함수의 결과 값을 반환할 때 사용되는 키워드이다.
//return 문 다음에 올 수 있는 것은 수식, 변수, 실제 값이 될 수 있다.

function calculation() {
    //ParseInt() 함수는 String을 Number Type으로 바꾸어주는 함수이다.
    let num1;      // 첫번째 숫자 입력
    num1 = promNum1();  

    let choice;    // 연산자 입력
    choice = Operator();   

    let num2;      // 두번째 숫자 입력
    num2 = promNum2();  

    let result = 0;
    switch(choice) {
        case '+':
            result = add(num1, num2);
            break;
        case '-':
            result = substract(num1, num2);
            break;
        case '*':
            result = multiply(num1, num2);
            break;
        case '/':
            result = divide(num1, num2);
            break;
        default : 
            result = "잘못 입력했습니다";
    }
    
    const resultDiv = document.getElementById("result"); // 결과 출력용 div 요소 가져오기
    const newResult = document.createElement("p"); // 새로운 결과를 담을 p 요소 생성
    newResult.innerText = `${num1} ${choice} ${num2} = ${result}`; // 결과 출력
    resultDiv.appendChild(newResult); // 결과를 결과 출력용 div의 하위 요소로 추가
}

function add(num1, num2) {
    return num1 + num2;
}

function substract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function promNum1() {   // 첫번째 숫자 입력
    for (;;) {
        num1 = parseInt(prompt("첫번째 숫자를 입력하세요."));
        if (!isNaN(num1)) {
            return num1;
        } else {
            alert("잘못 입력하였습니다. 다시 입력하세요.")
        }
    }
}

function promNum2() {     // 두번째 숫자 입력
    for (;;) {
        num2 = parseInt(prompt("두번째 숫자를 입력하세요."));
        if (!isNaN(num2)) {
            return num2;
        } else {
            alert("잘못 입력하였습니다. 다시 입력하세요.")
        }
    }
}

function Operator() {      // 연산자 입력
    for (;;) {
        choice = prompt("연산자를 입력하세요. (+, -, *, /)", "+,-,*,/");
        if (choice === '+' || choice === '-' || choice === '*' || choice === '/') {
            return choice;
        } else {
            alert("잘못 입력하였습니다. 다시 입력하세요.")
        }
    }
}