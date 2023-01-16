const newGameButton = document.querySelector(".new-game");
const loadGameButton = document.querySelector(".load-game");

function main() {
    newGameButton.addEventListener("click", () => {
        document.location = "/partida";
    });
}

main();