let coverImage = document.querySelector("#cover");

coverImage.onclick = function() {
    alert("이미지가 클릭 되었습니다!");
};

coverImage.onmouseover = function() {
    coverImage.style.border = "5px skyblue solid";
}

coverImage.onmouseout = function() {
    coverImage.style.border = "";
}