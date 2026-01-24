let backgroundChar = document.querySelector(".background-char");
let mainPictures = document.querySelector(".main-pictures");
let titles = document.querySelectorAll(".main-characters-title");
const characters = {
    rick: {
        color: "#A1D737",
        bg: "#A1D737",
        img: "rick",
        width:1450,
         height: 604
    },
    morty: {
        color: "#A1D737",
        bg: "#0d171dff",
        img: "mortysmith",
         width:1450,
         height: 604
    },
    summer: {
        color: "#A1D737",
        bg: "#daf836ff",
        img: "summersmith",  
       width:1450,
         height: 604
    },
    beth: {
        color: "#A1D737",
        bg: "#A1D737",
        img: "bethsmit",
        width:1450,
         height: 604
    },
    jerry: {
        color: "#A1D737",
        bg: "#0d171dff",
        img: "jerrysmith",
        width:1450,
         height: 604
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
                                <source srcset="./kirillimg/charmainpic/${char.img}@3x.webp" media="(min-width: 1201px)" width="${char.width}" height="${char.height}">
                              <img src="./kirillimg/charmainpic/${char.img}@3x.webp">
                            </picture>
    `
}
// width="1450" height="604"
titles.forEach(title => {
    title.addEventListener("click", () => {
        selectImages(title.dataset.char, title)
    })
})
