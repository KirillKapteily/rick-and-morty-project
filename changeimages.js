let backgroundChar = document.querySelector(".background-char");
let mainPictures = document.querySelector(".main-pictures");
let titles = document.querySelectorAll(".main-characters-title");
const characters = {
    rick: {
        color: "#A1D737",
        bg: "#A1D737",
        img: "rick"
    },
    morty: {
        color: "#A1D737",
        bg: "#0d171dff",
        img: "mortysmith"
    },
    summer: {
        color: "#A1D737",
        bg: "#daf836ff",
        img: "summersmith"
    },
    beth: {
        color: "#A1D737",
        bg: "#A1D737",
        img: "bethsmit"
    },
    jerry: {
        color: "#A1D737",
        bg: "#0d171dff",
        img: "jerrysmith"
    }
}

let selectImages = (name, title) => {
    titles.forEach(t => t.style.color = "")

    const char = characters[name];

    title.style.color = "#A1D737";
    backgroundChar.style.backgroundColor = char.bg;

    mainPictures.innerHTML = `
  <picture class="main-pictures">
                               <source srcset="./kirillimg/charmainpic/${char.img}@1x.webp"
                              media="(min-width: 320px) and (max-width:620px)">
                           <source srcset="./kirillimg/charmainpic/${char.img}@2x.webp"
                                    media="(min-width: 621px) and (max-width:1200px)">
                                <source srcset="./kirillimg/charmainpic/${char.img}@3x.webp" media="(min-width: 1201px)">
                              <img src="./kirillimg/charmainpic/${char.img}@3x.webp">
                            </picture>
    `
}

titles.forEach(title => {
    title.addEventListener("click", () => {
        selectImages(title.dataset.char, title)
    })
})
