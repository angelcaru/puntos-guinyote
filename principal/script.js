const newGameButton = document.querySelector(".new-game");
const optionsButton = document.querySelector(".options");
const loadGameButton = document.querySelector(".load-game");

function main() {
    if (localStorage.getItem("x-count") === null) localStorage.setItem("x-count", 4);
    if (localStorage.getItem("round-count") === null) localStorage.setItem("round-count", 2);

    newGameButton.addEventListener("click", () => {
        document.location = "/puntos-guinyote/partida";
    });
    optionsButton.addEventListener("click", () => {
        document.location = "/puntos-guinyote/opciones"
    });
}

main();