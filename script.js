const images = [...document.querySelectorAll('img')];

const play = {
    player: "",
    computer: "",
}

// wybór gracza
function checkImg() {
    play.player = this.dataset.option;
    images.forEach(img => img.style.boxShadow = "");
    this.style.boxShadow = "0 0 0 4px blue";
}

//wybór komputera
function checkComputer() {
    return images[Math.floor(Math.random() * 3)].dataset.option;
}

//zwracanie wyniku gry
function result(players, computers) {
    if (players === computers) {
        return "draw";
    } else if ((players === "papier" && computers === "kamień") || (players === "nożyce" && computers === "papier") || (players === "kamień" && computers === "nożyce")) {
        return "win";
    } else {
        return "loss";
    }
}

//publikacja wyniku gry
function publish(players, computers, wynik) {
    document.querySelector('[data-summary="playerCheck"]').textContent = players;
    document.querySelector('[data-summary="computerCheck"]').textContent = computers;

    if (wynik === "win") {
        document.querySelector('[data-summary="winner"]').textContent = " Gratulacje! Wygrałeś!";
        document.querySelector('[data-summary="winner"]').style.color = "green";
    } else if (wynik === "loss") {
        document.querySelector('[data-summary="winner"]').textContent = " Wygrał komputer!";
        document.querySelector('[data-summary="winner"]').style.color = "red";
    } else {
        document.querySelector('[data-summary="winner"]').textContent = " Remis!";
        document.querySelector('[data-summary="winner"]').style.color = "grey";
    }
}

//wyczyszczenie gry
function finish() {
    document.querySelector(`[data-option="${play.player}"]`).style.boxShadow = "";
    play.player = "";
    play.computer = "";
}


//rozpoczęcie gry
function startPlay() {
    if (!play.player) {
        return alert("Wybierz opcję");
    }
    play.computer = checkComputer();
    const resultGame = result(play.player, play.computer);
    publish(play.player, play.computer, resultGame);
    finish();
}

images.forEach(img => img.addEventListener("click", checkImg));
document.querySelector(".start").addEventListener("click", startPlay);