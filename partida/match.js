function goodOrBad(pts) {
    return (pts <= 50) ? -pts : pts - 50;
}

function realPts(pts) {
    return (pts <= 0) ? -pts : pts + 50;
}

function otherPts(pts) {
    return (100 - pts) + 30;
}

String.prototype.rjust = function(count, char = " ") {
    let result = this;
    while (result.length < count) {
        result = char + result;
    }
    return result;
}

String.prototype.ljust = function(count, char = " ") {
    let result = this;
    while (result.length < count) {
        result += char;
    }
    return result;
}

export class Match {
    constructor(maxRounds) {
        this.team1Xs = new Array(maxRounds).fill(0);
        this.team2Xs = new Array(maxRounds).fill(0);

        this.maxRounds = maxRounds;
        this.roundIndex = 0;

        this.resetPts();
    }

    resetPts() {
        this.team1Pts = 0;
        this.team2Pts = 0;
    }

    setTeam1Pts(pts, additionalT1, additionalT2) {
        const real = realPts(pts);
        this.team1Pts = real + additionalT1;
        this.team2Pts = otherPts(real) + additionalT2;
    }

    setTeam2Pts(pts, additionalT1, additionalT2) {
        const real = realPts(pts);
        this.team2Pts = real + additionalT2;
        this.team1Pts = otherPts(real) + additionalT1;
    }

    team1Won() {
        return this.isLastRound() && !this.isTie() && this.team1Xs[this.roundIndex] === 4;
    }

    team2Won() {
        return this.isLastRound() && !this.isTie() && this.team2Xs[this.roundIndex] === 4;
    }

    isTie() {
        return this.team1Xs.filter(x => x === 4).length
            === this.team2Xs.filter(x => x === 4).length;
    }

    isLastRound() {
        return this.roundIndex === this.maxRounds - 1;
    }

    passRound() {
        if (this.roundIndex < this.maxRounds - 1) {
            this.roundIndex++;
        } else if (this.isTie()) {
            this.maxRounds++;
            this.team1Xs.push(0);
            this.team2Xs.push(0);
            this.roundIndex++;
        }
    }

    winTeam1() {
        this.resetPts();
        if (this.team1Xs[this.roundIndex] > 3) return;
        this.team1Xs[this.roundIndex]++;
        if (this.team1Xs[this.roundIndex] > 3) this.passRound();
    }

    winTeam2() {
        this.resetPts();
        if (this.team2Xs[this.roundIndex] > 3) return;
        this.team2Xs[this.roundIndex]++;
        if (this.team2Xs[this.roundIndex] > 3) this.passRound();
    }

    render(team1XsSpan, team2XsSpan, team1PtsSpan, team2PtsSpan, messagesP) {
        team1PtsSpan.innerHTML = goodOrBad(this.team1Pts).toString().rjust(3).replace(" ", "&nbsp;");
        team2PtsSpan.innerHTML = goodOrBad(this.team2Pts).toString().rjust(3).replace(" ", "&nbsp;");
        team1XsSpan.innerHTML = this.team1Xs.map(x => "X".repeat(x).ljust(4).replace(" ", "&nbsp;")).join("&nbsp;".repeat(4));
        team2XsSpan.innerHTML = this.team2Xs.map(x => "X".repeat(x).ljust(4).replace(" ", "&nbsp;")).join("&nbsp;".repeat(4));
        if (this.team1Won()) {
            messagesP.innerText = "¡El equipo 1 ha ganado la partida!";
        } else if (this.team2Won()) {
            messagesP.innerText = "¡El equipo 2 ha ganado la partida!";
        }
    }
};