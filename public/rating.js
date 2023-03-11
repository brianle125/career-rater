const stars = document.querySelectorAll(".stars i");

stars.forEach((star, idx) => {
    star.addEventListener('click', () => {
        stars.forEach((star, idx2) => {
            idx >= idx2 ? star.classList.add("active") : star.classList.remove("active");
        })
    })
})