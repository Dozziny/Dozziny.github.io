function callName(name, count) { //매개변수가 2개가 존재한다.
    for (let i = 1; i <= count; i++) {
        document.write(`${i}. ${name}</br>`);
    }
}

function addSum(count) { //매개변수가 2개가 존재한다.
    let sum = 0;
    for (let i = 1; i <= count; i++) {
        sum += i;
    }
    document.write(`1부터 ${count}까지 더한 값은 ${sum}입니다.</br>`);
}