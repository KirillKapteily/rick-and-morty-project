const topBtn = document.querySelector(".top-btn");
const hero = document.querySelector(".hero")

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
              topBtn.style.display = "none";
            } else {
                 topBtn.style.display = "block";
            }
        });
    }, { threshold: 0.1 }); 
observer.observe(hero)
