let start = prompt("숫자를 입력하세요!","5");
let sum=0;
for (i=0; i<start; i++) {
    sum += i;
}
document.write(`1부터 ${start}까지의 합 = ${sum}`);