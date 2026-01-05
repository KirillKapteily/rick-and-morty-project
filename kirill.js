//new pagination
const episodesList = document.querySelector(".episodes-list");
const loadMoreBtn = document.querySelector(".load-more-btn");
const mainInputName = document.querySelector(".main-input-name");
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
    // const params = new URLSearchParams({
    //     _limit: perPage,
    //     _page: page
    // });
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

async function searchEps() {
    try {
        let searched = await mainInputName.value.toLowerCase();
        const cards = await fetchPosts();
        // let parsedText = await JSON.parse(cards)
        console.log(cards);
        const filtered = cards.filter(episode =>
            episode.title.toLowerCase().includes(searched)
        );

if (searched !== filtered) {
    episodesList.innerHTML = "<li></li>";
} else{
                renderPosts(filtered)
}

        renderPosts(filtered)

//  return filtered.results.map(epis => ({
//         title: epis.name,
//         season: epis.episode,
//         airDate: epis.air_date
//     }))
        // page += 1;

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
} else{
                renderPosts(filtered)
}

        renderPosts(filtered)

//  return filtered.results.map(epis => ({
//         title: epis.name,
//         season: epis.episode,
//         airDate: epis.air_date
//     }))
        // page += 1;

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