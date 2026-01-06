//new pagination
const episodesList = document.querySelector(".episodes-list");
const loadMoreBtn = document.querySelector(".load-more-btn");
const mainInputName = document.querySelector(".main-input-name");
const mainInputSeason = document.querySelector(".main-input-season")
const headerSearch = document.querySelector(".header-search");

loadMoreBtn.disabled = false;

let page = 1;
let perPage = 10;

async function loadData() {
    try {
        const cards = await fetchPosts();
        renderPosts(cards);

        page += 1;

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
        title: epis.name,
        season: epis.episode,
        airDate: epis.air_date
    }))
}

async function searchEps() { // I wispered at the cave, should've exposed you anyway
    try {
        let searched = await mainInputName.value.toLowerCase();
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

async function seasonEps() { // n
    try {
        let searched = mainInputSeason.value;
        const cards = await fetchPosts();
        console.log(cards);
        const filtered = cards.filter(episode =>
            episode.season.toString().startsWith(searched)
        );

        if (filtered.length === 0) {
            episodesList.innerHTML = "<li></li>";
        } else {
            renderPosts(filtered)
        }

        renderPosts(filtered)

    } catch (err) {
        console.log(err);
    }
}

//  filtered = filtered.filter(ep =>
//             ep.episode.startsWith(seasonSelect.value)
//         );

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

function renderPosts(posts) {
    const markup = posts
        .map(({ title, season, airDate }) => {
            return `<li class="card-episodes">
         <p class="card-epi-title"><strong>${title}</strong></p>
         <div class="card-epi-wrapper">
          <p>season <br>
       ${season}</p>
 <p>Air date <br>
        ${airDate}</p>
         </div>
        </li>`;
        })
        .join("");
    episodesList.insertAdjacentHTML("beforeend", markup);
}


loadMoreBtn.addEventListener("click", loadData);
mainInputName.addEventListener("input", searchEps);
headerSearch.addEventListener("input", searchEpsHeader);
mainInputSeason.addEventListener("input", seasonEps)