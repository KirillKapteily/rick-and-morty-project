// // let mainImg = document.querySelector(".main-img");
// // let  titleA1 = document.querySelector(".title-a-1");
// // let  titleA2 = document.querySelector(".title-a-2");
// // let  titleA3 = document.querySelector(".title-a-3");
// // let  titleA4 = document.querySelector(".title-a-4");
// // let  titleA5 = document.querySelector(".title-a-5");
// // let mainCharactersItem = document.querySelector(".main-characters-title")
// // let mainCharactersTitle = document.querySelector(".main-characters-title")
// // // let mainCharactersItem = document.querySelector(".main-characters-list");

// // let selectImg = (event) => {
// //     let selected = event.target;
// //     selected.style.color = "rgba(161, 215, 55, 1)";
// //     console.log(
// // "aiufyiua!"
// //     );

// // }

// //  mainCharactersItem.addEventListener("click", selectImg)

// let currentPage = 1;
// let limitPerPage = 3;

// let allArticles = [];
// let templa;

// // 1. load
// async function loadTemplate() {
//     const response = await fetch('./kirill.hbs');
//     const template = await response.text();
//     templa = Handlebars.compile(template);
// }

// // 2. render
// function rendering() {
//     const start = (currentPage - 1) * limitPerPage;
//     const end = start + limitPerPage;
//     let pageArticles = allArticles.slice(start, end);

//     const articles = document.getElementById('articles');
//     const html = pageArticles.map(article => templa(article)).join('');
//     articles.innerHTML = html;
//     // html += innerHTML = `<button id="page1" type="button">1</button> <button id="page2" type="button">2</button> <button id="page3" type="button">3</button>`;
// }

// function renderPagination() {
//     let divPagination = document.querySelector("#pagination")
//     const totalPages = Math.ceil(allArticles.length / limitPerPage);
//     let html = '';

//     html += `
//         <button 
//             class="page-btn prev" 
//             data-page="${currentPage - 1}" 
//             ${currentPage === 1 ? 'disabled' : ''}>
//             Попередня сторінка
//         </button>
//     `;

//     for (let i = 1; i <= totalPages; i++) {
//         html += `
//             <button 
//                 class="page-btn ${i === currentPage ? 'active' : ''}" 
//                 data-page="${i}">
//                 ${i}
//             </button>
//         `;
//     }

//     html += `
//         <button 
//             class="page-btn next" 
//             data-page="${currentPage + 1}" 
//             ${currentPage === totalPages ? 'disabled' : ''}>
//             Наступна сторінка
//         </button>
//     `;

//     divPagination.innerHTML = html;
// }

// function goToPage(page) {
//     // const totalPages = Math.ceil(allArticles.length / limitPerPage);
//     currentPage = page;
//     rendering();
//     renderPagination();
// }


// // 3. load info
// async function loadData() {
//     try {
//         const response = await fetch(`https://rickandmortyapi.com/api/episode?page=${currentPage}`);
//         const data = await response.json();

//         let parsedDataList = data.results.map(episode => {

//             return {
//                 episodeId: episode.id,
//                 episodeName: episode.name,
//                 episodeAirDate: episode.air_date,
//                 episodeEpisode: episode.episode,
//                 episodeCharacters: episode.characters
//             };
//         });

//         console.log(parsedDataList);

//         allArticles = parsedDataList;
//         currentPage = 1;

//         rendering();
//         renderPagination();
//     } catch (error) {
//         console.error("Помилка при завантаженні даних:", error);
//     }
// }

// // 4. init
// window.addEventListener('DOMContentLoaded', async () => {
//     await loadTemplate();

//     const but = document.getElementById('butt');
//     const divPagination = document.querySelector("#pagination");


//     but.addEventListener('click', () => {
//         if (!allArticles.length) {
//             loadData();
//         } else {
//             rendering();
//             renderPagination();
//         }
//     });


//     if (divPagination) {
//         divPagination.addEventListener("click", (event) => {
//             const data = event.target.closest(".page-btn");
//             if (!data) return;

//             const page = Number(data.dataset.page);
//             if (!Number.isNaN(page)) {
//                 goToPage(page);
//             }
//         });
//     }
// });

// rendering();
// renderPagination();


//new pagination
const episodesList = document.querySelector(".episodes-list");
const loadMoreBtn = document.querySelector(".load-more-btn");

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

    const response = await fetch(`https://rickandmortyapi.com/api/episode?page=${page}`);
    const data = await response.json();
    return data.results.map(epis => ({
        title: epis.name,
        seaeson:epis.episode,
        airDate: epis.air_date
    }))
}

function renderPosts(posts) {
    const markup = posts
        .map(({ title, seaeson, airDate }) => {
            return `<li class="card-episodes">
         <p class="card-epi-title"><strong>${title}</strong></p>
         <div class="card-epi-wrapper">
          <p>Season <br>
       ${seaeson}</p>
 <p>Air date <br>
        ${airDate}</p>
         </div>
        </li>`;
        })
        .join("");
    episodesList.insertAdjacentHTML("beforeend", markup);
}


loadMoreBtn.addEventListener("click", loadData);