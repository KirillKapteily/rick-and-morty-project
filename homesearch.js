const headerSearch = document.querySelector(".header-search");
const modalChars = document.querySelector(".modal-chars");
const modalList = document.querySelector(".modal-list");
const backdrop = document.querySelector(".backdrop");
const closeModalBtn = document.querySelector(".close-modal");
const searchIco = document.querySelector(".search-ico");
const bodyHome = document.querySelector(".body-home");

async function searchEps() {
    try {
        modalList.innerHTML = " ";
        let searched = await headerSearch.value.toLowerCase();
        const cards = await fetchAllChars();
        const filtered = cards.filter(char =>
            char.name.toLowerCase().includes(searched)
        );

        renderChars(filtered)

    } catch (err) {
        console.log(err);
    }
}


async function fetchAllChars() {
    let allChars = [];
    let gettin = "https://rickandmortyapi.com/api/character";

    while (gettin) {
        const resp = await fetch(gettin);
        const data = await resp.json();

        allChars = [...allChars, ...data.results];

        gettin = data.info.next;
    }

    return allChars.map(chars => ({
        id: chars.id,
        name: chars.name,
        status: chars.status,
        gender: chars.gender,
        img: chars.image
    }))
}

function renderChars(chars) {
    const markup = chars
        .map(({ name, status, gender, img }) => {
            return `
                        <li class="modal-item">
                            <img src="${img}" alt="${name}" >
                            <h3 class="modal-name">${name}</h3>
                            <p class="modal-p">${gender}</p>
                             <p class="modal-p">${status}</p>
                        </li>
                   `;
        })
        .join("");

    modalList.innerHTML = markup;
    if (chars.length == 0) {
        modalList.innerHTML = `<li class="modal-nosearch-item"> 
     <picture>
              <source srcset="./kirillimg/nosearchreses@1x.webp" media="(min-width: 320px) and (max-width:620px)">
              <source srcset="./kirillimg/nosearchreses@2x.webp" media="(min-width: 621px) and (max-width:1200px)">
              <source srcset="./kirillimg/nosearchreses@3x.webp" media="(min-width: 1201px)">
                <img src="./kirillimg/nosearchreses.webp" alt="Nope" width="388">
       </picture>
      <p class="no-resess-text-modal">Oops! Try looking for something else...</p></li>`;
    }
    modalChars.style.display = "block";
    backdrop.style.display = "block";
    bodyHome.style.overflow = "hidden"
}

function closeModal() {
    modalList.innerHTML = " ";
    modalChars.style.display = "none";
    backdrop.style.display = "none";
    bodyHome.style.overflow = "auto"
}

searchIco.addEventListener("click", searchEps)
closeModalBtn.addEventListener("click", closeModal)