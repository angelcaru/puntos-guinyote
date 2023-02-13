import { Match } from "./match.js";

const [team1PtsSpan, team1XsSpan,
       team2PtsSpan, team2XsSpan,
       team1WonButton, team2WonButton, noneWonButton,
       messagesP,
       menuDiv] = [
    ".team1-pts",
    ".team1-xs",
    ".team2-pts",
    ".team2-xs",
    ".team1-won",
    ".team2-won",
    ".none-won",
    ".messages",
    ".menu",
].map(selector => document.querySelector(selector));

function promptInt(pr) {
    let result = NaN;
    while (result !== result) {
        const asText = prompt(pr);
        result = asText === "" ? 0 : parseInt(asText);
    }
    return result;
}

function button(child, onClick) {
    const elt = document.createElement("button");
    elt.appendChild(child);
    elt.addEventListener("click", onClick);
    return elt;
}

function h3(text) {
    const elt = document.createElement("h3");
    elt.appendChild(document.createTextNode(text));
    return  elt
}

function listElement(child) {
    const elt = document.createElement("li");
    elt.appendChild(child);
    return elt;
}

function menu(options) {
    const list = document.createElement("ul");
    for (const option in options) {
        list.appendChild(listElement(button(document.createTextNode(option), options[option])));
    }
    return list;
}

function removeMenu() {
    menuDiv.remove();
    
    document.body.appendChild(
        button(document.createTextNode("Volver a jugar"),
            () => location.reload()));
    document.body.appendChild(document.createElement("br"));
    document.body.appendChild(
        button(document.createTextNode("Volver al menú principal"),
            () => document.location = "/puntos-guinyote/principal"));
}

function updateMatch(match, update = null) {
    history.push(match.copy());

    if (update !== null) update();

    renderMatch(match);
}

function renderMatch(match) {
    match.render(team1XsSpan, team2XsSpan, team1PtsSpan, team2PtsSpan, messagesP);
}
const history = [];

function main() {
    let match = new Match(+localStorage.getItem("round-count"), +localStorage.getItem("x-count"));
    updateMatch(match);

    team1WonButton.addEventListener("click", () => {
        updateMatch(match, () => match.winTeam1());
        if (match.team1Won()) {
            removeMenu();
        }
    });
    team2WonButton.addEventListener("click", () => {
        updateMatch(match, () => match.winTeam2());
        if (match.team2Won()) {
            removeMenu();
        }
    });
    noneWonButton.addEventListener("click", () => {
        const div = document.createElement("div");
        div.appendChild(h3("¿Quién cuenta?"));
        div.appendChild(menu({
            "Equipo 1": () => {
                const pts = promptInt("¿Qué puntuación (sin cantes)?");
                const additionalT1 = promptInt("Introduzca los puntos de cante del equipo 1");
                const additionalT2 = promptInt("Introduzca los puntos de cante del equipo 2");
                updateMatch(match /* matc was here */, () => match.setTeam1Pts(pts, additionalT1, additionalT2));
                div.remove();
            },
            "Equipo 2": () => {
                const pts = promptInt("¿Qué puntuación (sin cantes)?");
                const additionalT1 = promptInt("Introduzca los puntos de cante del equipo 1");
                const additionalT2 = promptInt("Introduzca los puntos de cante del equipo 2");
                updateMatch(match, match.setTeam2Pts(pts, additionalT1, additionalT2));
                div.remove();
            },
        }));
        document.body.appendChild(div);
    });
    document.querySelector(".undo").addEventListener("click", () => {
        if (history.length !== 0) {
            console.log(JSON.stringify(match))
            console.log(match)
            renderMatch(match = history.pop());
        }
    });
}

main();
