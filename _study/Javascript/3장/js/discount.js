function showPrice() { //showPrice 함수로 만듦, 즉 버튼을 누르면 실행되는 함수
var oPrice= document.querySelector("#originalPrice").value; // 원래 가격 가져오기
var rate = document.querySelector('#rate').value; // 할인율 가져오기
var savedPrice = oPrice * (rate /100); //힐인금액
var resultPrice = oPrice - savedPrice; // 원래 가격 - 할인 금액을 뺸 최종 가격
document.querySelector('#showResult').innerHTML = `상품의 원래 가격은 ${oPrice}원 이고, 할인율은 ${rate}% 입니다. ${savedPrice}원을 절약한 ${resultPrice}원에 구매할 수 있습니다.`;
}