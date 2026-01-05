let mainImg = document.querySelector(".main-img");
let titleA1 = document.querySelector(".title-a-1");
let titleA2 = document.querySelector(".title-a-2");
let titleA3 = document.querySelector(".title-a-3");
let titleA4 = document.querySelector(".title-a-4");
let titleA5 = document.querySelector(".title-a-5");
let backgroundChar = document.querySelector(".background-char")
let mainCharactersItem = document.querySelector(".main-characters-title")
let mainCharactersTitle = document.querySelectorAll(".main-characters-title")
let mainPictures = document.querySelector(".main-pictures");
// let mainCharactersItem = document.querySelector(".main-characters-list");

let selectImg1 = () => {
    titleA1.style.color = "rgba(161, 215, 55, 1)";
    backgroundChar.style.backgroundColor = "#A1D737";
    mainPictures.innerHTML = ` <picture class="main-pictures">
                                <source srcset="./kirillimg/rick@2x.png"
                                    media="(min-width: 320px) and (max-width:620px)">
                                <source srcset="./kirillimg/rick@3x.png"
                                    media="(min-width: 621px) and (max-width:1200px)">
                                <source srcset="./kirillimg/realrick@3x.png" media="(min-width: 1201px)">
                                <img src="./kirillimg/rick@3x.png" alt="2" class="main-img">
                            </picture>`;
}

let selectImg2 = () => {
      titleA2.style.color = "rgba(161, 215, 55, 1)";
       backgroundChar.style.backgroundColor = "rgba(13, 23, 29, 1)";   //
    mainPictures.innerHTML = ` <picture class="main-pictures">
                                <source srcset="./kirillimg/charmainpic/mortysmith@1x.png"
                                    media="(min-width: 320px) and (max-width:620px)">
                                <source srcset="./kirillimg/charmainpic/mortysmith@2x.png"
                                    media="(min-width: 621px) and (max-width:1200px)">
                                <source srcset="./kirillimg/charmainpic/mortysmith@3x.png" media="(min-width: 1201px)">
                                <img src="./kirillimg/charmainpic/mortysmith@3x.png">
                            </picture>`;
}

let selectImg3 = () => {
      titleA3.style.color = "rgba(161, 215, 55, 1)";
        backgroundChar.style.backgroundColor = "rgba(218, 248, 54, 1)";   //
    mainPictures.innerHTML = ` <picture class="main-pictures">
                                <source srcset="./kirillimg/charmainpic/summersmith@1x.png"
                                    media="(min-width: 320px) and (max-width:620px)">
                                <source srcset="./kirillimg/charmainpic/summersmith@2x.png"
                                    media="(min-width: 621px) and (max-width:1200px)">
                                <source srcset="./kirillimg/charmainpic/summersmith@3x.png" media="(min-width: 1201px)">
                                <img src="./kirillimg/charmainpic/bethsmit@3x.png">
                            </picture>`;
}

let selectImg4 = () => {
      titleA4.style.color = "rgba(161, 215, 55, 1)";
        backgroundChar.style.backgroundColor = "rgba(161, 215, 55, 1)";   //
    mainPictures.innerHTML = ` <picture class="main-pictures">
                                <source srcset="./kirillimg/charmainpic/bethsmit@1x.png"
                                    media="(min-width: 320px) and (max-width:620px)">
                                <source srcset="./kirillimg/charmainpic/bethsmit@2x.png"
                                    media="(min-width: 621px) and (max-width:1200px)">
                                <source srcset="./kirillimg/charmainpic/bethsmit@3x.png" media="(min-width: 1201px)">
                                <img src="./kirillimg/charmainpic/bethsmit@3x.png">
                            </picture>`;
}

let selectImg5 = () => {
      titleA5.style.color = "rgba(161, 215, 55, 1)";
        backgroundChar.style.backgroundColor = "rgba(13, 23, 29, 1)";   //
    mainPictures.innerHTML = ` <picture class="main-pictures">
                                <source srcset="./kirillimg/charmainpic/jerrysmith@1x.png"
                                    media="(min-width: 320px) and (max-width:620px)">
                                <source srcset="./kirillimg/charmainpic/jerrysmith@2x.png"
                                    media="(min-width: 621px) and (max-width:1200px)">
                                <source srcset="./kirillimg/charmainpic/jerrysmith@3x.png" media="(min-width: 1201px)">
                                <img src="./kirillimg/charmainpic/jerrysmith@3x.png">
                            </picture>`;
}

titleA1.addEventListener("click", selectImg1)
titleA2.addEventListener("click", selectImg2)
titleA3.addEventListener("click", selectImg3)
titleA4.addEventListener("click", selectImg4)
titleA5.addEventListener("click", selectImg5)
