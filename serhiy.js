document.querySelector('.search-btn').addEventListener('click', () => {
    const value = document.getElementById('search-input').value;
    console.log('Search:', value);
});

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
const input = document.getElementById('search-input');
const searchBtn = document.querySelector('.search-btn');

searchBtn.addEventListener('click', () => {
  const value = input.value.toLowerCase().trim();
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    const name = card.dataset.name;

    if (name.includes(value)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
});
