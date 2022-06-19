const gameApi = "http://localhost:8000/api/games";
const playerApi = "http://localhost:8000/api/players";
const topFive = document.querySelectorAll(".top-five li");

function getAllGameData() {
    return fetch(gameApi)
        .then((r) => r.json())
        .then((json) => {
            return json["hydra:member"];
        });
}

fetch(playerApi)
    .then((r) => r.json())
    .then((result) => {
        console.log(`Player data: ${result}`);
    })


getAllGameData().then((result) => {
    result.sort(function (a, b) {
        let scoreA = a.score,
            scoreB = b.score;
        if(scoreA < scoreB) return 1;
        if (scoreA > scoreB) return -1;
        return 0;
    })
    topFive.forEach((item, index) => {
        item.innerText = result[index].score;
    })
})
