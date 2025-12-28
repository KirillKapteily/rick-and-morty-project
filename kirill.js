let mainImg = document.querySelector(".main-img");
let  titleA1 = document.querySelector(".title-a-1");
let  titleA2 = document.querySelector(".title-a-2");
let  titleA3 = document.querySelector(".title-a-3");
let  titleA4 = document.querySelector(".title-a-4");
let  titleA5 = document.querySelector(".title-a-5");
let mainCharactersItem = document.querySelector(".main-characters-title")
let mainCharactersTitle = document.querySelector(".main-characters-title")
// let mainCharactersItem = document.querySelector(".main-characters-list");

let selectImg = (event) => {
    let selected = event.target;
    selected.style.color = "rgba(161, 215, 55, 1)";
    console.log(
"aiufyiua!"
    );
    
}

 mainCharactersItem.addEventListener("click", selectImg)
