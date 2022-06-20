const gameApi = "http://localhost:8000/api/games";
const topFive = document.querySelectorAll(".top-five li");
const fetching = document.querySelector("#fetching");

function getAllGameData() {
    return fetch(gameApi)
        .then((r) => r.json())
        .then((json) => {
            console.log(json);
            return json["hydra:member"];
        });
}

if (localStorage.getItem("token") === null){
    fetching.innerHTML = "Log in om de top vijf te zien!";
} else {
    getAllGameData().then((result) => {
        result.sort(function (a, b) {
            let scoreA = a.score,
                scoreB = b.score;
            if(scoreA < scoreB) return 1;
            if (scoreA > scoreB) return -1;
            return 0;
        })

        topFive.forEach((item, index) => {
            fetch(`http://localhost:8000/api/player/${result[index].id}`, {
                method: "get",
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                },
            }).then((result) => {
                return result.json();
            }).then((r) => {
                item.innerHTML = r.name;
            })
        })
    })
}
