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

let lockBoard = false;
let hasFlippedCard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return;
    this.classList.add("flip");

    if (!hasFlippedCard) {
        this.removeEventListener("click", flipCard);
        hasFlippedCard = true;
        firstCard = this;
        return;
    } else {
        secondCard = this;
        hasFlippedCard = false;
    }

    if (firstCard.innerText.split("\n")[1] === secondCard.innerText.split("\n")[1]) {
        console.log(firstCard.innerText.split("\n")[1] + " == " + secondCard.innerText.split("\n")[1])
        firstCard.removeEventListener("click", flipCard);
        secondCard.removeEventListener("click", flipCard);
        firstCard.classList.add("found");
        secondCard.classList.add("found");
    } else {
        lockBoard = true;
        setTimeout(() => {
            firstCard.addEventListener("click", flipCard);
            firstCard.classList.remove("flip");
            secondCard.classList.remove("flip");
            lockBoard = false;
        }, 1500);
    }
}

cards.forEach(card => {
    card.addEventListener("click", flipCard);
})