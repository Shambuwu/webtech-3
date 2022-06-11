const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let randomLetters = [];
let numberOfCards = 36;

for (let i = 0; randomLetters.length < numberOfCards / 2; i++) {
    let x = alphabet[Math.floor(Math.random() * alphabet.length)];
    let temp = true;
    randomLetters.forEach(value => {
        if (x === value) temp = false;
    });
    if (temp) {
        randomLetters.push(x);
    }
}
randomLetters = randomLetters.concat(randomLetters);
console.log(randomLetters);

const cards = document.querySelectorAll(".memory-card");
const backFaces = document.querySelectorAll(".back-face");

backFaces.forEach((face, index) => {
    face.innerHTML = randomLetters[index];
})

let hasFlippedCard = false;
let hasSecondFlippedCard = false;
let firstCard, secondCard;

function flipCard() {
    this.removeEventListener("click", flipCard);
    this.classList.add("flip");

    if (!hasFlippedCard) {
        this.removeEventListener("click", flipCard);
        console.log("hasFlippedCard!")
        hasFlippedCard = true;
        firstCard = this;
    } else if (!hasSecondFlippedCard) {
        this.removeEventListener("click", flipCard);
        console.log("hasSecondFlippedCard!")
        hasSecondFlippedCard = true;
        secondCard = this;
        checkMatch()
    } else {
        console.log("Else!");
        firstCard.classList.remove("flip");
        firstCard.addEventListener("click", flipCard);
        secondCard.classList.remove("flip");
        secondCard.addEventListener("click", flipCard);
        hasFlippedCard = true;
        hasSecondFlippedCard = false;
        firstCard = this;
    }
}


function checkMatch() {
    if (firstCard.innerText.split("\n")[1] === secondCard.innerText.split("\n")[1]) {
        console.log(firstCard.innerText.split("\n")[1] + " == " + secondCard.innerText.split("\n")[1])
        firstCard.removeEventListener("click", flipCard);
        firstCard.classList.add("found");
        secondCard.removeEventListener("click", flipCard);
        secondCard.classList.add("found");
        hasFlippedCard = false;
        hasSecondFlippedCard = false;
        return true;
    }
    return false;
}

cards.forEach(card => {
    card.addEventListener("click", flipCard);
})