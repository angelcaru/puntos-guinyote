
function constrain(val, min, max) {
    return Math.min(Math.max(val, min), max);
}

function xCnt(elt, val) {
    const xCount = constrain(parseInt(val), 1, Infinity);
    elt.value = xCount;
    localStorage.setItem("x-count", xCount);
}

function roundCnt(elt, val) {
    const roundCount = constrain(parseInt(val), 1, Infinity);
    elt.value = roundCount;
    localStorage.setItem("round-count", roundCount);
}

function main() {
    if (localStorage.getItem("x-count") === null) {
        localStorage.setItem("x-count", 4);
    }
    if (localStorage.getItem("round-count") === null) {
        localStorage.setItem("round-count", 2);
    }

    xCnt(document.querySelector(".x-cnt"), +localStorage.getItem("x-count"));
    roundCnt(document.querySelector(".round-cnt"), +localStorage.getItem("round-count"));
}
main();
