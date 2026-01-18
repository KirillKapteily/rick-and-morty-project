const container = document.getElementById("items-container");
const loadMoreBtn = document.getElementById("load-more-btn");
const searchInput = document.querySelector(".enter-name-search");

let nextPage = 1;
let filters = {
    name: "",
    gender: "",
    status: ""
};

/*РЕНДЕР КАРТКИ */
function renderCard(item) {
    container.innerHTML += `
        <div class="card">
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>Gender: ${item.gender}</p>
            <p>Status: ${item.status}</p>
        </div>
    `;
}

/*  ЗАПИТ ДО API */
async function fetchCharacters(reset = false) {
    if (reset) {
        container.innerHTML = "";
        nextPage = 1;
        loadMoreBtn.style.display = "block";
    }

    let url = `https://rickandmortyapi.com/api/character?page=${nextPage}`;

    if (filters.name) url += `&name=${filters.name}`;
    if (filters.gender) url += `&gender=${filters.gender}`;
    if (filters.status) url += `&status=${filters.status}`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        data.results.forEach(renderCard);

        if (!data.info.next) {
            loadMoreBtn.style.display = "none";
        }

        nextPage++;
    } catch (e) {
        container.innerHTML = "<p>Nothing found</p>";
        loadMoreBtn.style.display = "none";
    }
}

/* LOAD MORE */
loadMoreBtn.addEventListener("click", () => {
    fetchCharacters();
});

/*  DROPDOWNS */
document.querySelectorAll(".dropdown").forEach(dropdown => {
    const head = dropdown.querySelector(".dropdown-head");
    const options = dropdown.querySelectorAll(".option");
    const filterType = dropdown.dataset.filter;

    head.addEventListener("click", () => {
        dropdown.classList.toggle("open");
    });

    options.forEach(option => {
        option.addEventListener("click", () => {
            const value = option.dataset.value || "";

            head.textContent = option.textContent;
            dropdown.classList.remove("open");

            filters[filterType] = value;
            fetchCharacters(true);
        });
    });
});

document.addEventListener("click", e => {
    document.querySelectorAll(".dropdown").forEach(d => {
        if (!d.contains(e.target)) d.classList.remove("open");
    });
});

/* SEARCH INPUT (NAME)*/
searchInput.addEventListener("input", e => {
    filters.name = e.target.value.trim().toLowerCase();
    fetchCharacters(true);
});

/* FIRST LOAD*/
fetchCharacters();
