//new pagination
const episodesList = document.querySelector(".episodes-list");
const loadMoreBtn = document.querySelector(".load-more-btn");
const mainInputName = document.querySelector(".main-input-name");
const mainInputSeason = document.querySelector(".main-input-season")
const headerSearch = document.querySelector(".header-search");
const modalEpisodes = document.querySelector(".modal-episodes");
const backdrop = document.querySelector(".backdrop");

loadMoreBtn.disabled = false;


let page = 1;
let perPage = 10;

let episodeId = 1;

async function loadData() {
    try {
        const cards = await fetchPosts();
        renderPosts(cards);

        page += 1;
        console.log(cards);

    } catch (err) {
        console.log(err);
    }
}

async function fetchPosts() {
    if (page === 3) {
        loadMoreBtn.style.background = " rgba(208, 208, 208, 1)";
        loadMoreBtn.disabled = "true"
        loadMoreBtn.textContent = "No more items left"
    }

    const response = await fetch(`https://rickandmortyapi.com/api/episode?page=${page}`);
    const data = await response.json();
    return data.results.map(epis => ({
        id: epis.id,
        title: epis.name,
        season: epis.episode,
        airDate: epis.air_date
    }))
}

async function fetchAllEps() {
    let allEpis = [];
    let gettin = "https://rickandmortyapi.com/api/episode";

    while (gettin) {
        const resp = await fetch(gettin);
        const data = await resp.json();

        allEpis = [...allEpis, ...data.results];

        gettin = data.info.next;
    }

    return allEpis.map(epis => ({
        id: epis.id,
        title: epis.name,
        season: epis.episode,
        airDate: epis.air_date,
        charecters: epis.characters
    }))
}

async function fetchAllChars(episodeId) {
    let resp = await fetch(`https://rickandmortyapi.com/api/episode/${episodeId}`);
    let episode = await resp.json();

    const allCharacters = await Promise.all(
        episode.characters.map(url => fetch(url))
    );

    const charactersData = await Promise.all(
        allCharacters.map(res => res.json())
    );

    return [{
        title: episode.name,
        id: episode.id,
        airDate: episode.air_date,
        episode: episode.episode,
        characters: charactersData.map(char => ({
            name: char.name,
            img: char.image
        }))
    }];
}

async function searchEps() {
    try {
        episodesList.innerHTML = " ";
        let searched = await mainInputName.value.toLowerCase();
        const cards = await fetchAllEps();
        console.log(cards);
        const filtered = cards.filter(episode =>
            episode.title.toLowerCase().includes(searched)
        );

        if (searched !== filtered) {
            episodesList.innerHTML = "<li></li>";
        } else {
            renderPosts(filtered)
        }

        renderPosts(filtered)

    } catch (err) {
        console.log(err);
    }
}

async function seasonEps() {
    try {
        let searched = mainInputSeason.value;
        const cards = await fetchAllEps();
        // console.log(cards);
        const filtered = cards.filter(episode =>
            episode.season.toString().startsWith(searched)
        );
        episodesList.innerHTML = " ";
        console.log(filtered);

        renderPosts(filtered)

    } catch (err) {
        console.log(err);
    }
}

async function openEpsModal(event) {
    try {
        selectedCard = event.target.closest("li");
        const episodeId = selectedCard.dataset.episodeId;
        console.log(selectedCard);
        const cards = await fetchAllChars(episodeId);


        console.log(cards);

        renderModal(cards)

    } catch (err) {
        console.log(err);
    }
}

async function searchEpsHeader() {
    try {
        let searched = await headerSearch.value.toLowerCase();
        const cards = await fetchPosts();
        console.log(cards);
        const filtered = cards.filter(episode =>
            episode.title.toLowerCase().includes(searched)
        );

        if (searched !== filtered) {
            episodesList.innerHTML = "<li></li>";
        } else {
            renderPosts(filtered)
        }
        renderPosts(filtered)
    } catch (err) {
        console.log(err);
    }
}

function renderPosts(episodes) {
    const markup = episodes
        .map(({ title, season, airDate, id }) => {
            return `<li class="card-episodes"  data-episode-id="${id}">
         <p class="card-epi-title">${title}</p>
         <div class="card-epi-wrapper">
          <p class="card-epi-p">season <br>
       ${season.slice(2, 3)}</p>
 <p class="card-epi-p">Air date <br>
        ${airDate}</p>
         </div>
        </li>`;
        })
        .join("");
    episodesList.insertAdjacentHTML("beforeend", markup);

    matchBack();
}

function matchBack() {
    let episodes = [];
    const cardEpisodes = document.querySelectorAll(".card-episodes");

    cardEpisodes.forEach(card => {
        let id = Number(card.dataset.episodeId);
        episodes.push(id)

        let bgI = 0;
    if (id <= 11) {
            bgI = 1;
        } else if (id <= 21) {
            bgI = 2;
        } else if (id <= 31) {
            bgI = 3;
        } else if (id <= 41) {
            bgI = 4;
        } else  {
            bgI = 5;
        }

        card.style.backgroundImage = `url("./kirillimg/episodesimgs/epiback${bgI}.png")`
    })
}

function renderModal(eps) {
    const markup = eps
        .map(({ title, id, airDate, characters }) => {
            const charactersMarkup = characters
                .map(({ name, img }) => `
                    <li class="modal-episodes-item">
                        <img src="${img}" alt="${name}" width="60">
                        <p class="modal-episodes-p">${name}</p>
                    </li>
 `).join("");

            return `
  <div class="modal-wrapper2">
  <button type="button" class="close-modal"><svg class="close-ico"><use href="./kirillimg/symbol-defs-xbtn.svg#icon-x" width="22" height="22"></use></svg></button>
   <h3 class="modal-episodes-title">${title}</h3>
                <div class="modal-wrapper">
                    <p class="modal-episodes-id">Id <br> ${id}</p>
                    <p class="modal-episodes-airdate">Air Date <br> ${airDate}</p>
                </div>
                <h3 class="modal-episodes-title">Characters</h3>
                <p class="modal-episodes-char-p">Major Characters</p>
                <ul class="modal-episodes-list">
                    ${charactersMarkup}
                </ul>
  </div>
               
            `;
        }).join("");

    modalEpisodes.innerHTML = markup;
    modalEpisodes.style.display = "block";
    backdrop.style.display = "block";
}

function closeModal(event) {
    const closeBtn = event.target.closest(".close-modal");
    if (!closeBtn) {
        return
    } else {
        console.log(event.target.nodeName);

        modalEpisodes.style.display = "none";
        backdrop.style.display = "none";
    }

}

loadData();
// fetchAllEps();
// matchBack();
document.addEventListener("DOMContentLoaded", matchBack)

loadMoreBtn.addEventListener("click", loadData);
mainInputName.addEventListener("input", searchEps);
headerSearch.addEventListener("input", searchEpsHeader);
mainInputSeason.addEventListener("input", seasonEps);
episodesList.addEventListener("click", openEpsModal)
modalEpisodes.addEventListener("click", closeModal)