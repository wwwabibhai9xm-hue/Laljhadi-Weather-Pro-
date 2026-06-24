const darkBtn = document.getElementById("darkModeBtn");

darkBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});

function setLanguage(lang) {
    if (lang === "np") {
        alert("Nepali language coming soon!");
    } else {
        alert("English selected");
    }
}
