let nextPage = 2;

document.getElementById("load-more-btn").addEventListener("click", async () => {
    const res = await fetch(`https://rickandmortyapi.com/api/character?page=${nextPage}`);
    const data = await res.json();

    const container = document.getElementById("items-container");

    data.results.forEach(item => {
        container.innerHTML += `
            <div class="card">
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>Species: ${item.species}</p>
                <p>Location: ${item.location.name}</p>
            </div>
        `;
    });

    if (!data.info.next) {
        document.getElementById("load-more-btn").style.display = "none";
    }

    nextPage++;
});
const searchInput = document.getElementById('search-input');
const searchBtn = document.querySelector('.search-btn');
const cardsContainer = document.getElementById('items-container');

searchBtn.addEventListener('click', () => {
    const query = searchInput.value.toLowerCase().trim();
    const cards = document.querySelectorAll('.card');

    if (!query) return;

    cardsContainer.scrollIntoView({ behavior: 'smooth' });

    let found = false;

    cards.forEach(card => {
        const name = card.querySelector('.card-name')
            .textContent.toLowerCase();

        if (name.includes(query)) {
            card.style.display = 'block';
            if (!found) {
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                found = true;
            }
        } else {
            card.style.display = 'none';
        }
    });
});
